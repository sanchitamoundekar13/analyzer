import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  Briefcase, 
  AlertCircle, 
  ArrowRight, 
  Lock, 
  Layers 
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
  const fileInputRef = useRef(null);

  const scanSteps = [
    "Reading document stream & verifying ATS format...",
    "Extracting experience timelines, degrees & contact headers...",
    "Matching skills against normalized canonical taxonomy...",
    "Running semantic embedding comparison against target JD...",
    "Calculating deterministic 7-dimension evidence score...",
    "Generating non-hallucinatory STAR bullet improvements..."
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setErrorMsg('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setFile(droppedFile);
      setErrorMsg('');
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setErrorMsg('Please select or drop a resume PDF or DOCX file to analyze.');
      return;
    }

    setIsScanning(true);
    setScanStep(0);

    // Step animation interval
    const interval = setInterval(() => {
      setScanStep(prev => (prev < scanSteps.length - 1 ? prev + 1 : prev));
    }, 450);

    try {
      // 1. Try Live Python FastAPI Backend
      const formData = new FormData();
      formData.append('file', file);
      formData.append('job_description', jobDescription);

      let report = await analyzeResumeApi(formData);

      // 2. If live backend is offline, read text client-side and run client deterministic engine
      if (!report) {
        const text = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target.result || '');
          reader.onerror = () => resolve('');
          reader.readAsText(file);
        });

        report = runClientAnalysis(text, file.name, jobDescription);
      }

      report.target_job_title = targetRole;

      clearInterval(interval);
      setTimeout(() => {
        addReport(report);
        setIsScanning(false);
        onNavigate(`/report/${report.id}`);
      }, 500);

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
            Industrial-Grade ATS Parser
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Analyze Your Resume & ATS Readiness
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Upload your resume and optionally provide a target job description to get an evidence-backed score report in seconds.
          </p>
        </div>

        {/* Upload Card */}
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
                      Supports PDF, DOCX, DOC, and TXT format (Max 10MB)
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
                onClick={handleAnalyze}
                className="w-full sm:w-auto"
              >
                {isScanning ? 'Analyzing Resume...' : 'Analyze Resume Now'}
              </Button>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  );
}
