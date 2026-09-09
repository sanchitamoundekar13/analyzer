import React from 'react';
import { FileText, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <FileText className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                Resume<span className="text-blue-500">Lens</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Evidence-based resume scoring, ATS compatibility diagnostics, and AI-powered impact optimization to help you land more interviews.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Product</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#features" className="hover:text-white transition-colors">Resume Analyzer</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">ATS Checker</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Keyword Gap Scan</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Legal / Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Trust & Privacy</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Security Architecture</a></li>
              <li><a href="#faqs" className="hover:text-white transition-colors">Help Center</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResumeLens Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/sanchitamoundekar13/analyzer" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
