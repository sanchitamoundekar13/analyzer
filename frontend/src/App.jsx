import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar.jsx';
import { Footer } from './components/layout/Footer.jsx';

import { LandingPage } from './pages/LandingPage.jsx';
import { AnalyzePage } from './pages/AnalyzePage.jsx';
import { ReportPage } from './pages/ReportPage.jsx';
import { DashboardPage } from './pages/DashboardPage.jsx';
import { ResumeVaultPage } from './pages/ResumeVaultPage.jsx';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage.jsx';
import { JobsPage } from './pages/JobsPage.jsx';
import { JobDetailPage } from './pages/JobDetailPage.jsx';
import { ComparePage } from './pages/ComparePage.jsx';
import { CoverLetterPage } from './pages/CoverLetterPage.jsx';
import { PricingPage } from './pages/PricingPage.jsx';
import { SettingsPage } from './pages/SettingsPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { SignupPage } from './pages/SignupPage.jsx';

import { useResumeStore } from './store/useResumeStore.js';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [routeParam, setRouteParam] = useState(null);

  const { reports, userProfile } = useResumeStore();

  // Navigation handler
  const handleNavigate = (path) => {
    // Check if dynamic route
    if (path.startsWith('/report/')) {
      const id = path.replace('/report/', '');
      setRouteParam(id);
      setCurrentRoute('/report');
    } else if (path.startsWith('/jobs/')) {
      const id = path.replace('/jobs/', '');
      setRouteParam(id);
      setCurrentRoute('/jobs-detail');
    } else {
      setRouteParam(null);
      setCurrentRoute(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync browser back/forward or hash if needed
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      handleNavigate(hash);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/':
        return <LandingPage onNavigate={handleNavigate} sampleReport={reports[0]} />;
      case '/analyze':
        return <AnalyzePage onNavigate={handleNavigate} />;
      case '/report':
        return <ReportPage reportId={routeParam || reports[0]?.id} onNavigate={handleNavigate} />;
      case '/dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case '/resume':
        return <ResumeVaultPage onNavigate={handleNavigate} />;
      case '/resume-builder':
        return <ResumeBuilderPage onNavigate={handleNavigate} />;
      case '/jobs':
        return <JobsPage onNavigate={handleNavigate} />;
      case '/jobs-detail':
        return <JobDetailPage jobId={routeParam} onNavigate={handleNavigate} />;
      case '/compare':
        return <ComparePage onNavigate={handleNavigate} />;
      case '/cover-letter':
        return <CoverLetterPage onNavigate={handleNavigate} />;
      case '/pricing':
        return <PricingPage onNavigate={handleNavigate} />;
      case '/settings':
        return <SettingsPage onNavigate={handleNavigate} />;
      case '/login':
        return <LoginPage onNavigate={handleNavigate} />;
      case '/signup':
        return <SignupPage onNavigate={handleNavigate} />;
      default:
        return <LandingPage onNavigate={handleNavigate} sampleReport={reports[0]} />;
    }
  };

  const isAuthPage = currentRoute === '/login' || currentRoute === '/signup';

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 font-sans antialiased text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white">
      {!isAuthPage && (
        <Navbar
          activeRoute={currentRoute}
          onRouteChange={handleNavigate}
          userProfile={userProfile}
        />
      )}

      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {!isAuthPage && (
        <Footer onRouteChange={handleNavigate} />
      )}
    </div>
  );
}
