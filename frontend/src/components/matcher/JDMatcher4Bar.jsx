import React from 'react';
import { Target, CheckCircle2, AlertTriangle, Info, Sparkles, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card.jsx';
import { Badge } from '../ui/Badge.jsx';

export function JDMatcher4Bar({ jobMatch, skillsAnalysis, targetRole = "Target Role" }) {
  if (!jobMatch || !skillsAnalysis) return null;

  const { overall_match = 82, skills_pct = 84, experience_pct = 78, keywords_pct = 86, semantic_pct = 80 } = jobMatch;
  const { matched_skills = [], missing_skills = [], advisories = [] } = skillsAnalysis;

  const barData = [
    { label: "Skills Match", value: skills_pct, color: "bg-blue-600" },
    { label: "Experience Alignment", value: experience_pct, color: "bg-indigo-600" },
    { label: "Keyword Overlap", value: keywords_pct, color: "bg-emerald-500" },
    { label: "Semantic Relevance", value: semantic_pct, color: "bg-purple-600" },
  ];

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>Job Description Matcher</CardTitle>
                <Badge variant="blue" size="sm">Semantic Vector AI</Badge>
              </div>
              <CardDescription>
                Alignment against target position: <strong className="text-slate-900 dark:text-white">{targetRole}</strong>
              </CardDescription>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
              {overall_match}%
            </span>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Overall Job Match
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-5">
        {/* 4-Bar Multi-dimensional Match Progress */}
        <div className="space-y-3.5 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
          {barData.map((bar, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{bar.label}</span>
                <span className="font-bold text-slate-900 dark:text-white">{bar.value}%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${bar.color}`}
                  style={{ width: `${bar.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Matched vs Missing Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Matched */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Matched Skills ({matched_skills.length})
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {matched_skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Missing in Resume ({missing_skills.length})
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {missing_skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200 border border-amber-200 dark:border-amber-800 flex items-center gap-1"
                >
                  ⚠ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Important Ethical Advisory Callout */}
        {advisories.length > 0 && (
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 dark:text-blue-300 font-bold text-xs uppercase tracking-wider">
              <Info className="w-4 h-4 text-blue-600" />
              <span>Honest Candidate Advisory</span>
            </div>
            <p className="text-xs text-blue-950 dark:text-blue-200 leading-relaxed">
              {advisories[0].advice}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
