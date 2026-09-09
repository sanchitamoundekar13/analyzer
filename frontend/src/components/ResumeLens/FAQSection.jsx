import React, { useState } from 'react';
import { ChevronDown, ShieldCheck } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How is the evidence-based score calculated?',
      a: 'Unlike arbitrary LLM wrappers, ResumeLens uses a deterministic 7-factor mathematical engine: ATS & Parsing (20%), Job Match (20%), Skills Coverage (20%), Experience Evidence (15%), Resume Structure (10%), Writing Quality (10%), and Education/Projects (5%). Every point gained or deducted is backed by verifiable text signals.'
    },
    {
      q: 'What does ATS mean and why does it matter?',
      a: 'Applicant Tracking Systems (ATS) are automated screening tools used by over 90% of companies (e.g. Workday, Greenhouse, Taleo) to filter incoming resumes. If your resume uses non-standard headings, multi-column tables, or lacks target keywords, the parser cannot extract your data and your application gets discarded before a human recruiter reads it.'
    },
    {
      q: 'Do you invent metrics or achievements in bullet rewrites?',
      a: 'Never. One of our core differentiators is our Zero-Fabrication pledge. We structure your experience using strong Action-Verb + Task + Outcome frameworks and clearly mark placeholders where you should insert your real metrics. Fabricating fake statistics (like "increased sales by 42%") creates severe interview risk.'
    },
    {
      q: 'How do you protect my resume and privacy?',
      a: 'Your resume is encrypted in transit and processed within secure, ephemeral execution sandboxes. We never sell your personal data, and we do NOT use your resume to train public AI models.'
    },
    {
      q: 'Is my resume stored permanently on your servers?',
      a: 'No. Resumes uploaded for free and standard scans are parsed in-memory and discarded once your analysis report session concludes.'
    },
    {
      q: 'Can I compare my resume against a specific target Job Description?',
      a: 'Yes! In the Analyzer Studio, you can paste any job description. ResumeLens calculates your overall match percentage, highlights missing required skills, and provides "Don\'t Add This" guardrails.'
    },
    {
      q: 'Which file formats are supported?',
      a: 'ResumeLens supports standard PDF (.pdf), Microsoft Word (.docx), and Plain Text (.txt, .md) documents up to 10MB.'
    },
    {
      q: 'How accurate is the score?',
      a: 'Our scoring rules are aligned with real recruiter heuristics and ATS parsing specifications across major corporate applicant portals.'
    },
    {
      q: 'Can I download or export my report?',
      a: 'Yes, you can click "Export PDF Report" from your Report Dashboard to download a printable diagnostic summary with score breakdowns and keyword checklists.'
    },
    {
      q: 'Does ResumeLens guarantee interviews?',
      a: 'While no software can guarantee an interview, optimizing your ATS compliance, keyword overlap, and quantified metrics dramatically increases your callback probability.'
    }
  ];

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We’ve Got Answers.
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            Everything you need to know about evidence-based scoring, privacy, and ATS optimization.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
