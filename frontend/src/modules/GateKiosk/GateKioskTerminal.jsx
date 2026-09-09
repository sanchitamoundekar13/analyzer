import React, { useState, useEffect, useRef } from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  QrCode, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Truck, 
  Clock, 
  ShieldCheck, 
  User, 
  AlertCircle, 
  Volume2, 
  VolumeX, 
  ArrowRight,
  Sparkles,
  Smartphone,
  Check,
  Building2
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export const GateKioskTerminal = () => {
  const { 
    tokens, 
    checkInToken, 
    selectedCenterId, 
    setSelectedCenterId, 
    centers, 
    getCenterName, 
    getCommodityName, 
    getVehicleName, 
    speakText, 
    isSpeaking, 
    stopSpeaking, 
    language, 
    setActivePassToken,
    t 
  } = usePortal();

  const [inputCode, setInputCode] = useState('');
  const [scannedCandidate, setScannedCandidate] = useState(null);
  const [lastCheckInResult, setLastCheckInResult] = useState(null);
  const [searchError, setSearchError] = useState('');
  const [isSimulatingScan, setIsSimulatingScan] = useState(false);

  const activeCenter = centers.find(c => c.id === selectedCenterId) || centers[0];
  const inputRef = useRef(null);

  // Auto-focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [scannedCandidate, lastCheckInResult]);

  // Lookup candidate when code is typed or scanned
  const handleLookup = (codeToLookup) => {
    setSearchError('');
    const clean = codeToLookup.trim().toLowerCase();
    if (!clean) return;

    const found = tokens.find(
      t => t.tokenNumber.toLowerCase() === clean || 
           t.farmerMobile.replace(/\D/g, '') === clean || 
           t.vehicleRegistration.toLowerCase().replace(/\s/g, '') === clean.replace(/\s/g, '') ||
           t.kisanRegId.toLowerCase() === clean
    );

    if (found) {
      setScannedCandidate(found);
      setInputCode('');
      // Audio confirmation prompt
      const voicePrompt = `Token identified: ${found.tokenNumber}. Farmer: ${found.farmerName}. Vehicle: ${found.vehicleRegistration}. Confirm check-in to holding yard.`;
      speakText(voicePrompt, language);
    } else {
      setSearchError(`No valid pass found for "${codeToLookup}". Check Token ID or Mobile.`);
      setScannedCandidate(null);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLookup(inputCode);
  };

  const handleSimulateCameraScan = (demoToken) => {
    setIsSimulatingScan(true);
    setTimeout(() => {
      setIsSimulatingScan(false);
      handleLookup(demoToken.tokenNumber);
    }, 600);
  };

  const handleConfirmCheckIn = () => {
    if (!scannedCandidate) return;

    checkInToken(scannedCandidate.tokenNumber);
    const assignedYardSlot = `Y-${Math.floor(10 + Math.random() * 89)}`;

    const resultObj = {
      ...scannedCandidate,
      status: 'WAITING_IN_YARD',
      yardSlot: assignedYardSlot,
      checkedInTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setLastCheckInResult(resultObj);
    setScannedCandidate(null);

    // Audio announcement
    const voiceMsg = `${resultObj.farmerName} verified. Tractor parked in Holding Yard Slot ${assignedYardSlot}. Queue assigned.`;
    speakText(voiceMsg, language);
  };

  const handleResetForNextVehicle = () => {
    setScannedCandidate(null);
    setLastCheckInResult(null);
    setInputCode('');
    setSearchError('');
  };

  // Recent in-yard tokens for this center
  const recentYardTokens = tokens
    .filter(t => t.status === 'WAITING_IN_YARD' || t.status === 'AT_WEIGHBRIDGE')
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 space-y-4">
      {/* 1. Official Gate Kiosk Header Strip */}
      <div className="bg-[#07172C] text-white p-4 rounded-xl shadow-md border-b-4 border-emerald-500 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-emerald-700/80 rounded-xl flex items-center justify-center border border-emerald-400/40 text-xs font-black shadow">
            GATE
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500 text-slate-950 px-2 py-0.5 rounded">
                Rapid Gate Inward Kiosk
              </span>
              <span className="text-xs text-slate-300 font-mono">Terminal #01 • Zero-Friction</span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-white mt-0.5">
              Gate Inward Verification & Instant Yard Check-In
            </h2>
            <p className="text-xs text-slate-300">
              Department of Agriculture • Mandi Inward Security & Biometric-Free Gate Verification
            </p>
          </div>
        </div>

        {/* Center Switcher */}
        <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-xs">
          <Building2 className="w-4 h-4 text-amber-400" />
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-400 font-bold uppercase">Mandi Inward Gate</span>
            <select
              value={selectedCenterId}
              onChange={(e) => setSelectedCenterId(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              {centers.map(c => (
                <option key={c.id} value={c.id} className="bg-[#0B2545] text-white">
                  {getCenterName(c, language)} ({c.code})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 2. Main High-Throughput Scan & Verification Viewport */}
      {!scannedCandidate && !lastCheckInResult && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: Instant Scanner / Barcode Listener */}
          <div className="lg:col-span-2 bg-white rounded-xl p-5 border-2 border-slate-300 shadow-sm space-y-4">
            <div className="text-center space-y-1">
              <h3 className="text-base sm:text-lg font-black text-[#0B2545] uppercase">
                Scan Pass QR or Enter Token ID / Mobile / Reg No
              </h3>
              <p className="text-xs text-slate-500">
                Aim optical scanner at farmer's digital pass or enter details below for instant auto-lookup
              </p>
            </div>

            {/* Large Scan Input Box */}
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Scan QR or type (e.g. KS-2026-RAM-0105 or 9876543210)..."
                  className="w-full px-4 py-4 bg-slate-50 border-2 border-[#0B2545] rounded-xl text-base sm:text-lg font-mono font-black text-[#0B2545] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 shadow-inner uppercase tracking-wider text-center"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-[#0B2545] hover:bg-[#07172C] text-white font-black text-sm rounded-xl shadow-md transition flex items-center justify-center space-x-2 uppercase tracking-wide cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                  <span>Verify Gate Pass Now</span>
                </button>
              </div>
            </form>

            {searchError && (
              <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-red-800 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{searchError}</span>
              </div>
            )}

            {/* Quick Demo Scanner Shortcuts for Fast Testing */}
            <div className="pt-3 border-t border-slate-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  Quick Simulate Hardware Scanner (Ready Passes):
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  Barcode Emulation Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {tokens.filter(t => t.status === 'BOOKED').slice(0, 3).map((tok) => (
                  <button
                    key={tok.id}
                    onClick={() => handleSimulateCameraScan(tok)}
                    className="p-2.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-blue-50/70 hover:border-[#0B2545] text-left transition flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[#0B2545]">
                      <span>{tok.tokenNumber}</span>
                      <span className="text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">SCAN</span>
                    </div>
                    <div className="text-xs font-bold text-slate-900 mt-1 truncate">{tok.farmerName}</div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">{tok.vehicleRegistration}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Real-time In-Yard Active Roster */}
          <div className="bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-emerald-700" />
                  <span>Currently Parked in Yard</span>
                </h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  {recentYardTokens.length} Vehicles
                </span>
              </div>

              <div className="space-y-2 mt-3 max-h-[320px] overflow-y-auto pr-1">
                {recentYardTokens.length === 0 ? (
                  <div className="text-center py-10 text-slate-400 text-xs">
                    Holding yard is currently empty. Scan passes to check in tractors.
                  </div>
                ) : (
                  recentYardTokens.map((tok, idx) => (
                    <div
                      key={tok.id}
                      className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-mono font-bold text-[#0B2545]">{tok.tokenNumber}</div>
                        <div className="text-slate-800 font-medium">{tok.farmerName}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{tok.vehicleRegistration}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-bold uppercase bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded block">
                          Slot #Y-0{idx + 1}
                        </span>
                        <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">In Yard</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-center text-[10px] text-slate-500">
              National Informatics Centre (NIC) High-Speed Gate Telemetry Gateway
            </div>
          </div>
        </div>
      )}

      {/* 3. Streamlined Confirmation View ("Is It You?") */}
      {scannedCandidate && !lastCheckInResult && (
        <div className="bg-white rounded-2xl border-4 border-[#0B2545] p-6 shadow-2xl space-y-6 animate-fadeIn max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center pb-3 border-b-2 border-slate-200">
            <span className="text-xs font-black uppercase text-white bg-[#0B2545] px-3 py-1 rounded-full tracking-wider">
              Gate Inward Identification • Step 2 of 2
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Is This the Correct Farmer & Vehicle?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Please verify identity details against physical tractor before opening the boom barrier
            </p>
          </div>

          {/* Identity Verification Grid */}
          <div className="bg-slate-50 border-2 border-slate-300 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-200 gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Token Serial ID</span>
                <div className="text-2xl font-mono font-black text-[#0B2545]">{scannedCandidate.tokenNumber}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Allotted 2-Hour Slot</span>
                <div className="text-base font-mono font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded border border-emerald-300">
                  {scannedCandidate.slotWindow}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 block">1. Farmer Identity</span>
                <div className="text-base font-black text-slate-900">{scannedCandidate.farmerName}</div>
                <div className="font-mono text-slate-600">Mobile: <strong>{scannedCandidate.farmerMobile}</strong></div>
                <div className="font-mono text-[#0B2545]">Kisan ID: <strong>{scannedCandidate.kisanRegId}</strong></div>
                <div className="text-slate-600">Village: {scannedCandidate.village}, {scannedCandidate.district}</div>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 block">2. Crop & Vehicle Details</span>
                <div className="text-base font-black text-emerald-800">{getCommodityName(scannedCandidate.commodity, language)}</div>
                <div className="text-slate-700">Declared Qty: <strong className="font-mono">{scannedCandidate.estimatedQuantityQtl} Quintals</strong></div>
                <div className="text-slate-700">Vehicle Type: <strong>{getVehicleName(scannedCandidate.vehicleType, language)}</strong></div>
                <div className="text-base font-mono font-black text-[#0B2545] bg-amber-100 px-2 py-0.5 rounded inline-block mt-1">
                  {scannedCandidate.vehicleRegistration}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons: 1-Click Confirm vs Reject */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleConfirmCheckIn}
              className="py-4 bg-[#137547] hover:bg-[#0D4F30] text-white font-black text-base rounded-xl shadow-lg transition flex items-center justify-center space-x-2 uppercase tracking-wide cursor-pointer"
            >
              <Check className="w-6 h-6 stroke-[3]" />
              <span>YES, CONFIRM & AUTO CHECK-IN</span>
            </button>

            <button
              onClick={handleResetForNextVehicle}
              className="py-4 bg-red-600 hover:bg-red-700 text-white font-black text-base rounded-xl shadow-md transition flex items-center justify-center space-x-2 uppercase tracking-wide cursor-pointer"
            >
              <XCircle className="w-6 h-6" />
              <span>CANCEL / REJECT PASS</span>
            </button>
          </div>
        </div>
      )}

      {/* 4. Instant Success Banner Post Check-In */}
      {lastCheckInResult && (
        <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-4 border-[#137547] rounded-2xl p-6 shadow-2xl space-y-5 animate-fadeIn max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto text-3xl font-black shadow-lg">
            ✓
          </div>

          <div>
            <span className="text-xs font-black uppercase text-emerald-950 bg-emerald-200 border border-emerald-400 px-3 py-1 rounded-full">
              GATE INWARD ENTRY AUTHORIZED • BOOM BARRIER OPEN
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#0B2545] mt-2">
              Vehicle Parked in Holding Yard
            </h3>
            <p className="text-sm font-bold text-slate-700 mt-1">
              Token: <span className="font-mono font-black text-[#0B2545]">{lastCheckInResult.tokenNumber}</span> | Farmer: <strong>{lastCheckInResult.farmerName}</strong>
            </p>
          </div>

          <div className="bg-white border-2 border-emerald-300 rounded-xl p-4 max-w-md mx-auto space-y-2">
            <div className="text-xs text-slate-500 font-bold uppercase">Assigned Parking Bay</div>
            <div className="text-3xl font-black font-mono text-[#137547]">{lastCheckInResult.yardSlot}</div>
            <p className="text-xs text-slate-600">
              Vehicle <strong className="font-mono">{lastCheckInResult.vehicleRegistration}</strong> is now in live digital queue. Automated SMS & WhatsApp sent to farmer's mobile.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleResetForNextVehicle}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#0B2545] hover:bg-[#07172C] text-white font-black text-sm rounded-xl shadow-md transition inline-flex items-center justify-center space-x-2 uppercase tracking-wide cursor-pointer"
            >
              <span>Scan Next Inward Vehicle</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
