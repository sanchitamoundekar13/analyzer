import React, { useState } from 'react';
import { Check, Zap, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { Badge } from '../components/ui/Badge.jsx';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card.jsx';

export function PricingPage({ onNavigate }) {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: "Free Candidate",
      price: "$0",
      description: "Essential ATS scan for individual job seekers.",
      features: [
        "3 Resume Scans / Month",
        "Deterministic 7-Dimension Score",
        "Real ATS Layout Compatibility Check",
        "Top 3 Missing Skill Alerts",
        "Evidence Vault Extraction"
      ],
      cta: "Get Started Free",
      popular: false,
      variant: "outline"
    },
    {
      name: "Pro Engineer",
      price: billingCycle === 'monthly' ? "$19" : "$14",
      period: "/ month",
      description: "Full AI optimization suite for active job hunting.",
      features: [
        "Unlimited Resume Scans & Versions",
        "Unlimited Target JD Match Analyses",
        "AI STAR Bullet Rewrites with Zero-Hallucination",
        "Side-by-Side Version Diff & Compare",
        "AI Tailored Cover Letter Generator",
        "ATS Resume Builder with PDF Export",
        "Priority Email & Slack Support"
      ],
      cta: "Start 7-Day Free Trial",
      popular: true,
      variant: "glow"
    },
    {
      name: "Career Accelerator",
      price: billingCycle === 'monthly' ? "$49" : "$39",
      period: "/ month",
      description: "For senior engineers, engineering leaders, and consultants.",
      features: [
        "Everything in Pro Tier",
        "Executive Leadership Metric Optimizer",
        "Multi-Role Career Path Simulator",
        "Live Mock Technical Recruiter Simulation",
        "Dedicated Career Coach Review (Quarterly)"
      ],
      cta: "Upgrade to Accelerator",
      popular: false,
      variant: "primary"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="blue" size="md">Transparent SaaS Pricing</Badge>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Invest in Your Next High-Paying Tech Role
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Join thousands of software engineers, product managers, and data scientists landing interviews at top companies.
          </p>

          {/* Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3 text-xs font-bold">
            <span className={billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-12 h-6 rounded-full bg-blue-600 p-1 transition-colors relative"
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={billingCycle === 'annual' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}>
              Annual Billing <span className="text-emerald-600 dark:text-emerald-400 font-bold">(Save 25%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <Card
              key={idx}
              className={`flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'border-2 border-blue-600 shadow-xl shadow-blue-500/10 scale-105 relative z-10'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div>
                <CardHeader>
                  {plan.popular && (
                    <div className="mb-2">
                      <span className="bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        Most Popular for Job Seekers
                      </span>
                    </div>
                  )}
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="pt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                    {plan.period && <span className="text-xs text-slate-500 font-semibold">{plan.period}</span>}
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 pt-4 text-xs">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 font-medium">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </CardContent>
              </div>

              <div className="p-6 pt-0">
                <Button
                  variant={plan.variant}
                  size="md"
                  className="w-full"
                  onClick={() => onNavigate('/signup')}
                >
                  {plan.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
