"""
Evidence schema for ResumeLens.
Evidence is a core ResumeLens concept representing verifiable proof from the resume.
"""

from typing import Optional
from pydantic import BaseModel
from .enums import EvidenceType


class Evidence(BaseModel):
    id: str
    evidence_type: EvidenceType
    category: str
    claim: str
    source: str
    section: Optional[str] = None
    text: Optional[str] = None
    page_number: Optional[int] = None
    confidence: float = 1.0
