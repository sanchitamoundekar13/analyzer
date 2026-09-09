# APPLICATION FLOW SPECIFICATION
# ResumeLens — Complete Application Flow

**Document Version:** 1.0  
**Product:** ResumeLens  
**Document Type:** UX & Technical Application Flow Architecture  
**Core Product Loop:** $\textbf{Analyze} \longrightarrow \textbf{Understand} \longrightarrow \textbf{Fix} \longrightarrow \textbf{Re-analyze} \longrightarrow \textbf{Improve}$

---

## 1. Overall Application Flow

```text
                    ┌──────────────────┐
                    │   Landing Page   │
                    └────────┬─────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
                  ▼                     ▼
             Get Started            Sign In
                  │                     │
                  └──────────┬──────────┘
                             ▼
                       User Dashboard
                             │
                             ▼
                    Start New Analysis
                             │
                             ▼
                  Upload Resume (PDF/DOCX)
                             │
                             ▼
                    Resume Validation
                             │
                             ▼
                 Resume Processing Screen
                             │
              ┌──────────────┴──────────────┐
              │                             │
              ▼                             ▼
       Without Job Description       With Job Description
              │                             │
              │                             ▼
              │                    JD Analysis
              │                             │
              └──────────────┬──────────────┘
                             ▼
                     Analysis Engine
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
             ATS            NLP            ML
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                    Deterministic Scoring
                             │
                             ▼
                       Evidence Engine
                             │
                             ▼
                         LLM Layer
                             │
                             ▼
                       Final Report
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
          Understand       Fix Resume     Download
              │              │
              └──────┬───────┘
                     ▼
              Upload New Version
                     │
                     ▼
              Compare Versions
                     │
                     ▼
                Score Improved
```

---

## 2. Landing Page Flow

### Screen: Landing Page
- **Main CTA**: `Analyze My Resume`
- **Secondary CTA**: `See How It Works`

### Sections:
1. **Hero**: Headline, value proposition, and instant upload launcher.
2. **How ResumeLens Works**: 3-step breakdown (Upload $\to$ Diagnostic Scan $\to$ Actionable Fixes).
3. **Sample Resume Analysis**: Live interactive demo with Senior Full Stack Engineer profile.
4. **ATS Diagnostics**: Visual indicator of layout compatibility and parsing risks.
5. **Job Match**: 4-bar alignment preview (Skills, Experience, Keywords, Semantic Relevance).
6. **Evidence-Based Scoring**: 7-dimension breakdown totaling 100 points.
7. **Before vs After**: Version diff progression ($+14$ points).
8. **Pricing**: Free, Pro (₹199 / $14), Accelerator (₹399 / $39).
9. **FAQ & Security Guarantees**: Zero model training on PII, encrypted sandbox.
10. **Final CTA**: Launch scanner.

---

## 3. Authentication & Onboarding Flow

### 3.1 Authentication
- **New User**: `Sign Up` $\to$ Name, Email, Password $\to$ Welcome Screen $\to$ Dashboard
- **Existing User**: `Login` $\to$ Dashboard
- **Guest Access**: `Continue as Guest` allows instant scan without friction.

### 3.2 Onboarding Modal / Step
1. *"What are you trying to achieve?"* (Internship, First Job, Campus Placement, Job Switch, Freelancing)
2. *"What role are you targeting?"* (Software Developer, Frontend, Backend, Data Scientist, AI/ML, PM)
3. Direct route to resume upload.

---

## 4. Dashboard Flow

### Layout:
```text
┌──────────────────────────────────────────────┐
│ ResumeLens                     Profile       │
├────────────┬─────────────────────────────────┤
│            │                                 │
│ Dashboard  │  Welcome back, Bhavin           │
│            │                                 │
│ Analyze    │  Latest Resume                  │
│            │  ┌───────────────────────────┐  │
│ Resumes    │  │ Score: 86/100             │  │
│            │  │ +8 from previous version  │  │
│ Jobs       │  └───────────────────────────┘  │
│            │                                 │
│ Compare    │  Recent Analyses                │
│            │                                 │
│ Settings   │  Resume V3     86               │
│            │  Resume V2     76               │
│            │  Resume V1     71               │
│            │                                 │
└────────────┴─────────────────────────────────┘
```
- **Primary CTA**: `+ New Analysis`

---

## 5. New Analysis & Validation Flow

### Step 1: Upload
- Drag & Drop zone supporting `.pdf`, `.docx`, `.doc`, `.txt`
- Client & Backend validation:
  - File format & extension check
  - File size threshold ($< 10\text{MB}$)
  - Text density check (triggers OCR if scanned)
  - Password protection / corruption detection

### Step 2: Target Job Description Choice
- **Option A**: `[ Yes, I have a Job Description ]` $\rightarrow$ Paste JD text, specify Company & Role Title.
- **Option B**: `[ No, analyze my resume generally ]` $\rightarrow$ General resume health diagnostic.

---

## 6. Real-Time Processing Screen

```text
               Analyzing your resume
  ✓ Reading document stream & verifying ATS format
  ✓ Extracting experience timelines & contact headers
  ✓ Matching skills against normalized taxonomy
  ✓ Running semantic embedding comparison against JD
  ● Calculating deterministic 7-dimension score
  ○ Generating non-hallucinatory STAR recommendations
```
*Gives a professional, technical diagnostic feel rather than generic "AI magic" animations.*

---

## 7. Interactive Report Flow

### 7.1 Report Overview
- **Overall Score**: e.g., `86 / 100 (Very Good)`
- **Target Reachable Projection**: `Can reach 96 / 100 (+10 pts)`
- **7-Dimension Progress**:
  - ATS Compatibility: `20 / 20`
  - Job Match: `16 / 20`
  - Skills Coverage: `12 / 15`
  - Experience Evidence: `12 / 15`
  - Resume Structure: `10 / 10`
  - Writing Quality: `8 / 10`
  - Education & Projects: `8 / 10`

### 7.2 "Why Did I Lose Points?" Breakdown
- **Itemized Deductions**:
  - `-4 Job Match`: Missing target role keywords (AWS, Docker)
  - `-3 Skills Coverage`: 9 skills detected out of 14 core taxonomy terms
  - `-3 Experience Evidence`: 3 of 6 bullets contain quantifiable metrics
  - `-2 Writing Quality`: 1 bullet begins with passive phrasing
  - `-2 Education & Projects`: Relevant coursework missing

### 7.3 Priority Fixes & "Fix My Resume" Workspace
- Sequential checklist with estimated score impact:
  1. `Add relevant missing skills (AWS, Docker) where experienced` $\rightarrow$ **High Impact**
  2. `Upgrade passive responsibility bullets to STAR format` $\rightarrow$ **High Impact**
  3. `Include quantifiable numbers or scale in 3+ bullet points` $\rightarrow$ **Medium Impact**
- **Action**: Clicking **Fix My Resume** opens the ATS Resume Builder with pre-loaded data.

---

## 8. Deep Inspection Views

### 8.1 Real ATS Compatibility Audit
- **Score**: e.g., `92% ATS Compatible`
- **Passed Checks**: Single-column linear layout, standard headings, clear contact reachability, readable font sizes ($\ge 9\text{pt}$).
- **Warnings & Penalties**: 2-column layout risks, embedded table penalties, unanchored text boxes, social icons used instead of text URLs.

### 8.2 Job Description Matcher (4-Bar Breakdown)
- **Skills Match**: `84%`
- **Experience Alignment**: `78%`
- **Keyword Overlap**: `86%`
- **Semantic Relevance**: `80%`
- **Pills**: Matched Skills (✓), Missing Skills (⚠), and **Honest Candidate Advisory** (*"Docker appears in JD. Add only if you have genuine experience"*).

### 8.3 Evidence Vault
- Extracted claims paired with proof quotes from the resume.
- Enforces zero-hallucination constraint on all AI rewrite suggestions.

### 8.4 Visual Resume Scanner Layout Simulator
- Interactive document preview with 4 color-coded highlighter states:
  - 🔴 **ATS Problem**
  - 🟡 **Weak Bullet**
  - 🔵 **Missing Skill**
  - 🟢 **Verified Evidence**

---

## 9. Version Comparison & Continuous Improvement Loop

```text
               V2 (Baseline)       V3 (Optimized)
Overall Score       76                  86        (+10 pts)
ATS                 16                  20        (+4 pts)
Job Match           14                  16        (+2 pts)
Skills              11                  12        (+1 pts)
Experience          10                  12        (+2 pts)
```

### Improvements Summary:
- Added 4 relevant technical skills
- Converted 2-column layout to single-column ATS standard
- Rewrote 3 bullets with measurable outcome metrics ($38\%$ latency reduction)

---

## 10. The Core Product UX Principle

```text
           ┌──────────────┐
           │    ANALYZE   │
           └──────┬───────┘
                  ↓
           ┌──────────────┐
           │  UNDERSTAND  │
           └──────┬───────┘
                  ↓
           ┌──────────────┐
           │     FIX      │
           └──────┬───────┘
                  ↓
           ┌──────────────┐
           │  RE-ANALYZE  │
           └──────┬───────┘
                  ↓
           ┌──────────────┐
           │   IMPROVE    │
           └──────┬───────┘
                  │
                  └──────────→ ANALYZE
```

> **Key UX Principle**: The user must never finish an analysis wondering what to do next.  
> Every report ends with: *"Here are the 3 prioritized fixes to increase your score."*
