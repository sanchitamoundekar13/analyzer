import React, { useState, useEffect } from 'react';
import { X, Play, FileText, CheckCircle2, Cpu, Sparkles, ArrowRight, Loader2 } from 'lucide-react';

export const AnimatedDemo = ({ isOpen, onClose, onLaunchStudio }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Uploading Resume', detail: 'Reading John_Doe_Resume.pdf (2 pages)...', icon: FileText },
    { title: 'Extracting Structure & ATS Tokens', detail: 'Extracting contact info, sections, date syntax...', icon: Cpu },
    { title: 'NLP Skills & Taxonomy Scan', detail: 'Matching against 250+ tech skills & frameworks...', icon: Sparkles },
    { title: 'Comparing Job Description', detail: 'Evaluating required vs missing keyword overlap...', icon: CheckCircle2 },
    { title: 'Generating Evidence Score', detail: 'Calculating 7-factor deterministic score: 87/100 (Very Good)', icon: Sparkles },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1400);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Play className="w-3.5 h-3.5 fill-white" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              ResumeLens Interactive Product Tour
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Animated Scanning Steps */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="relative rounded-2xl bg-slate-900 p-6 text-white overflow-hidden shadow-inner space-y-5">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3">
              <span>Pipeline Stage {currentStep + 1} of {steps.length}</span>
              <span className="text-blue-400 font-semibold font-mono">
                {currentStep === steps.length - 1 ? 'COMPLETE' : 'PROCESSING...'}
              </span>
            </div>

            <div className="space-y-4">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = idx < currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div
                    key={idx}
                    className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all duration-300 ${
                      isCurrent
                        ? 'bg-blue-600/20 border-blue-500 text-white scale-[1.02]'
                        : isPassed
                        ? 'bg-slate-800/60 border-slate-700 text-slate-300'
                        : 'opacity-40 border-transparent text-slate-500'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? 'bg-blue-600 text-white'
                          : isPassed
                          ? 'bg-emerald-600/20 text-emerald-400'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isCurrent ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Icon className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold">{step.title}</h4>
                      <p className="text-[11px] text-slate-400">{step.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {currentStep === steps.length - 1 && (
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between animate-fadeIn">
                <div>
                  <span className="text-xs text-slate-400">Score Generated:</span>
                  <div className="text-xl font-extrabold text-emerald-400">87 / 100 — VERY GOOD</div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">Realistic Target:</span>
                  <div className="text-sm font-bold text-blue-400">94 / 100 (+7 with 3 fixes)</div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onLaunchStudio();
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              <span>Launch Full Analyzer Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
