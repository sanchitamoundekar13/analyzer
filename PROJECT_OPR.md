# PROJECT OPR
## Project Title
# ResumeLens — Evidence-Based AI Resume Analyzer & ATS Diagnostic Platform

---

## 1. Introduction

**ResumeLens** is an AI/ML-powered resume analysis and career intelligence platform designed to help students, freshers, and job seekers understand how effectively their resume represents their skills and experience for a particular job.

The platform analyzes a candidate's resume, evaluates its ATS compatibility, identifies relevant and missing skills, compares the resume with a target Job Description (JD), evaluates experience evidence and writing quality, and provides specific, actionable recommendations for improvement.

Unlike systems that provide an unexplained AI-generated score, ResumeLens follows an **evidence-based and explainable scoring approach**, where every major score is supported by detectable information from the resume.

---

## 2. Problem Statement

Many students and job seekers submit resumes without knowing whether their resume is ATS-friendly, relevant to the target job, or effectively communicating their achievements.

### Common Problems Include:
- Poor ATS compatibility
- Missing job-specific keywords
- Generic resume content
- Weak experience descriptions
- Lack of measurable achievements
- Improper resume structure
- Irrelevant information
- Inconsistent formatting
- Lack of objective feedback
- Difficulty understanding why a resume may not perform well for a particular job

Existing resume tools often focus primarily on generating content or providing a single AI-generated score without clearly explaining the evidence behind the result.

---

## 3. Proposed Solution

ResumeLens provides an intelligent resume diagnostic system that combines:

$$\text{Document Processing} + \text{NLP} + \text{Machine Learning} + \text{Semantic Matching} + \text{Deterministic Scoring} + \text{LLM-based Recommendations}$$

The system processes the resume, extracts structured information, compares it against a job description, calculates multiple measurable dimensions, and produces an explainable report.

> [!IMPORTANT]
> **Core Anti-Hallucination Principle**: ResumeLens must **never fabricate** a candidate's skills, achievements, experience, or numerical results.

---

## 4. Objectives

The major objectives are:
1. Analyze resumes automatically across PDF, DOCX, and TXT formats.
2. Evaluate ATS compatibility against enterprise crawlers (Taleo, Workday, Greenhouse, Lever, iCIMS).
3. Extract skills, experience, education, projects, certifications, and contact information.
4. Compare resumes with target job descriptions.
5. Identify matched and missing skills with canonical taxonomy normalization.
6. Calculate an explainable resume score (0–100).
7. Identify exactly why points were lost with transparent deductions.
8. Improve weak resume bullets using the **Action + Task + Result** framework without fabricating information.
9. Provide personalized, high-priority recommendations ("Fix My Resume" action workflow).
10. Help users create job-specific, ATS-friendly resumes.
11. Track improvement between different resume versions.

---

## 5. Major Features

### A. Resume Analyzer
Users can upload their resume in:
- **PDF** (Native text extraction & OCR fallback for scanned pages)
- **DOCX** (Native XML paragraph & table parsing)
- **TXT** (Plain text normalization)

### B. ATS Diagnostic
The system performs deep inspection of:
- Resume structure
- Standard sections & ordering
- Contact information reachability
- Dates & chronology
- 2-column or multi-column layout risks
- Embedded tables & complex grids
- Floating text boxes & vector canvas elements
- ATS readability & font size thresholds ($\ge 9\text{pt}$)
- Unusual characters & unicode ligatures
- Ideal document length (1–2 pages)

### C. Job Description Matcher
Users can paste a target Job Description. ResumeLens identifies:
- Matching skills
- Missing skills
- Related skills
- Job-specific keywords
- Semantic relevance (via sentence embeddings)
- Experience seniority & timeline alignment

### D. Evidence-Based Deterministic Scoring (100 Points Total)

| Category | Weight (Max Pts) | Inspection Criteria |
|---|---|---|
| **ATS Compatibility** | **20** | Single-column flow, table penalties, unanchored text boxes, standard headers |
| **Job Match** | **20** | Keyword overlap, title match, semantic qualification alignment |
| **Skills Coverage** | **15** | Hard skills, tools, cloud & frameworks detected vs normalized taxonomy |
| **Experience Evidence** | **15** | Quantified metrics (%, $, numbers, latency, scale), action verbs |
| **Resume Structure** | **10** | Logical section flow, standard ATS order, balanced whitespace |
| **Writing Quality** | **10** | Strong action verbs, active voice, elimination of passive phrasing |
| **Education & Projects** | **10** | Degree, major, institution, graduation dates, project repository metrics |
| **TOTAL** | **100** | **100% Explainable Breakdown** |

### E. Explainable Feedback
Instead of simply saying `Resume Score: 78`, ResumeLens explains:
- **Where points were lost** (e.g. `-4 Job Match`, `-3 Experience Metrics`, `-2 Passive Verbs`)
- **Evidence responsible for the deduction** (e.g. `Missing: Docker, AWS; 2 of 8 bullets contain measurable outcomes`)
- **What should be improved**
- **Priority order of each improvement**

### F. Skill Gap Analysis
The system categorizes skills into:
1. **Detected Skills**
2. **Matched Skills**
3. **Missing Skills**
4. **Skills Not Recommended Without Evidence** (e.g. *"Docker appears in the JD but was not found in your resume. Add it only if you have genuine hands-on experience."*)

### G. AI Bullet Optimization
Weak bullets are rewritten using the **Action + Task + Result** framework. The system does not invent metrics. If a measurable result is missing, it prompts the user to provide verified evidence.

### H. Resume Version Comparison
Users can compare two resume versions (V1 vs V2) and see:
- Score improvement delta ($+14$ points)
- Newly added skills
- Removed layout/ATS problems
- Improved bullet points
- Job match percentage increase

### I. Career Intelligence
Recommends suitable roles (e.g. Full Stack 88%, Frontend 94%, Backend 80%, DevOps 62%) and high-ROI skills to learn next.

---

## 6. System Workflow

```
                 USER
                   │
                   ▼
            Upload Resume
                   │
                   ▼
          PDF / DOCX Processing
        (PyMuPDF / docx / OCR)
                   │
                   ▼
            Text Extraction
                   │
                   ▼
          Resume Section Detection
                   │
        ┌──────────┼───────────┐
        ▼          ▼           ▼
      Skills    Experience   Education
        │          │           │
        └──────────┼───────────┘
                   ▼
             NLP Analysis
                   │
                   ▼
          ATS Compatibility
                   │
                   ▼
       Job Description Analysis
                   │
                   ▼
       Semantic Skill Matching
                   │
                   ▼
             ML Analysis
                   │
                   ▼
        Deterministic Scoring
                   │
                   ▼
          Evidence Generation
                   │
                   ▼
          LLM Recommendations
                   │
                   ▼
             FINAL REPORT
```

---

## 7. Artificial Intelligence / Machine Learning Architecture

ResumeLens uses multiple specialized AI/ML components rather than relying completely on an LLM:

### 1. Natural Language Processing
- **Technologies**: `spaCy`, `NLTK`, `Transformers`, `Sentence Transformers`
- **Responsibilities**: Skill extraction, Named Entity Recognition (NER), Section detection, Action verb classification, Experience & metric extraction, Semantic similarity.

### 2. Semantic Matching
- Sentence Transformer models convert resumes and job descriptions into high-dimensional vector embeddings.
- Calculates cosine semantic similarity between:
  - $\text{Resume} \longleftrightarrow \text{Job Description}$
  - $\text{Candidate Skills} \longleftrightarrow \text{Required Skills}$

### 3. Machine Learning
- **Models**: `XGBoost`, `LightGBM`, `Scikit-learn`
- **Features Extracted**:
  - Keyword match percentage
  - Semantic similarity score
  - Skill coverage ratio
  - Experience timeline relevance
  - Number of quantified achievements
  - Action verb ratio
  - Section completeness
  - ATS compatibility score
  - Education relevance
  - Project relevance

### 4. Large Language Model (LLM)
- **Primary Use**: Explanation generation, STAR bullet improvement, personalized recommendations, resume summaries, tailored cover letters, and career suggestions.
- **Rule**: The final score is **never** determined arbitrarily by the LLM.

---

## 8. Technology Stack

### Frontend
- **Framework & Core**: React.js, TypeScript, Vite
- **Styling & UI**: Tailwind CSS, shadcn/ui, Lucide React
- **Animation & Routing**: Framer Motion, React Router
- **State & Data Fetching**: TanStack Query, Zustand
- **Data Visualization**: Recharts
- **Forms & Upload**: React Dropzone, React Hook Form, Zod

### Backend
- **Framework**: Python 3.12+, FastAPI, Uvicorn, Pydantic, SQLAlchemy, Alembic
- **Document Processing**: PyMuPDF (`fitz`), `pdfplumber`, `python-docx`, Tesseract OCR, OpenCV
- **NLP / AI / ML**: `spaCy`, `NLTK`, `Sentence Transformers`, `Hugging Face`, `Scikit-learn`, `XGBoost`, `LightGBM`, `NumPy`, `Pandas`, `SciPy`
- **Database & Storage**: PostgreSQL + `pgvector`, Redis, Cloudflare R2 / Amazon S3
- **Authentication**: JWT, Google OAuth, Supabase Auth
- **Background Processing**: Celery, Redis

---

## 9. Database Structure

```
Users
  │
  ├── Resumes
  │     ├── Resume Versions
  │     ├── Resume Sections
  │     └── Skills
  │
  ├── Job Descriptions
  │
  ├── Job Matches
  │
  ├── Analysis Reports
  │
  ├── Recommendations
  │
  └── Applications
```

---

## 10. Expected Output

After analysis, the user receives:
1. **Resume Score**: 0–100 deterministic score.
2. **ATS Score**: ATS Compatibility percentage and layout checklist.
3. **Job Match**: 4-bar breakdown (Skills %, Experience %, Keywords %, Semantic relevance %).
4. **Skills Breakdown**: Detected, Matched, Missing, and Related.
5. **Experience Audit**: Quantified achievements, action verbs, weak bullets, and evidence gaps.
6. **Writing Analysis**: Weak phrases, repetition, and passive language fixes.
7. **Final Recommendations**: Prioritized list of actionable changes with "Fix My Resume" workflow.

---

## 11. Innovation & Target Impact

The key innovation of ResumeLens is its **evidence-based and explainable resume analysis**.

Instead of:
> *"AI says your resume is 78/100."*

ResumeLens provides:
> *"Your resume scored 78/100 because 4 required skills were not detected (-4), only 5 of 10 experience bullets contain measurable outcomes (-3), and the current formatting contains a 2-column layout ATS risk (-5). Fixing these items can realistically elevate your score to 89/100."*

### Target Users:
- College students & freshers
- Internship applicants
- Software developers & engineering leaders
- Job seekers & career switchers
- College placement cells & universities

---

## 12. Conclusion

ResumeLens is an intelligent, explainable, and evidence-driven resume analysis platform that bridges traditional software engineering, NLP, machine learning, semantic search, and LLM capabilities.

The core philosophy moves away from an unexplained "AI score" and instead empowers candidates with transparent evidence, reasoning, measurable weaknesses, and actionable improvements to succeed in their career journey.
