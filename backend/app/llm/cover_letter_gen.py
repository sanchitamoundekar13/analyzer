"""
Cover Letter Generator for ResumeLens.
Generates tailored, persuasive cover letters grounded in resume achievements and target JD requirements.
"""

from typing import Dict, Any

def generate_cover_letter(
    candidate_name: str,
    target_role: str,
    target_company: str,
    skills: list,
    achievements: list,
    tone: str = "Professional"
) -> str:
    """Generates an evidence-grounded cover letter."""
    top_skills = ", ".join(skills[:4]) if skills else "modern software engineering and cloud systems"
    top_achievement = achievements[0] if achievements else "delivering scalable client-facing solutions with measurable impact"

    greeting = f"Dear Hiring Team at {target_company or 'the Company'},"
    intro = f"I am writing to express my enthusiastic interest in the {target_role or 'Software Engineer'} role. With a proven background in {top_skills}, I specialize in building reliable, high-performance applications that drive tangible product growth."
    body1 = f"Throughout my career, I have focused on translating complex technical challenges into clean, robust architecture. Notably, I have {top_achievement}, ensuring both system reliability and an exceptional user experience."
    body2 = f"What excites me most about {target_company or 'your team'} is the commitment to engineering excellence. My hands-on proficiency with {top_skills} enables me to immediately contribute to your sprint roadmap and scale with your technical infrastructure."
    closing = f"Thank you for your time and consideration. I welcome the opportunity to discuss how my skill set and passion align with your mission.\n\nSincerely,\n{candidate_name or 'Candidate'}"

    return f"{greeting}\n\n{intro}\n\n{body1}\n\n{body2}\n\n{closing}"
