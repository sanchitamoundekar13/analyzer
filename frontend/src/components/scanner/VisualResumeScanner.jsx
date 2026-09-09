import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Sparkles, CheckCircle2, Info, Eye } from 'lucide-react';
import { Badge } from '../ui/Badge.jsx';

export function VisualResumeScanner({ report }) {
  const [activeHighlight, setActiveHighlight] = useState(null);

  const candidate = report.candidate_name || "John Doe";
  const bullets = report.entities?.all_bullets || [
    "Architected React and TypeScript client portal reducing page load latency by 38% for 120,000+ monthly active users.",
    "Engineered Node.js and PostgreSQL microservices handling 250k+ daily transactions with 99.98% uptime.",
    "Worked on database maintenance and bug fixes."
  ];

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-xl">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-lg text-white">Visual Resume Scanner</h3>
            <Badge variant="blue" size="sm">Real-Time ATS Inspector</Badge>
          </div>
          <p className="text-xs text-slate-400 mt-1">Interactive layout simulation showing parser extraction boundaries and rule violations.</p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Verified Evidence
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-950/60 border border-rose-500/40 text-rose-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span> ATS Problem
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/60 border border-amber-500/40 text-amber-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span> Weak Bullet
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-500/40 text-blue-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span> Missing Skill
          </span>
        </div>
      </div>

      {/* Simulated Document Sheet */}
      <div className="mt-6 bg-white text-slate-900 rounded-xl p-8 shadow-2xl font-sans text-xs sm:text-sm max-w-3xl mx-auto border border-slate-300 relative select-none">
        
        {/* Contact Header */}
        <div className="text-center pb-4 border-b border-slate-200">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">{candidate}</h1>
          <p className="text-xs text-slate-600 mt-1 flex flex-wrap justify-center gap-3">
            <span>johndoe@email.com</span> • 
            <span>(555) 123-4567</span> • 
            <span>linkedin.com/in/johndoe</span> • 
            <span>github.com/johndoe</span>
          </p>
        </div>

        {/* Section: Experience */}
        <div className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-blue-200 pb-1 mb-3">Work Experience</h2>
          
          <div className="mb-4">
            <div className="flex justify-between font-semibold text-slate-800 text-xs sm:text-sm">
              <span>Senior Software Engineer — Tech Corp</span>
              <span className="text-slate-500">2021 – Present</span>
            </div>
            
            <ul className="mt-2 space-y-2 pl-4 list-disc text-slate-700 leading-relaxed text-xs sm:text-sm">
              {/* Bullet 1 - Strong Evidence */}
              <li 
                onClick={() => setActiveHighlight({
                  type: 'evidence',
                  title: 'Strong Quantified Bullet',
                  detail: 'Contains specific metric ("38% reduction", "120,000+ users") and strong leading action verb ("Architected"). Pass rate: 100%.'
                })}
                className="cursor-pointer p-1.5 rounded transition-all bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 relative group"
              >
                <span className="font-semibold text-emerald-900">Architected</span> React and TypeScript client portal reducing page load latency by <span className="bg-emerald-200 px-1 py-0.5 rounded font-bold text-emerald-900">38%</span> for 120,000+ monthly active users.
                <span className="ml-2 text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full uppercase font-bold">🟢 Strong Evidence</span>
              </li>

              {/* Bullet 2 - Verified Microservices */}
              <li 
                onClick={() => setActiveHighlight({
                  type: 'evidence',
                  title: 'Metric-Driven Throughput',
                  detail: 'Demonstrates clear engineering scale (250k+ daily transactions) with high-availability reliability metrics (99.98% uptime).'
                })}
                className="cursor-pointer p-1.5 rounded transition-all bg-emerald-50 border border-emerald-300 hover:bg-emerald-100"
              >
                <span className="font-semibold text-emerald-900">Engineered</span> Node.js and PostgreSQL microservices handling <span className="bg-emerald-200 px-1 py-0.5 rounded font-bold text-emerald-900">250k+</span> daily transactions with 99.98% uptime.
                <span className="ml-2 text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full uppercase font-bold">🟢 Verified Fact</span>
              </li>

              {/* Bullet 3 - Weak Bullet */}
              <li 
                onClick={() => setActiveHighlight({
                  type: 'weak',
                  title: 'Weak Passive Bullet',
                  detail: 'Starts with weak verb "Worked on" and lacks measurable business impact. Recommendation: Rewrite with Action Verb + Scope + Impact.'
                })}
                className="cursor-pointer p-1.5 rounded transition-all bg-amber-50 border border-amber-300 hover:bg-amber-100"
              >
                <span className="text-amber-900 underline decoration-amber-500">Worked on database maintenance</span> and bug fixes.
                <span className="ml-2 text-[10px] bg-amber-600 text-white px-1.5 py-0.5 rounded-full uppercase font-bold">🟡 Weak Bullet (-2 pts)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section: Skills & Missing Keywords */}
        <div className="mt-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-700 border-b border-blue-200 pb-1 mb-2">Technical Skills</h2>
          <div className="flex flex-wrap gap-1.5 text-xs text-slate-800">
            <span className="bg-slate-100 px-2 py-1 rounded border">React</span>
            <span className="bg-slate-100 px-2 py-1 rounded border">TypeScript</span>
            <span className="bg-slate-100 px-2 py-1 rounded border">Node.js</span>
            <span className="bg-slate-100 px-2 py-1 rounded border">PostgreSQL</span>
            <span className="bg-slate-100 px-2 py-1 rounded border">Redis</span>
            
            {/* Missing keywords highlighted */}
            <span 
              onClick={() => setActiveHighlight({
                type: 'missing',
                title: 'Missing Keyword: Docker & AWS',
                detail: 'Target JD requires Docker and AWS container orchestration. If you have hands-on experience, include them in your skills list.'
              })}
              className="cursor-pointer bg-blue-50 border border-dashed border-blue-400 text-blue-700 font-semibold px-2 py-1 rounded hover:bg-blue-100"
            >
              + Docker & AWS (Missing in JD) 🔵
            </span>
          </div>
        </div>

        {/* Section: Layout ATS Check */}
        {report.ats_audit?.warnings?.length > 0 && (
          <div 
            onClick={() => setActiveHighlight({
              type: 'ats',
              title: 'ATS Formatting Warning',
              detail: report.ats_audit.warnings[0]
            })}
            className="mt-4 p-2.5 rounded-lg bg-rose-50 border border-rose-300 text-rose-900 text-xs flex items-center justify-between cursor-pointer hover:bg-rose-100"
          >
            <span className="flex items-center gap-2 font-medium">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>{report.ats_audit.warnings[0]}</span>
            </span>
            <span className="text-[10px] bg-rose-600 text-white px-2 py-0.5 rounded font-bold">🔴 ATS Issue</span>
          </div>
        )}
      </div>

      {/* Interactive Detail Drawer */}
      {activeHighlight && (
        <div className="mt-4 p-4 rounded-xl bg-slate-800 border border-slate-700 animate-in fade-in duration-150 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <h4 className="font-bold text-sm text-white">{activeHighlight.title}</h4>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{activeHighlight.detail}</p>
          </div>
          <button 
            onClick={() => setActiveHighlight(null)}
            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-700"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
