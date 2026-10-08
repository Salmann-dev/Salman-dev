import React from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink, Code } from 'lucide-react';

interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  location: string;
  type: string;
  description: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: 'Front-End / Full-Stack Developer',
    organization: 'Freelance & Independent Projects',
    period: '2023 — Present',
    location: 'Remote',
    type: 'Client & Open Source',
    description: [
      'Engineered responsive web applications and landing pages using Next.js, React, and Tailwind CSS.',
      'Integrated serverless APIs and third-party AI endpoints including Google Gemini API for AI-assisted tools.',
      'Optimized Core Web Vitals, achieving near-perfect Lighthouse scores across performance, accessibility, and SEO.',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Gemini API'],
  },
  {
    role: 'IT Student & Technical Contributor',
    organization: 'University of Balochistan',
    period: '2023 — Present',
    location: 'Quetta, Pakistan',
    type: 'Academic & Community',
    description: [
      'Pursuing BS in Information Technology with coursework in Data Structures, Database Systems, and Web Engineering.',
      'Active peer mentor and technical contributor for departmental coding workshops.',
      'Built and demonstrated full-stack prototype applications to simulate production-ready software cycles.',
    ],
    technologies: ['JavaScript', 'HTML5/CSS3', 'SQL', 'Git/GitHub', 'Algorithms'],
  },
];

export default function WorkExperience(): React.JSX.Element {
  return (
    <section id="work-experience" className="w-full bg-[#1e1e1e] text-[#cccccc] font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="border-b border-[#2d2d2d] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#569cd6] mb-2">
            <span>//</span>
            <span>src</span>
            <span>/</span>
            <span>app</span>
            <span>/</span>
            <span className="text-[#9cdcfe]">work-experience.tsx</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f3f3f3]">
            Experience &amp; Milestones
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#9cdcfe] font-mono">
            Professional background, freelance deliverables, and technical evolution.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-6">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#2d2d2d] bg-[#252526] p-6 shadow-md transition-all hover:border-[#3e3e42]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#2d2d2d]">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-amber-400" />
                    {exp.role}
                  </h3>
                  <p className="text-sm font-semibold text-cyan-400 font-mono mt-1">
                    {exp.organization}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#858585]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#1e1e1e] text-emerald-400 border border-emerald-500/20">
                    {exp.type}
                  </span>
                </div>
              </div>

              {/* Bullet Points */}
              <ul className="mt-4 space-y-2.5 text-sm text-[#cccccc]">
                {exp.description.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2.5">
                    <span className="text-cyan-400 font-mono mt-0.5 select-none">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Tags */}
              <div className="mt-5 pt-4 border-t border-[#2d2d2d] flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-[#858585] mr-1 flex items-center gap-1">
                  <Code className="w-3 h-3" /> Tech:
                </span>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded-md bg-[#1e1e1e] text-[#9cdcfe] border border-[#2d2d2d]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
