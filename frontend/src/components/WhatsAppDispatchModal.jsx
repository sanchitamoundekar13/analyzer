import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  X, 
  Send, 
  CheckCircle, 
  ExternalLink, 
  Smartphone, 
  ShieldCheck, 
  Cpu, 
  CheckCheck,
  Volume2,
  VolumeX
} from 'lucide-react';

export const WhatsAppDispatchModal = () => {
  const { 
    activeWhatsAppModal, 
    setActiveWhatsAppModal, 
    getCommodityName,
    getCenterName,
    speakText,
    isSpeaking,
    stopSpeaking,
    language, 
    t 
  } = usePortal();
  const [dispatchStatus, setDispatchStatus] = useState('READY'); // 'READY' | 'SENDING' | 'SENT'

  if (!activeWhatsAppModal) return null;

  const { token, eventType } = activeWhatsAppModal;
  const commodityName = getCommodityName(token.commodity, language);
  const centerName = getCenterName(token.centerName, language);

  const getLocalizedWhatsAppMessage = () => {
    if (eventType === 'SLOT_CONFIRMED') {
      const templates = {
        hi: `[KISANSETU] - शासकीय ई-खरीद गेट पास\n\n` +
          `नमस्ते *${token.farmerName}* जी,\n` +
          `आपका न्यूनतम समर्थन मूल्य (MSP) स्लॉट टोकन सफलतापूर्वक सुरक्षित हो गया है।\n\n` +
          `* टोकन संख्या: ${token.tokenNumber}\n` +
          `* क्रय केंद्र: ${centerName}\n` +
          `* आगमन तिथि: ${token.slotDate || 'आज'}\n` +
          `* आगमन स्लॉट विंडो: ${token.slotWindow}\n` +
          `* कृषि उपज: ${commodityName} (MSP: ₹${token.mspRate}/क्विंटल)\n` +
          `* पंजीकृत वाहन: ${token.vehicleRegistration}\n\n` +
          `[शासकीय निर्देश]:\n` +
          `1. कृपया निर्धारित समय से 15 मिनट पूर्व केंद्र पर उपस्थित हों।\n` +
          `2. भारत सरकार मानक अनुसार अनाज में नमी अनुमत सीमा में होनी चाहिए।\n` +
          `3. मंडी गेट पर यह डिजिटल पास या क्यूआर कोड दिखाएं।\n\n` +
          `कृषि एवं किसान कल्याण मंत्रालय • भारत सरकार\n` +
          `राष्ट्रीय हेल्पडेस्क: 1800-180-1551`,

        mr: `[KISANSETU] - शासकीय हमीभाव ई-खरेदी गेट पास\n\n` +
          `नमस्कार *${token.farmerName}* जी,\n` +
          `आपला हमीभाव (MSP) खरेदी स्लॉट टोकन यशस्वीरित्या नोंदवला गेला आहे.\n\n` +
          `* टोकन क्रमांक: ${token.tokenNumber}\n` +
          `* खरेदी केंद्र: ${centerName}\n` +
          `* तारीख: ${token.slotDate || 'आज'}\n` +
          `* आगमन स्लॉट: ${token.slotWindow}\n` +
          `* शेतीमाल: ${commodityName} (MSP: ₹${token.mspRate}/क्विंटल)\n` +
          `* वाहन क्रमांक: ${token.vehicleRegistration}\n\n` +
          `कृषी आणि शेतकरी कल्याण मंत्रालय • भारत सरकार`,

        en: `[KISANSETU] - Official MSP Procurement Gate Pass (Form 7-A)\n\n` +
          `Dear *${token.farmerName}*,\n` +
          `Your MSP procurement slot has been confirmed under National Procurement Guidelines.\n\n` +
          `* Token ID: ${token.tokenNumber}\n` +
          `* Procurement Center: ${centerName}\n` +
          `* Allotted Date: ${token.slotDate || 'Today'}\n` +
          `* Arrival Window: ${token.slotWindow}\n` +
          `* Commodity: ${commodityName} (MSP: ₹${token.mspRate}/qtl)\n` +
          `* Vehicle Reg.: ${token.vehicleRegistration}\n\n` +
          `[Mandatory Guidelines]:\n` +
          `• Arrive 15 mins prior to slot time.\n` +
          `• Grain moisture must be within statutory limit.\n` +
          `• Present this pass barcode at gate.\n\n` +
          `Ministry of Agriculture & Farmers Welfare • Govt of India\n` +
          `Toll-Free Helpline: 1800-180-1551`
      };
      return templates[language] || templates.en;
    } else {
      const weighTemplates = {
        hi: `[KISANSETU] - शासकीय तुलाई पावती एवं डीबीटी अंतरण\n\n` +
          `नमस्ते *${token.farmerName}* जी,\n` +
          `आपकी फसल की तुलाई शासकीय धर्मकांटे पर सफलतापूर्वक पूर्ण हो चुकी है।\n\n` +
          `* टोकन संख्या: ${token.tokenNumber}\n` +
          `* शुद्ध उपज वजन: ${token.netWeightQtl || 0} क्विंटल\n` +
          `* कुल देय एमएसपी राशि: ₹${(token.totalMspPayout || 0).toLocaleString('en-IN')}\n\n` +
          `यह राशि सीधे आपके आधार से जुड़े बैंक खाते में 48 घंटे में PFMS Direct Benefit Transfer (DBT) द्वारा अंतरित कर दी जाएगी।\n\n` +
          `खाद्य एवं सार्वजनिक वितरण विभाग • भारत सरकार`,

        mr: `[KISANSETU] - शासकीय वजन पावती आणि डीबीटी हस्तांतरण\n\n` +
          `नमस्कार *${token.farmerName}* जी,\n` +
          `आपल्या शेतीमालाचे शासकीय वजन यशस्वीरित्या पूर्ण झाले आहे.\n\n` +
          `* टोकन क्रमांक: ${token.tokenNumber}\n` +
          `* निव्वळ वजन: ${token.netWeightQtl || 0} क्विंटल\n` +
          `* एकूण MSP रक्कम: ₹${(token.totalMspPayout || 0).toLocaleString('en-IN')}\n\n` +
          `ही रक्कम थेट आपल्या आधार संलग्न बँक खात्यात 48 तासांत वर्ग केली जाईल.\n\n` +
          `अन्न व सार्वजनिक वितरण विभाग • भारत सरकार`,

        en: `[KISANSETU] - Official Procurement Settlement Voucher\n\n` +
          `Dear *${token.farmerName}*,\n` +
          `Certified electronic weighment completed for Token ${token.tokenNumber}.\n\n` +
          `* Net Weight: ${token.netWeightQtl || 0} Quintals\n` +
          `* Total MSP Payable: ₹${(token.totalMspPayout || 0).toLocaleString('en-IN')}\n\n` +
          `Direct Benefit Transfer (DBT) credit initiated to your registered bank account via PFMS.\n\n` +
          `Ministry of Agriculture & Farmers Welfare • Govt of India`
      };
      return weighTemplates[language] || weighTemplates.en;
    }
  };

  const messageBody = getLocalizedWhatsAppMessage();
  const cleanMobile = (token.farmerMobile || '9876543210').replace(/\D/g, '');
  const formattedMobile = cleanMobile.length === 10 ? `91${cleanMobile}` : cleanMobile;
  const whatsappWebUrl = `https://wa.me/${formattedMobile}?text=${encodeURIComponent(messageBody)}`;

  const handleSimulateDispatch = () => {
    setDispatchStatus('SENDING');
    setTimeout(() => {
      setDispatchStatus('SENT');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-300">
        {/* Header */}
        <div className="bg-[#075E54] text-white px-5 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded bg-emerald-600/60 flex items-center justify-center border border-emerald-400">
              <Smartphone className="w-4 h-4 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                  Notification Integration Ready
                </span>
                <span className="text-[10px] bg-emerald-800 text-emerald-100 px-1.5 py-0.2 rounded font-mono">
                  Prototype Demo
                </span>
              </div>
              <h3 className="text-sm font-bold text-white leading-tight">
                {eventType === 'SLOT_CONFIRMED' ? 'E-Gate Pass Instant Dispatch' : 'Weighment & PFMS Voucher Dispatch'}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setActiveWhatsAppModal(null)}
            className="text-emerald-100 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Target Recipient Card */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
            <div>
              <span className="text-slate-500 font-medium">Target Farmer: </span>
              <strong className="text-slate-900">{token.farmerName}</strong>
            </div>
            <div className="font-mono text-slate-700 bg-slate-200 px-2 py-0.5 rounded">
              +{formattedMobile}
            </div>
          </div>

          {/* Message Preview Box */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Message Payload Preview
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                Multilingual Template: {language.toUpperCase()}
              </span>
            </div>
            <div className="bg-[#E5DDD5] p-3.5 rounded-xl border border-[#D1D7DB] text-xs font-mono text-slate-900 whitespace-pre-wrap leading-relaxed shadow-inner max-h-56 overflow-y-auto">
              {messageBody}
            </div>
          </div>

          {/* Status Banner */}
          {dispatchStatus === 'SENT' && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center space-x-2 text-emerald-800 text-xs animate-fadeIn font-semibold">
              <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Simulated Notification Dispatched: Telemetry stream logged successfully.</span>
            </div>
          )}

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <a
              href={whatsappWebUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center space-x-1.5 shadow transition cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in WhatsApp Web / App</span>
            </a>

            <button
              onClick={handleSimulateDispatch}
              disabled={dispatchStatus === 'SENDING' || dispatchStatus === 'SENT'}
              className={`flex-1 py-2.5 px-4 rounded-lg font-bold text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer ${
                dispatchStatus === 'SENT'
                  ? 'bg-slate-200 text-slate-600 border border-slate-300'
                  : 'bg-[#0B2545] hover:bg-[#133B6B] text-white shadow'
              }`}
            >
              {dispatchStatus === 'SENDING' ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Transmitting...</span>
                </>
              ) : dispatchStatus === 'SENT' ? (
                <>
                  <CheckCheck className="w-4 h-4 text-emerald-600" />
                  <span>Dispatched to Stream</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Simulate Gateway Push</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
