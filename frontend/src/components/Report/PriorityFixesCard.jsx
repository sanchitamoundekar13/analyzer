import React, { useState } from 'react';
import { Wrench, CheckCircle2, ArrowRight, Sparkles, Zap, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card.jsx';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';

export function PriorityFixesCard({ currentScore, targetScore, fixes, onStartFixing }) {
  const [completedFixes, setCompletedFixes] = useState({});

  const toggleFix = (index) => {
    setCompletedFixes(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const potentialGain = targetScore - currentScore;

  return (
    <Card className="border-blue-100 dark:border-blue-950/50 bg-gradient-to-b from-white to-blue-50/20 dark:from-slate-900 dark:to-blue-950/10">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>Priority Action Plan</CardTitle>
                <Badge variant="emerald" size="sm">
                  +{potentialGain} Pts Potential
                </Badge>
              </div>
              <CardDescription>
                Follow these ordered steps to realistically elevate your score from {currentScore} to {targetScore}.
              </CardDescription>
            </div>
          </div>

          <Button
            variant="glow"
            size="md"
            iconRight={ArrowRight}
            onClick={onStartFixing}
          >
            Fix My Resume
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-5">
        {fixes && fixes.map((fix, idx) => {
          const isDone = completedFixes[idx];
          return (
            <div
              key={idx}
              onClick={() => toggleFix(idx)}
              className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                isDone
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800/60 line-through opacity-75'
                  : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm'
              }`}
            >
              <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                isDone
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
              }`}>
                {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
              </div>

              <div className="flex-1 text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {fix}
              </div>

              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1 group-hover:text-blue-600">
                {isDone ? 'Resolved' : 'Actionable'} <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
