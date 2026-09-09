import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export const PricingSection = ({ onOpenUpload }) => {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span>Simple Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Invest in Your Next Career Move
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Free forever for single scans, with optional Pro power tools for active job seekers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Free Tier</h3>
                <p className="text-xs text-slate-500 mt-1">Perfect for a quick resume checkup</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">$0</span>
                  <span className="text-xs text-slate-500">/ forever</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600">
                {[
                  'Complete Overall Evidence Score (0-100)',
                  'Basic ATS Compatibility Check',
                  'Top 4 Key Insights & Red Flags',
                  'Standard PDF/DOCX Support',
                  'No Sign-up or Credit Card Required'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenUpload}
              className="mt-8 w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl transition-all"
            >
              Analyze Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-white rounded-2xl border-2 border-blue-600 p-8 shadow-xl shadow-blue-500/10 flex flex-col justify-between">
            <div className="absolute -top-3.5 right-6 px-3 py-1 bg-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider rounded-full shadow-sm">
              Most Popular
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Pro Job Seeker</h3>
                <p className="text-xs text-slate-500 mt-1">Unlimited tailored scans and AI rewrites</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-slate-900">$19</span>
                  <span className="text-xs text-slate-500">/ month</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-700">
                {[
                  'Unlimited Resumes & Cover Letter Scans',
                  'Job Description Tailoring & Match %',
                  'AI Metric-Driven Bullet Point Rewrites',
                  'Detailed Keyword Gap Finder by Industry',
                  'One-Click Export to PDF & Word',
                  'Priority Recruiter Parser Verification'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 stroke-[2.5]" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenUpload}
              className="mt-8 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start 7-Day Free Trial</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
