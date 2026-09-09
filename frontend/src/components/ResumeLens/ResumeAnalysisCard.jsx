import React from 'react';
import { FileText, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';

export const ResumeAnalysisCard = ({ resumeData, onOpenReport, onSwitchSample }) => {
  const {
    fileName,
    pageCount,
    analyzedAt,
    overallScore,
    status,
    scores,
    keyInsights,
  } = resumeData;

  // Donut chart math
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="relative w-full max-w-[540px] bg-white rounded-2xl border border-slate-200/90 shadow-2xl shadow-slate-900/10 overflow-hidden transition-all duration-300 hover:shadow-blue-900/10">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50/80 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block"></span>
          </div>
          <span className="ml-2 text-xs font-semibold text-slate-700 tracking-tight">
            Resume Analysis
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {onSwitchSample && (
            <button
              onClick={onSwitchSample}
              className="text-[11px] font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1 transition-colors px-2 py-0.5 rounded hover:bg-slate-200/60"
              title="Click to test other sample resumes"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Switch Demo</span>
            </button>
          )}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            Analyzed
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 sm:p-7 space-y-6">
        {/* Document Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <FileText className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                {fileName}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 font-normal">
                {pageCount} {pageCount === 1 ? 'page' : 'pages'} • {analyzedAt}
              </p>
            </div>
          </div>
        </div>

        {/* Score & Breakdown Section */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center pt-1">
          {/* Radial Donut Gauge */}
          <div className="sm:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
                {/* Background circle */}
                <circle
                  cx="65"
                  cy="65"
                  r={radius}
                  stroke="#E2E8F0"
                  strokeWidth="10"
                  fill="transparent"
                />
                {/* Progress arc */}
                <circle
                  cx="65"
                  cy="65"
                  r={radius}
                  stroke="#2550EB"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              {/* Gauge Inner Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {overallScore}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500 ml-0.5">
                    /100
                  </span>
                </div>
                <span className="mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                  {status}
                </span>
              </div>
            </div>
          </div>

          {/* Metric Breakdown Bars */}
          <div className="sm:col-span-7 space-y-2.5">
            {Object.entries(scores).map(([key, item]) => {
              const percentage = (item.current / item.max) * 100;
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="font-semibold text-slate-900">
                      {item.current}/{item.max}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 rounded-full transition-all duration-700"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Insights List */}
        <div className="pt-2 border-t border-slate-100 space-y-3">
          <p className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            Key Insights
          </p>
          <div className="space-y-2">
            {keyInsights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs">
                {insight.type === 'positive' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                )}
                <span className="text-slate-700 font-medium leading-relaxed">
                  {insight.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* View Full Report CTA */}
        <div className="pt-1">
          <button
            onClick={onOpenReport}
            className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 hover:text-blue-600 transition-all shadow-sm group"
          >
            <span>View Full Report</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
};
