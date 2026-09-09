# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# ResumeLens — Evidence-Based AI Resume Analyzer & ATS Diagnostic Platform

**Document Version:** 1.0  
**Product Type:** AI/ML-powered Web Application  
**Target Market:** Students, Freshers, Job Seekers, Professionals & Recruiters  
**Primary Market:** India & Global  
**Platform:** Web Application  
**Status:** Product Development  

---

## 1. Product Overview

### 1.1 Product Name
**ResumeLens**

### Tagline
> *Understand your resume. Fix what matters. Get closer to the job.*

### 1.2 Product Description
ResumeLens is an evidence-based resume analysis platform that evaluates a user's resume against a target job description and provides an explainable score, ATS compatibility analysis, skill-gap identification, formatting analysis, experience evaluation, and actionable recommendations.

Unlike conventional AI resume tools that simply generate generic suggestions, ResumeLens is designed to answer:
> *"Why did my resume get this score, what evidence caused it, and exactly what should I improve?"*

The platform combines:
- Rule-based analysis
- Natural Language Processing (NLP)
- Machine Learning (ML)
- Semantic similarity & embeddings
- Canonical skill taxonomy extraction
- Enterprise ATS simulation
- Deterministic 7-dimension scoring
- Large Language Models (LLM) for evidence explanations

> [!IMPORTANT]
> The final score is based strictly on measurable evidence rather than allowing an LLM to arbitrarily invent or hallucinate a score.

---

## 2. Problem Statement

Students and job seekers frequently submit resumes without knowing how well those resumes match the requirements of a particular job.

### Existing Problems in Conventional Tools:
- Generic, repetitive feedback
- Unclear black-box ATS scoring
- Keyword stuffing recommendations that hurt recruiter readability
- Limited job-specific alignment
- Poor explanation of lost points
- Inability to distinguish missing skills from irrelevant skills
- Limited document layout & formatting analysis
- AI-generated suggestions that introduce false, unverified metrics
- Lack of concrete evidence behind recommendations
- No structured resume improvement workflow

Users need a system that provides transparent, evidence-based, and actionable resume intelligence.

---

## 3. Product Vision

ResumeLens aims to become an intelligent resume diagnostic platform that works like a **technical health-check system for resumes**.

Instead of simply saying:
> *"Your resume is 78/100."*

ResumeLens explains:
> *"Your resume scored 78 because 8/10 required skills were detected, your experience section contains measurable outcomes in 60% of bullets, but your resume is missing 3 important job-specific skills and contains formatting elements that may reduce ATS parsing reliability."*

---

## 4. Product Goals

### Primary Goals:
- **G1 — Resume Analysis**: Automatically extract sections, skills, education, experience, projects, certifications, achievements, contacts, dates, job titles, and organizations.
- **G2 — ATS Compatibility**: Evaluate whether the document is parsed reliably by enterprise ATS crawlers (Taleo, Workday, Greenhouse, Lever, iCIMS).
- **G3 — Job Matching**: Compare a resume against a specific Job Description (JD).
- **G4 — Explainable Scoring**: Every major score is backed by detectable evidence.
- **G5 — Skill Gap Detection**: Distinguish between Required, Detected, Missing, and Related skills.
- **G6 — Actionable Recommendations**: Prioritize fixes sequentially ("Fix My Resume" roadmap).
- **G7 — Safe AI Assistance**: AI-generated improvements must **never invent** experience, skills, metrics, companies, or certifications.

---

## 5. Target Users

1. **Students**: Applying for internships, campus placements, hackathons, and graduate programs.
2. **Freshers (0–2 yrs)**: Highlighting academic projects, certifications, and technical foundations.
3. **Working Professionals**: Switching jobs, optimizing resumes for senior/lead engineering roles.
4. **Career Advisors & Placement Cells**: Mentoring students and evaluating batches of resumes.
5. **Recruiters**: Screening candidates with transparent match breakdowns.

---

## 6. Core User Journey

```
                     User visits ResumeLens
                               │
                               ▼
               Creates account / continues as guest
                               │
                               ▼
                        Uploads Resume
                               │
                               ▼
               Resume Parser extracts content
                               │
                               ▼
             User optionally enters Job Description
                               │
                               ▼
                       NLP + ML analysis
                               │
                               ▼
                         ATS analysis
                               │
                               ▼
                       Skill extraction
                               │
                               ▼
                    Semantic Job Matching
                               │
                               ▼
                 Deterministic Scoring Engine
                               │
                               ▼
             LLM generates explanations & improvements
                               │
                               ▼
                      Interactive Report
                               │
                               ▼
                       User fixes resume
                               │
                               ▼
                      Uploads new version
                               │
                               ▼
                   ResumeLens compares versions
```

---

## 7. Product Scope & MVP Features

The core MVP contains:
- Multi-format upload (PDF, DOCX, TXT)
- Multi-engine parsing (PyMuPDF, pdfplumber, python-docx, OCR fallback)
- Section & Entity detector
- Job Description Analyzer & 4-bar matcher
- Deep ATS Diagnostic
- Deterministic 7-Dimension 0–100 Scoring
- Explainable Point Loss ("Why did I lose X points?")
- Evidence Vault with Anti-Hallucination Safe AI
- AI STAR/CAR Bullet Rewriter
- Real-Time ATS Resume Builder
- Version Comparison (V1 vs V2)
- Candidate KPI Dashboard
- Exportable / Printable PDF Reports

---

## 8. Feature Requirements

### 8.1 Deterministic 7-Dimension Scoring Engine

$$\text{Final Score (0–100)} = \sum_{i=1}^{7} \text{Dimension}_i$$

| Dimension | Max Points | Core Inspection Rules |
|---|---|---|
| **ATS Compatibility** | **20** | Single-column layout, table penalties, unanchored text boxes, font readability ($\ge 9\text{pt}$), standard section headers |
| **Job Match** | **20** | Keyword overlap, title match, semantic qualification alignment |
| **Skills Coverage** | **15** | Hard skills, tools, cloud & frameworks detected vs normalized taxonomy |
| **Experience Evidence** | **15** | Measurable outcomes (metrics, %, $, numbers, scale), action verbs |
| **Resume Structure** | **10** | Logical section flow, standard ATS order, balanced whitespace |
| **Writing Quality** | **10** | Strong action verbs, active voice, elimination of passive phrasing |
| **Education & Projects** | **10** | Degree, major, institution, graduation dates, project repository metrics |
| **TOTAL** | **100** | **100% Explainable Breakdown** |

### 8.2 Evidence System & Explainability
Every deduction contains transparent attribution:
- `-4 points`: Only 5 of 8 required technical skills detected (*Detected: Python, FastAPI, PostgreSQL, Git, Docker; Missing: AWS, Kubernetes, Redis*).
- `-3 points`: Only 2 of 6 experience bullets contain measurable outcomes.

### 8.3 Skill Intelligence & Normalization Map
- Canonical mappings in `frontend/src/data/skills/*.json` & `backend/app/data/skills/`:
  - `ReactJS`, `React.js`, `React JS`, `react` $\rightarrow$ `React`
  - `Node`, `Node.js`, `NodeJS` $\rightarrow$ `Node.js`
  - `Postgres`, `PostgreSQL`, `psql` $\rightarrow$ `PostgreSQL`
- Honest Candidate Advisories: *"Docker appears in the JD but was not found in your resume. Add it only if you have genuine hands-on experience."*

### 8.4 AI Bullet Point Optimizer
- Converts passive responsibility statements into **Action + Task + Result (STAR/CAR)** format.
- Strictly grounded in existing resume facts without inventing unverified numbers or percentages.

---

## 9. AI/ML Multi-Layer Architecture

```
Layer 1: Deterministic Code
└── File validation, Regex, PyMuPDF, Section bounding boxes, Contact extraction

Layer 2: Natural Language Processing
└── spaCy, NLTK, Named Entity Recognition, Action verb classifier

Layer 3: Semantic Embeddings
└── Sentence Transformers (BAAI/bge-small-en-v1.5, all-MiniLM-L6-v2), Cosine Similarity

Layer 4: Machine Learning
└── XGBoost / LightGBM feature ranking, Anomaly detection, Experience relevance

Layer 5: Large Language Model
└── Explanation generation, Evidence Vault proofs, Safe STAR bullet rewriting
```

---

## 10. Technology Stack

### Frontend
- **Framework & Core**: React.js 18, TypeScript, Vite
- **Styling & Components**: Tailwind CSS, shadcn/ui primitives, Lucide React
- **Animation & Transitions**: Framer Motion
- **Application Routing**: React Router (14 dedicated routes)
- **State Management & Caching**: TanStack Query, Zustand
- **Analytics & Visualizations**: Recharts
- **Forms & Validation**: React Dropzone, React Hook Form, Zod

### Backend
- **Framework**: Python 3.12+, FastAPI, Uvicorn, Pydantic, SQLAlchemy, Alembic
- **Document Processing**: PyMuPDF (`fitz`), `pdfplumber`, `python-docx`, Tesseract OCR, OpenCV
- **NLP / ML Engine**: `spaCy`, `NLTK`, `sentence-transformers`, `scikit-learn`, `XGBoost`, `LightGBM`
- **Database & Storage**: PostgreSQL + `pgvector`, Redis, Cloudflare R2 / AWS S3
- **Authentication**: JWT, Google OAuth, Supabase Auth

---

## 11. Database Schema

```
Users (id, name, email, password_hash, created_at)
  │
  ├── Resumes (id, user_id, filename, version, raw_text, parsed_data, overall_score, created_at)
  │     ├── Resume Sections (id, resume_id, section_name, content, order_index)
  │     └── Resume Skills (id, resume_id, skill_id, confidence, evidence)
  │
  ├── Job Descriptions (id, user_id, title, company, description, required_skills)
  │
  ├── Job Matches (id, resume_id, job_id, overall_match, skills_pct, experience_pct)
  │
  ├── Analysis Reports (id, resume_id, ats_score, job_match_score, deductions, score_breakdown)
  │
  ├── Recommendations (id, analysis_id, type, priority, message, evidence)
  │
  └── Applications (id, user_id, job_id, resume_id, status, applied_date)
```

---

## 12. SaaS Pricing Model

### India-Focused Model:
- **Free Candidate (₹0)**: 3 Resume Scans/Month, Basic ATS audit, Core skill match.
- **Pro Engineer (₹199/month)**: Unlimited Scans & Versions, AI STAR Bullet Rewriter, Job Matcher, Cover Letter Generator, ATS Resume Builder.
- **Career Accelerator (₹399/month)**: Advanced Multi-Role Career Simulator, Executive Metric Optimizer, Version Diff, Priority Support.

### International Model:
- **Free ($0)**
- **Pro ($19/month)**
- **Accelerator ($49/month)**

---

## 13. Safety & Anti-Hallucination Framework (Evidence Vault)

```
                       Resume Text Input
                              │
                              ▼
                     Evidence Extraction
                   (Claims, Metrics, Tools)
                              │
                              ▼
                       Verified Proofs
                   (Evidence Vault Ledger)
                              │
                              ▼
                     Prompt Guardrails
                (Constrain AI to Verified Facts)
                              │
                              ▼
                     LLM STAR Rewrite
                              │
                              ▼
                    Factuality Validation
                              │
                              ▼
                     Final Report Output
```

---

## 14. Product Success & Core Product Loop

ResumeLens succeeds when a user can upload a resume and a job description and, within seconds, receive a trustworthy diagnosis answering:

1. **How strong is my resume?** $\rightarrow$ *Evidence-Based Score (0–100)*
2. **Why did I get this score?** $\rightarrow$ *Itemized Point Deductions & Evidence*
3. **What am I missing?** $\rightarrow$ *Skill Gaps & Keyword Alignment*
4. **What should I fix first?** $\rightarrow$ *Prioritized Action Roadmap ("Fix My Resume")*

$$\textbf{Core Loop: }\text{Analyze} \longrightarrow \text{Understand} \longrightarrow \text{Fix} \longrightarrow \text{Re-analyze} \longrightarrow \text{Improve}$$
