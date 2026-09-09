# TECHNICAL REQUIREMENTS DOCUMENT (TRD)
# ResumeLens — Evidence-Based AI Resume Analyzer & ATS Diagnostic Platform

**Document Version:** 1.0  
**Product:** ResumeLens  
**Document Type:** Technical Requirements Document  
**Platform:** Web Application  
**Primary Architecture:** React + FastAPI + PostgreSQL + AI/ML Pipeline  
**Target Deployment:** Cloud (Vercel + Render/AWS + Supabase/Neon + Cloudflare R2)  

---

## 1. Technical Overview

ResumeLens is a web-based resume intelligence platform that analyzes resumes, extracts structured information, compares resumes against Job Descriptions, evaluates ATS compatibility, calculates an evidence-based score, and provides AI-assisted recommendations.

The system combines:
- Traditional backend logic
- Multi-engine document processing (`PyMuPDF`, `pdfplumber`, `python-docx`, OCR)
- Natural Language Processing (`spaCy`, `NLTK`)
- Machine Learning (`scikit-learn`, `XGBoost`, `LightGBM`)
- Semantic vector embeddings (`sentence-transformers`)
- Vector search (`pgvector`)
- Deterministic 7-dimension scoring ($0-100$)
- LLM-based explanation & optimization layer

> [!IMPORTANT]
> **Core Engineering Rule**: The architecture must ensure that the LLM is **not** responsible for arbitrarily assigning the final resume score. The score is calculated mathematically by the deterministic scoring engine over detectable resume facts.

---

## 2. Technical Architecture

### 2.1 High-Level System Architecture

```text
                         USER
                           │
                           ▼
                ┌─────────────────────┐
                │   React Frontend    │
                │ TypeScript + Vite   │
                └──────────┬──────────┘
                           │ HTTPS
                           ▼
                ┌─────────────────────┐
                │    FastAPI API      │
                │ Authentication      │
                │ Validation          │
                │ Business Logic      │
                └──────────┬──────────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
       PostgreSQL       Redis        Object Storage
       + pgvector       Cache        PDF/DOCX Files
             │
             ▼
       ┌──────────────────────┐
       │ Resume Processing    │
       │ Pipeline             │
       └──────────┬───────────┘
                  │
                  ▼
       ┌──────────────────────┐
       │ Document Parser      │
       │ PDF / DOCX / OCR     │
       └──────────┬───────────┘
                  │
                  ▼
       ┌──────────────────────┐
       │ NLP Processing       │
       │ Section Detection    │
       │ Skill Extraction     │
       │ Entity Extraction    │
       └──────────┬───────────┘
                  │
                  ▼
       ┌──────────────────────┐
       │ Semantic Matching    │
       │ Embeddings           │
       │ Job Matching         │
       └──────────┬───────────┘
                  │
                  ▼
       ┌──────────────────────┐
       │ ML Feature Engine    │
       └──────────┬───────────┘
                  │
                  ▼
       ┌──────────────────────┐
       │ Deterministic        │
       │ Scoring Engine       │
       └──────────┬───────────┘
                  │
                  ▼
       ┌──────────────────────┐
       │ LLM Recommendation   │
       │ & Explanation Layer  │
       └──────────┬───────────┘
                  │
                  ▼
             FINAL REPORT
```

---

## 3. Technology Stack

### 3.1 Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool |
| **Tailwind CSS** | Styling |
| **shadcn/ui** | Professional UI components |
| **Lucide React** | Icons |
| **Framer Motion** | Micro-animations |
| **React Router** | 14-Route application routing |
| **TanStack Query** | Server state & API caching |
| **Zustand** | Client global state |
| **React Hook Form** | High-performance forms |
| **Zod** | Schema validation |
| **Recharts** | Analytics & score visualization |
| **React Dropzone** | File upload |

### 3.2 Backend
- **Core Framework**: Python 3.12+, FastAPI, Uvicorn, Pydantic, SQLAlchemy, Alembic, `python-multipart`, HTTPX
- **Document Processing**: `PyMuPDF` (`fitz`), `pdfplumber`, `python-docx`, Tesseract OCR, `pytesseract`, OpenCV
- **NLP / ML Engine**: `spaCy`, `NLTK`, `scikit-learn`, `XGBoost`, `LightGBM`, `sentence-transformers`, Hugging Face, PyTorch, NumPy, Pandas, SciPy
- **Database & Storage**: PostgreSQL + `pgvector`, Redis, Cloudflare R2 / AWS S3
- **Authentication**: JWT, Google OAuth, Supabase Auth
- **Background Processing**: Celery, Redis

---

## 4. Document Processing & OCR Pipeline

```text
                  PDF / DOCX Upload
                          │
                          ▼
                   File Validation
                 (MIME, Size, Magic)
                          │
                          ▼
                  Format Dispatcher
             ┌────────────┴────────────┐
             ▼                         ▼
      Native PDF Parser        Native DOCX Parser
     (PyMuPDF+pdfplumber)        (python-docx)
             │                         │
             ▼                         │
    Text Density Check                 │
    (Chars < 50/page?)                 │
    ┌────────┴────────┐                │
    ▼ (Yes)           ▼ (No)           │
OCR Pipeline     Direct Text           │
 (Tesseract)          │                │
    │                 │                │
    └────────┬────────┘                │
             │                         │
             └────────────┬────────────┘
                          ▼
                    Text Cleaner
           (Ligatures, UTF-8, Line-Wrap)
                          │
                          ▼
                 Section & NLP Parser
```

---

## 5. Normalized Resume Data Model

```json
{
  "candidate": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "location": "string"
  },
  "links": {
    "linkedin": "string",
    "github": "string",
    "portfolio": "string"
  },
  "summary": "string",
  "education": [
    {
      "degree": "string",
      "field": "string",
      "school": "string",
      "gradDate": "string",
      "gpa": "string"
    }
  ],
  "experience": [
    {
      "role": "string",
      "company": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "bullets": ["string"]
    }
  ],
  "projects": [
    {
      "title": "string",
      "techStack": "string",
      "description": "string",
      "link": "string"
    }
  ],
  "skills": ["string"],
  "certifications": ["string"],
  "achievements": ["string"]
}
```

---

## 6. Deterministic 7-Dimension 100-Point Scoring Model

$$\text{Final Score} = \text{ATS}(20) + \text{JDMatch}(20) + \text{Skills}(15) + \text{Experience}(15) + \text{Structure}(10) + \text{Writing}(10) + \text{Education/Projects}(10) = 100$$

### 6.1 Dimension Weight Breakdown:
1. **ATS Compatibility (20 pts)**:
   - Text extraction quality (20%)
   - Section recognition (20%)
   - Single-column layout (20%)
   - Contact parsing (10%)
   - Date parsing (10%)
   - Formatting consistency (10%)
   - Keyword accessibility (10%)
2. **Job Match (20 pts)**:
   - Required skill coverage (40%)
   - Semantic similarity (25%)
   - Experience relevance (15%)
   - Responsibility match (10%)
   - Education/Certification match (10%)
3. **Skills Coverage (15 pts)**: Canonical taxonomy matches across frontend, backend, cloud, databases, AI/ML, and devops.
4. **Experience Evidence (15 pts)**: Metric bullet ratio (bullets with numbers, %, $, latency, scale / total bullets).
5. **Resume Structure (10 pts)**: Standard section order and header syntax.
6. **Writing Quality (10 pts)**: Strong action verbs, active voice, elimination of passive verbs ("worked on", "assisted").
7. **Education & Projects (10 pts)**: Degrees, coursework, graduation dates, and repository links.

---

## 7. Machine Learning & Embedding Layer

### 7.1 Sentence Transformers
- **Models**: `BAAI/bge-small-en-v1.5`, `all-MiniLM-L6-v2`
- **Uses**:
  - $\text{CosineSim}(\text{Resume Embedding}, \text{JD Embedding}) \rightarrow \text{Semantic Match \%}$
  - Skill taxonomy embedding similarity for discovering unlisted related skills.

### 7.2 ML Feature Set (XGBoost / LightGBM)
Features extracted for ranking & resume quality prediction:
1. `required_skill_ratio`
2. `preferred_skill_ratio`
3. `semantic_similarity`
4. `experience_relevance`
5. `metric_ratio`
6. `action_verb_ratio`
7. `section_completeness`
8. `ats_quality`
9. `education_relevance`
10. `project_relevance`

---

## 8. Safe AI & Anti-Hallucination Framework (Evidence Vault)

```text
                     Analysis Results
                            │
                            ▼
                      Evidence Vault
                 (Verified Claim Quotes)
                            │
                            ▼
                      Priority Engine
                   (Order Fixes by ROI)
                            │
                            ▼
                      LLM Prompting
               (Strict Evidence Constraints)
                            │
                            ▼
                 Generated Recommendation
                            │
                            ▼
                  Factuality Validation
                 (Assert No Fake Numbers)
                            │
                            ▼
                      User Report
```

> [!CAUTION]
> The LLM is **forbidden** from inventing achievements, metrics, companies, or certifications. AI rewrites must only reorganize or reword factual evidence detected in the resume.

---

## 9. Backend Modular Architecture (`backend/`)

```text
backend/
├── app/
│   ├── main.py                     # FastAPI entrypoint, middleware, routers
│   ├── core/                       # Settings, environment config, security
│   ├── api/                        # REST API endpoint route handlers
│   ├── models/                     # SQLAlchemy database models
│   ├── schemas/                    # Pydantic request/response schemas
│   ├── parsers/
│   │   ├── pdf_parser.py           # PyMuPDF + pdfplumber + OCR
│   │   ├── docx_parser.py          # python-docx parser
│   │   └── text_cleaner.py         # Ligatures, unicode, whitespace healer
│   ├── nlp/
│   │   ├── section_detector.py     # Section boundary detection
│   │   ├── entity_extractor.py     # Contacts, dates, degrees, companies
│   │   ├── skill_intelligence.py   # Canonical skill taxonomy
│   │   └── semantic_matcher.py     # Embedding & cosine match
│   ├── ats/
│   │   └── ats_analyzer.py         # Deep layout & enterprise ATS auditor
│   ├── scoring/
│   │   ├── scoring_engine.py       # Deterministic 7-dimension 100-pt engine
│   │   └── ml_feature_extractor.py # 10 ML features & XGBoost predictor
│   ├── llm/
│   │   ├── bullet_optimizer.py     # STAR format bullet rewriter
│   │   ├── evidence_vault.py       # Claim ledger & proof quotes
│   │   └── cover_letter_gen.py     # Grounded cover letter generator
│   └── data/
│       └── skills/                 # JSON taxonomies (frontend, backend, cloud, etc.)
├── tests/
└── requirements.txt
```

---

## 10. Frontend Architecture (`frontend/src/`)

```text
frontend/src/
├── components/
│   ├── ui/                         # shadcn/ui components (Button, Card, Badge, Tabs, Dialog, Progress)
│   ├── layout/                     # Navbar, Footer, AppLayout
│   ├── scanner/                    # VisualResumeScanner with 4 color-coded highlights
│   ├── report/                     # ScoreDonutGauge, WhyLostPointsCard, PriorityFixesCard, ATSCompatibilityCard
│   └── matcher/                    # JDMatcher4Bar, SkillGapCategorizer
├── pages/
│   ├── LandingPage.jsx             # /
│   ├── AnalyzePage.jsx             # /analyze
│   ├── ReportPage.jsx              # /report/:id
│   ├── DashboardPage.jsx           # /dashboard
│   ├── ResumeVaultPage.jsx         # /resume
│   ├── ResumeBuilderPage.jsx       # /resume-builder
│   ├── JobsPage.jsx                # /jobs
│   ├── JobDetailPage.jsx           # /jobs/:id
│   ├── ComparePage.jsx             # /compare
│   ├── CoverLetterPage.jsx         # /cover-letter
│   ├── PricingPage.jsx             # /pricing
│   ├── SettingsPage.jsx            # /settings
│   ├── LoginPage.jsx               # /login
│   └── SignupPage.jsx              # /signup
├── store/
│   └── useResumeStore.js           # Zustand global store & persistence
├── services/
│   ├── apiClient.js                # FastAPI live connection with fallback
│   └── scoringEngine.js            # Client-side 7-dimension engine parity
├── types/
│   └── index.ts                    # Full TypeScript interfaces
├── App.jsx                         # React routing controller
└── main.jsx                        # Entry point
```

---

## 11. REST API Endpoints Specification

### Authentication
- `POST /api/auth/register` — Register candidate account
- `POST /api/auth/login` — Sign in & return JWT token
- `POST /api/auth/logout` — Revoke token
- `GET /api/auth/me` — Current user profile & settings

### Resume & Analysis
- `POST /api/v1/resumes/analyze` — Multipart resume upload + JD analysis
- `GET /api/v1/resumes` — List candidate resumes
- `GET /api/v1/resumes/{id}` — Get single resume details
- `DELETE /api/v1/resumes/{id}` — Delete resume & associated files
- `POST /api/v1/jobs/match` — Match resume against target JD
- `POST /api/v1/resumes/rewrite` — Optimize bullet point in STAR format
- `POST /api/v1/resumes/compare` — Compare two resume versions (V1 vs V2)
- `POST /api/v1/cover-letter` — Generate tailored cover letter
- `GET /api/v1/career/roles` — Career role recommendations

---

## 12. Non-Functional, Security & Privacy Requirements

### 12.1 Performance Targets:
- File upload acknowledgement: $< 2\text{ sec}$
- Text extraction & OCR: $< 5\text{ sec}$
- Full 7-dimension analysis: $< 15\text{ sec}$
- Dashboard load time: $< 2\text{ sec}$
- Standard CRUD API response: $< 500\text{ ms}$

### 12.2 Security & Privacy:
- **No Training on User Data**: User resumes are never used to train public LLMs.
- **Encryption**: HTTPS in transit, encrypted storage at rest in S3/Cloudflare R2.
- **Ownership Isolation**: Tenant validation ensures User A cannot access User B's files.
- **User-Controlled Deletion**: Immediate deletion of resumes, analysis history, and accounts upon request.

---

## 13. Final Technical Principle

```text
              RAW RESUME
                   │
                   ▼
            DOCUMENT PARSER
                   │
                   ▼
          STRUCTURED RESUME
                   │
          ┌────────┴────────┐
          ▼                 ▼
         NLP             ATS ENGINE
          │                 │
          ▼                 ▼
     SKILL/ENTITY       FORMAT DATA
     EXTRACTION              │
          │                 │
          └────────┬────────┘
                   ▼
            FEATURE ENGINE
                   │
          ┌────────┴────────┐
          ▼                 ▼
     SEMANTIC MODEL       ML MODEL
          │                 │
          └────────┬────────┘
                   ▼
        DETERMINISTIC SCORING
                   │
                   ▼
             EVIDENCE VAULT
                   │
                   ▼
                  LLM
                   │
                   ▼
        EXPLANATIONS + FIXES
                   │
                   ▼
             FINAL REPORT
```

> **Core Engineering Rule**: Do not build ResumeLens as *"an LLM that reads a resume."*  
> Build it as **a document intelligence + NLP + ML + deterministic scoring system**, with an LLM acting strictly as the explanation and optimization layer.
