import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Navigation,
  TrendingDown
} from 'lucide-react';

export const SmartCenterRecommender = () => {
  const { 
    recommendBestCenter, 
    setSelectedCenterId, 
    setFarmerActiveView, 
    getCenterName, 
    language, 
    speakText, 
    isSpeaking, 
    stopSpeaking, 
    t 
  } = usePortal();

  const [farmerVillage, setFarmerVillage] = useState('Dhamora');
  const [estimatedQty, setEstimatedQty] = useState('60');

  const evaluatedCenters = recommendBestCenter(farmerVillage, 'Paddy (Grade A)', parseFloat(estimatedQty) || 50);
  const recommendedCenter = evaluatedCenters[0];

  const handleSelectAndBook = (centerId) => {
    setSelectedCenterId(centerId);
    setFarmerActiveView('book');
  };

  const handleVoiceRecommend = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const bestName = getCenterName(recommendedCenter, language);
      const voiceText = `${t.recommendTitle || 'Smart Center Recommendation'}. ${bestName} is recommended. ${t.savesTime || 'Saves 45 minutes'}. Distance: ${recommendedCenter.distanceKm} km.`;
      speakText(voiceText, language);
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#133B6B] text-white p-5 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-amber-400">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current" /> AI Load Balancing
            </span>
            <span className="text-xs text-slate-300">NIC Multi-Depot Congestion Diversion Engine</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>{t.recommendTitle || 'Smart Center Recommendation'}</span>
          </h2>
          <p className="text-xs text-slate-200 mt-1 max-w-2xl">
            {t.recommendSubtitle || 'Intelligent diversion suggestions to save up to 1 hour by routing to low-wait buffer procurement centers.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleVoiceRecommend}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg shadow transition flex items-center space-x-1.5 ${
              isSpeaking ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-400 hover:bg-amber-500 text-slate-950'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? (t.stopVoice || 'Stop Audio') : (t.listenVoice || 'Listen Advice')}</span>
          </button>
        </div>
      </div>

      {/* Top Best Recommendation Highlight Card */}
      {recommendedCenter && (
        <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/30 border-2 border-[#137547] rounded-xl p-5 sm:p-6 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-emerald-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-950 bg-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-400">
                  {t.topRecommendation || 'Top Recommended Center (सर्वश्रेष्ठ सुझाव)'}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#0B2545] mt-1">
                  {getCenterName(recommendedCenter, language)}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold font-mono">
              <TrendingDown className="w-4 h-4 text-emerald-700" />
              <span>{t.savesTime || 'Saves ~45 Mins Waiting'}</span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">{t.distance || 'Distance'}</span>
              <strong className="text-lg font-mono text-slate-900">{recommendedCenter.distanceKm} km</strong>
              <span className="text-[10px] text-slate-500 block">~{recommendedCenter.travelTimeMins} mins tractor drive</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">{t.predictedWaitTime || 'Yard Waiting'}</span>
              <strong className="text-lg font-mono text-emerald-700">{recommendedCenter.waitData.waitTimeMinutes} mins</strong>
              <span className="text-[10px] text-emerald-600 block">Fast-track weighbridge</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Available Quota</span>
              <strong className="text-lg font-mono text-slate-900">{recommendedCenter.capacityLeftQtl} Qtl</strong>
              <span className="text-[10px] text-slate-500 block">Open for booking</span>
            </div>

            <div className="bg-white p-3 rounded-lg border border-emerald-200 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Congestion Score</span>
              <strong className="text-lg font-mono text-emerald-800">{recommendedCenter.score} / 100</strong>
              <span className="text-[10px] text-emerald-700 block">Smooth Turnaround</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => handleSelectAndBook(recommendedCenter.id)}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#137547] hover:bg-[#0D4F30] text-white font-bold text-xs rounded-lg shadow-md transition flex items-center justify-center space-x-2 uppercase tracking-wide cursor-pointer"
            >
              <span>{t.switchAndBook || 'Select This Center & Book Slot'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Comparison Grid Across All Regional Centers */}
      <div className="bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2">
          Compare All 3 Nearby Procurement Depots
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {evaluatedCenters.map((center) => {
            const isBest = center.id === recommendedCenter.id;
            const isCongested = center.capacityPercentage >= 80;

            return (
              <div
                key={center.id}
                className={`p-4 rounded-xl border-2 transition flex flex-col justify-between space-y-3 ${
                  isBest
                    ? 'border-[#137547] bg-emerald-50/40 shadow-sm'
                    : isCongested
                    ? 'border-amber-300 bg-amber-50/30'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-bold text-slate-500">{center.code}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isBest ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                      isCongested ? 'bg-red-100 text-red-900 border border-red-300' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {isBest ? 'RECOMMENDED' : isCongested ? 'CONGESTED' : 'NORMAL'}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 mt-2">
                    {getCenterName(center, language)}
                  </h4>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Nodal: <strong className="text-slate-700">{center.nodalAgency}</strong>
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Distance from village:</span>
                      <strong className="font-mono text-slate-900">{center.distanceKm} km</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Yard wait estimate:</span>
                      <strong className={`font-mono ${isCongested ? 'text-red-700' : 'text-emerald-700'}`}>
                        {center.waitData.waitTimeMinutes} mins
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Turnaround:</span>
                      <strong className="font-mono text-slate-900">
                        {center.totalTimeMins} mins
                      </strong>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSelectAndBook(center.id)}
                  className={`w-full py-2 rounded-lg font-bold text-xs shadow-sm transition flex items-center justify-center space-x-1 ${
                    isBest
                      ? 'bg-[#137547] hover:bg-[#0D4F30] text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>Select {center.code}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
