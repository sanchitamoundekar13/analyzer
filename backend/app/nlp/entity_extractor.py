"""
Entity extractor module for ResumeLens.
Extracts Candidate Name, Contact channels (Email, Phone, LinkedIn, GitHub, Website),
Work Experience timelines, Education degrees, Bullet points, and Measurable metrics.
"""

import re
from typing import Dict, List, Any

EMAIL_REGEX = r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+'
PHONE_REGEX = r'(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}'
LINKEDIN_REGEX = r'(?:https?:\/\/)?(?:www\.)?linkedin\.com\/(?:in|profile)\/([a-zA-Z0-9_-]+)'
GITHUB_REGEX = r'(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)'
URL_REGEX = r'https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)'
DATE_RANGE_REGEX = r'(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{1,2}\/\d{4}|\d{4})\s*(?:-|–|—|to)\s*(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+\d{4}|\d{1,2}\/\d{4}|\d{4}|Present|Current|Now)'
METRIC_REGEX = r'(\b\d+(?:\.\d+)?%|\$\d+(?:,\d+)*(?:\.\d+)?[kKmMbB]?|\b\d+(?:,\d+)*(?:\+)?\s*(?:users|clients|customers|requests|transactions|ms|seconds|minutes|hours|days|engineers|team members|bugs|features|services|endpoints|repos|nodes)\b|\b\d+x\b|\b\d+\s*fold\b)'

DEGREE_PATTERNS = [
    r"\b(?:bachelor(?:'s)?|b\.?s\.?|b\.?a\.?|b\.?tech|b\.?e\.?)\b",
    r"\b(?:master(?:'s)?|m\.?s\.?|m\.?a\.?|m\.?tech|m\.?b\.?a\.?)\b",
    r"\b(?:ph\.?d\.?|doctorate|doctor of philosophy)\b",
    r"\b(?:associate(?:'s)?|diploma)\b"
]

STRONG_ACTION_VERBS = {
    "architected", "engineered", "developed", "spearheaded", "optimized", "implemented",
    "deployed", "designed", "orchestrated", "automated", "refactored", "built", "accelerated",
    "scaled", "led", "mentored", "delivered", "reduced", "increased", "boosted", "integrated",
    "pioneered", "standardized", "launched", "executed", "collaborated", "managed", "migrated"
}

WEAK_PASSIVE_VERBS = {
    "worked", "assisted", "helped", "responsible", "handled", "participated", "involved",
    "did", "tried", "supported", "contributed", "maintained"
}

def extract_entities(text: str, sections: Dict[str, str]) -> Dict[str, Any]:
    """
    Extracts high-fidelity candidate entities, contacts, metrics, and experience bullets.
    """
    # 1. Contact Information
    emails = re.findall(EMAIL_REGEX, text)
    phones = re.findall(PHONE_REGEX, text)
    linkedin = re.findall(LINKEDIN_REGEX, text, re.IGNORECASE)
    github = re.findall(GITHUB_REGEX, text, re.IGNORECASE)
    urls = re.findall(URL_REGEX, text)
    
    # Clean website URL (exclude linkedin and github)
    websites = [u for u in urls if "linkedin.com" not in u.lower() and "github.com" not in u.lower()]

    email = emails[0] if emails else None
    phone = phones[0] if phones else None
    linkedin_url = f"linkedin.com/in/{linkedin[0]}" if linkedin else None
    github_url = f"github.com/{github[0]}" if github else None
    website = websites[0] if websites else None

    # 2. Candidate Name Extraction (Top lines before contact info, title-cased, 2-4 words)
    name = _extract_candidate_name(text, sections)

    # 3. Work Experience Details & Bullets
    exp_text = sections.get("experience", "") + "\n" + sections.get("projects", "")
    bullets = _extract_bullet_points(exp_text)

    # Analyze bullets for metrics & action verbs
    quantified_bullets_count = 0
    strong_action_bullets_count = 0
    weak_bullets = []
    quantified_bullets = []

    for b in bullets:
        has_metric = bool(re.search(METRIC_REGEX, b, re.IGNORECASE))
        first_word = re.sub(r'[^a-zA-Z]', '', b.split()[0].lower()) if b.split() else ""
        is_strong = first_word in STRONG_ACTION_VERBS
        is_weak = first_word in WEAK_PASSIVE_VERBS or not is_strong

        if has_metric:
            quantified_bullets_count += 1
            quantified_bullets.append(b)
        if is_strong:
            strong_action_bullets_count += 1
        if is_weak and not has_metric:
            weak_bullets.append(b)

    # 4. Dates & Consistency
    date_ranges = re.findall(DATE_RANGE_REGEX, text, re.IGNORECASE)

    # 5. Education Degrees
    edu_text = sections.get("education", "")
    detected_degrees = []
    for deg_pat in DEGREE_PATTERNS:
        if re.search(deg_pat, edu_text, re.IGNORECASE):
            match = re.search(deg_pat, edu_text, re.IGNORECASE)
            detected_degrees.append(match.group(0).capitalize())

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "linkedin": linkedin_url,
        "github": github_url,
        "website": website,
        "degrees": detected_degrees,
        "total_bullets_count": len(bullets),
        "quantified_bullets_count": quantified_bullets_count,
        "quantified_bullets_ratio": round(quantified_bullets_count / max(1, len(bullets)), 2),
        "strong_action_bullets_count": strong_action_bullets_count,
        "weak_bullets_count": len(weak_bullets),
        "weak_bullets_sample": weak_bullets[:4],
        "quantified_bullets_sample": quantified_bullets[:4],
        "all_bullets": bullets,
        "date_ranges_count": len(date_ranges),
        "dates_detected": len(date_ranges) > 0
    }

def _extract_candidate_name(text: str, sections: Dict[str, str]) -> str:
    """Extracts candidate name from the top header lines."""
    header = sections.get("contact_header", "")
    lines = (header if header else text).split("\n")
    for l in lines[:6]:
        clean_l = re.sub(r'[^a-zA-Z\s\.]', '', l).strip()
        words = clean_l.split()
        if 2 <= len(words) <= 4:
            # Check if words look like a capitalized name and not a generic section
            if not any(w.lower() in ["curriculum", "resume", "cv", "page", "email", "phone", "profile", "engineer", "developer"] for w in words):
                return clean_l
    return "Candidate Name"

def _extract_bullet_points(text: str) -> List[str]:
    """Extracts list bullet points and action statements."""
    lines = text.split("\n")
    bullets = []
    for l in lines:
        stripped = l.strip()
        if stripped.startswith("•") or stripped.startswith("-") or stripped.startswith("*"):
            clean_b = re.sub(r'^[\•\-\*\⁃\◦\‣\►\>]+\s*', '', stripped).strip()
            if len(clean_b) > 15:
                bullets.append(clean_b)
        elif len(stripped) > 35 and any(stripped.lower().startswith(v) for v in STRONG_ACTION_VERBS | WEAK_PASSIVE_VERBS):
            bullets.append(stripped)
    return bullets
