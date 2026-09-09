import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does ResumeLens calculate the evidence-based score?',
      a: 'Our scoring engine evaluates your resume across 6 critical dimensions: ATS parser readability, technical & hard skills presence, quantifiable impact in experience bullets, target job description relevance, education structure, and grammatical clarity.',
    },
    {
      q: 'Will my resume data remain secure and confidential?',
      a: 'Yes, 100%. We do not sell your personal information or store your resume beyond your active session. Files are parsed inside isolated ephemeral sandboxes.',
    },
    {
      q: 'What is ATS compatibility and why does it matter?',
      a: 'Applicant Tracking Systems (ATS) are automated screening tools used by over 90% of Fortune 500 companies. If your resume contains complex tables, non-standard fonts, or missing keywords, ATS parsers may misread or discard your application before a human recruiter sees it.',
    },
    {
      q: 'Can I test multiple roles or job descriptions?',
      a: 'Absolutely. You can paste any specific job description to benchmark your keyword match and receive tailored keyword recommendations.',
    },
    {
      q: 'Which file formats are supported?',
      a: 'We support standard PDF (.pdf), Microsoft Word (.docx, .doc), and plain text (.txt) files.',
    },
  ];

  return (
    <section id="faqs" className="py-20 lg:py-28 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We’ve Got Answers.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50">
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
