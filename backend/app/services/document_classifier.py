"""
Document Classifier Service for ResumeLens.
Hybrid document classifier combining structural pattern detection, lexical signatures,
and domain-specific semantic scoring to accurately distinguish Resumes/CVs from non-resume documents.
"""

import re
from typing import Dict, Any, List, Tuple

# Document Types
DOC_TYPE_RESUME = "resume"
DOC_TYPE_COVER_LETTER = "cover_letter"
DOC_TYPE_ACADEMIC_ASSIGNMENT = "academic_assignment"
DOC_TYPE_RESEARCH_PAPER = "research_paper"
DOC_TYPE_MARKSHEET = "marksheet"
DOC_TYPE_CERTIFICATE = "certificate"
DOC_TYPE_INVOICE = "invoice"
DOC_TYPE_OTHER = "other"

DOCUMENT_DISPLAY_NAMES = {
    DOC_TYPE_RESUME: "Resume / CV",
    DOC_TYPE_COVER_LETTER: "Cover Letter",
    DOC_TYPE_ACADEMIC_ASSIGNMENT: "Academic Assignment",
    DOC_TYPE_RESEARCH_PAPER: "Research Paper",
    DOC_TYPE_MARKSHEET: "Academic Marksheet / Transcript",
    DOC_TYPE_CERTIFICATE: "Certificate",
    DOC_TYPE_INVOICE: "Invoice / Financial Bill",
    DOC_TYPE_OTHER: "General Document / Unknown"
}

# Lexical signatures for non-resume document types
DOCUMENT_SIGNATURES = {
    DOC_TYPE_ACADEMIC_ASSIGNMENT: {
        "strong_patterns": [
            r"\b(?:assignment\s+(?:no\.?|number|\d+)|homework|problem\s+set|lab\s+report|coursework|tutorial\s+sheet)\b",
            r"\b(?:submitted\s+(?:by|to)|roll\s+(?:no|number)|reg(?:istration)?\s+no|student\s+id)\b",
            r"\b(?:question\s+\d+|q\.\s*\d+|exercise\s+\d+|solution\s+to\s+problem|problem\s+\d+)\b",
            r"\b(?:department\s+of\s+[a-z\s]+|professor|instructor|faculty\s+of|semester\s+[ivx\d]+)\b",
            r"\b(?:chapter\s+\d+|topic\s*:\s*|subject\s*:\s*[a-z\s]+|due\s+date)\b"
        ],
        "keywords": [
            "assignment", "homework", "question", "questions", "answer", "answers", "solution",
            "theorem", "derive", "proof", "submission", "student id", "enrollment", "course code",
            "roll no", "submitted by", "submitted to", "faculty advisor", "lab manual"
        ],
        "weight": 1.2
    },
    DOC_TYPE_RESEARCH_PAPER: {
        "strong_patterns": [
            r"\b(?:abstract\b[\s\S]{10,200}?\b(?:introduction|keywords|index terms)\b)",
            r"\b(?:doi\s*:\s*10\.\d{4,9}\/[-._;()\/:A-Z0-9]+|arxiv\s*:\s*\d{4}\.\d{4,5})\b",
            r"\b(?:ieee|acm|elsevier|springer|proceedings\s+of|journal\s+of|transactions\s+on)\b",
            r"\b(?:methodology|experimental\s+results|literature\s+review|concluding\s+remarks|acknowledgments)\b",
            r"\b(?:references|bibliography)\s*\n\s*\[\d+\]"
        ],
        "keywords": [
            "abstract", "introduction", "methodology", "literature review", "related work",
            "experimental results", "conclusion", "references", "bibliography", "citation",
            "peer reviewed", "proceedings", "hypothesis", "dataset", "ablation study", "arxiv"
        ],
        "weight": 1.3
    },
    DOC_TYPE_MARKSHEET: {
        "strong_patterns": [
            r"\b(?:statement\s+of\s+marks|grade\s+card|academic\s+transcript|mark\s*sheet|official\s+transcript)\b",
            r"\b(?:sgpa|cgpa|gpa|credits\s+earned|total\s+credits|grade\s+points?|letter\s+grade)\b",
            r"\b(?:semester\s+[ivx\d]+|term\s+examination|academic\s+year\s+\d{4}|\bexamination\s+held\s+in\b)\b",
            r"\b(?:course\s+code\s+course\s+title|subject\s+code|max\s+marks|marks\s+obtained|pass\/fail)\b",
            r"\b(?:controller\s+of\s+examinations|registrar|board\s+of\s+secondary\s+education)\b"
        ],
        "keywords": [
            "marksheet", "transcript", "sgpa", "cgpa", "grade card", "marks obtained",
            "credits", "semester", "passed in first class", "controller of examination",
            "max marks", "subject code", "course code", "grade point", "backlog", "re-evaluation"
        ],
        "weight": 1.4
    },
    DOC_TYPE_CERTIFICATE: {
        "strong_patterns": [
            r"\b(?:certificate\s+of\s+(?:completion|achievement|appreciation|participation|excellence|merit))\b",
            r"\b(?:this\s+is\s+to\s+certify\s+that|hereby\s+certifies\s+that|is\s+proudly\s+presented\s+to)\b",
            r"\b(?:has\s+successfully\s+completed|has\s+demonstrated\s+excellence|in\s+recognition\s+of)\b",
            r"\b(?:authorized\s+signature|certificate\s+id|verification\s+code|issued\s+on)\b"
        ],
        "keywords": [
            "certificate", "certify", "certifies", "awarded to", "presented to", "completion",
            "participation", "successful completion", "credential id", "authorized signatory",
            "issued date", "license number", "verification url", "honorable mention"
        ],
        "weight": 1.4
    },
    DOC_TYPE_INVOICE: {
        "strong_patterns": [
            r"\b(?:tax\s+invoice|commercial\s+invoice|bill\s+to|ship\s+to|invoice\s+(?:no|number|#))\b",
            r"\b(?:payment\s+due|due\s+date|subtotal|total\s+amount|amount\s+due|balance\s+due)\b",
            r"\b(?:gstin|vat\s+reg|tax\s+id|item\s+description\s+qty\s+rate\s+amount)\b",
            r"\b(?:bank\s+account\s+no|swift\s+code|iban|remit\s+payment\s+to)\b"
        ],
        "keywords": [
            "invoice", "bill to", "ship to", "total amount", "subtotal", "tax", "vat", "gst",
            "gstin", "invoice date", "due date", "amount due", "payment terms", "bank details",
            "unit price", "quantity", "remittance", "client invoice"
        ],
        "weight": 1.4
    },
    DOC_TYPE_COVER_LETTER: {
        "strong_patterns": [
            r"\b(?:dear\s+(?:hiring\s+manager|recruiter|selection\s+committee|mr\.|ms\.|dr\.|team))\b",
            r"\b(?:i\s+am\s+writing\s+to\s+(?:apply|express\s+my\s+interest|submit\s+my\s+candidacy))\b",
            r"\b(?:sincerely|best\s+regards|warm\s+regards|respectfully|yours\s+truly)[\s\S]{1,50}$",
            r"\b(?:thank\s+you\s+for\s+your\s+time\s+and\s+consideration|look\s+forward\s+to\s+hearing\s+from\s+you)\b"
        ],
        "keywords": [
            "cover letter", "dear hiring manager", "dear recruiter", "sincerely", "yours truly",
            "i am writing to apply", "enthusiastic about the opportunity", "consideration for the position",
            "thank you for your time and consideration", "attached resume"
        ],
        "weight": 1.3
    }
}

# Resume positive signals
RESUME_POSITIVE_PATTERNS = [
    r"\b(?:work\s+experience|professional\s+experience|employment\s+history|career\s+history)\b",
    r"\b(?:technical\s+skills|core\s+competencies|key\s+skills|areas\s+of\s+expertise)\b",
    r"\b(?:education|academic\s+background|degrees)\b",
    r"\b(?:projects|featured\s+projects|personal\s+projects|portfolio)\b",
    r"\b(?:certifications|licenses\s+and\s+certifications)\b",
    r"\b(?:professional\s+summary|career\s+objective|profile\s+summary)\b"
]


def classify_document(text: str, filename: str = "") -> Dict[str, Any]:
    """
    Classifies the input document into a detected document category.
    
    Returns:
        Dict with keys:
            - primary_type: str (e.g. 'resume', 'academic_assignment', 'research_paper', ...)
            - display_name: str
            - is_resume: bool
            - confidence_percentage: int
            - matched_signals: List[str]
            - candidate_scores: Dict[str, float]
            - explanation: str
    """
    cleaned_text = text or ""
    text_lower = cleaned_text.lower()
    fname_lower = (filename or "").lower()

    scores: Dict[str, float] = {
        DOC_TYPE_RESUME: 0.0,
        DOC_TYPE_COVER_LETTER: 0.0,
        DOC_TYPE_ACADEMIC_ASSIGNMENT: 0.0,
        DOC_TYPE_RESEARCH_PAPER: 0.0,
        DOC_TYPE_MARKSHEET: 0.0,
        DOC_TYPE_CERTIFICATE: 0.0,
        DOC_TYPE_INVOICE: 0.0,
        DOC_TYPE_OTHER: 5.0
    }
    matched_reasons: Dict[str, List[str]] = {k: [] for k in scores}

    # 1. Check filename hints (soft boost)
    if "resume" in fname_lower or "cv" in fname_lower:
        scores[DOC_TYPE_RESUME] += 8.0
    elif "assignment" in fname_lower or "homework" in fname_lower:
        scores[DOC_TYPE_ACADEMIC_ASSIGNMENT] += 15.0
    elif "paper" in fname_lower or "ieee" in fname_lower or "arxiv" in fname_lower:
        scores[DOC_TYPE_RESEARCH_PAPER] += 15.0
    elif "transcript" in fname_lower or "marksheet" in fname_lower or "grade" in fname_lower:
        scores[DOC_TYPE_MARKSHEET] += 15.0
    elif "certificate" in fname_lower:
        scores[DOC_TYPE_CERTIFICATE] += 15.0
    elif "invoice" in fname_lower or "bill" in fname_lower:
        scores[DOC_TYPE_INVOICE] += 15.0
    elif "cover" in fname_lower and "letter" in fname_lower:
        scores[DOC_TYPE_COVER_LETTER] += 15.0

    # 2. Evaluate Non-Resume Signatures
    for doc_type, sig_config in DOCUMENT_SIGNATURES.items():
        weight = sig_config["weight"]
        # Strong regex patterns
        for pattern in sig_config["strong_patterns"]:
            matches = re.findall(pattern, text_lower, re.IGNORECASE | re.MULTILINE)
            if matches:
                scores[doc_type] += (22.0 * weight * min(2, len(matches)))
                matched_reasons[doc_type].append(f"Matched pattern: '{pattern[:30]}...'")

        # Keyword occurrences
        for kw in sig_config["keywords"]:
            count = text_lower.count(kw)
            if count > 0:
                scores[doc_type] += (min(3, count) * 4.0 * weight)
                if len(matched_reasons[doc_type]) < 5:
                    matched_reasons[doc_type].append(f"Keyword: '{kw}' ({count}x)")

    # 3. Evaluate Resume Positive Signatures
    resume_section_hits = 0
    for pat in RESUME_POSITIVE_PATTERNS:
        if re.search(pat, text_lower, re.IGNORECASE):
            scores[DOC_TYPE_RESUME] += 16.0
            resume_section_hits += 1
            matched_reasons[DOC_TYPE_RESUME].append(f"Found standard resume section: {pat}")

    # Contact info signals for resume
    if re.search(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', cleaned_text):
        scores[DOC_TYPE_RESUME] += 10.0
    if re.search(r'(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', cleaned_text):
        scores[DOC_TYPE_RESUME] += 8.0
    if "linkedin.com" in text_lower or "github.com" in text_lower:
        scores[DOC_TYPE_RESUME] += 10.0

    # Strong penalty on Resume if other document type signals dominate
    # E.g., if marksheet/assignment keywords are overwhelming
    top_non_resume_type = max(
        [k for k in scores if k != DOC_TYPE_RESUME and k != DOC_TYPE_OTHER],
        key=lambda k: scores[k]
    )
    top_non_resume_score = scores[top_non_resume_type]
    resume_score = scores[DOC_TYPE_RESUME]

    # Decide Primary Classification
    if top_non_resume_score >= 35.0 and top_non_resume_score > resume_score:
        primary_type = top_non_resume_type
        is_resume = False
    elif resume_score >= 25.0 and resume_section_hits >= 2:
        primary_type = DOC_TYPE_RESUME
        is_resume = True
    elif top_non_resume_score >= 20.0:
        primary_type = top_non_resume_type
        is_resume = False
    elif resume_score > 15.0:
        primary_type = DOC_TYPE_RESUME
        is_resume = True
    else:
        primary_type = DOC_TYPE_OTHER
        is_resume = False

    # Calculate confidence percentage
    total_score = sum(scores.values()) or 1.0
    top_score = scores[primary_type]
    confidence_pct = min(99, max(40, int((top_score / total_score) * 100) if total_score > 0 else 50))

    # Construct user-facing explanation
    if is_resume:
        explanation = f"Classified as Resume/CV with {confidence_pct}% structural confidence based on standard sections and professional timeline."
    else:
        disp_name = DOCUMENT_DISPLAY_NAMES.get(primary_type, "Non-Resume Document")
        explanation = f"Detected characteristics of {disp_name}. ResumeLens is specialized strictly for Resumes and CVs."

    return {
        "primary_type": primary_type,
        "display_name": DOCUMENT_DISPLAY_NAMES.get(primary_type, "Unknown Document"),
        "is_resume": is_resume,
        "confidence_percentage": confidence_pct,
        "matched_signals": matched_reasons[primary_type][:5],
        "candidate_scores": {k: round(v, 1) for k, v in scores.items()},
        "explanation": explanation
    }
