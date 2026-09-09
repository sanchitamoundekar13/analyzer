import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  Printer, 
  Download, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  Layers, 
  ArrowLeft, 
  Wrench, 
  RefreshCw 
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { useResumeStore } from '../store/useResumeStore.js';

export function ResumeBuilderPage({ onNavigate }) {
  const { builderData, updateBuilderData } = useResumeStore();
  const [activeTab, setActiveTab] = useState('personal');
  const [selectedTemplate, setSelectedTemplate] = useState('Modern Single-Column');
  const [newSkill, setNewSkill] = useState('');

  const pInfo = builderData.personal_info || {};

  const handlePersonalInfoChange = (field, val) => {
    updateBuilderData({
      personal_info: { ...pInfo, [field]: val }
    });
  };

  const handleSummaryChange = (val) => {
    updateBuilderData({ summary: val });
  };

  const handleAddBullet = (expIndex) => {
    const experiences = [...builderData.experiences];
    experiences[expIndex].bullets.push("Architected new core feature improving user throughput by 25%.");
    updateBuilderData({ experiences });
  };

  const handleUpdateBullet = (expIndex, bulletIndex, val) => {
    const experiences = [...builderData.experiences];
    experiences[expIndex].bullets[bulletIndex] = val;
    updateBuilderData({ experiences });
  };

  const handleDeleteBullet = (expIndex, bulletIndex) => {
    const experiences = [...builderData.experiences];
    experiences[expIndex].bullets.splice(bulletIndex, 1);
    updateBuilderData({ experiences });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !builderData.skills.includes(newSkill.trim())) {
      updateBuilderData({ skills: [...builderData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    updateBuilderData({ skills: builderData.skills.filter(s => s !== skillToRemove) });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Bar */}
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
                  ATS Resume Builder
                </h1>
                <Badge variant="emerald" size="sm">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> 100% ATS Safe
                </Badge>
              </div>
              <p className="text-xs text-slate-500">
                Single-column ATS-compliant editor with real-time live preview.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200"
            >
              <option value="Modern Single-Column">Template: Modern Single-Column</option>
              <option value="Software Engineer Focus">Template: Software Engineer Standard</option>
              <option value="Minimal Classic">Template: Minimal Classic</option>
            </select>

            <Button
              variant="glow"
              size="sm"
              icon={Printer}
              onClick={handlePrint}
            >
              Print / Save PDF
            </Button>
          </div>
        </div>

        {/* 2-Column Split: Editor on Left, Live Preview on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form Section Tabs */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Sub-nav Tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              {['personal', 'summary', 'experience', 'skills', 'education'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-lg font-bold capitalize transition-all ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Form Content Cards */}
            <Card>
              <CardContent className="p-6 space-y-4">
                
                {/* 1. Personal Information */}
                {activeTab === 'personal' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2">Candidate Header</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase">Full Name</label>
                        <input
                          type="text"
                          value={pInfo.fullName || ''}
                          onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase">Target Job Title</label>
                        <input
                          type="text"
                          value={pInfo.jobTitle || ''}
                          onChange={(e) => handlePersonalInfoChange('jobTitle', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase">Email</label>
                        <input
                          type="email"
                          value={pInfo.email || ''}
                          onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase">Phone</label>
                        <input
                          type="text"
                          value={pInfo.phone || ''}
                          onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase">Location (City, State)</label>
                        <input
                          type="text"
                          value={pInfo.location || ''}
                          onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 uppercase">LinkedIn Profile</label>
                        <input
                          type="text"
                          value={pInfo.linkedin || ''}
                          onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Professional Summary */}
                {activeTab === 'summary' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Professional Summary</h3>
                      <span className="text-[11px] text-slate-400">2-4 sentences recommended</span>
                    </div>
                    <textarea
                      rows={5}
                      value={builderData.summary || ''}
                      onChange={(e) => handleSummaryChange(e.target.value)}
                      className="w-full p-3 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 leading-relaxed resize-none"
                    />
                  </div>
                )}

                {/* 3. Work Experience */}
                {activeTab === 'experience' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center border-b pb-2">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">Work Experience</h3>
                    </div>

                    {builderData.experiences?.map((exp, expIdx) => (
                      <div key={exp.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Job Title</label>
                            <input
                              type="text"
                              value={exp.role}
                              onChange={(e) => {
                                const experiences = [...builderData.experiences];
                                experiences[expIdx].role = e.target.value;
                                updateBuilderData({ experiences });
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border text-xs"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-bold uppercase text-slate-400">Company</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => {
                                const experiences = [...builderData.experiences];
                                experiences[expIdx].company = e.target.value;
                                updateBuilderData({ experiences });
                              }}
                              className="w-full px-2.5 py-1.5 rounded bg-white dark:bg-slate-900 border text-xs"
                            />
                          </div>
                        </div>

                        {/* Bullets */}
                        <div className="space-y-2 pt-2">
                          <label className="text-[10px] font-bold uppercase text-slate-400 flex items-center justify-between">
                            <span>Quantified Bullet Points</span>
                            <button
                              type="button"
                              onClick={() => handleAddBullet(expIdx)}
                              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> Add Bullet
                            </button>
                          </label>

                          {exp.bullets?.map((b, bIdx) => (
                            <div key={bIdx} className="flex items-start gap-2">
                              <textarea
                                rows={2}
                                value={b}
                                onChange={(e) => handleUpdateBullet(expIdx, bIdx, e.target.value)}
                                className="flex-1 p-2 rounded text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 leading-relaxed resize-none"
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteBullet(expIdx, bIdx)}
                                className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. Skills Section */}
                {activeTab === 'skills' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2">Technical Skills</h3>
                    
                    <form onSubmit={handleAddSkill} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add skill (e.g. Docker, Python, AWS)..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="flex-1 px-3 py-2 rounded-lg text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
                      />
                      <Button type="submit" variant="primary" size="sm" icon={Plus}>
                        Add
                      </Button>
                    </form>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {builderData.skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border"
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-slate-400 hover:text-rose-600"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Education */}
                {activeTab === 'education' && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2">Education & Degrees</h3>
                    {builderData.education?.map((edu) => (
                      <div key={edu.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border text-xs space-y-2">
                        <div className="font-bold text-slate-800 dark:text-slate-200">{edu.degree} in {edu.field}</div>
                        <div className="text-slate-500">{edu.school} • Graduated {edu.gradDate} (GPA: {edu.gpa})</div>
                      </div>
                    ))}
                  </div>
                )}

              </CardContent>
            </Card>

          </div>

          {/* Right Live ATS Document Sheet */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="bg-white text-slate-900 rounded-xl p-8 shadow-2xl border border-slate-300 font-sans text-xs leading-relaxed space-y-4 max-h-[85vh] overflow-y-auto">
              
              {/* Header */}
              <div className="text-center pb-3 border-b-2 border-slate-800">
                <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">{pInfo.fullName || "Candidate Name"}</h2>
                <p className="text-[11px] text-slate-600 mt-1">
                  {pInfo.email} • {pInfo.phone} • {pInfo.location} • {pInfo.linkedin}
                </p>
              </div>

              {/* Summary */}
              {builderData.summary && (
                <div className="space-y-1">
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">Professional Summary</h3>
                  <p className="text-slate-700 text-justify">{builderData.summary}</p>
                </div>
              )}

              {/* Experience */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">Work Experience</h3>
                {builderData.experiences?.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{exp.role} — {exp.company}</span>
                      <span className="text-slate-500 font-normal">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <ul className="pl-4 list-disc space-y-1 text-slate-700">
                      {exp.bullets?.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">Technical Proficiencies</h3>
                <p className="text-slate-700">
                  {builderData.skills?.join(' • ')}
                </p>
              </div>

              {/* Education */}
              <div className="space-y-1">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-0.5">Education</h3>
                {builderData.education?.map((edu) => (
                  <div key={edu.id} className="flex justify-between text-slate-700">
                    <span><strong>{edu.degree}</strong> in {edu.field} — {edu.school}</span>
                    <span>{edu.gradDate}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
