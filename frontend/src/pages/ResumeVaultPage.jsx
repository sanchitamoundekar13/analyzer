import React, { useState } from 'react';
import { 
  Layers, 
  Upload, 
  FileText, 
  Trash2, 
  Copy, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Plus, 
  Download, 
  GitCompare 
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { useResumeStore } from '../store/useResumeStore.js';

export function ResumeVaultPage({ onNavigate }) {
  const { reports, deleteReport } = useResumeStore();
  const [selectedTag, setSelectedTag] = useState('All');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Resume Vault & Version Manager
              </h1>
              <Badge variant="blue" size="sm">{reports.length} Resumes</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Store, version, and compare tailored resume iterations for specific engineering and product roles.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={GitCompare}
              onClick={() => onNavigate('/compare')}
            >
              Compare Versions
            </Button>
            <Button
              variant="glow"
              size="sm"
              icon={Upload}
              onClick={() => onNavigate('/analyze')}
            >
              Upload New Version
            </Button>
          </div>
        </div>

        {/* Resumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((r, idx) => {
            const isTopScore = r.overall_score >= 85;
            return (
              <Card key={r.id} className="hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between">
                <div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{r.candidate_name || "Resume Version"}</CardTitle>
                          <p className="text-xs text-slate-400 truncate max-w-[160px]">{r.filename}</p>
                        </div>
                      </div>

                      <span className={`text-xl font-black ${isTopScore ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                        {r.overall_score} <span className="text-[10px] text-slate-400 font-normal">/ 100</span>
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-4">
                    {/* Key Stats Row */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">ATS Health</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{r.ats_audit?.ats_compatibility_score || 90}% Match</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Reach</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">Up to {r.reachable_target} pts</span>
                      </div>
                    </div>

                    {/* Matched Skills Pill Preview */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Core Skills</span>
                      <div className="flex flex-wrap gap-1">
                        {(r.skills_analysis?.matched_skills || ["React", "TypeScript", "Node.js"]).slice(0, 4).map((s, i) => (
                          <span key={i} className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Footer Action Bar */}
                <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{r.analyzed_at}</span>
                  
                  <div className="flex items-center gap-2">
                    {reports.length > 1 && (
                      <button
                        onClick={() => deleteReport(r.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        title="Delete resume from vault"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onNavigate(`/report/${r.id}`)}
                    >
                      View Report
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* New Resume Card Trigger */}
          <div
            onClick={() => onNavigate('/analyze')}
            className="border-2 border-dashed border-slate-300 dark:border-slate-800 hover:border-blue-500 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all hover:bg-blue-50/20 dark:hover:bg-blue-950/20 space-y-3 min-h-[260px]"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Upload Another Resume</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-[200px]">
                Create a new tailored version for a specific job application.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
