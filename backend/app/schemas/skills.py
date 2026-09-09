"""
Skill schemas and Job Description matching schemas for ResumeLens.
"""

from typing import Optional, List
from pydantic import BaseModel, Field


class SkillSchema(BaseModel):
    name: str
    normalized_name: str
    category: Optional[str] = None
    confidence: float = Field(default=1.0, ge=0, le=1)
    evidence: List[str] = []


class SkillMatch(BaseModel):
    skill: str
    resume_skill: Optional[str] = None
    matched: bool
    match_type: str  # exact, normalized, semantic, related, missing
    confidence: float = 1.0
    evidence: List[str] = []


class JobMatchAnalysis(BaseModel):
    overall_match: float
    required_skill_score: float
    preferred_skill_score: float
    semantic_similarity_score: float
    experience_relevance_score: float
    responsibility_match_score: float
    education_match_score: float
    matched_skills: List[SkillMatch] = []
    missing_skills: List[SkillMatch] = []
    related_skills: List[SkillMatch] = []
