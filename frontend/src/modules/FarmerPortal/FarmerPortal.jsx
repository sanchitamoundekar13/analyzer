import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { COMMODITIES, VEHICLE_TYPES } from '../../data/constants';
import { 
  Building2, 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  FileText, 
  TrendingUp, 
  FileCheck2,
  BadgePercent,
  CheckCircle2,
  Printer,
  MessageSquare,
  Sparkles,
  QrCode,
  Volume2,
  VolumeX,
  Calendar,
  Zap,
  Activity,
  Bell
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { LiveQueuePredictor } from '../../components/LiveQueuePredictor';
import { ProcurementCalendar } from '../../components/ProcurementCalendar';
import { ProcurementStatusTimeline } from '../../components/ProcurementStatusTimeline';
import { SmartCenterRecommender } from '../../components/SmartCenterRecommender';
import { SmartArrivalNotification } from '../../components/SmartArrivalNotification';
import { BigHaatAgronomySuite } from '../../components/BigHaatAgronomySuite';
import { Leaf } from 'lucide-react';

export const FarmerPortal = () => {
  const { 
    centers, 
    selectedCenterId, 
    setSelectedCenterId, 
    bookSlot, 
    tokens, 
    setActivePassToken, 
    setActiveWhatsAppModal,
    getCommodityName,
    getVehicleName,
    getCenterName,
    speakText,
    isSpeaking,
    stopSpeaking,
    farmerActiveView,
    setFarmerActiveView,
    selectedCalendarDate,
    language, 
    t 
  } = usePortal();

  // Form State
  const [formData, setFormData] = useState({
    farmerName: 'Balwant Singh Chauhan',
    farmerMobile: '9876543210',
    kisanRegId: 'UP-KHA-2026-55421',
    village: 'Rampur Kalan',
    district: 'Rampur',
    state: 'Uttar Pradesh',
    commodity: 'Paddy (Grade A)',
    estimatedQuantityQtl: '75',
    vehicleType: 'Tractor-Trolley (ट्रैक्टर-ट्रॉली)',
    vehicleRegistration: 'UP 22 AB 9988',
    centerId: selectedCenterId,
    slotId: 'slot-4',
    slotWindow: '02:00 PM - 04:00 PM',
  });

  const [activeTab, setActiveTab] = useState('book'); // 'book' | 'search'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [lastGeneratedPass, setLastGeneratedPass] = useState(null);

  const activeCenter = centers.find(c => c.id === (formData.centerId || selectedCenterId)) || centers[0];
  const selectedCommodity = COMMODITIES.find(c => c.name === formData.commodity) || COMMODITIES[0];
  const qty = parseFloat(formData.estimatedQuantityQtl) || 0;
  const estimatedPayout = Math.round(qty * selectedCommodity.mspRate);

  const handleCenterChange = (centerId) => {
    const targetCenter = centers.find(c => c.id === centerId) || centers[0];
    const firstAvailableSlot = targetCenter.slots.find(s => s.status !== 'FULL') || targetCenter.slots[0];
    setFormData(prev => ({
      ...prev,
      centerId,
      slotId: firstAvailableSlot.id,
      slotWindow: firstAvailableSlot.timeWindow
    }));
    setSelectedCenterId(centerId);
  };

  const handleSlotSelect = (slot) => {
    if (slot.status === 'FULL') return;
    setFormData(prev => ({
      ...prev,
      slotId: slot.id,
      slotWindow: slot.timeWindow
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.farmerName || !formData.farmerMobile || !formData.kisanRegId) {
      alert('Please fill all mandatory fields / कृपया सभी अनिवार्य विवरण भरें');
      return;
    }
    const createdToken = bookSlot({
      ...formData,
      centerId: selectedCenterId,
      slotDate: selectedCalendarDate
    });
    setLastGeneratedPass(createdToken);

    // Audio read confirmation
    const speechMessage = `${t.slotConfirmedBanner || 'Slot Booking Confirmed'}. ${createdToken.farmerName}, ${t.commodity || 'Crop'}: ${getCommodityName(createdToken.commodity, language)}. ${t.selectSlot || 'Slot'}: ${createdToken.slotWindow}.`;
    speakText(speechMessage, language);
  };

  const handleSearchPass = (e) => {
    e.preventDefault();
    setSearchError('');
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = tokens.find(
      tok => tok.tokenNumber.toLowerCase().includes(query) || 
             tok.farmerMobile.replace(/\D/g, '').includes(query) ||
             tok.kisanRegId.toLowerCase().includes(query)
    );

    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult(null);
      setSearchError('No active slot record found for provided Token ID or Mobile number.');
    }
  };

  const handleReadPassVoice = (tokenToRead) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const readText = `KisanSetu Gate Pass. Farmer: ${tokenToRead.farmerName}. Token: ${tokenToRead.tokenNumber}. Center: ${getCenterName(tokenToRead.centerName, language)}. Slot Window: ${tokenToRead.slotWindow}. Commodity: ${getCommodityName(tokenToRead.commodity, language)}. Registration: ${tokenToRead.vehicleRegistration}.`;
      speakText(readText, language);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 space-y-5">
      {/* 5-Feature Navigation Bar */}
      <div className="bg-[#0B2545] p-2 rounded-xl shadow-md flex items-center justify-between overflow-x-auto no-scrollbar gap-1 border border-slate-700">
        <div className="flex items-center space-x-1 sm:space-x-1.5 min-w-max">
          <button
            onClick={() => setFarmerActiveView('book')}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              farmerActiveView === 'book'
                ? 'bg-gradient-to-r from-emerald-600 to-[#137547] text-white shadow-sm ring-1 ring-emerald-300'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-300" />
            <span>{t.bookSlotTitle || '1. Book Slot & E-Pass'}</span>
          </button>

          <button
            onClick={() => setFarmerActiveView('queue')}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              farmerActiveView === 'queue'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm ring-1 ring-amber-300'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{t.liveWaitTimeTitle || 'Live Queue Forecast'}</span>
          </button>

          <button
            onClick={() => setFarmerActiveView('calendar')}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              farmerActiveView === 'calendar'
                ? 'bg-gradient-to-r from-emerald-600 to-[#137547] text-white shadow-sm ring-1 ring-emerald-300'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.calendarTitle || 'Schedule Calendar'}</span>
          </button>

          <button
            onClick={() => setFarmerActiveView('timeline')}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              farmerActiveView === 'timeline'
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-sm ring-1 ring-purple-300'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-purple-300" />
            <span>{t.timelineTitle || 'Live Status Timeline'}</span>
          </button>

          <button
            onClick={() => setFarmerActiveView('recommend')}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              farmerActiveView === 'recommend'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-sm ring-1 ring-amber-300'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.recommendTitle || 'Smart Recommender'}</span>
          </button>

          <button
            onClick={() => setFarmerActiveView('notif')}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              farmerActiveView === 'notif'
                ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-sm ring-1 ring-sky-300'
                : 'text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Bell className="w-3.5 h-3.5 text-sky-300" />
            <span>{t.smartNotifTitle || 'Arrival Alerts'}</span>
          </button>

          <button
            onClick={() => setFarmerActiveView('agronomy')}
            className={`px-3 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer ${
              farmerActiveView === 'agronomy'
                ? 'bg-gradient-to-r from-emerald-600 to-[#137547] text-white shadow-sm ring-1 ring-emerald-300'
                : 'text-emerald-300 hover:text-white hover:bg-white/10 bg-emerald-950/60 border border-emerald-600/60'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Additional Farmer Services</span>
          </button>
        </div>
      </div>

      {/* Dynamic Sub-View Render */}
      {farmerActiveView === 'queue' && <LiveQueuePredictor />}
      {farmerActiveView === 'calendar' && <ProcurementCalendar />}
      {farmerActiveView === 'timeline' && <ProcurementStatusTimeline />}
      {farmerActiveView === 'recommend' && <SmartCenterRecommender />}
      {farmerActiveView === 'notif' && <SmartArrivalNotification />}
      {farmerActiveView === 'agronomy' && <BigHaatAgronomySuite />}

      {/* Main Booking & Search View (Default 'book') */}
      {farmerActiveView === 'book' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Official Government Notice Bar */}
          <div className="bg-white border-l-4 border-[#0B2545] p-4 rounded-r-lg shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-white bg-[#0B2545] px-2 py-0.5 rounded tracking-wide uppercase">
                  Official NIC e-Service
                </span>
                <span className="text-xs font-bold text-slate-700">
                  Kharif / Rabi Marketing Season 2026-27 • Direct Benefit Transfer (DBT)
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-1">
                {t.bookSlotTitle}
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                {t.bookSlotSubtitle}
              </p>
            </div>

            {/* Sub Tab Navigation */}
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-300 text-xs font-bold self-stretch md:self-auto">
              <button
                onClick={() => setActiveTab('book')}
                className={`px-3 py-1.5 rounded transition ${
                  activeTab === 'book'
                    ? 'bg-[#0B2545] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                {t.newSlotBooking}
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`px-3 py-1.5 rounded transition flex items-center space-x-1 ${
                  activeTab === 'search'
                    ? 'bg-[#0B2545] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-950'
                }`}
              >
                <Search className="w-3.5 h-3.5" />
                <span>{t.findExistingPass}</span>
              </button>
            </div>
          </div>

          {/* Prominent On-Page E-Gate Pass Card when booked */}
          {lastGeneratedPass && (
            <div className="bg-white border-2 border-[#137547] rounded-xl p-5 shadow-lg space-y-4 animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-200 gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                      {t.slotConfirmedBanner}
                    </span>
                    <h3 className="text-xl font-mono font-black text-[#0B2545] mt-0.5">
                      {lastGeneratedPass.tokenNumber}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleReadPassVoice(lastGeneratedPass)}
                    className={`px-3 py-1.5 text-xs font-bold rounded shadow transition flex items-center space-x-1 ${
                      isSpeaking ? 'bg-red-600 text-white' : 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                    }`}
                  >
                    {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    <span>{isSpeaking ? t.stopVoice : t.listenVoice}</span>
                  </button>

                  <button
                    onClick={() => setActivePassToken(lastGeneratedPass)}
                    className="px-3.5 py-1.5 bg-[#0B2545] hover:bg-[#07172C] text-white text-xs font-bold rounded shadow transition flex items-center space-x-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{t.printPass}</span>
                  </button>

                  <button
                    onClick={() => setActiveWhatsAppModal({ token: lastGeneratedPass, eventType: 'SLOT_CONFIRMED' })}
                    className="px-3.5 py-1.5 bg-[#137547] hover:bg-[#0D4F30] text-white text-xs font-bold rounded shadow transition flex items-center space-x-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t.sendWhatsAppAlert}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px] block">{t.fullName}</span>
                  <strong className="text-slate-900 text-sm block">{lastGeneratedPass.farmerName}</strong>
                  <span className="font-mono text-slate-600">{lastGeneratedPass.farmerMobile}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px] block">{t.commodity}</span>
                  <strong className="text-[#137547] text-sm block">{getCommodityName(lastGeneratedPass.commodity, language)}</strong>
                  <span className="font-mono text-slate-700">{lastGeneratedPass.estimatedQuantityQtl} qtl (₹{lastGeneratedPass.mspRate}/qtl)</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px] block">{t.selectCenter}</span>
                  <strong className="text-slate-900 text-sm block">{getCenterName(lastGeneratedPass.centerName, language)}</strong>
                  <span className="text-slate-600">{lastGeneratedPass.village}, {lastGeneratedPass.district}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[10px] block">{t.selectSlot}</span>
                  <strong className="text-emerald-800 font-mono text-sm block">{lastGeneratedPass.slotWindow}</strong>
                  <span className="font-mono font-bold text-slate-800">{lastGeneratedPass.vehicleRegistration}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'search' ? (
            /* Search Existing Pass View */
            <div className="bg-white rounded-lg p-6 shadow-sm border border-slate-300 space-y-4">
              <div className="max-w-xl mx-auto space-y-4">
                <div className="text-center space-y-1">
                  <h3 className="text-base font-bold text-slate-900">
                    {t.searchPassTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {t.searchPassSubtitle}
                  </p>
                </div>

                <form onSubmit={handleSearchPass} className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Token ID (e.g. KS-2026-RAM-0101) or Mobile..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded text-xs font-mono font-medium focus:border-[#0B2545] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0B2545] hover:bg-[#07172C] text-white font-bold text-xs rounded shadow transition flex-shrink-0"
                  >
                    {t.searchBtn}
                  </button>
                </form>

                {searchError && (
                  <div className="p-3 bg-red-50 border border-red-300 text-red-800 text-xs rounded flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-600" />
                    <span>{searchError}</span>
                  </div>
                )}

                {searchResult && (
                  <div className="bg-slate-50 p-4 rounded border border-slate-300 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Token ID / टोकन संख्या</span>
                        <div className="text-base font-mono font-bold text-[#0B2545]">{searchResult.tokenNumber}</div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${
                        searchResult.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        searchResult.status === 'AT_WEIGHBRIDGE' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                        searchResult.status === 'WAITING_IN_YARD' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                        'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {searchResult.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-slate-500">Farmer:</span> <strong className="text-slate-900">{searchResult.farmerName}</strong></div>
                      <div><span className="text-slate-500">Crop:</span> <strong className="text-emerald-800">{getCommodityName(searchResult.commodity, language)}</strong></div>
                      <div><span className="text-slate-500">Slot:</span> <strong className="font-mono">{searchResult.slotWindow}</strong></div>
                      <div><span className="text-slate-500">Vehicle:</span> <strong className="font-mono">{searchResult.vehicleRegistration}</strong></div>
                    </div>

                    <button
                      onClick={() => setActivePassToken(searchResult)}
                      className="w-full py-2 bg-[#137547] hover:bg-[#0D4F30] text-white font-bold text-xs rounded shadow transition flex items-center justify-center space-x-1.5"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{t.printPass}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Formal Multi-Section Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Section 1: Farmer & Land Records */}
              <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-300 space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded bg-[#0B2545] text-white text-xs font-bold flex items-center justify-center">1</span>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    {t.farmerIdentity}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{t.fullName} *</label>
                    <input
                      type="text"
                      required
                      value={formData.farmerName}
                      onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded font-medium focus:border-[#0B2545] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{t.mobileNumber} *</label>
                    <input
                      type="tel"
                      required
                      maxLength="10"
                      value={formData.farmerMobile}
                      onChange={(e) => setFormData({ ...formData, farmerMobile: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded font-mono font-bold focus:border-[#0B2545] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{t.kisanRegId} *</label>
                    <input
                      type="text"
                      required
                      value={formData.kisanRegId}
                      onChange={(e) => setFormData({ ...formData, kisanRegId: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-[#0B2545] focus:border-[#0B2545] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{t.village} *</label>
                    <input
                      type="text"
                      required
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded font-medium focus:border-[#0B2545] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Crop Specifications & Transport */}
              <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-300 space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded bg-[#0B2545] text-white text-xs font-bold flex items-center justify-center">2</span>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    {t.cropDetails}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{t.commodity} *</label>
                    <select
                      value={formData.commodity}
                      onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded font-bold text-slate-900 focus:border-[#0B2545] focus:outline-none"
                    >
                      {COMMODITIES.map((c) => (
                        <option key={c.id} value={c.name}>
                          {getCommodityName(c, language)} (MSP: ₹{c.mspRate})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{t.estimatedQty} *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      max="1000"
                      value={formData.estimatedQuantityQtl}
                      onChange={(e) => setFormData({ ...formData, estimatedQuantityQtl: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded font-bold font-mono text-slate-900 focus:border-[#0B2545] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{t.vehicleType} *</label>
                    <select
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded font-medium text-slate-900 focus:border-[#0B2545] focus:outline-none"
                    >
                      {VEHICLE_TYPES.map((v) => (
                        <option key={v.id} value={v.name}>
                          {getVehicleName(v, language)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">{t.vehicleRegNo} *</label>
                    <input
                      type="text"
                      required
                      value={formData.vehicleRegistration}
                      onChange={(e) => setFormData({ ...formData, vehicleRegistration: e.target.value })}
                      placeholder="e.g. UP 22 AB 9988"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded font-mono font-bold uppercase text-slate-900 focus:border-[#0B2545] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Official MSP Valuation Strip */}
                <div className="bg-slate-50 border border-slate-300 rounded p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500">{t.activeMspRate}</span>
                    <div className="text-sm font-black text-slate-900 font-mono">
                      ₹{selectedCommodity.mspRate} / Quintal <span className="text-[10px] text-slate-500 font-normal">({selectedCommodity.fciCode})</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-500">{t.estimatedPayout}</span>
                    <div className="text-base font-black text-[#137547] font-mono">
                      ₹{estimatedPayout.toLocaleString('en-IN')} <span className="text-[10px] text-slate-500 font-normal">(100% DBT Net Payout)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Center & Dynamic 2-Hour Slot Selection */}
              <div className="bg-white rounded-lg p-5 shadow-sm border border-slate-300 space-y-3">
                <div className="border-b border-slate-200 pb-2 flex items-center space-x-2">
                  <span className="w-5 h-5 rounded bg-[#0B2545] text-white text-xs font-bold flex items-center justify-center">3</span>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                    {t.centerAndSlot}
                  </h3>
                </div>

                {/* Centers Selection */}
                <div>
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1.5">
                    {t.selectCenter}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                    {centers.map((c) => {
                      const isSelected = (formData.centerId || selectedCenterId) === c.id;
                      const isHigh = c.capacityPercentage >= 80;
                      return (
                        <div
                          key={c.id}
                          onClick={() => handleCenterChange(c.id)}
                          className={`p-3 rounded border-2 cursor-pointer transition ${
                            isSelected
                              ? 'border-[#0B2545] bg-blue-50/50 shadow-sm'
                              : 'border-slate-300 bg-white hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span className="font-bold text-slate-500">{c.code}</span>
                            <span className={`px-1.5 py-0.5 rounded font-bold ${
                              isHigh ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            }`}>
                              {c.capacityPercentage}% Booked
                            </span>
                          </div>
                          <div className="font-bold text-xs text-slate-900 mt-1">
                            {getCenterName(c, language)}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1">
                            Nodal Agency: <strong className="text-slate-700">{c.nodalAgency}</strong>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic Slot Cards */}
                <div className="pt-2">
                  <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1.5">
                    {t.selectSlot}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    {activeCenter.slots.map((slot) => {
                      const isSelected = formData.slotId === slot.id;
                      const isFull = slot.status === 'FULL';

                      return (
                        <div
                          key={slot.id}
                          onClick={() => handleSlotSelect(slot)}
                          className={`p-2.5 rounded border transition text-xs flex flex-col justify-between ${
                            isFull
                              ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                              : isSelected
                              ? 'border-[#0B2545] bg-[#0B2545] text-white font-bold shadow'
                              : 'border-slate-300 bg-white hover:bg-slate-50 cursor-pointer'
                          }`}
                        >
                          <div className="font-mono font-bold text-[11px]">{slot.timeWindow}</div>
                          <div className={`text-[10px] mt-2 ${
                            isFull ? 'text-red-600 font-bold' : isSelected ? 'text-amber-300' : 'text-emerald-700 font-bold'
                          }`}>
                            {isFull ? t.slotFull : `${slot.available} ${t.slotsAvailable}`}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Form Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-[#137547] hover:bg-[#0D4F30] text-white font-bold text-sm rounded shadow-md transition flex items-center justify-center space-x-2 uppercase tracking-wide cursor-pointer"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>{t.generatePassBtn}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
