import React from 'react';
import { X, Play, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export const DemoVideoModal = ({ isOpen, onClose, onStartScan }) => {
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

        {/* Simulated Demo Video Screen */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-6 flex flex-col justify-between text-white shadow-inner overflow-hidden">
            {/* Ambient visual */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
            
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-sm border border-white/20">
                Live Scanner Demo
              </span>
              <span className="text-xs text-blue-300 font-mono">0:45 / 1:20</span>
            </div>

            <div className="space-y-2 text-center my-auto">
              <div className="inline-flex w-14 h-14 rounded-full bg-blue-600/90 text-white items-center justify-center shadow-lg shadow-blue-500/40 mx-auto animate-pulse">
                <Sparkles className="w-7 h-7" />
              </div>
              <h4 className="text-lg font-bold">Evidence-Based Parsing in Action</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Watch how candidate bullet points are converted into high-impact, recruiter-ready metrics with immediate ATS score lift.
              </p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 border-t border-white/10 pt-3">
              <span>ATS Parser: 98% Confidence</span>
              <span>15 Target Keywords Evaluated</span>
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant ATS compliance check</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Job description keyword gap finder</span>
            </div>
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
                onStartScan();
              }}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-2"
            >
              <span>Try Live Scanner Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
