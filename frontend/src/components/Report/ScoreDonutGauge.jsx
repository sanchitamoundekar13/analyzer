import React from 'react';
import { Sparkles, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/Badge.jsx';

export function ScoreDonutGauge({ score, reachableTarget, potentialGain, status, statusColor, breakdown }) {
  // SVG circular calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const colorMap = {
    emerald: 'text-emerald-500 stroke-emerald-500',
    blue: 'text-blue-600 stroke-blue-600',
    amber: 'text-amber-500 stroke-amber-500',
    rose: 'text-rose-500 stroke-rose-500'
  };

  const activeColor = colorMap[statusColor] || colorMap.blue;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Donut Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center text-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              {/* Background circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="12"
                fill="transparent"
              />
              {/* Animated Progress circle */}
              <circle
                cx="80"
                cy="80"
                r={radius}
                className={`transition-all duration-1000 ease-out ${activeColor}`}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner text */}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                {score}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Badge variant={statusColor === 'emerald' ? 'emerald' : statusColor === 'amber' ? 'amber' : 'blue'} size="lg">
              {status}
            </Badge>
            {potentialGain > 0 && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                <TrendingUp className="w-3.5 h-3.5" /> Can reach {reachableTarget} (+{potentialGain})
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-xs">
            Evidence-based deterministic score evaluated across 7 core dimensions.
          </p>
        </div>

        {/* Right: 7 Dimension Breakdown Progress */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              7-Dimension Score Composition
            </h4>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">100 Pts Max</span>
          </div>

          {breakdown && Object.entries(breakdown).map(([key, dim]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">{dim.label}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {dim.score} <span className="text-slate-400 font-normal">/ {dim.max}</span>
                </span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    dim.score / dim.max >= 0.85
                      ? 'bg-emerald-500'
                      : dim.score / dim.max >= 0.65
                      ? 'bg-blue-600'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${(dim.score / dim.max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
