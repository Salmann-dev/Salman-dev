"use client";

import React, { useState } from 'react';
import {
  FileCode2,
  FileText,
  Briefcase,
  Zap,
  Mail,
  Sparkles,
  X,
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  Search,
  GitBranch,
  Bug,
  Blocks,
  Settings,
  User,
  PanelLeftClose,
  PanelLeftOpen,
  SplitSquareVertical,
  MoreHorizontal,
  Code2,
  ArrowRight,
  Copy,
  Check,
  FileJson,
  FileCog,
  FileSignature,
  File,
} from 'lucide-react';

import AboutMe from './about-me';
import Skills from './skills';
import WorkExperience from './work-experience';
import Copyforge from './copyforge';
import ContactMe from './contact-me';
import Terminal from './terminal';
import ActivityBar from './components/ActivityBar';

export interface EditorFile {
  id: string;
  name: string;
  folder: 'app' | 'projects' | 'root';
  icon: React.ReactNode;
  iconColor: string;
  badge?: string;
  type?: 'tsx' | 'json' | 'config' | 'markdown';
}

export const WORKSPACE_FILES: EditorFile[] = [
  {
    id: 'page.tsx',
    name: 'page.tsx',
    folder: 'app',
    icon: <FileCode2 className="w-4 h-4 text-[#61dafb]" />,
    iconColor: '#61dafb',
    type: 'tsx',
  },
  {
    id: 'about-me.tsx',
    name: 'about-me.tsx',
    folder: 'app',
    icon: <FileCode2 className="w-4 h-4 text-[#61dafb]" />,
    iconColor: '#61dafb',
    type: 'tsx',
  },
  {
    id: 'skills.tsx',
    name: 'skills.tsx',
    folder: 'app',
    icon: <FileCode2 className="w-4 h-4 text-[#61dafb]" />,
    iconColor: '#61dafb',
    type: 'tsx',
  },
  {
    id: 'work-experience.tsx',
    name: 'work-experience.tsx',
    folder: 'app',
    icon: <FileCode2 className="w-4 h-4 text-[#61dafb]" />,
    iconColor: '#61dafb',
    type: 'tsx',
  },
  {
    id: 'contact-me.tsx',
    name: 'contact-me.tsx',
    folder: 'app',
    icon: <FileCode2 className="w-4 h-4 text-[#61dafb]" />,
    iconColor: '#61dafb',
    type: 'tsx',
  },
  {
    id: 'terminal.tsx',
    name: 'terminal.tsx',
    folder: 'app',
    icon: <FileCode2 className="w-4 h-4 text-[#4ec9b0]" />,
    iconColor: '#4ec9b0',
    badge: 'Interactive',
    type: 'tsx',
  },
  {
    id: 'copyforge.tsx',
    name: 'copyforge.tsx',
    folder: 'projects',
    icon: <FileCode2 className="w-4 h-4 text-[#61dafb]" />,
    iconColor: '#61dafb',
    badge: 'Featured',
    type: 'tsx',
  },
  {
    id: 'package.json',
    name: 'package.json',
    folder: 'root',
    icon: <FileJson className="w-4 h-4 text-[#e5a93c]" />,
    iconColor: '#e5a93c',
    type: 'json',
  },
  {
    id: 'tsconfig.json',
    name: 'tsconfig.json',
    folder: 'root',
    icon: <FileCog className="w-4 h-4 text-[#3178c6]" />,
    iconColor: '#3178c6',
    type: 'config',
  },
  {
    id: 'README.md',
    name: 'README.md',
    folder: 'root',
    icon: <FileSignature className="w-4 h-4 text-[#42a5f5]" />,
    iconColor: '#42a5f5',
    type: 'markdown',
  },
];

export default function VSCodePortfolioEditor(): React.JSX.Element {
  // State Management for Tabs and Active View
  const [openTabs, setOpenTabs] = useState<string[]>([
    'page.tsx',
    'terminal.tsx',
    'about-me.tsx',
    'skills.tsx',
    'work-experience.tsx',
    'copyforge.tsx',
    'contact-me.tsx',
  ]);
  const [activeTab, setActiveTab] = useState<string>('page.tsx');

  // Sidebar and Folder Collapsible States (Collapsible sections strictly Title Cased)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState<boolean>(true);
  const [isOpenEditorsOpen, setIsOpenEditorsOpen] = useState<boolean>(true);
  const [isOutlineOpen, setIsOutlineOpen] = useState<boolean>(false);
  const [isTimelineOpen, setIsTimelineOpen] = useState<boolean>(false);
  const [isScriptsOpen, setIsScriptsOpen] = useState<boolean>(false);

  // Folder sub-trees
  const [isSrcOpen, setIsSrcOpen] = useState<boolean>(true);
  const [isAppFolderOpen, setIsAppFolderOpen] = useState<boolean>(true);
  const [isProjectsFolderOpen, setIsProjectsFolderOpen] = useState<boolean>(true);

  // Activity Bar Active Icon
  const [activeActivity, setActiveActivity] = useState<'explorer' | 'search' | 'git' | 'debug' | 'extensions'>('explorer');

  // 1. Sidebar File Click Handler
  const handleOpenFile = (fileName: string) => {
    if (!openTabs.includes(fileName)) {
      setOpenTabs((prev) => [...prev, fileName]);
    }
    setActiveTab(fileName);
  };

  // 2. Tab Selection Handler
  const handleSelectTab = (fileName: string) => {
    setActiveTab(fileName);
  };

  // 3. Tab Close Handler with Nearest Tab Fallback Focus
  const handleCloseTab = (e: React.MouseEvent, fileNameToClose: string) => {
    e.stopPropagation();
    const indexToClose = openTabs.indexOf(fileNameToClose);
    const updatedTabs = openTabs.filter((t) => t !== fileNameToClose);
    setOpenTabs(updatedTabs);

    // If active tab was closed, shift to the nearest remaining open tab
    if (activeTab === fileNameToClose) {
      if (updatedTabs.length > 0) {
        const nextIndex = Math.min(indexToClose, updatedTabs.length - 1);
        setActiveTab(updatedTabs[nextIndex]);
      } else {
        setActiveTab('');
      }
    }
  };

  // Helper to retrieve file meta
  const getFileMeta = (fileName: string) => {
    return WORKSPACE_FILES.find((f) => f.name === fileName);
  };

  // Render Component mapped to Active Tab
  const renderActiveContent = () => {
    switch (activeTab) {
      case 'page.tsx':
        return <HeroOverview onNavigate={handleOpenFile} />;
      case 'about-me.tsx':
        return <AboutMe />;
      case 'skills.tsx':
        return <Skills />;
      case 'work-experience.tsx':
        return <WorkExperience />;
      case 'copyforge.tsx':
        return <Copyforge />;
      case 'terminal.tsx':
        return (
          <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#2d2d2d] text-xs font-mono">
              <span className="text-[#858585]">Interactive VS Code Terminal</span>
              <span className="text-[#4ec9b0]">salman@portfolio</span>
            </div>
            <Terminal />
          </div>
        );
      case 'contact-me.tsx':
        return <ContactMe />;
      case 'package.json':
        return <PackageJsonView onNavigate={handleOpenFile} />;
      case 'tsconfig.json':
        return <TsConfigView />;
      case 'README.md':
        return <ReadmeView onNavigate={handleOpenFile} />;
      default:
        return (
          <EmptyEditorState
            onOpenFile={handleOpenFile}
            allFiles={WORKSPACE_FILES}
            onOpenAll={() => {
              setOpenTabs(WORKSPACE_FILES.slice(0, 6).map((f) => f.name));
              setActiveTab('page.tsx');
            }}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#181818] text-[#cccccc] font-sans antialiased select-none">
      
      {/* =========================================================================
          Top Title Bar (Official VS Code Header)
          ========================================================================= */}
      <header className="h-8 bg-[#181a24] border-b border-[#2b3042] flex items-center justify-between px-2 space-x-3 select-none z-30">
        <div className="flex items-center space-x-3">
          {/* Blue VS Code icon at the extreme TOP-LEFT corner */}
          <button
            type="button"
            className="flex items-center justify-center p-1 rounded hover:bg-white/10 transition-colors focus:outline-none"
            title="Visual Studio Code"
            aria-label="Visual Studio Code"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#007ACC]">
              <path
                d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.43-3.37a.997.997 0 0 0-1.37.17l-1.02 1.25a.997.997 0 0 0 .17 1.37l3.75 2.85-3.75 2.85a.997.997 0 0 0-.17 1.37l1.02 1.25c.34.42.95.49 1.37.17l4.43-3.37 9.46 8.63c.48.44 1.15.55 1.705.29l4.94-2.377c.52-.25.85-.78.85-1.36V3.947c0-.58-.33-1.11-.85-1.36zM18 17.5l-6.5-5.5L18 6.5v11z"
                fill="currentColor"
              />
            </svg>
          </button>

          {/* Menu bar immediately to the right */}
          <nav className="hidden md:flex items-center text-xs text-slate-300 gap-4">
            <button type="button" className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer">File</button>
            <button type="button" className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer">Edit</button>
            <button type="button" className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer">Selection</button>
            <button type="button" className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer">View</button>
            <button type="button" className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer">Go</button>
            <button type="button" className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer">Run</button>
            <button type="button" onClick={() => handleOpenFile('terminal.tsx')} className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer">Terminal</button>
            <button type="button" className="px-1.5 py-0.5 rounded hover:bg-white/10 hover:text-white transition-colors cursor-pointer">Help</button>
          </nav>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none hidden lg:flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Portfolio</span>
          <span>—</span>
          <span className="text-white">{activeTab || 'No open tabs'}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded hover:bg-white/10 hover:text-white text-slate-400 transition-colors"
            title="Toggle Primary Side Bar (Ctrl+B)"
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-3.5 h-3.5" />
            ) : (
              <PanelLeftOpen className="w-3.5 h-3.5" />
            )}
          </button>
          
          <div className="flex items-center gap-1.5 pl-2">
            <span className="w-3 h-3 rounded-full bg-[#3e3e42] hover:bg-[#ff5f56] transition-colors cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-[#3e3e42] hover:bg-[#ffbd2e] transition-colors cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-[#3e3e42] hover:bg-[#27c93f] transition-colors cursor-pointer" />
          </div>
        </div>
      </header>

      {/* =========================================================================
          Main Workspace: Activity Bar + Explorer Sidebar + Editor Area
          ========================================================================= */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Activity Bar (Far-Left Vertical Rail) */}
        <ActivityBar
          activeActivity={activeActivity}
          onSelectActivity={(activity) => {
            setActiveActivity(activity);
            setIsSidebarOpen(true);
          }}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenAccounts={() => handleOpenFile('contact-me.tsx')}
          onOpenSettings={() => handleOpenFile('package.json')}
        />

        {/* Explorer Sidebar */}
        {isSidebarOpen && (
          <aside className="w-64 min-w-[220px] max-w-[320px] bg-[#1e1e1e] border-r border-[#2d2d2d] flex flex-col z-10 transition-all select-none">
            
            {/* Explorer Header - strictly Title Cased */}
            <div className="h-9 px-3.5 flex items-center justify-between border-b border-[#2d2d2d] text-[11px] font-semibold text-[#bbbbbb]">
              <span>Explorer</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsAppFolderOpen(!isAppFolderOpen);
                    setIsProjectsFolderOpen(!isProjectsFolderOpen);
                  }}
                  className="p-1 rounded hover:bg-[#2d2d2d] text-[#858585] hover:text-white transition-colors"
                  title="Toggle Folders"
                >
                  <MoreHorizontal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Tree View Sections */}
            <div className="flex-1 overflow-y-auto py-1 text-xs">

              {/* 1. Open Editors Section - Title Cased */}
              <div className="border-b border-[#2d2d2d]/60 pb-1 mb-1">
                <div
                  onClick={() => setIsOpenEditorsOpen(!isOpenEditorsOpen)}
                  className="flex items-center gap-1.5 px-3 py-1 font-semibold text-[11px] text-[#bbbbbb] hover:bg-[#2a2d2e] rounded cursor-pointer"
                >
                  {isOpenEditorsOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#858585]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#858585]" />
                  )}
                  <span>Open editors</span>
                  <span className="text-[10px] text-[#858585] ml-auto font-mono">
                    {openTabs.length}
                  </span>
                </div>

                {isOpenEditorsOpen && (
                  <div className="pl-4 pr-1 space-y-0.5 mt-0.5">
                    {openTabs.length === 0 ? (
                      <div className="px-3 py-1 text-[11px] text-[#6e6e6e] italic">
                        No open editors
                      </div>
                    ) : (
                      openTabs.map((fileName) => {
                        const isCurrent = activeTab === fileName;
                        const meta = getFileMeta(fileName);
                        return (
                          <div
                            key={`opened-${fileName}`}
                            onClick={() => handleOpenFile(fileName)}
                            className={`group flex items-center justify-between px-2 py-1 rounded cursor-pointer transition-colors ${
                              isCurrent
                                ? 'bg-[#37373d] text-white font-medium'
                                : 'text-[#969696] hover:bg-[#2a2d2e] hover:text-[#cccccc]'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {meta?.icon || <FileCode2 className="w-3.5 h-3.5 text-[#61dafb]" />}
                              <span className="truncate font-mono text-xs">{fileName}</span>
                            </div>
                            <button
                              type="button"
                              aria-label={`Close ${fileName}`}
                              onClick={(e) => handleCloseTab(e, fileName)}
                              className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-[#3e3e42] text-[#858585] hover:text-white"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>

              {/* 2. Portfolio Project Accordion - Title Cased */}
              <div className="px-1.5 py-0.5">
                <div
                  onClick={() => setIsPortfolioOpen(!isPortfolioOpen)}
                  className="flex items-center gap-1.5 px-2 py-1 font-semibold text-[11px] text-[#cccccc] hover:bg-[#2a2d2e] rounded cursor-pointer"
                >
                  {isPortfolioOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#858585]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#858585]" />
                  )}
                  <span>Portfolio</span>
                </div>

                {isPortfolioOpen && (
                  <div className="pl-2 mt-0.5 space-y-0.5 font-mono">
                    
                    {/* src Folder */}
                    <div className="space-y-0.5">
                      <div
                        onClick={() => setIsSrcOpen(!isSrcOpen)}
                        className="flex items-center gap-1.5 px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e] rounded cursor-pointer"
                      >
                        {isSrcOpen ? (
                          <ChevronDown className="w-3.5 h-3.5 text-[#858585]" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-[#858585]" />
                        )}
                        {isSrcOpen ? (
                          <FolderOpen className="w-3.5 h-3.5 text-[#525df3]" />
                        ) : (
                          <Folder className="w-3.5 h-3.5 text-[#525df3]" />
                        )}
                        <span className="font-sans font-medium text-xs">src</span>
                      </div>

                      {isSrcOpen && (
                        <div className="pl-3 space-y-0.5 border-l border-[#2d2d2d] ml-3">
                          
                          {/* app Folder */}
                          <div className="space-y-0.5">
                            <div
                              onClick={() => setIsAppFolderOpen(!isAppFolderOpen)}
                              className="flex items-center gap-1.5 px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e] rounded cursor-pointer"
                            >
                              {isAppFolderOpen ? (
                                <ChevronDown className="w-3.5 h-3.5 text-[#858585]" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-[#858585]" />
                              )}
                              {isAppFolderOpen ? (
                                <FolderOpen className="w-3.5 h-3.5 text-[#61dafb]" />
                              ) : (
                                <Folder className="w-3.5 h-3.5 text-[#61dafb]" />
                              )}
                              <span className="font-sans font-medium text-xs">app</span>
                            </div>

                            {/* Files under src/app */}
                            {isAppFolderOpen && (
                              <div className="pl-4 space-y-0.5 border-l border-[#2d2d2d] ml-3">
                                {WORKSPACE_FILES.filter((f) => f.folder === 'app').map((file) => {
                                  const isCurrent = activeTab === file.name;
                                  return (
                                    <button
                                      key={file.id}
                                      type="button"
                                      onClick={() => handleOpenFile(file.name)}
                                      className={`w-full flex items-center justify-between px-2 py-1 rounded text-left transition-colors group ${
                                        isCurrent
                                          ? 'bg-[#37373d] text-white font-medium'
                                          : 'text-[#969696] hover:bg-[#2a2d2e] hover:text-[#cccccc]'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 truncate">
                                        {file.icon}
                                        <span className="truncate">{file.name}</span>
                                      </div>
                                      {openTabs.includes(file.name) && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80 group-hover:scale-125 transition-transform" />
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* projects Folder (Single featured project: Copyforge) */}
                          <div className="space-y-0.5 pt-0.5">
                            <div
                              onClick={() => setIsProjectsFolderOpen(!isProjectsFolderOpen)}
                              className="flex items-center gap-1.5 px-2 py-1 text-[#cccccc] hover:bg-[#2a2d2e] rounded cursor-pointer"
                            >
                              {isProjectsFolderOpen ? (
                                <ChevronDown className="w-3.5 h-3.5 text-[#858585]" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-[#858585]" />
                              )}
                              {isProjectsFolderOpen ? (
                                <FolderOpen className="w-3.5 h-3.5 text-[#ffdc8b]" />
                              ) : (
                                <Folder className="w-3.5 h-3.5 text-[#ffdc8b]" />
                              )}
                              <span className="font-sans font-medium text-xs">projects</span>
                            </div>

                            {/* Files under src/projects */}
                            {isProjectsFolderOpen && (
                              <div className="pl-4 space-y-0.5 border-l border-[#2d2d2d] ml-3">
                                {WORKSPACE_FILES.filter((f) => f.folder === 'projects').map((file) => {
                                  const isCurrent = activeTab === file.name;
                                  return (
                                    <button
                                      key={file.id}
                                      type="button"
                                      onClick={() => handleOpenFile(file.name)}
                                      className={`w-full flex items-center justify-between px-2 py-1 rounded text-left transition-colors group ${
                                        isCurrent
                                          ? 'bg-[#37373d] text-white font-medium'
                                          : 'text-[#969696] hover:bg-[#2a2d2e] hover:text-[#cccccc]'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2 truncate">
                                        {file.icon}
                                        <span className="truncate">{file.name}</span>
                                      </div>
                                      {file.badge && (
                                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-300 font-sans border border-amber-400/20">
                                          {file.badge}
                                        </span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                        </div>
                      )}
                    </div>

                    {/* Root files (JSON icons & Config gear icons) */}
                    <div className="pt-1 space-y-0.5">
                      {WORKSPACE_FILES.filter((f) => f.folder === 'root').map((file) => {
                        const isCurrent = activeTab === file.name;
                        return (
                          <button
                            key={file.id}
                            type="button"
                            onClick={() => handleOpenFile(file.name)}
                            className={`w-full flex items-center justify-between px-2 py-1 rounded text-left transition-colors group ${
                              isCurrent
                                ? 'bg-[#37373d] text-white font-medium'
                                : 'text-[#969696] hover:bg-[#2a2d2e] hover:text-[#cccccc]'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {file.icon}
                              <span className="truncate">{file.name}</span>
                            </div>
                            {openTabs.includes(file.name) && (
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80 group-hover:scale-125 transition-transform" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                  </div>
                )}
              </div>

              {/* 3. Outline Section - Title Cased */}
              <div className="border-t border-[#2d2d2d]/60 pt-1 mt-2">
                <div
                  onClick={() => setIsOutlineOpen(!isOutlineOpen)}
                  className="flex items-center gap-1.5 px-3 py-1 font-semibold text-[11px] text-[#bbbbbb] hover:bg-[#2a2d2e] rounded cursor-pointer"
                >
                  {isOutlineOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#858585]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#858585]" />
                  )}
                  <span>Outline</span>
                </div>
                {isOutlineOpen && (
                  <div className="pl-6 pr-2 py-1 space-y-1 text-[11px] font-mono text-[#858585]">
                    <div className="hover:text-white cursor-pointer truncate">
                      # Muhammad Salman (Hero)
                    </div>
                    <div className="hover:text-white cursor-pointer truncate">
                      # About Me &amp; Background
                    </div>
                    <div className="hover:text-white cursor-pointer truncate">
                      # Skills &amp; Stack Categories
                    </div>
                    <div className="hover:text-white cursor-pointer truncate">
                      # Experience &amp; Deliverables
                    </div>
                    <div className="hover:text-white cursor-pointer truncate">
                      # Copyforge (Featured Project)
                    </div>
                    <div className="hover:text-white cursor-pointer truncate">
                      # Contact Information
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Timeline Section - Title Cased */}
              <div className="border-t border-[#2d2d2d]/60 pt-1 mt-1">
                <div
                  onClick={() => setIsTimelineOpen(!isTimelineOpen)}
                  className="flex items-center gap-1.5 px-3 py-1 font-semibold text-[11px] text-[#bbbbbb] hover:bg-[#2a2d2e] rounded cursor-pointer"
                >
                  {isTimelineOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#858585]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#858585]" />
                  )}
                  <span>Timeline</span>
                </div>
                {isTimelineOpen && (
                  <div className="pl-6 pr-2 py-1 space-y-1 text-[11px] font-mono text-[#858585]">
                    <div className="flex items-center justify-between hover:text-white cursor-pointer">
                      <span>Git: Initial commit</span>
                      <span className="text-[10px] text-[#6e6e6e]">3d ago</span>
                    </div>
                    <div className="flex items-center justify-between hover:text-white cursor-pointer">
                      <span>Git: Add Copyforge project</span>
                      <span className="text-[10px] text-[#6e6e6e]">1d ago</span>
                    </div>
                    <div className="flex items-center justify-between hover:text-white cursor-pointer">
                      <span>Git: Title Casing UI Polish</span>
                      <span className="text-[10px] text-[#6e6e6e]">Just now</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 5. Scripts Section - Title Cased */}
              <div className="border-t border-[#2d2d2d]/60 pt-1 mt-1">
                <div
                  onClick={() => setIsScriptsOpen(!isScriptsOpen)}
                  className="flex items-center gap-1.5 px-3 py-1 font-semibold text-[11px] text-[#bbbbbb] hover:bg-[#2a2d2e] rounded cursor-pointer"
                >
                  {isScriptsOpen ? (
                    <ChevronDown className="w-3.5 h-3.5 text-[#858585]" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-[#858585]" />
                  )}
                  <span>Scripts</span>
                </div>
                {isScriptsOpen && (
                  <div className="pl-6 pr-2 py-1 space-y-1 text-[11px] font-mono text-[#858585]">
                    <div className="flex items-center gap-2 hover:text-[#4ec9b0] cursor-pointer">
                      <span className="text-emerald-400">▶</span>
                      <span>npm run dev</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-[#4ec9b0] cursor-pointer">
                      <span className="text-emerald-400">▶</span>
                      <span>npm run build</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-[#4ec9b0] cursor-pointer">
                      <span className="text-emerald-400">▶</span>
                      <span>npm run lint</span>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </aside>
        )}

        {/* =======================================================================
            Editor Main Container (Tabs Bar + Scrollable Content Viewport)
            ======================================================================= */}
        <main className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden min-w-0">
          
          {/* Top Tabs Bar */}
          <div className="h-9 min-h-[36px] bg-[#252526] border-b border-[#1e1e1e] flex items-center justify-between overflow-x-auto overflow-y-hidden select-none z-10 scrollbar-none">
            {/* Tabs List */}
            <div className="flex items-center h-full min-w-0 flex-1">
              {openTabs.map((tabFileName) => {
                const isActive = activeTab === tabFileName;
                const meta = getFileMeta(tabFileName);

                return (
                  <div
                    key={tabFileName}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectTab(tabFileName)}
                    className={`group relative flex items-center gap-2 h-full px-3.5 border-r border-[#1e1e1e] cursor-pointer text-xs font-mono whitespace-nowrap transition-colors ${
                      isActive
                        ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500 font-medium'
                        : 'bg-[#2d2d2d] text-[#969696] hover:bg-[#252526] hover:text-[#cccccc] border-t-2 border-t-transparent'
                    }`}
                  >
                    {/* Matching file icon with appropriate type coloring */}
                    <span className="flex-shrink-0">
                      {meta?.icon || <FileCode2 className="w-3.5 h-3.5 text-[#61dafb]" />}
                    </span>

                    {/* File Name */}
                    <span>{tabFileName}</span>

                    {/* Close Tab (X Button) with hover reveal & stopping propagation */}
                    <button
                      type="button"
                      aria-label={`Close ${tabFileName}`}
                      onClick={(e) => handleCloseTab(e, tabFileName)}
                      className={`ml-1.5 p-0.5 rounded transition-all flex items-center justify-center hover:bg-[#3e3e42] hover:text-white ${
                        isActive
                          ? 'opacity-80 hover:opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Right Tab Bar Actions */}
            <div className="flex items-center gap-1 px-2 border-l border-[#1e1e1e] bg-[#252526]">
              <button
                type="button"
                className="p-1 rounded hover:bg-[#3e3e42] hover:text-white text-[#858585] transition-colors"
                title="Split Editor Right"
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="p-1 rounded hover:bg-[#3e3e42] hover:text-white text-[#858585] transition-colors"
                title="More Actions"
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Breadcrumb Path Bar */}
          {activeTab && (
            <div className="h-6 px-4 bg-[#1e1e1e] border-b border-[#2d2d2d] flex items-center gap-1.5 text-[11px] font-mono text-[#858585]">
              <span>Portfolio</span>
              <span>/</span>
              <span>{getFileMeta(activeTab)?.folder || 'app'}</span>
              <span>/</span>
              <span className="text-[#cccccc]">{activeTab}</span>
            </div>
          )}

          {/* Scrollable Editor Viewport */}
          <div className="flex-1 overflow-y-auto bg-[#1e1e1e] relative">
            {renderActiveContent()}
          </div>

          {/* Bottom VS Code Status Bar */}
          <footer className="h-6 min-h-[24px] bg-[#007acc] text-white flex items-center justify-between px-3 text-[11px] font-mono select-none z-20">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-semibold">
                <GitBranch className="w-3 h-3" />
                <span>main*</span>
              </span>
              <span className="hidden sm:inline">0 errors, 0 warnings</span>
              <span className="hidden md:inline">● UTF-8</span>
            </div>

            <div className="flex items-center gap-4">
              <span>TypeScript JSX</span>
              <span className="hidden sm:inline">Prettier</span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span>Available for Hire</span>
              </span>
            </div>
          </footer>

        </main>
      </div>

    </div>
  );
}

{/* =========================================================================
    Empty State View (When all tabs are closed)
    ========================================================================= */}
interface EmptyEditorStateProps {
  onOpenFile: (fileName: string) => void;
  allFiles: EditorFile[];
  onOpenAll: () => void;
}

function EmptyEditorState({
  onOpenFile,
  allFiles,
  onOpenAll,
}: EmptyEditorStateProps): React.JSX.Element {
  return (
    <div className="h-full min-h-[70vh] flex flex-col items-center justify-center p-8 text-center text-[#858585]">
      <div className="w-16 h-16 rounded-2xl bg-[#252526] border border-[#2d2d2d] flex items-center justify-center mb-4 text-[#007acc] shadow-lg">
        <FileCode2 className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-bold text-white mb-2">
        No open editor tabs
      </h3>
      <p className="max-w-md text-sm text-[#858585] mb-6 leading-relaxed">
        Select a file from the explorer sidebar to open and view components, or use the quick links below.
      </p>

      {/* Quick File Launchers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-lg w-full mb-6">
        {allFiles.map((file) => (
          <button
            key={file.id}
            type="button"
            onClick={() => onOpenFile(file.name)}
            className="flex items-center gap-2 p-2.5 rounded-lg bg-[#252526] border border-[#2d2d2d] hover:border-blue-500/50 hover:bg-[#2d2d2d] text-left text-xs font-mono text-[#cccccc] hover:text-white transition-all"
          >
            {file.icon}
            <span className="truncate">{file.name}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onOpenAll}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#007acc] hover:bg-[#0062a3] text-white text-xs font-mono font-medium transition-colors"
      >
        <span>Open All Tabs</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

{/* =========================================================================
    Package.json Viewer Component
    ========================================================================= */}
function PackageJsonView({ onNavigate }: { onNavigate: (file: string) => void }): React.JSX.Element {
  const jsonContent = `{
  "name": "salman-portfolio",
  "version": "1.0.0",
  "private": true,
  "description": "Muhammad Salman - Front-End & Full-Stack Developer Portfolio",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.344.0"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "typescript": "^5.3.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0"
  }
}`;

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2 text-white">
          <FileJson className="w-4 h-4 text-[#e5a93c]" />
          <span className="font-semibold text-sm">package.json</span>
        </div>
        <span className="text-[#858585]">JSON</span>
      </div>

      <pre className="p-4 rounded-lg bg-[#252526] border border-[#2d2d2d] text-[#ce9178] overflow-x-auto leading-relaxed">
        <code>{jsonContent}</code>
      </pre>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => onNavigate('page.tsx')}
          className="px-3 py-1.5 rounded bg-[#007acc] hover:bg-[#0062a3] text-white text-xs font-medium transition-colors"
        >
          Return to page.tsx
        </button>
      </div>
    </div>
  );
}

{/* =========================================================================
    tsconfig.json Viewer Component
    ========================================================================= */}
function TsConfigView(): React.JSX.Element {
  const tsContent = `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;

  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-[#2d2d2d]">
        <div className="flex items-center gap-2 text-white">
          <FileCog className="w-4 h-4 text-[#3178c6]" />
          <span className="font-semibold text-sm">tsconfig.json</span>
        </div>
        <span className="text-[#858585]">TypeScript Configuration</span>
      </div>

      <pre className="p-4 rounded-lg bg-[#252526] border border-[#2d2d2d] text-[#9cdcfe] overflow-x-auto leading-relaxed">
        <code>{tsContent}</code>
      </pre>
    </div>
  );
}

{/* =========================================================================
    README.md Viewer Component
    ========================================================================= */}
function ReadmeView({ onNavigate }: { onNavigate: (file: string) => void }): React.JSX.Element {
  return (
    <div className="p-6 sm:p-8 max-w-4xl mx-auto space-y-6 font-sans text-sm text-[#cccccc]">
      <div className="flex items-center justify-between pb-3 border-b border-[#2d2d2d] font-mono text-xs">
        <div className="flex items-center gap-2 text-white">
          <FileSignature className="w-4 h-4 text-[#42a5f5]" />
          <span className="font-semibold text-sm">README.md</span>
        </div>
        <span className="text-[#858585]">Markdown Preview</span>
      </div>

      <div className="prose prose-invert max-w-none space-y-4">
        <h1 className="text-2xl font-bold text-white border-b border-[#2d2d2d] pb-2">
          Muhammad Salman | Developer Portfolio
        </h1>
        <p className="text-[#969696] leading-relaxed">
          Interactive VS Code theme developer portfolio showcasing projects, technical competencies, and background.
        </p>

        <h2 className="text-lg font-semibold text-white pt-2">Featured Project</h2>
        <ul className="list-disc pl-5 space-y-1 text-[#cccccc]">
          <li>
            <strong className="text-amber-400">Copyforge:</strong> AI-powered copywriting tool built with Next.js, React, and Gemini API.
          </li>
        </ul>

        <div className="pt-4">
          <button
            type="button"
            onClick={() => onNavigate('copyforge.tsx')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#007acc] hover:bg-[#0062a3] text-white text-xs font-mono font-medium transition-colors"
          >
            <span>View Copyforge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

{/* =========================================================================
    Hero Overview Component (Rendered by page.tsx)
    ========================================================================= */}
interface HeroOverviewProps {
  onNavigate: (fileName: string) => void;
}

function HeroOverview({ onNavigate }: HeroOverviewProps): React.JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('justsalmannn001@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-[#1e1e1e] text-[#cccccc] font-sans py-12 px-4 sm:px-8 max-w-6xl mx-auto space-y-12">
      
      {/* Code Header Comment */}
      <div className="font-mono text-xs text-[#858585] space-y-1 pb-4 border-b border-[#2d2d2d]">
        <p className="text-[#6a9955]">/**</p>
        <p className="text-[#6a9955]"> * @author Muhammad Salman</p>
        <p className="text-[#6a9955]"> * @role Front-End / Full-Stack Developer &amp; IT Student</p>
        <p className="text-[#6a9955]"> * @location Quetta, Pakistan (Open for Remote Worldwide)</p>
        <p className="text-[#6a9955]"> */</p>
      </div>

      {/* Main Hero Card */}
      <div className="space-y-6">
        
        {/* Exact User Requested Status Pill */}
        <div className="flex items-center gap-2 text-sm md:text-base font-medium text-emerald-400 mb-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Looking for a job</span>
          <span className="text-slate-500">/</span>
          <span className="text-blue-400 font-semibold">
            Front-End / Full-Stack Developer
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
          Muhammad Salman
        </h1>

        {/* Exact User Requested Bio Paragraph */}
        <p className="text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed mb-6">
          Next.js, React, JavaScript, Node.js | Building AI-Powered Web Applications. Information Technology student building responsive, modern websites and web applications while taking on freelance projects.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onNavigate('contact-me.tsx')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-colors shadow-lg shadow-blue-500/20"
          >
            <span>Let&apos;s Connect</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('copyforge.tsx')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#252526] hover:bg-[#2d2d2d] text-white border border-[#2d2d2d] text-sm font-medium transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Featured: Copyforge</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('terminal.tsx')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#252526] hover:bg-[#2d2d2d] text-white border border-[#2d2d2d] text-sm font-medium transition-colors"
          >
            <span className="text-[#4ec9b0] font-mono font-bold">&gt;_</span>
            <span>AI Terminal</span>
          </button>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#252526] hover:bg-[#2d2d2d] text-[#858585] hover:text-white border border-[#2d2d2d] text-xs font-mono transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied Email!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>justsalmannn001@gmail.com</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Interactive File Tour Cards */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#2d2d2d]">
          <h2 className="text-sm font-mono text-[#9cdcfe] font-semibold flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span>Explore Portfolio Files</span>
          </h2>
          <span className="text-xs font-mono text-[#858585]">Click to open tab</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            onClick={() => onNavigate('copyforge.tsx')}
            className="p-5 rounded-xl border border-amber-500/30 bg-[#252526] hover:border-amber-400/60 hover:bg-[#2a2a2d] transition-all cursor-pointer group shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Single Featured Project
              </span>
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
              copyforge.tsx
            </h3>
            <p className="text-xs text-[#858585] mt-1.5 leading-relaxed">
              AI Copywriting &amp; Content Generation Web Application powered by Gemini API.
            </p>
          </div>

          <div
            onClick={() => onNavigate('about-me.tsx')}
            className="p-5 rounded-xl border border-[#2d2d2d] bg-[#252526] hover:border-emerald-500/50 hover:bg-[#2a2a2d] transition-all cursor-pointer group shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                LinkedIn Bio
              </span>
              <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              about-me.tsx
            </h3>
            <p className="text-xs text-[#858585] mt-1.5 leading-relaxed">
              Academic background at University of Balochistan &amp; 3-column tech stack breakdown.
            </p>
          </div>

          <div
            onClick={() => onNavigate('skills.tsx')}
            className="p-5 rounded-xl border border-[#2d2d2d] bg-[#252526] hover:border-purple-500/50 hover:bg-[#2a2a2d] transition-all cursor-pointer group shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Competencies
              </span>
              <Zap className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
              skills.tsx
            </h3>
            <p className="text-xs text-[#858585] mt-1.5 leading-relaxed">
              Categorized technical skills covering React, Next.js, Node.js, and modern CSS tooling.
            </p>
          </div>

          <div
            onClick={() => onNavigate('work-experience.tsx')}
            className="p-5 rounded-xl border border-[#2d2d2d] bg-[#252526] hover:border-orange-500/50 hover:bg-[#2a2a2d] transition-all cursor-pointer group shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Milestones
              </span>
              <Briefcase className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
              work-experience.tsx
            </h3>
            <p className="text-xs text-[#858585] mt-1.5 leading-relaxed">
              Freelance deliverables, university CS society leadership, and project roadmap.
            </p>
          </div>

          <div
            onClick={() => onNavigate('terminal.tsx')}
            className="p-5 rounded-xl border border-emerald-500/30 bg-[#252526] hover:border-emerald-400/60 hover:bg-[#2a2a2d] transition-all cursor-pointer group shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Interactive Console
              </span>
              <span className="text-emerald-400 font-mono font-bold text-sm group-hover:scale-110 transition-transform">&gt;_</span>
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
              terminal.tsx
            </h3>
            <p className="text-xs text-[#858585] mt-1.5 leading-relaxed">
              VS Code terminal with commands &amp; Google Gemini AI intelligence (&apos;ai &lt;question&gt;&apos;).
            </p>
          </div>

          <div
            onClick={() => onNavigate('contact-me.tsx')}
            className="p-5 rounded-xl border border-[#2d2d2d] bg-[#252526] hover:border-sky-500/50 hover:bg-[#2a2a2d] transition-all cursor-pointer group shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Inquiries
              </span>
              <Mail className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors">
              contact-me.tsx
            </h3>
            <p className="text-xs text-[#858585] mt-1.5 leading-relaxed">
              Functional contact form and direct email/GitHub channels.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
