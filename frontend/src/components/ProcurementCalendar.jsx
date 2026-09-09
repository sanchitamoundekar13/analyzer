import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { COMMODITIES } from '../data/constants';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  ArrowRight,
  Volume2,
  VolumeX,
  Sparkles,
  Info
} from 'lucide-react';

export const ProcurementCalendar = () => {
  const { 
    centers, 
    selectedCenterId, 
    setSelectedCenterId, 
    selectedCalendarDate, 
    setSelectedCalendarDate, 
    getCenterName, 
    getCommodityName, 
    setFarmerActiveView, 
    language, 
    speakText, 
    isSpeaking, 
    stopSpeaking, 
    t 
  } = usePortal();

  const [selectedCrop, setSelectedCrop] = useState('Paddy (Grade A)');
  const activeCenter = centers.find(c => c.id === selectedCenterId) || centers[0];

  // Generate next 14 days from today
  const today = new Date();
  const calendarDays = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-IN', { weekday: 'short' });
    const dayNum = d.getDate();
    const monthName = d.toLocaleDateString('en-IN', { month: 'short' });

    // Mock realistic quota capacities per day
    let availableSlots = 45 - (i * 2) % 30;
    let totalSlots = 60;
    let status = availableSlots > 15 ? 'AVAILABLE' : availableSlots > 0 ? 'LIMITED' : 'FULL';

    if (i === 0) {
      availableSlots = 12; // today
      status = 'LIMITED';
    } else if (i === 1) {
      availableSlots = 38; // tomorrow
      status = 'AVAILABLE';
    } else if (i === 6 || i === 13) {
      availableSlots = 0; // Mandi maintenance holiday
      status = 'HOLIDAY';
    }

    return {
      dateStr,
      dayName,
      dayNum,
      monthName,
      availableSlots,
      totalSlots,
      status,
      isToday: i === 0
    };
  });

  const activeDateObj = calendarDays.find(d => d.dateStr === selectedCalendarDate) || calendarDays[0];

  const handleSelectDate = (day) => {
    if (day.status === 'HOLIDAY') return;
    setSelectedCalendarDate(day.dateStr);
  };

  const handleVoiceCalendar = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const centerName = getCenterName(activeCenter, language);
      const voiceText = `${t.calendarTitle || 'Procurement Schedule'}. ${centerName}. ${t.selectedDate || 'Selected Date'}: ${activeDateObj.dayName} ${activeDateObj.dayNum} ${activeDateObj.monthName}. ${t.availableSlots || 'Slots available'}: ${activeDateObj.availableSlots}.`;
      speakText(voiceText, language);
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B2545] to-[#133B6B] text-white p-5 rounded-xl shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-emerald-400">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" /> Season Schedule 2026-27
            </span>
            <span className="text-xs text-slate-300">National MSP Marketing Window</span>
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-emerald-400" />
            <span>{t.calendarTitle || 'Procurement Schedule Calendar'}</span>
          </h2>
          <p className="text-xs text-slate-200 mt-1 max-w-2xl">
            {t.calendarSubtitle || 'Plan your harvesting & dispatch schedule with live multi-day slot quota availability.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleVoiceCalendar}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg shadow transition flex items-center space-x-1.5 ${
              isSpeaking ? 'bg-red-600 text-white animate-pulse' : 'bg-emerald-400 hover:bg-emerald-500 text-slate-950'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isSpeaking ? (t.stopVoice || 'Stop Audio') : (t.listenVoice || 'Listen Schedule')}</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left: 14-Day Visual Grid */}
        <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-200 gap-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                {t.upcomingArrivalDays || '14-Day Advance Booking Window'}
              </h3>
              <p className="text-xs text-slate-500">
                Click any open day to lock your preferred arrival date
              </p>
            </div>

            {/* Center Selector */}
            <div className="flex items-center space-x-2">
              <Building2 className="w-4 h-4 text-slate-500" />
              <select
                value={selectedCenterId}
                onChange={(e) => setSelectedCenterId(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs font-bold text-slate-900 focus:outline-none"
              >
                {centers.map(c => (
                  <option key={c.id} value={c.id}>
                    {getCenterName(c, language)} ({c.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 14 Days Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
            {calendarDays.map((day) => {
              const isSelected = selectedCalendarDate === day.dateStr;
              const isHoliday = day.status === 'HOLIDAY';
              const isFull = day.status === 'FULL';

              return (
                <div
                  key={day.dateStr}
                  onClick={() => handleSelectDate(day)}
                  className={`p-3 rounded-xl border-2 transition flex flex-col justify-between text-center relative ${
                    isHoliday
                      ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed'
                      : isSelected
                      ? 'border-[#0B2545] bg-[#0B2545] text-white shadow-md cursor-pointer'
                      : 'border-slate-300 bg-white hover:border-[#0B2545] hover:bg-blue-50/50 cursor-pointer'
                  }`}
                >
                  {day.isToday && (
                    <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-1.5 py-0.2 rounded shadow">
                      {t.todayLabel || 'Today'}
                    </span>
                  )}

                  <div>
                    <div className={`text-[11px] font-bold uppercase ${isSelected ? 'text-slate-200' : 'text-slate-500'}`}>
                      {day.dayName}
                    </div>
                    <div className={`text-2xl font-black font-mono my-0.5 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                      {day.dayNum}
                    </div>
                    <div className={`text-[10px] font-bold ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {day.monthName}
                    </div>
                  </div>

                  <div className="mt-2 pt-1 border-t border-slate-200/50">
                    {isHoliday ? (
                      <span className="text-[10px] font-bold text-slate-400">Yard Closed</span>
                    ) : isFull ? (
                      <span className="text-[10px] font-bold text-red-500 uppercase">{t.slotFull || 'Full'}</span>
                    ) : (
                      <div className="flex flex-col">
                        <span className={`text-[10px] font-bold ${
                          isSelected ? 'text-emerald-300' :
                          day.status === 'LIMITED' ? 'text-amber-600' : 'text-emerald-700'
                        }`}>
                          {day.availableSlots} {t.openSlots || 'Slots'}
                        </span>
                        <span className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                          day.status === 'LIMITED' ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'
                        }`} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs pt-2 border-t border-slate-200 text-slate-600">
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>{t.quotaAvailable || 'High Quota (>15 slots)'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span>{t.quotaLimited || 'Filling Fast (<15 slots)'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span>{t.quotaFull || 'Quota Exhausted'}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-3 h-3 rounded-full bg-slate-300" />
              <span>Maintenance Holiday</span>
            </div>
          </div>
        </div>

        {/* Right: Selected Date Detail & Instant Booking CTA */}
        <div className="bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-200 pb-2 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase">{t.selectedDate || 'Selected Schedule Date'}</span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                {activeDateObj.status}
              </span>
            </div>

            <div className="py-4 text-center">
              <div className="text-3xl font-black font-mono text-[#0B2545]">
                {activeDateObj.dayName}, {activeDateObj.dayNum} {activeDateObj.monthName} 2026
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Target PPC: <strong className="text-slate-900">{getCenterName(activeCenter, language)}</strong>
              </div>
            </div>

            {/* Slot Window Breakdown for selected date */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold text-slate-700 uppercase block">
                {t.availableTimeWindows || 'Operational 2-Hour Shifts'}
              </span>

              <div className="space-y-1.5">
                {activeCenter.slots.map(slot => (
                  <div 
                    key={slot.id}
                    className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3.5 h-3.5 text-slate-600" />
                      <span className="font-mono font-bold text-slate-900">{slot.timeWindow}</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      slot.status === 'FULL' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {slot.status === 'FULL' ? 'FULL' : `${slot.available} available`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => setFarmerActiveView('book')}
              className="w-full py-3 bg-[#137547] hover:bg-[#0D4F30] text-white font-bold text-xs rounded-lg shadow-md transition flex items-center justify-center space-x-2 uppercase tracking-wide cursor-pointer"
            >
              <span>{t.proceedWithDate || 'Proceed to Book Slot on this Date'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-center text-slate-500">
              Pass will be issued instantly with electronic QR code and SMS receipt.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
