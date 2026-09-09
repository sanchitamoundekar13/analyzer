import React from 'react';
import { FileText, Shield, Sparkles, CheckCircle2, Lock, Heart, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer({ onRouteChange }) {
  const handleNav = (route) => {
    if (onRouteChange) onRouteChange(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => handleNav('/')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">
                Resume<span className="text-blue-500">Lens</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Evidence-based AI resume analysis and ATS optimization. Evaluates candidate resumes against real enterprise parser rules and job descriptions with deterministic 7-dimension scoring.
            </p>

            <div className="flex items-center gap-3 text-slate-400 pt-2">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700 text-[11px] text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> All Systems Operational
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700 text-[11px] text-slate-300">
                <Lock className="w-3 h-3 text-blue-400" /> Client-Side Privacy Safe
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Product</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNav('/analyze')} className="hover:text-white transition-colors">Resume Analyzer</button></li>
              <li><button onClick={() => handleNav('/resume-builder')} className="hover:text-white transition-colors">ATS Resume Builder</button></li>
              <li><button onClick={() => handleNav('/jobs')} className="hover:text-white transition-colors">Target Job Matcher</button></li>
              <li><button onClick={() => handleNav('/compare')} className="hover:text-white transition-colors">Version Comparison</button></li>
              <li><button onClick={() => handleNav('/cover-letter')} className="hover:text-white transition-colors">AI Cover Letter</button></li>
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Platform</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleNav('/dashboard')} className="hover:text-white transition-colors">Candidate Dashboard</button></li>
              <li><button onClick={() => handleNav('/resume')} className="hover:text-white transition-colors">Resume Vault</button></li>
              <li><button onClick={() => handleNav('/pricing')} className="hover:text-white transition-colors">Pricing & Plans</button></li>
              <li><button onClick={() => handleNav('/settings')} className="hover:text-white transition-colors">User Settings</button></li>
            </ul>
          </div>

          {/* Privacy & Security */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Security & Privacy</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> No Model Training on PII
              </li>
              <li className="flex items-center gap-1.5 text-slate-300">
                <Lock className="w-3.5 h-3.5" /> Encrypted Storage
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">ATS Compliance Guide</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResumeLens AI. Built for candidates aiming for top tier engineering, product, and data roles.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/sanchitamoundekar13/analyzer" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              GitHub Repository
            </a>
            <span>•</span>
            <button onClick={() => handleNav('/pricing')} className="hover:text-white transition-colors">
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
