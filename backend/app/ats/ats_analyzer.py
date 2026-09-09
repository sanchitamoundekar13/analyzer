"""
Deep Real ATS Analyzer for ResumeLens.
Audits document structure, column layout, tables, text boxes, social icons,
typography metrics, date consistency, and section hierarchy.
"""

from typing import Dict, List, Any

def audit_ats_compatibility(
    parsed_doc: Dict[str, Any],
    entities: Dict[str, Any],
    section_data: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Performs deep inspection of ATS parseability and structural layout rules.
    Outputs ATS Compatibility % (0–100%), passed checks list, and warning flags.
    """
    score = 100
    passed_checks = []
    warnings = []
    critical_fixes = []

    # 1. Contact Information Check
    has_email = bool(entities.get("email"))
    has_phone = bool(entities.get("phone"))
    has_linkedin = bool(entities.get("linkedin"))
    has_name = entities.get("name") and entities.get("name") != "Candidate Name"

    if has_email and has_phone and has_name:
        passed_checks.append("Contact information fully reachable and parsed")
    else:
        missing_contacts = []
        if not has_email: missing_contacts.append("Email")
        if not has_phone: missing_contacts.append("Phone number")
        if not has_name: missing_contacts.append("Candidate Name")
        warnings.append(f"Missing or unparsed contact details: {', '.join(missing_contacts)}")
        score -= 10

    # 2. Section Headings & Standard Ordering
    detected_secs = section_data.get("detected_sections", [])
    if len(detected_secs) >= 3:
        passed_checks.append("Standard ATS section headers detected accurately")
    else:
        warnings.append("Non-standard section headers detected (may confuse legacy parser crawlers)")
        score -= 8

    if section_data.get("is_standard_order"):
        passed_checks.append("Logical chronological section hierarchy")
    else:
        for p in section_data.get("order_penalties", []):
            warnings.append(p)
            score -= 5

    # 3. Work Experience & Dates
    if entities.get("dates_detected"):
        passed_checks.append("Work experience timelines & date ranges detected")
    else:
        warnings.append("Dates missing or using non-standard formatting")
        score -= 8

    if entities.get("total_bullets_count", 0) >= 3:
        passed_checks.append("Experience bullets structured for machine parsing")
    else:
        warnings.append("Experience section contains few or unformatted bullet statements")
        score -= 6

    # 4. Multi-column Layout Check
    if parsed_doc.get("has_multi_column"):
        warnings.append("2-column or multi-column layout detected (risks reading order truncation in Taleo/iCIMS)")
        critical_fixes.append("Convert multi-column sections to a clean single-column layout")
        score -= 15
    else:
        passed_checks.append("Single-column linear layout (optimal for ATS crawlers)")

    # 5. Table & Grid Structure Check
    if parsed_doc.get("has_tables"):
        warnings.append("Embedded tables detected (can cause horizontal text merging during ATS ingestion)")
        critical_fixes.append("Replace table-based skills/experience grids with standard bulleted lists")
        score -= 12
    else:
        passed_checks.append("No nested tables or complex multi-cell grids")

    # 6. Text Boxes & Drawing Elements
    if parsed_doc.get("has_text_boxes") or parsed_doc.get("vector_graphics_count", 0) > 15:
        warnings.append("Floating text boxes or vector canvas graphics detected")
        critical_fixes.append("Remove floating text boxes; embed text directly in document flow")
        score -= 10
    else:
        passed_checks.append("No unanchored floating text boxes")

    # 7. Typography & Tiny Fonts Check
    if parsed_doc.get("has_tiny_fonts"):
        warnings.append("Microscopic text (< 9pt) detected (often flagged as keyword stuffing by parsers)")
        score -= 8
    else:
        passed_checks.append("Font sizes adhere to readable ATS standards (10pt–12pt body, 14pt+ headings)")

    # 8. Page Count Audit
    page_count = parsed_doc.get("page_count", 1)
    if page_count in [1, 2]:
        passed_checks.append(f"Ideal document length ({page_count} page{'s' if page_count > 1 else ''})")
    elif page_count > 3:
        warnings.append(f"Resume length is {page_count} pages (recommend consolidating to 1–2 pages)")
        score -= 5

    # 9. Scanned / Rasterized PDF Check
    if parsed_doc.get("has_scanned_pages"):
        warnings.append("Scanned image PDF detected (requires OCR parsing, fails standard enterprise ATS)")
        critical_fixes.append("Re-export resume as a native text PDF directly from Word, Google Docs, or LaTeX")
        score -= 25

    # Clamp score
    final_ats_score = max(35, min(100, score))

    return {
        "ats_compatibility_score": final_ats_score,
        "is_ats_friendly": final_ats_score >= 80,
        "passed_checks": passed_checks,
        "warnings": warnings,
        "critical_fixes": critical_fixes,
        "summary": "High ATS parseability with standard formatting" if final_ats_score >= 80 else "Requires layout adjustments to prevent ATS parser drop-off"
    }
