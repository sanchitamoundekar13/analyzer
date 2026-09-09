# ResumeLens — Evidence-Based AI Resume Analyzer & ATS Scanner
**Repository:** [sanchitamoundekar13/analyzer](https://github.com/sanchitamoundekar13/analyzer)

---

## Overview
**ResumeLens** is an evidence-based AI resume analyzer and ATS optimization platform. It helps candidates make their resumes stronger before applying by evaluating structure, hard/technical skills, quantifiable impact in experience bullets, ATS parser compatibility, and job description alignment.

---

## Core Features

1. **Evidence-Based Scoring (0–100)**:
   - Dynamic radial score donut gauge measuring candidate strength.
   - 6-dimension breakdown:
     - **ATS & Structure** (Formatting, single-column readability, standard headings)
     - **Skills Match** (Hard skills, tools, and framework detection)
     - **Quantified Experience** (Action + Metric + Result bullet points)
     - **Job Match Relevance** (Keyword overlap against job descriptions)
     - **Education & Certifications** (Institution, degree, graduation year formatting)
     - **Writing Quality & Action Verbs** (Tone, grammatical precision, clarity)

2. **Instant Keyword Gap Finder**:
   - Compares resume text with target job postings.
   - Highlights missing high-impact technical keywords and industry terms.

3. **AI Bullet Point Optimizer**:
   - Converts passive task descriptions into high-impact metric-driven bullet points with before/after diffs.

4. **100% Client-Side Privacy**:
   - Zero-tracking and private sandbox scanning for PDF and DOCX files.

---

##  Architecture & Tech Stack

```
+-------------------------------------------------------------+
|                      Client Layer                           |
|  - React.js + Vite + Tailwind CSS                           |
|  - Lucide Icons + SVG Radial Gauge Engine                   |
|  - Standalone Zero-Dependency HTML Build (resumelens.html)  |
+-------------------------------------------------------------+
                              |
                     REST API / Parser Engine
                              |
+-------------------------------------------------------------+
|                      Backend Layer                          |
|  - Python FastAPI / Node.js Resume Parsing Pipeline         |
|  - PDF / DOCX Text & Semantic Extraction Engine             |
|  - ATS Scoring & Keyword Matching Engine                    |
+-------------------------------------------------------------+
```

---

##  How to Run the Project

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

##  Contributors & Collaboration
- **GitHub Repository**: [sanchitamoundekar13/analyzer](https://github.com/sanchitamoundekar13/analyzer)
