import React, { useState } from 'react';
import { ZoomIn, X, ShieldCheck, Cpu, Layers, Terminal } from 'lucide-react';

interface ProductDashboardPreviewProps {
  onFocusForm?: () => void;
}

export const ProductDashboardPreview: React.FC<ProductDashboardPreviewProps> = ({ onFocusForm }) => {
  const [imageError, setImageError] = useState(false);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  // Primary local asset cached in public folder, with fallback to live URL
  const primarySrc = '/images/instantlyclaw_intro.png';
  const remoteFallback = 'https://www.instantlyclaw.com/partners/assets/images/intro.png';

  return (
    <div className="relative flex flex-col justify-center">
      {/* Subtle background glow effect behind dashboard */}
      <div
        className="pointer-events-none absolute -inset-4 bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-transparent rounded-3xl blur-2xl"
        aria-hidden="true"
      />

      {/* Main Dashboard Card */}
      <div className="relative rounded-2xl border border-cyan-500/30 bg-[#0B1220]/95 p-2 sm:p-2.5 shadow-[0_0_50px_-12px_rgba(6,182,212,0.25)] transition-all">
        {/* Subtle browser / window header bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800/80 mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="ml-2 text-[11px] font-mono text-slate-400">
              openclaw-hub.cloud/system/agents
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center text-[10px] text-cyan-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-1.5" />
              Cloud Ready
            </span>
            <button
              type="button"
              onClick={() => setIsZoomOpen(true)}
              aria-label="Enlarge dashboard screenshot"
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Click to view full screen"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Screenshot Container */}
        <div className="relative overflow-hidden rounded-xl bg-slate-950 aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
          {!imageError ? (
            <img
              src={primarySrc}
              onError={(e) => {
                // If local path fails, try remote URL once
                const target = e.currentTarget;
                if (target.src.indexOf('intro.png') !== -1 && target.src !== remoteFallback) {
                  target.src = remoteFallback;
                } else {
                  setImageError(true);
                }
              }}
              alt="InstantlyClaw OpenClaw AI Agent Team Dashboard with Multi-Agent Orchestration and Pre-Built Skills"
              referrerPolicy="no-referrer"
              loading="eager"
              className="w-full h-full object-cover object-top hover:scale-[1.01] transition-transform duration-300"
            />
          ) : (
            /* Resilient SVG/CSS Fallback Container (Zero-Broken-Image Policy) */
            <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-slate-900 via-[#0B1220] to-slate-950 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-bold text-white">
                    OpenClaw Agent Orchestration Core
                  </span>
                </div>
                <span className="text-xs text-cyan-400 font-mono">15/15 Skills Loaded</span>
              </div>

              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Lead Agent</span>
                  <span className="text-sm font-semibold text-white">CEO / Director</span>
                  <span className="text-[10px] text-cyan-400 mt-1 block">Autonomous Planning</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Operations</span>
                  <span className="text-sm font-semibold text-white">Manager Agent</span>
                  <span className="text-[10px] text-cyan-400 mt-1 block">Task Delegation</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                  <span className="text-xs text-slate-400 block">Execution</span>
                  <span className="text-sm font-semibold text-white">Specialized Units</span>
                  <span className="text-[10px] text-cyan-400 mt-1 block">15 Active Skills</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs text-slate-400">
                <span>One-Click Cloud Deployment</span>
                <span className="text-slate-300 font-mono">Zero Docker / Zero Terminal</span>
              </div>
            </div>
          )}

          {/* Quick Enlarge Overlay Hint */}
          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            className="absolute bottom-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 border border-slate-700/80 text-[11px] text-slate-300 hover:text-white hover:border-cyan-400 transition-colors backdrop-blur-sm cursor-pointer"
          >
            <ZoomIn className="w-3 h-3 text-cyan-400" />
            <span>Enlarge preview</span>
          </button>
        </div>

        {/* Feature Spotlight Sub-Strip */}
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-800/80 text-left">
          <div className="p-2 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Cpu className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold text-white">Multi-Agent</span>
            </div>
            <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
              CEO, Manager, Specialists
            </p>
          </div>

          <div className="p-2 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Layers className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold text-white">15 Skills</span>
            </div>
            <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
              Research, Copy, Data, Tasks
            </p>
          </div>

          <div className="p-2 rounded-lg bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Terminal className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold text-white">Zero Terminal</span>
            </div>
            <p className="text-[10px] text-slate-300 mt-0.5 line-clamp-1">
              Pre-hosted cloud system
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoom Modal for High-Definition Inspection */}
      {isZoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center animate-in fade-in duration-200"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0B1220] rounded-2xl border border-cyan-500/40 p-3 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-slate-800 mb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-white">
                  InstantlyClaw Official Dashboard Preview
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsZoomOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close enlarged preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto max-h-[80vh] rounded-xl">
              <img
                src={primarySrc}
                alt="Enlarged InstantlyClaw Dashboard"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-2">
              <span>Includes pre-configured OpenClaw agents &amp; skills environment.</span>
              <button
                type="button"
                onClick={() => {
                  setIsZoomOpen(false);
                  onFocusForm?.();
                }}
                className="px-3 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
