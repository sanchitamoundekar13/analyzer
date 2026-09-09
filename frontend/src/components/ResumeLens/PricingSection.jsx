import React from 'react';
import { Check, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export const PricingSection = ({ onOpenUpload }) => {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span>Affordable & Transparent Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Invest in Your Next Career Move
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Student and career-friendly tiers with transparent pricing and instant access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* FREE PLAN */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Free Tier</h3>
                <p className="text-xs text-slate-500 mt-1">For immediate quick resume checkups</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">₹0</span>
                  <span className="text-xs text-slate-500">/ forever</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
                {[
                  '1 Full Evidence-Based Analysis',
                  'Deterministic 0–100 Score Breakdown',
                  'Basic ATS Readability Check',
                  'Top 4 Critical Point Deductions',
                  'PDF & DOCX Client-Side Scan'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenUpload}
              className="mt-8 w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
            >
              Analyze Free
            </button>
          </div>

          {/* PRO PLAN */}
          <div className="relative bg-white rounded-2xl border-2 border-blue-600 p-7 shadow-xl shadow-blue-500/10 flex flex-col justify-between">
            <div className="absolute -top-3.5 right-6 px-3 py-1 bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-full shadow-sm">
              Most Popular
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Pro Job Seeker</h3>
                <p className="text-xs text-slate-500 mt-1">Unlimited tailored scans and AI rewrites</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">₹199</span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-700">
                {[
                  'Unlimited Resumes & Scans',
                  'Job Description Tailoring & Match %',
                  'Detailed 250+ Keyword Gap Analysis',
                  'AI Action-Verb Bullet Rewrites',
                  'Step-by-Step Fix My Resume Wizard',
                  'Resume History & Version Compare (V1 vs V2)'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
                    <span className="font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenUpload}
              className="mt-8 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Get Started Pro</span>
            </button>
          </div>

          {/* CAREER PLAN */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Career Elite</h3>
                <p className="text-xs text-slate-500 mt-1">For active interview cycles and tailoring</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">₹399</span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs text-slate-600">
                {[
                  'Everything in Pro Plan',
                  'Automated Cover Letter Generator',
                  'Role-Specific Keyword Injection Rules',
                  'ATS Simulator Parser Live Audit',
                  'Exportable PDF Diagnostic Reports',
                  'Priority Recruiter Parser Verification'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenUpload}
              className="mt-8 w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-all"
            >
              Choose Career Plan
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
