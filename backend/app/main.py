"""
ResumeLens FastAPI Backend Server.
Industrial-grade ATS Analyzer, 7-dimension scoring engine, and AI career optimization API.
"""

import os
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .services.file_validator import validate_uploaded_file
from .services.text_extractor import extract_document_payload
from .services.document_classifier import classify_document
from .services.resume_detector import validate_and_score_resume
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
        "engines": ["PyMuPDF", "pdfplumber", "python-docx", "NLP-Taxonomy", "Deterministic-7D-Scoring", "Resume-Classifier"]
    }

@app.post("/api/v1/resumes/validate")
async def validate_document_endpoint(
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None)
):
    """
    Validation Pre-flight endpoint: Checks format, readability, document classification,
    and calculates 0-100 Resume Confidence without running ATS engines.
    """
    file_bytes = None
    filename = "document.pdf"
    if file:
        filename = file.filename or "document.pdf"
        file_bytes = await file.read()
        val_result = validate_uploaded_file(file_bytes, filename)
        if not val_result["is_valid"]:
            return {
                "status": "rejected",
                "document_type": "invalid_file",
                "document_type_label": "Invalid File",
                "resume_confidence": 0,
                "reason": val_result["error_type"],
                "message": val_result["message"]
            }

    doc_payload = extract_document_payload(file_bytes=file_bytes, filename=filename, raw_text=raw_text)
    if not doc_payload["is_readable"]:
        return {
            "status": "rejected",
            "document_type": "unreadable",
            "document_type_label": "Unreadable Document",
            "resume_confidence": 0,
            "reason": "unreadable_content",
            "message": doc_payload.get("error_message") or "Unable to read this document. Please upload a clear PDF or DOCX version of your resume."
        }

    validation = validate_and_score_resume(doc_payload["text"], filename=filename, force_analysis=False)
    return {
        "status": validation["status"],
        "document_type": validation["document_type"],
        "document_type_label": validation["document_type_label"],
        "resume_confidence": validation["resume_confidence"],
        "reason": validation["reason"],
        "message": validation["message"],
        "detected_sections": validation["detected_sections"],
        "missing_sections": validation["missing_sections"],
        "detected_elements": validation["detected_elements"],
        "confidence_breakdown": validation["confidence_breakdown"],
        "requires_confirmation": validation["requires_confirmation"]
    }

@app.post("/api/v1/resumes/analyze")
async def analyze_resume(
    file: Optional[UploadFile] = File(None),
    raw_text: Optional[str] = Form(None),
    job_description: Optional[str] = Form(""),
    force_analysis: Optional[bool] = Form(False)
):
    """
    Primary endpoint: Uploads and verifies resume through strict multi-stage validation pipeline:
    1. File Validation
    2. Text Extraction / OCR
    3. Document Classification
    4. Resume Structure Validation & Confidence Scoring
    5. Gate Decision -> If not resume, stops completely and never calls ATS/Scoring engine.
    6. If Resume -> Full deterministic ATS audit, 7D scoring, and career intelligence.
    """
    file_bytes = None
    filename = "resume.pdf"

    if file:
        filename = file.filename or "resume.pdf"
        file_bytes = await file.read()
        
        # 1. Step: File Validation
        file_val = validate_uploaded_file(file_bytes, filename)
        if not file_val["is_valid"]:
            return {
                "status": "rejected",
                "document_type": "invalid_file",
                "document_type_label": "Invalid File",
                "resume_confidence": 0,
                "reason": file_val["error_type"],
                "message": file_val["message"],
                "detected_sections": [],
                "missing_sections": ["Contact Information", "Education", "Skills", "Experience"],
                "detected_elements": {
                    "candidate_name": False,
                    "contact_info": False,
                    "education": False,
                    "skills": False,
                    "experience_or_projects": False
                }
            }
    elif not raw_text:
        return {
            "status": "rejected",
            "document_type": "other",
            "document_type_label": "Empty Document",
            "resume_confidence": 0,
            "reason": "empty_input",
            "message": "Please provide a resume file or raw text.",
            "detected_sections": [],
            "missing_sections": ["Contact Information", "Education", "Skills", "Experience"],
            "detected_elements": {
                "candidate_name": False,
                "contact_info": False,
                "education": False,
                "skills": False,
                "experience_or_projects": False
            }
        }

    # 2. Step: Text Extraction & OCR
    doc_payload = extract_document_payload(file_bytes=file_bytes, filename=filename, raw_text=raw_text)
    full_text = doc_payload.get("text", "").strip()

    if not doc_payload.get("is_readable") or len(full_text) < 30:
        return {
            "status": "rejected",
            "document_type": "unreadable",
            "document_type_label": "Unreadable Document",
            "resume_confidence": 0,
            "reason": "unreadable_content",
            "message": doc_payload.get("error_message") or "Unable to read this document. Please upload a clear PDF or DOCX version of your resume.",
            "detected_sections": [],
            "missing_sections": ["Contact Information", "Education", "Skills", "Experience"],
            "detected_elements": {
                "candidate_name": False,
                "contact_info": False,
                "education": False,
                "skills": False,
                "experience_or_projects": False
            }
        }

    # 3 & 4. Step: Document Classification & Resume Structure Confidence
    validation = validate_and_score_resume(full_text, filename=filename, force_analysis=bool(force_analysis))

    # 5. Step: Gate Decision
    if validation["status"] == "rejected":
        # STOP: Do NOT call ATS, Scoring, or LLM engines
        return {
            "status": "rejected",
            "document_type": validation["document_type"],
            "document_type_label": validation["document_type_label"],
            "resume_confidence": validation["resume_confidence"],
            "reason": validation["reason"],
            "message": validation["message"],
            "detected_sections": validation["detected_sections"],
            "missing_sections": validation["missing_sections"],
            "detected_elements": validation["detected_elements"],
            "confidence_breakdown": validation["confidence_breakdown"]
        }

    if validation["status"] == "uncertain" and not force_analysis:
        # Require confirmation before executing ATS analysis
        return {
            "status": "uncertain",
            "document_type": validation["document_type"],
            "document_type_label": validation["document_type_label"],
            "resume_confidence": validation["resume_confidence"],
            "reason": validation["reason"],
            "message": validation["message"],
            "detected_sections": validation["detected_sections"],
            "missing_sections": validation["missing_sections"],
            "detected_elements": validation["detected_elements"],
            "confidence_breakdown": validation["confidence_breakdown"],
            "requires_confirmation": True
        }

    # 6. Step: Genuine Resume Analysis (Executed ONLY for genuine resumes or user-confirmed uncertain resumes)
    section_data = validation["extracted_sections"]
    entities = validation["extracted_entities"]
    parsed_doc = {
        "text": full_text,
        "filename": filename,
        "page_count": doc_payload.get("page_count", 1),
        **doc_payload.get("layout_meta", {})
    }

    jd = job_description or ""
    skills_data = match_skills_against_job(full_text, jd)
    jd_match_data = compute_semantic_match(full_text, jd, skills_data["match_percentage"])
    ats_data = audit_ats_compatibility(parsed_doc, entities, section_data)
    score_data = calculate_full_score(ats_data, entities, skills_data, jd_match_data, section_data)
    evidence_vault = extract_evidence_vault(full_text, entities["all_bullets"])
    bullet_rewrites = generate_bullet_rewrites(entities["weak_bullets_sample"], skills_data["matched_skills"])
    matched_roles = _calculate_career_roles(skills_data["matched_skills"])

    return {
        "id": f"scan-{os.urandom(4).hex()}",
        "status": "success",
        "document_type": validation["document_type"],
        "document_type_label": validation["document_type_label"],
        "resume_confidence": validation["resume_confidence"],
        "filename": filename,
        "candidate_name": entities["name"],
        "analyzed_at": "Just now",
        "page_count": parsed_doc.get("page_count", 1),
        "overall_score": score_data["overall_score"],
        "reachable_target": score_data["reachable_target"],
        "quality_status": score_data["status"],
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
        "career_roles": matched_roles,
        "validation_summary": {
            "confidence": validation["resume_confidence"],
            "detected_sections": validation["detected_sections"],
            "detected_elements": validation["detected_elements"]
        }
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
