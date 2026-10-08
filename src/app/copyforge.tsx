import React from 'react';
import { Sparkles, ExternalLink, Github, CheckCircle2, Cpu, ArrowUpRight } from 'lucide-react';

export default function Copyforge(): React.JSX.Element {
  return (
    <section id="copyforge" className="w-full bg-[#1e1e1e] text-[#cccccc] font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb */}
        <div className="border-b border-[#2d2d2d] pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#569cd6] mb-2">
            <span>//</span>
            <span>src</span>
            <span>/</span>
            <span>projects</span>
            <span>/</span>
            <span className="text-[#ffdc8b]">copyforge.tsx</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  Featured Project
                </span>
                <span className="text-xs font-mono text-[#858585]">Full-Stack Web App</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                Copyforge — AI Copywriting &amp; Content Platform
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Salmann-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#252526] hover:bg-[#2d2d2d] text-xs font-mono text-white border border-[#2d2d2d] transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Source</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-mono font-medium text-white transition-colors"
              >
                <span>Live Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <p className="mt-3 text-sm sm:text-base text-[#9cdcfe]">
            Next.js, React, and Google Gemini API application built to generate high-converting marketing copy, social media threads, and blog outlines in seconds.
          </p>
        </div>

        {/* Project Showcase Bento Card */}
        <div className="rounded-xl border border-[#2d2d2d] bg-[#252526] p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Mock Browser Preview Header */}
          <div className="rounded-lg border border-[#2d2d2d] bg-[#1e1e1e] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#252526] border-b border-[#2d2d2d]">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <div className="px-3 py-0.5 rounded bg-[#1e1e1e] border border-[#2d2d2d] text-[11px] font-mono text-[#858585]">
                https://copyforge.app
              </div>
              <div className="w-12" />
            </div>

            {/* Mock Editor UI Inside */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#2d2d2d]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-white">Copyforge Workspace</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Gemini Flash 2.5 Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-lg bg-[#252526] border border-[#2d2d2d] space-y-2">
                  <span className="text-[#858585]">// Input Prompt &amp; Tone</span>
                  <p className="text-white">
                    Target: Tech SaaS Landing Page Hook<br />
                    Tone: Bold, energetic, high-conversion<br />
                    Audience: Developers &amp; Startup Founders
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#252526] border border-[#3e3e42] space-y-2">
                  <span className="text-[#4ec9b0]">// Output Generated Copy (Streaming)</span>
                  <p className="text-amber-200">
                    &quot;Stop writing boilerplate copy. Generate battle-tested landing pages, social threads, and emails that convert 3x higher.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Engineering Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-lg bg-[#1e1e1e] border border-[#2d2d2d] space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                <Cpu className="w-4 h-4" />
                <span>AI Prompt Pipeline</span>
              </div>
              <p className="text-xs text-[#cccccc] leading-relaxed">
                Structured multi-stage prompt generation pipeline utilizing serverless edge proxies to sanitize user input and stream responses with zero UI blocking.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#1e1e1e] border border-[#2d2d2d] space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" />
                <span>Sub-100ms UI Latency</span>
              </div>
              <p className="text-xs text-[#cccccc] leading-relaxed">
                Client-side caching with optimistic updates, local storage history persistence, and instantaneous clipboard formatting for Markdown &amp; HTML.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-[#1e1e1e] border border-[#2d2d2d] space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Production Workflows</span>
              </div>
              <p className="text-xs text-[#cccccc] leading-relaxed">
                Deployed on Vercel with automated GitHub CI/CD, strict TypeScript type checking, and zero-runtime Tailwind CSS styling.
              </p>
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div className="pt-4 border-t border-[#2d2d2d] flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#858585] mr-2">Tech Stack:</span>
            {['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Google Gemini API', 'Vercel Serverless', 'Lucide React'].map((item) => (
              <span
                key={item}
                className="text-xs font-mono px-2.5 py-1 rounded bg-[#1e1e1e] text-[#9cdcfe] border border-[#2d2d2d]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
