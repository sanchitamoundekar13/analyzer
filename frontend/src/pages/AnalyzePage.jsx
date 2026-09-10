import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  AlertCircle, 
  AlertTriangle,
  XCircle,
  ArrowRight, 
  Lock, 
  Layers,
  RefreshCw,
  HelpCircle,
  ShieldCheck,
  FileCheck,
  GraduationCap,
  Wrench,
  UserCheck
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Card, CardContent } from '../components/ui/Card.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { runClientAnalysis } from '../services/scoringEngine.js';
import { analyzeResumeApi } from '../services/apiClient.js';
import { useResumeStore } from '../store/useResumeStore.js';

export function AnalyzePage({ onNavigate }) {
  const { addReport } = useResumeStore();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [targetRole, setTargetRole] = useState('Senior Full Stack Engineer');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  
  // Validation state: 'idle' | 'scanning' | 'rejected' | 'uncertain' | 'success'
  const [pipelineState, setPipelineState] = useState('idle');
  const [validationData, setValidationData] = useState(null);
  const [cachedRawText, setCachedRawText] = useState('');

  const fileInputRef = useRef(null);

  const scanSteps = [
    "Checking your document format & integrity...",
    "Extracting text & applying OCR inspection...",
    "Classifying document type & semantic signatures...",
    "Auditing resume structure & confidence signals...",
    "Validating experience timelines & candidate headers...",
    "Resume verification complete..."
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setErrorMsg('');
      setPipelineState('idle');
      setValidationData(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setErrorMsg('');
      setPipelineState('idle');
      setValidationData(null);
    }
  };

  const handleResetUpload = () => {
    setFile(null);
    setPipelineState('idle');
    setValidationData(null);
    setErrorMsg('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async (forceConfirm = false) => {
    if (!file && !cachedRawText) {
      setErrorMsg('Please select or drop a resume PDF or DOCX file to analyze.');
      return;
    }

    setIsScanning(true);
    setScanStep(0);
    setErrorMsg('');

    // Step animation interval
    const interval = setInterval(() => {
      setScanStep(prev => (prev < scanSteps.length - 1 ? prev + 1 : prev));
    }, 400);

    try {
      let report = null;

      // 1. Try Live Python FastAPI Backend
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('job_description', jobDescription);
        if (forceConfirm) {
          formData.append('force_analysis', 'true');
        }

        report = await analyzeResumeApi(formData);
      }

      // 2. If live backend is offline or returned null, use client-side engine
      if (!report) {
        let text = cachedRawText;
        if (!text && file) {
          text = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result || '');
            reader.onerror = () => resolve('');
            reader.readAsText(file);
          });
          setCachedRawText(text);
        }

        report = runClientAnalysis(text, file?.name || 'resume.pdf', jobDescription, forceConfirm);
      }

      clearInterval(interval);
      setIsScanning(false);

      if (!report) {
        throw new Error('Unable to process document.');
      }

      // 3. Handle Decision States
      if (report.status === 'rejected') {
        setPipelineState('rejected');
        setValidationData(report);
        return;
      }

      if (report.status === 'uncertain' && !forceConfirm) {
        setPipelineState('uncertain');
        setValidationData(report);
        return;
      }

      // 4. Success State -> Store & Navigate
      report.target_job_title = targetRole;
      setPipelineState('success');
      addReport(report);
      
      setTimeout(() => {
        onNavigate(`/report/${report.id}`);
      }, 400);

    } catch (err) {
      clearInterval(interval);
      setIsScanning(false);
      setErrorMsg(`Analysis failed: ${err.message}`);
    }
  };

  // Load John Doe demo
  const handleLoadDemo = () => {
    onNavigate('/report/scan-john-doe');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Badge variant="blue" size="md">
            Industrial-Grade Resume Verification & ATS Engine
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Upload Your Resume
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Upload your Resume or CV to receive an evidence-based analysis. ResumeLens strictly validates document structure before generating deterministic ATS scores.
          </p>
        </div>

        {/* 1. REJECTION SCREEN */}
        {pipelineState === 'rejected' && validationData && (
          <Card className="shadow-xl border-rose-200 dark:border-rose-900/60 bg-white dark:bg-slate-900 overflow-hidden animate-in fade-in duration-300">
            <div className="bg-rose-500/10 border-b border-rose-200 dark:border-rose-900/40 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-7 h-7" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                      Not a Resume
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Confidence: {validationData.resume_confidence}%
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    This doesn't appear to be a Resume
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {validationData.message || "We could not find enough resume-specific information in this document."}
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Detected Type Banner */}
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Detected Document Type</span>
                  <div className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mt-0.5">
                    <FileText className="w-4 h-4 text-rose-500" />
                    <span>{validationData.document_type_label || validationData.document_type}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500 max-w-xs sm:text-right">
                  ResumeLens analyzes resumes and CVs only. No ATS score was generated for this file.
                </div>
              </div>

              {/* Required Resume Information Checklist */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Resume Requirements Checklist
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    validationData.detected_elements?.candidate_name
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50/50 border-rose-200 text-rose-900 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-300'
                  }`}>
                    <span className="font-semibold">Candidate Name & Header</span>
                    <span>{validationData.detected_elements?.candidate_name ? '✓ Found' : '✗ Missing'}</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    validationData.detected_elements?.contact_info
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50/50 border-rose-200 text-rose-900 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-300'
                  }`}>
                    <span className="font-semibold">Contact Info (Email / Phone)</span>
                    <span>{validationData.detected_elements?.contact_info ? '✓ Found' : '✗ Missing'}</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    validationData.detected_elements?.education
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50/50 border-rose-200 text-rose-900 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-300'
                  }`}>
                    <span className="font-semibold">Education & Degrees</span>
                    <span>{validationData.detected_elements?.education ? '✓ Found' : '✗ Missing'}</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    validationData.detected_elements?.skills
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50/50 border-rose-200 text-rose-900 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-300'
                  }`}>
                    <span className="font-semibold">Skills & Competencies</span>
                    <span>{validationData.detected_elements?.skills ? '✓ Found' : '✗ Missing'}</span>
                  </div>

                  <div className={`p-3 rounded-xl border sm:col-span-2 flex items-center justify-between ${
                    validationData.detected_elements?.experience_or_projects
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50/50 border-rose-200 text-rose-900 dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-300'
                  }`}>
                    <span className="font-semibold">Work Experience / Projects / Timeline</span>
                    <span>{validationData.detected_elements?.experience_or_projects ? '✓ Found' : '✗ Missing'}</span>
                  </div>
                </div>
              </div>

              {/* Guidance & CTA */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Please upload a PDF or DOCX file containing your professional resume or CV.
                </p>
                <Button
                  variant="glow"
                  size="lg"
                  icon={Upload}
                  onClick={handleResetUpload}
                  className="w-full sm:w-auto"
                >
                  Upload Resume
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 2. UNCERTAIN DOCUMENT SCREEN */}
        {pipelineState === 'uncertain' && validationData && (
          <Card className="shadow-xl border-amber-200 dark:border-amber-900/60 bg-white dark:bg-slate-900 overflow-hidden animate-in fade-in duration-300">
            <div className="bg-amber-500/10 border-b border-amber-200 dark:border-amber-900/40 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                      Uncertain Resume Structure
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Confidence: {validationData.resume_confidence}%
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    We are not completely sure that this is a resume
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    We found some resume-like information, but some important sections or timelines may be missing.
                  </p>
                </div>
              </div>
            </div>

            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Detected Checklist */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Detected Information Breakdown
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    validationData.detected_elements?.candidate_name
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-50/50 border-amber-200 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-300'
                  }`}>
                    <span className="font-semibold">Candidate Name</span>
                    <span>{validationData.detected_elements?.candidate_name ? '✓ Found' : '✗ Missing'}</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    validationData.detected_elements?.contact_info
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-50/50 border-amber-200 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-300'
                  }`}>
                    <span className="font-semibold">Contact Info</span>
                    <span>{validationData.detected_elements?.contact_info ? '✓ Found' : '✗ Missing'}</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    validationData.detected_elements?.education
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-50/50 border-amber-200 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-300'
                  }`}>
                    <span className="font-semibold">Education</span>
                    <span>{validationData.detected_elements?.education ? '✓ Found' : '✗ Missing'}</span>
                  </div>

                  <div className={`p-3 rounded-xl border flex items-center justify-between ${
                    validationData.detected_elements?.skills
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-50/50 border-amber-200 text-amber-900 dark:bg-amber-950/20 dark:border-amber-900 dark:text-amber-300'
                  }`}>
                    <span className="font-semibold">Skills</span>
                    <span>{validationData.detected_elements?.skills ? '✓ Found' : '✗ Missing'}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleResetUpload}
                  className="w-full sm:w-auto"
                >
                  Upload Another File
                </Button>

                <Button
                  variant="glow"
                  size="lg"
                  icon={CheckCircle2}
                  onClick={() => handleAnalyze(true)}
                  className="w-full sm:w-auto"
                >
                  Continue with Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 3. DEFAULT UPLOAD CARD */}
        {pipelineState === 'idle' && (
          <Card className="shadow-lg border-slate-200 dark:border-slate-800">
            <CardContent className="p-6 sm:p-8 space-y-6">
              
              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                  file
                    ? 'border-emerald-400 bg-emerald-50/40 dark:bg-emerald-950/20'
                    : 'border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-950/20'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex flex-col items-center space-y-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    file
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'
                      : 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                  }`}>
                    {file ? <CheckCircle2 className="w-7 h-7" /> : <Upload className="w-7 h-7" />}
                  </div>

                  {file ? (
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{file.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{(file.size / 1024).toFixed(1)} KB • Click to choose a different file</p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">
                        Drop your resume here, or <span className="text-blue-600">browse files</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Supported formats: PDF, DOCX, DOC (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Optional Target Job Matcher Inputs */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                    Target Role & Job Description <span className="text-slate-400 font-normal">(Optional for Job Match)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setJobDescription("Senior Full Stack Engineer\nRequirements:\n- 5+ years experience in React, TypeScript, Node.js\n- PostgreSQL, Redis caching, REST APIs\n- AWS cloud infrastructure & Docker containerization\n- Microservices architecture and high-scale web platforms")}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Load Sample SDE Job Description
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Senior Full Stack Engineer">Senior Full Stack Engineer</option>
                    <option value="Lead Frontend Engineer">Lead Frontend Engineer</option>
                    <option value="Backend Platform Engineer">Backend Platform Engineer</option>
                    <option value="Associate Data Scientist">Associate Data Scientist</option>
                    <option value="DevOps & Cloud Engineer">DevOps & Cloud Engineer</option>
                    <option value="Product Manager">Product Manager</option>
                  </select>

                  <div className="sm:col-span-2">
                    <textarea
                      rows={3}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      placeholder="Paste target job posting description here to calculate exact 4-bar keyword & experience match..."
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Scan Progress Bar & State */}
              {isScanning && (
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between text-xs font-bold text-blue-900 dark:text-blue-300">
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
                      <span>{scanSteps[scanStep]}</span>
                    </span>
                    <span>{Math.round(((scanStep + 1) / scanSteps.length) * 100)}%</span>
                  </div>
                  <div className="h-2 w-full bg-blue-200 dark:bg-blue-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{ width: `${((scanStep + 1) / scanSteps.length) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleLoadDemo}
                  className="w-full sm:w-auto"
                >
                  Try Pre-analyzed Sample
                </Button>

                <Button
                  variant="glow"
                  size="lg"
                  icon={Upload}
                  disabled={isScanning}
                  onClick={() => handleAnalyze(false)}
                  className="w-full sm:w-auto"
                >
                  {isScanning ? 'Verifying & Analyzing...' : 'Upload & Analyze Resume'}
                </Button>
              </div>

            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
