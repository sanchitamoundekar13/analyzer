import { create } from 'zustand';

// Initial preloaded reports for instant demo capability
const INITIAL_REPORTS = [
  {
    id: "scan-john-doe",
    filename: "John_Doe_Resume.pdf",
    candidate_name: "John Doe",
    analyzed_at: "2 minutes ago",
    page_count: 1,
    overall_score: 86,
    reachable_target: 96,
    potential_gain: 10,
    status: "Very Good",
    status_color: "emerald",
    total_points_lost: 14,
    score_breakdown: {
      ats_compatibility: { score: 20, max: 20, label: "ATS Compatibility", percentage: 100 },
      job_match: { score: 16, max: 20, label: "Job Match", percentage: 80 },
      skills_coverage: { score: 12, max: 15, label: "Skills Coverage", percentage: 80 },
      experience_evidence: { score: 12, max: 15, label: "Experience Evidence", percentage: 80 },
      resume_structure: { score: 10, max: 10, label: "Resume Structure", percentage: 100 },
      writing_quality: { score: 8, max: 10, label: "Writing Quality", percentage: 80 },
      education_projects: { score: 8, max: 10, label: "Education & Projects", percentage: 80 }
    },
    deductions: [
      { dimension: "Job Match", points_lost: 4, reason: "Missing target role keywords: AWS (EC2/S3), Docker container orchestration" },
      { dimension: "Skills Coverage", points_lost: 3, reason: "9 core skills detected out of 14 high-importance job taxonomy terms" },
      { dimension: "Experience Evidence", points_lost: 3, reason: "3 of 6 experience bullets contain measurable metrics (% / $ / scale)" },
      { dimension: "Writing Quality", points_lost: 2, reason: "1 bullet begins with passive phrasing ('Worked on database maintenance')" },
      { dimension: "Education & Projects", points_lost: 2, reason: "Relevant CS coursework or GitHub project repository links omitted" }
    ],
    priority_fixes: [
      "Add relevant missing skills (AWS, Docker) where experienced",
      "Upgrade passive responsibility bullets to Action + Metric + Result format",
      "Include quantifiable numbers, percentages, or cost savings in 3+ bullet points"
    ],
    ats_audit: {
      ats_compatibility_score: 100,
      is_ats_friendly: true,
      passed_checks: [
        "Contact information fully reachable and parsed",
        "Standard ATS section headers detected accurately",
        "Logical chronological section hierarchy",
        "Single-column linear layout (optimal for ATS crawlers)",
        "No nested tables or complex multi-cell grids",
        "No unanchored floating text boxes",
        "Font sizes adhere to readable ATS standards (10pt–12pt body)",
        "Ideal document length (1 page)"
      ],
      warnings: [],
      critical_fixes: [],
      summary: "High ATS parseability with standard formatting"
    },
    job_match: {
      overall_match: 82,
      skills_pct: 84,
      experience_pct: 78,
      keywords_pct: 86,
      semantic_pct: 80
    },
    skills_analysis: {
      matched_skills: ["React", "TypeScript", "JavaScript", "Node.js", "PostgreSQL", "Redis", "REST API", "Tailwind CSS", "Git"],
      missing_skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      related_skills: ["Microservices", "Cloud Architecture"],
      match_percentage: 82,
      resume_skills_total: 9,
      jd_skills_total: 13,
      advisories: [
        { skill: "AWS", advice: "'AWS' appears in the job description but was not found in your resume. Add it only if you have genuine hands-on experience." },
        { skill: "Docker", advice: "'Docker' appears in the job description but was not found in your resume. Add it only if you have genuine hands-on experience." }
      ]
    },
    evidence_vault: [
      { id: "ev-1", claim: "Client Portal Latency Reduction", proof_quote: "Architected React and TypeScript client portal reducing page load latency by 38% for 120,000+ monthly active users.", metric: "38% latency reduction", confidence: "High", verified: true, source: "Extracted from Resume" },
      { id: "ev-2", claim: "High-Throughput Microservice Engineering", proof_quote: "Engineered Node.js and PostgreSQL microservices handling 250k+ daily transactions with 99.98% uptime.", metric: "250k+ transactions, 99.98% uptime", confidence: "High", verified: true, source: "Extracted from Resume" },
      { id: "ev-3", claim: "API Response Optimization", proof_quote: "Reduced API response time by 45% through Redis caching and query optimization.", metric: "45% faster API", confidence: "High", verified: true, source: "Extracted from Resume" }
    ],
    bullet_rewrites: [
      {
        original: "Worked on database maintenance and bug fixes.",
        improved: "Engineered high-throughput Node.js and PostgreSQL REST endpoints serving 100k+ daily transactions with sub-80ms response latency.",
        impact: "+32% ATS keyword relevance",
        action_verb: "Engineered",
        metric_type: "Throughput & Latency",
        evidence_rule: "Uses verified backend database context"
      },
      {
        original: "Worked on frontend user interface and fixed bugs on the customer portal.",
        improved: "Architected responsive React and TypeScript customer portal, reducing page load latency by 38% and resolving 40+ high-priority user tickets.",
        impact: "+28% higher recruiter engagement score",
        action_verb: "Architected",
        metric_type: "Performance & Bug Resolution",
        evidence_rule: "Uses verified candidate portal facts"
      }
    ],
    career_roles: [
      { role: "Frontend Developer", match_pct: 94, matched_skills: ["React", "TypeScript", "Tailwind CSS", "JavaScript"] },
      { role: "Full Stack Engineer", match_pct: 88, matched_skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "REST API"] },
      { role: "Backend Engineer", match_pct: 80, matched_skills: ["Node.js", "PostgreSQL", "Redis", "REST API"] },
      { role: "DevOps & Cloud Engineer", match_pct: 62, matched_skills: ["Git", "Docker"] }
    ],
    target_job_title: "Senior Full Stack Engineer",
    raw_text: `John Doe\njohndoe@email.com | (555) 123-4567 | linkedin.com/in/johndoe | github.com/johndoe\n\nPROFESSIONAL SUMMARY\nSenior Full Stack Engineer with 6+ years of experience building scalable web applications using React, TypeScript, Node.js, and PostgreSQL.\n\nWORK EXPERIENCE\nSenior Software Engineer | Tech Corp | 2021 - Present\n• Architected React and TypeScript client portal reducing page load latency by 38% for 120,000+ monthly active users.\n• Engineered Node.js and PostgreSQL microservices handling 250k+ daily transactions with 99.98% uptime.\n• Worked on database maintenance and bug fixes.\n• Mentored 5 junior engineers on code reviews and automated testing.\n\nSoftware Engineer | StartUp Inc | 2018 - 2021\n• Developed responsive web applications using React, HTML5, CSS3, and REST APIs.\n• Reduced API response time by 45% through Redis caching and query optimization.\n\nTECHNICAL SKILLS\n• Languages & Frameworks: React, TypeScript, JavaScript, Node.js, HTML5, CSS3, Tailwind CSS, Python\n• Databases & Tools: PostgreSQL, Redis, REST API, Git, Docker\n\nEDUCATION\nBachelor of Science in Computer Science | University of California, Berkeley | 2014 - 2018`
  },
  {
    id: "scan-alex-rivera",
    filename: "Alex_Rivera_Data_Scientist.docx",
    candidate_name: "Alex Rivera",
    analyzed_at: "1 hour ago",
    page_count: 1,
    overall_score: 74,
    reachable_target: 87,
    potential_gain: 13,
    status: "Good",
    status_color: "amber",
    total_points_lost: 26,
    score_breakdown: {
      ats_compatibility: { score: 15, max: 20, label: "ATS Compatibility", percentage: 75 },
      job_match: { score: 14, max: 20, label: "Job Match", percentage: 70 },
      skills_coverage: { score: 11, max: 15, label: "Skills Coverage", percentage: 73 },
      experience_evidence: { score: 10, max: 15, label: "Experience Evidence", percentage: 67 },
      resume_structure: { score: 8, max: 10, label: "Resume Structure", percentage: 80 },
      writing_quality: { score: 8, max: 10, label: "Writing Quality", percentage: 80 },
      education_projects: { score: 8, max: 10, label: "Education & Projects", percentage: 80 }
    },
    deductions: [
      { dimension: "ATS Compatibility", points_lost: 5, reason: "2-column layout detected which risks parsing drop-off in legacy ATS crawlers" },
      { dimension: "Job Match", points_lost: 6, reason: "Missing PyTorch, MLOps, and Docker deployment keywords" },
      { dimension: "Experience Evidence", points_lost: 5, reason: "Only 1 of 5 bullets contains business dollar impact or measurable metrics" }
    ],
    priority_fixes: [
      "Convert 2-column layout to single-column format",
      "Add model deployment metrics to experience bullets",
      "Add MLOps & Docker frameworks where experienced"
    ],
    ats_audit: {
      ats_compatibility_score: 75,
      is_ats_friendly: false,
      passed_checks: ["Contact info detected", "Standard degree detected"],
      warnings: ["2-column layout detected", "Embedded table used for skills"],
      critical_fixes: ["Convert multi-column sections to a clean single-column layout"],
      summary: "Requires layout adjustments to prevent ATS parser drop-off"
    },
    job_match: { overall_match: 72, skills_pct: 75, experience_pct: 70, keywords_pct: 74, semantic_pct: 68 },
    skills_analysis: {
      matched_skills: ["Python", "Pandas", "SQL", "Machine Learning", "Git"],
      missing_skills: ["PyTorch", "Docker", "FastAPI", "MLOps"],
      related_skills: ["Data Analysis", "Scikit-Learn"],
      match_percentage: 72,
      resume_skills_total: 5,
      jd_skills_total: 9,
      advisories: [{ skill: "PyTorch", advice: "'PyTorch' appears in the JD. Add it only if you have genuine experience." }]
    },
    evidence_vault: [
      { id: "ev-ar-1", claim: "Customer Churn Model Training", proof_quote: "Engineered XGBoost churn prediction pipeline achieving 89.4% ROC-AUC, flagging $420K in at-risk annual recurring revenue.", metric: "89.4% ROC-AUC, $420K ARR", confidence: "High", verified: true, source: "Extracted from Resume" }
    ],
    bullet_rewrites: [
      {
        original: "Trained machine learning models on customer churn dataset.",
        improved: "Engineered XGBoost churn prediction pipeline achieving 89.4% ROC-AUC, flagging $420K in at-risk annual recurring revenue.",
        impact: "+35% quantified impact score",
        action_verb: "Engineered",
        metric_type: "ROC-AUC & Dollar Impact"
      }
    ],
    career_roles: [
      { role: "Data Scientist", match_pct: 88, matched_skills: ["Python", "Pandas", "SQL", "Machine Learning"] },
      { role: "AI / ML Engineer", match_pct: 76, matched_skills: ["Python", "Machine Learning"] }
    ],
    target_job_title: "Associate Data Scientist"
  }
];

const INITIAL_JOBS = [
  {
    id: "job-google-sde",
    title: "Senior Full Stack Software Engineer",
    company: "Google",
    location: "Mountain View, CA (Hybrid)",
    salary_range: "$185,000 - $245,000",
    match_score: 86,
    required_skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Docker", "REST API", "Microservices"],
    created_at: "Added 1 day ago",
    job_description: `We are looking for a Senior Full Stack Engineer to lead client and platform engineering.\n\nQualifications:\n- 5+ years building scalable web applications with React, TypeScript, and Node.js.\n- Strong expertise with relational databases (PostgreSQL) and caching (Redis).\n- Experience with AWS cloud infrastructure (EC2, S3, Lambda) and containerization with Docker.\n- Proven track record designing REST APIs and distributed microservices.`
  },
  {
    id: "job-microsoft-fe",
    title: "Lead Frontend Engineer",
    company: "Microsoft",
    location: "Redmond, WA / Remote",
    salary_range: "$170,000 - $220,000",
    match_score: 92,
    required_skills: ["React", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "Next.js", "Zustand"],
    created_at: "Added 2 days ago",
    job_description: `Join Microsoft Teams to architect modern, accessible, high-performance web experiences using React and TypeScript.`
  },
  {
    id: "job-stripe-be",
    title: "Backend Platform Engineer",
    company: "Stripe",
    location: "San Francisco, CA",
    salary_range: "$190,000 - $260,000",
    match_score: 79,
    required_skills: ["Python", "FastAPI", "Go", "PostgreSQL", "Kafka", "Docker", "Kubernetes", "AWS"],
    created_at: "Added 3 days ago",
    job_description: `Scale Stripe payment processing rails handling billions in transactions daily with Python, FastAPI, and Kafka.`
  }
];

export const useResumeStore = create((set, get) => ({
  reports: INITIAL_REPORTS,
  activeReportId: "scan-john-doe",
  savedJobs: INITIAL_JOBS,
  activeJobId: "job-google-sde",
  
  userProfile: {
    name: "Bhavin",
    email: "bhavin@resumelens.ai",
    plan: "Pro Tier",
    scoreProgression: [60, 67, 74, 82, 86],
    totalScans: 8,
    applicationsCount: 23,
    avgMatchRate: 81,
    interviewsCount: 5,
    atsStrictness: "Standard Enterprise (Taleo / Workday)"
  },

  builderData: {
    personal_info: {
      fullName: "John Doe",
      email: "johndoe@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
      portfolio: "johndoe.dev",
      jobTitle: "Senior Full Stack Engineer"
    },
    summary: "Senior Full Stack Engineer with 6+ years of experience building scalable web applications using React, TypeScript, Node.js, and PostgreSQL. Passionate about high-performance client architectures and low-latency APIs.",
    experiences: [
      {
        id: "exp-1",
        role: "Senior Software Engineer",
        company: "Tech Corp",
        location: "San Francisco, CA",
        startDate: "03/2021",
        endDate: "Present",
        current: true,
        bullets: [
          "Architected React and TypeScript client portal reducing page load latency by 38% for 120,000+ monthly active users.",
          "Engineered Node.js and PostgreSQL microservices handling 250k+ daily transactions with 99.98% uptime.",
          "Mentored 5 junior engineers in modern TypeScript, clean architecture, and test-driven development practices."
        ]
      },
      {
        id: "exp-2",
        role: "Software Engineer",
        company: "StartUp Inc",
        location: "San Francisco, CA",
        startDate: "06/2018",
        endDate: "02/2021",
        current: false,
        bullets: [
          "Developed responsive web applications using React, HTML5, CSS3, and REST APIs.",
          "Reduced API response time by 45% through Redis caching and query optimization."
        ]
      }
    ],
    education: [
      {
        id: "edu-1",
        degree: "Bachelor of Science",
        field: "Computer Science",
        school: "University of California, Berkeley",
        gradDate: "05/2018",
        gpa: "3.85"
      }
    ],
    skills: ["React", "TypeScript", "JavaScript", "Node.js", "PostgreSQL", "Redis", "REST API", "Tailwind CSS", "Docker", "AWS", "Git"],
    projects: [
      {
        id: "proj-1",
        title: "ResumeLens AI Platform",
        techStack: "React, TypeScript, Python, FastAPI, PostgreSQL",
        description: "Built an ATS optimization platform processing 10k+ resumes with real-time scoring and semantic matching.",
        link: "https://github.com/example/resumelens"
      }
    ]
  },

  // Actions
  addReport: (newReport) => set((state) => ({
    reports: [newReport, ...state.reports],
    activeReportId: newReport.id,
    userProfile: {
      ...state.userProfile,
      totalScans: state.userProfile.totalScans + 1,
      scoreProgression: [...state.userProfile.scoreProgression.slice(-4), newReport.overall_score]
    }
  })),

  getActiveReport: () => {
    const { reports, activeReportId } = get();
    return reports.find(r => r.id === activeReportId) || reports[0];
  },

  setActiveReportId: (id) => set({ activeReportId: id }),

  deleteReport: (id) => set((state) => ({
    reports: state.reports.filter(r => r.id !== id),
    activeReportId: state.activeReportId === id ? (state.reports[1]?.id || null) : state.activeReportId
  })),

  addJob: (job) => set((state) => ({
    savedJobs: [job, ...state.savedJobs],
    activeJobId: job.id
  })),

  deleteJob: (id) => set((state) => ({
    savedJobs: state.savedJobs.filter(j => j.id !== id)
  })),

  setActiveJobId: (id) => set({ activeJobId: id }),

  updateBuilderData: (updater) => set((state) => ({
    builderData: typeof updater === 'function' ? updater(state.builderData) : { ...state.builderData, ...updater }
  })),

  updateUserProfile: (updates) => set((state) => ({
    userProfile: { ...state.userProfile, ...updates }
  }))
}));
