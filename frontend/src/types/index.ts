export interface ScoreDimension {
  score: number;
  max: number;
  label: string;
  percentage: number;
}

export interface ScoreBreakdown {
  ats_compatibility: ScoreDimension;
  job_match: ScoreDimension;
  skills_coverage: ScoreDimension;
  experience_evidence: ScoreDimension;
  resume_structure: ScoreDimension;
  writing_quality: ScoreDimension;
  education_projects: ScoreDimension;
}

export interface Deduction {
  dimension: string;
  points_lost: number;
  reason: string;
}

export interface ATSAudit {
  ats_compatibility_score: number;
  is_ats_friendly: boolean;
  passed_checks: string[];
  warnings: string[];
  critical_fixes: string[];
  summary: string;
}

export interface JobMatchAnalytics {
  overall_match: number;
  skills_pct: number;
  experience_pct: number;
  keywords_pct: number;
  semantic_pct: number;
}

export interface SkillAdvisory {
  skill: string;
  advice: string;
}

export interface SkillsAnalysis {
  matched_skills: string[];
  missing_skills: string[];
  related_skills: string[];
  match_percentage: number;
  resume_skills_total: number;
  jd_skills_total: number;
  advisories: SkillAdvisory[];
}

export interface EvidenceVaultItem {
  id: string;
  claim: string;
  proof_quote: string;
  metric: string;
  confidence: "High" | "Medium" | "Verified by Candidate";
  verified: boolean;
  source: string;
}

export interface BulletRewrite {
  original: string;
  improved: string;
  impact: string;
  action_verb?: string;
  metric_type?: string;
  evidence_rule?: string;
}

export interface CareerRoleMatch {
  role: string;
  match_pct: number;
  matched_skills: string[];
}

export interface AnalysisReport {
  id: string;
  filename: string;
  candidate_name: string;
  analyzed_at: string;
  page_count: number;
  overall_score: number;
  reachable_target: number;
  potential_gain: number;
  status: string;
  status_color: "emerald" | "blue" | "amber" | "rose";
  total_points_lost: number;
  score_breakdown: ScoreBreakdown;
  deductions: Deduction[];
  priority_fixes: string[];
  ats_audit: ATSAudit;
  job_match: JobMatchAnalytics;
  skills_analysis: SkillsAnalysis;
  evidence_vault: EvidenceVaultItem[];
  bullet_rewrites: BulletRewrite[];
  career_roles: CareerRoleMatch[];
  raw_text?: string;
  target_job_title?: string;
}

export interface TargetJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_range?: string;
  job_description: string;
  required_skills: string[];
  match_score: number;
  created_at: string;
}

export interface ResumeBuilderData {
  personal_info: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    portfolio: string;
    jobTitle: string;
  };
  summary: string;
  experiences: Array<{
    id: string;
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    bullets: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    field: string;
    school: string;
    gradDate: string;
    gpa?: string;
  }>;
  skills: string[];
  projects: Array<{
    id: string;
    title: string;
    techStack: string;
    description: string;
    link?: string;
  }>;
}
