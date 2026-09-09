import React, { useState } from 'react';
import {
  FileText,
  TrendingUp,
  ArrowRight,
  Plus,
  CheckCircle2,
  Calendar,
  Sparkles,
  BarChart3,
  Layers,
  Trash2
} from 'lucide-react';

export const UserDashboard = ({ onOpenScan, onOpenReport }) => {
  const [activeTab, setActiveTab] = useState('history'); // history, comparison

  const sampleResumes = [
    {
      id: 'res-v2',
      name: 'John_Doe_Resume_v2_Optimized.pdf',
      role: 'Senior Full Stack Engineer',
      score: 87,
      grade: 'Very Good',
      date: 'Today, 2 hours ago',
      version: 'v2',
      metrics: { ats: 19, skills: 18, experience: 17, writing: 9 }
    },
    {
      id: 'res-v1',
      name: 'John_Doe_Resume_v1_Initial.pdf',
      role: 'Senior Full Stack Engineer',
      score: 72,
      grade: 'Needs Work',
      date: 'Yesterday',
      version: 'v1',
      metrics: { ats: 15, skills: 14, experience: 12, writing: 8 }
    },
    {
      id: 'res-sarah',
      name: 'Sarah_Jenkins_Product_Lead.pdf',
      role: 'Lead Product Manager',
      score: 91,
      grade: 'Excellent',
      date: '3 days ago',
      version: 'v1',
      metrics: { ats: 20, skills: 18, experience: 19, writing: 9 }
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Career Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your resume versions, compare improvements, and track ATS readiness.
          </p>
        </div>

        <button
          onClick={onOpenScan}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Upload New Resume</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>My Saved Resumes (3)</span>
        </button>

        <button
          onClick={() => setActiveTab('comparison')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-all ${
            activeTab === 'comparison'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Version Comparison (V1 vs V2)</span>
        </button>
      </div>

      {/* TAB 1: HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3.5">
            {sampleResumes.map((res) => (
              <div
                key={res.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 stroke-[2]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">{res.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{res.role}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {res.date}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-black text-slate-900">
                      {res.score}<span className="text-xs text-slate-400 font-normal">/100</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {res.grade}
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenReport(res)}
                    className="px-4 py-2 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                  >
                    <span>View Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: VERSION COMPARISON TOOL */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Score Progression Analysis
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Version 1 (Initial) vs Version 2 (Optimized)
              </h2>
            </div>

            {/* Score Comparison Visual */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">Version 1 (Before)</span>
                <div className="text-3xl font-extrabold text-slate-700 mt-1">72 / 100</div>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full">Needs Work</span>
              </div>

              <div className="flex flex-col items-center justify-center space-y-1">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                  +15
                </div>
                <span className="text-xs font-bold text-emerald-700 uppercase">Score Increase</span>
              </div>

              <div>
                <span className="text-xs font-bold text-blue-600 uppercase">Version 2 (After)</span>
                <div className="text-3xl font-extrabold text-blue-600 mt-1">87 / 100</div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">Very Good</span>
              </div>
            </div>

            {/* Dimension Lift Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Dimension Breakdown Comparison
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'ATS & Parsing', v1: 15, v2: 19, lift: '+4' },
                  { label: 'Skills Coverage', v1: 14, v2: 18, lift: '+4' },
                  { label: 'Experience Evidence', v1: 12, v2: 17, lift: '+5' },
                  { label: 'Writing Quality', v1: 8, v2: 9, lift: '+1' },
                ].map((dim, i) => (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                    <span className="text-xs font-semibold text-slate-600 block">{dim.label}</span>
                    <div className="flex items-baseline justify-between">
                      <span className="text-lg font-black text-slate-900">
                        {dim.v1} <span className="text-slate-400 font-normal">→</span> {dim.v2}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {dim.lift} pts
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exactly What Improved */}
            <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Key Improvements Recorded in Version 2:
              </h4>
              <div className="space-y-2 text-xs text-emerald-950 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>+6 Relevant Skills:</strong> Added Docker, Kubernetes, CI/CD, and Redis in Technical Skills.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>+3 Quantified Experience Bullets:</strong> Replaced vague job descriptions with action metrics.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>+2 ATS Formatting Fixes:</strong> Removed multi-column tables and converted headings to standard headers.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
