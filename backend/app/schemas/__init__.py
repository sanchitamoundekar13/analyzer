"""
ResumeLens Backend Pydantic Schemas Package.
"""

from .enums import (
    ResumeFileType,
    ResumeStatus,
    AnalysisStatus,
    RequirementType,
    SkillLevel,
    RecommendationPriority,
    EvidenceType,
)

from .common import (
    APIResponse,
    Pagination,
    TimestampSchema,
)

from .user import (
    UserBase,
    UserCreate,
    UserLogin,
    UserResponse,
)

from .auth import (
    TokenResponse,
    RefreshTokenRequest,
)

from .resume import (
    CandidateSchema,
    ResumeLinks,
    EducationSchema,
    ExperienceBullet,
    ExperienceSchema,
    ProjectSchema,
    CertificationSchema,
    AchievementSchema,
    SkillSchema,
    ParsedResumeSchema,
    ResumeUploadResponse,
    ResumeResponse,
    ResumeSection,
)

from .job import (
    JobDescriptionCreate,
    JobRequirement,
    ParsedJobDescription,
    JobResponse,
)

from .ats import (
    FormattingIssue,
    FormattingAnalysis,
    ATSCheck,
    ATSAnalysis,
)

from .skills import (
    SkillMatch,
    JobMatchAnalysis,
)

from .evidence import (
    Evidence,
)

from .scoring import (
    BulletAnalysis,
    ExperienceAnalysis,
    WritingIssue,
    WritingAnalysis,
    ScoreComponent,
    ScoreBreakdown,
    ScoreWeights,
    ScoreDeduction,
)

from .recommendations import (
    Recommendation,
    BulletRewriteRequest,
    BulletRewriteResponse,
    SummaryRewriteRequest,
    SummaryRewriteResponse,
    AIValidationResult,
)

from .comparison import (
    ScoreDifference,
    ResumeComparison,
)

from .analysis import (
    AnalysisCreate,
    AnalysisProgress,
    AnalysisResponse,
)

from .report import (
    ReportResponse,
)

from .dashboard import (
    DashboardStats,
    RecentAnalysis,
    DashboardResponse,
    SubscriptionResponse,
)

__all__ = [
    # Enums
    "ResumeFileType",
    "ResumeStatus",
    "AnalysisStatus",
    "RequirementType",
    "SkillLevel",
    "RecommendationPriority",
    "EvidenceType",
    # Common
    "APIResponse",
    "Pagination",
    "TimestampSchema",
    # User
    "UserBase",
    "UserCreate",
    "UserLogin",
    "UserResponse",
    # Auth
    "TokenResponse",
    "RefreshTokenRequest",
    # Resume
    "CandidateSchema",
    "ResumeLinks",
    "EducationSchema",
    "ExperienceBullet",
    "ExperienceSchema",
    "ProjectSchema",
    "CertificationSchema",
    "AchievementSchema",
    "SkillSchema",
    "ParsedResumeSchema",
    "ResumeUploadResponse",
    "ResumeResponse",
    "ResumeSection",
    # Job
    "JobDescriptionCreate",
    "JobRequirement",
    "ParsedJobDescription",
    "JobResponse",
    # ATS
    "FormattingIssue",
    "FormattingAnalysis",
    "ATSCheck",
    "ATSAnalysis",
    # Skills
    "SkillMatch",
    "JobMatchAnalysis",
    # Evidence
    "Evidence",
    # Scoring
    "BulletAnalysis",
    "ExperienceAnalysis",
    "WritingIssue",
    "WritingAnalysis",
    "ScoreComponent",
    "ScoreBreakdown",
    "ScoreWeights",
    "ScoreDeduction",
    # Recommendations
    "Recommendation",
    "BulletRewriteRequest",
    "BulletRewriteResponse",
    "SummaryRewriteRequest",
    "SummaryRewriteResponse",
    "AIValidationResult",
    # Comparison
    "ScoreDifference",
    "ResumeComparison",
    # Analysis
    "AnalysisCreate",
    "AnalysisProgress",
    "AnalysisResponse",
    # Report
    "ReportResponse",
    # Dashboard
    "DashboardStats",
    "RecentAnalysis",
    "DashboardResponse",
    "SubscriptionResponse",
]
