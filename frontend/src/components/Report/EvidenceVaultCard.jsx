import React from 'react';
import { Lock, ShieldCheck, CheckCircle2, FileText, Sparkles, ExternalLink } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/Card.jsx';
import { Badge } from '../ui/Badge.jsx';

export function EvidenceVaultCard({ evidenceVault }) {
  if (!evidenceVault || evidenceVault.length === 0) return null;

  return (
    <Card className="border-indigo-100 dark:border-indigo-950/50">
      <CardHeader className="bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>Evidence Vault</CardTitle>
                <Badge variant="indigo" size="sm">
                  Anti-Hallucination Safe
                </Badge>
              </div>
              <CardDescription>
                Verified candidate achievements extracted directly from your resume. AI rewrites are strictly constrained to these facts.
              </CardDescription>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800">
            {evidenceVault.length} Verified Claims
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-5">
        {evidenceVault.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 space-y-2 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {item.claim}
              </span>
              <Badge variant="emerald" size="sm">
                {item.confidence}
              </Badge>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800 italic leading-relaxed">
              "{item.proof_quote}"
            </p>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
              <span>Metric: <strong className="text-indigo-600 dark:text-indigo-400">{item.metric}</strong></span>
              <span>Source: {item.source}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
