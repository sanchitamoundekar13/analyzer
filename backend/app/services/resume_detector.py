"""
Resume Detector & Structure Validator Service for ResumeLens.
Evaluates independent resume signals, calculates explainable 0-100 Resume Confidence,
and determines if the document should be accepted, warned (uncertain), or rejected.
"""

import re
from typing import Dict, Any, List
from ..nlp.section_detector import detect_sections
from ..nlp.entity_extractor import extract_entities
from ..nlp.skill_intelligence import extract_skills_from_text
from .document_classifier import (
    classify_document, 
    DOC_TYPE_RESUME, 
    DOC_TYPE_OTHER, 
    DOCUMENT_DISPLAY_NAMES
)

CONFIDENCE_THRESHOLD_ACCEPT = 85
CONFIDENCE_THRESHOLD_UNCERTAIN = 60

def validate_and_score_resume(
    text: str,
    filename: str = "document.pdf",
    force_analysis: bool = False
) -> Dict[str, Any]:
    """
    Validates document structure, executes classification, and computes 0-100 Resume Confidence.
    
    Returns:
        Dict with keys:
            - status: str ('success', 'uncertain', 'rejected')
            - document_type: str
            - document_type_label: str
            - resume_confidence: int (0-100)
            - is_resume: bool
            - confidence_breakdown: Dict[str, Any]
            - detected_sections: List[str]
            - missing_sections: List[str]
            - detected_elements: Dict[str, bool]
            - reason: Optional[str]
            - message: str
            - requires_confirmation: bool
            - extracted_entities: Dict[str, Any]
            - extracted_sections: Dict[str, Any]
    """
    cleaned_text = (text or "").strip()
    if len(cleaned_text) < 30:
        return {
            "status": "rejected",
            "document_type": DOC_TYPE_OTHER,
            "document_type_label": "Empty / Unreadable Document",
            "resume_confidence": 0,
            "is_resume": False,
            "confidence_breakdown": {},
            "detected_sections": [],
            "missing_sections": ["Contact Information", "Education", "Skills", "Experience"],
            "detected_elements": {},
            "reason": "unreadable_or_empty",
            "message": "Unable to read this document. Please upload a clear PDF or DOCX version of your resume.",
            "requires_confirmation": False,
            "extracted_entities": {},
            "extracted_sections": {}
        }

    # 1. Step: Document Classification
    classification = classify_document(cleaned_text, filename)
    doc_type = classification["primary_type"]

    # 2. Step: Structure & Entity Extraction
    section_data = detect_sections(cleaned_text)
    entities = extract_entities(cleaned_text, section_data["sections"])
    skills_data = extract_skills_from_text(cleaned_text)

    # 3. Weighted 0-100 Confidence Calculation
    breakdown: Dict[str, Dict[str, Any]] = {}
    total_confidence = 0

    # (A) Contact Information (Max 15 pts)
    contact_pts = 0
    has_email = bool(entities.get("email"))
    has_phone = bool(entities.get("phone"))
    has_links = bool(entities.get("linkedin") or entities.get("github") or entities.get("website"))
    if has_email: contact_pts += 7
    if has_phone: contact_pts += 5
    if has_links: contact_pts += 3
    breakdown["contact_information"] = {
        "score": contact_pts,
        "max": 15,
        "label": "Contact Information",
        "details": f"Email: {'✓' if has_email else '✗'}, Phone: {'✓' if has_phone else '✗'}, Links: {'✓' if has_links else '✗'}"
    }
    total_confidence += contact_pts

    # (B) Candidate Name Header (Max 10 pts)
    name = entities.get("name", "")
    has_valid_name = bool(name and name != "Candidate Name" and len(name.split()) in [2, 3, 4])
    name_pts = 10 if has_valid_name else (5 if name else 0)
    breakdown["candidate_name"] = {
        "score": name_pts,
        "max": 10,
        "label": "Candidate Header",
        "details": f"Candidate name: '{name}'" if name else "No clear candidate name header found"
    }
    total_confidence += name_pts

    # (C) Education Section (Max 15 pts)
    edu_text = section_data.get("sections", {}).get("education", "")
    has_edu_sec = "education" in section_data.get("detected_sections", [])
    has_degrees = len(entities.get("degrees", [])) > 0
    edu_pts = (7 if has_edu_sec else 0) + (8 if has_degrees else (4 if len(edu_text) > 20 else 0))
    edu_pts = min(15, edu_pts)
    breakdown["education"] = {
        "score": edu_pts,
        "max": 15,
        "label": "Education Details",
        "details": f"Education section: {'✓' if has_edu_sec else '✗'}, Degrees: {', '.join(entities.get('degrees', [])) or 'None'}"
    }
    total_confidence += edu_pts

    # (D) Skills Section (Max 15 pts)
    raw_skills = extract_skills_from_text(cleaned_text)
    detected_skills_list = [s["name"] if isinstance(s, dict) else str(s) for s in raw_skills]
    has_skills_sec = "skills" in section_data.get("detected_sections", [])
    detected_skills_count = len(detected_skills_list)
    skills_pts = (7 if has_skills_sec else 0) + (8 if detected_skills_count >= 3 else (4 if detected_skills_count >= 1 else 0))
    skills_pts = min(15, skills_pts)
    breakdown["skills"] = {
        "score": skills_pts,
        "max": 15,
        "label": "Skills & Competencies",
        "details": f"{detected_skills_count} canonical skills identified ({', '.join(detected_skills_list[:4])})"
    }
    total_confidence += skills_pts

    # (E) Experience / Projects / Internship (Max 20 pts)
    has_exp_sec = "experience" in section_data.get("detected_sections", [])
    has_proj_sec = "projects" in section_data.get("detected_sections", [])
    bullets_count = entities.get("total_bullets_count", 0)
    has_dates = entities.get("dates_detected", False)
    
    exp_pts = 0
    if has_exp_sec or has_proj_sec: exp_pts += 10
    if has_dates: exp_pts += 5
    if bullets_count >= 2: exp_pts += 5
    elif bullets_count >= 1: exp_pts += 3
    exp_pts = min(20, exp_pts)
    breakdown["experience_projects"] = {
        "score": exp_pts,
        "max": 20,
        "label": "Experience & Projects",
        "details": f"Experience/Projects section: {'✓' if (has_exp_sec or has_proj_sec) else '✗'}, Timelines: {'✓' if has_dates else '✗'}, Bullets: {bullets_count}"
    }
    total_confidence += exp_pts

    # (F) Section Structure & Multi-Section Flow (Max 15 pts)
    sec_count = section_data.get("section_count", 0)
    struct_pts = min(10, sec_count * 3) + (5 if section_data.get("is_standard_order", False) else 0)
    struct_pts = min(15, struct_pts)
    breakdown["section_structure"] = {
        "score": struct_pts,
        "max": 15,
        "label": "Resume Section Flow",
        "details": f"{sec_count} distinct resume sections identified"
    }
    total_confidence += struct_pts

    # (G) Professional Profile / Summary (Max 5 pts)
    has_summary = "summary" in section_data.get("detected_sections", [])
    sum_pts = 5 if has_summary else 0
    breakdown["professional_summary"] = {
        "score": sum_pts,
        "max": 5,
        "label": "Professional Summary",
        "details": f"Summary / Objective: {'✓' if has_summary else '✗'}"
    }
    total_confidence += sum_pts

    # (H) Terminology & Action Verbs (Max 5 pts)
    strong_verbs = entities.get("strong_action_bullets_count", 0)
    term_pts = min(5, max(0, strong_verbs))
    breakdown["terminology"] = {
        "score": term_pts,
        "max": 5,
        "label": "Resume Terminology",
        "details": f"{strong_verbs} strong action verbs identified"
    }
    total_confidence += term_pts

    # Penalty if Non-Resume Document Type is strongly classified
    if doc_type != DOC_TYPE_RESUME and not classification["is_resume"]:
        # Substantially reduce resume confidence for non-resume document classes
        penalty = 40 if doc_type in ["academic_assignment", "marksheet", "invoice", "certificate", "research_paper"] else 25
        total_confidence = max(5, total_confidence - penalty)

    # Normalize within 0-100
    total_confidence = min(100, max(0, total_confidence))

    # Missing vs Detected Sections
    detected_sections_list = section_data.get("detected_sections", [])
    all_standard_sections = ["Summary", "Experience", "Skills", "Education", "Projects", "Certifications"]
    missing_sections_list = [s for s in all_standard_sections if s.lower() not in [d.lower() for d in detected_sections_list]]

    detected_elements = {
        "candidate_name": has_valid_name,
        "contact_info": has_email or has_phone,
        "education": has_edu_sec or has_degrees,
        "skills": has_skills_sec or (detected_skills_count >= 2),
        "experience_or_projects": has_exp_sec or has_proj_sec or bullets_count >= 2
    }

    # Decision Matrix
    # Non-resume type specific messages
    rejection_messages = {
        "academic_assignment": "This document appears to be an Academic Assignment rather than a Resume or CV.",
        "research_paper": "This document appears to be a Research Paper rather than a Resume or CV.",
        "marksheet": "This document appears to be an Academic Marksheet / Transcript rather than a Resume or CV.",
        "certificate": "Certificates cannot be analyzed as resumes. Please upload your Resume or CV.",
        "invoice": "Invoices and financial bills cannot be analyzed as resumes. Please upload your Resume or CV.",
        "cover_letter": "This appears to be a Cover Letter. ResumeLens currently analyzes Resumes and CVs.",
        "other": "This document does not appear to be a Resume or CV."
    }

    if doc_type != DOC_TYPE_RESUME and not classification["is_resume"] and total_confidence < CONFIDENCE_THRESHOLD_UNCERTAIN:
        status = "rejected"
        reason = "not_a_resume"
        message = rejection_messages.get(doc_type, "This document does not appear to be a Resume or CV. Please upload a document containing your education, skills, projects, work experience, or contact details.")
        requires_confirmation = False
    elif total_confidence < CONFIDENCE_THRESHOLD_UNCERTAIN:
        status = "rejected"
        reason = "insufficient_resume_structure"
        message = "We could not find enough resume-specific information in this document. ResumeLens analyzes resumes and CVs only."
        requires_confirmation = False
    elif total_confidence < CONFIDENCE_THRESHOLD_ACCEPT:
        if force_analysis:
            status = "success"
            reason = "user_confirmed_uncertain_resume"
            message = "Resume analysis proceeded with user confirmation."
            requires_confirmation = False
        else:
            status = "uncertain"
            reason = "uncertain_resume_structure"
            message = "We found some resume-like information, but this document does not clearly appear to be a complete resume. Please make sure you uploaded your Resume or CV."
            requires_confirmation = True
    else:
        status = "success"
        reason = "valid_resume"
        message = "Resume detected successfully."
        requires_confirmation = False

    return {
        "status": status,
        "document_type": doc_type,
        "document_type_label": DOCUMENT_DISPLAY_NAMES.get(doc_type, "Document"),
        "resume_confidence": total_confidence,
        "is_resume": status == "success" or (status == "uncertain" and force_analysis),
        "confidence_breakdown": breakdown,
        "detected_sections": detected_sections_list,
        "missing_sections": missing_sections_list,
        "detected_elements": detected_elements,
        "reason": reason,
        "message": message,
        "requires_confirmation": requires_confirmation,
        "extracted_entities": entities,
        "extracted_sections": section_data
    }
