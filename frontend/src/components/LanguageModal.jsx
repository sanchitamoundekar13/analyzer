import React from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  X, 
  Globe, 
  Check, 
  Volume2, 
  VolumeX, 
  Sparkles,
  MapPin
} from 'lucide-react';

export const LanguageModal = () => {
  const { 
    isLanguageModalOpen, 
    setIsLanguageModalOpen, 
    language, 
    setLanguage, 
    SUPPORTED_LANGUAGES,
    speakText,
    isSpeaking,
    stopSpeaking,
    t
  } = usePortal();

  if (!isLanguageModalOpen) return null;

  const handleSelectLanguage = (langCode) => {
    setLanguage(langCode);
    setIsLanguageModalOpen(false);
    // Audio greeting
    const greetings = {
      hi: 'किसान सेतु पोर्टल में आपका स्वागत है।',
      en: 'Welcome to KisanSetu National MSP Portal.',
      pa: 'ਕਿਸਾਨ ਸੇਤੂ ਪੋਰਟਲ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ।',
      mr: 'किसान सेतू पोर्टलवर आपले सहर्ष स्वागत आहे.',
      gu: 'કિસાન સેતુ પોર્ટલ પર આપનું સ્વાગત છે.',
      bn: 'কিসান সেতু পোর্টালে আপনাকে স্বাগতম।',
      te: 'కిసాన్ సేతు పోర్టల్‌కు స్వాగతం.',
      ta: 'கிசான் சேது தளத்திற்கு தங்களை வரவேற்கிறோம்.',
      kn: 'ಕಿಸಾನ್ ಸೇತು ಪೋರ್ಟಲ್‌ಗೆ ಸ್ವಾಗತ.',
      or: 'କିଷାନ ସେତୁ ପୋର୍ଟାଲକୁ ଆପଣଙ୍କୁ ସ୍ୱାଗତ।',
      ml: 'കിസാൻ സേതു പോർട്ടലിലേക്ക് സ്വാഗതം.',
      as: 'কিষাণ সেতু পʼৰ্টেললৈ আপোনাক স্বাগতম।'
    };
    if (greetings[langCode]) {
      speakText(greetings[langCode], langCode);
    }
  };

  const handleTestVoice = (e, lang) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const sampleTexts = {
        hi: 'नमस्ते किसान भाई, आपकी भाषा हिन्दी चुन ली गई है।',
        en: 'Hello farmer, English language selected.',
        pa: 'ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ ਕਿਸਾਨ ਵੀਰੋ, ਪੰਜਾਬੀ ਬੋਲੀ ਚੁਣੀ ਗਈ ਹੈ।',
        mr: 'नमस्कार शेतकरी बंधूंनो, मराठी भाषा निवडली आहे.',
        gu: 'નમસ્તે ખેડૂત મિત્રો, ગુજરાતી ભાષા પસંદ કરેલ છે.',
        bn: 'নমস্কার কৃষক ভাই, বাংলা ভাষা নির্বাচিত হয়েছে।',
        te: 'నమస్కారం రైతు సోదరులారా, తెలుగు భాష ఎంపిక చేయబడింది.',
        ta: 'வணக்கம் விவசாய பெருமக்களே, தமிழ் மொழி தேர்வு செய்யப்பட்டது.',
        kn: 'ನಮಸ್ಕಾರ ರೈತ ಬಾಂಧವರೇ, ಕನ್ನಡ ಭಾಷೆ ಆಯ್ಕೆಯಾಗಿದೆ.',
        or: 'ନମସ୍କାର ଚାଷୀ ଭାଇ, ଓଡ଼ିଆ ଭାଷା ବଛାଗଲା।',
        ml: 'നമസ്കാരം കർഷക സുഹൃത്തുക്കളെ, മലയാളം തിരഞ്ഞെടുത്തു.',
        as: 'নমস্কাৰ কৃষক ৰাইজ, অসমীয়া ভাষা বাছনি কৰা হʼল।'
      };
      speakText(sampleTexts[lang.code] || 'KisanSetu Portal', lang.code);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-300">
        {/* Modal Header */}
        <div className="bg-[#0B2545] text-white px-6 py-4 flex items-center justify-between border-b border-[#133B6B]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#137547] to-emerald-400 text-white flex items-center justify-center font-bold shadow-md">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black tracking-tight flex items-center space-x-2">
                <span>{t.selectYourLanguage}</span>
                <span className="text-[10px] bg-emerald-800 text-emerald-200 uppercase px-2 py-0.5 rounded font-mono font-bold">
                  12 Languages
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Choose your regional language for easy portal navigation, gate passes, and SMS/WhatsApp alerts.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language Grid */}
        <div className="p-5 sm:p-6 bg-slate-50 max-h-[70vh] overflow-y-auto space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = language === lang.code;

              return (
                <div
                  key={lang.code}
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between group ${
                    isSelected
                      ? 'border-[#137547] bg-emerald-50/90 shadow-md transform scale-[1.02]'
                      : 'border-slate-200 bg-white hover:border-[#0B2545] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-lg font-black text-slate-900 block font-sans tracking-wide">
                        {lang.name}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 block">
                        {lang.englishName} ({lang.script})
                      </span>
                    </div>

                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-[#137547] text-white flex items-center justify-center font-bold text-xs shadow">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <button
                        onClick={(e) => handleTestVoice(e, lang)}
                        className="p-1.5 text-slate-400 hover:text-[#137547] hover:bg-emerald-50 rounded-lg transition"
                        title="Listen sample voice in this language"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{lang.region}</span>
                    </span>

                    <span className={`font-mono text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${
                      isSelected ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {lang.code}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-900 flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-gov-saffron flex-shrink-0" />
              <span>
                <strong>Farmer Voice Audio Help:</strong> Click the audio button on any gate pass or header to listen to full details in your mother tongue!
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs">
          <div className="text-slate-600">
            Current Language: <strong className="text-slate-900 font-bold">{SUPPORTED_LANGUAGES.find(l => l.code === language)?.name} ({language.toUpperCase()})</strong>
          </div>
          <button
            onClick={() => setIsLanguageModalOpen(false)}
            className="px-5 py-2 rounded-lg bg-[#0B2545] hover:bg-[#07172C] text-white font-bold transition"
          >
            {t.close || 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
