import React, { useState, useEffect, useRef } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  Home, 
  Calendar, 
  QrCode, 
  Bell, 
  User, 
  ArrowLeft, 
  Search, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  Download, 
  Mic, 
  Send, 
  SlidersHorizontal, 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  Sparkles, 
  Navigation, 
  ShieldCheck, 
  Globe, 
  Phone, 
  Check, 
  X, 
  Volume2, 
  Layers, 
  Smartphone,
  PieChart,
  Activity,
  Bot
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const KisanSetuMobileApp = () => {
  const { 
    tokens, 
    centers, 
    selectedCenterId, 
    setSelectedCenterId, 
    language, 
    setLanguage, 
    speakText, 
    isSpeaking, 
    stopSpeaking,
    notifications,
    dispatchSmartNotification
  } = usePortal();

  // Screen State: 1 to 15
  const [currentScreen, setCurrentScreen] = useState(3); // Default to Screen 3: Farmer Dashboard (Home)
  const [activeBottomTab, setActiveBottomTab] = useState('home'); // 'home' | 'schedule' | 'token' | 'alerts' | 'profile'
  const [officerBottomTab, setOfficerBottomTab] = useState('dashboard'); // 'dashboard' | 'queue' | 'analytics' | 'profile'

  // Screen 2: Login State
  const [mobileInput, setMobileInput] = useState('98765 43210');
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Screen 4: Schedule State
  const [selectedScheduleDay, setSelectedScheduleDay] = useState(15);
  const [scheduleFilter, setScheduleFilter] = useState('All');

  // Screen 10: Notifications Filter
  const [notifFilter, setNotifFilter] = useState('All');

  // Screen 14: Selected Language
  const [selectedLangCode, setSelectedLangCode] = useState(language || 'en');

  // Screen 15: Voice Assistant Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Namaste Ramesh ji! I am your Kisan Assistant. How can I help you with MSP procurement today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isListeningMic, setIsListeningMic] = useState(false);

  const activeToken = tokens.find(t => t.tokenNumber === 'KS-2026-1024') || tokens[0];

  const screensList = [
    { id: 1, title: '1. Splash Screen', category: 'Onboarding' },
    { id: 2, title: '2. Login Screen', category: 'Auth' },
    { id: 3, title: '3. Farmer Dashboard', category: 'Core' },
    { id: 4, title: '4. Procurement Schedule', category: 'Core' },
    { id: 5, title: '5. Nearby Centers', category: 'Location' },
    { id: 6, title: '6. Smart Recommendation', category: 'AI Engine' },
    { id: 7, title: '7. Digital Token QR', category: 'Pass' },
    { id: 8, title: '8. Live Queue Status', category: 'Live Ops' },
    { id: 9, title: '9. Procurement Journey', category: 'Tracking' },
    { id: 10, title: '10. Notifications', category: 'Alerts' },
    { id: 11, title: '11. Officer Dashboard', category: 'Officer' },
    { id: 12, title: '12. Analytics Dashboard', category: 'Analytics' },
    { id: 13, title: '13. Map View', category: 'Location' },
    { id: 14, title: '14. Language Selection', category: 'Settings' },
    { id: 15, title: '15. Voice Bot Assistant', category: 'AI Assistant' },
  ];

  const handleSendChat = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    let replyText = 'Your query has been noted. Please contact Rampur Mandi helpdesk at 1800-180-1551 for further details.';

    const qLower = query.toLowerCase();
    if (qLower.includes('when') || qLower.includes('start')) {
      replyText = 'Paddy Grade A procurement starts on 15 September 2026 across all authorized UP & Northern centers.';
    } else if (qLower.includes('crowd') || qLower.includes('less')) {
      replyText = 'Kalyanpur Buffer Center (11 km) currently has LOW crowd with 0 minutes wait time compared to Rampur Mandi.';
    } else if (qLower.includes('token') || qLower.includes('status')) {
      replyText = 'Your Token KS-2026-1024 is currently WAITING IN QUEUE (#12 ahead). Estimated wait time is 25 minutes.';
    } else if (qLower.includes('document')) {
      replyText = 'Required documents: (1) Aadhaar Card, (2) Land Khatauni Record, (3) Digital Gate Pass QR code on mobile.';
    } else if (qLower.includes('payment') || qLower.includes('dbt')) {
      replyText = '100% MSP payment is remitted via PFMS Direct Benefit Transfer directly into your Aadhaar-linked bank account within 48 hours.';
    }

    const botMsg = { sender: 'bot', text: replyText };
    setChatMessages(prev => [...prev, userMsg, botMsg]);
    setChatInput('');
    speakText(replyText, language);
  };

  const handleVoiceMicClick = () => {
    if (isListeningMic) {
      setIsListeningMic(false);
    } else {
      setIsListeningMic(true);
      setTimeout(() => {
        setIsListeningMic(false);
        handleSendChat('What is my token status?');
      }, 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 space-y-4 animate-fadeIn">
      {/* Top Banner with Screen Selector Gallery */}
      <div className="bg-[#0B2545] text-white p-4 rounded-2xl shadow-md border-b-4 border-emerald-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1">
              <Smartphone className="w-3 h-3" /> Exact Mobile App Design System
            </span>
            <span className="text-xs text-slate-300 font-mono">15 Pixel-Perfect Native Screens</span>
          </div>
          <h2 className="text-lg sm:text-xl font-black text-white mt-0.5">
            KisanSetu Mobile App Simulator
          </h2>
          <p className="text-xs text-slate-300">
            Interactive, clickable mobile prototype representing all 15 screens from splash onboarding to AI voice chatbot.
          </p>
        </div>

        {/* Screen Switcher Quick Selector */}
        <div className="flex items-center space-x-2 bg-[#07172C] p-2 rounded-xl border border-slate-700">
          <span className="text-xs font-bold text-amber-300">Jump to Screen:</span>
          <select
            value={currentScreen}
            onChange={(e) => setCurrentScreen(parseInt(e.target.value))}
            className="bg-[#0B2545] text-white text-xs font-bold rounded-lg px-2.5 py-1 border border-slate-600 focus:outline-none cursor-pointer"
          >
            {screensList.map(s => (
              <option key={s.id} value={s.id}>{s.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Screen Thumbnails Pill Bar */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-300 text-xs">
        {screensList.map(s => {
          const isSel = s.id === currentScreen;
          return (
            <button
              key={s.id}
              onClick={() => setCurrentScreen(s.id)}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition cursor-pointer text-[11px] ${
                isSel
                  ? 'bg-[#0B2545] text-white shadow-sm ring-1 ring-emerald-400'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {s.title}
            </button>
          );
        })}
      </div>

      {/* Device Frame Display Center */}
      <div className="flex justify-center py-2">
        <div className="w-full max-w-[390px] h-[810px] bg-slate-950 rounded-[48px] p-3 shadow-2xl ring-8 ring-slate-900 border-4 border-slate-800 relative flex flex-col justify-between overflow-hidden">
          
          {/* iPhone Dynamic Island / Speaker Notch */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-50 flex items-center justify-between px-3">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#137547]/40 ring-1 ring-emerald-500 animate-pulse" />
          </div>

          {/* Status Bar */}
          <div className="h-6 w-full flex justify-between items-center px-6 pt-2 text-[10px] font-bold text-slate-800 z-40">
            <span>9:41</span>
            <div className="flex items-center space-x-1.5">
              <span>5G</span>
              <div className="w-4 h-2 border border-slate-800 rounded-sm p-0.5"><div className="h-full bg-slate-800 rounded-2xs" /></div>
            </div>
          </div>

          {/* Screen Body (Scrollable Container) */}
          <div className="flex-1 overflow-y-auto no-scrollbar bg-white rounded-[36px] relative flex flex-col justify-between text-slate-900 font-sans">
            
            {/* SCREEN 1: SPLASH SCREEN */}
            {currentScreen === 1 && (
              <div className="min-h-full flex flex-col justify-between bg-gradient-to-b from-amber-50 via-emerald-50/60 to-emerald-900 text-slate-900 p-6 relative overflow-hidden">
                <div className="text-center pt-12 space-y-3">
                  {/* Sprout Logo */}
                  <div className="w-20 h-20 mx-auto flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
                      <circle cx="50" cy="50" r="45" fill="#137547" opacity="0.15" />
                      <path d="M50 85 C50 50, 20 50, 20 30 C40 30, 50 60, 50 85 Z" fill="#F59E0B" />
                      <path d="M50 85 C50 45, 80 45, 80 25 C60 25, 50 55, 50 85 Z" fill="#137547" />
                    </svg>
                  </div>

                  <div>
                    <h1 className="text-3xl font-black text-[#0B2545] tracking-tight">Kisan<span className="text-[#137547]">Setu</span></h1>
                    <p className="text-xs font-bold text-slate-700 mt-1">Smart Procurement for a Better Tomorrow</p>
                  </div>
                </div>

                {/* Farmer in Fields Visual Banner */}
                <div className="relative my-4 rounded-3xl overflow-hidden shadow-xl border-2 border-white/60 bg-gradient-to-t from-[#0B2545] to-transparent p-4 flex flex-col justify-end min-h-[260px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-800/40 to-amber-200/40 opacity-90" />
                  <div className="relative z-10 text-white space-y-1 text-center">
                    <div className="text-xs font-black text-emerald-300 uppercase tracking-widest mb-1">KISANSETU SMART PORTAL</div>
                    <h3 className="text-sm font-black uppercase tracking-wide text-amber-300">Connecting Farmers with a Smarter Future</h3>
                    <p className="text-[11px] text-emerald-100">Guaranteed Minimum Support Price (MSP) & Instant E-Pass</p>
                  </div>
                </div>

                <div className="space-y-2 pb-4">
                  <button
                    onClick={() => setCurrentScreen(2)}
                    className="w-full py-3.5 bg-[#137547] hover:bg-[#0D4F30] text-white font-black text-sm rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 uppercase tracking-wide cursor-pointer"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentScreen(14)}
                    className="w-full py-2.5 bg-white/80 hover:bg-white text-slate-800 font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center space-x-1"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Change Language (भाषा बदलें)</span>
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 2: LOGIN SCREEN */}
            {currentScreen === 2 && (
              <div className="min-h-full flex flex-col justify-between bg-slate-50 p-6">
                <div className="pt-6 space-y-6">
                  {/* Logo */}
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 mx-auto">
                      <svg viewBox="0 0 100 100" className="w-10 h-10">
                        <path d="M50 85 C50 50, 20 50, 20 30 C40 30, 50 60, 50 85 Z" fill="#F59E0B" />
                        <path d="M50 85 C50 45, 80 45, 80 25 C60 25, 50 55, 50 85 Z" fill="#137547" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-black text-slate-900">Welcome Back!</h2>
                    <p className="text-xs text-slate-500">Login to continue to KisanSetu</p>
                  </div>

                  {/* Form */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 block mb-1">Mobile Number</label>
                      <div className="flex items-center bg-white border border-slate-300 rounded-xl px-3 py-2.5 shadow-sm">
                        <span className="text-xs font-bold text-slate-500 mr-2 border-r pr-2">🇮🇳 +91</span>
                        <input
                          type="text"
                          value={mobileInput}
                          onChange={(e) => setMobileInput(e.target.value)}
                          className="w-full text-xs font-mono font-bold text-slate-900 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsOtpSent(true);
                        setTimeout(() => setCurrentScreen(3), 600);
                      }}
                      className="w-full py-3 bg-[#137547] hover:bg-[#0D4F30] text-white font-bold text-xs rounded-xl shadow-md transition uppercase tracking-wide cursor-pointer"
                    >
                      {isOtpSent ? 'Sending OTP... ✓' : 'Send OTP'}
                    </button>

                    <div className="flex items-center my-3">
                      <div className="flex-1 border-t border-slate-200" />
                      <span className="px-3 text-[10px] font-bold uppercase text-slate-400">OR</span>
                      <div className="flex-1 border-t border-slate-200" />
                    </div>

                    <button
                      onClick={() => setCurrentScreen(3)}
                      className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center space-x-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Login with Farmer ID / Khatauni</span>
                    </button>
                  </div>
                </div>

                {/* Village Scene Visual */}
                <div className="text-center pt-6 pb-2">
                  <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 text-[11px] text-emerald-800 font-semibold">
                    Direct Benefit Transfer (DBT) enabled under PM-AASHA guidelines.
                  </div>
                  <div className="text-[11px] text-slate-500 mt-4">
                    New to KisanSetu? <strong className="text-[#137547] underline cursor-pointer">Register</strong>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 3: FARMER DASHBOARD (HOME) */}
            {currentScreen === 3 && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50">
                <div className="p-4 space-y-4">
                  {/* Top Profile Header */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center border-2 border-white shadow-sm text-xs">
                        RK
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-900">Hello, Ramesh Kumar</h3>
                        <p className="text-[10px] text-slate-500">Welcome to KisanSetu</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentScreen(10)}
                      className="relative p-2 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm"
                    >
                      <Bell className="w-4 h-4" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </button>
                  </div>

                  {/* My Procurement Card (Hero) */}
                  <div className="bg-gradient-to-br from-[#0B2545] to-[#137547] text-white p-4 rounded-2xl shadow-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200">My Procurement</span>
                      <span className="bg-emerald-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping" /> Waiting in Queue
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="text-[9px] text-slate-300 block">Token No.</span>
                        <strong className="text-sm font-mono font-black text-amber-300">KS-2026-1024</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-300 block">Farmers Ahead</span>
                        <strong className="text-sm font-mono font-black text-white">12</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-300 block">Est. Waiting Time</span>
                        <strong className="text-sm font-mono font-black text-emerald-300">25 mins</strong>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-300 block">Recommended Arrival</span>
                        <strong className="text-sm font-mono font-black text-white">10:25 AM</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentScreen(8)}
                      className="w-full py-2 bg-white hover:bg-slate-100 text-[#0B2545] font-black text-xs rounded-xl shadow transition text-center uppercase tracking-wide cursor-pointer"
                    >
                      View Live Status
                    </button>
                  </div>

                  {/* Upcoming Procurement */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">Upcoming Procurement</h4>
                      <button onClick={() => setCurrentScreen(4)} className="text-[10px] font-bold text-[#137547]">View All &rarr;</button>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-900">
                          PD
                        </div>
                        <div>
                          <div className="text-xs font-black text-slate-900">Paddy</div>
                          <div className="text-[10px] text-slate-500 font-mono">15 Sep - 30 Sep 2026</div>
                          <div className="text-[10px] text-emerald-700 font-bold">Rampur Mandi</div>
                        </div>
                      </div>

                      <button
                        onClick={() => setCurrentScreen(4)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[10px] font-bold rounded-lg"
                      >
                        View Schedule
                      </button>
                    </div>
                  </div>

                  {/* Quick Action Grid */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <button onClick={() => setCurrentScreen(6)} className="p-2.5 bg-white rounded-xl border border-slate-200 text-center space-y-1 hover:bg-slate-50 shadow-sm">
                      <Sparkles className="w-4 h-4 text-amber-500 mx-auto" />
                      <span className="text-[10px] font-bold text-slate-800 block leading-tight">AI Recommender</span>
                    </button>
                    <button onClick={() => setCurrentScreen(7)} className="p-2.5 bg-white rounded-xl border border-slate-200 text-center space-y-1 hover:bg-slate-50 shadow-sm">
                      <QrCode className="w-4 h-4 text-emerald-600 mx-auto" />
                      <span className="text-[10px] font-bold text-slate-800 block leading-tight">Digital Pass</span>
                    </button>
                    <button onClick={() => setCurrentScreen(15)} className="p-2.5 bg-white rounded-xl border border-slate-200 text-center space-y-1 hover:bg-slate-50 shadow-sm">
                      <Bot className="w-4 h-4 text-blue-600 mx-auto" />
                      <span className="text-[10px] font-bold text-slate-800 block leading-tight">Kisan Bot</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Navigation Bar */}
                <div className="bg-white border-t border-slate-200 px-3 py-2 flex justify-around items-center">
                  <button onClick={() => setCurrentScreen(3)} className="flex flex-col items-center text-[#137547]">
                    <Home className="w-4 h-4" />
                    <span className="text-[9px] font-bold mt-0.5">Home</span>
                  </button>
                  <button onClick={() => setCurrentScreen(4)} className="flex flex-col items-center text-slate-400 hover:text-slate-700">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[9px] font-bold mt-0.5">Schedule</span>
                  </button>
                  <button onClick={() => setCurrentScreen(7)} className="flex flex-col items-center text-slate-400 hover:text-slate-700">
                    <QrCode className="w-4 h-4" />
                    <span className="text-[9px] font-bold mt-0.5">Token</span>
                  </button>
                  <button onClick={() => setCurrentScreen(10)} className="flex flex-col items-center text-slate-400 hover:text-slate-700">
                    <Bell className="w-4 h-4" />
                    <span className="text-[9px] font-bold mt-0.5">Alerts</span>
                  </button>
                  <button onClick={() => setCurrentScreen(11)} className="flex flex-col items-center text-slate-400 hover:text-slate-700">
                    <User className="w-4 h-4" />
                    <span className="text-[9px] font-bold mt-0.5">Profile</span>
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 4: PROCUREMENT SCHEDULE */}
            {currentScreen === 4 && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50 p-4">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setCurrentScreen(3)} className="p-1 rounded-full hover:bg-slate-200">
                      <ArrowLeft className="w-4 h-4 text-slate-800" />
                    </button>
                    <h3 className="text-sm font-black text-slate-900">Procurement Schedule</h3>
                  </div>

                  {/* Month Header & Date Strip */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-[#0B2545]">September 2026</span>
                      <div className="flex space-x-1 text-slate-400">
                        <span>&larr;</span>
                        <span>&rarr;</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center pt-1">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                        <span key={i} className="text-[9px] font-bold text-slate-400">{d}</span>
                      ))}
                      {[12, 13, 14, 15, 16, 17, 18].map((day) => {
                        const isSel = selectedScheduleDay === day;
                        return (
                          <button
                            key={day}
                            onClick={() => setSelectedScheduleDay(day)}
                            className={`py-1.5 rounded-xl font-mono text-xs font-bold transition ${
                              isSel ? 'bg-[#137547] text-white shadow' : 'text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex space-x-1 text-[11px] font-bold overflow-x-auto no-scrollbar">
                    {['All', 'Paddy', 'Wheat', 'Maize'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setScheduleFilter(f)}
                        className={`px-3 py-1 rounded-full ${
                          scheduleFilter === f ? 'bg-[#137547] text-white' : 'bg-white text-slate-600 border border-slate-200'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  {/* Schedule Crop Cards */}
                  <div className="space-y-2.5">
                    {/* Paddy */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 rounded bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">PD</span>
                        <div>
                          <div className="text-xs font-black text-slate-900">Paddy</div>
                          <div className="text-[10px] text-slate-500 font-mono">15 Sep - 30 Sep 2026</div>
                          <div className="text-[10px] text-slate-700">Rampur Mandi</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold rounded-full">
                        Available
                      </span>
                    </div>

                    {/* Wheat */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 rounded bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center">WT</span>
                        <div>
                          <div className="text-xs font-black text-slate-900">Wheat</div>
                          <div className="text-[10px] text-slate-500 font-mono">01 Oct - 20 Oct 2026</div>
                          <div className="text-[10px] text-slate-700">Bilaspur Center</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-bold rounded-full">
                        Limited
                      </span>
                    </div>

                    {/* Maize */}
                    <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="w-8 h-8 rounded bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center">MZ</span>
                        <div>
                          <div className="text-xs font-black text-slate-900">Maize</div>
                          <div className="text-[10px] text-slate-500 font-mono">25 Oct - 10 Nov 2026</div>
                          <div className="text-[10px] text-slate-700">Kotra Center</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-300 text-[10px] font-bold rounded-full">
                        Full
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentScreen(5)}
                  className="w-full py-3 bg-[#137547] text-white font-bold text-xs rounded-xl shadow uppercase"
                >
                  Find Nearby Centers &rarr;
                </button>
              </div>
            )}

            {/* SCREEN 5: NEARBY PROCUREMENT CENTERS */}
            {currentScreen === 5 && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50 p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => setCurrentScreen(4)} className="p-1 rounded-full hover:bg-slate-200">
                        <ArrowLeft className="w-4 h-4 text-slate-800" />
                      </button>
                      <h3 className="text-sm font-black text-slate-900">Nearby Procurement Centers</h3>
                    </div>
                    <button onClick={() => setCurrentScreen(13)} className="text-[10px] font-bold text-emerald-700 underline">
                      Map View
                    </button>
                  </div>

                  {/* Mini Map Visual Widget */}
                  <div 
                    onClick={() => setCurrentScreen(13)}
                    className="h-28 bg-emerald-100 rounded-2xl border-2 border-emerald-300 relative overflow-hidden shadow-inner p-3 cursor-pointer flex flex-col justify-between"
                  >
                    <div className="text-[10px] font-bold text-emerald-950 bg-white/90 px-2 py-0.5 rounded-full inline-block self-start shadow-sm">
                      [Your Location]
                    </div>
                    <div className="self-end bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                      <span>Rampur Mandi</span>
                    </div>
                  </div>

                  {/* Centers List */}
                  <div className="space-y-2">
                    {/* Rampur Mandi */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black text-slate-900">Rampur Mandi</h4>
                        <div className="text-[10px] text-slate-500 font-mono">4.2 km • 12 min</div>
                        <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> Crowd: Low • Wait: 15 min
                        </div>
                        <div className="text-[10px] text-slate-500">Available Slots: 4</div>
                      </div>
                      <button onClick={() => setCurrentScreen(6)} className="px-3 py-1.5 bg-[#137547] text-white text-[11px] font-bold rounded-lg">
                        View
                      </button>
                    </div>

                    {/* Bilaspur Center */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black text-slate-900">Bilaspur Center</h4>
                        <div className="text-[10px] text-slate-500 font-mono">8.5 km • 20 min</div>
                        <div className="text-[10px] text-amber-700 font-bold flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Crowd: Medium • Wait: 35 min
                        </div>
                        <div className="text-[10px] text-slate-500">Available Slots: 2</div>
                      </div>
                      <button onClick={() => setCurrentScreen(6)} className="px-3 py-1.5 bg-slate-100 text-slate-800 text-[11px] font-bold rounded-lg border">
                        View
                      </button>
                    </div>

                    {/* Kotra Center */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-black text-slate-900">Kotra Center</h4>
                        <div className="text-[10px] text-slate-500 font-mono">12.3 km • 28 min</div>
                        <div className="text-[10px] text-red-700 font-bold flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Crowd: High • Wait: 1 hr
                        </div>
                        <div className="text-[10px] text-slate-500">Available Slots: 0</div>
                      </div>
                      <button className="px-3 py-1.5 bg-slate-100 text-slate-400 text-[11px] font-bold rounded-lg cursor-not-allowed">
                        View
                      </button>
                    </div>
                  </div>
                </div>

                <button onClick={() => setCurrentScreen(6)} className="w-full py-3 bg-[#0B2545] text-white font-bold text-xs rounded-xl shadow uppercase">
                  AI Smart Recommendation &rarr;
                </button>
              </div>
            )}

            {/* SCREEN 6: AI SMART RECOMMENDATION */}
            {currentScreen === 6 && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50 p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setCurrentScreen(5)} className="p-1 rounded-full hover:bg-slate-200">
                      <ArrowLeft className="w-4 h-4 text-slate-800" />
                    </button>
                    <div>
                      <h3 className="text-sm font-black text-slate-900 flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-amber-500 fill-current" /> AI Smart Recommendation
                      </h3>
                      <p className="text-[10px] text-slate-500">Based on distance, crowd, waiting time and availability</p>
                    </div>
                  </div>

                  {/* Best Center Card */}
                  <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/40 p-4 rounded-2xl border-2 border-[#137547] shadow-md space-y-3 relative">
                    <span className="absolute top-3 right-3 bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      TOP RECOMMENDATION
                    </span>

                    <div>
                      <h4 className="text-base font-black text-[#0B2545]">Rampur Mandi</h4>
                      <p className="text-[10px] font-mono text-slate-500">4.2 km • 12 min</p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Lower crowd</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>15 min waiting time</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>4 slots available</span>
                      </div>
                      <div className="flex items-center space-x-1.5 text-emerald-800 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Faster processing</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setCurrentScreen(7)}
                      className="w-full py-2.5 bg-[#137547] hover:bg-[#0D4F30] text-white font-bold text-xs rounded-xl shadow transition uppercase tracking-wide cursor-pointer"
                    >
                      Select Center
                    </button>
                  </div>

                  {/* Other Options */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase">Other Options</h4>
                    <div className="bg-white p-3 rounded-xl border text-xs flex justify-between items-center">
                      <div>
                        <strong>Bilaspur Center</strong>
                        <div className="text-[10px] text-slate-500">8.5 km • 20 min • Medium crowd</div>
                      </div>
                      <span className="text-[10px] text-slate-500">2 slots open</span>
                    </div>

                    <div className="bg-white p-3 rounded-xl border text-xs flex justify-between items-center">
                      <div>
                        <strong>Kotra Center</strong>
                        <div className="text-[10px] text-slate-500">12.3 km • 28 min • High crowd</div>
                      </div>
                      <span className="text-[10px] text-red-600 font-bold">0 slots open</span>
                    </div>
                  </div>
                </div>

                <button onClick={() => setCurrentScreen(7)} className="w-full py-3 bg-[#0B2545] text-white font-bold text-xs rounded-xl shadow uppercase">
                  Generate Digital Token &rarr;
                </button>
              </div>
            )}

            {/* SCREEN 7: DIGITAL PROCUREMENT TOKEN */}
            {currentScreen === 7 && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50 p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setCurrentScreen(6)} className="p-1 rounded-full hover:bg-slate-200">
                      <ArrowLeft className="w-4 h-4 text-slate-800" />
                    </button>
                    <h3 className="text-sm font-black text-slate-900">Digital Procurement Token</h3>
                  </div>

                  {/* Token Card */}
                  <div className="bg-gradient-to-b from-[#137547] to-[#0B2545] p-4 rounded-2xl shadow-xl text-center text-white space-y-3">
                    <div className="text-xs font-mono font-black tracking-widest uppercase text-emerald-200">
                      KS-2026-1024
                    </div>

                    {/* QR Code Container */}
                    <div className="bg-white p-4 rounded-2xl inline-block shadow-inner">
                      <QRCodeSVG value="https://kisansetu.gov.in/token/KS-2026-1024" size={130} />
                    </div>

                    <div className="text-xs font-mono font-black text-amber-300">
                      KS-2026-1024
                    </div>

                    {/* Details Grid */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-left text-xs space-y-1.5 border border-white/20">
                      <div className="flex justify-between">
                        <span className="text-slate-300 text-[10px]">Farmer Name</span>
                        <strong className="text-white">Ramesh Kumar</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300 text-[10px]">Crop</span>
                        <strong className="text-emerald-300">Paddy</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300 text-[10px]">Date</span>
                        <strong className="text-white font-mono">15 Sep 2026</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300 text-[10px]">Slot</span>
                        <strong className="text-amber-300 font-mono">10:00 AM - 12:00 PM</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300 text-[10px]">Center</span>
                        <strong className="text-white">Rampur Mandi</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300 text-[10px]">Estimated Quantity</span>
                        <strong className="text-white font-mono">50 Quintals</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => alert('Token Downloaded as PDF Gate Pass')}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow flex items-center justify-center space-x-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Token</span>
                    </button>
                    <p className="text-[9px] text-slate-300">Show this QR code at the center</p>
                  </div>
                </div>

                <button onClick={() => setCurrentScreen(8)} className="w-full py-3 bg-[#0B2545] text-white font-bold text-xs rounded-xl shadow uppercase">
                  Check Live Queue Status &rarr;
                </button>
              </div>
            )}

            {/* SCREEN 8: LIVE QUEUE STATUS */}
            {currentScreen === 8 && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50 p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setCurrentScreen(7)} className="p-1 rounded-full hover:bg-slate-200">
                      <ArrowLeft className="w-4 h-4 text-slate-800" />
                    </button>
                    <div>
                      <h3 className="text-sm font-black text-slate-900">Live Queue Status</h3>
                      <p className="text-[10px] text-slate-500">Rampur Mandi</p>
                    </div>
                  </div>

                  {/* Currently Serving */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                        NOW
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Currently Serving</span>
                        <h4 className="text-base font-black font-mono text-[#0B2545]">Token #1045</h4>
                      </div>
                    </div>
                  </div>

                  {/* Next Tokens */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">Next Tokens</span>
                    <div className="grid grid-cols-3 gap-2">
                      {['#1046', '#1047', '#1048'].map(tok => (
                        <div key={tok} className="p-2 bg-slate-100 rounded-xl border text-center font-mono font-bold text-xs text-slate-700">
                          {tok}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Your Token Card (Highlight) */}
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 p-4 rounded-2xl border-2 border-amber-300 shadow-md text-center space-y-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block">Your Token</span>
                    <div className="text-3xl font-black font-mono text-amber-700">#1057</div>
                    <div className="text-xs font-bold text-slate-700">● 12 Farmers Ahead</div>

                    <div className="pt-2 border-t border-amber-200">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Est. Wait Time</span>
                      <div className="text-3xl font-black font-mono text-emerald-800">25 Minutes</div>
                    </div>

                    <div className="text-[9px] text-slate-500 font-mono pt-1">
                      Updated 10:15 AM • <strong className="text-emerald-700">Live</strong>
                    </div>
                  </div>
                </div>

                <button onClick={() => setCurrentScreen(9)} className="w-full py-3 bg-[#137547] text-white font-bold text-xs rounded-xl shadow uppercase">
                  View Procurement Journey &rarr;
                </button>
              </div>
            )}

            {/* SCREEN 9: PROCUREMENT STATUS TRACKING */}
            {currentScreen === 9 && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50 p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setCurrentScreen(8)} className="p-1 rounded-full hover:bg-slate-200">
                      <ArrowLeft className="w-4 h-4 text-slate-800" />
                    </button>
                    <div>
                      <h3 className="text-sm font-black text-slate-900">Procurement Journey</h3>
                      <p className="text-[10px] text-slate-500 font-mono">Token #KS-2026-1024</p>
                    </div>
                  </div>

                  {/* 7-Step Stepper */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative pl-6 before:absolute before:left-6 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
                    {/* Step 1 */}
                    <div className="relative flex items-start space-x-2 text-xs">
                      <span className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">✓</span>
                      <div>
                        <strong className="text-slate-900 block">Slot Booked</strong>
                        <span className="text-[10px] text-slate-500 font-mono">15 Sep, 09:00 AM</span>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="relative flex items-start space-x-2 text-xs">
                      <span className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">✓</span>
                      <div>
                        <strong className="text-slate-900 block">Farmer Arrived</strong>
                        <span className="text-[10px] text-slate-500 font-mono">15 Sep, 09:45 AM</span>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="relative flex items-start space-x-2 text-xs">
                      <span className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] animate-ping" />
                      <div>
                        <strong className="text-emerald-800 font-bold block">Waiting in Queue</strong>
                        <span className="text-[10px] text-emerald-700 font-bold">In Progress</span>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="relative flex items-start space-x-2 text-xs text-slate-400">
                      <span className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-slate-200" />
                      <div>
                        <span>Quality Check</span>
                      </div>
                    </div>

                    {/* Step 5 */}
                    <div className="relative flex items-start space-x-2 text-xs text-slate-400">
                      <span className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-slate-200" />
                      <div>
                        <span>Weighbridge</span>
                      </div>
                    </div>

                    {/* Step 6 */}
                    <div className="relative flex items-start space-x-2 text-xs text-slate-400">
                      <span className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-slate-200" />
                      <div>
                        <span>Procurement Completed</span>
                      </div>
                    </div>

                    {/* Step 7 */}
                    <div className="relative flex items-start space-x-2 text-xs text-slate-400">
                      <span className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-slate-200" />
                      <div>
                        <span>Payment Processing</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={() => setCurrentScreen(10)} className="w-full py-3 bg-[#0B2545] text-white font-bold text-xs rounded-xl shadow uppercase">
                  Check Notifications &rarr;
                </button>
              </div>
            )}

            {/* SCREEN 10: NOTIFICATIONS */}
            {currentScreen === 10 && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50 p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setCurrentScreen(3)} className="p-1 rounded-full hover:bg-slate-200">
                      <ArrowLeft className="w-4 h-4 text-slate-800" />
                    </button>
                    <h3 className="text-sm font-black text-slate-900">Notifications</h3>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex space-x-1 text-[11px] font-bold">
                    {['All', 'Alerts', 'Updates'].map(f => (
                      <button
                        key={f}
                        onClick={() => setNotifFilter(f)}
                        className={`px-3 py-1 rounded-full ${notifFilter === f ? 'bg-[#137547] text-white' : 'bg-white text-slate-600 border'}`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  {/* Notification List */}
                  <div className="space-y-2">
                    {/* Slot Confirmed */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-2.5">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 text-xs">✓</div>
                      <div>
                        <strong className="text-xs text-slate-900 block">Slot Confirmed</strong>
                        <p className="text-[11px] text-slate-600">Your slot has been confirmed.</p>
                        <span className="text-[9px] text-slate-400 font-mono">15 Sep 2026 • 09:00 AM</span>
                      </div>
                    </div>

                    {/* High Crowd Alert */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-2.5">
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center flex-shrink-0 text-xs font-bold">!</div>
                      <div>
                        <strong className="text-xs text-slate-900 block">High Crowd Alert</strong>
                        <p className="text-[11px] text-slate-600">High crowd detected at Rampur Mandi.</p>
                        <span className="text-[9px] text-slate-400 font-mono">15 Sep 2026 • 09:30 AM</span>
                      </div>
                    </div>

                    {/* Turn Approaching */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-2.5">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center flex-shrink-0 text-xs font-bold">Q</div>
                      <div>
                        <strong className="text-xs text-slate-900 block">Turn Approaching</strong>
                        <p className="text-[11px] text-slate-600">Only 5 farmers ahead of you.</p>
                        <span className="text-[9px] text-slate-400 font-mono">15 Sep 2026 • 10:00 AM</span>
                      </div>
                    </div>

                    {/* Payment Processing */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex items-start space-x-2.5">
                      <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center flex-shrink-0 text-xs font-bold">₹</div>
                      <div>
                        <strong className="text-xs text-slate-900 block">Payment Processing</strong>
                        <p className="text-[11px] text-slate-600">Payment is being processed via PFMS.</p>
                        <span className="text-[9px] text-slate-400 font-mono">15 Sep 2026 • 12:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={() => setCurrentScreen(11)} className="w-full py-3 bg-[#0B2545] text-white font-bold text-xs rounded-xl shadow uppercase">
                  Open Officer Dashboard &rarr;
                </button>
              </div>
            )}

            {/* SCREEN 11: OFFICER DASHBOARD */}
            {currentScreen === 11 && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50">
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => setCurrentScreen(3)} className="p-1 rounded-full hover:bg-slate-200">
                        <ArrowLeft className="w-4 h-4 text-slate-800" />
                      </button>
                      <h3 className="text-sm font-black text-slate-900">Procurement Officer Dashboard</h3>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                      PO
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-600 uppercase">Today's Overview</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-slate-500 text-[10px] block font-bold">Total Bookings</span>
                        <strong className="text-xl font-black font-mono text-emerald-800">250</strong>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-slate-500 text-[10px] block font-bold">Farmers Waiting</span>
                        <strong className="text-xl font-black font-mono text-amber-700">42</strong>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-slate-500 text-[10px] block font-bold">Currently Processing</span>
                        <strong className="text-xl font-black font-mono text-blue-700">5</strong>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-slate-500 text-[10px] block font-bold">Total Procured</span>
                        <strong className="text-xl font-black font-mono text-[#0B2545]">2,450 Qt</strong>
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 flex justify-between items-center text-xs">
                      <span className="text-amber-900 font-bold">Avg. Waiting Time:</span>
                      <strong className="text-amber-950 font-black font-mono text-base">38 min</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-white border-t border-slate-200 px-3 py-2 flex justify-around items-center">
                  <button onClick={() => setCurrentScreen(11)} className="flex flex-col items-center text-[#137547]">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-[9px] font-bold mt-0.5">Dashboard</span>
                  </button>
                  <button onClick={() => setCurrentScreen(8)} className="flex flex-col items-center text-slate-400 hover:text-slate-700">
                    <Clock className="w-4 h-4" />
                    <span className="text-[9px] font-bold mt-0.5">Queue</span>
                  </button>
                  <button onClick={() => setCurrentScreen(12)} className="flex flex-col items-center text-slate-400 hover:text-slate-700">
                    <BarChart3 className="w-4 h-4" />
                    <span className="text-[9px] font-bold mt-0.5">Analytics</span>
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 12: ANALYTICS DASHBOARD */}
            {currentScreen === 12 && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50 p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => setCurrentScreen(11)} className="p-1 rounded-full hover:bg-slate-200">
                        <ArrowLeft className="w-4 h-4 text-slate-800" />
                      </button>
                      <h3 className="text-sm font-black text-slate-900">Analytics</h3>
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-white px-2 py-1 rounded border">Today</span>
                  </div>

                  {/* Average Waiting Time Chart Card */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Average Waiting Time</span>
                    <div className="flex items-baseline space-x-2">
                      <strong className="text-3xl font-black font-mono text-slate-900">32 min</strong>
                      <span className="text-xs font-bold text-emerald-700 font-mono">↓ 42% (Yesterday: 55 min)</span>
                    </div>

                    {/* Smooth Sparkline */}
                    <div className="h-16 w-full pt-2">
                      <svg viewBox="0 0 100 30" className="w-full h-full text-emerald-500">
                        <path d="M0 25 Q20 5, 40 20 T80 10 T100 5" fill="none" stroke="#10B981" strokeWidth="2.5" />
                        <circle cx="100" cy="5" r="3" fill="#10B981" />
                      </svg>
                    </div>
                  </div>

                  {/* Crop-wise Procurement Donut */}
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">Crop-wise Procurement</span>
                    <div className="flex items-center justify-around">
                      {/* CSS Donut representation */}
                      <div className="w-20 h-20 rounded-full border-8 border-emerald-600 border-r-amber-500 border-b-blue-500 flex items-center justify-center font-bold text-xs">
                        100%
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                          <span>Paddy: <strong>45%</strong></span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span>Wheat: <strong>30%</strong></span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                          <span>Maize: <strong>15%</strong></span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                          <span>Others: <strong>10%</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={() => setCurrentScreen(13)} className="w-full py-3 bg-[#0B2545] text-white font-bold text-xs rounded-xl shadow uppercase">
                  Open Map View &rarr;
                </button>
              </div>
            )}

            {/* SCREEN 13: MAP VIEW */}
            {currentScreen === 13 && (
              <div className="flex-1 flex flex-col justify-between bg-emerald-50 relative overflow-hidden">
                {/* Simulated Map Visual */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-blue-50 to-emerald-200 p-4 flex flex-col justify-between">
                  <div className="flex items-center space-x-2 z-10 pt-2">
                    <button onClick={() => setCurrentScreen(5)} className="p-2 rounded-full bg-white shadow">
                      <ArrowLeft className="w-4 h-4 text-slate-800" />
                    </button>
                    <span className="text-xs font-black text-slate-900 bg-white/90 px-3 py-1 rounded-full shadow">Procurement Centers Map</span>
                  </div>

                  {/* Pulsing User Dot on Map */}
                  <div className="relative self-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500/30 animate-ping absolute" />
                    <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold">
                      YOU
                    </div>
                  </div>

                  {/* Rampur Pin */}
                  <div className="self-end mr-6 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1">
                    <span>Rampur Mandi</span>
                  </div>

                  {/* Floating Bottom Card */}
                  <div className="bg-white p-4 rounded-2xl shadow-2xl border border-slate-200 space-y-3 z-10">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-black text-slate-900">Rampur Mandi</h4>
                        <div className="text-[10px] text-slate-500 font-mono">4.2 km • 12 min</div>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Crowd: Low</span>
                    </div>

                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Wait Time: <strong>15 min</strong></span>
                      <span>Certified Scales: <strong>2 Units</strong></span>
                    </div>

                    <button
                      onClick={() => alert('GPS Navigation Started: Route to Rampur Central Mandi via NH-24')}
                      className="w-full py-2.5 bg-[#137547] text-white font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-1.5 uppercase"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 14: LANGUAGE SELECTION */}
            {currentScreen === 14 && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50 p-4">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setCurrentScreen(3)} className="p-1 rounded-full hover:bg-slate-200">
                      <ArrowLeft className="w-4 h-4 text-slate-800" />
                    </button>
                    <h3 className="text-sm font-black text-slate-900">Select Language / भाषा चुनें</h3>
                  </div>

                  {/* Languages List (All 12 Official Languages) */}
                  <div className="space-y-1.5 max-h-[460px] overflow-y-auto no-scrollbar pr-0.5">
                    {[
                      { code: 'hi', name: 'हिन्दी (Hindi)', region: 'North & Central India', tag: 'HI' },
                      { code: 'en', name: 'English', region: 'All India / Official', tag: 'EN' },
                      { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', region: 'Punjab & Haryana', tag: 'PA' },
                      { code: 'mr', name: 'मराठी (Marathi)', region: 'Maharashtra', tag: 'MR' },
                      { code: 'gu', name: 'ગુજરાતી (Gujarati)', region: 'Gujarat', tag: 'GU' },
                      { code: 'bn', name: 'বাংলা (Bengali)', region: 'West Bengal & Tripura', tag: 'BN' },
                      { code: 'te', name: 'తెలుగు (Telugu)', region: 'Andhra & Telangana', tag: 'TE' },
                      { code: 'ta', name: 'தமிழ் (Tamil)', region: 'Tamil Nadu', tag: 'TA' },
                      { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', region: 'Karnataka', tag: 'KN' },
                      { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', region: 'Odisha', tag: 'OR' },
                      { code: 'ml', name: 'മലയാളം (Malayalam)', region: 'Kerala', tag: 'ML' },
                      { code: 'as', name: 'অসমীয়া (Assamese)', region: 'Assam & North East', tag: 'AS' },
                    ].map((l) => {
                      const isSel = (language || 'en') === l.code;
                      return (
                        <div
                          key={l.code}
                          onClick={() => {
                            setSelectedLangCode(l.code);
                            setLanguage(l.code);
                            const greetings = {
                              hi: 'किसान सेतु में आपका स्वागत है।',
                              en: 'Welcome to KisanSetu.',
                              pa: 'ਕਿਸਾਨ ਸੇਤੂ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ।',
                              mr: 'किसान सेतू मध्ये आपले स्वागत आहे.',
                              gu: 'કિસાન સેતુમાં આપનું સ્વાગત છે.',
                              bn: 'কিসান সেতুতে স্বাগতম।',
                              te: 'కిసాన్ సేతుకు స్వాగతం.',
                              ta: 'கிசான் சேதுவிற்கு நல்வரவு.',
                              kn: 'ಕಿಸಾನ್ ಸೇತುವಿಗೆ ಸ್ವಾಗತ.',
                              or: 'କିଷାନ ସେତୁକୁ ସ୍ୱାଗତ।',
                              ml: 'കിസാൻ സേതുവിലേക്ക് സ്വാഗതം.',
                              as: 'কিষাণ সেতুলৈ স্বাগতম।'
                            };
                            if (speakText && greetings[l.code]) {
                              speakText(greetings[l.code], l.code);
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-xs flex items-center justify-between cursor-pointer transition ${
                            isSel ? 'border-[#137547] bg-emerald-50 font-bold shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5">
                            <span className="w-6 h-6 rounded bg-slate-200 text-slate-800 font-bold text-[10px] flex items-center justify-center">{l.tag}</span>
                            <div>
                              <div className="text-xs font-bold text-slate-800">{l.name}</div>
                              <div className="text-[9px] text-slate-400">{l.region}</div>
                            </div>
                          </div>
                          {isSel && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentScreen(3)}
                  className="w-full py-3 bg-[#137547] text-white font-bold text-xs rounded-xl shadow uppercase"
                >
                  Continue &rarr;
                </button>
              </div>
            )}

            {/* SCREEN 15: VOICE ASSISTANT & CHATBOT */}
            {currentScreen === 15 && (
              <div className="flex-1 flex flex-col justify-between bg-slate-50">
                {/* Header */}
                <div className="p-4 border-b bg-white flex items-center space-x-2">
                  <button onClick={() => setCurrentScreen(3)} className="p-1 rounded-full hover:bg-slate-200">
                    <ArrowLeft className="w-4 h-4 text-slate-800" />
                  </button>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      AI
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900">Kisan Assistant</h4>
                      <p className="text-[10px] text-slate-500">Ask me anything about procurement</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="p-4 space-y-3 flex-1 overflow-y-auto no-scrollbar">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                        msg.sender === 'user'
                          ? 'bg-[#137547] text-white rounded-tr-none'
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {/* Suggestion Prompts */}
                  <div className="pt-2 space-y-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Suggestions:</span>
                    {[
                      'When is procurement starting?',
                      'Which center has less crowd?',
                      'What is my token status?',
                      'What documents are required?',
                      'When will I receive payment?'
                    ].map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendChat(prompt)}
                        className="w-full text-left p-2 bg-white rounded-xl border border-slate-200 text-slate-700 text-xs hover:bg-emerald-50 hover:border-emerald-300 transition flex items-center space-x-2"
                      >
                        <span className="text-emerald-700">❓</span>
                        <span>{prompt}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bottom Voice Input Bar */}
                <div className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder="Type or tap microphone..."
                    className="flex-1 px-3 py-2 bg-slate-100 rounded-xl text-xs focus:outline-none"
                  />
                  <button
                    onClick={handleVoiceMicClick}
                    className={`p-2.5 rounded-xl transition ${
                      isListeningMic ? 'bg-red-600 text-white animate-ping' : 'bg-[#137547] text-white'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSendChat()}
                    className="p-2.5 bg-[#0B2545] text-white rounded-xl"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* iPhone Home Indicator */}
          <div className="h-4 w-full flex justify-center items-center">
            <div className="w-32 h-1 bg-slate-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
