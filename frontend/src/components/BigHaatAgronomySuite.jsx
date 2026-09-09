import React, { useState } from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  BIGHAAT_CROP_DOCTOR_DB, 
  BIGHAAT_MANDI_BHAV_COMPARISON, 
  BIGHAAT_FERTILIZER_RECOMMENDATIONS, 
  BIGHAAT_MOISTURE_CURING_GUIDE 
} from '../data/agronomyResources';
import { 
  Sprout, 
  Stethoscope, 
  TrendingUp, 
  Droplet, 
  Calculator, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Leaf, 
  Sparkles,
  CloudSun,
  Scale
} from 'lucide-react';

export const BigHaatAgronomySuite = () => {
  const { 
    language, 
    speakText, 
    isSpeaking, 
    stopSpeaking, 
    setFarmerActiveView,
    t 
  } = usePortal();

  const [activeSubTab, setActiveSubTab] = useState('doctor'); // 'doctor' | 'mandi_bhav' | 'moisture' | 'fertilizer' | 'weather'
  
  // Crop Doctor State
  const [selectedDiseaseId, setSelectedDiseaseId] = useState(BIGHAAT_CROP_DOCTOR_DB[0].id);
  const activeDisease = BIGHAAT_CROP_DOCTOR_DB.find(d => d.id === selectedDiseaseId) || BIGHAAT_CROP_DOCTOR_DB[0];

  // Fertilizer Calculator State
  const [calcCrop, setCalcCrop] = useState('Paddy (Grade A)');
  const [calcAcres, setCalcAcres] = useState('2.5');

  // Mandi Bhav Calculator State
  const [bhavQty, setBhavQty] = useState('75');

  const acresNum = parseFloat(calcAcres) || 1;
  const fertData = BIGHAAT_FERTILIZER_RECOMMENDATIONS[calcCrop] || BIGHAAT_FERTILIZER_RECOMMENDATIONS['Paddy (Grade A)'];

  const handleVoiceReadout = (textToRead) => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speakText(textToRead, language);
    }
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* 1. Official Knowledge Partner Attribution Ribbon */}
      <div className="bg-gradient-to-r from-[#07172C] via-[#0B2545] to-[#133B6B] text-white p-5 rounded-2xl shadow-lg border-b-4 border-emerald-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1">
              <Leaf className="w-3 h-3 fill-current" /> Knowledge Partner: BigHaat.com
            </span>
            <span className="text-xs text-slate-300 font-mono">ICAR & DLT Certified Agronomy Intelligence</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <Leaf className="w-6 h-6 text-emerald-400" />
            <span>KisanSetu Agronomy & Market Intelligence Suite</span>
          </h2>
          <p className="text-xs text-slate-200 mt-1 max-w-2xl">
            Empowering farmers with AI crop diagnostics, pre-harvest grain moisture curing, fertilizer optimization, and real-time APMC Mandi Bhav vs Government MSP price arbitrage.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="https://www.bighaat.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center space-x-1.5 border border-emerald-400/40"
          >
            <span>Visit BigHaat.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 2. Sub-Tab Navigator */}
      <div className="bg-white p-1.5 rounded-xl border border-slate-300 shadow-sm flex overflow-x-auto no-scrollbar gap-1 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('doctor')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'doctor'
              ? 'bg-[#0B2545] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Stethoscope className="w-4 h-4 text-emerald-400" />
          <span>1. Crop Doctor & Pest Diagnosis</span>
        </button>

        <button
          onClick={() => setActiveSubTab('mandi_bhav')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'mandi_bhav'
              ? 'bg-[#0B2545] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span>2. Mandi Bhav vs Govt MSP Arbitrage</span>
        </button>

        <button
          onClick={() => setActiveSubTab('moisture')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'moisture'
              ? 'bg-[#0B2545] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Droplet className="w-4 h-4 text-sky-400" />
          <span>3. Pre-Mandi Moisture Curing (≤17% QC)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('fertilizer')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'fertilizer'
              ? 'bg-[#0B2545] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Calculator className="w-4 h-4 text-purple-400" />
          <span>4. Acreage Fertilizer & Seed Calculator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('weather')}
          className={`px-3.5 py-2 rounded-lg transition flex items-center space-x-1.5 whitespace-nowrap cursor-pointer ${
            activeSubTab === 'weather'
              ? 'bg-[#0B2545] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <CloudSun className="w-4 h-4 text-amber-500" />
          <span>5. Weather & Spray Advisory</span>
        </button>
      </div>

      {/* 3. Sub-View Content */}

      {/* View 1: Crop Doctor & Pest Remedy */}
      {activeSubTab === 'doctor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fadeIn">
          {/* Disease List Selector */}
          <div className="bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b pb-2 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-emerald-700" />
              <span>Select Pest or Disease Symptom</span>
            </h3>

            <div className="space-y-2">
              {BIGHAAT_CROP_DOCTOR_DB.map((d) => {
                const isSel = d.id === activeDisease.id;
                return (
                  <div
                    key={d.id}
                    onClick={() => setSelectedDiseaseId(d.id)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition ${
                      isSel
                        ? 'border-[#0B2545] bg-blue-50/70 shadow-sm font-bold'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>{d.crop}</span>
                      <span className="text-red-700 font-semibold">{d.category}</span>
                    </div>
                    <div className="text-slate-900 font-bold mt-1 text-sm">{d.diseaseName}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Diagnosis & Remedy Card */}
          <div className="lg:col-span-2 bg-white rounded-xl p-5 sm:p-6 border border-slate-300 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-200 gap-2">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-900 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                  {activeDisease.crop} • {activeDisease.category}
                </span>
                <h3 className="text-xl font-black text-[#0B2545] mt-1">
                  {activeDisease.diseaseName}
                </h3>
              </div>

              <button
                onClick={() => handleVoiceReadout(`${activeDisease.diseaseName}. Symptoms: ${activeDisease.symptoms}. Recommended treatment: ${activeDisease.chemicalTreatment}`)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg shadow transition flex items-center space-x-1 ${
                  isSpeaking ? 'bg-red-600 text-white animate-pulse' : 'bg-amber-400 hover:bg-amber-500 text-slate-950'
                }`}
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isSpeaking ? 'Stop Audio' : 'Listen Remedy'}</span>
              </button>
            </div>

            {/* Diagnostic Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase block">1. Key Symptoms on Field</span>
                <p className="text-slate-800 leading-relaxed">{activeDisease.symptoms}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase block">2. Environmental Trigger</span>
                <p className="text-slate-800 leading-relaxed">{activeDisease.causes}</p>
              </div>
            </div>

            {/* Treatment Protocols */}
            <div className="space-y-3 pt-2">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 space-y-1 text-xs">
                <div className="flex items-center space-x-1.5 font-bold text-emerald-950">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span>Bio / Organic Management (BigHaat Green Advisory)</span>
                </div>
                <p className="text-emerald-900 leading-relaxed">{activeDisease.organicRemedy}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3.5 space-y-1 text-xs">
                <div className="flex items-center space-x-1.5 font-bold text-blue-950">
                  <ShieldCheck className="w-4 h-4 text-[#0B2545]" />
                  <span>Targeted Chemical Remedy & Dosage</span>
                </div>
                <p className="text-blue-900 leading-relaxed font-mono">{activeDisease.chemicalTreatment}</p>
                <div className="text-[10px] text-blue-700 pt-1 font-semibold">
                  Safe Withholding Period before Mandi Harvest: <strong>{activeDisease.withholdingDays} Days</strong>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-950 flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Mandi QC Impact:</strong> {activeDisease.mandiImpact}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Mandi Bhav vs MSP Arbitrage */}
      {activeSubTab === 'mandi_bhav' && (
        <div className="space-y-5 animate-fadeIn">
          <div className="bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-200 gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Live APMC Market Price vs Official MSP Arbitrage Calculator
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time market price data mapped against Government of India Minimum Support Price (MSP)
                </p>
              </div>

              {/* Quantity Input for Total Profit Multiplier */}
              <div className="flex items-center space-x-2 bg-slate-100 px-3 py-1.5 rounded-lg border">
                <span className="text-xs font-bold text-slate-700">Calculate for:</span>
                <input
                  type="number"
                  value={bhavQty}
                  onChange={(e) => setBhavQty(e.target.value)}
                  className="w-16 px-2 py-0.5 bg-white border border-slate-300 rounded font-mono font-bold text-xs text-center text-[#0B2545]"
                />
                <span className="text-xs text-slate-600 font-bold">Quintals</span>
              </div>
            </div>

            {/* Comparison Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {BIGHAAT_MANDI_BHAV_COMPARISON.map((item, idx) => {
                const qtyVal = parseFloat(bhavQty) || 50;
                const totalExtra = Math.round(item.differencePerQtl * qtyVal);

                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/40 via-white to-emerald-50/20 shadow-sm space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#0B2545]">{item.commodity}</span>
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {item.trend}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs pt-3">
                        <div className="bg-emerald-100/60 p-2 rounded border border-emerald-300">
                          <span className="text-[10px] uppercase font-bold text-emerald-900 block">Govt MSP Rate</span>
                          <strong className="text-base font-mono font-black text-emerald-800">₹{item.govMspRate}</strong>
                          <span className="text-[9px] text-emerald-700 block">/ Quintal (100% DBT)</span>
                        </div>

                        <div className="bg-slate-100 p-2 rounded border border-slate-300">
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Local APMC Spot</span>
                          <strong className="text-base font-mono font-bold text-slate-700">₹{item.localApmcRate}</strong>
                          <span className="text-[9px] text-slate-500 block">({item.primaryMandi})</span>
                        </div>
                      </div>

                      <div className="mt-3 p-2.5 bg-white border border-emerald-300 rounded-lg text-xs space-y-1 shadow-inner">
                        <div className="flex justify-between text-slate-700">
                          <span>Extra Gain per Quintal:</span>
                          <strong className="font-mono text-emerald-700">+₹{item.differencePerQtl} / Qtl</strong>
                        </div>
                        <div className="flex justify-between text-slate-900 font-bold border-t pt-1">
                          <span>Total Extra Earnings ({qtyVal} Qtl):</span>
                          <strong className="font-mono text-base text-[#137547]">+₹{totalExtra.toLocaleString('en-IN')}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setFarmerActiveView('book')}
                      className="w-full py-2 bg-[#137547] hover:bg-[#0D4F30] text-white text-xs font-bold rounded-lg shadow transition flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>Book Slot at Official MSP Rate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* View 3: Pre-Mandi Moisture Curing */}
      {activeSubTab === 'moisture' && (
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-300 shadow-sm space-y-5 animate-fadeIn">
          <div className="border-b pb-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                  Agmark Grade-I Quality Standard
                </span>
                <span className="text-xs font-mono font-bold text-[#0B2545]">Target: Moisture &le; 17.0%</span>
              </div>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                4-Step Pre-Mandi Grain Drying & Moisture Curing Protocol
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-500">Based on BigHaat Post-Harvest Practices</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BIGHAAT_MOISTURE_CURING_GUIDE.map((guide) => (
              <div
                key={guide.step}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 hover:bg-blue-50/40 transition"
              >
                <div className="flex items-center space-x-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#0B2545] text-white text-xs font-black flex items-center justify-center">
                    {guide.step}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">
                    {guide.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-8">
                  {guide.desc}
                </p>
                <div className="pl-8 pt-1">
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    Result: {guide.targetMoisture}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 border-2 border-emerald-400 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-700 flex-shrink-0" />
              <div>
                <strong className="text-xs text-emerald-950 block">Zero Mandi Rejection Guarantee</strong>
                <p className="text-xs text-emerald-900">
                  Grains cured under this 4-step protocol consistently achieve 14.5% - 16.0% moisture readings at the Mandi QC desk, clearing gate entry in under 2 minutes.
                </p>
              </div>
            </div>
            <button
              onClick={() => setFarmerActiveView('book')}
              className="px-4 py-2 bg-[#137547] text-white text-xs font-bold rounded-lg shadow-sm whitespace-nowrap cursor-pointer hover:bg-[#0D4F30]"
            >
              Book Mandi Slot &rarr;
            </button>
          </div>
        </div>
      )}

      {/* View 4: Fertilizer & Seed Calculator */}
      {activeSubTab === 'fertilizer' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 animate-fadeIn">
          {/* Inputs */}
          <div className="bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide border-b pb-2 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-purple-700" />
              <span>Input Farm Parameters</span>
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Select Crop</label>
              <select
                value={calcCrop}
                onChange={(e) => setCalcCrop(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-none"
              >
                {Object.keys(BIGHAAT_FERTILIZER_RECOMMENDATIONS).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Land Area (Acres)</label>
              <input
                type="number"
                min="0.5"
                max="100"
                step="0.5"
                value={calcAcres}
                onChange={(e) => setCalcAcres(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg font-mono font-bold text-xs text-slate-900 focus:outline-none"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">1 Acre = ~1.6 Bigha (Western UP / North India)</span>
            </div>

            <div className="pt-2 border-t text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-800">BigHaat Balanced Nutrition Formula:</div>
              <p className="text-[11px]">
                Prevents soil degradation and reduces excessive Urea burn while maximizing grain test weight for MSP grading.
              </p>
            </div>
          </div>

          {/* Generated Bags Breakdown */}
          <div className="lg:col-span-2 bg-white rounded-xl p-5 sm:p-6 border border-slate-300 shadow-sm space-y-4">
            <div className="border-b pb-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-black uppercase text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                  {calcCrop} • {acresNum} Acre Requirement
                </span>
                <h3 className="text-lg font-black text-[#0B2545] mt-1">
                  Required Input Quantities & Split Timetable
                </h3>
              </div>
            </div>

            {/* Metric Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Certified Seeds</span>
                <strong className="text-xl font-mono font-black text-slate-900">
                  {(fertData.seedRateKgPerAcre * acresNum).toFixed(1)} kg
                </strong>
                <span className="text-[10px] text-slate-500 block">Treated seed</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Urea (45kg Bags)</span>
                <strong className="text-xl font-mono font-black text-blue-700">
                  {Math.ceil(fertData.ureaBagsPerAcre * acresNum)} Bags
                </strong>
                <span className="text-[10px] text-slate-500 block">in 3 split doses</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">DAP (50kg Bags)</span>
                <strong className="text-xl font-mono font-black text-emerald-700">
                  {Math.ceil(fertData.dapBagsPerAcre * acresNum)} Bags
                </strong>
                <span className="text-[10px] text-slate-500 block">100% Basal dose</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-center">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Zinc Sulfate</span>
                <strong className="text-xl font-mono font-black text-purple-700">
                  {(fertData.zincKgPerAcre * acresNum).toFixed(0)} kg
                </strong>
                <span className="text-[10px] text-slate-500 block">Micro-nutrients</span>
              </div>
            </div>

            {/* Split Schedule Table */}
            <div className="pt-2 space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase block">Application Schedule:</span>
              <div className="space-y-2">
                {fertData.schedule.map((sch, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-lg border text-xs flex flex-col sm:flex-row justify-between gap-1">
                    <strong className="text-[#0B2545] font-bold sm:w-1/3">{sch.stage}</strong>
                    <span className="text-slate-700 sm:w-2/3">{sch.items}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View 5: Weather & Spray Advisory */}
      {activeSubTab === 'weather' && (
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-300 shadow-sm space-y-4 animate-fadeIn">
          <div className="border-b pb-3 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-950 bg-amber-200 px-2 py-0.5 rounded">
                Hyperlocal Farm Micro-Climate
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-1">
                Field Weather & Spray Suitability Index (Rampur Agricultural Zone)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              Ideal Harvesting Window
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[10px]">Ambient Humidity</span>
              <div className="text-2xl font-black font-mono text-[#0B2545]">54%</div>
              <p className="text-slate-600 text-[11px]">Optimal for sun-drying threshed paddy kernels.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[10px]">Rainfall Probability</span>
              <div className="text-2xl font-black font-mono text-emerald-700">0% (Next 48h)</div>
              <p className="text-slate-600 text-[11px]">Clear skies expected. Safe to haul harvest to Mandi.</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border space-y-1">
              <span className="text-slate-500 font-bold uppercase text-[10px]">Wind Velocity</span>
              <div className="text-2xl font-black font-mono text-slate-900">8 km/h NW</div>
              <p className="text-slate-600 text-[11px]">Excellent for mechanical winnowing and chaff removal.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};