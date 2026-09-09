"""
ATS Diagnostic and layout inspection schemas for ResumeLens.
"""

from typing import Optional, List
from pydantic import BaseModel

class FormattingIssue(BaseModel):
    issue_type: str
    severity: str
    description: str
    evidence: Optional[str] = None
    recommendation: str

class FormattingAnalysis(BaseModel):
    page_count: int = 1
    has_multiple_columns: bool = False
    has_tables: bool = False
    has_text_boxes: bool = False
    has_images: bool = False
    has_headers: bool = False
    has_footers: bool = False
    font_consistency: float = 1.0
    whitespace_score: float = 1.0
    issues: List[FormattingIssue] = []

class ATSCheck(BaseModel):
    name: str
    passed: bool
    score: float
    severity: str
    description: str
    recommendation: Optional[str] = None

class ATSAnalysis(BaseModel):
    score: float
    checks: List[ATSCheck] = []
    text_extraction_score: float = 100.0
    section_detection_score: float = 100.0
    layout_score: float = 100.0
    contact_parsing_score: float = 100.0
    date_parsing_score: float = 100.0
    formatting_score: float = 100.0
