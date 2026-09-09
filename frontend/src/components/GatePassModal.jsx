import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { usePortal } from '../context/PortalContext';
import { 
  X, 
  Printer, 
  Share2, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  AlertCircle,
  MessageSquare,
  FileCheck2,
  Building2,
  Volume2,
  VolumeX
} from 'lucide-react';

export const GatePassModal = () => {
  const { 
    activePassToken, 
    setActivePassToken, 
    setActiveWhatsAppModal, 
    getCommodityName,
    getCenterName,
    speakText,
    isSpeaking,
    stopSpeaking,
    language, 
    t 
  } = usePortal();

  if (!activePassToken) return null;

  const qrDataString = JSON.stringify({
    passId: activePassToken.tokenNumber,
    kisanId: activePassToken.kisanRegId,
    farmer: activePassToken.farmerName,
    crop: activePassToken.commodity,
    center: activePassToken.centerName,
    slot: activePassToken.slotWindow,
    vehicle: activePassToken.vehicleRegistration,
    authority: "Ministry of Agriculture & Farmers Welfare - GoI",
    digitalSignature: "SHA256:7a9c8e1f0b4d2e8a1c6e4f3a"
  });

  const handlePrint = () => {
    window.print();
  };

  const handleOpenWhatsApp = () => {
    setActiveWhatsAppModal({
      token: activePassToken,
      eventType: 'SLOT_CONFIRMED'
    });
  };

  const handleVoiceReadout = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const speech = `${t.passFormTitle}. ${t.fullName}: ${activePassToken.farmerName}. Token: ${activePassToken.tokenNumber}. ${t.commodity}: ${getCommodityName(activePassToken.commodity, language)}. ${t.selectSlot}: ${activePassToken.slotWindow}. ${t.selectCenter}: ${getCenterName(activePassToken.centerName, language)}. ${t.statutoryDisclaimer}`;
      speakText(speech, language);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-300">
        {/* Top Dialog Action Bar */}
        <div className="bg-[#0B2545] text-white px-6 py-3 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center space-x-2.5">
            <div className="p-1 bg-[#137547] rounded text-white">
              <FileCheck2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-wide">
                {t.passFormTitle}
              </h3>
              <p className="text-[11px] text-slate-300">
                {t.govDepartment}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActivePassToken(null)}
            className="text-slate-300 hover:text-white p-1 rounded hover:bg-slate-800 transition text-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Official Government Pass Document */}
        <div id="printable-gate-pass" className="p-6 bg-slate-50 space-y-4">
          <div className="bg-white border-2 border-slate-400 rounded-lg p-6 shadow-sm relative font-sans text-slate-900">
            {/* Top Official Emblem & Pass Title Header */}
            <div className="text-center border-b-2 border-slate-900 pb-3 mb-4">
              <div className="flex items-center justify-between">
                {/* Emblem */}
                <div className="w-12 h-12 flex flex-col items-center justify-center text-center border border-slate-300 rounded bg-slate-100">
                  <span className="text-xs font-black text-slate-800">GOVT</span>
                  <span className="text-[7px] font-bold uppercase mt-0.5">सत्यमेव जयते</span>
                </div>

                <div className="flex-1 px-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    {t.govIndia} | GOVERNMENT OF INDIA
                  </div>
                  <div className="text-sm md:text-base font-black text-[#0B2545] uppercase">
                    {t.govMinistry}
                  </div>
                  <div className="text-[11px] font-bold text-[#137547] uppercase mt-0.5">
                    NATIONAL MSP DIGITAL PROCUREMENT GATE ENTRY PASS (FORM 7-A)
                  </div>
                </div>

                {/* Mandi Stamp Box */}
                <div className="w-20 border border-slate-400 p-1 text-center rounded bg-slate-50 text-[9px] font-mono">
                  <div className="font-bold text-slate-700">NIC PORTAL</div>
                  <div className="text-emerald-700 font-black">VALID</div>
                </div>
              </div>
            </div>

            {/* Token ID & QR Code Header Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-300 gap-3">
              <div>
                <span className="text-[9px] font-bold tracking-wider uppercase text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                  GUARANTEED MSP TIME-SLOT ALLOTMENT
                </span>
                <div className="text-2xl font-mono font-black text-[#0B2545] tracking-wider mt-1">
                  {activePassToken.tokenNumber}
                </div>
                <div className="text-xs text-slate-600 font-mono mt-0.5">
                  Issue Timestamp: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}, {new Date().toLocaleTimeString('en-IN')}
                </div>
              </div>

              {/* Scannable QR Code */}
              <div className="flex flex-col items-center bg-white p-2 rounded border border-slate-300 shadow-sm">
                <QRCodeSVG
                  value={qrDataString}
                  size={95}
                  level="H"
                  includeMargin={false}
                />
                <span className="text-[8px] font-mono font-bold text-slate-500 mt-1 uppercase">
                  Mandi Gate Inward Scan
                </span>
              </div>
            </div>

            {/* Formal Details Tables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 text-xs border-b border-slate-300">
              {/* Farmer & Land Ledger Record */}
              <div className="space-y-1.5 bg-slate-50/80 p-3.5 rounded border border-slate-200">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-[#0B2545] border-b pb-1">
                  1. {t.farmerIdentity}
                </h4>
                <div className="space-y-1 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.fullName}:</span>
                    <strong className="text-slate-900 font-bold">{activePassToken.farmerName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.mobileNumber}:</span>
                    <span className="font-mono font-semibold">{activePassToken.farmerMobile}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.kisanRegId}:</span>
                    <span className="font-mono font-bold text-[#0B2545]">{activePassToken.kisanRegId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.village} / {t.district}:</span>
                    <span>{activePassToken.village}, {activePassToken.district}</span>
                  </div>
                </div>
              </div>

              {/* Crop & Vehicle Logistics */}
              <div className="space-y-1.5 bg-slate-50/80 p-3.5 rounded border border-slate-200">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[10px] text-[#0B2545] border-b pb-1">
                  2. {t.cropDetails}
                </h4>
                <div className="space-y-1 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.commodity}:</span>
                    <strong className="text-[#137547] font-bold">{getCommodityName(activePassToken.commodity, language)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.activeMspRate}:</span>
                    <span className="font-bold text-slate-900 font-mono">₹{activePassToken.mspRate} / qtl</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.estimatedQty}:</span>
                    <span className="font-semibold">{activePassToken.estimatedQuantityQtl} Quintals</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t.vehicleRegNo}:</span>
                    <span className="font-mono font-bold text-slate-900 uppercase">{activePassToken.vehicleRegistration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Allotted Center & Slot Highlight Strip */}
            <div className="mt-3 p-3.5 rounded bg-emerald-50/80 border border-emerald-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-2 text-xs">
              <div>
                <div className="text-[10px] text-emerald-900 font-bold uppercase tracking-wider">
                  {t.selectCenter}
                </div>
                <div className="text-sm font-black text-slate-900 mt-0.5">
                  {getCenterName(activePassToken.centerName, language)}
                </div>
              </div>

              <div className="bg-white px-3 py-1.5 rounded border border-emerald-400 shadow-sm text-right">
                <div className="text-[9px] text-slate-500 font-bold uppercase">{t.selectSlot}</div>
                <div className="text-sm font-black text-emerald-800 font-mono">
                  {activePassToken.slotWindow}
                </div>
              </div>
            </div>

            {/* Regulatory Terms & Quality Disclaimer */}
            <div className="mt-3 text-[10px] text-slate-600 bg-slate-100 p-2.5 rounded border border-slate-200 space-y-1">
              <div>
                <strong>{t.statutoryDisclaimer}</strong>
              </div>
              <div className="text-slate-400 font-mono text-[9px] pt-1 flex justify-between">
                <span>Ref: Section 12(A) National Food Security Act & CACP Guidelines</span>
                <span>System Generated by National Informatics Centre (NIC)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-2 rounded bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 font-bold shadow-sm transition"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>{t.printPass}</span>
            </button>

            <button
              onClick={handleVoiceReadout}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded font-bold shadow-sm transition ${
                isSpeaking ? 'bg-red-600 text-white' : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
              <span>{isSpeaking ? t.stopVoice : t.listenVoice}</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleOpenWhatsApp}
              className="flex items-center space-x-1.5 px-4 py-2 rounded bg-[#137547] hover:bg-[#0D4F30] text-white font-bold shadow transition"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.sendWhatsAppAlert}</span>
            </button>

            <button
              onClick={() => setActivePassToken(null)}
              className="px-4 py-2 rounded bg-[#0B2545] hover:bg-[#07172C] text-white font-bold shadow transition"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
