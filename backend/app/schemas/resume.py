"""
Resume and parser entity schemas for ResumeLens.
"""

from datetime import datetime, date
from typing import Optional, List, Any
from pydantic import BaseModel, EmailStr, HttpUrl, Field
from .enums import ResumeFileType, ResumeStatus

class CandidateSchema(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    location: Optional[str] = None

class ResumeLinks(BaseModel):
    linkedin: Optional[str] = None
    github: Optional[str] = None
    portfolio: Optional[str] = None
    other: List[str] = []

class EducationSchema(BaseModel):
    institution: Optional[str] = None
    degree: Optional[str] = None
    field_of_study: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    grade: Optional[str] = None
    location: Optional[str] = None
    description: Optional[str] = None

class ExperienceBullet(BaseModel):
    text: str
    action_verb: Optional[str] = None
    has_metric: bool = False
    metrics: List[str] = []
    technologies: List[str] = []

class ExperienceSchema(BaseModel):
    company: Optional[str] = None
    job_title: Optional[str] = None
    location: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    is_current: bool = False
    bullets: List[ExperienceBullet] = []

class ProjectSchema(BaseModel):
    name: str
    description: Optional[str] = None
    technologies: List[str] = []
    bullets: List[str] = []
    url: Optional[str] = None

class CertificationSchema(BaseModel):
    name: str
    issuer: Optional[str] = None
    issue_date: Optional[str] = None
    expiry_date: Optional[str] = None
    credential_id: Optional[str] = None
    url: Optional[str] = None

class AchievementSchema(BaseModel):
    title: str
    description: Optional[str] = None
    organization: Optional[str] = None
    year: Optional[int] = None

class SkillSchema(BaseModel):
    name: str
    normalized_name: str
    category: Optional[str] = None
    confidence: float = Field(default=1.0, ge=0, le=1)
    evidence: List[str] = []

class ParsedResumeSchema(BaseModel):
    candidate: CandidateSchema = Field(default_factory=CandidateSchema)
    links: ResumeLinks = Field(default_factory=ResumeLinks)
    summary: Optional[str] = None
    objective: Optional[str] = None
    education: List[EducationSchema] = []
    experience: List[ExperienceSchema] = []
    projects: List[ProjectSchema] = []
    skills: List[SkillSchema] = []
    certifications: List[CertificationSchema] = []
    achievements: List[AchievementSchema] = []
    extracurriculars: List[str] = []
    publications: List[str] = []
    raw_text: str = ""
    page_count: int = 1

class ResumeSection(BaseModel):
    section_type: str
    title: str
    content: str
    order: int
    confidence: float = 1.0

class ResumeUploadResponse(BaseModel):
    id: str
    filename: str
    file_type: ResumeFileType
    status: ResumeStatus
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ResumeResponse(BaseModel):
    id: str
    filename: str
    file_type: ResumeFileType
    version: int = 1
    status: ResumeStatus
    parsed_resume: Optional[ParsedResumeSchema] = None
    overall_score: Optional[float] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
