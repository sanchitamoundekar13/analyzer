import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  LayoutDashboard, 
  Layers, 
  Briefcase, 
  GitCompare, 
  PenTool, 
  Mail, 
  CreditCard, 
  Settings, 
  Menu, 
  X, 
  Upload, 
  User, 
  Bell 
} from 'lucide-react';
import { Button } from '../ui/Button.jsx';
import { Badge } from '../ui/Badge.jsx';

export function Navbar({ activeRoute = '/', onRouteChange, userProfile }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { label: 'Analyze', route: '/analyze', icon: Upload },
    { label: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
    { label: 'Resumes', route: '/resume', icon: Layers },
    { label: 'Builder', route: '/resume-builder', icon: PenTool },
    { label: 'Jobs', route: '/jobs', icon: Briefcase },
    { label: 'Compare', route: '/compare', icon: GitCompare },
    { label: 'Cover Letter', route: '/cover-letter', icon: Mail },
    { label: 'Pricing', route: '/pricing', icon: CreditCard },
  ];

  const handleNav = (route) => {
    onRouteChange(route);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white leading-none flex items-center gap-1">
                Resume<span className="text-blue-600">Lens</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              </span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">AI ATS Platform</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Icons & User Account */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-4 z-50 text-xs animate-in fade-in-50 duration-150">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800 font-bold text-slate-900 dark:text-white">
                    <span>Notifications</span>
                    <Badge variant="blue" size="sm">2 New</Badge>
                  </div>
                  <div className="mt-3 space-y-2 text-slate-600 dark:text-slate-300">
                    <div className="p-2 rounded-lg bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                      <p className="font-semibold text-blue-900 dark:text-blue-300">Resume scan complete</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Your score jumped from 78 to 86! (+8 pts)</p>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">New job match found</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Google SDE role match: 86%</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Pill / Settings */}
            <button
              onClick={() => handleNav('/settings')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 transition-all"
            >
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                {userProfile?.name ? userProfile.name[0] : 'B'}
              </div>
              <span>{userProfile?.name || 'Bhavin'}</span>
              <Badge variant="emerald" size="sm" className="hidden md:inline-flex">Pro</Badge>
            </button>

            {/* Quick Upload CTA */}
            <Button
              variant="primary"
              size="sm"
              icon={Upload}
              onClick={() => handleNav('/analyze')}
            >
              Scan Resume
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-1/2"
              onClick={() => handleNav('/settings')}
            >
              Settings
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="w-1/2"
              onClick={() => handleNav('/analyze')}
            >
              Scan Resume
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
