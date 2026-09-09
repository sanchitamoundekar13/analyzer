# ResumeLens — Evidence-Based AI Resume Analyzer & ATS Scanner
**Repository:** [sanchitamoundekar13/analyzer](https://github.com/sanchitamoundekar13/analyzer)

---

## 📌 Overview & Official Specifications
**ResumeLens** is an AI/ML-powered, evidence-based resume analysis and career intelligence platform. It analyzes a candidate's resume, evaluates ATS layout compatibility, identifies relevant and missing skills, matches against target Job Descriptions (JD), extracts verified evidence, and provides explainable, non-hallucinating recommendations.

> 📄 **Product Requirements Document**: [PRD.md](file:///c:/Users/bhavi/Downloads/ResumeLens/PRD.md) (v1.0)  
> 🛠️ **Technical Requirements Document**: [TRD.md](file:///c:/Users/bhavi/Downloads/ResumeLens/TRD.md) (v1.0)  
> 📐 **Backend Schemas Specification**: [BACKEND_SCHEMAS.md](file:///c:/Users/bhavi/Downloads/ResumeLens/BACKEND_SCHEMAS.md) (v1.0)  
> 🧭 **Application Flow Specification**: [APPLICATION_FLOW.md](file:///c:/Users/bhavi/Downloads/ResumeLens/APPLICATION_FLOW.md) (v1.0)  
> 📖 **Project Operational Requirements**: [PROJECT_OPR.md](file:///c:/Users/bhavi/Downloads/ResumeLens/PROJECT_OPR.md)

---

## ✨ Core Features & Deterministic 7-Dimension Scoring

1. **Evidence-Based Deterministic Scoring (0–100)**:
   - Every point is mathematically grounded with detectable resume facts:
     - **ATS Compatibility** (20 pts): Single-column layout, table checks, font readability ($\ge 9\text{pt}$), standard headers
     - **Job Match** (20 pts): Direct keyword overlap, semantic title & experience alignment
     - **Skills Coverage** (15 pts): Hard skills, tools, cloud & frameworks detected vs normalized taxonomy
     - **Experience Evidence** (15 pts): Measurable outcomes (metrics, %, $, numbers), action verbs
     - **Resume Structure** (10 pts): Logical section flow, standard ATS order, balanced whitespace
     - **Writing Quality** (10 pts): Strong action verbs, active voice, elimination of passive phrasing
     - **Education & Projects** (10 pts): Degree, major, institution, graduation dates, project repository metrics

2. **Explainable Deductions & "Why did I lose X points?"**:
   - Itemized point loss explanations (e.g. `-4 Job Match: Missing Docker, AWS`, `-3 Experience: Only 3 of 6 bullets contain measurable metrics`).
   - Realistic reachable target projection (`Current: 86/100 → Target: 96/100 (+10 pts)`).
   - **"Fix My Resume"** interactive prioritized action checklist.

3. **Job Description Matcher (4-Bar Breakdown)**:
   - **Skills Match %**, **Experience Alignment %**, **Keyword Overlap %**, and **Semantic Relevance %**.
   - Categorized skills: *Matched, Missing, Related*, and *Honest Candidate Advisories*.

4. **Deep Real ATS Analyzer & Visual Resume Scanner**:
   - Interactive document layout simulator with color-coded inspection overlays:
     - 🔴 **ATS Problem** (e.g., 2-column layout or embedded table)
     - 🟡 **Weak Bullet** (e.g., passive phrasing)
     - 🔵 **Missing Skill** (e.g., Docker/AWS from JD)
     - 🟢 **Verified Evidence** (e.g., verified metric outcome)

5. **Evidence Vault & Anti-Hallucination Safe AI**:
   - Extracts verified candidate claims with proof quotes and confidence ratings.
   - Strictly forbids the AI from fabricating metrics or achievements.

6. **ATS Resume Builder & Cover Letter Generator**:
   - Single-column ATS-safe live editor with instant score updates and PDF print.
   - AI Cover Letter Generator tailored to target roles with tone selection.


---

## 🛠️ System Architecture & Tech Stack

```text
                    ResumeLens
                        │
          ┌─────────────┴─────────────┐
          │                           │
      Frontend                    Backend API
          │                           │
 React + TypeScript             Python + FastAPI
 Vite                           │
 Tailwind                       ├── Resume Parser
 shadcn/ui                      ├── NLP Engine
 Framer Motion                  ├── ML Engine
 Recharts                       ├── Scoring Engine
 React Query                    └── LLM Service
          │                           │
          └─────────────┬─────────────┘
                        │
                PostgreSQL + pgvector
                        │
                Redis + Object Storage
```

### 🔹 Layer Breakdown

- **Frontend (Client)**:
  - **Framework & Core**: React + TypeScript, Vite
  - **Styling & UI**: Tailwind CSS, shadcn/ui, Lucide Icons
  - **Animation & Data Visualization**: Framer Motion, Recharts
  - **Data Fetching & State**: React Query

- **Backend (API & Processing Engine)**:
  - **API Framework**: Python + FastAPI
  - **Resume Parser**: PDF & DOCX text extraction, layout analysis, ATS format verification
  - **NLP Engine**: Named Entity Recognition (NER), skill taxonomy parsing, semantic tokenization
  - **ML Engine**: Candidate-to-job matching algorithms, feature extraction
  - **Scoring Engine**: 6-dimension evidence-based scoring (0–100) & ATS rule checker
  - **LLM Service**: Intelligent bullet point rewriting & tailored resume recommendations

- **Data & Storage Layer**:
  - **Database**: PostgreSQL with `pgvector` for semantic embeddings and vector similarity search
  - **Cache & Storage**: Redis (caching / rate limiting) + Object Storage (encrypted resume documents)


---

## 🚀 How to Run the Project

### 1. Instant Standalone Run (Zero Setup Required)
Simply open `frontend/resumelens.html` directly in any web browser:
```powershell
Start-Process "frontend\resumelens.html"
```

### 2. React + Vite Development Run
```powershell
cd frontend
npm install
npm run dev
# Running on http://localhost:5173
```

---

## 👥 Contributors & Collaboration
- **GitHub Repository**: [sanchitamoundekar13/analyzer](https://github.com/sanchitamoundekar13/analyzer)
