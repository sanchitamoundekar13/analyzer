import React from 'react';
import { 
  Sparkles, 
  Upload, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  FileText, 
  Zap, 
  Star, 
  Layers, 
  Check 
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card, CardContent } from '../components/ui/Card.jsx';
import { ScoreDonutGauge } from '../components/report/ScoreDonutGauge.jsx';

export function LandingPage({ onNavigate, sampleReport }) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-100 dark:border-slate-800/80">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Top Announcement Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-xs font-semibold text-blue-700 dark:text-blue-300">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>ResumeLens 2.0 with Real ATS Inspection & Evidence Vault</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Know Exactly How Top ATS Parsers & Tech Recruiters <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500">Read Your Resume</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Get an evidence-based 7-dimension score out of 100, itemized point loss explanations, and strict anti-hallucination bullet rewrites. Stop guessing why your applications get rejected.
            </p>

            {/* Call to Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Button
                variant="glow"
                size="lg"
                icon={Upload}
                onClick={() => onNavigate('/analyze')}
                className="w-full sm:w-auto"
              >
                Upload & Scan Free
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('/resume-builder')}
                className="w-full sm:w-auto"
              >
                Open ATS Resume Builder
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% Deterministic Scoring
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Zero Hallucinations Policy
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Taleo & Workday Compliant
              </span>
            </div>
          </div>

          {/* Interactive Live Scanner Preview Card */}
          <div className="mt-14 max-w-4xl mx-auto">
            <div className="p-1 rounded-3xl bg-gradient-to-b from-blue-500/20 via-indigo-500/10 to-transparent shadow-2xl">
              <div className="bg-white dark:bg-slate-900 rounded-[22px] p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
                
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Analyzer Demo</span>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Sample Candidate: Senior Full Stack Engineer</h3>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    iconRight={ArrowRight}
                    onClick={() => onNavigate('/report/scan-john-doe')}
                  >
                    View Full Interactive Report
                  </Button>
                </div>

                {sampleReport && (
                  <ScoreDonutGauge
                    score={sampleReport.overall_score}
                    reachableTarget={sampleReport.reachable_target}
                    potentialGain={sampleReport.potential_gain}
                    status={sampleReport.status}
                    statusColor={sampleReport.status_color}
                    breakdown={sampleReport.score_breakdown}
                  />
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3 Core Value Props */}
      <section className="py-20 bg-slate-50/60 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Why ResumeLens is Different
            </h2>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Evidence-Based Intelligence Over Vague "AI Scores"
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Generic resume checkers throw arbitrary numbers. ResumeLens calculates every point with concrete evidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <Card className="hover:border-blue-300 dark:hover:border-blue-700 transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Real ATS Layout Auditor</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Detects unparseable 2-column grids, table nesting traps, microscopic hidden fonts (&lt;9pt), and missing headers before HR software rejects your file.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="hover:border-blue-300 dark:hover:border-blue-700 transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Target className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Explainable Point Losses</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  "Why did I lose 14 points?" See exact itemized penalties (-4 Job Match, -3 Experience Metrics, -2 Passive Verbs) paired with a realistic target projection.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="hover:border-blue-300 dark:hover:border-blue-700 transition-all">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Lock className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white">Evidence Vault & Anti-Hallucination</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  AI bullet rewrites are strictly constrained to facts verified inside your resume. No fabricated +37% or made-up statistics that fail recruiter interviews.
                </p>
              </CardContent>
            </Card>

          </div>

        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="py-16 bg-gradient-to-b from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to beat the ATS and land top engineering interviews?
          </h3>
          <p className="text-blue-100 text-sm max-w-xl mx-auto">
            Upload your resume now for a comprehensive evidence report in less than 5 seconds.
          </p>
          <Button
            variant="secondary"
            size="lg"
            icon={Upload}
            onClick={() => onNavigate('/analyze')}
            className="shadow-xl"
          >
            Start Free Resume Scan
          </Button>
        </div>
      </section>

    </div>
  );
}
