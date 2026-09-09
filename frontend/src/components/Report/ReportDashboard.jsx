import React, { useState } from 'react';
import {
  Download,
  Share2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Cpu,
  Layers,
  Sparkles,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Target,
  FileCheck
} from 'lucide-react';

export const ReportDashboard = ({ reportData, onNewScan, onCompareVersion }) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, health, skills, jd, ats, rewrites, wizard
  const [wizardStep, setWizardStep] = useState(0);

  if (!reportData) return null;

  const {
    fileName,
    candidateName,
    role,
    pageCount,
    analyzedAt,
    overallScore,
    grade,
    gradeColor,
    realisticTarget,
    dimensionScores,
    skillsAnalysis,
    experienceAnalysis,
    atsAudit,
    pointDeductions,
    bulletRewrites,
    contactInfo,
    sections,
    jobDescription
  } = reportData;

  // Donut chart math
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Banner & Actions Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <FileText className="w-6 h-6 stroke-[2]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900">{fileName}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {role}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {candidateName} • {pageCount} page(s) • {analyzedAt}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {onCompareVersion && (
            <button
              onClick={onCompareVersion}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>Version Compare</span>
            </button>
          )}
          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export PDF Report</span>
          </button>
          <button
            onClick={onNewScan}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4" />
            <span>New Scan</span>
          </button>
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-2 rounded-t-xl overflow-x-auto">
        {[
          { id: 'overview', label: 'Score & Overview', icon: Layers },
          { id: 'health', label: 'Resume Health & Formatting', icon: FileCheck },
          { id: 'skills', label: 'Skills & Keyword Gaps', icon: Sparkles },
          { id: 'jd', label: 'Job Description Match', icon: Target },
          { id: 'ats', label: 'ATS Simulator Preview', icon: Cpu },
          { id: 'rewrites', label: 'AI Bullet Optimizer', icon: TrendingUp },
          { id: 'wizard', label: 'Fix My Resume (Step-by-Step)', icon: CheckCircle2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-blue-600 text-blue-600 bg-blue-50/40 rounded-t-lg'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Main Score Hero Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Donut Gauge & Realistic Improvement */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-100 pb-6 lg:pb-0 lg:pr-6 space-y-4">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r={radius} stroke="#E2E8F0" strokeWidth="12" fill="transparent" />
                  <circle
                    cx="70" cy="70" r={radius}
                    stroke="#2550EB" strokeWidth="12" fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-black text-slate-900 tracking-tight">{overallScore}</span>
                    <span className="text-sm font-semibold text-slate-400">/100</span>
                  </div>
                  <span className="mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {grade}
                  </span>
                </div>
              </div>

              {/* Target score prediction */}
              <div className="w-full bg-blue-50/80 rounded-xl p-3.5 border border-blue-200 text-center space-y-1">
                <div className="text-xs font-bold text-blue-900">
                  Realistic Score Target: <span className="text-blue-700 text-sm">{realisticTarget}/100</span>
                </div>
                <p className="text-[11px] text-blue-700">
                  Complete 3 highest-impact fixes below to gain +{realisticTarget - overallScore} points.
                </p>
              </div>
            </div>

            {/* 7 Dimension Scores */}
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                7-Factor Evidence Score Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {Object.entries(dimensionScores).map(([key, item]) => {
                  const percent = Math.round((item.current / item.max) * 100);
                  return (
                    <div key={key} className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-100 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">{item.label}</span>
                        <span className="font-bold text-slate-900">
                          {item.current}/{item.max} <span className="text-[10px] text-slate-400">({percent}%)</span>
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-700"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Evidence Deductions: "Why Did I Lose Points?" */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span>Explainable Evidence: Why Did I Lose Points?</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {pointDeductions.length} key areas to improve
              </span>
            </div>

            <div className="space-y-3">
              {pointDeductions.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-amber-900 uppercase tracking-wider">{item.category}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                      -{item.lost} points
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800">
                    {item.reason}
                  </p>
                  <p className="text-xs text-slate-600 flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Fix:</strong> {item.fix}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: RESUME HEALTH & FORMATTING */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">ATS Formatting & Layout Audit</h3>
                <p className="text-xs text-slate-500">Checking for layout traps that cause ATS parsers to drop applications.</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">ATS Parse Confidence</span>
                <div className="text-xl font-black text-blue-600">{atsAudit.score}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {atsAudit.findings.map((f, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                    f.pass
                      ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950 font-medium'
                      : 'bg-amber-50/50 border-amber-200 text-amber-950 font-medium'
                  }`}
                >
                  {f.pass ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <span>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Detected Section Badges */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Section Detection Status
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(sections).map(([secKey, secVal]) => (
                  <div
                    key={secKey}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold ${
                      secVal.detected
                        ? 'bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-slate-100/50 border-dashed border-slate-300 text-slate-400'
                    }`}
                  >
                    <span className="capitalize">{secKey}</span>
                    {secVal.detected ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <X className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: SKILLS ANALYSIS */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Technical Skills & Keyword Coverage</h3>
                <p className="text-xs text-slate-500">Evaluated against 250+ tech taxonomy skills.</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Coverage</span>
                <div className="text-xl font-black text-emerald-600">{skillsAnalysis.coveragePercent}%</div>
              </div>
            </div>

            {/* Matched Skills */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Detected Hard Skills ({skillsAnalysis.detected.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {skillsAnalysis.detected.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Target Skills */}
            {skillsAnalysis.missing.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Missing Recommended Keywords ({skillsAnalysis.missing.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillsAnalysis.missing.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-800"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* "Don't Add This" Guardrails */}
            {skillsAnalysis.dontAdd.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Important Guardrail: "Don't Add This" Advice</span>
                </div>
                <div className="space-y-2">
                  {skillsAnalysis.dontAdd.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-slate-900">Do not arbitrarily add "{item.skill}"</span>
                      <p className="text-slate-600">{item.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB 4: JOB DESCRIPTION MATCH */}
      {activeTab === 'jd' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">Resume vs Target Job Description</h3>
                <p className="text-xs text-slate-500">Keyword, skills, and semantic role alignment.</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400">Match Percentage</span>
                <div className="text-2xl font-black text-blue-600">
                  {Math.round((dimensionScores.jobMatch.current / dimensionScores.jobMatch.max) * 100)}%
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What you have */}
              <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  What You Already Have ({skillsAnalysis.matched.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillsAnalysis.matched.map((m, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-emerald-200 text-xs font-bold text-emerald-800">
                      ✓ {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* What you're missing */}
              <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  What You're Missing ({skillsAnalysis.missing.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillsAnalysis.missing.map((m, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-amber-200 text-xs font-bold text-amber-800">
                      ⚠ {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ATS SIMULATOR PREVIEW */}
      {activeTab === 'ats' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">ATS Crawler Extraction Simulator</h3>
                <p className="text-xs text-slate-500">
                  This raw view simulates exactly what applicant tracking systems parse and feed to recruiter filters.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Single-Stream Clean
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto space-y-4">
              <div>
                <span className="text-blue-400 font-bold block mb-1">=== EXTRACTED CONTACT ENTITIES ===</span>
                <p>NAME: {contactInfo.name || 'Not detected'}</p>
                <p>EMAIL: {contactInfo.email || 'Not detected'}</p>
                <p>PHONE: {contactInfo.phone || 'Not detected'}</p>
                <p>LINKEDIN: {contactInfo.linkedin || 'Not detected'}</p>
                <p>GITHUB: {contactInfo.github || 'Not detected'}</p>
              </div>

              <div>
                <span className="text-emerald-400 font-bold block mb-1">=== EXTRACTED SKILL TOKENS ===</span>
                <p>{skillsAnalysis.detected.join(', ')}</p>
              </div>

              <div>
                <span className="text-amber-400 font-bold block mb-1">=== DETECTED EXPERIENCE BULLETS ===</span>
                {experienceAnalysis.bullets.slice(0, 5).map((b, i) => (
                  <p key={i} className="mb-1.5">• {b.text}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: AI BULLET OPTIMIZER (HONEST REWRITES) */}
      {activeTab === 'rewrites' && (
        <div className="space-y-6">
          <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-5 flex items-start gap-3.5">
            <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-blue-950">
                Zero-Fabrication Promise: We Never Invent Achievements or Metrics
              </h4>
              <p className="text-xs text-blue-800 leading-relaxed">
                Generic AI tools invent fake numbers (e.g. "increased sales by 42%"), which collapse under interview questioning. ResumeLens structures your real contributions into powerful Action + Task + Result frameworks and guides you where to plug in your authentic metrics.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {bulletRewrites.map((r, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase">
                  <span>Bullet #{idx + 1}</span>
                  <span className="text-emerald-600 font-semibold">{r.note}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-100 text-xs sm:text-sm text-slate-500 line-through">
                  "{r.original}"
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                  "{r.improved}"
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: FIX MY RESUME GUIDED WIZARD */}
      {activeTab === 'wizard' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Guided Action Plan
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Fix Priority Issue {wizardStep + 1} of {pointDeductions.length || 1}
              </h3>
            </div>
            <div className="text-xs text-slate-400 font-medium">
              Step {wizardStep + 1} / {pointDeductions.length || 1}
            </div>
          </div>

          {pointDeductions.length > 0 && pointDeductions[wizardStep] ? (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-amber-700 uppercase">
                  Area: {pointDeductions[wizardStep].category} (-{pointDeductions[wizardStep].lost} pts)
                </span>
                <h4 className="text-sm font-bold text-slate-900">
                  {pointDeductions[wizardStep].reason}
                </h4>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                <span className="text-xs font-bold text-blue-800 uppercase">Recommended Action:</span>
                <p className="text-xs sm:text-sm text-blue-950 font-medium leading-relaxed">
                  {pointDeductions[wizardStep].fix}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={wizardStep === 0}
                  onClick={() => setWizardStep(prev => Math.max(0, prev - 1))}
                  className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1 ${
                    wizardStep === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Issue</span>
                </button>

                <button
                  onClick={() => {
                    if (wizardStep < pointDeductions.length - 1) {
                      setWizardStep(prev => prev + 1);
                    } else {
                      alert("You've reviewed all priority fixes! Update your resume file and run a new scan to check your score increase.");
                    }
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
                >
                  <span>{wizardStep < pointDeductions.length - 1 ? 'Next Issue' : 'Complete Review'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-slate-900">No Critical Issues Found!</h4>
              <p className="text-xs text-slate-500">Your resume already meets top-tier ATS compliance criteria.</p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
