import React from 'react';
import { 
  TrendingUp, 
  FileText, 
  Briefcase, 
  Award, 
  Calendar, 
  ArrowRight, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Upload, 
  Trash2, 
  ExternalLink 
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { useResumeStore } from '../store/useResumeStore.js';

export function DashboardPage({ onNavigate }) {
  const { reports, savedJobs, userProfile, deleteReport } = useResumeStore();

  const latestReport = reports[0];
  const scoreProgression = userProfile?.scoreProgression || [60, 67, 74, 82, 86];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Good day, {userProfile?.name || "Candidate"}! 👋
              </h1>
              <Badge variant="emerald" size="sm">{userProfile?.plan || "Pro Tier"}</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Your resume optimization dashboard. Track your ATS scores, job matches, and application pipeline.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={FileText}
              onClick={() => onNavigate('/resume-builder')}
            >
              Resume Builder
            </Button>
            <Button
              variant="glow"
              size="sm"
              icon={Upload}
              onClick={() => onNavigate('/analyze')}
            >
              Scan New Resume
            </Button>
          </div>
        </div>

        {/* 4 Core KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Metric 1: Overall Score */}
          <Card className="hover:border-blue-300 dark:hover:border-blue-700 transition-all">
            <CardContent className="p-5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Latest Resume Score</span>
                <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  <Award className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {latestReport?.overall_score || 86}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +8 pts
                </span>
              </div>
              <p className="text-[11px] text-slate-500">Target potential: {latestReport?.reachable_target || 96}/100</p>
            </CardContent>
          </Card>

          {/* Metric 2: Applications */}
          <Card className="hover:border-blue-300 dark:hover:border-blue-700 transition-all">
            <CardContent className="p-5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Applications Tracked</span>
                <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <Briefcase className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {userProfile?.applicationsCount || 23}
                </span>
                <span className="text-xs font-semibold text-slate-400">Active</span>
              </div>
              <p className="text-[11px] text-slate-500">6 submitted this week</p>
            </CardContent>
          </Card>

          {/* Metric 3: Avg Job Match */}
          <Card className="hover:border-blue-300 dark:hover:border-blue-700 transition-all">
            <CardContent className="p-5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Avg Job Match Rate</span>
                <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {userProfile?.avgMatchRate || 81}%
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Top 15%</span>
              </div>
              <p className="text-[11px] text-slate-500">Across {savedJobs.length} target job postings</p>
            </CardContent>
          </Card>

          {/* Metric 4: Interviews */}
          <Card className="hover:border-blue-300 dark:hover:border-blue-700 transition-all">
            <CardContent className="p-5 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Interviews Scheduled</span>
                <span className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                  <Calendar className="w-4 h-4" />
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 dark:text-white">
                  {userProfile?.interviewsCount || 5}
                </span>
                <span className="text-xs font-semibold text-purple-600 dark:text-purple-400">2 upcoming</span>
              </div>
              <p className="text-[11px] text-slate-500">21.7% conversion rate</p>
            </CardContent>
          </Card>

        </div>

        {/* Score Progression Graph Card */}
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle>Resume Score Progression Over Time</CardTitle>
                <CardDescription>
                  Tracking how iterative bullet rewrites and ATS adjustments boosted your candidate readiness.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                {scoreProgression.map((val, idx) => (
                  <span
                    key={idx}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                      idx === scoreProgression.length - 1
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    V{idx + 1}: {val}
                  </span>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-32 flex items-end justify-between gap-4 sm:gap-8 px-4 pb-2 border-b border-slate-100 dark:border-slate-800">
              {scoreProgression.map((score, idx) => {
                const heightPct = (score / 100) * 100;
                const isLatest = idx === scoreProgression.length - 1;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <span className="text-xs font-black text-slate-800 dark:text-slate-200 group-hover:scale-110 transition-transform">
                      {score}
                    </span>
                    <div
                      className={`w-full max-w-[48px] rounded-t-xl transition-all duration-700 ${
                        isLatest
                          ? 'bg-gradient-to-t from-blue-600 to-indigo-500 shadow-md shadow-blue-500/20'
                          : 'bg-slate-200 dark:bg-slate-700 group-hover:bg-slate-300 dark:group-hover:bg-slate-600'
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="text-[11px] font-semibold text-slate-400">Scan {idx + 1}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Two Columns: Recent Scans & Target Job Matches */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Recent Analyses */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Analyses</h3>
              <button
                onClick={() => onNavigate('/resume')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                View All in Vault ({reports.length})
              </button>
            </div>

            <div className="space-y-3">
              {reports.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{r.candidate_name || r.filename}</h4>
                      <p className="text-xs text-slate-500">{r.filename} • {r.analyzed_at}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className="text-lg font-black text-slate-900 dark:text-white">{r.overall_score}</span>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">/ 100 pts</span>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onNavigate(`/report/${r.id}`)}
                    >
                      Report
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Target Job Matches */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Target Job Matches</h3>
              <button
                onClick={() => onNavigate('/jobs')}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Job Board ({savedJobs.length})
              </button>
            </div>

            <div className="space-y-3">
              {savedJobs.map((j) => (
                <div
                  key={j.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{j.title}</h4>
                      <p className="text-xs font-medium text-slate-500">{j.company} • {j.location}</p>
                    </div>
                    <span className="text-sm font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-800">
                      {j.match_score}% Match
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1 text-[10px] text-slate-600 dark:text-slate-400">
                    {j.required_skills.slice(0, 4).map((sk, i) => (
                      <span key={i} className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {sk}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onNavigate(`/jobs/${j.id}`)}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      Tailor Resume for Role <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
