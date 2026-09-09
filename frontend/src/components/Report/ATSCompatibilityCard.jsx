import React from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle, AlertOctagon, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card.jsx';
import { Badge } from '../ui/Badge.jsx';

export function ATSCompatibilityCard({ atsAudit }) {
  if (!atsAudit) return null;

  const { ats_compatibility_score, passed_checks = [], warnings = [], critical_fixes = [] } = atsAudit;
  const isHealthy = ats_compatibility_score >= 80;

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${isHealthy ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400'}`}>
              {isHealthy ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>Real ATS Parser Compatibility</CardTitle>
                <Badge variant={isHealthy ? 'emerald' : 'amber'} size="sm">
                  {isHealthy ? 'ATS Friendly' : 'Parsing Risk Detected'}
                </Badge>
              </div>
              <CardDescription>
                Audited against enterprise parsers (Taleo, Workday, Greenhouse, Lever, iCIMS).
              </CardDescription>
            </div>
          </div>

          <div className="text-right">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {ats_compatibility_score}%
            </span>
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Compatibility Score
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 pt-5">
        {/* Critical Fixes Alert */}
        {critical_fixes.length > 0 && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4 text-rose-600" />
              <span>Critical Layout Fix Required</span>
            </div>
            <ul className="space-y-1 pl-5 list-disc text-sm text-rose-900 dark:text-rose-200 font-medium">
              {critical_fixes.map((fix, idx) => (
                <li key={idx}>{fix}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Passed Checks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Passed ATS Checks ({passed_checks.length})
            </h4>
            <div className="space-y-2">
              {passed_checks.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-xs font-medium text-emerald-900 dark:text-emerald-200"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warnings & Layout Risks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> Formatting Warnings ({warnings.length})
            </h4>
            {warnings.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-center text-xs text-slate-500 font-medium border border-dashed border-slate-200 dark:border-slate-700">
                No formatting warnings detected. Your resume structure is clean and single-column.
              </div>
            ) : (
              <div className="space-y-2">
                {warnings.map((warn, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs font-medium text-amber-900 dark:text-amber-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                    <span>{warn}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
