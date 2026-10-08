import React from 'react';

interface TechCategory {
  title: string;
  badge: string;
  color: string;
  borderColor: string;
  bgGlow: string;
  skills: string[];
}

const techCategories: TechCategory[] = [
  {
    title: 'Languages & Frameworks',
    badge: 'Frontend Core',
    color: 'text-[#4ec9b0]', // VS Code class/interface cyan-teal
    borderColor: 'border-[#4ec9b0]/30',
    bgGlow: 'hover:border-[#4ec9b0]/60 hover:shadow-[#4ec9b0]/10',
    skills: [
      'JavaScript (ES6+)',
      'React.js',
      'Next.js',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Backend & APIs',
    badge: 'Services & Cloud',
    color: 'text-[#569cd6]', // VS Code keyword blue
    borderColor: 'border-[#569cd6]/30',
    bgGlow: 'hover:border-[#569cd6]/60 hover:shadow-[#569cd6]/10',
    skills: [
      'Serverless Functions',
      'REST APIs',
      'Google Gemini API',
      'Third-Party API Integrations',
      'Node.js & Express',
    ],
  },
  {
    title: 'Tools & Deployment',
    badge: 'DevOps & Tooling',
    color: 'text-[#ce9178]', // VS Code string terracotta/orange
    borderColor: 'border-[#ce9178]/30',
    bgGlow: 'hover:border-[#ce9178]/60 hover:shadow-[#ce9178]/10',
    skills: [
      'Git & GitHub',
      'VS Code',
      'Vercel Platform',
      'WordPress & Elementor',
      'Vite & Build Tools',
    ],
  },
];

export default function AboutMe(): React.JSX.Element {
  return (
    <section id="about-me" className="w-full bg-[#1e1e1e] text-[#cccccc] font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Callout Status Banner */}
        <div className="relative overflow-hidden rounded-xl border border-emerald-500/30 bg-[#252526] p-4 sm:p-5 shadow-lg shadow-emerald-500/5 transition-all hover:border-emerald-500/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <span className="relative flex h-3 w-3 mt-1 sm:mt-0 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <div>
                <p className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                  Status // Open to Opportunities
                </p>
                <p className="text-sm sm:text-base text-[#e1e1e1] font-medium mt-0.5">
                  Actively seeking internship opportunities, entry-level developer roles, and open-source or team collaborations.
                </p>
              </div>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-emerald-500/10 px-4 py-2 text-xs sm:text-sm font-medium text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black transition-all duration-200 self-start sm:self-center"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Header Section */}
        <div className="border-b border-[#2d2d2d] pb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#569cd6] mb-2">
            <span>//</span>
            <span>src</span>
            <span>/</span>
            <span>app</span>
            <span>/</span>
            <span className="text-[#9cdcfe]">about-me.tsx</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#f3f3f3] font-sans">
            Muhammad Salman
          </h2>
          <p className="mt-2 text-base sm:text-lg text-[#4ec9b0] font-medium font-mono">
            Information Technology Student &amp; Front-End / Full-Stack Developer
          </p>
        </div>

        {/* Bio Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4 text-sm sm:text-base leading-relaxed text-[#cccccc]">
            <div className="rounded-xl border border-[#2d2d2d] bg-[#252526] p-6 space-y-4 shadow-sm">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#9cdcfe] font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#569cd6]" />
                Professional Summary &amp; Background
              </h3>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1 select-none font-mono">▹</span>
                  <span>
                    Information Technology student at the <strong>University of Balochistan</strong> with a strong focus on building fast, responsive, and user-centric web applications.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1 select-none font-mono">▹</span>
                  <span>
                    Specializing in front-end development using <strong>HTML, CSS, JavaScript, React, and Next.js</strong>, alongside serverless API integrations and custom UI design.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 mt-1 select-none font-mono">▹</span>
                  <span>
                    Learning by shipping—building, deploying, and refining real-world applications using modern workflows (<strong>Git, GitHub, Vercel</strong>).
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Academic & University Profile Card */}
          <div className="lg:col-span-4 rounded-xl border border-[#2d2d2d] bg-[#252526] p-6 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#9cdcfe] font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4ec9b0]" />
              Education &amp; Community
            </h3>
            
            <div className="space-y-3 text-sm">
              <div className="border-l-2 border-[#569cd6] pl-3 py-0.5">
                <p className="font-semibold text-white">BS Information Technology</p>
                <p className="text-xs text-[#9cdcfe]">University of Balochistan</p>
                <p className="text-xs text-[#808080] font-mono mt-0.5">2023 — Expected 2027</p>
              </div>

              <div className="border-l-2 border-[#4ec9b0] pl-3 py-0.5">
                <p className="font-semibold text-white">Computer Science Society</p>
                <p className="text-xs text-[#9cdcfe]">Technical Member</p>
                <p className="text-xs text-[#808080] font-mono mt-0.5">Workshops &amp; Peer Mentorship</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Column Structured Tech Stack Card Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-[#f3f3f3] font-sans flex items-center gap-2">
              <span className="text-[#569cd6] font-mono text-base">&lt;stack&gt;</span>
              Technical Arsenal
              <span className="text-[#569cd6] font-mono text-base">&lt;/stack&gt;</span>
            </h3>
            <span className="text-xs font-mono text-[#808080]">3 Domain Categories</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {techCategories.map((category) => (
              <div
                key={category.title}
                className={`flex flex-col justify-between rounded-xl border bg-[#252526] p-5 sm:p-6 transition-all duration-300 shadow-md ${category.borderColor} ${category.bgGlow}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1e1e1e] text-[#858585] border border-[#2d2d2d]">
                      {category.badge}
                    </span>
                    <span className={`text-xs font-mono font-bold ${category.color}`}>
                      0{techCategories.indexOf(category) + 1}
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-white mb-4">
                    {category.title}
                  </h4>

                  <ul className="space-y-2.5">
                    {category.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2 text-xs sm:text-sm text-[#cccccc]">
                        <span className={`font-mono text-xs ${category.color}`}>#</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-[#2d2d2d]/80 flex items-center justify-between text-xs font-mono text-[#808080]">
                  <span>production ready</span>
                  <span className="text-emerald-400">● 100%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
