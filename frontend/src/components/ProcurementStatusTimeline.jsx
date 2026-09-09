import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  QrCode, 
  Droplet, 
  Scale, 
  CreditCard, 
  Building2, 
  User, 
  Truck, 
  Search, 
  Volume2, 
  VolumeX, 
  FileText, 
  ShieldCheck,
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export const ProcurementStatusTimeline = () => {
  const { 
    tokens, 
    activeTimelineToken, 
    setActiveTimelineToken, 
    setActivePassToken, 
    getCommodityName, 
    getCenterName, 
    language, 
    speakText, 
    isSpeaking, 
    stopSpeaking, 
    t 
  } = usePortal();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');

  // Default to activeTimelineToken, or the first token in list
  const currentToken = activeTimelineToken || tokens[0];

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchError('');
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;

    const found = tokens.find(
      tok => tok.tokenNumber.toLowerCase().includes(q) || 
             tok.farmerMobile.includes(q) || 
             tok.kisanRegId.toLowerCase().includes(q)
    );

    if (found) {
      setActiveTimelineToken(found);
    } else {
      setSearchError('No token found matching the query.');
    }
  };

  // Determine stage progression index (0 to 4)
  const getStageIndex = (tok) => {
    if (!tok) return 0;
    if (tok.status === 'COMPLETED') return 4;
    if (tok.status === 'AT_WEIGHBRIDGE') return 3;
    if (tok.moisturePercentage !== null || tok.qcResult === 'PASSED') return 2;
    if (tok.status === 'WAITING_IN_YARD' || tok.checkedInAt) return 1;
    return 0; // BOOKED
  };

  const currentStageIdx = getStageIndex(currentToken);

  const stages = [
    {
      id: 'step-1',
      title: t.timelineStep1 || '1. Slot Booking & E-Pass',
      titleNative: 'स्लॉट आरक्षित एवं ई-पास निर्गत',
      desc: 'Guaranteed 2-hour arrival slot booked on KisanSetu',
      timestamp: currentToken?.createdAt ? new Date(currentToken.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '10:00 AM',
      icon: QrCode,
      officer: 'Automated NIC Engine',
      completed: currentStageIdx >= 0,
      active: currentStageIdx === 0,
      data: `Slot Window: ${currentToken?.slotWindow || 'N/A'}`
    },
    {
      id: 'step-2',
      title: t.timelineStep2 || '2. Yard Gate QR Entry',
      titleNative: 'मंडी गेट आगमन व सत्यापन',
      desc: 'Vehicle physical entry scan & queue assignment',
      timestamp: currentToken?.checkedInAt ? new Date(currentToken.checkedInAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : (currentStageIdx > 1 ? '10:45 AM' : 'Pending Yard Arrival'),
      icon: Truck,
      officer: 'Shri Ramakant (Gate Inspector)',
      completed: currentStageIdx >= 1,
      active: currentStageIdx === 1,
      data: `Yard Queue: Verified (${currentToken?.vehicleRegistration || 'UP-22'})`
    },
    {
      id: 'step-3',
      title: t.timelineStep3 || '3. AGMARK Moisture QC',
      titleNative: 'गुणवत्ता व नमी जांच (AGMARK QC)',
      desc: 'Automated electronic moisture and grain inspection',
      timestamp: currentToken?.qcTestedAt ? new Date(currentToken.qcTestedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : (currentStageIdx > 2 ? '11:15 AM' : 'Pending Inspection'),
      icon: Droplet,
      officer: 'Dr. V. Sharma (QC Officer)',
      completed: currentStageIdx >= 2,
      active: currentStageIdx === 2,
      data: currentToken?.moisturePercentage ? `Moisture: ${currentToken.moisturePercentage}% (Passed ≤17.0%)` : 'Moisture Limit: ≤ 17.0%'
    },
    {
      id: 'step-4',
      title: t.timelineStep4 || '4. Electronic Weighment',
      titleNative: 'इलेक्ट्रॉनिक धर्मकांटा तौल',
      desc: 'Certified gross & tare weighment at weighbridge scale',
      timestamp: currentToken?.calledToWeighbridgeAt ? new Date(currentToken.calledToWeighbridgeAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : (currentStageIdx > 3 ? '11:40 AM' : 'Pending Weighment'),
      icon: Scale,
      officer: 'Shri Manoj Yadav (Weighment Supdt.)',
      completed: currentStageIdx >= 3,
      active: currentStageIdx === 3,
      data: currentToken?.netWeightQtl ? `Gross: ${currentToken.grossWeightQtl}q | Tare: ${currentToken.tareWeightQtl}q | Net: ${currentToken.netWeightQtl}q` : 'Awaiting scale reading'
    },
    {
      id: 'step-5',
      title: t.timelineStep5 || '5. PFMS Direct Benefit Transfer (DBT)',
      titleNative: 'सीधे बैंक खाते में डीबीटी भुगतान',
      desc: 'Automated 100% MSP payout remittance to Aadhaar linked bank A/C',
      timestamp: currentToken?.completedAt ? new Date(currentToken.completedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Awaiting Final Approval',
      icon: CreditCard,
      officer: 'PFMS Central Treasury Gateway',
      completed: currentStageIdx >= 4,
      active: currentStageIdx === 4,
      data: currentToken?.totalMspPayout ? `Total Paid: ₹${currentToken.totalMspPayout.toLocaleString('en-IN')} (Ref: ${currentToken.pfmsRefId || 'PFMS-2026'})` : `Est. Payout: ₹${Math.round((currentToken?.estimatedQuantityQtl || 50) * (currentToken?.mspRate || 2320)).toLocaleString('en-IN')}`
    }
  ];

  const handleVoiceStatus = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const activeStage = stages[currentStageIdx] || stages[0];
      const voiceText = `KisanSetu Token: ${currentToken?.tokenNumber}. Farmer: ${currentToken?.farmerName}. Current Status: ${activeStage.title}. Commodity: ${getCommodityName(currentToken?.commodity, language)}.`;
      speakText(voiceText, language);
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#133B6B] text-white p-5 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-purple-400">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-purple-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3" /> End-to-End Tracking
            </span>
            <span className="text-xs text-slate-300">PFMS & Electronic Mandi Real-Time Pipeline</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <Clock className="w-5 h-5 text-purple-400" />
            <span>{t.timelineTitle || 'Real-Time Procurement Status Timeline'}</span>
          </h2>
          <p className="text-xs text-slate-200 mt-1 max-w-2xl">
            {t.timelineSubtitle || 'Track your harvest from gate entry to direct bank payment verification in real-time.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleVoiceStatus}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg shadow transition flex items-center space-x-1.5 ${
              isSpeaking ? 'bg-red-600 text-white animate-pulse' : 'bg-purple-400 hover:bg-purple-500 text-slate-950'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? (t.stopVoice || 'Stop Audio') : (t.listenVoice || 'Listen Status')}</span>
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: Token Switcher & Search */}
        <div className="bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-b border-slate-200 pb-2">
              Track Any Token ID
            </h3>
            <form onSubmit={handleSearch} className="flex gap-2 mt-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Token (e.g. KS-2026-RAM-0101)..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono font-medium focus:border-[#0B2545] focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-[#0B2545] hover:bg-[#07172C] text-white text-xs font-bold rounded-lg shadow transition flex items-center"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>
            {searchError && <p className="text-[11px] text-red-600 mt-1">{searchError}</p>}
          </div>

          <div>
            <span className="text-xs font-bold text-slate-600 uppercase block mb-2">
              Recent Mandi Tokens
            </span>
            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {tokens.slice(0, 6).map((tok) => {
                const isSelected = currentToken?.id === tok.id;
                return (
                  <div
                    key={tok.id}
                    onClick={() => setActiveTimelineToken(tok)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition ${
                      isSelected
                        ? 'border-[#0B2545] bg-blue-50/60 shadow-sm font-bold'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex justify-between items-center font-mono">
                      <span className="text-[#0B2545]">{tok.tokenNumber}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded uppercase ${
                        tok.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-900' :
                        tok.status === 'AT_WEIGHBRIDGE' ? 'bg-purple-100 text-purple-900' :
                        'bg-amber-100 text-amber-900'
                      }`}>
                        {tok.status}
                      </span>
                    </div>
                    <div className="text-slate-900 mt-1 font-semibold">{tok.farmerName}</div>
                    <div className="text-[10px] text-slate-500">{getCommodityName(tok.commodity, language)} • {tok.slotWindow}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: 5-Stage Progressive Timeline */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 sm:p-6 border border-slate-300 shadow-sm space-y-6">
          {/* Active Token Banner */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-slate-500 uppercase">Live E-Token Record:</span>
                <span className="text-lg font-mono font-black text-[#0B2545]">{currentToken?.tokenNumber}</span>
              </div>
              <div className="text-xs text-slate-700 mt-0.5">
                Farmer: <strong className="text-slate-900">{currentToken?.farmerName}</strong> ({currentToken?.village}) • Crop: <strong className="text-emerald-800">{getCommodityName(currentToken?.commodity, language)}</strong>
              </div>
            </div>

            <button
              onClick={() => setActivePassToken(currentToken)}
              className="px-3.5 py-1.5 bg-[#0B2545] hover:bg-[#07172C] text-white text-xs font-bold rounded-lg shadow transition flex items-center space-x-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t.printPass || 'View Gate Pass'}</span>
            </button>
          </div>

          {/* Vertical Stepper */}
          <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {stages.map((stg, idx) => {
              const Icon = stg.icon;
              return (
                <div key={stg.id} className="relative group">
                  {/* Step Dot */}
                  <div className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition ${
                    stg.completed 
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm' 
                      : stg.active
                      ? 'bg-amber-500 border-amber-500 text-white animate-pulse'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}>
                    {stg.completed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-2.5 h-2.5 fill-current" />}
                  </div>

                  {/* Stage Card */}
                  <div className={`p-4 rounded-xl border transition ${
                    stg.active
                      ? 'bg-amber-50/60 border-amber-300 shadow-sm'
                      : stg.completed
                      ? 'bg-white border-slate-200'
                      : 'bg-slate-50/50 border-slate-200 text-slate-400'
                  }`}>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                      <div className="flex items-center space-x-2">
                        <Icon className={`w-4 h-4 ${stg.completed ? 'text-emerald-700' : stg.active ? 'text-amber-700' : 'text-slate-400'}`} />
                        <h4 className={`text-sm font-bold ${stg.completed ? 'text-slate-900' : stg.active ? 'text-amber-950 font-black' : 'text-slate-500'}`}>
                          {stg.title}
                        </h4>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                        stg.completed ? 'bg-emerald-100 text-emerald-900' :
                        stg.active ? 'bg-amber-200 text-amber-950' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {stg.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1">
                      {stg.desc}
                    </p>

                    {/* Metadata strip */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap justify-between items-center text-[11px] gap-2">
                      <div className="font-mono font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        {stg.data}
                      </div>
                      <div className="text-slate-500 text-[10px]">
                        Authorized: <span className="font-medium text-slate-700">{stg.officer}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
