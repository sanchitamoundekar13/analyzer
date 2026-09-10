import React, { useState } from 'react';
import { 
  FileText, 
  ArrowLeft, 
  Sparkles, 
  Download, 
  Share2, 
  Printer, 
  CheckCircle2, 
  Copy, 
  Check, 
  Wrench, 
  Layers, 
  Briefcase, 
  TrendingUp, 
  ExternalLink 
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { ScoreDonutGauge } from '../components/report/ScoreDonutGauge.jsx';
import { WhyLostPointsCard } from '../components/report/WhyLostPointsCard.jsx';
import { PriorityFixesCard } from '../components/report/PriorityFixesCard.jsx';
import { ATSCompatibilityCard } from '../components/report/ATSCompatibilityCard.jsx';
import { EvidenceVaultCard } from '../components/report/EvidenceVaultCard.jsx';
import { JDMatcher4Bar } from '../components/matcher/JDMatcher4Bar.jsx';
import { VisualResumeScanner } from '../components/scanner/VisualResumeScanner.jsx';
import { useResumeStore } from '../store/useResumeStore.js';

export function ReportPage({ reportId, onNavigate }) {
  const { reports } = useResumeStore();
  const [copiedIdx, setCopiedIdx] = useState(null);

  const report = reports.find(r => r.id === reportId) || reports[0];

  if (!report || report.status === 'rejected') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">No Valid Resume Analysis Found</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
          ResumeLens analyzes resumes and CVs only. Please upload a verified resume to view an ATS score report.
        </p>
        <Button variant="glow" onClick={() => onNavigate('/analyze')}>
          Upload Resume
        </Button>
      </div>
    );
  }

  const handleCopyBullet = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation & Action Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowLeft}
              onClick={() => onNavigate('/dashboard')}
            >
              Dashboard
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {report.candidate_name || "Resume Analysis"}
                </h1>
                <Badge variant="blue" size="sm">{report.filename}</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Target Role: <strong className="text-slate-700 dark:text-slate-300">{report.target_job_title || "Senior Software Engineer"}</strong> • Analyzed {report.analyzed_at}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={Printer}
              onClick={handlePrint}
            >
              Print / Save PDF
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Wrench}
              onClick={() => onNavigate('/resume-builder')}
            >
              Fix in Builder
            </Button>
          </div>
        </div>

        {/* 1. Score Donut & 7-Dimension Composition Gauge */}
        <ScoreDonutGauge
          score={report.overall_score}
          reachableTarget={report.reachable_target}
          potentialGain={report.potential_gain}
          status={report.status}
          statusColor={report.status_color}
          breakdown={report.score_breakdown}
        />

        {/* 2. Priority Fixes & Why Lost Points Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PriorityFixesCard
            currentScore={report.overall_score}
            targetScore={report.reachable_target}
            fixes={report.priority_fixes}
            onStartFixing={() => onNavigate('/resume-builder')}
          />
          <WhyLostPointsCard
            totalLost={report.total_points_lost}
            deductions={report.deductions}
          />
        </div>

        {/* 3. Deep ATS Compatibility Audit */}
        <ATSCompatibilityCard atsAudit={report.ats_audit} />

        {/* 4. Job Description Matcher (4-Bar Breakdown) */}
        <JDMatcher4Bar
          jobMatch={report.job_match}
          skillsAnalysis={report.skills_analysis}
          targetRole={report.target_job_title || "Senior Full Stack Engineer"}
        />

        {/* 5. Visual Resume Scanner Layout Inspector */}
        <VisualResumeScanner report={report} />

        {/* 6. AI Bullet Point Rewriter (STAR/CAR Format) */}
        <Card className="border-slate-200 dark:border-slate-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>AI Bullet Point Optimizer</CardTitle>
                    <Badge variant="blue" size="sm">STAR / CAR Framework</Badge>
                  </div>
                  <CardDescription>
                    Converts passive responsibility statements into metric-driven bullet points grounded in verified facts.
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4 pt-5">
            {report.bullet_rewrites && report.bullet_rewrites.map((rw, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/70 space-y-3"
              >
                {/* Original */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                    Original Bullet (Weak / Passive)
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-through bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                    {rw.original}
                  </p>
                </div>

                {/* Improved */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> High-Impact STAR Rewrite
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {rw.impact}
                    </span>
                  </div>

                  <div className="bg-emerald-50/70 dark:bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-start justify-between gap-3">
                    <p className="text-xs sm:text-sm font-medium text-emerald-950 dark:text-emerald-100 leading-relaxed">
                      {rw.improved}
                    </p>
                    <button
                      onClick={() => handleCopyBullet(rw.improved, idx)}
                      className="flex-shrink-0 p-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
                      title="Copy improved bullet to clipboard"
                    >
                      {copiedIdx === idx ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 7. Evidence Vault (Anti-Hallucination Safe Proofs) */}
        <EvidenceVaultCard evidenceVault={report.evidence_vault} />

        {/* 8. Career Role Recommendations */}
        {report.career_roles && report.career_roles.length > 0 && (
          <Card className="border-slate-200 dark:border-slate-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-600 text-white shadow-md shadow-purple-500/20">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle>Career Role Alignment</CardTitle>
                  <CardDescription>
                    Recommended target job titles based on your detected skill taxonomy.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {report.career_roles.map((cr, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{cr.role}</span>
                      <span className="font-black text-sm text-purple-600 dark:text-purple-400">{cr.match_pct}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600 rounded-full" style={{ width: `${cr.match_pct}%` }} />
                    </div>
                    <div className="flex flex-wrap gap-1 text-[10px] text-slate-500">
                      {cr.matched_skills.slice(0, 3).map((s, i) => (
                        <span key={i} className="bg-slate-200/60 dark:bg-slate-700/60 px-1.5 py-0.5 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
