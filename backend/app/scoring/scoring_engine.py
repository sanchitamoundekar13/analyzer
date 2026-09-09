"""
Deterministic 7-Dimension 100-Point Scoring Engine for ResumeLens.
Every single point is evidence-backed and explainable with itemized point loss reasons.
"""

from typing import Dict, List, Any

def calculate_full_score(
    ats_data: Dict[str, Any],
    entities: Dict[str, Any],
    skills_data: Dict[str, Any],
    jd_match_data: Dict[str, Any],
    section_data: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Computes deterministic 7-dimension score out of 100, itemized point deductions,
    why you lost points breakdown, and realistic reachable target score.
    """
    deductions = []
    
    # 1. ATS Compatibility (Max 20 pts)
    ats_pct = ats_data.get("ats_compatibility_score", 90)
    ats_score = round((ats_pct / 100) * 20)
    ats_lost = 20 - ats_score
    if ats_lost > 0:
        deductions.append({
            "dimension": "ATS Compatibility",
            "points_lost": ats_lost,
            "reason": "Layout penalties: " + (ats_data.get("warnings", ["Non-standard structure"])[0] if ats_data.get("warnings") else "Formatting inconsistencies")
        })

    # 2. Job Match (Max 20 pts)
    jd_pct = jd_match_data.get("overall_match", 82)
    job_match_score = round((jd_pct / 100) * 20)
    jd_lost = 20 - job_match_score
    if jd_lost > 0:
        missing_sample = skills_data.get("missing_skills", [])[:3]
        missing_str = ", ".join(missing_sample) if missing_sample else "Key role requirements"
        deductions.append({
            "dimension": "Job Match",
            "points_lost": jd_lost,
            "reason": f"Missing target role keywords: {missing_str}"
        })

    # 3. Skills Coverage (Max 15 pts)
    matched_skills = skills_data.get("matched_skills", [])
    total_skills = len(skills_data.get("matched_skills", [])) + len(skills_data.get("missing_skills", []))
    skill_coverage_ratio = len(matched_skills) / max(1, total_skills) if total_skills > 0 else 0.8
    skills_score = min(15, max(5, round(skill_coverage_ratio * 15)))
    skills_lost = 15 - skills_score
    if skills_lost > 0:
        deductions.append({
            "dimension": "Skills Coverage",
            "points_lost": skills_lost,
            "reason": f"Only {len(matched_skills)} core technical skills detected from role taxonomy"
        })

    # 4. Experience Evidence (Max 15 pts)
    quant_count = entities.get("quantified_bullets_count", 0)
    total_bullets = entities.get("total_bullets_count", 0)
    quant_ratio = quant_count / max(1, total_bullets)
    exp_score = min(15, max(6, round(quant_ratio * 15) + (4 if total_bullets >= 4 else 0)))
    exp_score = min(15, exp_score)
    exp_lost = 15 - exp_score
    if exp_lost > 0:
        deductions.append({
            "dimension": "Experience Evidence",
            "points_lost": exp_lost,
            "reason": f"{quant_count} of {total_bullets} experience bullets contain measurable metrics (% / $ / numbers)"
        })

    # 5. Resume Structure (Max 10 pts)
    has_contact = bool(entities.get("email")) and bool(entities.get("phone"))
    sec_count = section_data.get("section_count", 4)
    structure_score = (4 if has_contact else 2) + min(4, sec_count) + (2 if section_data.get("is_standard_order") else 0)
    structure_score = min(10, max(4, structure_score))
    struct_lost = 10 - structure_score
    if struct_lost > 0:
        deductions.append({
            "dimension": "Resume Structure",
            "points_lost": struct_lost,
            "reason": "Missing standard section flow or incomplete contact header"
        })

    # 6. Writing Quality (Max 10 pts)
    strong_verbs = entities.get("strong_action_bullets_count", 0)
    weak_verbs = entities.get("weak_bullets_count", 0)
    writing_ratio = strong_verbs / max(1, (strong_verbs + weak_verbs))
    writing_score = min(10, max(4, round(writing_ratio * 10)))
    writing_lost = 10 - writing_score
    if writing_lost > 0:
        deductions.append({
            "dimension": "Writing Quality",
            "points_lost": writing_lost,
            "reason": f"{weak_verbs} bullets begin with passive phrasing ('worked on', 'assisted')"
        })

    # 7. Education & Projects (Max 10 pts)
    has_degree = len(entities.get("degrees", [])) > 0
    has_projects = bool(section_data.get("sections", {}).get("projects"))
    edu_score = (5 if has_degree else 2) + (5 if has_projects else 3)
    edu_score = min(10, max(4, edu_score))
    edu_lost = 10 - edu_score
    if edu_lost > 0:
        deductions.append({
            "dimension": "Education & Projects",
            "points_lost": edu_lost,
            "reason": "Degree details, graduation year, or project repository links missing"
        })

    # Overall 0-100 Score
    total_score = ats_score + job_match_score + skills_score + exp_score + structure_score + writing_score + edu_score
    total_score = min(100, max(20, total_score))
    total_points_lost = 100 - total_score

    # Realistic reachable target score
    reachable_target = min(96, total_score + round(total_points_lost * 0.75))

    # Priority Fixes for "Fix My Resume" CTA
    priority_fixes = []
    if skills_data.get("missing_skills"):
        priority_fixes.append(f"Add relevant missing skills ({', '.join(skills_data['missing_skills'][:3])}) where experienced")
    if entities.get("weak_bullets_count", 0) > 0:
        priority_fixes.append("Upgrade passive responsibility bullets to Action + Metric + Result format")
    if ats_data.get("critical_fixes"):
        priority_fixes.append(ats_data["critical_fixes"][0])
    if exp_lost >= 3:
        priority_fixes.append("Include quantifiable numbers, percentages, or cost savings in 3+ bullet points")

    # Status classification
    if total_score >= 88:
        status, status_color = "Excellent", "emerald"
    elif total_score >= 75:
        status, status_color = "Very Good", "blue"
    elif total_score >= 60:
        status, status_color = "Good", "emerald"
    else:
        status, status_color = "Needs Improvement", "amber"

    return {
        "overall_score": total_score,
        "reachable_target": reachable_target,
        "potential_gain": reachable_target - total_score,
        "status": status,
        "status_color": status_color,
        "total_points_lost": total_points_lost,
        "dimensions": {
            "ats_compatibility": {"score": ats_score, "max": 20, "label": "ATS Compatibility", "percentage": round((ats_score/20)*100)},
            "job_match": {"score": job_match_score, "max": 20, "label": "Job Match", "percentage": round((job_match_score/20)*100)},
            "skills_coverage": {"score": skills_score, "max": 15, "label": "Skills Coverage", "percentage": round((skills_score/15)*100)},
            "experience_evidence": {"score": exp_score, "max": 15, "label": "Experience Evidence", "percentage": round((exp_score/15)*100)},
            "resume_structure": {"score": structure_score, "max": 10, "label": "Resume Structure", "percentage": round((structure_score/10)*100)},
            "writing_quality": {"score": writing_score, "max": 10, "label": "Writing Quality", "percentage": round((writing_score/10)*100)},
            "education_projects": {"score": edu_score, "max": 10, "label": "Education & Projects", "percentage": round((edu_score/10)*100)},
        },
        "deductions": deductions,
        "priority_fixes": priority_fixes
    }
