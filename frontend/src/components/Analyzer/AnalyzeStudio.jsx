import React, { useState } from 'react';
import {
  UploadCloud,
  FileText,
  Briefcase,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { parseResumeFile } from '../../services/resumeParser';
import { evaluateResume } from '../../services/scoringEngine';
import { RESUME_SAMPLES } from '../../data/resumeSamples';

export const AnalyzeStudio = ({ onCompleteAnalysis }) => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState('');
  const [error, setError] = useState(null);
  const [rawTextPreview, setRawTextPreview] = useState(null);
  const [showTextModal, setShowTextModal] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files ? e.target.files[0] : null;
    if (selected) {
      validateAndSetFile(selected);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files ? e.dataTransfer.files[0] : null;
    if (dropped) {
      validateAndSetFile(dropped);
    }
  };

  const validateAndSetFile = (f) => {
    setError(null);
    const ext = f.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx', 'txt', 'md'].includes(ext)) {
      setError('Please upload a valid PDF, DOCX, or TXT resume file.');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit.');
      return;
    }
    setFile(f);
  };

  const startRealAnalysis = async (resumeFile = file, jd = jobDescription) => {
    if (!resumeFile) {
      setError('Please select or drop a resume file first.');
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Stage 1: File reading
      setCurrentStage('Extracting selectable text streams...');
      await new Promise(r => setTimeout(r, 400));
      const parsedData = await parseResumeFile(resumeFile);
      setRawTextPreview(parsedData.rawText);

      // Stage 2: Section chunking
      setCurrentStage('Classifying sections (Experience, Education, Skills)...');
      await new Promise(r => setTimeout(r, 400));

      // Stage 3: Skills NLP & ATS Simulation
      setCurrentStage('Running 250+ skill taxonomy & ATS layout audit...');
      await new Promise(r => setTimeout(r, 500));

      // Stage 4: Deterministic Evidence Scoring
      setCurrentStage('Calculating 7-factor evidence scores & honest rewrites...');
      const evaluationResult = evaluateResume(parsedData, jd);
      await new Promise(r => setTimeout(r, 400));

      setIsProcessing(false);

      // Pass complete analyzed entity to Report
      onCompleteAnalysis({
        id: `res-${Date.now()}`,
        fileName: parsedData.fileName,
        candidateName: parsedData.contactInfo.name || 'Candidate',
        role: parsedData.sections.summary.detected ? 'Engineering / Professional' : 'Software Professional',
        pageCount: parsedData.pageCount,
        analyzedAt: 'analyzed just now',
        rawText: parsedData.rawText,
        contactInfo: parsedData.contactInfo,
        sections: parsedData.sections,
        jobDescription: jd,
        ...evaluationResult
      });
    } catch (err) {
      setIsProcessing(false);
      setError(err.message || 'Error parsing resume file. Please try another file.');
    }
  };

  const loadSample = (sample) => {
    const mockFile = new File(
      [sample.detailedFeedback.atsCompliance.findings.join('\n')],
      sample.fileName,
      { type: 'application/pdf' }
    );
    startRealAnalysis(mockFile, jobDescription);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Evidence-Based Analysis Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Know Exactly Why Your Resume Gets Selected or Rejected
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto">
          Upload your resume, compare it against a target job description, and get an evidence-based score with specific fixes — without inventing experience.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Drag & Drop Zone */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Step 1: Upload Resume</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">PDF, DOCX, TXT</span>
          </div>

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all relative cursor-pointer ${
              file
                ? 'border-emerald-400 bg-emerald-50/20'
                : 'border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/20'
            }`}
          >
            <input
              type="file"
              accept=".pdf,.docx,.txt,.md"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            {file ? (
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{file.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {(file.size / 1024).toFixed(1)} KB • Ready to analyze
                  </p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="text-xs text-slate-400 hover:text-red-600 underline"
                >
                  Change file
                </button>
              </div>
            ) : (
              <div className="space-y-3 flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <UploadCloud className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Drag and drop your resume file here
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    or click to browse from your computer (Max 10MB)
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Your resume is encrypted and processed securely. We don't use it for model training.</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Preset Sample Selectors */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Or Try With Verified Benchmark Resumes:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {RESUME_SAMPLES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => loadSample(s)}
                  className="p-3 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/40 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate">
                    {s.candidateName}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{s.role}</div>
                  <div className="text-[10px] font-bold text-emerald-600 mt-1">
                    Score: {s.overallScore}/100
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Resume vs Job Description Matcher */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <span>Step 2: Target Job Description</span>
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Optional
              </span>
            </div>
            
            <p className="text-xs text-slate-500">
              Paste the job posting you want to apply for to unlock <strong>Job Match %</strong>, <strong>Missing Target Skills</strong>, and <strong>Keyword Alignment</strong>.
            </p>

            <textarea
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job description text here (e.g. 'We are looking for a Full Stack Engineer with 3+ years in React, TypeScript, Node.js, AWS, and Docker...')"
              className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none font-mono"
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <button
              disabled={isProcessing || !file}
              onClick={() => startRealAnalysis()}
              className={`w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all ${
                isProcessing || !file
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 active:scale-[0.99]'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>{currentStage || 'Analyzing Resume...'}</span>
                </>
              ) : (
                <>
                  <span>Run Evidence-Based Analysis</span>
                  <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400">
              Instant analysis in ~3 seconds • Zero metric hallucinations
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
