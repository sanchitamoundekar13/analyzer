"""
Comprehensive report schema for ResumeLens.
"""

from typing import Optional, List
from pydantic import BaseModel

from .resume import CandidateSchema
from .scoring import ScoreBreakdown, ScoreDeduction
from .ats import ATSAnalysis
from .skills import JobMatchAnalysis
from .recommendations import Recommendation, BulletRewriteResponse


class ReportResponse(BaseModel):
    analysis_id: str
    candidate: CandidateSchema
    overall_score: float
    grade: str
    score_breakdown: ScoreBreakdown
    ats: ATSAnalysis
    job_match: Optional[JobMatchAnalysis] = None
    strengths: List[str] = []
    weaknesses: List[str] = []
    deductions: List[ScoreDeduction] = []
    missing_skills: List[str] = []
    recommendations: List[Recommendation] = []
    bullet_rewrites: List[BulletRewriteResponse] = []
