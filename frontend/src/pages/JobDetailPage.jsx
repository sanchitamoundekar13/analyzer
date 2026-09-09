import React from 'react';
import { 
  ArrowLeft, 
  Building, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Mail, 
  Wrench, 
  Briefcase 
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { JDMatcher4Bar } from '../components/matcher/JDMatcher4Bar.jsx';
import { useResumeStore } from '../store/useResumeStore.js';

export function JobDetailPage({ jobId, onNavigate }) {
  const { savedJobs, reports } = useResumeStore();
  const activeReport = reports[0];
  const job = savedJobs.find(j => j.id === jobId) || savedJobs[0];

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <h2 className="text-xl font-bold">Job Not Found</h2>
        <Button variant="primary" className="mt-4" onClick={() => onNavigate('/jobs')}>
          Back to Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowLeft}
              onClick={() => onNavigate('/jobs')}
            >
              All Jobs
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {job.title}
                </h1>
                <Badge variant="blue" size="sm">{job.company}</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-3">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                {job.salary_range && <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" /> {job.salary_range}</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={Mail}
              onClick={() => onNavigate('/cover-letter')}
            >
              Generate Cover Letter
            </Button>
            <Button
              variant="glow"
              size="sm"
              icon={Wrench}
              onClick={() => onNavigate('/resume-builder')}
            >
              Tailor in Resume Builder
            </Button>
          </div>
        </div>

        {/* 4-Bar Match Breakdown */}
        {activeReport && (
          <JDMatcher4Bar
            jobMatch={activeReport.job_match}
            skillsAnalysis={activeReport.skills_analysis}
            targetRole={`${job.title} at ${job.company}`}
          />
        )}

        {/* Two Columns: Job Description vs Tailoring Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Job Description */}
          <div className="lg:col-span-6 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm sm:text-base">Job Description & Requirements</CardTitle>
                <CardDescription>Official job posting text extracted for analysis.</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed font-sans bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  {job.job_description}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Tailoring Recommendations */}
          <div className="lg:col-span-6 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <CardTitle className="text-sm sm:text-base">Tailoring Action Items for {job.company}</CardTitle>
                </div>
                <CardDescription>
                  Custom suggestions to increase ATS keyword density and recruiter relevance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs space-y-1">
                  <h4 className="font-bold text-blue-900 dark:text-blue-200">1. Emphasize AWS Cloud Services</h4>
                  <p className="text-blue-950 dark:text-blue-300">
                    This role highlights EC2, S3, and Lambda. If you have deployed servers or storage on AWS, list them in your technical skills section.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900 text-xs space-y-1">
                  <h4 className="font-bold text-indigo-900 dark:text-indigo-200">2. Highlight Docker Containerization</h4>
                  <p className="text-indigo-950 dark:text-indigo-300">
                    Add a bullet describing how you built Docker images or automated local dev setups.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs space-y-1">
                  <h4 className="font-bold text-emerald-900 dark:text-emerald-200">3. Match Microservice Latency</h4>
                  <p className="text-emerald-950 dark:text-emerald-300">
                    Your resume already mentions sub-80ms API response latency, which matches {job.company}'s high-throughput requirements!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
