"""
Enums for ResumeLens backend schemas.
"""

from enum import Enum

class ResumeFileType(str, Enum):
    PDF = "pdf"
    DOCX = "docx"
    TXT = "txt"

class ResumeStatus(str, Enum):
    UPLOADED = "uploaded"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class AnalysisStatus(str, Enum):
    QUEUED = "queued"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class RequirementType(str, Enum):
    REQUIRED = "required"
    PREFERRED = "preferred"
    OPTIONAL = "optional"

class SkillLevel(str, Enum):
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"
    EXPERT = "expert"

class RecommendationPriority(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"

class EvidenceType(str, Enum):
    POSITIVE = "positive"
    NEGATIVE = "negative"
    MISSING = "missing"
    WARNING = "warning"
