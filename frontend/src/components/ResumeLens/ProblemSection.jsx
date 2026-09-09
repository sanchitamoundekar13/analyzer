import React from 'react';
import { Search, FileText, Code2, Gauge, CheckCircle } from 'lucide-react';

export const ProblemSection = () => {
  const cards = [
    {
      number: '01',
      icon: Search,
      title: 'Unclear Strengths',
      description: 'You may have valuable experience but struggle to communicate it effectively.',
    },
    {
      number: '02',
      icon: FileText,
      title: 'Generic Resumes',
      description: "The same resume doesn't work equally well for every job.",
    },
    {
      number: '03',
      icon: Code2,
      title: 'Missing Keywords',
      description: 'Important skills from a target job may be missing from your resume.',
    },
    {
      number: '04',
      icon: Gauge,
      title: 'No Objective Feedback',
      description: 'It is difficult to know exactly what needs improvement before applying.',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-slate-900 tracking-tight leading-tight">
            A good resume isn't just about looking good.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Small issues in structure, wording, skills, and relevance can make a strong resume less effective.
          </p>
        </div>

        {/* 4 Feature / Problem Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.number}
                className="group relative bg-white rounded-2xl border border-slate-200/90 p-7 shadow-xs hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Row: Icon + Step Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                      <Icon className="w-5 h-5 stroke-[2]" />
                    </div>
                    <span className="text-sm font-bold text-slate-400 tracking-wider">
                      {card.number}
                    </span>
                  </div>

                  {/* Title & Body */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
