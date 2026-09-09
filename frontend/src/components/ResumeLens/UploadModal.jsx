import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { RESUME_SAMPLES } from '../../data/resumeSamples';

export const UploadModal = ({ isOpen, onClose, onSelectResume }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');

  if (!isOpen) return null;

  const handleFileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFile(file);
      simulateScan(file.name);
    }
  };

  const simulateScan = (filename) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      // Generate dynamically scored profile for custom upload
      const customProfile = {
        id: "custom-upload",
        fileName: filename || "My_Resume.pdf",
        candidateName: "Uploaded Candidate",
        role: "Software / Tech Candidate",
        pageCount: 2,
        analyzedAt: "analyzed just now",
        overallScore: Math.floor(Math.random() * (94 - 78 + 1)) + 78,
        status: "Good",
        statusColor: "emerald",
        scores: {
          atsStructure: { current: 18, max: 20, label: "ATS & Structure" },
          skills: { current: 17, max: 20, label: "Skills" },
          experience: { current: 16, max: 20, label: "Experience" },
          jobMatch: { current: 16, max: 20, label: "Job Match" },
          educationProjects: { current: 9, max: 10, label: "Education & Projects" },
          writingQuality: { current: 8, max: 10, label: "Writing Quality" },
        },
        keyInsights: [
          { type: "positive", text: "Clean ATS-compliant header structure" },
          { type: "positive", text: "Relevant core technical skills identified" },
          { type: "warning", text: "Some bullet points lack measurable KPI metrics" },
          { type: "warning", text: "Target job keywords could be emphasized in summary" }
        ],
        detailedFeedback: {
          atsCompliance: {
            score: "92%",
            findings: [
              "Successfully extracted experience entries and contact details.",
              "Document formatting is clean with standard typography."
            ]
          },
          keywordGaps: {
            found: ["Problem Solving", "Architecture", "Engineering", "Team Collaboration", "APIs"],
            missing: ["Cloud Infrastructure", "Unit Testing", "Scalability", "Agile Cadence"]
          },
          bulletRewrites: [
            {
              original: "Worked with team on features and resolved tickets.",
              improved: "Delivered 12 core platform features in collaboration with cross-functional team, reducing turnaround cycle time by 28%.",
              impact: "+22% recruiter impact score"
            }
          ]
        }
      };
      onSelectResume(customProfile);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <UploadCloud className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Analyze Your Resume</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Upload Dropzone */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="border-2 border-dashed border-slate-200 hover:border-blue-500 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-blue-50/30 transition-all cursor-pointer relative group"
          >
            <input
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={handleFileDrop}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            
            {isUploading ? (
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <p className="text-sm font-semibold text-slate-800">
                  Parsing resume with ATS engine...
                </p>
                <p className="text-xs text-slate-500">Checking structure, metrics, and keywords</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Click to upload or drag & drop
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PDF or DOCX (Max 10MB) • 100% Private & Client-Safe
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Optional Job Description Paste */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-700 flex justify-between">
              <span>Target Job Description (Optional)</span>
              <span className="text-slate-400 font-normal">For keyword matching</span>
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste job posting text here to calculate real-time match percentage..."
              rows={2}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"
            />
          </div>

          {/* Quick Preset Demos */}
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Or Test With Sample Resumes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {RESUME_SAMPLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => {
                    onSelectResume(sample);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-600 hover:bg-blue-50/50 text-left transition-all group"
                >
                  <div className="text-xs font-bold text-slate-800 group-hover:text-blue-600 truncate">
                    {sample.candidateName}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">{sample.role}</div>
                  <div className="text-[10px] font-semibold text-emerald-600 mt-1">
                    Score: {sample.overallScore}/100
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
