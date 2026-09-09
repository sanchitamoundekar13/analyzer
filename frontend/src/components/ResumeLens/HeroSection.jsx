import React from 'react';
import { CheckCircle2, ArrowRight, Play, Shield, Lock, FileCheck, Check } from 'lucide-react';
import { ResumeAnalysisCard } from './ResumeAnalysisCard';

export const HeroSection = ({
  activeResume,
  onOpenUpload,
  onOpenReport,
  onOpenDemo,
  onSwitchSample,
}) => {
  return (
    <section id="home" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Background vertical line grid */}
      <div className="absolute inset-0 bg-vertical-grid pointer-events-none opacity-60"></div>
      
      {/* Subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6 sm:space-y-8">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-xs">
              <Check className="w-3.5 h-3.5 text-blue-600 stroke-[2.5]" />
              <span>Evidence-Based Resume Analysis</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.12]">
              Make your resume{' '}
              <span className="text-blue-600 inline-block font-black">stronger</span>{' '}
              before you apply.
            </h1>

            {/* Subheadline description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              Upload your resume and get a clear analysis of its structure, skills, experience,
              ATS compatibility, and job relevance — with practical suggestions you can actually use.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onOpenUpload}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base rounded-xl shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/30 active:scale-[0.99] transition-all"
              >
                <span>Analyze My Resume</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onOpenDemo}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm sm:text-base rounded-xl shadow-xs hover:border-slate-300 transition-all group"
              >
                <Play className="w-4 h-4 fill-slate-700 text-slate-700 group-hover:fill-blue-600 group-hover:text-blue-600 transition-colors" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Trust Checks */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-2 text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Secure & private</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>PDF & DOCX supported</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: Interactive Card */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end">
            <ResumeAnalysisCard
              resumeData={activeResume}
              onOpenReport={onOpenReport}
              onSwitchSample={onSwitchSample}
            />
          </div>

        </div>
      </div>
    </section>
  );
};
