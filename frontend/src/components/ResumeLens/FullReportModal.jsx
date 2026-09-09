import React, { useState } from 'react';
import {
  X,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2,
  Sparkles,
  Layers,
  Search,
  Check,
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const FullReportModal = ({ isOpen, onClose, resumeData, onUploadNew }) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, keywords, rewrites, ats

  if (!isOpen || !resumeData) return null;

  const {
    fileName,
    candidateName,
    role,
    pageCount,
    analyzedAt,
    overallScore,
    status,
    scores,
    keyInsights,
    detailedFeedback
  } = resumeData;

  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
              <FileText className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">{fileName}</h3>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200 rounded-md">
                  {role}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {candidateName} • {pageCount} pages • {analyzedAt}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 border-b border-slate-200 bg-white overflow-x-auto">
          {[
            { id: 'overview', label: 'Score Overview', icon: Layers },
            { id: 'keywords', label: 'Keyword Gap Analysis', icon: Search },
            { id: 'rewrites', label: 'AI Bullet Rewrites', icon: Sparkles },
            { id: 'ats', label: 'ATS Parser Audit', icon: Cpu },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50/40">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Score Hero Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-4">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        stroke="#E2E8F0"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        stroke="#2550EB"
                        strokeWidth="10"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-extrabold text-slate-900">{overallScore}</span>
                        <span className="text-xs font-semibold text-slate-400">/100</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-0.5">
                        {status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium text-center mt-2">
                    Evidence-Based Score
                  </p>
                </div>

                <div className="md:col-span-8 space-y-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-slate-400">
                    Category Breakdown
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(scores).map(([key, item]) => (
                      <div key={key} className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-semibold text-slate-700">{item.label}</span>
                          <span className="font-bold text-slate-900">{item.current}/{item.max}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${(item.current / item.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Insights Box */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Key Takeaways & Findings</h4>
                <div className="space-y-2.5">
                  {keyInsights.map((insight, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm font-medium ${
                        insight.type === 'positive'
                          ? 'bg-emerald-50/50 border-emerald-200/70 text-emerald-900'
                          : 'bg-amber-50/50 border-amber-200/70 text-amber-900'
                      }`}
                    >
                      {insight.type === 'positive' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      )}
                      <span>{insight.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KEYWORDS */}
          {activeTab === 'keywords' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Missing High-Impact Keywords</h4>
                    <p className="text-xs text-slate-500">
                      Adding these terms from matching target job postings will significantly improve ATS ranking.
                    </p>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg">
                    {detailedFeedback.keywordGaps.missing.length} Missing Terms
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {detailedFeedback.keywordGaps.missing.map((kw, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50/80 border border-amber-200 text-xs font-semibold text-amber-800"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>{kw}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Keywords Successfully Detected</h4>
                  <p className="text-xs text-slate-500">
                    These key terms are prominent and properly indexed in your resume.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {detailedFeedback.keywordGaps.found.map((kw, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{kw}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: REWRITES */}
          {activeTab === 'rewrites' && (
            <div className="space-y-4">
              <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 text-xs sm:text-sm text-blue-900 flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">AI Impact Bullet Rewrites:</span> Replacing passive task
                  descriptions with quantified achievements (Action + Metric + Result) increases interview callbacks by up to 3x.
                </div>
              </div>

              {detailedFeedback.bulletRewrites.map((rewrite, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Suggestion #{idx + 1}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                      <TrendingUp className="w-3 h-3" />
                      {rewrite.impact}
                    </span>
                  </div>

                  {/* Before */}
                  <div className="p-3 rounded-xl bg-red-50/40 border border-red-100">
                    <span className="text-[10px] font-bold text-red-600 uppercase block mb-1">
                      Current Wording (Generic):
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 line-through text-slate-500">
                      "{rewrite.original}"
                    </p>
                  </div>

                  {/* After */}
                  <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-200/80">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase block mb-1">
                      Optimized High-Impact Version:
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900">
                      "{rewrite.improved}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: ATS AUDIT */}
          {activeTab === 'ats' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">ATS Parsing & Formatting Score</h4>
                  <span className="text-sm font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
                    {detailedFeedback.atsCompliance.score} Compatibility
                  </span>
                </div>

                <div className="space-y-3">
                  {detailedFeedback.atsCompliance.findings.map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onUploadNew}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            ← Upload & Scan Another Resume
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert("Copied suggestions to clipboard!");
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition-all"
            >
              Copy Action Items
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
