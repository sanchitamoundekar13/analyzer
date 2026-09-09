import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  Bell, 
  Send, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Smartphone, 
  ShieldCheck,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const SmartArrivalNotification = () => {
  const { 
    tokens, 
    notifications, 
    dispatchSmartNotification, 
    setIsNotificationDrawerOpen, 
    setActiveWhatsAppModal, 
    language, 
    speakText, 
    isSpeaking, 
    stopSpeaking, 
    t 
  } = usePortal();

  const [selectedTokenNum, setSelectedTokenNum] = useState(tokens[0]?.tokenNumber || 'KS-2026-RAM-0105');
  const [lastDispatched, setLastDispatched] = useState(null);

  const activeTok = tokens.find(t => t.tokenNumber === selectedTokenNum) || tokens[0];

  const handleSimulateAlert = (type) => {
    let alertData = null;

    if (type === 'LEAVE_HOME') {
      alertData = {
        type: 'LEAVE_HOME',
        title: `[Transit] Leave Home Reminder: ${activeTok?.tokenNumber}`,
        message: `Dear ${activeTok?.farmerName}, your slot (${activeTok?.slotWindow}) starts in 45 minutes. NH-24 traffic is normal. Please depart now.`,
        tokenNumber: activeTok?.tokenNumber
      };
    } else if (type === 'CONGESTION_REROUTE') {
      alertData = {
        type: 'CONGESTION_REROUTE',
        title: `[Advisory] Smart Congestion Reroute Suggestion`,
        message: `Rampur Central yard currently has 85% occupancy. Diverting to Kalyanpur Buffer Depot (11 km) will save ~45 mins of yard waiting.`,
        tokenNumber: activeTok?.tokenNumber
      };
    } else if (type === 'TURN_APPROACHING') {
      alertData = {
        type: 'TURN_APPROACHING',
        title: `[Weighbridge Call] Turn Approaching: ${activeTok?.tokenNumber}`,
        message: `Calling ${activeTok?.farmerName} (Vehicle ${activeTok?.vehicleRegistration}) to Electronic Weighbridge Scale #1 immediately!`,
        tokenNumber: activeTok?.tokenNumber
      };
    } else if (type === 'PAYMENT_DISBURSED') {
      const amt = Math.round((activeTok?.estimatedQuantityQtl || 60) * (activeTok?.mspRate || 2320));
      alertData = {
        type: 'PAYMENT_DISBURSED',
        title: `[Payment] PFMS DBT Disbursed: ${activeTok?.tokenNumber}`,
        message: `₹${amt.toLocaleString('en-IN')} successfully credited to ${activeTok?.farmerName}'s Aadhaar-linked Bank A/C. Reference: PFMS-2026-DBT-${Math.floor(100000 + Math.random() * 900000)}.`,
        tokenNumber: activeTok?.tokenNumber
      };
    }

    if (alertData) {
      dispatchSmartNotification(alertData);
      setLastDispatched(alertData);
      speakText(alertData.message, language);
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#133B6B] text-white p-5 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-sky-400">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-sky-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
              <Bell className="w-3 h-3 fill-current" /> Multi-Channel Alerts
            </span>
            <span className="text-xs text-slate-300">Automated SMS, Voice Broadcast & WhatsApp Gateway</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <Bell className="w-5 h-5 text-sky-400" />
            <span>{t.smartNotifTitle || 'Smart Arrival Notification Engine'}</span>
          </h2>
          <p className="text-xs text-slate-200 mt-1 max-w-2xl">
            {t.smartNotifSubtitle || 'Predictive triggers reminding farmers when to leave home, suggesting congestion bypasses, and calling vehicles to scales.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="px-3.5 py-2 bg-sky-400 hover:bg-sky-500 text-slate-950 text-xs font-bold rounded-lg shadow transition flex items-center space-x-1.5"
          >
            <Bell className="w-4 h-4" />
            <span>Open Notification Inbox ({notifications.filter(n => !n.read).length} Unread)</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Simulation Triggers */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-200 gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Live Notification Scenario Simulator
              </h3>
              <p className="text-xs text-slate-500">
                Test automated AI-driven alerts across the procurement lifecycle
              </p>
            </div>

            {/* Token Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-600">Target Token:</span>
              <select
                value={selectedTokenNum}
                onChange={(e) => setSelectedTokenNum(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-bold text-slate-900 focus:outline-none"
              >
                {tokens.map(t => (
                  <option key={t.id} value={t.tokenNumber}>
                    {t.tokenNumber} ({t.farmerName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Trigger Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. Leave Home Trigger */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50/50 transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-blue-100 text-blue-900 font-bold text-xs flex items-center justify-center">1</span>
                  <h4 className="text-xs font-bold text-slate-900">
                    {t.leaveHomeReminder || 'Leave Home Reminder'}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Triggered 45 mins prior to slot window factoring in live road traffic.
                </p>
              </div>
              <button
                onClick={() => handleSimulateAlert('LEAVE_HOME')}
                className="w-full py-2 bg-[#0B2545] hover:bg-[#07172C] text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simulate Departure Alert</span>
              </button>
            </div>

            {/* 2. Congestion Reroute Trigger */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50/50 transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center">2</span>
                  <h4 className="text-xs font-bold text-slate-900">
                    {t.congestionAlert || 'Smart Yard Congestion Reroute'}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Triggered when primary PPC yard wait exceeds 45 mins.
                </p>
              </div>
              <button
                onClick={() => handleSimulateAlert('CONGESTION_REROUTE')}
                className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simulate Reroute Alert</span>
              </button>
            </div>

            {/* 3. Turn Approaching Trigger */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-purple-50/50 transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-purple-100 text-purple-900 font-bold text-xs flex items-center justify-center">3</span>
                  <h4 className="text-xs font-bold text-slate-900">
                    {t.turnApproaching || 'Turn Approaching (Gate Call)'}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Triggered when farmer vehicle is next in line for weighbridge.
                </p>
              </div>
              <button
                onClick={() => handleSimulateAlert('TURN_APPROACHING')}
                className="w-full py-2 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simulate Turn Call</span>
              </button>
            </div>

            {/* 4. Payment Disbursed Trigger */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-emerald-50/50 transition flex flex-col justify-between space-y-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">4</span>
                  <h4 className="text-xs font-bold text-slate-900">
                    {t.paymentDisbursed || 'PFMS DBT Payment Credited'}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Triggered upon 100% PFMS treasury settlement directly into bank.
                </p>
              </div>
              <button
                onClick={() => handleSimulateAlert('PAYMENT_DISBURSED')}
                className="w-full py-2 bg-[#137547] hover:bg-[#0D4F30] text-white text-xs font-bold rounded-lg shadow-sm transition flex items-center justify-center space-x-1"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Simulate DBT Paid Alert</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Last Dispatched Preview & WhatsApp Modal Trigger */}
        <div className="bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-200 pb-2 flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-500 uppercase">Live Smartphone Preview</h3>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                SMS / Voice / WhatsApp
              </span>
            </div>

            <div className="mt-4 bg-slate-900 text-white p-4 rounded-xl shadow-inner space-y-3 font-sans">
              <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                <span className="flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>KisanSetu SMS Gateway</span>
                </span>
                <span className="font-mono">Govt. of India</span>
              </div>

              {lastDispatched ? (
                <div className="space-y-2 animate-fadeIn">
                  <div className="text-xs font-bold text-amber-300">
                    {lastDispatched.title}
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed bg-slate-800/80 p-3 rounded-lg border border-slate-700 font-mono">
                    "{lastDispatched.message}"
                  </p>
                  <div className="text-[10px] text-slate-400 flex justify-between">
                    <span>Delivered via NIC Cloud SMS</span>
                    <span>Just now</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">
                  Click any trigger on the left to fire a live simulated alert to the farmer.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => setActiveWhatsAppModal({ token: activeTok, eventType: 'SLOT_CONFIRMED' })}
              className="w-full py-2.5 bg-[#137547] hover:bg-[#0D4F30] text-white font-bold text-xs rounded-lg shadow transition flex items-center justify-center space-x-1.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.sendWhatsAppAlert || 'Open Full WhatsApp Dispatch Modal'}</span>
            </button>
            <p className="text-[10px] text-center text-slate-500">
              Supports 12 regional languages & high-contrast templates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
