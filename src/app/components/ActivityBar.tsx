"use client";

import React from 'react';
import {
  Files,
  Search,
  GitFork,
  BugPlay,
  Blocks,
  User,
  Settings,
} from 'lucide-react';

export type ActivityTab = 'explorer' | 'search' | 'git' | 'debug' | 'extensions';

export interface ActivityBarProps {
  activeActivity: ActivityTab;
  onSelectActivity: (activity: ActivityTab) => void;
  isSidebarOpen: boolean;
  onToggleSidebar?: () => void;
  onOpenAccounts?: () => void;
  onOpenSettings?: () => void;
}

export default function ActivityBar({
  activeActivity,
  onSelectActivity,
  isSidebarOpen,
  onToggleSidebar,
  onOpenAccounts,
  onOpenSettings,
}: ActivityBarProps): React.JSX.Element {
  const navItems: Array<{
    id: ActivityTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    shortcut: string;
  }> = [
    {
      id: 'explorer',
      label: 'Explorer',
      icon: Files,
      shortcut: 'Ctrl+Shift+E',
    },
    {
      id: 'search',
      label: 'Search',
      icon: Search,
      shortcut: 'Ctrl+Shift+F',
    },
    {
      id: 'git',
      label: 'Source Control',
      icon: GitFork,
      shortcut: 'Ctrl+Shift+G',
    },
    {
      id: 'debug',
      label: 'Run and Debug',
      icon: BugPlay,
      shortcut: 'Ctrl+Shift+D',
    },
    {
      id: 'extensions',
      label: 'Extensions',
      icon: Blocks,
      shortcut: 'Ctrl+Shift+X',
    },
  ];

  const handleItemClick = (id: ActivityTab) => {
    if (activeActivity === id && onToggleSidebar) {
      onToggleSidebar();
    } else {
      onSelectActivity(id);
    }
  };

  return (
    <aside
      className="w-12 bg-[#181a24] border-r border-[#2b3042] flex flex-col justify-between items-center py-2 select-none flex-shrink-0 z-20"
      aria-label="Activity Bar"
    >
      {/* Primary Tool Icons starting at the very top (Files is TOP icon) */}
      <nav className="flex flex-col items-center w-full space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeActivity === item.id && isSidebarOpen;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleItemClick(item.id)}
              title={`${item.label} (${item.shortcut})`}
              aria-label={item.label}
              aria-pressed={isActive}
              className={`group relative w-full h-11 flex items-center justify-center transition-colors focus:outline-none ${
                isActive
                  ? 'text-white border-l-2 border-white bg-white/5'
                  : 'text-slate-400 hover:text-white border-l-2 border-transparent'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-150 group-hover:scale-105 ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Bottom Icons: Accounts & Settings */}
      <div className="flex flex-col items-center w-full space-y-2 pt-2">
        <button
          type="button"
          onClick={onOpenAccounts}
          title="Accounts"
          aria-label="Accounts"
          className="group relative w-full h-11 flex items-center justify-center text-slate-400 hover:text-white border-l-2 border-transparent transition-colors focus:outline-none"
        >
          <User className="w-5 h-5 transition-transform duration-150 group-hover:scale-105" />
        </button>

        <button
          type="button"
          onClick={onOpenSettings}
          title="Manage Settings"
          aria-label="Manage Settings"
          className="group relative w-full h-11 flex items-center justify-center text-slate-400 hover:text-white border-l-2 border-transparent transition-colors focus:outline-none"
        >
          <Settings className="w-5 h-5 transition-transform duration-150 group-hover:scale-105" />
        </button>
      </div>
    </aside>
  );
}
