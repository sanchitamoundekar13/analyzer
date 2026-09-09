"""
Resume version comparison schemas for ResumeLens.
"""

from typing import List
from pydantic import BaseModel


class ScoreDifference(BaseModel):
    category: str
    old_score: float
    new_score: float
    difference: float


class ResumeComparison(BaseModel):
    old_resume_id: str
    new_resume_id: str
    old_score: float
    new_score: float
    improvement: float
    score_differences: List[ScoreDifference] = []
    improvements: List[str] = []
    regressions: List[str] = []
    recommendations: List[str] = []
