"""
Skill intelligence system with alias normalization and taxonomy categorizer.
Normalizes aliases (e.g. React.js, ReactJS -> React) and identifies matched,
missing, related skills, and contextual caution messages for target job descriptions.
"""

import re
from typing import Dict, List, Any, Set, Tuple

# Comprehensive Canonical Skill Map with Aliases and Categories
SKILL_TAXONOMY = {
    # Frontend
    "React": {"aliases": ["react.js", "reactjs", "react js", "react"], "category": "Frontend", "related": ["TypeScript", "Next.js", "Redux", "Tailwind CSS"]},
    "TypeScript": {"aliases": ["ts", "typescript", "type-script"], "category": "Frontend", "related": ["JavaScript", "React", "Node.js"]},
    "JavaScript": {"aliases": ["js", "es6", "es2020", "javascript", "ecmascript"], "category": "Frontend", "related": ["TypeScript", "HTML5", "CSS3"]},
    "Next.js": {"aliases": ["nextjs", "next js", "next.js"], "category": "Frontend", "related": ["React", "SSR", "Vercel"]},
    "Vue.js": {"aliases": ["vue", "vuejs", "vue 3", "vue.js", "nuxt"], "category": "Frontend", "related": ["JavaScript", "Vuex"]},
    "Angular": {"aliases": ["angular", "angularjs", "angular 2+"], "category": "Frontend", "related": ["TypeScript", "RxJS"]},
    "Tailwind CSS": {"aliases": ["tailwind", "tailwindcss"], "category": "Frontend", "related": ["CSS3", "shadcn/ui"]},
    "HTML5": {"aliases": ["html", "html5", "semantic html"], "category": "Frontend", "related": ["CSS3", "Accessibility"]},
    "CSS3": {"aliases": ["css", "css3", "scss", "sass", "flexbox", "css grid"], "category": "Frontend", "related": ["Tailwind CSS"]},
    "Redux": {"aliases": ["redux", "redux toolkit", "rtk"], "category": "Frontend", "related": ["React", "Zustand"]},
    "Zustand": {"aliases": ["zustand"], "category": "Frontend", "related": ["React", "State Management"]},
    "GraphQL": {"aliases": ["graphql", "apollo client", "relay"], "category": "Frontend", "related": ["REST API", "Node.js"]},

    # Backend
    "Node.js": {"aliases": ["node", "nodejs", "node.js"], "category": "Backend", "related": ["Express.js", "TypeScript", "REST API"]},
    "Python": {"aliases": ["python", "python3", "python 3"], "category": "Backend", "related": ["FastAPI", "Django", "Pandas"]},
    "FastAPI": {"aliases": ["fastapi", "fast api"], "category": "Backend", "related": ["Python", "Pydantic", "Uvicorn"]},
    "Django": {"aliases": ["django", "drf", "django rest framework"], "category": "Backend", "related": ["Python", "PostgreSQL"]},
    "Java": {"aliases": ["java", "core java", "java 17", "java 21"], "category": "Backend", "related": ["Spring Boot", "Microservices"]},
    "Spring Boot": {"aliases": ["spring boot", "springboot", "spring framework"], "category": "Backend", "related": ["Java", "Microservices"]},
    "Go": {"aliases": ["go", "golang", "go-lang"], "category": "Backend", "related": ["gRPC", "Docker", "Kubernetes"]},
    "REST API": {"aliases": ["rest api", "restful api", "rest apis", "restful apis", "restful web services"], "category": "Backend", "related": ["HTTP", "JSON", "OpenAPI"]},
    "Microservices": {"aliases": ["microservices", "microservice architecture", "distributed systems"], "category": "Backend", "related": ["Docker", "Kubernetes", "Kafka"]},

    # Cloud & DevOps
    "AWS": {"aliases": ["aws", "amazon web services", "ec2", "s3", "lambda", "cloudformation", "iam", "ecs", "eks"], "category": "Cloud & DevOps", "related": ["Docker", "Terraform", "Cloud Architecture"]},
    "Docker": {"aliases": ["docker", "containerization", "docker-compose", "containers"], "category": "Cloud & DevOps", "related": ["Kubernetes", "CI/CD", "AWS"]},
    "Kubernetes": {"aliases": ["kubernetes", "k8s", "helm"], "category": "Cloud & DevOps", "related": ["Docker", "Cloud Native", "DevOps"]},
    "CI/CD": {"aliases": ["ci/cd", "ci cd", "continuous integration", "continuous deployment", "github actions", "gitlab ci", "jenkins"], "category": "Cloud & DevOps", "related": ["DevOps", "Docker"]},
    "Terraform": {"aliases": ["terraform", "iac", "infrastructure as code"], "category": "Cloud & DevOps", "related": ["AWS", "DevOps"]},
    "Google Cloud": {"aliases": ["gcp", "google cloud", "google cloud platform", "bigquery"], "category": "Cloud & DevOps", "related": ["AWS", "Kubernetes"]},

    # Databases
    "PostgreSQL": {"aliases": ["postgres", "postgresql", "postgre", "psql", "pgvector"], "category": "Databases", "related": ["SQL", "Relational Database"]},
    "MongoDB": {"aliases": ["mongo", "mongodb", "mongoose", "nosql"], "category": "Databases", "related": ["Node.js", "Document DB"]},
    "Redis": {"aliases": ["redis", "in-memory caching", "redis queue", "upstash"], "category": "Databases", "related": ["Caching", "Rate Limiting"]},
    "SQL": {"aliases": ["sql", "mysql", "mariadb", "sqlite", "relational databases"], "category": "Databases", "related": ["PostgreSQL", "Database Design"]},
    "Kafka": {"aliases": ["kafka", "apache kafka", "event streaming"], "category": "Databases", "related": ["Microservices", "RabbitMQ"]},

    # AI / ML
    "Machine Learning": {"aliases": ["machine learning", "ml", "supervised learning"], "category": "AI/ML", "related": ["Python", "Scikit-Learn"]},
    "PyTorch": {"aliases": ["pytorch", "torch"], "category": "AI/ML", "related": ["Deep Learning", "Transformers", "NLP"]},
    "TensorFlow": {"aliases": ["tensorflow", "keras", "tf"], "category": "AI/ML", "related": ["Deep Learning", "Neural Networks"]},
    "Generative AI": {"aliases": ["generative ai", "llms", "large language models", "openai", "langchain", "llamaindex", "rag", "prompt engineering"], "category": "AI/ML", "related": ["PyTorch", "Hugging Face"]},
    "NLP": {"aliases": ["nlp", "natural language processing", "spacy", "nltk", "bert", "sentence-transformers"], "category": "AI/ML", "related": ["Text Processing", "Tokenization"]},
    "Pandas": {"aliases": ["pandas", "numpy", "scipy", "data analysis"], "category": "AI/ML", "related": ["Python", "SQL"]},
    "Git": {"aliases": ["git", "github", "gitlab", "version control"], "category": "Tools", "related": ["CI/CD", "Collaboration"]}
}

def extract_skills_from_text(text: str) -> List[Dict[str, Any]]:
    """
    Extracts canonical normalized skills from resume or job text.
    """
    text_lower = text.lower()
    detected_skills = []
    seen_canonical = set()

    for canonical_name, data in SKILL_TAXONOMY.items():
        matched = False
        for alias in data["aliases"]:
            # Word boundary regex to avoid partial substring false positives
            pattern = r'\b' + re.escape(alias) + r'\b'
            if re.search(pattern, text_lower):
                matched = True
                break
        
        if matched and canonical_name not in seen_canonical:
            seen_canonical.add(canonical_name)
            detected_skills.append({
                "name": canonical_name,
                "category": data["category"],
                "related": data["related"]
            })

    return detected_skills

def match_skills_against_job(resume_text: str, jd_text: str) -> Dict[str, Any]:
    """
    Compares resume skills against target job description skills.
    Categorizes skills into Matched, Missing, Related, and generates honest advisories.
    """
    resume_skills = extract_skills_from_text(resume_text)
    jd_skills = extract_skills_from_text(jd_text)

    resume_skill_names = {s["name"] for s in resume_skills}
    jd_skill_names = {s["name"] for s in jd_skills}

    matched = sorted(list(resume_skill_names.intersection(jd_skill_names)))
    missing = sorted(list(jd_skill_names - resume_skill_names))

    # Find related skills for missing skills
    related_skills = set()
    for m in missing:
        if m in SKILL_TAXONOMY:
            for rel in SKILL_TAXONOMY[m]["related"]:
                if rel in resume_skill_names and rel not in matched:
                    related_skills.add(rel)

    # Calculate match percentage
    total_jd_skills = len(jd_skill_names)
    match_pct = round((len(matched) / max(1, total_jd_skills)) * 100) if total_jd_skills > 0 else 85

    # Advisory messages
    advisories = []
    if missing:
        top_missing = missing[:3]
        for sk in top_missing:
            advisories.append({
                "skill": sk,
                "advice": f"'{sk}' appears in the job description but was not found in your resume. Add it only if you have genuine hands-on experience."
            })

    return {
        "matched_skills": matched,
        "missing_skills": missing,
        "related_skills": list(related_skills),
        "match_percentage": match_pct,
        "resume_skills_total": len(resume_skills),
        "jd_skills_total": total_jd_skills,
        "advisories": advisories
    }
