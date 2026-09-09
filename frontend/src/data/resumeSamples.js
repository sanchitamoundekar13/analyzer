export const RESUME_SAMPLES = [
  {
    id: "john-doe",
    fileName: "John_Doe_Resume.pdf",
    candidateName: "John Doe",
    role: "Senior Full Stack Engineer",
    pageCount: 1,
    analyzedAt: "analyzed just now",
    overallScore: 86,
    grade: "Very Good",
    status: "Very Good",
    statusColor: "emerald",
    reachableTarget: 96,
    potentialGain: 10,
    dimensions: {
      ats_compatibility: { score: 20, max: 20, label: "ATS Compatibility", percentage: 100 },
      job_match: { score: 16, max: 20, label: "Job Match", percentage: 80 },
      skills_coverage: { score: 12, max: 15, label: "Skills Coverage", percentage: 80 },
      experience_evidence: { score: 12, max: 15, label: "Experience Evidence", percentage: 80 },
      resume_structure: { score: 10, max: 10, label: "Resume Structure", percentage: 100 },
      writing_quality: { score: 8, max: 10, label: "Writing Quality", percentage: 80 },
      education_projects: { score: 8, max: 10, label: "Education & Projects", percentage: 80 },
    },
    scores: {
      ats: { current: 20, max: 20, label: "ATS Compatibility" },
      jobMatch: { current: 16, max: 20, label: "Job Match" },
      skills: { current: 12, max: 15, label: "Skills Coverage" },
      experience: { current: 12, max: 15, label: "Experience Evidence" },
      structure: { current: 10, max: 10, label: "Resume Structure" },
      writing: { current: 8, max: 10, label: "Writing Quality" },
      education: { current: 8, max: 10, label: "Education & Projects" },
    },
    deductions: [
      {
        dimension: "Job Match",
        pointsLost: 4,
        reason: "Missing target role keywords: AWS, Kubernetes",
        fix: "Add relevant missing skills if you possess hands-on project experience."
      },
      {
        dimension: "Skills Coverage",
        pointsLost: 3,
        reason: "Only 9 core technical skills detected from role taxonomy",
        fix: "Expand technical skills section with tools, databases, and frameworks."
      },
      {
        dimension: "Experience Evidence",
        pointsLost: 3,
        reason: "3 of 6 experience bullets contain measurable metrics (% / $ / numbers)",
        fix: "Include quantifiable numbers, percentages, or latency reductions in 3+ bullets."
      },
      {
        dimension: "Writing Quality",
        pointsLost: 2,
        reason: "1 bullet points begin with passive phrasing ('worked on', 'assisted')",
        fix: "Upgrade passive responsibility bullets to Action + Metric + Result format."
      },
      {
        dimension: "Education & Projects",
        pointsLost: 2,
        reason: "Degree graduation year or project repository metrics missing",
        fix: "Ensure university degree, graduation year, and GitHub project stats are highlighted."
      }
    ],
    atsAnalysis: {
      score: 100,
      isATSFriendly: true,
      passedChecks: [
        "Contact info (Email, Phone, LinkedIn) fully reachable and parsed",
        "Single-column linear layout (optimal for Taleo, Workday, iCIMS)",
        "Standard chronological employment dates detected",
        "No unparseable embedded tables or floating text boxes",
        "Font metrics adhere to readable standard (10pt–12pt body)",
        "Ideal document length (1 page)"
      ],
      warnings: [],
      summary: "High ATS parseability with standard single-column formatting"
    },
    jdMatcher: {
      overallMatch: 82,
      skillsMatchPct: 82,
      experienceMatchPct: 85,
      keywordOverlapPct: 70,
      semanticRelevancePct: 95,
      matchedSkills: ["Docker", "JavaScript", "Microservices", "Node.js", "PostgreSQL", "REST API", "React", "Redis", "TypeScript"],
      missingSkills: ["AWS", "Kubernetes"],
      advisories: [
        { skill: "AWS", advice: "'AWS' appears in the job description but was not found in your resume. Add it only if you have genuine hands-on experience." },
        { skill: "Kubernetes", advice: "'Kubernetes' appears in the job description but was not found in your resume. Add it only if you have genuine hands-on experience." }
      ]
    },
    evidenceVault: [
      {
        id: "ev-1",
        claim: "Architected React and TypeScript client portal reducing...",
        proofQuote: "Architected React and TypeScript client portal reducing page load latency by 38% for 120,000+ monthly active users.",
        metric: "38%",
        confidence: "High",
        verified: true,
        source: "Extracted from Resume"
      },
      {
        id: "ev-2",
        claim: "Engineered Node.js and PostgreSQL microservices handling 250k+...",
        proofQuote: "Engineered Node.js and PostgreSQL microservices handling 250k+ daily transactions with 99.98% uptime.",
        metric: "99.98%",
        confidence: "High",
        verified: true,
        source: "Extracted from Resume"
      },
      {
        id: "ev-3",
        claim: "Reduced API response time by 45% through...",
        proofQuote: "Reduced API response time by 45% through Redis caching and query optimization.",
        metric: "45%",
        confidence: "High",
        verified: true,
        source: "Extracted from Resume"
      }
    ],
    bulletRewrites: [
      {
        original: "Worked on database maintenance and bug fixes.",
        improved: "Architected responsive React/TypeScript client portal reducing page load latency by 38% and resolving 40+ high-priority bug tickets.",
        impact: "+28% higher recruiter engagement score",
        actionVerb: "Architected",
        metricType: "Performance & Bug Resolution"
      }
    ]
  },
  {
    id: "sarah-jenkins",
    fileName: "Sarah_Jenkins_Product_Lead.pdf",
    candidateName: "Sarah Jenkins",
    role: "Lead Product Manager",
    pageCount: 2,
    analyzedAt: "analyzed 2 mins ago",
    overallScore: 92,
    grade: "Excellent",
    status: "Excellent",
    statusColor: "emerald",
    reachableTarget: 98,
    potentialGain: 6,
    dimensions: {
      ats_compatibility: { score: 20, max: 20, label: "ATS Compatibility", percentage: 100 },
      job_match: { score: 18, max: 20, label: "Job Match", percentage: 90 },
      skills_coverage: { score: 14, max: 15, label: "Skills Coverage", percentage: 93 },
      experience_evidence: { score: 14, max: 15, label: "Experience Evidence", percentage: 93 },
      resume_structure: { score: 10, max: 10, label: "Resume Structure", percentage: 100 },
      writing_quality: { score: 9, max: 10, label: "Writing Quality", percentage: 90 },
      education_projects: { score: 7, max: 10, label: "Education & Projects", percentage: 70 },
    },
    scores: {
      ats: { current: 20, max: 20, label: "ATS Compatibility" },
      jobMatch: { current: 18, max: 20, label: "Job Match" },
      skills: { current: 14, max: 15, label: "Skills Coverage" },
      experience: { current: 14, max: 15, label: "Experience Evidence" },
      structure: { current: 10, max: 10, label: "Resume Structure" },
      writing: { current: 9, max: 10, label: "Writing Quality" },
      education: { current: 7, max: 10, label: "Education & Projects" },
    },
    deductions: [
      {
        dimension: "Job Match",
        pointsLost: 2,
        reason: "Missing AI/LLM product discovery terms from modern PM criteria",
        fix: "Add Generative AI / PLG product strategies where applicable."
      },
      {
        dimension: "Education & Projects",
        pointsLost: 3,
        reason: "Certifications and continuing education details brief",
        fix: "Add relevant certifications (e.g. Pragmatic Institute, Scrum Alliance)."
      }
    ],
    atsAnalysis: {
      score: 100,
      isATSFriendly: true,
      passedChecks: [
        "Perfect heading semantics (Experience, Education, Certifications, Skills)",
        "Date formats formatted consistently (MM/YYYY - MM/YYYY)",
        "Contact info and LinkedIn hyperlinked correctly"
      ],
      warnings: [],
      summary: "Flawless ATS parseability across all enterprise ATS parsers"
    },
    jdMatcher: {
      overallMatch: 90,
      skillsMatchPct: 92,
      experienceMatchPct: 94,
      keywordOverlapPct: 86,
      semanticRelevancePct: 92,
      matchedSkills: ["Product Strategy", "Roadmapping", "A/B Testing", "Mixpanel", "Jira", "User Research", "Go-To-Market"],
      missingSkills: ["Generative AI Integration", "SQL Data Extraction"],
      advisories: [
        { skill: "Generative AI Integration", advice: "Add only if you have directed AI product initiatives." }
      ]
    },
    evidenceVault: [
      {
        id: "ev-1",
        claim: "Spearheaded 14-engineer agile sprint cadences, shipping 6 core mobile features...",
        proofQuote: "Spearheaded 14-engineer agile sprint cadences, shipping 6 core mobile features that accelerated 30-day user retention from 42% to 64%.",
        metric: "42% to 64%",
        confidence: "High",
        verified: true,
        source: "Extracted from Resume"
      }
    ],
    bulletRewrites: [
      {
        original: "Led sprint meetings and prioritized features for mobile app.",
        improved: "Spearheaded 14-engineer agile sprint cadences, shipping 6 core mobile features that accelerated 30-day user retention from 42% to 64%.",
        impact: "+18% clarity score",
        actionVerb: "Spearheaded",
        metricType: "Retention & User Growth"
      }
    ]
  }
];
