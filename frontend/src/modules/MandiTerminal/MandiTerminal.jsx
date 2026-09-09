import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  QrCode, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  Droplet, 
  FileCheck, 
  Clock, 
  Truck, 
  ArrowRight, 
  Filter, 
  FileText, 
  MessageSquare,
  ShieldAlert,
  Printer,
  Building2,
  Lock
} from 'lucide-react';

export const MandiTerminal = () => {
  const { 
    tokens, 
    checkInToken, 
    updateMoisture, 
    callToWeighbridge, 
    completeWeighment, 
    setActivePassToken, 
    setActiveWhatsAppModal, 
    selectedCenterId, 
    currentCenter, 
    getCommodityName,
    getCenterName,
    language, 
    t 
  } = usePortal();

  // Gate Check-in Bar State
  const [scanInput, setScanInput] = useState('');
  const [scanMessage, setScanMessage] = useState(null);

  // Active Desk Operations State
  const [selectedTokenForOps, setSelectedTokenForOps] = useState(null);
  const [moistureInput, setMoistureInput] = useState('14.5');
  const [grossWeightInput, setGrossWeightInput] = useState('120.0');
  const [tareWeightInput, setTareWeightInput] = useState('48.0');

  // Master Table Filter State
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [tableSearch, setTableSearch] = useState('');

  // 1. Gate Fast Check-In Handler
  const handleGateScan = (e) => {
    e.preventDefault();
    const query = scanInput.trim().toUpperCase();
    if (!query) return;

    const matched = tokens.find(
      t => t.tokenNumber.toUpperCase() === query || 
           t.vehicleRegistration.toUpperCase().replace(/\s/g, '') === query.replace(/\s/g, '') ||
           t.tokenNumber.toUpperCase().includes(query)
    );

    if (matched) {
      if (matched.status === 'COMPLETED') {
        setScanMessage({ type: 'warning', text: `Token ${matched.tokenNumber} procurement and DBT transfer was already completed.` });
      } else {
        checkInToken(matched.tokenNumber);
        setScanMessage({ 
          type: 'success', 
          text: `Gate Entry Verified! Token ${matched.tokenNumber} (${matched.farmerName} • ${matched.vehicleRegistration}) queued in holding yard.` 
        });
        setSelectedTokenForOps(matched);
      }
    } else {
      setScanMessage({ type: 'error', text: `No valid record found for '${scanInput}'.` });
    }
    setScanInput('');
  };

  // 2. QC Moisture submit
  const handleMoistureSubmit = (e) => {
    e.preventDefault();
    if (!selectedTokenForOps) return;
    updateMoisture(selectedTokenForOps.tokenNumber, moistureInput);
  };

  // 3. Complete Weighment
  const handleWeighmentSubmit = (e) => {
    e.preventDefault();
    if (!selectedTokenForOps) return;
    const completed = completeWeighment(selectedTokenForOps.tokenNumber, grossWeightInput, tareWeightInput);
    if (completed) {
      setActiveWhatsAppModal({
        token: completed,
        eventType: 'WEIGHMENT_COMPLETE'
      });
    }
  };

  // Filtered tokens for master table
  const filteredTokens = tokens.filter(t => {
    const matchesCenter = t.centerId === selectedCenterId || t.centerName === currentCenter.name;
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    const matchesSearch = tableSearch === '' || 
      t.tokenNumber.toLowerCase().includes(tableSearch.toLowerCase()) ||
      t.farmerName.toLowerCase().includes(tableSearch.toLowerCase()) ||
      t.vehicleRegistration.toLowerCase().includes(tableSearch.toLowerCase());

    return matchesCenter && matchesStatus && matchesSearch;
  });

  const currentMoistureVal = parseFloat(moistureInput) || 0;
  const isQcPass = currentMoistureVal <= 17.0 && currentMoistureVal > 0;
  const netWeightCalc = Math.max(0, (parseFloat(grossWeightInput) || 0) - (parseFloat(tareWeightInput) || 0));
  const activeTokenRate = selectedTokenForOps ? selectedTokenForOps.mspRate : 2300;
  const livePayoutCalc = Math.round(netWeightCalc * activeTokenRate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
      {/* Mandi Terminal Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 rounded-lg border border-slate-300 shadow-sm gap-3">
        <div>
          <div className="flex items-center space-x-2 text-[10px] text-[#0B2545] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Intranet Terminal Node: NIC-PPC-TER-04</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-0.5">
            {getCenterName(currentCenter, language)}
          </h2>
          <p className="text-xs text-slate-600">
            Center Code: <strong className="font-mono text-slate-900">{currentCenter.code}</strong> • Nodal Authority: <span className="font-semibold text-slate-800">{currentCenter.centerInCharge}</span>
          </p>
        </div>

        {/* Live Yard Count Badges */}
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="bg-slate-50 border border-slate-300 px-3 py-1 rounded text-center">
            <div className="text-[10px] text-slate-500 font-bold uppercase">{t.holdingYardCount}</div>
            <strong className="text-blue-900 font-mono text-sm">{tokens.filter(t => t.status === 'WAITING_IN_YARD').length}</strong>
          </div>
          <div className="bg-slate-50 border border-slate-300 px-3 py-1 rounded text-center">
            <div className="text-[10px] text-slate-500 font-bold uppercase">{t.atWeighbridgeCount}</div>
            <strong className="text-purple-900 font-mono text-sm">{tokens.filter(t => t.status === 'AT_WEIGHBRIDGE').length}</strong>
          </div>
          <div className="bg-slate-50 border border-slate-300 px-3 py-1 rounded text-center">
            <div className="text-[10px] text-slate-500 font-bold uppercase">{t.procurementDoneCount}</div>
            <strong className="text-emerald-800 font-mono text-sm">{tokens.filter(t => t.status === 'COMPLETED').length}</strong>
          </div>
        </div>
      </div>

      {/* Top Action: Fast Gate Scanner / Token Lookup */}
      <div className="bg-[#0B2545] text-white rounded-lg p-4 shadow-sm border border-slate-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-2">
              <QrCode className="w-4 h-4 text-gov-saffron" />
              <h3 className="font-bold text-sm">
                {t.gateCheckIn}
              </h3>
            </div>
            <p className="text-xs text-slate-300">
              Verify E-Gate Pass barcode or token ID upon physical arrival at mandi gate.
            </p>
          </div>

          <form onSubmit={handleGateScan} className="w-full md:w-auto flex-1 max-w-lg flex gap-2">
            <input
              type="text"
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder={t.scanOrSearchPlaceholder}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-xs text-white placeholder-slate-400 font-mono focus:border-gov-saffron focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#137547] hover:bg-[#0D4F30] text-white font-bold text-xs rounded shadow transition flex-shrink-0"
            >
              {t.quickCheckInBtn}
            </button>
          </form>
        </div>

        {scanMessage && (
          <div className={`mt-2.5 p-2 rounded text-xs flex items-center space-x-2 font-medium ${
            scanMessage.type === 'success' ? 'bg-emerald-900/90 border border-emerald-500 text-emerald-100' :
            scanMessage.type === 'warning' ? 'bg-amber-900/90 border border-amber-500 text-amber-100' :
            'bg-red-900/90 border border-red-500 text-red-100'
          }`}>
            {scanMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 text-amber-300 flex-shrink-0" />}
            <span>{scanMessage.text}</span>
          </div>
        )}
      </div>

      {/* Dual Operator Desk: QC Moisture & Weighbridge Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Desk 1: Agmark Quality Control Moisture Analyzer */}
        <div className="bg-white rounded-lg p-4 border border-slate-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <Droplet className="w-4 h-4 text-[#0B2545]" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase">{t.qcMoistureDesk}</h3>
                <span className="text-[10px] text-slate-500">{t.maxMoistureLimit}</span>
              </div>
            </div>

            {selectedTokenForOps && (
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-[#0B2545] border border-slate-300">
                {selectedTokenForOps.tokenNumber}
              </span>
            )}
          </div>

          {selectedTokenForOps ? (
            <form onSubmit={handleMoistureSubmit} className="space-y-3">
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Farmer / Kisan ID:</span>
                  <strong className="text-slate-900">{selectedTokenForOps.farmerName} ({selectedTokenForOps.kisanRegId})</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Commodity & Vehicle:</span>
                  <span className="font-semibold text-[#137547]">{getCommodityName(selectedTokenForOps.commodity, language)} • {selectedTokenForOps.vehicleRegistration}</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 block">{t.moistureInput}</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="40"
                    value={moistureInput}
                    onChange={(e) => setMoistureInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-slate-900 text-xs focus:border-[#0B2545] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-[#0B2545] hover:bg-[#07172C] text-white font-bold text-xs rounded transition"
                  >
                    Log QC Reading
                  </button>
                </div>
              </div>

              {/* Official QC Status Box */}
              <div className={`p-2.5 rounded border flex items-center justify-between text-xs font-bold ${
                isQcPass
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}>
                <div className="flex items-center space-x-1.5">
                  {isQcPass ? <CheckCircle2 className="w-4 h-4 text-emerald-700" /> : <ShieldAlert className="w-4 h-4 text-red-700" />}
                  <span>{isQcPass ? t.qcPassedBadge : t.qcFailedBadge}</span>
                </div>
                <span className="font-mono text-sm">{currentMoistureVal}%</span>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center text-xs text-slate-400">
              Select a token from the manifest below or scan at gate to record digital moisture reading.
            </div>
          )}
        </div>

        {/* Desk 2: Certified Electronic Weighbridge Terminal */}
        <div className="bg-white rounded-lg p-4 border border-slate-300 shadow-sm space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center space-x-2">
              <Scale className="w-4 h-4 text-[#0B2545]" />
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase">{t.weighbridgeDesk}</h3>
                <span className="text-[10px] text-slate-500">Certified Weighment Ledger</span>
              </div>
            </div>

            {selectedTokenForOps && (
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-900 border border-slate-300">
                MSP: ₹{selectedTokenForOps.mspRate}/qtl
              </span>
            )}
          </div>

          {selectedTokenForOps ? (
            <form onSubmit={handleWeighmentSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.grossWeight}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={grossWeightInput}
                    onChange={(e) => setGrossWeightInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-xs focus:border-[#0B2545] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">{t.tareWeight}</label>
                  <input
                    type="number"
                    step="0.01"
                    value={tareWeightInput}
                    onChange={(e) => setTareWeightInput(e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded font-mono font-bold text-xs focus:border-[#0B2545] focus:outline-none"
                  />
                </div>
              </div>

              {/* Computed Net Harvest Strip */}
              <div className="bg-slate-50 border border-slate-300 rounded p-2.5 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-500 font-bold uppercase text-[9px]">{t.netWeight}</span>
                  <div className="text-sm font-black text-slate-900 font-mono">
                    {netWeightCalc.toFixed(2)} Quintals
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-slate-500 font-bold uppercase text-[9px]">{t.mspPayout}</span>
                  <div className="text-base font-black text-[#137547] font-mono">
                    ₹{livePayoutCalc.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={netWeightCalc <= 0}
                className="w-full py-2.5 bg-[#137547] hover:bg-[#0D4F30] disabled:bg-slate-300 text-white font-bold text-xs rounded shadow transition flex items-center justify-center space-x-1.5 uppercase"
              >
                <FileCheck className="w-4 h-4" />
                <span>{t.approveWeighmentBtn}</span>
              </button>
            </form>
          ) : (
            <div className="py-6 text-center text-xs text-slate-400">
              Select a checked-in vehicle to log certified tare/gross weight and execute DBT transmission.
            </div>
          )}
        </div>
      </div>

      {/* Master Operational Table (Mandi Gate Manifest) */}
      <div className="bg-white rounded-lg border border-slate-300 shadow-sm overflow-hidden space-y-3 p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase">{t.masterTableTitle}</h3>
            <p className="text-[11px] text-slate-500">Official log of inward arrival, moisture testing, and MSP disbursement.</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              placeholder="Search token / name / vehicle..."
              className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded text-xs font-medium w-48 focus:outline-none"
            />

            <div className="flex bg-slate-100 p-0.5 rounded border border-slate-300 text-[10px] font-bold">
              {['ALL', 'BOOKED', 'WAITING_IN_YARD', 'AT_WEIGHBRIDGE', 'COMPLETED'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-2 py-0.5 rounded transition ${
                    statusFilter === status
                      ? 'bg-[#0B2545] text-white font-bold'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  {status.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Authentic Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 uppercase text-[10px] font-bold border-b border-slate-300">
                <th className="py-2.5 px-2.5">Token ID / टोकन</th>
                <th className="py-2.5 px-2.5">Farmer & Khatauni ID</th>
                <th className="py-2.5 px-2.5">Commodity</th>
                <th className="py-2.5 px-2.5">Allotted Slot</th>
                <th className="py-2.5 px-2.5">Vehicle Reg.</th>
                <th className="py-2.5 px-2.5 text-center">Moisture %</th>
                <th className="py-2.5 px-2.5">Status</th>
                <th className="py-2.5 px-2.5 text-right">Desk Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTokens.map((token) => {
                const isSelected = selectedTokenForOps?.tokenNumber === token.tokenNumber;

                return (
                  <tr
                    key={token.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      isSelected ? 'bg-blue-50/70 font-semibold' : ''
                    }`}
                  >
                    <td className="py-2 px-2.5 font-mono font-bold text-[#0B2545]">
                      {token.tokenNumber}
                    </td>

                    <td className="py-2 px-2.5">
                      <div className="font-bold text-slate-900">{token.farmerName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{token.kisanRegId}</div>
                    </td>

                    <td className="py-2 px-2.5">
                      <span className="font-semibold text-slate-800">{getCommodityName(token.commodity, language)}</span>
                      <div className="text-[10px] text-slate-500">{token.estimatedQuantityQtl} qtl est.</div>
                    </td>

                    <td className="py-2 px-2.5">
                      <span className="font-mono text-slate-700">{token.slotWindow}</span>
                    </td>

                    <td className="py-2 px-2.5">
                      <div className="font-mono font-bold text-slate-900">{token.vehicleRegistration}</div>
                    </td>

                    <td className="py-2 px-2.5 text-center font-mono font-bold">
                      {token.moisturePercentage !== null ? (
                        <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                          token.moisturePercentage <= 17.0
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-red-100 text-red-900 border border-red-300'
                        }`}>
                          {token.moisturePercentage}%
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>

                    <td className="py-2 px-2.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        token.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        token.status === 'AT_WEIGHBRIDGE' ? 'bg-purple-100 text-purple-900 border border-purple-300' :
                        token.status === 'WAITING_IN_YARD' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                        'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}>
                        {token.status.replace(/_/g, ' ')}
                      </span>
                    </td>

                    <td className="py-2 px-2.5 text-right space-x-1">
                      {token.status === 'BOOKED' && (
                        <button
                          onClick={() => {
                            checkInToken(token.tokenNumber);
                            setSelectedTokenForOps(token);
                          }}
                          className="px-2 py-1 rounded bg-[#0B2545] hover:bg-[#07172C] text-white font-bold text-[10px]"
                        >
                          {t.checkIn}
                        </button>
                      )}

                      {token.status === 'WAITING_IN_YARD' && (
                        <button
                          onClick={() => {
                            callToWeighbridge(token.tokenNumber);
                            setSelectedTokenForOps(token);
                          }}
                          className="px-2 py-1 rounded bg-purple-700 hover:bg-purple-800 text-white font-bold text-[10px]"
                        >
                          {t.callScales}
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSelectedTokenForOps(token);
                          if (token.moisturePercentage) setMoistureInput(token.moisturePercentage.toString());
                          if (token.grossWeightQtl) setGrossWeightInput(token.grossWeightQtl.toString());
                          if (token.tareWeightQtl) setTareWeightInput(token.tareWeightQtl.toString());
                        }}
                        className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[10px]"
                      >
                        {t.operateDesk}
                      </button>

                      <button
                        onClick={() => setActivePassToken(token)}
                        className="p-1 text-slate-600 hover:text-slate-900 rounded"
                        title="View Official Pass"
                      >
                        <FileText className="w-3.5 h-3.5 inline" />
                      </button>

                      <button
                        onClick={() => setActiveWhatsAppModal({
                          token,
                          eventType: token.status === 'COMPLETED' ? 'WEIGHMENT_COMPLETE' : 'SLOT_CONFIRMED'
                        })}
                        className="p-1 text-emerald-700 hover:text-emerald-900 rounded"
                        title="Dispatch Official WhatsApp Alert"
                      >
                        <MessageSquare className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
