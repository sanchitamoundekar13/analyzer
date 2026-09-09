"""Test script to verify Python backend parsing and 7-dimension deterministic scoring."""
import sys
import os
from pathlib import Path

# Add backend directory to sys.path if not present
current_dir = Path(__file__).resolve().parent
if str(current_dir) not in sys.path:
    sys.path.insert(0, str(current_dir))
if str(current_dir.parent) not in sys.path:
    sys.path.insert(0, str(current_dir.parent))

try:
    from app.parsers.text_cleaner import clean_text
    from app.nlp.section_detector import detect_sections
    from app.nlp.entity_extractor import extract_entities
    from app.nlp.skill_intelligence import match_skills_against_job
    from app.nlp.semantic_matcher import compute_semantic_match
    from app.ats.ats_analyzer import audit_ats_compatibility
    from app.scoring.scoring_engine import calculate_full_score
    from app.llm.bullet_optimizer import generate_bullet_rewrites
    from app.llm.evidence_vault import extract_evidence_vault
except ImportError:
    from backend.app.parsers.text_cleaner import clean_text
    from backend.app.nlp.section_detector import detect_sections
    from backend.app.nlp.entity_extractor import extract_entities
    from backend.app.nlp.skill_intelligence import match_skills_against_job
    from backend.app.nlp.semantic_matcher import compute_semantic_match
    from backend.app.ats.ats_analyzer import audit_ats_compatibility
    from backend.app.scoring.scoring_engine import calculate_full_score
    from backend.app.llm.bullet_optimizer import generate_bullet_rewrites
    from backend.app.llm.evidence_vault import extract_evidence_vault

sample_resume = """
John Doe
johndoe@email.com | (555) 123-4567 | linkedin.com/in/johndoe | github.com/johndoe | San Francisco, CA

PROFESSIONAL SUMMARY
Senior Full Stack Engineer with 6+ years of experience building scalable web applications using React, TypeScript, Node.js, and PostgreSQL.

WORK EXPERIENCE
Senior Software Engineer | Tech Corp | 2021 - Present
• Architected React and TypeScript client portal reducing page load latency by 38% for 120,000+ monthly active users.
• Engineered Node.js and PostgreSQL microservices handling 250k+ daily transactions with 99.98% uptime.
• Worked on database maintenance and bug fixes.
• Mentored 5 junior engineers on code reviews and automated testing.

Software Engineer | StartUp Inc | 2018 - 2021
• Developed responsive web applications using React, HTML5, CSS3, and REST APIs.
• Reduced API response time by 45% through Redis caching and query optimization.

TECHNICAL SKILLS
• Languages & Frameworks: React, TypeScript, JavaScript, Node.js, HTML5, CSS3, Tailwind CSS, Python
• Databases & Tools: PostgreSQL, Redis, REST API, Git, Docker

EDUCATION
Bachelor of Science in Computer Science | University of California, Berkeley | 2014 - 2018
"""

sample_jd = """
Senior Full Stack Engineer
We are seeking an experienced Senior Full Stack Engineer.
Requirements:
- Strong proficiency in React, TypeScript, and Node.js
- Experience with PostgreSQL and Redis
- Hands-on experience with AWS cloud services (EC2, S3, Lambda)
- Experience with Docker and Kubernetes container orchestration
- Strong knowledge of building REST APIs and microservices
"""

def main():
    print("Testing ResumeLens Python Backend Engine...")
    cleaned = clean_text(sample_resume)
    sections = detect_sections(cleaned)
    entities = extract_entities(cleaned, sections["sections"])
    skills_data = match_skills_against_job(cleaned, sample_jd)
    jd_match = compute_semantic_match(cleaned, sample_jd, skills_data["match_percentage"])
    
    mock_doc = {
        "text": cleaned,
        "filename": "John_Doe_Resume.pdf",
        "page_count": 1,
        "has_tables": False,
        "has_multi_column": False,
        "has_text_boxes": False,
        "has_tiny_fonts": False
    }
    
    ats_data = audit_ats_compatibility(mock_doc, entities, sections)
    score_data = calculate_full_score(ats_data, entities, skills_data, jd_match, sections)
    vault = extract_evidence_vault(cleaned, entities["all_bullets"])
    rewrites = generate_bullet_rewrites(entities["weak_bullets_sample"], skills_data["matched_skills"])

    print(f"Candidate Name: {entities['name']}")
    print(f"Overall Score: {score_data['overall_score']} / 100 ({score_data['status']})")
    print(f"Reachable Target: {score_data['reachable_target']} / 100 (+{score_data['potential_gain']} pts)")
    print(f"ATS Compatibility: {ats_data['ats_compatibility_score']}%")
    print(f"Job Match: {jd_match['overall_match']}%")
    print(f"Matched Skills ({len(skills_data['matched_skills'])}): {skills_data['matched_skills']}")
    print(f"Missing Skills ({len(skills_data['missing_skills'])}): {skills_data['missing_skills']}")
    print(f"Evidence Vault Claims: {len(vault)}")
    print(f"Point Deductions ({len(score_data['deductions'])}):")
    for d in score_data['deductions']:
        print(f"  -{d['points_lost']} {d['dimension']}: {d['reason']}")

    print("\nSUCCESS: All backend modules executed perfectly!")

if __name__ == "__main__":
    main()
