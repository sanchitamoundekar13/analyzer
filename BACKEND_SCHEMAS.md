# ResumeLens — Backend Schemas Reference

## 1. Backend Schema Architecture Overview

ResumeLens separates data contracts into strictly defined schema layers:

```
app/
├── schemas/
│   ├── __init__.py
│   ├── auth.py             # Authentication & token schemas
│   ├── user.py             # User profile & registration schemas
│   ├── resume.py           # Parsed resume structures & upload responses
│   ├── job.py              # Job description & parsed requirement schemas
│   ├── analysis.py         # Analysis requests, progress & composite responses
│   ├── scoring.py          # 7-dimension scoring breakdown, deductions, weights
│   ├── ats.py              # Deep layout diagnostics & ATS checks
│   ├── skills.py           # Canonical skills & JD matching breakdown
│   ├── evidence.py         # Evidence vault claims & source citations
│   ├── recommendations.py  # Prioritized recommendations & AI rewrite schemas
│   ├── comparison.py       # Version-to-version resume delta & comparison
│   ├── dashboard.py        # Analytics stats, recent analyses & subscriptions
│   ├── report.py           # Comprehensive shareable report schema
│   ├── common.py           # Generic API response wrapper & pagination
│   └── enums.py            # Strongly typed categorical constants
```

### Layer Separation Principle

```
API Request / Response Schemas (Pydantic v2)
          ↓
Database Models (SQLAlchemy ORM + PostgreSQL / pgvector)
          ↓
Processing & Extraction Schemas (PyMuPDF / docx / spaCy / RegEx)
          ↓
AI / ML & LLM Grounding Schemas (Evidence Vault / Anti-Hallucination)
```

> **Strict Rule**: SQLAlchemy database models are never exposed directly to the client as API responses. All inputs and outputs traverse Pydantic schemas.

---

## 2. Master Schema Inventory

### 2.1 Common Schemas (`schemas/common.py`)
- `APIResponse[T]`: Generic wrapper `{ success: bool, message: str, data: T | None }`.
- `Pagination`: Standard offset/limit pagination `{ page, limit, total, total_pages }`.
- `TimestampSchema`: Auditing timestamps `{ created_at, updated_at }`.

### 2.2 Enums (`schemas/enums.py`)
- `ResumeFileType`: `pdf`, `docx`.
- `ResumeStatus`: `uploaded`, `processing`, `completed`, `failed`.
- `AnalysisStatus`: `queued`, `processing`, `completed`, `failed`.
- `RequirementType`: `required`, `preferred`, `optional`.
- `SkillLevel`: `beginner`, `intermediate`, `advanced`, `expert`.
- `RecommendationPriority`: `critical`, `high`, `medium`, `low`.
- `EvidenceType`: `positive`, `negative`, `missing`, `warning`.

### 2.3 User & Authentication Schemas (`schemas/user.py`, `schemas/auth.py`)
- `UserBase`, `UserCreate`, `UserLogin`, `UserResponse`.
- `TokenResponse`: Bearer token and user payload.
- `RefreshTokenRequest`: Token refresh payload.

### 2.4 Parsed Resume Schemas (`schemas/resume.py`)
- `CandidateSchema`: Contact info `{ name, email, phone, location }`.
- `ResumeLinks`: `{ linkedin, github, portfolio, other: list[HttpUrl] }`.
- `EducationSchema`: `{ institution, degree, field_of_study, start_date, end_date, grade, location, description }`.
- `ExperienceBullet`: `{ text, action_verb, has_metric, metrics, technologies }`.
- `ExperienceSchema`: `{ company, job_title, location, start_date, end_date, is_current, bullets }`.
- `ProjectSchema`: `{ name, description, technologies, bullets, url }`.
- `CertificationSchema`: `{ name, issuer, issue_date, expiry_date, credential_id, url }`.
- `AchievementSchema`: `{ title, description, organization, year }`.
- `SkillSchema`: `{ name, normalized_name, category, confidence, evidence }`.
- `ParsedResumeSchema`: Master structured output containing all extracted entities, raw text, and page count.
- `ResumeSection`: Section boundary and ATS order validation metadata.
- `ResumeUploadResponse`: Response after uploading a PDF/DOCX file.
- `ResumeResponse`: Complete resume detail with score and parsed entities.

### 2.5 Job Description Schemas (`schemas/job.py`)
- `JobDescriptionCreate`: `{ title, company, location, description }`.
- `JobRequirement`: `{ text, requirement_type, category, skills, confidence }`.
- `ParsedJobDescription`: `{ title, company, required_skills, preferred_skills, requirements, responsibilities, education_requirements, experience_requirements, raw_text }`.
- `JobResponse`: Response entity with parsed job data.

### 2.6 ATS Analysis Schemas (`schemas/ats.py`)
- `FormattingIssue`: `{ issue_type, severity, description, evidence, recommendation }`.
- `FormattingAnalysis`: `{ page_count, has_multiple_columns, has_tables, has_text_boxes, has_images, has_headers, has_footers, font_consistency, whitespace_score, issues }`.
- `ATSCheck`: Individual rule check `{ name, passed, score, severity, description, recommendation }`.
- `ATSAnalysis`: Composite ATS diagnostic `{ score, checks, text_extraction_score, section_detection_score, layout_score, contact_parsing_score, date_parsing_score, formatting_score }`.

### 2.7 Skills & Matching Schemas (`schemas/skills.py`)
- `SkillMatch`: `{ skill, resume_skill, matched, match_type, confidence, evidence }` (match types: `exact`, `normalized`, `semantic`, `related`, `missing`).
- `JobMatchAnalysis`: 4-Bar & Semantic breakdown `{ overall_match, required_skill_score, preferred_skill_score, semantic_similarity_score, experience_relevance_score, responsibility_match_score, education_match_score, matched_skills, missing_skills, related_skills }`.

### 2.8 Evidence Vault Schemas (`schemas/evidence.py`)
- `Evidence`: `{ id, evidence_type, category, claim, source, section, text, page_number, confidence }`.

### 2.9 Scoring Engine Schemas (`schemas/scoring.py`)
- `BulletAnalysis`: `{ original_text, action_verb, has_metric, metrics, technical_specificity, clarity_score, impact_score, issues }`.
- `ExperienceAnalysis`: `{ score, total_bullets, metric_bullets, action_verb_bullets, metric_ratio, action_verb_ratio, bullets }`.
- `WritingIssue`: `{ text, issue_type, severity, explanation }`.
- `WritingAnalysis`: `{ score, clarity_score, action_verb_score, conciseness_score, specificity_score, issues }`.
- `ScoreComponent`: `{ name, score, weight, weighted_score, strengths, weaknesses, evidence_ids }`.
- `ScoreBreakdown`: 7-dimension deterministic model (Total 100):
  - ATS Compatibility (20 pts)
  - Job Match (20 pts)
  - Skills Coverage (15 pts)
  - Experience Evidence (15 pts)
  - Resume Structure (10 pts)
  - Writing Quality (10 pts)
  - Education & Projects (10 pts)
- `ScoreWeights`: Configurable weighting model strictly validated to sum to 100.
- `ScoreDeduction`: Explainable loss attribution `{ category, points_lost, reason, evidence_ids, recommendation, priority }`.

### 2.10 Recommendations & Anti-Hallucination AI Schemas (`schemas/recommendations.py`)
- `Recommendation`: `{ id, title, description, category, priority, estimated_impact, evidence_ids, action }`.
- `BulletRewriteRequest` / `BulletRewriteResponse`: STAR/CAR bullet enhancer strictly grounded on evidence IDs.
- `SummaryRewriteRequest` / `SummaryRewriteResponse`: Professional summary rewriter.
- `AIValidationResult`: Anti-hallucination verification `{ factual, evidence_grounded, contains_invented_metrics, contains_invented_skills, contains_invented_experience, confidence, issues }`.

### 2.11 Comparison Schemas (`schemas/comparison.py`)
- `ScoreDifference`: `{ category, old_score, new_score, difference }`.
- `ResumeComparison`: `{ old_resume_id, new_resume_id, old_score, new_score, improvement, score_differences, improvements, regressions, recommendations }`.

### 2.12 Analysis & Tracking Schemas (`schemas/analysis.py`)
- `AnalysisCreate`: `{ resume_id, job_id }`.
- `AnalysisProgress`: Real-time pipeline status `{ analysis_id, status, current_stage, progress, completed_stages }`.
- `AnalysisResponse`: Comprehensive analysis result payload.

### 2.13 Dashboard & Subscription Schemas (`schemas/dashboard.py`)
- `DashboardStats`: `{ total_resumes, total_analyses, latest_score, best_score, average_score, score_improvement }`.
- `RecentAnalysis`: `{ analysis_id, resume_id, resume_name, score, grade, created_at }`.
- `DashboardResponse`: `{ stats, recent_analyses }`.
- `SubscriptionResponse`: `{ id, plan, status, analyses_limit, analyses_used, start_date, end_date }`.

### 2.14 Report Schemas (`schemas/report.py`)
- `ReportResponse`: Complete exportable/shareable audit report.

---

## 3. Analysis Pipeline & Processing Stages

When `POST /api/analysis` is executed, the backend advances through 16 fixed stages:

```
1.  file_validation       → MIME type, file header, corruption check
2.  text_extraction       → PyMuPDF / pdfplumber / python-docx
3.  ocr                   → Tesseract / OpenCV fallback for scanned PDFs
4.  section_detection     → Regex & heading hierarchy classification
5.  entity_extraction     → Contact, links, degrees, dates, metrics
6.  skill_extraction      → Canonical dictionary & contextual extraction
7.  resume_analysis       → Formatting, font metrics, structural ordering
8.  job_analysis          → Required vs preferred skill extraction
9.  semantic_matching     → Cosine similarity & 4-bar breakdown
10. feature_generation    → Experience metric density, action verb ratios
11. ats_analysis          → Table, column, text-box, font size checks
12. score_calculation     → Deterministic 7-dimension scoring engine
13. evidence_generation   → Claims recorded with exact string snippets
14. llm_recommendations   → Actionable fixes generated & hallucination-checked
15. report_generation     → ScoreBreakdown, ScoreDeduction & Report payload
16. completed             → Persisted in DB, ready for client retrieval
```

---

## 4. Entity Relationship Diagram

```
       ┌──────────┐
       │   USER   │
       └────┬─────┘
            │ 1:N
   ┌────────┴────────┐
   │                 │
   ▼                 ▼
┌───────────┐   ┌─────────┐
│  RESUMES  │   │  JOBS   │
└─────┬─────┘   └───┬─────┘
      │ 1:N         │ 1:N
      └──────┬──────┘
             ▼
      ┌──────────────┐
      │   ANALYSIS   │
      └──────┬───────┘
             │ 1:1
 ┌───────────┼───────────┬──────────────┐
 ▼           ▼           ▼              ▼
SCORES   ATS_CHECKS   EVIDENCE   RECOMMENDATIONS
 │
 ▼
REPORT
```
