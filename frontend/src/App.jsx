import React, { useState } from 'react';
import { Navbar } from './components/ResumeLens/Navbar';
import { HeroSection } from './components/ResumeLens/HeroSection';
import { FeaturePillTicker } from './components/ResumeLens/FeaturePillTicker';
import { ProblemSection } from './components/ResumeLens/ProblemSection';
import { HowItWorksSection } from './components/ResumeLens/HowItWorksSection';
import { PricingSection } from './components/ResumeLens/PricingSection';
import { FAQSection } from './components/ResumeLens/FAQSection';
import { Footer } from './components/ResumeLens/Footer';
import { FullReportModal } from './components/ResumeLens/FullReportModal';
import { UploadModal } from './components/ResumeLens/UploadModal';
import { DemoVideoModal } from './components/ResumeLens/DemoVideoModal';
import { SignInModal } from './components/ResumeLens/SignInModal';
import { RESUME_SAMPLES } from './data/resumeSamples';

export default function App() {
  const [activeResumeIndex, setActiveResumeIndex] = useState(0);
  const [activeResume, setActiveResume] = useState(RESUME_SAMPLES[0]);
  
  // Modals
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleSwitchSample = () => {
    const nextIdx = (activeResumeIndex + 1) % RESUME_SAMPLES.length;
    setActiveResumeIndex(nextIdx);
    setActiveResume(RESUME_SAMPLES[nextIdx]);
  };

  const handleSelectCustomResume = (customResume) => {
    setActiveResume(customResume);
    setIsReportOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white font-sans antialiased">
      {/* Top Navigation */}
      <Navbar
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenSignIn={() => setIsSignInOpen(true)}
      />

      {/* Main Page Body */}
      <main className="flex-1">
        {/* Hero Section with Live Analysis Card */}
        <HeroSection
          activeResume={activeResume}
          onOpenUpload={() => setIsUploadOpen(true)}
          onOpenReport={() => setIsReportOpen(true)}
          onOpenDemo={() => setIsDemoOpen(true)}
          onSwitchSample={handleSwitchSample}
        />

        {/* Feature Check Pill Bar */}
        <FeaturePillTicker />

        {/* Problem & Value Proposition Section (4 Numbered Cards) */}
        <ProblemSection />

        {/* How It Works (3 Steps) */}
        <HowItWorksSection onOpenUpload={() => setIsUploadOpen(true)} />

        {/* Pricing */}
        <PricingSection onOpenUpload={() => setIsUploadOpen(true)} />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <FullReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        resumeData={activeResume}
        onUploadNew={() => {
          setIsReportOpen(false);
          setIsUploadOpen(true);
        }}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSelectResume={handleSelectCustomResume}
      />

      <DemoVideoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
        onStartScan={() => setIsUploadOpen(true)}
      />

      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
      />
    </div>
  );
}
