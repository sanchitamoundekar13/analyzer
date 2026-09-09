import React, { useState } from 'react';
import { X, FileText, ArrowRight, Github } from 'lucide-react';

export const SignInModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900">ResumeLens</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-slate-900">Welcome Back</h3>
            <p className="text-xs text-slate-500">Sign in to access your saved resume diagnostics</p>
          </div>

          {submitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <p className="text-xs font-bold text-emerald-800">Magic Link Dispatched!</p>
              <p className="text-xs text-emerald-700">Check {email} to sign in directly.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-3.5"
            >
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Continue with Email</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] text-slate-400 font-medium absolute">
              or continue with
            </span>
          </div>

          <button
            onClick={() => {
              window.open("https://github.com/sanchitamoundekar13/analyzer", "_blank");
            }}
            className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Github className="w-4 h-4" />
            <span>Continue with GitHub</span>
          </button>
        </div>

      </div>
    </div>
  );
};
