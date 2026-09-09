"""
Scoring and analysis dimension schemas for ResumeLens.
Implements the 7-dimension explainable scoring model.
"""

from typing import Optional, List
from pydantic import BaseModel, Field, model_validator


class BulletAnalysis(BaseModel):
    original_text: str
    action_verb: Optional[str] = None
    has_metric: bool = False
    metrics: List[str] = []
    technical_specificity: float = 1.0
    clarity_score: float = 1.0
    impact_score: float = 1.0
    issues: List[str] = []


class ExperienceAnalysis(BaseModel):
    score: float
    total_bullets: int = 0
    metric_bullets: int = 0
    action_verb_bullets: int = 0
    metric_ratio: float = 0.0
    action_verb_ratio: float = 0.0
    bullets: List[BulletAnalysis] = []


class WritingIssue(BaseModel):
    text: str
    issue_type: str
    severity: str
    explanation: str


class WritingAnalysis(BaseModel):
    score: float
    clarity_score: float = 1.0
    action_verb_score: float = 1.0
    conciseness_score: float = 1.0
    specificity_score: float = 1.0
    issues: List[WritingIssue] = []


class ScoreComponent(BaseModel):
    name: str
    score: float
    weight: float
    weighted_score: float
    strengths: List[str] = []
    weaknesses: List[str] = []
    evidence_ids: List[str] = []


class ScoreBreakdown(BaseModel):
    ats: ScoreComponent
    job_match: ScoreComponent
    skills: ScoreComponent
    experience: ScoreComponent
    structure: ScoreComponent
    writing: ScoreComponent
    education_projects: ScoreComponent
    total_score: float
    grade: str


class ScoreWeights(BaseModel):
    ats: float = 20.0
    job_match: float = 20.0
    skills: float = 15.0
    experience: float = 15.0
    structure: float = 10.0
    writing: float = 10.0
    education_projects: float = 10.0

    @model_validator(mode="after")
    def validate_sum_100(self) -> "ScoreWeights":
        total = sum([
            self.ats,
            self.job_match,
            self.skills,
            self.experience,
            self.structure,
            self.writing,
            self.education_projects
        ])
        if round(total, 2) != 100.0:
            raise ValueError(f"Score weights must sum to 100. Current sum: {total}")
        return self


class ScoreDeduction(BaseModel):
    category: str
    points_lost: float
    reason: str
    evidence_ids: List[str] = []
    recommendation: str
    priority: str
