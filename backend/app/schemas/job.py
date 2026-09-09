"""
Job Description schemas for ResumeLens.
"""

from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel
from .enums import RequirementType

class JobDescriptionCreate(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    description: str

class JobRequirement(BaseModel):
    text: str
    requirement_type: RequirementType = RequirementType.REQUIRED
    category: str
    skills: List[str] = []
    confidence: float = 1.0

class ParsedJobDescription(BaseModel):
    title: Optional[str] = None
    company: Optional[str] = None
    required_skills: List[str] = []
    preferred_skills: List[str] = []
    requirements: List[JobRequirement] = []
    responsibilities: List[str] = []
    education_requirements: List[str] = []
    experience_requirements: List[str] = []
    raw_text: str = ""

class JobResponse(BaseModel):
    id: str
    title: Optional[str] = None
    company: Optional[str] = None
    parsed_data: Optional[ParsedJobDescription] = None
    created_at: datetime = datetime.utcnow()
