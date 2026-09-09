"""
Analysis request, response, and progress tracking schemas for ResumeLens.
"""

from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel

from .ats import ATSAnalysis
from .skills import JobMatchAnalysis
from .scoring import ExperienceAnalysis, WritingAnalysis, ScoreBreakdown, ScoreDeduction
from .evidence import Evidence
from .recommendations import Recommendation


class AnalysisCreate(BaseModel):
    resume_id: str
    job_id: Optional[str] = None


class AnalysisProgress(BaseModel):
    analysis_id: str
    status: str
    current_stage: str
    progress: int
    completed_stages: List[str] = []


class AnalysisResponse(BaseModel):
    id: str
    resume_id: str
    job_id: Optional[str] = None
    status: str
    overall_score: float
    grade: str
    score_breakdown: ScoreBreakdown
    ats_analysis: ATSAnalysis
    job_match: Optional[JobMatchAnalysis] = None
    experience_analysis: ExperienceAnalysis
    writing_analysis: WritingAnalysis
    evidence: List[Evidence] = []
    deductions: List[ScoreDeduction] = []
    recommendations: List[Recommendation] = []
    created_at: datetime
