export const RESUME_SAMPLES = [
  {
    id: "john-doe",
    fileName: "John_Doe_Resume.pdf",
    candidateName: "John Doe",
    role: "Senior Full Stack Engineer",
    pageCount: 2,
    analyzedAt: "analyzed just now",
    overallScore: 82,
    status: "Good",
    statusColor: "emerald",
    scores: {
      atsStructure: { current: 18, max: 20, label: "ATS & Structure" },
      skills: { current: 16, max: 20, label: "Skills" },
      experience: { current: 17, max: 20, label: "Experience" },
      jobMatch: { current: 15, max: 20, label: "Job Match" },
      educationProjects: { current: 9, max: 10, label: "Education & Projects" },
      writingQuality: { current: 7, max: 10, label: "Writing Quality" },
    },
    keyInsights: [
      { type: "positive", text: "Strong technical skills" },
      { type: "positive", text: "Good project experience" },
      { type: "warning", text: "Missing AWS and Docker keywords" },
      { type: "warning", text: "Add measurable results to experience bullets" }
    ],
    detailedFeedback: {
      atsCompliance: {
        score: "90%",
        findings: [
          "Standard single-column format is easily parsed by Taleo, Workday, and Greenhouse.",
          "Font hierarchy and standard section headers are detected accurately.",
          "No complex tables, graphs, or nested multi-columns that break parser crawlers."
        ]
      },
      keywordGaps: {
        found: ["React.js", "Node.js", "TypeScript", "REST APIs", "PostgreSQL", "Tailwind CSS", "Git"],
        missing: ["AWS (EC2/S3/Lambda)", "Docker Containerization", "CI/CD Pipelines", "Kubernetes", "Microservices"]
      },
      bulletRewrites: [
        {
          original: "Worked on frontend user interface and fixed bugs on the customer portal.",
          improved: "Architected responsive React/TypeScript client portal reducing page load latency by 38% and resolving 40+ high-priority bug tickets.",
          impact: "+24% higher recruiter engagement score"
        },
        {
          original: "Responsible for backend database queries and maintaining endpoints.",
          improved: "Optimized Node.js/PostgreSQL query throughput for 120k+ daily transactions, boosting API response time by 45%.",
          impact: "+30% ATS keyword relevance"
        }
      ]
    }
  },
  {
    id: "sarah-jenkins",
    fileName: "Sarah_Jenkins_Product_Lead.pdf",
    candidateName: "Sarah Jenkins",
    role: "Lead Product Manager",
    pageCount: 2,
    analyzedAt: "analyzed 2 mins ago",
    overallScore: 91,
    status: "Excellent",
    statusColor: "emerald",
    scores: {
      atsStructure: { current: 20, max: 20, label: "ATS & Structure" },
      skills: { current: 18, max: 20, label: "Skills" },
      experience: { current: 19, max: 20, label: "Experience" },
      jobMatch: { current: 18, max: 20, label: "Job Match" },
      educationProjects: { current: 9, max: 10, label: "Education & Projects" },
      writingQuality: { current: 9, max: 10, label: "Writing Quality" },
    },
    keyInsights: [
      { type: "positive", text: "Excellent metric-driven bullet points ($M ARR, user growth)" },
      { type: "positive", text: "Exceptional cross-functional leadership narrative" },
      { type: "positive", text: "Top-tier ATS parseability" },
      { type: "warning", text: "Consider adding explicit AI/LLM product discovery terms" }
    ],
    detailedFeedback: {
      atsCompliance: {
        score: "98%",
        findings: [
          "Perfect heading semantics (Experience, Education, Certifications, Skills).",
          "Date formats formatted consistently (MM/YYYY - MM/YYYY).",
          "Contact info and LinkedIn hyperlinked correctly."
        ]
      },
      keywordGaps: {
        found: ["Product Strategy", "Roadmapping", "A/B Testing", "Mixpanel", "Jira", "User Research", "Go-To-Market"],
        missing: ["Generative AI Integration", "SQL Data Extraction", "PLG (Product-Led Growth)"]
      },
      bulletRewrites: [
        {
          original: "Led sprint meetings and prioritized features for mobile app.",
          improved: "Spearheaded 14-engineer agile sprint cadences, shipping 6 core mobile features that accelerated 30-day user retention from 42% to 64%.",
          impact: "+18% clarity score"
        }
      ]
    }
  },
  {
    id: "alex-rivera",
    fileName: "Alex_Rivera_Data_Scientist.docx",
    candidateName: "Alex Rivera",
    role: "Associate Data Scientist",
    pageCount: 1,
    analyzedAt: "analyzed 5 mins ago",
    overallScore: 74,
    status: "Fair",
    statusColor: "amber",
    scores: {
      atsStructure: { current: 15, max: 20, label: "ATS & Structure" },
      skills: { current: 14, max: 20, label: "Skills" },
      experience: { current: 14, max: 20, label: "Experience" },
      jobMatch: { current: 13, max: 20, label: "Job Match" },
      educationProjects: { current: 8, max: 10, label: "Education & Projects" },
      writingQuality: { current: 6, max: 10, label: "Writing Quality" },
    },
    keyInsights: [
      { type: "positive", text: "Strong core Python & Pandas proficiency" },
      { type: "warning", text: "Multi-column layout risks parser truncation" },
      { type: "warning", text: "Missing ML deployment frameworks (FastAPI, Docker)" },
      { type: "warning", text: "Experience bullet points lack business outcome metrics" }
    ],
    detailedFeedback: {
      atsCompliance: {
        score: "75%",
        findings: [
          "Two-column table formatting may cause some ATS engines to merge lines.",
          "Custom icons used instead of text headings.",
          "Recommendation: Switch to clean single-column format."
        ]
      },
      keywordGaps: {
        found: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "SQL", "Jupyter"],
        missing: ["PyTorch / TensorFlow", "MLOps & MLflow", "Docker", "FastAPI Serving", "Cloud Deployment"]
      },
      bulletRewrites: [
        {
          original: "Trained machine learning models on customer churn dataset.",
          improved: "Engineered XGBoost churn prediction pipeline achieving 89.4% ROC-AUC, flagging $420K in at-risk annual recurring revenue.",
          impact: "+35% quantified impact score"
        }
      ]
    }
  }
];
