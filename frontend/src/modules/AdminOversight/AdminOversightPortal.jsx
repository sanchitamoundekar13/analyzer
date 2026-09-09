import React, { useState } from 'react';
import { usePortal } from '../../context/PortalContext';
import { 
  Building2, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Truck, 
  Scale, 
  CreditCard, 
  Users, 
  Download, 
  RefreshCw, 
  Zap, 
  Activity, 
  Server, 
  ShieldCheck,
  ArrowRight,
  Database,
  Globe,
  Radio
} from 'lucide-react';

export const AdminOversightPortal = () => {
  const { 
    centers, 
    tokens, 
    getCrossCenterMetrics, 
    triggerCrossCenterRebalance, 
    getCenterName, 
    getCommodityName, 
    language, 
    setIsArchitectureModalOpen,
    systemTelemetry,
    t 
  } = usePortal();

  const [selectedFilterDistrict, setSelectedFilterDistrict] = useState('ALL');
  const [isRebalanceTriggered, setIsRebalanceTriggered] = useState(false);

  const metrics = getCrossCenterMetrics();

  const handleTriggerRebalance = () => {
    triggerCrossCenterRebalance('ppc-rampur-01', 'ppc-kalyanpur-03');
    setIsRebalanceTriggered(true);
    setTimeout(() => setIsRebalanceTriggered(false), 4000);
  };

  // Filtered centers
  const displayedCenters = selectedFilterDistrict === 'ALL' 
    ? centers 
    : centers.filter(c => c.district === selectedFilterDistrict);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-5 space-y-5 animate-fadeIn">
      {/* 1. National Admin Banner */}
      <div className="bg-gradient-to-r from-[#07172C] via-[#0B2545] to-[#133B6B] text-white p-5 rounded-2xl shadow-lg border-b-4 border-amber-400 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider flex items-center gap-1">
              <Radio className="w-3 h-3 text-red-600 animate-pulse" /> National Central Oversight
            </span>
            <span className="text-xs text-slate-300 font-mono">Ministry of Agriculture • NIC Central Telemetry Stream</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-emerald-400" />
            <span>National MSP Procurement Cross-Center Admin Dashboard</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Real-time aggregate oversight across all regional procurement centers (PPCs), multi-depot queue load-balancing, and direct PFMS DBT treasury settlement analytics.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-stretch sm:self-auto">
          <button
            onClick={() => setIsArchitectureModalOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-[#137547] hover:from-emerald-500 hover:to-emerald-600 text-white text-xs font-bold rounded-xl shadow transition flex items-center space-x-1.5 cursor-pointer border border-emerald-400/50"
          >
            <Server className="w-4 h-4 text-amber-300" />
            <span>System Topology & Telemetry</span>
          </button>
        </div>
      </div>

      {/* 2. Automated Overload & Congestion Alert Banner */}
      {metrics.hasOverload && (
        <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-3 animate-fadeIn">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-red-100 border border-red-300 flex items-center justify-center flex-shrink-0 text-red-700 font-black text-xs">
              ALERT
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-black uppercase text-red-900 bg-red-200 px-2 py-0.5 rounded">
                  Active Multi-Depot Congestion Alert
                </span>
                <span className="text-xs font-mono font-bold text-red-800">
                  {metrics.overloadedCenters.map(c => c.code).join(', ')} &ge; 80% Capacity
                </span>
              </div>
              <p className="text-xs text-red-900 mt-1">
                Rampur Central PPC is experiencing heavy inward queue (~60 mins wait). Kalyanpur Greenfield Buffer Depot (11 km) has 100% open weighbridge capacity.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-stretch md:self-auto flex-shrink-0">
            <button
              onClick={handleTriggerRebalance}
              disabled={isRebalanceTriggered}
              className={`px-4 py-2.5 text-xs font-black rounded-xl shadow transition flex items-center justify-center space-x-1.5 uppercase tracking-wide cursor-pointer ${
                isRebalanceTriggered
                  ? 'bg-emerald-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{isRebalanceTriggered ? 'Traffic Rebalance Dispatched ✓' : 'Auto-Rebalance to Buffer Center'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Cross-Center National Aggregate KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Quintals vs Target */}
        <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase">
            <span>Total Procured vs Target</span>
            <Scale className="w-4 h-4 text-[#0B2545]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#0B2545]">
              {metrics.totalProcuredQtl.toLocaleString('en-IN')}
            </span>
            <span className="text-xs font-bold text-slate-500">
              / {metrics.totalTargetQtl.toLocaleString('en-IN')} Qtl
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((metrics.totalProcuredQtl / Math.max(1, metrics.totalTargetQtl)) * 100))}%` }}
            />
          </div>
          <div className="text-[10px] text-slate-500 flex justify-between">
            <span>Overall Season Progress</span>
            <strong className="text-emerald-700 font-mono">
              {Math.min(100, Math.round((metrics.totalProcuredQtl / Math.max(1, metrics.totalTargetQtl)) * 100))}%
            </strong>
          </div>
        </div>

        {/* Metric 2: Active Vehicles in All Yards */}
        <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase">
            <span>Active Yard Vehicles</span>
            <Truck className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black font-mono text-[#137547]">
              {metrics.activeVehiclesInYards}
            </span>
            <span className="text-xs font-bold text-slate-500">Tractors in Holding</span>
          </div>
          <div className="text-xs text-slate-600 font-medium pt-1">
            Across 3 active PPC yards • Electronic queue maintained
          </div>
          <div className="text-[10px] text-slate-500 flex justify-between">
            <span>Avg Yard Turnaround</span>
            <strong className="text-[#0B2545] font-mono">32 Mins</strong>
          </div>
        </div>

        {/* Metric 3: Total PFMS DBT Disbursed */}
        <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase">
            <span>Direct PFMS DBT Payout</span>
            <CreditCard className="w-4 h-4 text-purple-700" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black font-mono text-purple-800">
              ₹{(metrics.totalDbtDisbursed / 100000).toFixed(2)} L
            </span>
          </div>
          <div className="text-xs text-slate-600 font-medium pt-1">
            100% Remitted via Aadhaar Payment Bridge (APBS)
          </div>
          <div className="text-[10px] text-slate-500 flex justify-between">
            <span>Treasury Settlement Rate</span>
            <strong className="text-emerald-700 font-mono">100.0%</strong>
          </div>
        </div>

        {/* Metric 4: Registered Farmers Handled */}
        <div className="bg-white p-4 rounded-xl border border-slate-300 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase">
            <span>Total Farmers Registered</span>
            <Users className="w-4 h-4 text-sky-700" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl sm:text-3xl font-black font-mono text-slate-900">
              {metrics.totalRegisteredFarmers}
            </span>
            <span className="text-xs font-bold text-slate-500">Farmers Active</span>
          </div>
          <div className="text-xs text-slate-600 font-medium pt-1">
            Authenticated via Land Khatauni ID
          </div>
          <div className="text-[10px] text-slate-500 flex justify-between">
            <span>SMS/WhatsApp Delivery</span>
            <strong className="text-emerald-700 font-mono">99.8%</strong>
          </div>
        </div>
      </div>

      {/* 4. Center-by-Center Comparative Matrix */}
      <div className="bg-white rounded-xl p-5 border border-slate-300 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b border-slate-200 gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#0B2545]" />
              <span>Multi-Depot Real-Time Operational Matrix</span>
            </h3>
            <p className="text-xs text-slate-500">
              Comparative capacity, weighbridge telemetry, and inward velocity across regional centers
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-600">District:</span>
            <select
              value={selectedFilterDistrict}
              onChange={(e) => setSelectedFilterDistrict(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded text-xs font-bold text-slate-900 focus:outline-none"
            >
              <option value="ALL">All Districts (UP Central)</option>
              <option value="Rampur">Rampur District</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-300 uppercase text-[10px] font-bold tracking-wider">
                <th className="py-2.5 px-3">Center Code</th>
                <th className="py-2.5 px-3">Procurement Depot Name</th>
                <th className="py-2.5 px-3">Nodal Agency</th>
                <th className="py-2.5 px-3 text-right">Daily Target</th>
                <th className="py-2.5 px-3 text-right">Booked Qtl</th>
                <th className="py-2.5 px-3 text-center">Load Status</th>
                <th className="py-2.5 px-3 text-center">Active Scales</th>
                <th className="py-2.5 px-3 text-right">Speed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {displayedCenters.map((c) => {
                const isOver = c.capacityPercentage >= 80;
                const isBuffer = c.id.includes('kalyanpur');

                return (
                  <tr key={c.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-3 font-mono font-bold text-[#0B2545]">{c.code}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">
                      <div>{getCenterName(c, language)}</div>
                      <div className="text-[10px] text-slate-500 font-normal">{c.district}, {c.state}</div>
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-semibold">{c.nodalAgency}</td>
                    <td className="py-3 px-3 text-right font-mono font-bold">{c.dailyTargetQtl} Qtl</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">{c.currentBookedQtl} Qtl</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isOver ? 'bg-red-100 text-red-900 border border-red-300' :
                        isBuffer ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        'bg-blue-100 text-blue-900 border border-blue-300'
                      }`}>
                        {c.capacityPercentage}% ({isOver ? 'CONGESTED' : isBuffer ? 'BUFFER OPEN' : 'NORMAL'})
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-slate-800">
                      {c.activeWeighbridges} / {c.totalWeighbridges} Scales
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700">
                      {c.hourlyThroughput} veh/hr
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Infrastructure Live Health Strip */}
      <div className="bg-[#07172C] text-slate-300 rounded-xl p-4 border border-slate-700 flex flex-wrap justify-between items-center gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold text-white uppercase text-[11px]">System Cluster Health:</span>
          <span className="text-slate-300">
            Nginx ALB (<strong>{systemTelemetry.loadBalancer.requestsPerSec} req/s</strong>) • App Nodes <strong>2/2 Healthy</strong> • PostgreSQL Replica Lag: <strong className="text-emerald-400 font-mono">{systemTelemetry.database.replicationLagMs} ms</strong>
          </span>
        </div>

        <button
          onClick={() => setIsArchitectureModalOpen(true)}
          className="text-amber-300 hover:text-amber-200 underline text-xs font-semibold"
        >
          View Full Enterprise Architecture &rarr;
        </button>
      </div>
    </div>
  );
};
