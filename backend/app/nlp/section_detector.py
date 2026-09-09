"""
Resume section detector module.
Identifies standard and non-standard section headers, validates standard ATS ordering,
and segments the raw text into distinct structured sections.
"""

import re
from typing import Dict, List, Any

SECTION_PATTERNS = {
    "summary": [
        r"^(?:professional\s+)?summary",
        r"^objective",
        r"^profile",
        r"^about\s+me",
        r"^career\s+summary",
        r"^executive\s+summary"
    ],
    "experience": [
        r"^(?:work\s+|professional\s+|employment\s+)?experience",
        r"^work\s+history",
        r"^employment\s+history",
        r"^career\s+history",
        r"^relevant\s+experience"
    ],
    "skills": [
        r"^(?:technical\s+|core\s+|key\s+)?skills",
        r"^technologies",
        r"^competencies",
        r"^areas\s+of\s+expertise",
        r"^technical\s+proficiencies"
    ],
    "education": [
        r"^education",
        r"^academic\s+background",
        r"^academic\s+qualifications",
        r"^degrees\s+and\s+education"
    ],
    "projects": [
        r"^(?:key\s+|featured\s+|academic\s+|personal\s+)?projects",
        r"^portfolio",
        r"^open\s+source"
    ],
    "certifications": [
        r"^certifications?",
        r"^licenses?\s+and\s+certifications?",
        r"^credentials",
        r"^awards\s+and\s+certifications"
    ]
}

# Standard recommended ATS order
STANDARD_ORDER = ["contact", "summary", "experience", "skills", "education", "projects", "certifications"]

def detect_sections(text: str) -> Dict[str, Any]:
    """
    Parses resume text and segments it into detected sections.
    Also validates section ordering for ATS compliance.
    """
    lines = text.split("\n")
    sections: Dict[str, List[str]] = {
        "contact_header": [],
        "summary": [],
        "experience": [],
        "skills": [],
        "education": [],
        "projects": [],
        "certifications": [],
        "other": []
    }
    
    current_section = "contact_header"
    detected_order = ["contact"]
    section_line_indices = {}

    for idx, raw_line in enumerate(lines):
        line = raw_line.strip()
        if not line:
            continue

        # Clean line to check if it matches section header
        cleaned_header = re.sub(r'[^a-zA-Z\s]', '', line).lower().strip()
        matched_sec = None

        if len(cleaned_header) < 35:
            for sec_name, patterns in SECTION_PATTERNS.items():
                for pat in patterns:
                    if re.match(pat, cleaned_header, re.IGNORECASE):
                        matched_sec = sec_name
                        break
                if matched_sec:
                    break

        if matched_sec:
            current_section = matched_sec
            if matched_sec not in detected_order:
                detected_order.append(matched_sec)
                section_line_indices[matched_sec] = idx
        else:
            sections[current_section].append(line)

    # Calculate section ordering score
    is_standard_order = True
    order_penalties = []

    if "education" in detected_order and "experience" in detected_order:
        edu_idx = detected_order.index("education")
        exp_idx = detected_order.index("experience")
        # For experienced candidates, experience should generally precede education
        if exp_idx > edu_idx and len(sections["experience"]) > 8:
            order_penalties.append("Education placed before Work Experience for experienced role")

    return {
        "sections": {k: "\n".join(v) for k, v in sections.items()},
        "detected_sections": [s for s in detected_order if s != "contact"],
        "section_count": len(detected_order) - 1,
        "is_standard_order": len(order_penalties) == 0,
        "order_penalties": order_penalties
    }
