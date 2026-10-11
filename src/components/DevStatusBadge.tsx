import React, { useEffect, useState } from 'react';
import { CheckCircle2, AlertTriangle, Settings2, X, RefreshCw } from 'lucide-react';
import { GetResponseStatusResponse } from '../types';

export const DevStatusBadge: React.FC = () => {
  const [status, setStatus] = useState<GetResponseStatusResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const checkStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/status');
      const data: GetResponseStatusResponse = await res.json();
      setStatus(data);
    } catch {
      setStatus({
        configured: false,
        message: 'Could not connect to /api/status endpoint.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  if (!status) return null;

  // If not configured, show an attention banner so developer is clearly informed
  if (!status.configured) {
    return (
      <div className="bg-amber-950/80 border-b border-amber-500/40 px-4 py-2 text-xs text-amber-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>GetResponse Setup Required:</strong> {status.message || 'Credentials not configured.'}
            </span>
          </div>
          <button
            type="button"
            onClick={checkStatus}
            disabled={loading}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-900/60 hover:bg-amber-900 text-amber-100 font-medium cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            <span>Retry Check</span>
          </button>
        </div>
      </div>
    );
  }

  // If configured, provide a discreet toggle in corner for dev verification
  return (
    <div className="fixed bottom-3 right-3 z-30">
      {!expanded ? (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          title="GetResponse & Pixel System Status"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[11px] text-slate-300 hover:text-cyan-300 hover:border-cyan-400 backdrop-blur-sm transition-all shadow-lg cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>GetResponse Active</span>
        </button>
      ) : (
        <div className="w-72 rounded-xl bg-slate-900 border border-slate-700 p-3.5 shadow-2xl text-left text-xs text-slate-300 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <Settings2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Integration Status</span>
            </div>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">GetResponse API:</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Target Campaign:</span>
              <span className="text-white font-mono">{status.campaignName || 'OpenClaw'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Campaign ID:</span>
              <span className="text-cyan-400 font-mono">{status.campaignId || '77fvx'}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-800">
              <span className="text-slate-400">Affiliate Target:</span>
              <span className="text-slate-300">JVZoo</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
