import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const FeaturePillTicker = () => {
  const pills = [
    'Resume Analysis',
    'ATS Compatibility',
    'Job Description Matching',
    'Evidence-Based Score',
    'Actionable Suggestions',
  ];

  return (
    <section className="border-y border-slate-100 bg-slate-50/70 py-4.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {pills.map((pill, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors cursor-default"
            >
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{pill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
