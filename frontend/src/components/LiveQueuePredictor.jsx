import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { VEHICLE_TYPES } from '../data/constants';
import { 
  Clock, 
  TrendingUp, 
  Truck, 
  Scale, 
  AlertCircle, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  BarChart3
} from 'lucide-react';

export const LiveQueuePredictor = () => {
  const { 
    centers, 
    selectedCenterId, 
    setSelectedCenterId, 
    calculatePredictedWaitTime, 
    getCenterName, 
    getVehicleName, 
    language, 
    speakText, 
    isSpeaking, 
    stopSpeaking, 
    setFarmerActiveView,
    t 
  } = usePortal();

  const [selectedVehicle, setSelectedVehicle] = useState('Tractor-Trolley (ट्रैक्टर-ट्रॉली)');
  const [selectedTargetCenter, setSelectedTargetCenter] = useState(selectedCenterId);

  const prediction = calculatePredictedWaitTime(selectedTargetCenter, selectedVehicle);
  const activeCenterObj = centers.find(c => c.id === selectedTargetCenter) || centers[0];

  const handleVoiceForecast = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const centerName = getCenterName(activeCenterObj, language);
      const voiceText = `${centerName}. ${t.liveWaitTimeTitle || 'Live Queue Prediction'}: ${prediction.waitTimeMinutes} ${t.estWaitMinutes || 'Minutes'}. ${t.queuePosition || 'Queue Position'}: ${prediction.queuePosition}. ${t.yardVehiclesCount || 'Vehicles in yard'}: ${prediction.yardCount}.`;
      speakText(voiceText, language);
    }
  };

  // Hourly congestion pattern for visual chart
  const rushHours = [
    { hour: '08:00 AM', load: 35, status: 'LOW' },
    { hour: '10:00 AM', load: 85, status: 'PEAK' },
    { hour: '12:00 PM', load: 95, status: 'PEAK' },
    { hour: '02:00 PM', load: 60, status: 'MODERATE' },
    { hour: '04:00 PM', load: 45, status: 'LOW' },
    { hour: '06:00 PM', load: 20, status: 'LOW' }
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#133B6B] text-white p-5 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-amber-400">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3 fill-current" /> AI Predictive Engine
            </span>
            <span className="text-xs text-slate-300">NIC Electronic Weighbridge Queue Telemetry</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <Activity className="w-5 h-5 text-amber-400" />
            <span>{t.liveWaitTimeTitle || 'Live Queue & Waiting Time Prediction'}</span>
          </h2>
          <p className="text-xs text-slate-200 mt-1 max-w-2xl">
            {t.queuePredictSubtitle || 'Real-time yard turnaround forecast powered by active weighbridge load and electronic token telemetry.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleVoiceForecast}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg shadow transition flex items-center space-x-1.5 ${
              isSpeaking ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-400 hover:bg-amber-500 text-slate-950'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? (t.stopVoice || 'Stop Audio') : (t.listenVoice || 'Listen Forecast')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Control Panel & Live Forecast Readout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Input Selection */}
        <div className="bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#0B2545]" />
            <span>Select Center & Vehicle Type</span>
          </h3>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              {t.selectCenter || 'Select Procurement Center (PPC)'}
            </label>
            <select
              value={selectedTargetCenter}
              onChange={(e) => {
                setSelectedTargetCenter(e.target.value);
                setSelectedCenterId(e.target.value);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:border-[#0B2545] focus:outline-none"
            >
              {centers.map(c => (
                <option key={c.id} value={c.id}>
                  {getCenterName(c, language)} ({c.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">
              {t.vehicleType || 'Vehicle Category'}
            </label>
            <div className="grid grid-cols-1 gap-2">
              {VEHICLE_TYPES.map((v) => {
                const isSelected = selectedVehicle === v.name;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedVehicle(v.name)}
                    className={`p-2.5 rounded-lg border text-left text-xs font-semibold flex items-center justify-between transition ${
                      isSelected
                        ? 'border-[#0B2545] bg-[#0B2545] text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Truck className={`w-4 h-4 ${isSelected ? 'text-amber-300' : 'text-slate-500'}`} />
                      <span>{getVehicleName(v, language)}</span>
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-emerald-300' : 'text-slate-500'}`}>
                      {v.capacity}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0B2545]" />
                <span>Nodal Weighbridge Telemetry</span>
              </div>
              <p className="text-[11px] text-blue-800">
                Operating under Nodal Agency: <strong className="font-semibold">{activeCenterObj.nodalAgency}</strong>. Total Weighbridges: <strong className="font-mono">{prediction.activeScales} Units</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Prediction Metrics */}
        <div className="bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase">Turnaround Forecast</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                prediction.status === 'HIGH' ? 'bg-red-100 text-red-900 border border-red-300' :
                prediction.status === 'MODERATE' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                'bg-emerald-100 text-emerald-900 border border-emerald-300'
              }`}>
                {prediction.status === 'HIGH' ? (t.congestedAlert || 'High Congestion') :
                 prediction.status === 'MODERATE' ? (t.moderateQueue || 'Moderate Traffic') : 
                 (t.fastTrack || 'Optimal / Fast Track')}
              </span>
            </div>

            <div className="text-center py-6">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
                {t.predictedWaitTime || 'Estimated Turnaround Wait Time'}
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-8 h-8 text-[#0B2545]" />
                <span className="text-5xl font-black font-mono text-[#0B2545]">
                  {prediction.waitTimeMinutes}
                </span>
                <span className="text-sm font-bold text-slate-600 self-end mb-1">
                  {t.estWaitMinutes || 'Mins (मिनट)'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Time from gate entry to PFMS DBT receipt print
              </p>
            </div>

            {/* Metric Pills */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  {t.queuePosition || 'Your Queue Position'}
                </span>
                <strong className="text-xl font-mono font-black text-slate-900">
                  #{prediction.queuePosition}
                </strong>
                <span className="text-[10px] text-slate-500 block">in vehicle queue</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  {t.yardVehiclesCount || 'Vehicles Inside Yard'}
                </span>
                <strong className="text-xl font-mono font-black text-slate-900">
                  {prediction.yardCount}
                </strong>
                <span className="text-[10px] text-slate-500 block">verified at gate</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            {prediction.status === 'HIGH' ? (
              <button
                onClick={() => setFarmerActiveView('recommend')}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg shadow transition flex items-center justify-center gap-1.5"
              >
                <span>View Low-Wait Buffer Centers (Save 45m)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setFarmerActiveView('book')}
                className="w-full py-2.5 bg-[#137547] hover:bg-[#0D4F30] text-white font-bold text-xs rounded-lg shadow transition flex items-center justify-center gap-1.5"
              >
                <span>{t.bookSlotNow || 'Book This Slot Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Right: Hourly Rush-Hour Congestion Pattern */}
        <div className="bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#0B2545]" />
              <span>Yard Congestion Hourly Trend</span>
            </h3>
            <span className="text-[10px] font-bold text-slate-500">Today's Pattern</span>
          </div>

          <p className="text-xs text-slate-600">
            Avoid 10:00 AM - 01:00 PM peak rush to cut unloading wait time by up to 70%.
          </p>

          <div className="space-y-2.5 pt-1">
            {rushHours.map((rh, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="font-mono text-slate-700">{rh.hour}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    rh.status === 'PEAK' ? 'bg-red-100 text-red-900 font-black' :
                    rh.status === 'MODERATE' ? 'bg-amber-100 text-amber-900' :
                    'bg-emerald-100 text-emerald-900'
                  }`}>
                    {rh.load}% Load ({rh.status})
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      rh.status === 'PEAK' ? 'bg-red-500' :
                      rh.status === 'MODERATE' ? 'bg-amber-500' :
                      'bg-emerald-500'
                    }`}
                    style={{ width: `${rh.load}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-950 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Pro-Tip:</strong> Early morning slots (08:00 AM - 10:00 AM) and late afternoon slots (04:00 PM - 06:00 PM) average under 15 minutes wait time.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
