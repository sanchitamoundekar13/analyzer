import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Shield, 
  Sliders, 
  Lock, 
  Save, 
  CheckCircle2, 
  Bell, 
  CreditCard 
} from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';
import { useResumeStore } from '../store/useResumeStore.js';

export function SettingsPage({ onNavigate }) {
  const { userProfile, updateUserProfile } = useResumeStore();
  const [name, setName] = useState(userProfile?.name || 'Bhavin');
  const [email, setEmail] = useState(userProfile?.email || 'bhavin@resumelens.ai');
  const [strictness, setStrictness] = useState(userProfile?.atsStrictness || 'Standard Enterprise (Taleo / Workday)');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateUserProfile({ name, email, atsStrictness: strictness });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Account & ATS Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your candidate profile, ATS parser strictness rules, and privacy controls.
          </p>
        </div>

        {/* Settings Form */}
        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                <CardTitle className="text-base">Candidate Profile</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase text-slate-500">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border mt-1 text-xs bg-white dark:bg-slate-900"
                  />
                </div>
                <div>
                  <label className="font-bold uppercase text-slate-500">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border mt-1 text-xs bg-white dark:bg-slate-900"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ATS Parser Strictness */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                <CardTitle className="text-base">ATS Parser Strictness Mode</CardTitle>
              </div>
              <CardDescription>
                Select which tier of enterprise ATS validation rules to apply during scans.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-4 text-xs">
              {[
                { label: "Standard Enterprise (Taleo / Workday / Greenhouse)", desc: "Strict single-column layout checks, standard heading verification, standard font sizes (Recommended)." },
                { label: "Modern Startup (Lever / Ashby / Rippling)", desc: "Moderate strictness; allows modern single-column layouts with lighter font hierarchy constraints." },
                { label: "Ultra-Strict Government / Defense (USAJobs / BrassRing)", desc: "Maximum layout penalties for tables, multi-columns, and decorative glyphs." }
              ].map((tier, idx) => (
                <label
                  key={idx}
                  className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                    strictness === tier.label
                      ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="ats-strictness"
                    value={tier.label}
                    checked={strictness === tier.label}
                    onChange={() => setStrictness(tier.label)}
                    className="mt-1 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{tier.label}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">{tier.desc}</span>
                  </div>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Privacy & Storage */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-base">Privacy & Model Training Guarantee</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <div className="flex items-center gap-2 text-emerald-600 font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Zero-Training Guarantee Active</span>
              </div>
              <p>
                Your resumes and parsed text are never used to train public language models or third-party AI systems. Document extraction is processed in a secure sandbox.
              </p>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-2">
            {saved ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Settings Saved Successfully!
              </span>
            ) : <span />}

            <Button type="submit" variant="glow" size="md" icon={Save}>
              Save Preferences
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
}
