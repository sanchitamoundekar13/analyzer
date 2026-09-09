"""
Recommendation and AI rewrite schemas for ResumeLens.
"""

from typing import Optional, List
from pydantic import BaseModel
from .enums import RecommendationPriority


class Recommendation(BaseModel):
    id: str
    title: str
    description: str
    category: str
    priority: RecommendationPriority
    estimated_impact: Optional[float] = None
    evidence_ids: List[str] = []
    action: str


class BulletRewriteRequest(BaseModel):
    bullet: str
    context: Optional[str] = None
    evidence_ids: List[str] = []


class BulletRewriteResponse(BaseModel):
    original: str
    improved: str
    changes: List[str] = []
    evidence_used: List[str] = []
    hallucination_check_passed: bool = True


class SummaryRewriteRequest(BaseModel):
    summary: str
    target_role: Optional[str] = None
    evidence_ids: List[str] = []


class SummaryRewriteResponse(BaseModel):
    original: str
    improved: str
    changes: List[str] = []
    evidence_used: List[str] = []
    hallucination_check_passed: bool = True


class AIValidationResult(BaseModel):
    factual: bool = True
    evidence_grounded: bool = True
    contains_invented_metrics: bool = False
    contains_invented_skills: bool = False
    contains_invented_experience: bool = False
    confidence: float = 1.0
    issues: List[str] = []
