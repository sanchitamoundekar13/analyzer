import React from 'react';
import { MinusCircle, HelpCircle, ArrowDownRight, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card.jsx';
import { Badge } from '../ui/Badge.jsx';

export function WhyLostPointsCard({ totalLost, deductions }) {
  if (!deductions || deductions.length === 0) {
    return null;
  }

  return (
    <Card className="border-rose-100 dark:border-rose-950/50">
      <CardHeader className="bg-rose-50/40 dark:bg-rose-950/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400">
              <MinusCircle className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-rose-950 dark:text-rose-200">
                Why did I lose {totalLost} points?
              </CardTitle>
              <CardDescription>
                Transparent, deterministic attribution of every point deduction.
              </CardDescription>
            </div>
          </div>
          <Badge variant="rose" size="md">
            -{totalLost} Points Total
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-5">
        {deductions.map((d, idx) => (
          <div
            key={idx}
            className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 transition-all hover:bg-slate-100/80 dark:hover:bg-slate-800"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {d.dimension}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
                {d.reason}
              </p>
            </div>

            <span className="ml-4 flex-shrink-0 font-bold text-sm px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              -{d.points_lost} pts
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
