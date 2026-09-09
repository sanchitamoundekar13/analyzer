import React from 'react';
import { UploadCloud, Cpu, Sparkles, ArrowRight } from 'lucide-react';

export const HowItWorksSection = ({ onOpenUpload }) => {
  const steps = [
    {
      step: 'Step 1',
      title: 'Upload Your Resume',
      desc: 'Drag and drop your PDF or DOCX resume. We maintain complete privacy with client-side sandbox processing.',
      icon: UploadCloud,
    },
    {
      step: 'Step 2',
      title: 'Deep Multi-Factor Scan',
      desc: 'Our engine evaluates your ATS parse rate, keyword relevance, quantified achievements, and recruiter readability.',
      icon: Cpu,
    },
    {
      step: 'Step 3',
      title: 'Actionable Suggestions',
      desc: 'Get exact line-by-line rewrites, missing skills from target job descriptions, and instant score improvement.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50/60 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How ResumeLens Optimizes Your Application
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Backed by recruiter research and parsing data from top applicant tracking systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-500/20">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA banner */}
        <div className="mt-14 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-600/20">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Ready to see where your resume stands?
            </h3>
            <p className="text-sm text-blue-100 max-w-xl">
              Get an evidence-based score and actionable fixes in under 30 seconds.
            </p>
          </div>
          <button
            onClick={onOpenUpload}
            className="shrink-0 px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Scan Resume Now</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
};
