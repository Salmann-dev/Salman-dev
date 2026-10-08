"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Terminal as TerminalIcon,
  Trash2,
  Maximize2,
  Minimize2,
  HelpCircle,
  User,
  Cpu,
  FolderGit2,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  AlertCircle
} from 'lucide-react';

export interface CommandEntry {
  id: string;
  command: string;
  timestamp: string;
  output: React.ReactNode;
}

const WELCOME_BANNER = (
  <div className="space-y-1.5 text-xs font-mono leading-relaxed mb-3">
    <div className="text-emerald-400 font-bold">
      Muhammad Salman — Portfolio Interactive Terminal [v1.0.0]
    </div>
    <div className="text-slate-400">
      Type <span className="text-emerald-400 font-semibold">&apos;help&apos;</span> to see all available commands, or navigate previous commands with <span className="text-slate-200 font-semibold">↑/↓</span> arrows.
    </div>
  </div>
);

export default function Terminal(): React.JSX.Element {
  const [history, setHistory] = useState<CommandEntry[]>([
    {
      id: 'welcome-init',
      command: 'welcome',
      timestamp: 'just now',
      output: WELCOME_BANNER,
    },
  ]);

  const [inputVal, setInputVal] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to latest output
  const scrollToBottom = useCallback(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  // Keep input focused when clicking anywhere inside terminal body
  const focusInput = () => {
    inputRef.current?.focus();
  };

  // Keyboard navigation through command history (Up/Down arrow keys)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandHistory.length) {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  // Local Command Processor using pure in-memory JavaScript switch
  const executeCommand = (cmd: string): React.ReactNode | 'CLEAR_COMMAND' => {
    const trimmed = cmd.trim();
    const normalized = trimmed.toLowerCase();

    switch (normalized) {
      case 'clear':
        return 'CLEAR_COMMAND';

      case 'help':
        return (
          <div className="space-y-2.5 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Available Commands:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-x-4 gap-y-1.5 pl-2">
              <span className="text-emerald-400 font-semibold">help</span>
              <span className="text-slate-400">Lists all available commands with short descriptions.</span>

              <span className="text-emerald-400 font-semibold">about</span>
              <span className="text-slate-400">Outputs bio for Muhammad Salman (Front-End / Full-Stack IT Student &amp; Developer).</span>

              <span className="text-emerald-400 font-semibold">skills</span>
              <span className="text-slate-400">Displays core tech stack (Next.js, React, JavaScript, Node.js, Tailwind CSS, Git).</span>

              <span className="text-emerald-400 font-semibold">projects</span>
              <span className="text-slate-400">Lists key portfolio projects (CopyForge, AI Resume Analyzer) with links.</span>

              <span className="text-emerald-400 font-semibold">contact</span>
              <span className="text-slate-400">Outputs email, GitHub, and LinkedIn links.</span>

              <span className="text-emerald-400 font-semibold">clear</span>
              <span className="text-slate-400">Clears past terminal output.</span>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <User className="w-3.5 h-3.5" />
              <span>Muhammad Salman — Bio &amp; Profile</span>
            </div>
            <p className="leading-relaxed pl-2 text-slate-300">
              Front-End / Full-Stack IT Student &amp; Developer pursuing studies at the <span className="text-white font-medium">University of Balochistan</span>.
              Specialized in engineering fast, responsive, and intuitive web applications with modern React, Next.js, and TypeScript.
              Passionate about elegant developer experiences, clean component architecture, and dark-themed UI systems.
            </p>
            <div className="pl-2 flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[11px] text-slate-400">
              <span>📍 Balochistan, Pakistan</span>
              <span>🎓 BS Information Technology (2023 – 2027)</span>
              <span>💼 Open to Roles &amp; Freelance Opportunities</span>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-2.5 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 text-sky-400 font-semibold">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Core Tech Stack &amp; Competencies:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-2">
              <div className="p-2.5 rounded bg-[#252526] border border-[#333333]">
                <div className="text-emerald-400 font-bold mb-1">Frontend Engineering</div>
                <div className="text-slate-400">Next.js, React, JavaScript (ES6+), TypeScript, Tailwind CSS, HTML5, CSS3</div>
              </div>
              <div className="p-2.5 rounded bg-[#252526] border border-[#333333]">
                <div className="text-sky-400 font-bold mb-1">Backend &amp; APIs</div>
                <div className="text-slate-400">Node.js, Express, REST APIs, Serverless Functions</div>
              </div>
              <div className="p-2.5 rounded bg-[#252526] border border-[#333333]">
                <div className="text-amber-300 font-bold mb-1">Version Control &amp; Tooling</div>
                <div className="text-slate-400">Git, GitHub, VS Code, npm, Vite, Vercel</div>
              </div>
              <div className="p-2.5 rounded bg-[#252526] border border-[#333333]">
                <div className="text-purple-400 font-bold mb-1">Design &amp; Practices</div>
                <div className="text-slate-400">Responsive UI, Component Architecture, Clean Code</div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-3 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 text-amber-300 font-semibold">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Featured Portfolio Projects:</span>
            </div>

            <div className="space-y-2.5 pl-2">
              {/* Project 1: CopyForge */}
              <div className="p-2.5 rounded bg-[#252526] border border-[#333333] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 font-bold text-[13px]">1. CopyForge</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-sans">
                    Full-Stack Web App
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  AI-powered copywriting web tool that creates tailored product descriptions and marketing copy for small businesses. Built with a serverless backend proxy for secure requests.
                </p>
                <div className="text-[11px] text-slate-400">
                  <span className="text-slate-300 font-semibold">Tech:</span> Next.js, React, Tailwind CSS, Serverless API
                </div>
                <div className="flex items-center gap-4 pt-1 text-[11px]">
                  <a
                    href="https://copyforge.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>🔗 Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/Salmann-dev/Copyforge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>💻 Source Code</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Project 2: AI Resume Analyzer */}
              <div className="p-2.5 rounded bg-[#252526] border border-[#333333] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-amber-300 font-bold text-[13px]">2. AI Resume Analyzer</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-400/10 text-emerald-300 border border-emerald-400/20 font-sans">
                    Python + Web App
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  Evaluates resumes against job descriptions, extracting text with pdfplumber and python-docx to generate match scores, missing keywords, and actionable recommendations.
                </p>
                <div className="text-[11px] text-slate-400">
                  <span className="text-slate-300 font-semibold">Tech:</span> Python, Flask, pdfplumber, python-docx, REST API
                </div>
                <div className="flex items-center gap-4 pt-1 text-[11px]">
                  <a
                    href="https://ai-resume-analyzer-vki0.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>🔗 Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://github.com/Salmann-dev/ai-resume-analyzer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <span>💻 Source Code</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2 text-sky-400 font-semibold">
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contact &amp; Connect Links:</span>
            </div>
            <div className="space-y-1.5 pl-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 w-20">Email:</span>
                <a
                  href="mailto:Salman.connect001@gmail.com"
                  className="text-blue-400 hover:underline font-semibold"
                >
                  Salman.connect001@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 w-20 flex items-center gap-1">
                  <Github className="w-3 h-3" /> GitHub:
                </span>
                <a
                  href="https://github.com/Salmann-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>https://github.com/Salmann-dev</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 w-20 flex items-center gap-1">
                  <Linkedin className="w-3 h-3" /> LinkedIn:
                </span>
                <a
                  href="https://www.linkedin.com/in/muhammad-salman-09693a289/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>https://linkedin.com/in/muhammad-salman-09693a289/</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-xs font-mono text-rose-400 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <div>
              <span>Command not found: <strong className="text-white">{trimmed}</strong>. Type <span className="text-emerald-400 font-semibold">&apos;help&apos;</span> for available commands.</span>
            </div>
          </div>
        );
    }
  };

  // Execute terminal command
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = inputVal.trim();
    if (!rawInput) return;

    // Save to command history
    setCommandHistory((prev) => [...prev, rawInput]);
    setHistoryIndex(-1);
    setInputVal('');

    const entryId = `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const result = executeCommand(rawInput);

    if (result === 'CLEAR_COMMAND') {
      setHistory([]);
      return;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: entryId,
        command: rawInput,
        timestamp: nowTime,
        output: result,
      },
    ]);
  };

  return (
    <div
      onClick={focusInput}
      className={`flex flex-col bg-[#1e1e1e] border border-[#2d2d2d] rounded-lg shadow-2xl overflow-hidden font-mono transition-all duration-200 ${
        isExpanded ? 'h-[620px]' : 'h-[440px]'
      }`}
    >
      {/* =======================================================================
          VS Code Terminal Tab Header Bar (#252526)
          ======================================================================= */}
      <div className="h-9 min-h-[36px] bg-[#252526] border-b border-[#1e1e1e] flex items-center justify-between px-3 select-none">
        {/* Left Tabs Group */}
        <div className="flex items-center gap-1">
          {/* Active Terminal Tab */}
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e1e] border-t-2 border-t-[#007acc] text-white text-xs font-medium rounded-t">
            <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Terminal</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#333333] text-slate-400">zsh</span>
          </div>

          {/* Secondary Visual Tabs like VS Code */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 text-slate-400 hover:text-slate-200 hover:bg-[#2a2a2d] text-xs cursor-pointer rounded transition-colors">
            <span>Output</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 text-slate-400 hover:text-slate-200 hover:bg-[#2a2a2d] text-xs cursor-pointer rounded transition-colors">
            <span>Debug Console</span>
          </div>
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 text-slate-400 hover:text-slate-200 hover:bg-[#2a2a2d] text-xs cursor-pointer rounded transition-colors">
            <span>Problems (0)</span>
          </div>
        </div>

        {/* Right Terminal Action Icons */}
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="hidden lg:inline text-[11px] text-slate-500 mr-2">
            Tip: Press ↑ / ↓ for history
          </span>

          <button
            type="button"
            title="Clear Terminal"
            onClick={(e) => {
              e.stopPropagation();
              setHistory([]);
            }}
            className="p-1 rounded hover:bg-[#3e3e42] hover:text-white transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            title={isExpanded ? 'Restore Size' : 'Maximize Panel'}
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 rounded hover:bg-[#3e3e42] hover:text-white transition-colors"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* =======================================================================
          Terminal Body Area (Dark Background #1e1e1e)
          ======================================================================= */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs text-slate-300 font-mono leading-relaxed scrollbar-thin scrollbar-thumb-[#3c3c3c]">
        {/* Output Log Entries */}
        {history.map((entry) => (
          <div key={entry.id} className="space-y-1.5">
            {/* Prompt Line */}
            {entry.command !== 'welcome' && (
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-400 font-semibold">salman@portfolio</span>
                <span className="text-slate-500">:</span>
                <span className="text-sky-400 font-semibold">~</span>
                <span className="text-slate-500">$</span>
                <span className="text-white font-medium">{entry.command}</span>
                <span className="text-[10px] text-slate-500 ml-auto">{entry.timestamp}</span>
              </div>
            )}

            {/* Output Node */}
            {entry.output && <div className="pl-0">{entry.output}</div>}
          </div>
        ))}

        {/* Active Command Input Line */}
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 pt-1">
          <label htmlFor="terminal-input" className="flex items-center gap-1 shrink-0 select-none">
            <span className="text-emerald-400 font-semibold">salman@portfolio:~$</span>
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
            autoCapitalize="off"
            placeholder="Type 'help' for available commands..."
            className="flex-1 bg-transparent text-white focus:outline-none text-xs font-mono placeholder-slate-600 caret-emerald-400"
          />
        </form>

        <div ref={terminalEndRef} />
      </div>

      {/* Quick Interactive Command Pills Footer */}
      <div className="px-3 py-1.5 bg-[#252526] border-t border-[#2d2d2d] flex items-center gap-2 overflow-x-auto select-none text-[11px] text-slate-400">
        <span className="text-slate-500 shrink-0">Commands:</span>
        {['help', 'about', 'skills', 'projects', 'contact', 'clear'].map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setInputVal(cmd);
              inputRef.current?.focus();
            }}
            className="px-2 py-0.5 rounded bg-[#1e1e1e] hover:bg-[#333333] hover:text-white text-sky-400 border border-[#333333] shrink-0 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
