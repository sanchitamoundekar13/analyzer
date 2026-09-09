import React, { useState, useEffect } from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  Tv, 
  Clock, 
  Scale, 
  Truck, 
  AlertTriangle, 
  Activity, 
  Compass, 
  Moon, 
  Sun,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const YardDisplayBoard = () => {
  const { 
    currentCenter, 
    tokens, 
    getCommodityName, 
    getCenterName, 
    language, 
    t 
  } = usePortal();

  const [boardTheme, setBoardTheme] = useState('dark');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const centerTokens = tokens.filter(t => t.centerId === currentCenter.id || t.centerName === currentCenter.name);

  // Now serving (AT_WEIGHBRIDGE)
  const nowServingTokens = centerTokens.filter(t => t.status === 'AT_WEIGHBRIDGE');
  const primaryServing = nowServingTokens[0] || null;

  // Next in line (WAITING_IN_YARD)
  const yardQueue = centerTokens.filter(t => t.status === 'WAITING_IN_YARD');
  const nextInLine = yardQueue.slice(0, 4);

  // Completed today
  const completedTokens = centerTokens.filter(t => t.status === 'COMPLETED');
  const completedQuintals = completedTokens.reduce((sum, t) => sum + (t.netWeightQtl || t.estimatedQuantityQtl || 0), 0);

  // Dynamic Wait-Time calculation formula:
  const vehiclesInYardCount = yardQueue.length;
  const throughput = currentCenter.hourlyThroughput || 15;
  const calculatedWaitMinutes = Math.round((vehiclesInYardCount / throughput) * 60);

  // Automated Congestion alert condition
  const isCongested = calculatedWaitMinutes >= 90 || vehiclesInYardCount >= 22;
  const isDark = boardTheme === 'dark';

  return (
    <div className={`min-h-[85vh] p-4 md:p-6 transition-colors duration-300 font-sans ${
      isDark ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto space-y-5">
        {/* Top Board Header Banner */}
        <div className={`p-4 md:p-5 rounded-lg border flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded bg-[#137547] text-white flex items-center justify-center font-bold text-sm">
              KS
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-red-600 text-white animate-pulse">
                  PUBLIC DISPLAY BOARD
                </span>
                <span className={`text-xs font-mono font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {currentCenter.code}
                </span>
              </div>
              <h1 className="text-lg md:text-xl font-black tracking-tight mt-0.5">
                {getCenterName(currentCenter, language)}
              </h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Clock */}
            <div className={`px-3 py-1.5 rounded font-mono font-bold flex items-center space-x-1.5 border ${
              isDark ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-50 border-slate-300 text-slate-900'
            }`}>
              <Clock className="w-4 h-4 text-gov-saffron" />
              <span>
                {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST
              </span>
            </div>

            {/* Weighbridges Status */}
            <div className={`px-3 py-1.5 rounded font-bold flex items-center space-x-1.5 border ${
              isDark ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
            }`}>
              <Scale className="w-4 h-4" />
              <span>Weighbridges: <strong>{currentCenter.activeWeighbridges} / {currentCenter.totalWeighbridges} Operational</strong></span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setBoardTheme(isDark ? 'light' : 'dark')}
              className={`p-1.5 rounded border transition ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-50 border-slate-300 text-slate-700'
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* High Congestion Automated Diversion Alert Banner */}
        {isCongested && (
          <div className="bg-amber-600 text-white p-4 rounded-lg shadow-md border-2 border-amber-400 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-200 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-black uppercase tracking-wider text-amber-100 flex items-center space-x-2">
                  <span>{t.congestionWarning}</span>
                  <span className="bg-slate-900 text-amber-300 text-[10px] px-2 py-0.5 rounded font-mono">
                    Estimated Wait: {calculatedWaitMinutes} Mins
                  </span>
                </div>
                <div className="text-sm font-bold mt-0.5">
                  {t.rerouteSuggestion}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-slate-900/50 px-3 py-1.5 rounded text-xs font-mono font-bold flex-shrink-0">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>{t.directBypassLink}</span>
            </div>
          </div>
        )}

        {/* Real-time Yard KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Dynamic Yard Wait Time */}
          <div className={`p-4 rounded-lg border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'
          }`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.waitEstimate}
            </span>
            <div className="text-2xl font-black font-mono mt-1 text-emerald-400">
              ~{calculatedWaitMinutes} <span className="text-xs font-normal text-slate-400">Minutes</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              Formula: ({vehiclesInYardCount} in yard / {throughput} / hr) * 60
            </div>
          </div>

          {/* Vehicles in Yard */}
          <div className={`p-4 rounded-lg border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'
          }`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.vehiclesInHoldingYard}
            </span>
            <div className="text-2xl font-black font-mono mt-1 text-blue-400">
              {vehiclesInYardCount} <span className="text-xs font-normal text-slate-400">Vehicles</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {t.electronicQueueOrder}
            </div>
          </div>

          {/* Today's Target Volume */}
          <div className={`p-4 rounded-lg border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'
          }`}>
            <span className={`text-[10px] font-bold uppercase tracking-wider block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {t.todaysProcurementVol}
            </span>
            <div className="text-2xl font-black font-mono mt-1 text-amber-400">
              {completedQuintals.toFixed(1)} <span className="text-xs font-normal text-slate-400">/ {currentCenter.dailyTargetQtl} Quintals</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
              {Math.round((completedQuintals / currentCenter.dailyTargetQtl) * 100)}% {t.dailyTargetMet}
            </div>
          </div>
        </div>

        {/* Main Board Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* NOW SERVING Box (Col 1-7) */}
          <div className={`lg:col-span-7 rounded-lg p-5 border-2 ${
            isDark 
              ? 'bg-slate-900 border-emerald-500 shadow-xl' 
              : 'bg-white border-emerald-600 shadow-md'
          }`}>
            <div className="flex justify-between items-center pb-2.5 border-b border-emerald-500/40">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 animate-pulse">
                {t.nowServing}
              </span>
              <span className="text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500">
                SCALES CERTIFIED & ACTIVE
              </span>
            </div>

            {primaryServing ? (
              <div className="py-4 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Token ID / टोकन क्रमांक</span>
                    <div className="text-3xl sm:text-4xl font-mono font-black text-white mt-0.5">
                      {primaryServing.tokenNumber}
                    </div>
                  </div>

                  <div className="bg-slate-950 border border-slate-700 px-3 py-2 rounded">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Vehicle Number</span>
                    <span className="text-lg font-mono font-black text-gov-saffron">
                      {primaryServing.vehicleRegistration}
                    </span>
                  </div>
                </div>

                <div className={`p-3 rounded border grid grid-cols-3 gap-2 text-xs ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">{t.fullName}</span>
                    <strong className="text-xs text-white truncate block">{primaryServing.farmerName}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">{t.commodity}</span>
                    <strong className="text-xs text-emerald-400 truncate block">{getCommodityName(primaryServing.commodity, language)}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">Moisture %</span>
                    <strong className="text-xs text-sky-400 font-mono block">
                      {primaryServing.moisturePercentage ? `${primaryServing.moisturePercentage}% (Passed)` : 'Testing...'}
                    </strong>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-500 space-y-1">
                <Scale className="w-8 h-8 mx-auto text-slate-600" />
                <div className="text-sm font-bold">Weighbridge Desk Ready</div>
                <p className="text-xs">Calling next checked-in vehicle from holding yard...</p>
              </div>
            )}
          </div>

          {/* NEXT IN LINE Queue (Col 8-12) */}
          <div className={`lg:col-span-5 rounded-lg p-5 border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-300 shadow-sm'
          }`}>
            <div className="flex justify-between items-center pb-2.5 border-b border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                {t.nextInLine}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {yardQueue.length} In Yard
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {nextInLine.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-500">
                  No vehicles currently waiting in yard queue.
                </div>
              ) : (
                nextInLine.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded border flex items-center justify-between text-xs ${
                      isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={`w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[10px] ${
                        idx === 0 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <div className="font-mono font-bold text-white text-xs">{item.tokenNumber}</div>
                        <div className="text-[10px] text-slate-400 truncate max-w-[130px]">{item.farmerName}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-bold text-gov-saffron text-xs">{item.vehicleRegistration}</div>
                      <div className="text-[10px] text-emerald-400">{getCommodityName(item.commodity, language)}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
