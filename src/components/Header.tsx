import React from 'react';

interface HeaderProps {
  onOpenPrivacy: () => void;
  onOpenDisclosure: () => void;
  onFocusForm: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenPrivacy,
  onOpenDisclosure,
  onFocusForm,
}) => {
  return (
    <header className="w-full border-b border-slate-800/80 bg-[#0B1220]/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          className="text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          Instantly<span className="text-cyan-400">Claw</span>
        </a>

        {/* Zone 2: 4 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#overview"
            className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            System Overview
          </a>
          <a
            href="#multi-agent"
            className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            Pre-Built Agents
          </a>
          <button
            type="button"
            onClick={onOpenDisclosure}
            className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Partner Disclosure
          </button>
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="hover:text-cyan-300 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Privacy Policy
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onFocusForm}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-cyan-500/20 active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};
