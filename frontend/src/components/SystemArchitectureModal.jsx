import React from 'react';
import { usePortal } from '../context/PortalContext';
import { 
  X, 
  Server, 
  Database, 
  ShieldCheck, 
  Smartphone, 
  MessageSquare, 
  Globe, 
  Cpu, 
  Activity, 
  ArrowDown, 
  ArrowRight,
  CheckCircle2,
  Zap,
  Radio
} from 'lucide-react';

export const SystemArchitectureModal = () => {
  const { 
    isArchitectureModalOpen, 
    setIsArchitectureModalOpen, 
    systemTelemetry 
  } = usePortal();

  if (!isArchitectureModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl shadow-2xl max-w-5xl w-full text-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#07172C] px-6 py-4 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-400 text-emerald-400 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase text-slate-950 bg-amber-400 px-2 py-0.5 rounded">
                  Enterprise GovTech Stack
                </span>
                <span className="text-xs text-slate-400 font-mono">NIC Cloud • High Availability</span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                KisanSetu Multi-Tier Infrastructure & Communication Gateway Topology
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsArchitectureModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body: Multi-Tier Diagram */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Tier 1: 4 Client Surfaces */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <span>Tier 1: Client Surfaces (4 Unified Micro-Apps)</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <div className="text-xs font-black text-emerald-400 uppercase">SURFACE 1</div>
                <div className="text-xs font-bold text-white mt-1">1. Farmer Portal</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Self-service slot booking, queue forecast & E-Gate pass</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <div className="text-xs font-black text-emerald-400 uppercase">SURFACE 2</div>
                <div className="text-xs font-bold text-white mt-1">2. Gate Kiosk</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Optical QR scanner & 1-tap rapid yard check-in</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <div className="text-xs font-black text-emerald-400 uppercase">SURFACE 3</div>
                <div className="text-xs font-bold text-white mt-1">3. Mandi Terminal</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Agmark QC moisture testing, weighbridge gross/tare</p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl">
                <div className="text-xs font-black text-emerald-400 uppercase">SURFACE 4</div>
                <div className="text-xs font-bold text-white mt-1">4. Admin Oversight</div>
                <p className="text-[10px] text-slate-400 mt-0.5">National cross-center aggregate metrics & overload rebalancing</p>
              </div>
            </div>
          </div>

          <div className="text-center text-slate-500 text-xs flex items-center justify-center space-x-2">
            <ArrowDown className="w-4 h-4 animate-bounce text-emerald-400" />
            <span className="font-mono text-[11px]">Encrypted HTTPS / WSS API Requests</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-emerald-400" />
          </div>

          {/* Tier 2: Load Balancer & Reverse Proxy */}
          <div className="bg-slate-800 border-2 border-emerald-500/40 p-4 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center space-x-2">
                <Globe className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Tier 2: Load Balancer & Edge Security</h3>
                  <span className="text-[10px] text-slate-400 font-mono">{systemTelemetry.loadBalancer.provider}</span>
                </div>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                STATUS: {systemTelemetry.loadBalancer.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700">
                <span className="text-slate-400 text-[10px] block">Throughput</span>
                <strong className="text-white">{systemTelemetry.loadBalancer.requestsPerSec} Req/sec</strong>
              </div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700">
                <span className="text-slate-400 text-[10px] block">TLS Protocol</span>
                <strong className="text-emerald-400">{systemTelemetry.loadBalancer.tlsVersion}</strong>
              </div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700">
                <span className="text-slate-400 text-[10px] block">IP Rate Limiter</span>
                <strong className="text-amber-400">{systemTelemetry.loadBalancer.rateLimitBlockedIps} IPs Throttle</strong>
              </div>
              <div className="bg-slate-900/80 p-2 rounded border border-slate-700">
                <span className="text-slate-400 text-[10px] block">Edge Latency</span>
                <strong className="text-white">{systemTelemetry.loadBalancer.avgLatencyMs} ms</strong>
              </div>
            </div>
          </div>

          {/* Tier 3: App Server Cluster & Gateways */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* App Cluster */}
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-3">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-sky-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Tier 3: App Server Cluster</h3>
                  <span className="text-[10px] text-slate-400">Node.js / Express Core Logic</span>
                </div>
              </div>

              <div className="space-y-2">
                {systemTelemetry.appCluster.map(node => (
                  <div key={node.id} className="bg-slate-900 p-2.5 rounded border border-slate-700 flex justify-between items-center text-xs">
                    <div>
                      <div className="font-mono font-bold text-white">{node.id}</div>
                      <div className="text-[10px] text-slate-400">{node.zone} • {node.role}</div>
                    </div>
                    <div className="text-right font-mono text-[11px]">
                      <div className="text-emerald-400">{node.status}</div>
                      <div className="text-slate-400">CPU: {node.cpu}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Communication Gateways */}
            <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-3">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Communication Gateways</h3>
                  <span className="text-[10px] text-slate-400">SMS & WhatsApp Cloud APIs</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-slate-900 p-2.5 rounded border border-slate-700 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-purple-300">✉️ {systemTelemetry.gateways.sms.vendor}</span>
                    <span className="text-emerald-400 font-mono text-[10px]">{systemTelemetry.gateways.sms.status}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Queue: {systemTelemetry.gateways.sms.queueLatency}</span>
                    <span>Delivered: {systemTelemetry.gateways.sms.dailyDispatched.toLocaleString()} (99.8%)</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-2.5 rounded border border-slate-700 space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-emerald-300">{systemTelemetry.gateways.whatsapp.vendor}</span>
                    <span className="text-emerald-400 font-mono text-[10px]">{systemTelemetry.gateways.whatsapp.status}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Latency: {systemTelemetry.gateways.whatsapp.queueLatency}</span>
                    <span>Delivered: {systemTelemetry.gateways.whatsapp.dailyDispatched.toLocaleString()} (99.5%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 4: Database Master / Read Replica Cluster */}
          <div className="bg-slate-800 border-2 border-blue-500/40 p-4 rounded-xl space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-blue-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Tier 4: Relational Database Cluster (PostgreSQL 16.2)</h3>
                  <span className="text-[10px] text-slate-400">ACID Transactional Ledger for Tokens, Weighments & DBT</span>
                </div>
              </div>
              <span className="bg-blue-500/20 text-blue-300 border border-blue-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                SYNC REPLICATION: {systemTelemetry.database.replicationLagMs}ms LAG
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase">Primary Write Master</span>
                <div className="text-sm font-bold text-white">{systemTelemetry.database.primary}</div>
                <p className="text-[10px] text-slate-400">Handles token creation, Agmark moisture records, weighments, PFMS remittances.</p>
                <div className="text-[10px] font-mono text-slate-300 pt-1">Pool: {systemTelemetry.database.activePool} • {systemTelemetry.database.transactionsPerSec} TPS</div>
              </div>

              <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 space-y-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Read Replica (Streaming)</span>
                <div className="text-sm font-bold text-white">{systemTelemetry.database.replica}</div>
                <p className="text-[10px] text-slate-400">Offloads public LED display queries, Admin cross-center dashboards, and analytics.</p>
                <div className="text-[10px] font-mono text-emerald-400 pt-1">WAL Streaming Lag: {systemTelemetry.database.replicationLagMs} ms</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#07172C] px-6 py-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>National Informatics Centre (NIC) High-Security Enterprise Standard</span>
          <button
            onClick={() => setIsArchitectureModalOpen(false)}
            className="px-4 py-1.5 bg-[#0B2545] hover:bg-[#133B6B] text-white font-bold rounded-lg border border-slate-600 transition"
          >
            Close Diagram
          </button>
        </div>
      </div>
    </div>
  );
};
