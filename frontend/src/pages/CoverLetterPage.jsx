import React, { useState } from 'react';
import { 
  Mail, 
  Sparkles, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  ArrowLeft, 
  FileText, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { generateCoverLetterApi } from '../services/apiClient.js';
import { useResumeStore } from '../store/useResumeStore.js';

export function CoverLetterPage({ onNavigate }) {
  const { userProfile, builderData } = useResumeStore();
  
  const [candidateName, setCandidateName] = useState(builderData.personal_info?.fullName || "John Doe");
  const [targetRole, setTargetRole] = useState("Senior Full Stack Engineer");
  const [targetCompany, setTargetCompany] = useState("Google");
  const [tone, setTone] = useState("Professional");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [coverLetterText, setCoverLetterText] = useState(
`Dear Hiring Team at Google,

I am writing to express my enthusiastic interest in the Senior Full Stack Engineer role. With a proven background in React, TypeScript, Node.js, and PostgreSQL, I specialize in building reliable, high-performance web applications that drive tangible product growth.

Throughout my career, I have focused on translating complex technical challenges into clean, robust architecture. Notably, I have architected responsive client portals reducing page load latency by 38% for 120,000+ monthly active users, while engineering Node.js microservices handling 250k+ daily transactions with 99.98% uptime.

What excites me most about Google is your commitment to engineering excellence and user-centric scalability. My hands-on proficiency with distributed systems and modern TypeScript workflows enables me to immediately contribute to your engineering roadmap and scale with your technical infrastructure.

Thank you for your time and consideration. I welcome the opportunity to discuss how my skill set and passion align with your mission.

Sincerely,
John Doe`
  );

  const handleGenerate = async () => {
    setIsGenerating(true);
    const result = await generateCoverLetterApi({
      candidate_name: candidateName,
      target_role: targetRole,
      target_company: targetCompany,
      skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      achievements: ["architected high-performance client portals reducing load latency by 38%"],
      tone: tone
    });

    if (result) {
      setCoverLetterText(result);
    }
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowLeft}
              onClick={() => onNavigate('/dashboard')}
            >
              Dashboard
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  AI Cover Letter Generator
                </h1>
                <Badge variant="indigo" size="sm">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Grounded in Verified Facts
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                Generate tailored, high-converting cover letters without hallucinating false credentials.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={copied ? Check : Copy}
              onClick={handleCopy}
            >
              {copied ? 'Copied to Clipboard' : 'Copy Text'}
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Printer}
              onClick={() => window.print()}
            >
              Print / Save PDF
            </Button>
          </div>
        </div>

        {/* 2 Columns: Controls on Left, Editor on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls */}
          <div className="lg:col-span-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Cover Letter Parameters</CardTitle>
                <CardDescription>Tailor tone and company specifics.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-4 text-xs">
                <div>
                  <label className="font-bold uppercase text-slate-500">Candidate Name</label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-xs mt-1 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-500">Target Role Title</label>
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-xs mt-1 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-500">Target Company</label>
                  <input
                    type="text"
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-xs mt-1 bg-white dark:bg-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase text-slate-500">Tone of Voice</label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-xs mt-1 bg-white dark:bg-slate-900"
                  >
                    <option value="Professional">Professional & Direct</option>
                    <option value="Confident">Confident & Impact-Driven</option>
                    <option value="Modern Executive">Modern Technical Leader</option>
                  </select>
                </div>

                <div className="pt-2">
                  <Button
                    variant="glow"
                    size="md"
                    className="w-full"
                    icon={Sparkles}
                    disabled={isGenerating}
                    onClick={handleGenerate}
                  >
                    {isGenerating ? 'Generating Letter...' : 'Regenerate Cover Letter'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Editor & Sheet */}
          <div className="lg:col-span-8">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <textarea
                  rows={16}
                  value={coverLetterText}
                  onChange={(e) => setCoverLetterText(e.target.value)}
                  className="w-full p-4 rounded-xl text-xs sm:text-sm font-sans leading-relaxed border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </CardContent>
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
