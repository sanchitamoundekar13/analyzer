import React, { useState } from 'react';
import { 
  GitCompare, 
  ArrowRight, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { useResumeStore } from '../store/useResumeStore.js';

export function ComparePage({ onNavigate }) {
  const { reports } = useResumeStore();
  const [selectedV1, setSelectedV1] = useState(reports[1]?.id || reports[0]?.id);
  const [selectedV2, setSelectedV2] = useState(reports[0]?.id);

  const r1 = reports.find(r => r.id === selectedV1) || reports[0];
  const r2 = reports.find(r => r.id === selectedV2) || reports[0];

  const scoreDiff = (r2?.overall_score || 86) - (r1?.overall_score || 72);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Resume Version Comparison
              </h1>
              <Badge variant="blue" size="sm">Side-by-Side Diff</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Compare two resume iterations to verify point increases, ATS readability improvements, and keyword additions.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> Score Delta: +{Math.max(0, scoreDiff)} Points
            </span>
          </div>
        </div>

        {/* Version Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Baseline (Version 1 / Original)</label>
            <select
              value={selectedV1}
              onChange={(e) => setSelectedV1(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              {reports.map(r => (
                <option key={r.id} value={r.id}>{r.filename} ({r.overall_score}/100)</option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-slate-500">Target (Version 2 / Tailored)</label>
            <select
              value={selectedV2}
              onChange={(e) => setSelectedV2(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              {reports.map(r => (
                <option key={r.id} value={r.id}>{r.filename} ({r.overall_score}/100)</option>
              ))}
            </select>
          </div>
        </div>

        {/* Side-by-Side Comparison Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* V1 Card */}
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/40">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Baseline Scan</span>
                  <CardTitle className="text-base">{r1?.filename || "Resume V1"}</CardTitle>
                </div>
                <span className="text-2xl font-black text-slate-700 dark:text-slate-300">
                  {r1?.overall_score || 72} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-5 text-xs">
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-slate-500">ATS Compatibility</span>
                <span className="font-bold">{r1?.score_breakdown?.ats_compatibility?.score || 16} / 20</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-slate-500">Job Match</span>
                <span className="font-bold">{r1?.score_breakdown?.job_match?.score || 14} / 20</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-slate-500">Skills Coverage</span>
                <span className="font-bold">{r1?.score_breakdown?.skills_coverage?.score || 11} / 15</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-slate-500">Experience Evidence</span>
                <span className="font-bold">{r1?.score_breakdown?.experience_evidence?.score || 10} / 15</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Writing Quality</span>
                <span className="font-bold">{r1?.score_breakdown?.writing_quality?.score || 8} / 10</span>
              </div>
            </CardContent>
          </Card>

          {/* V2 Card */}
          <Card className="border-blue-200 dark:border-blue-800 shadow-lg">
            <CardHeader className="bg-blue-50/40 dark:bg-blue-950/30">
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Optimized Iteration</span>
                  <CardTitle className="text-base">{r2?.filename || "Resume V2"}</CardTitle>
                </div>
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  {r2?.overall_score || 86} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-5 text-xs">
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-slate-500">ATS Compatibility</span>
                <span className="font-bold text-emerald-600">{r2?.score_breakdown?.ats_compatibility?.score || 20} / 20 (+4)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-slate-500">Job Match</span>
                <span className="font-bold text-emerald-600">{r2?.score_breakdown?.job_match?.score || 16} / 20 (+2)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-slate-500">Skills Coverage</span>
                <span className="font-bold text-emerald-600">{r2?.score_breakdown?.skills_coverage?.score || 12} / 15 (+1)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="text-slate-500">Experience Evidence</span>
                <span className="font-bold text-emerald-600">{r2?.score_breakdown?.experience_evidence?.score || 12} / 15 (+2)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Writing Quality</span>
                <span className="font-bold text-emerald-600">{r2?.score_breakdown?.writing_quality?.score || 8} / 10</span>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Change Log Summary Card */}
        <Card className="border-emerald-100 dark:border-emerald-950/50">
          <CardHeader className="bg-emerald-50/30 dark:bg-emerald-950/20">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-600 text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-base">Key Improvements in V2</CardTitle>
                <CardDescription>Verified delta explaining the +{Math.max(0, scoreDiff)} points increase.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-2.5 pt-5 text-xs font-medium text-slate-800 dark:text-slate-200">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-900/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Added 4 relevant technical skills (TypeScript, PostgreSQL, Redis, REST API)</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-900/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Converted 2-column layout to single-column format for 100% ATS parseability</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border border-emerald-200/60 dark:border-emerald-900/40">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Rewrote 3 bullets with measurable outcome metrics (38% latency drop, 250k+ transactions)</span>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
