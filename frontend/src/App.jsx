import React, { useState } from 'react';
import { Navbar } from './components/ResumeLens/Navbar';
import { HeroSection } from './components/ResumeLens/HeroSection';
import { FeaturePillTicker } from './components/ResumeLens/FeaturePillTicker';
import { ProblemSection } from './components/ResumeLens/ProblemSection';
import { HowItWorksSection } from './components/ResumeLens/HowItWorksSection';
import { PricingSection } from './components/ResumeLens/PricingSection';
import { FAQSection } from './components/ResumeLens/FAQSection';
import { Footer } from './components/ResumeLens/Footer';
import { AnimatedDemo } from './components/ResumeLens/AnimatedDemo';
import { SignInModal } from './components/ResumeLens/SignInModal';
import { AnalyzeStudio } from './components/Analyzer/AnalyzeStudio';
import { ReportDashboard } from './components/Report/ReportDashboard';
import { UserDashboard } from './components/Dashboard/UserDashboard';
import { RESUME_SAMPLES } from './data/resumeSamples';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home'); // home, analyze, report, dashboard, pricing, faqs
  const [activeResume, setActiveResume] = useState(RESUME_SAMPLES[0]);
  const [analyzedReport, setAnalyzedReport] = useState(null);
  
  // Modals
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleCompleteAnalysis = (resultData) => {
    setAnalyzedReport(resultData);
    setCurrentRoute('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSavedReport = (savedItem) => {
    // Convert saved item to report format
    const sample = RESUME_SAMPLES[0];
    setAnalyzedReport({
      ...sample,
      fileName: savedItem.name,
      role: savedItem.role,
      overallScore: savedItem.score,
      grade: savedItem.grade,
      analyzedAt: savedItem.date,
      dimensionScores: {
        ats: { current: savedItem.metrics.ats, max: 20, weight: '20%', label: 'ATS & Parsing' },
        jobMatch: { current: 16, max: 20, weight: '20%', label: 'Job Description Match' },
        skills: { current: savedItem.metrics.skills, max: 20, weight: '20%', label: 'Skills Coverage' },
        experience: { current: savedItem.metrics.experience, max: 15, weight: '15%', label: 'Experience Evidence' },
        structure: { current: 9, max: 10, weight: '10%', label: 'Resume Structure' },
        writing: { current: savedItem.metrics.writing, max: 10, weight: '10%', label: 'Writing Quality' },
        education: { current: 5, max: 5, weight: '5%', label: 'Education & Projects' },
      },
      skillsAnalysis: {
        detected: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'REST APIs', 'Git'],
        matched: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
        missing: ['Kubernetes', 'CI/CD Pipelines', 'Redis'],
        dontAdd: [],
        coveragePercent: 88
      },
      experienceAnalysis: {
        totalBullets: 6,
        quantifiedCount: 4,
        actionVerbCount: 5,
        bullets: []
      },
      atsAudit: {
        score: '95%',
        findings: [
          { pass: true, text: 'Clean single-column ATS format.' },
          { pass: true, text: 'Standard headings detected.' },
          { pass: true, text: 'Contact info clearly indexed.' }
        ]
      },
      pointDeductions: [
        {
          category: 'Experience Evidence',
          lost: 3,
          reason: '2 bullets lack measurable metrics.',
          fix: 'Add quantifiable outcomes to all experience bullets.'
        }
      ],
      bulletRewrites: sample.detailedFeedback.bulletRewrites.map(b => ({
        original: b.original,
        improved: b.improved,
        note: 'Quantified Action + Task + Result'
      })),
      contactInfo: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(555) 234-5678',
        linkedin: 'linkedin.com/in/johndoe'
      },
      sections: {
        contact: { detected: true },
        summary: { detected: true },
        experience: { detected: true },
        education: { detected: true },
        skills: { detected: true },
        projects: { detected: true },
        certifications: { detected: false }
      }
    });
    setCurrentRoute('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Top Navigation */}
      <Navbar
        currentRoute={currentRoute}
        onRouteChange={(route) => {
          setCurrentRoute(route);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSignIn={() => setIsSignInOpen(true)}
      />

      {/* Dynamic Route Content */}
      <main className="flex-1">
        
        {/* ROUTE 1: LANDING PAGE */}
        {currentRoute === 'home' && (
          <>
            <HeroSection
              activeResume={activeResume}
              onOpenUpload={() => setCurrentRoute('analyze')}
              onOpenReport={() => {
                handleOpenSavedReport({
                  name: activeResume.fileName,
                  role: activeResume.role,
                  score: activeResume.overallScore,
                  grade: activeResume.status,
                  date: activeResume.analyzedAt,
                  metrics: { ats: 18, skills: 16, experience: 17, writing: 7 }
                });
              }}
              onOpenDemo={() => setIsDemoOpen(true)}
              onSwitchSample={() => {
                const nextIdx = (RESUME_SAMPLES.indexOf(activeResume) + 1) % RESUME_SAMPLES.length;
                setActiveResume(RESUME_SAMPLES[nextIdx]);
              }}
            />
            <FeaturePillTicker />
            <ProblemSection />
            <HowItWorksSection onOpenUpload={() => setCurrentRoute('analyze')} />
            <PricingSection onOpenUpload={() => setCurrentRoute('analyze')} />
            <FAQSection />
          </>
        )}

        {/* ROUTE 2: ANALYZE STUDIO */}
        {currentRoute === 'analyze' && (
          <AnalyzeStudio onCompleteAnalysis={handleCompleteAnalysis} />
        )}

        {/* ROUTE 3: REPORT DASHBOARD */}
        {currentRoute === 'report' && (
          <ReportDashboard
            reportData={analyzedReport || activeResume}
            onNewScan={() => setCurrentRoute('analyze')}
            onCompareVersion={() => setCurrentRoute('dashboard')}
          />
        )}

        {/* ROUTE 4: USER DASHBOARD & VERSION COMPARISON */}
        {currentRoute === 'dashboard' && (
          <UserDashboard
            onOpenScan={() => setCurrentRoute('analyze')}
            onOpenReport={handleOpenSavedReport}
          />
        )}

        {/* ROUTE 5: PRICING */}
        {currentRoute === 'pricing' && (
          <div className="py-6">
            <PricingSection onOpenUpload={() => setCurrentRoute('analyze')} />
          </div>
        )}

        {/* ROUTE 6: FAQS */}
        {currentRoute === 'faqs' && (
          <div className="py-6">
            <FAQSection />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Animated Product Demo */}
      <AnimatedDemo
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onLaunchStudio={() => setCurrentRoute('analyze')}
      />

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </div>
  );
}
