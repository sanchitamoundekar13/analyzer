"""
ResumeLens FastAPI Backend Server.
Industrial-grade ATS Analyzer, 7-dimension scoring engine, and AI career optimization API.
"""

import os
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .parsers.pdf_parser import parse_pdf
from .parsers.docx_parser import parse_docx
from .parsers.text_cleaner import clean_text
from .nlp.section_detector import detect_sections
from .nlp.entity_extractor import extract_entities
from .nlp.skill_intelligence import extract_skills_from_text, match_skills_against_job
from .nlp.semantic_matcher import compute_semantic_match
from .ats.ats_analyzer import audit_ats_compatibility
from .scoring.scoring_engine import calculate_full_score
from .llm.bullet_optimizer import generate_bullet_rewrites
from .llm.evidence_vault import extract_evidence_vault
from .llm.cover_letter_gen import generate_cover_letter

app = FastAPI(
    title="ResumeLens AI API",
    description="Evidence-Based AI Resume Analyzer, ATS Parser & Career Intelligence Platform",
    version="2.0.0"
)

# Enable CORS for local dev and cloud frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/health")
def health_check():
    """Service health and diagnostics check."""
    return {
        "status": "healthy",
        "service": "ResumeLens API",
        "version": "2.0.0",
        "engines": ["PyMuPDF", "pdfplumber", "python-docx", "NLP-Taxonomy", "Deterministic-7D-Scoring"]
    }

@app.post("/api/v1/resumes/analyze")
async def analyze_resume(
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None),
    job_description: Optional[str] = Form("")
):
    """
    Primary endpoint: Uploads and analyzes resume through the full parsing,
    ATS layout audit, skill intelligence, 7-dimension scoring, and evidence extraction pipeline.
    """
    filename = "resume.pdf"
    parsed_doc = {}

    if file:
        filename = file.filename or "resume.pdf"
        file_bytes = await file.read()
        if filename.lower().endswith(".pdf"):
            parsed_doc = parse_pdf(file_bytes, filename)
        elif filename.lower().endswith(".docx") or filename.lower().endswith(".doc"):
            parsed_doc = parse_docx(file_bytes, filename)
        else:
            text = clean_text(file_bytes.decode("utf-8", errors="ignore"))
            parsed_doc = {
                "text": text,
                "filename": filename,
                "page_count": 1,
                "has_tables": False,
                "has_multi_column": False,
                "has_text_boxes": False,
                "has_tiny_fonts": False
            }
    elif raw_text:
        text = clean_text(raw_text)
        parsed_doc = {
            "text": text,
            "filename": "Pasted_Resume.txt",
            "page_count": 1,
            "has_tables": False,
            "has_multi_column": False,
            "has_text_boxes": False,
            "has_tiny_fonts": False
        }
    else:
        raise HTTPException(status_code=400, detail="Please provide a resume file or raw text.")

    full_text = parsed_doc.get("text", "")
    if len(full_text.strip()) < 30:
        raise HTTPException(status_code=400, detail="Document appears empty or could not extract readable text.")

    # 1. Section Detection
    section_data = detect_sections(full_text)

    # 2. Entity & Contact Extraction
    entities = extract_entities(full_text, section_data["sections"])

    # 3. Skill Taxonomy Intelligence & JD Matching
    jd = job_description or ""
    skills_data = match_skills_against_job(full_text, jd)

    # 4. Semantic & Keyword Match
    jd_match_data = compute_semantic_match(full_text, jd, skills_data["match_percentage"])

    # 5. Deep ATS Audit
    ats_data = audit_ats_compatibility(parsed_doc, entities, section_data)

    # 6. Deterministic 7-Dimension 0-100 Scoring
    score_data = calculate_full_score(ats_data, entities, skills_data, jd_match_data, section_data)

    # 7. Evidence Vault Extraction
    evidence_vault = extract_evidence_vault(full_text, entities["all_bullets"])

    # 8. AI Bullet Rewrites
    bullet_rewrites = generate_bullet_rewrites(entities["weak_bullets_sample"], skills_data["matched_skills"])

    # 9. Career Role Alignment
    matched_roles = _calculate_career_roles(skills_data["matched_skills"])

    return {
        "id": f"scan-{os.urandom(4).hex()}",
        "filename": filename,
        "candidate_name": entities["name"],
        "analyzed_at": "Just now",
        "page_count": parsed_doc.get("page_count", 1),
        "overall_score": score_data["overall_score"],
        "reachable_target": score_data["reachable_target"],
        "status": score_data["status"],
        "status_color": score_data["status_color"],
        "total_points_lost": score_data["total_points_lost"],
        "score_breakdown": score_data["dimensions"],
        "deductions": score_data["deductions"],
        "priority_fixes": score_data["priority_fixes"],
        "ats_audit": ats_data,
        "job_match": jd_match_data,
        "skills_analysis": skills_data,
        "entities": entities,
        "sections": section_data,
        "evidence_vault": evidence_vault,
        "bullet_rewrites": bullet_rewrites,
        "career_roles": matched_roles
    }

class MatchRequest(BaseModel):
    resume_text: str
    job_description: str

@app.post("/api/v1/jobs/match")
def match_job_description(payload: MatchRequest):
    """Matches a resume against a specific target job posting."""
    skills_data = match_skills_against_job(payload.resume_text, payload.job_description)
    match_data = compute_semantic_match(payload.resume_text, payload.job_description, skills_data["match_percentage"])
    return {
        "match_analytics": match_data,
        "skills_breakdown": skills_data
    }

class RewriteRequest(BaseModel):
    bullet_point: str
    target_role: Optional[str] = "Software Engineer"
    skills: Optional[List[str]] = []

@app.post("/api/v1/resumes/rewrite")
def rewrite_bullet_point(payload: RewriteRequest):
    """Optimizes an individual bullet point into STAR impact format."""
    rewrites = generate_bullet_rewrites([payload.bullet_point], payload.skills or [])
    return {"rewritten_bullet": rewrites[0] if rewrites else {}}

class CoverLetterRequest(BaseModel):
    candidate_name: str
    target_role: str
    target_company: str
    skills: Optional[List[str]] = []
    achievements: Optional[List[str]] = []
    tone: Optional[str] = "Professional"

@app.post("/api/v1/cover-letter")
def generate_custom_cover_letter(payload: CoverLetterRequest):
    """Generates an evidence-backed tailored cover letter."""
    text = generate_cover_letter(
        payload.candidate_name,
        payload.target_role,
        payload.target_company,
        payload.skills or [],
        payload.achievements or [],
        payload.tone or "Professional"
    )
    return {"cover_letter": text}

def _calculate_career_roles(detected_skills: List[str]) -> List[Dict[str, Any]]:
    """Recommends top matching roles based on detected skills."""
    skills_set = set(detected_skills)
    roles = [
        {"role": "Full Stack Engineer", "skills": {"React", "Node.js", "TypeScript", "PostgreSQL", "REST API"}, "base": 88},
        {"role": "Frontend Developer", "skills": {"React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"}, "base": 92},
        {"role": "Backend Engineer", "skills": {"Python", "FastAPI", "PostgreSQL", "Docker", "Node.js"}, "base": 82},
        {"role": "DevOps & Cloud Engineer", "skills": {"AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"}, "base": 65},
        {"role": "AI / ML Engineer", "skills": {"Python", "PyTorch", "Machine Learning", "Generative AI", "NLP"}, "base": 60}
    ]
    results = []
    for r in roles:
        overlap = len(skills_set.intersection(r["skills"]))
        pct = min(96, max(45, r["base"] + (overlap * 4)))
        results.append({
            "role": r["role"],
            "match_pct": pct,
            "matched_skills": list(skills_set.intersection(r["skills"]))
        })
    results.sort(key=lambda x: x["match_pct"], reverse=True)
    return results
