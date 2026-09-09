import React, { useState } from 'react';
import { FileText, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Card, CardContent } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';

export function LoginPage({ onNavigate }) {
  const [email, setEmail] = useState('bhavin@resumelens.ai');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        
        {/* Logo */}
        <div className="text-center space-y-2">
          <div 
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
              Resume<span className="text-blue-600">Lens</span>
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
          <p className="text-xs text-slate-500">Sign in to access your scanned resumes and ATS reports</p>
        </div>

        {/* Card */}
        <Card className="shadow-xl border-slate-200 dark:border-slate-800">
          <CardContent className="p-6 sm:p-8 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold uppercase text-slate-500">Email Address</label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label className="font-bold uppercase text-slate-500">Password</label>
                  <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Forgot?</a>
                </div>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border text-xs bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <Button type="submit" variant="glow" size="md" className="w-full">
                Sign In to Dashboard
              </Button>

              {/* Demo 1-Click Login Pill */}
              <div className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => onNavigate('/dashboard')}
                >
                  ⚡ Demo Instant Sign-In
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <button onClick={() => onNavigate('/signup')} className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Sign up for free
          </button>
        </p>

      </div>
    </div>
  );
}
