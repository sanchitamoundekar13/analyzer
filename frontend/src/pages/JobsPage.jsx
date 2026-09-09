import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Building, 
  MapPin, 
  DollarSign 
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { useResumeStore } from '../store/useResumeStore.js';

export function JobsPage({ onNavigate }) {
  const { savedJobs, addJob } = useResumeStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newJD, setNewJD] = useState('');

  const filteredJobs = savedJobs.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const jobObj = {
      id: `job-${Date.now().toString(36)}`,
      title: newTitle,
      company: newCompany,
      location: "San Francisco, CA / Remote",
      salary_range: "$160,000 - $220,000",
      match_score: 84,
      required_skills: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST API", "Docker"],
      created_at: "Added just now",
      job_description: newJD || "Target engineering role requirements."
    };

    addJob(jobObj);
    setShowAddModal(false);
    setNewTitle('');
    setNewCompany('');
    setNewJD('');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Target Jobs & Role Matcher
              </h1>
              <Badge variant="blue" size="sm">{savedJobs.length} Positions</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Match your active resume against target job postings to uncover missing keywords and tailor bullet points.
            </p>
          </div>

          <Button
            variant="glow"
            size="sm"
            icon={Plus}
            onClick={() => setShowAddModal(true)}
          >
            Add Target Job
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search saved jobs by title, company, or tech stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => {
            const isHighMatch = job.match_score >= 85;
            return (
              <Card key={job.id} className="hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between">
                <div>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                          <Building className="w-5 h-5" />
                        </div>
                        <div>
                          <CardTitle className="text-sm sm:text-base">{job.title}</CardTitle>
                          <p className="text-xs text-slate-500">{job.company} • {job.location}</p>
                        </div>
                      </div>

                      <span className={`text-sm font-black px-2.5 py-1 rounded-lg border ${
                        isHighMatch
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                          : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                      }`}>
                        {job.match_score}% Match
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4 pt-4">
                    <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {job.job_description}
                    </div>

                    {/* Required Skills */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Required Skills</span>
                      <div className="flex flex-wrap gap-1">
                        {job.required_skills.slice(0, 5).map((sk, i) => (
                          <span key={i} className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">{job.created_at}</span>
                  <Button
                    variant="primary"
                    size="sm"
                    iconRight={ArrowRight}
                    onClick={() => onNavigate(`/jobs/${job.id}`)}
                  >
                    Match & Tailor
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Add Target Job Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border p-6 space-y-4">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Add Target Job Posting</h3>
              
              <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold uppercase text-slate-500">Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Backend Engineer"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-xs mt-1 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-slate-500">Company Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Stripe, Netflix, Google"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border text-xs mt-1 bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-slate-500">Job Description Text</label>
                  <textarea
                    rows={4}
                    placeholder="Paste job description qualifications..."
                    value={newJD}
                    onChange={(e) => setNewJD(e.target.value)}
                    className="w-full p-2.5 rounded-lg border text-xs mt-1 bg-white dark:bg-slate-900 resize-none"
                  />
                </div>
                
                <div className="pt-2 flex justify-end gap-2">
                  <Button variant="secondary" size="sm" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Save Job
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
