// Comprehensive Skill Taxonomy & Action Verbs Dictionary

export const SKILL_TAXONOMY = {
  programming: [
    'Python', 'JavaScript', 'TypeScript', 'Java', 'C++', 'C#', 'Go', 'Golang',
    'Rust', 'PHP', 'Ruby', 'Swift', 'Kotlin', 'Scala', 'R', 'C', 'Dart', 'Shell', 'Bash'
  ],
  frontend: [
    'React', 'React.js', 'Next.js', 'Vue.js', 'Angular', 'Svelte', 'Tailwind CSS',
    'HTML5', 'CSS3', 'Redux', 'Zustand', 'GraphQL', 'Webpack', 'Vite', 'Bootstrap',
    'Material UI', 'Responsive Design', 'Sass', 'Figma'
  ],
  backend: [
    'Node.js', 'Express.js', 'FastAPI', 'Django', 'Flask', 'Spring Boot', 'NestJS',
    'Ruby on Rails', 'ASP.NET', 'REST APIs', 'gRPC', 'WebSockets', 'Microservices'
  ],
  cloudDevops: [
    'AWS', 'Amazon Web Services', 'Azure', 'GCP', 'Google Cloud', 'Docker',
    'Kubernetes', 'CI/CD', 'GitHub Actions', 'Jenkins', 'Terraform', 'Linux',
    'Nginx', 'Serverless', 'Helm', 'Ansible', 'Cloudflare'
  ],
  databases: [
    'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Elasticsearch', 'SQLite',
    'Oracle', 'DynamoDB', 'Supabase', 'Firebase', 'Cassandra', 'Prisma', 'SQLAlchemy'
  ],
  aiMl: [
    'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'Scikit-Learn',
    'Pandas', 'NumPy', 'NLP', 'Computer Vision', 'LLMs', 'OpenAI API', 'Hugging Face',
    'Data Analysis', 'LangChain', 'RAG', 'Vector Databases'
  ],
  testing: [
    'Jest', 'Cypress', 'Playwright', 'Mocha', 'Chai', 'PyTest', 'JUnit', 'Selenium', 'Postman'
  ],
  toolsMethodologies: [
    'Git', 'GitHub', 'GitLab', 'Agile', 'Scrum', 'Jira', 'Confluence', 'CI/CD Pipelines',
    'TDD', 'System Design', 'Code Review'
  ]
};

// Flattened list for fast lookup
export const ALL_SKILLS = Object.values(SKILL_TAXONOMY).flat();

// Action Verbs categorized by impact type
export const ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Engineered', 'Orchestrated', 'Designed', 'Built',
  'Deployed', 'Optimized', 'Accelerated', 'Automated', 'Revamped', 'Transformed',
  'Constructed', 'Formulated', 'Pioneered', 'Delivered', 'Streamlined', 'Scaled',
  'Implemented', 'Led', 'Managed', 'Developed', 'Executed', 'Authored', 'Enhanced',
  'Reduced', 'Increased', 'Boosted', 'Generated', 'Saved', 'Eliminated', 'Maximized',
  'Collaborated', 'Mentored', 'Diagnosed', 'Resolved', 'Negotiated', 'Directed'
];

// Passive clichés to flag
export const PASSIVE_CLICHES = [
  { phrase: 'worked on', tip: 'Use strong action verbs like "Architected", "Engineered", or "Implemented".' },
  { phrase: 'responsible for', tip: 'Shift focus to what you actually achieved or delivered rather than job duties.' },
  { phrase: 'assisted with', tip: 'State your specific contribution and the final outcome of the project.' },
  { phrase: 'helped in', tip: 'Quantify your contribution and how it impacted the team.' },
  { phrase: 'handled', tip: 'Replace with "Managed", "Resolved", "Executed", or "Orchestrated".' },
  { phrase: 'hard worker', tip: 'Remove self-descriptors and demonstrate dedication through quantifiable results.' },
  { phrase: 'team player', tip: 'Demonstrate collaboration through cross-functional project examples instead of claims.' }
];

// Common Sections Header Recognition
export const SECTION_KEYWORDS = {
  contact: ['contact', 'personal info', 'information', 'profile', 'header'],
  summary: ['summary', 'professional summary', 'executive summary', 'about me', 'objective'],
  experience: ['experience', 'work experience', 'employment history', 'professional experience', 'career history', 'work history'],
  education: ['education', 'academic background', 'academic history', 'qualifications', 'degrees'],
  skills: ['skills', 'technical skills', 'core competencies', 'technologies', 'expertise', 'tools & technologies'],
  projects: ['projects', 'personal projects', 'key projects', 'open source', 'portfolio'],
  certifications: ['certifications', 'licenses', 'certificates', 'accreditations', 'credentials'],
  achievements: ['achievements', 'awards', 'honors', 'publications', 'accomplishments']
};
