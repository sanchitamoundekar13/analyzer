import React from 'react';
import { usePortal } from '../context/PortalContext';
import { Wifi, WifiOff, RefreshCw, AlertTriangle } from 'lucide-react';

export const OfflineBanner = () => {
  const { isOffline, toggleOfflineMode, offlineQueue, t } = usePortal();

  return (
    <div className={`w-full px-4 py-2.5 transition-colors border-b flex flex-wrap items-center justify-between gap-3 text-xs ${
      isOffline 
        ? 'bg-amber-900/90 text-amber-100 border-amber-700 shadow-inner' 
        : 'bg-slate-100 text-slate-700 border-slate-200'
    }`}>
      <div className="flex items-center space-x-2.5">
        {isOffline ? (
          <div className="flex items-center space-x-2 text-amber-300 font-semibold">
            <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{t.offlineActive}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-slate-600 font-medium">
            <Wifi className="w-4 h-4 text-emerald-600" />
            <span>{t.onlineStatus}</span>
          </div>
        )}

        {offlineQueue.length > 0 && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px]">
            <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
            {offlineQueue.length} {t.syncPending}
          </span>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <label className="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            checked={isOffline} 
            onChange={toggleOfflineMode} 
            className="sr-only peer" 
          />
          <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
          <span className="ml-2 font-medium select-none">
            {t.offlineMode}
          </span>
        </label>
      </div>
    </div>
  );
};
