import React, { useState, useEffect } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  Building2, 
  PhoneCall, 
  Globe, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  SlidersHorizontal, 
  Tv, 
  Volume2,
  VolumeX,
  ChevronDown,
  Bell,
  QrCode,
  Server,
  Activity,
  Smartphone
} from 'lucide-react';

export const Header = () => {
  const { 
    activeRole, 
    setActiveRole, 
    language, 
    setLanguage, 
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    isArchitectureModalOpen,
    setIsArchitectureModalOpen,
    notifications,
    SUPPORTED_LANGUAGES,
    selectedCenterId, 
    setSelectedCenterId, 
    centers, 
    tokens,
    getCenterName,
    speakText,
    isSpeaking,
    stopSpeaking,
    t 
  } = usePortal();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [fontSizeOffset, setFontSizeOffset] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const inYardCount = tokens.filter(t => t.status === 'WAITING_IN_YARD').length;
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const handleVoiceGuidanceClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const guidanceTexts = {
        hi: 'किसान सेतु ई-उपार्जन पोर्टल पर आपका स्वागत है। यहां आप अपनी फसल का निश्चित २-घंटे का स्लॉट बुक कर सकते हैं, नमी जांच करा सकते हैं, और सीधे अपने बैंक खाते में न्यूनतम समर्थन मूल्य प्राप्त कर सकते हैं।',
        en: 'Welcome to KisanSetu National MSP Portal. Here you can book guaranteed 2-hour arrival slots, undergo grain moisture verification, and receive direct PFMS DBT bank payments.',
        pa: 'ਕਿਸਾਨ ਸੇਤੂ ਈ-ਖ਼ਰੀਦ ਪੋਰਟਲ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ। ਇੱਥੇ ਤੁਸੀਂ ਆਪਣੀ ਫ਼ਸਲ ਲਈ ਨਿਸ਼ਚਿਤ ਸਲਾਟ ਬੁੱਕ ਕਰ ਸਕਦੇ ਹੋ ਅਤੇ ਸਿੱਧਾ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਭੁਗਤਾਨ ਪ੍ਰਾਪਤ ਕਰ ਸਕਦੇ ਹੋ।',
        mr: 'किसान सेतू ई-खरेदी पोर्टलवर आपले स्वागत आहे. येथे आपण आपल्या शेतीमालासाठी २-तासांचा स्लॉट बुक करू शकता आणि हमीभाव रक्कम थेट बँक खात्यात मिळवू शकता.',
        gu: 'કિસાન સેતુ ઈ-ખરીદ પોર્ટલ પર આપનું સ્વાગત છે. અહીં તમે તમારા પાક માટે સ્લોટ બુક કરી શકો છો અને ટેકાના ભાવ સીધા બેંક ખાતામાં મેળવી શકો છો.',
        bn: 'কিসান সেতু ই-সংগ্রহ পোর্টালে আপনাকে স্বাগতম। এখানে আপনি ফসলের জন্য নির্দিষ্ট স্লট বুক করতে পারেন এবং সরাসরি ব্যাঙ্ক অ্যাকাউন্টে MSP পেতে পারেন।',
        te: 'కిసాన్ సేతు ఇ-సేకరణ పోర్టల్‌కు స్వాగతం. ఇక్కడ మీరు మీ పంటకు స్లాట్ బుక్ చేసుకోవచ్చు మరియు మద్దతు ధరను నేరుగా బ్యాంక్ ఖాతాలో పొందవచ్చు.',
        ta: 'கிசான் சேது இ-கொள்முதல் தளத்திற்கு தங்களை வரவேற்கிறோம். இங்கு நீங்கள் உங்களின் பயிருக்கு நேர ஒதுக்கீடு செய்து குறைந்தபட்ச ஆதரவு விலையை நேரடியாக வங்கியில் பெறலாம்.',
        kn: 'ಕಿಸಾನ್ ಸೇತು ಇ-ಖರೀದಿ ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ. ಇಲ್ಲಿ ನೀವು ನಿಮ್ಮ ಬೆಳೆಗೆ ಸ್ಲಾಟ್ ಕಾಯ್ದಿರಿಸಬಹುದು ಮತ್ತು ಬೆಂಬಲ ಬೆಲೆಯನ್ನು ನೇರವಾಗಿ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಪಡೆಯಬಹುದು.',
        or: 'କିଷାନ ସେତୁ ଇ-କ୍ରୟ ପୋର୍ଟାଲକୁ ଆପଣଙ୍କୁ ସ୍ୱାଗତ। ଏଠାରେ ଆପଣ ଫସଲ ବିକ୍ରି ପାଇଁ ସ୍ଲଟ୍ ବୁକ୍ କରିପାରିବେ ଏବଂ ସିଧାସଳଖ ବ୍ୟାଙ୍କ ଖାତାରେ ଟଙ୍କା ପାଇପାରିବେ।',
        ml: 'കിസാൻ സേതു ഇ-സംഭരണ പോർട്ടലിലേക്ക് സ്വാഗതം. ഇവിടെ നിങ്ങൾക്ക് വിള സംഭരണ സ്ലോട്ട് ബുക്ക് ചെയ്യാനും താങ്ങുവില തുക നേരിട്ട് ബാങ്ക് അക്കൗണ്ടിൽ സ്വീകരിക്കാനും സാധിക്കും.',
        as: 'কিষাণ সেতু ই-সংগ্ৰহ পʼৰ্টেললৈ আপোনাক স্বাগতম। ইয়াত আপুনি শস্য সংগ্ৰহৰ বাবে স্লট বুক কৰিব পাৰে আৰু পোনে পোনে বেংক একাউণ্টত ধন লাভ কৰিব পাৰে।'
      };
      speakText(guidanceTexts[language] || guidanceTexts.en, language);
    }
  };

  return (
    <header className="w-full bg-[#0B2545] text-white shadow-md sticky top-0 z-40">
      {/* 1. Official Government Top Strip */}
      <div className="bg-[#07172C] text-slate-300 text-xs px-3 sm:px-6 lg:px-8 py-1.5 border-b border-slate-700/60 flex flex-wrap justify-between items-center text-[11px] gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="flex items-center space-x-1.5 font-semibold text-slate-200">
            <span className="text-sm">🇮🇳</span>
            <span>{t.govIndia} | Government of India</span>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="text-slate-300 hidden md:inline font-medium text-[11px]">
            {t.govMinistry}
          </span>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Toll-Free Helpdesk */}
          <div className="flex items-center space-x-1 text-emerald-400 font-medium hidden sm:flex">
            <PhoneCall className="w-3 h-3 text-gov-saffron" />
            <span>{t.tollFree}: <strong className="text-white font-mono">1800-180-1551</strong></span>
          </div>

          <span className="text-slate-600 hidden sm:inline">|</span>

          {/* Live Official Clock */}
          <div className="flex items-center space-x-1 text-slate-300 font-mono text-[10px] sm:text-[11px]">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>
              {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST
            </span>
          </div>

          <span className="text-slate-600">|</span>

          {/* Voice Assistance Button */}
          <button
            onClick={handleVoiceGuidanceClick}
            className={`flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold border transition ${
              isSpeaking
                ? 'bg-red-600 text-white border-red-400 animate-pulse'
                : 'bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border-emerald-600'
            }`}
            title={isSpeaking ? t.stopVoice : t.listenVoice}
          >
            {isSpeaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-emerald-300" />}
            <span className="hidden sm:inline">{isSpeaking ? t.stopVoice : t.listenVoice}</span>
          </button>

          <span className="text-slate-600 hidden md:inline">|</span>

          {/* Smart Notification Drawer Trigger Button */}
          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="relative p-1.5 rounded-lg bg-[#133B6B] hover:bg-[#1A4E8C] text-amber-300 transition flex items-center justify-center border border-slate-600 cursor-pointer"
            title="Notifications & Smart Alerts / सूचनाएं"
          >
            <Bell className="w-3.5 h-3.5" />
            {notifications && notifications.some(n => !n.read) && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-[#07172C] animate-pulse" />
            )}
          </button>

          <span className="text-slate-600 hidden md:inline">|</span>

          {/* Multi-Language Selector Trigger Button */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-800 to-[#137547] hover:from-emerald-700 hover:to-emerald-600 text-white rounded-lg px-2.5 py-1 border border-emerald-400/60 shadow-sm transition group cursor-pointer text-xs font-bold"
              title="Change Portal Language / भाषा बदलें"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300 group-hover:rotate-45 transition-transform" />
              <span className="font-sans font-black">{currentLangObj.name}</span>
              <span className="text-[10px] text-emerald-200 uppercase font-mono">({currentLangObj.code})</span>
              <ChevronDown className="w-3 h-3 text-emerald-200" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Official National Emblem & Ministry Identity Header */}
      <div className="px-4 lg:px-8 py-3 bg-[#0B2545] flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#133B6B]">
        <div className="flex items-center space-x-3.5">
          {/* Authentic Government Emblem Crest Representation */}
          <div className="flex-shrink-0 flex items-center justify-center w-12 h-14 bg-white/95 rounded-lg shadow-inner p-1 border border-amber-300">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-xs font-black text-[#0B2545] tracking-tighter" title="State Emblem of India">GOVT</span>
              <span className="text-[6px] font-bold text-[#07172C] uppercase tracking-tighter mt-0.5">सत्यमेव जयते</span>
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl lg:text-2xl font-black tracking-tight text-white flex items-center">
                <span>{t.portalTitle}</span>
                <span className="ml-2 text-[10px] uppercase px-2 py-0.5 rounded bg-[#137547] text-emerald-100 font-bold tracking-wider border border-emerald-400/40">
                  NIC 2.0 • 12 Languages
                </span>
              </h1>
            </div>
            <div className="text-xs text-slate-200 font-medium mt-0.5">
              {t.portalSubtitle}
            </div>
            <div className="text-[10px] text-amber-300/90 font-medium">
              {t.subTitleFci}
            </div>
          </div>
        </div>

        {/* Procurement Center Selection */}
        <div className="flex items-center space-x-3 self-end md:self-auto">
          <div className="flex items-center space-x-2 bg-[#07172C] border border-slate-700 rounded-lg px-3 py-1.5">
            <Building2 className="w-4 h-4 text-gov-saffron" />
            <div className="flex flex-col">
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                {language === 'hi' ? 'चयनित शासकीय क्रय केंद्र' : 'Active Procurement Center (PPC)'}
              </span>
              <select
                value={selectedCenterId}
                onChange={(e) => setSelectedCenterId(e.target.value)}
                className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer pr-1 max-w-[240px] sm:max-w-none truncate"
              >
                {centers.map(center => (
                  <option key={center.id} value={center.id} className="bg-[#0B2545] text-white">
                    {getCenterName(center, language)} ({center.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Official Role-Based Navigation Bar */}
      <div className="bg-[#07172C] px-4 lg:px-8 flex justify-between items-center overflow-x-auto no-scrollbar border-t border-slate-800">
        <div className="flex space-x-1.5 py-1.5 min-w-max">
          <button
            onClick={() => setActiveRole('farmer')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg font-semibold text-xs md:text-sm transition-all whitespace-nowrap border-b-2 cursor-pointer ${
              activeRole === 'farmer'
                ? 'bg-[#0B2545] text-white border-gov-saffron font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white border-transparent'
            }`}
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>1. {t.farmerTab || 'Farmer Portal'}</span>
          </button>

          <button
            onClick={() => setActiveRole('gate_kiosk')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg font-semibold text-xs md:text-sm transition-all whitespace-nowrap border-b-2 cursor-pointer ${
              activeRole === 'gate_kiosk'
                ? 'bg-[#0B2545] text-white border-gov-saffron font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white border-transparent'
            }`}
          >
            <QrCode className="w-4 h-4 text-emerald-300" />
            <span>2. Gate Kiosk</span>
            <span className="bg-emerald-900/90 text-emerald-200 border border-emerald-500 text-[9px] px-1.5 py-0.2 rounded font-mono font-bold uppercase">
              Fast Scan
            </span>
          </button>

          <button
            onClick={() => setActiveRole('mandi_ops')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg font-semibold text-xs md:text-sm transition-all whitespace-nowrap border-b-2 cursor-pointer ${
              activeRole === 'mandi_ops'
                ? 'bg-[#0B2545] text-white border-gov-saffron font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white border-transparent'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 text-amber-400" />
            <span>3. {t.mandiTab || 'Mandi Operations'}</span>
            <span className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
              {inYardCount} Yard
            </span>
          </button>

          <button
            onClick={() => setActiveRole('admin_oversight')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg font-semibold text-xs md:text-sm transition-all whitespace-nowrap border-b-2 cursor-pointer ${
              activeRole === 'admin_oversight'
                ? 'bg-[#0B2545] text-white border-gov-saffron font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white border-transparent'
            }`}
          >
            <Activity className="w-4 h-4 text-amber-400" />
            <span>4. National Oversight</span>
            <span className="bg-amber-400 text-slate-950 text-[9px] px-1.5 py-0.2 rounded font-black uppercase">
              Cross-Center
            </span>
          </button>

          <button
            onClick={() => setActiveRole('mobile_app')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg font-semibold text-xs md:text-sm transition-all whitespace-nowrap border-b-2 cursor-pointer ${
              activeRole === 'mobile_app'
                ? 'bg-gradient-to-r from-emerald-600 to-[#137547] text-white border-gov-saffron font-bold shadow-md ring-1 ring-emerald-300'
                : 'text-emerald-300 hover:bg-slate-800 hover:text-white border-transparent bg-emerald-950/40'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>15 Mobile UI Screens</span>
            <span className="bg-amber-400 text-slate-950 text-[9px] px-1.5 py-0.2 rounded font-black uppercase">
              NEW
            </span>
          </button>

          <button
            onClick={() => setActiveRole('yard_display')}
            className={`flex items-center space-x-2 px-3.5 py-2 rounded-t-lg font-semibold text-xs md:text-sm transition-all whitespace-nowrap border-b-2 cursor-pointer ${
              activeRole === 'yard_display'
                ? 'bg-[#0B2545] text-white border-gov-saffron font-bold shadow-sm'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white border-transparent'
            }`}
          >
            <Tv className="w-4 h-4 text-sky-400" />
            <span>5. {t.yardTab || 'LED Yard'}</span>
            <span className="bg-red-600 text-white text-[9px] uppercase font-bold px-1.5 py-0.2 rounded-full animate-pulse">
              LIVE
            </span>
          </button>
        </div>

        <div className="hidden lg:flex items-center pl-3 py-1.5">
          <button
            onClick={() => setIsArchitectureModalOpen(true)}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold transition border border-slate-700 cursor-pointer"
            title="Inspect System Architecture, Load Balancer & Gateways"
          >
            <Server className="w-3.5 h-3.5" />
            <span>Topology</span>
          </button>
        </div>
      </div>
    </header>
  );
};
