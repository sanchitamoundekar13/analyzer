"""
Dashboard analytics and subscription schemas for ResumeLens.
"""

from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel


class DashboardStats(BaseModel):
    total_resumes: int = 0
    total_analyses: int = 0
    latest_score: Optional[float] = None
    best_score: Optional[float] = None
    average_score: Optional[float] = None
    score_improvement: Optional[float] = None


class RecentAnalysis(BaseModel):
    analysis_id: str
    resume_id: str
    resume_name: str
    score: float
    grade: str
    created_at: datetime


class DashboardResponse(BaseModel):
    stats: DashboardStats
    recent_analyses: List[RecentAnalysis] = []


class SubscriptionResponse(BaseModel):
    id: str
    plan: str  # "free", "pro", "premium"
    status: str
    analyses_limit: Optional[int] = None
    analyses_used: int = 0
    start_date: datetime
    end_date: Optional[datetime] = None
