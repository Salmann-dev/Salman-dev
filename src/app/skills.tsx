import React from 'react';
import { Code2, Server, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  badge: string;
  skills: { name: string; level: string; note: string }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Core',
    icon: <Code2 className="w-5 h-5 text-cyan-400" />,
    badge: 'Core',
    skills: [
      { name: 'JavaScript (ES6+)', level: 'Advanced', note: 'Async/Await, Closures, DOM APIs' },
      { name: 'TypeScript', level: 'Proficient', note: 'Interfaces, Generics, Type Safety' },
      { name: 'HTML5 & Semantic Web', level: 'Expert', note: 'SEO Optimization, Accessibility (a11y)' },
      { name: 'CSS3 & Modern Layouts', level: 'Expert', note: 'Flexbox, CSS Grid, Custom Properties' },
    ],
  },
  {
    title: 'Frontend Frameworks',
    icon: <Sparkles className="w-5 h-5 text-blue-400" />,
    badge: 'Frontend',
    skills: [
      { name: 'React.js', level: 'Advanced', note: 'Hooks, Component Architecture, State' },
      { name: 'Next.js (App Router)', level: 'Proficient', note: 'SSR, Client Components, Server Actions' },
      { name: 'Tailwind CSS', level: 'Expert', note: 'Design Systems, Custom Utility Themes' },
      { name: 'Responsive Design', level: 'Expert', note: 'Mobile-First Layouts, Touch Targets' },
    ],
  },
  {
    title: 'Backend & APIs',
    icon: <Server className="w-5 h-5 text-emerald-400" />,
    badge: 'Backend',
    skills: [
      { name: 'Serverless Functions', level: 'Proficient', note: 'Vercel Serverless, Node.js Runtime' },
      { name: 'RESTful APIs', level: 'Advanced', note: 'JSON Contracts, Fetch, Axios' },
      { name: 'Google Gemini API', level: 'Proficient', note: 'AI Prompt Engineering & Streaming' },
      { name: 'Node.js & Express', level: 'Intermediate', note: 'Middleware, API Routing, Proxying' },
    ],
  },
  {
    title: 'DevOps & Tooling',
    icon: <Wrench className="w-5 h-5 text-amber-400" />,
    badge: 'DevOps',
    skills: [
      { name: 'Git & GitHub', level: 'Proficient', note: 'Branching, PRs, CI/CD Deployments' },
      { name: 'Vercel Deployment', level: 'Expert', note: 'Instant Previews, Env Configuration' },
      { name: 'VS Code & Tooling', level: 'Expert', note: 'Linters, Prettier, Debugging' },
      { name: 'Vite & Bundlers', level: 'Proficient', note: 'Fast HMR, Build Optimizations' },
    ],
  },
];

export default function Skills(): React.JSX.Element {
  return (
    <section id="skills" className="w-full bg-[#1e1e1e] text-[#cccccc] font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="border-b border-[#2d2d2d] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#569cd6] mb-2">
            <span>//</span>
            <span>src</span>
            <span>/</span>
            <span>app</span>
            <span>/</span>
            <span className="text-[#9cdcfe]">skills.tsx</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f3f3f3]">
            Skills &amp; Technical Arsenal
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#9cdcfe] font-mono">
            Front-End / Full-Stack Developer | Next.js, React, JavaScript, Node.js | Building AI-Powered Web Applications
          </p>
        </div>

        {/* 2x2 Grid of Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-xl border border-[#2d2d2d] bg-[#252526] p-6 shadow-md hover:border-[#3e3e42] transition-colors"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#2d2d2d] mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#1e1e1e] border border-[#2d2d2d]">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-white">
                    {category.title}
                  </h3>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1e1e1e] text-[#858585] border border-[#2d2d2d]">
                  {category.badge}
                </span>
              </div>

              <div className="space-y-3.5">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-[#1e1e1e]/60 border border-[#2d2d2d]/60 hover:border-[#3e3e42] transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="text-sm font-medium text-white font-mono">
                          {skill.name}
                        </span>
                      </div>
                      <p className="text-xs text-[#858585] ml-5.5 mt-0.5">
                        {skill.note}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400/90 self-start sm:self-center mt-1 sm:mt-0 pl-5.5 sm:pl-0">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
