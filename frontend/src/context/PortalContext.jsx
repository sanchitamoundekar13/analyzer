import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  INITIAL_TOKENS, 
  PROCUREMENT_CENTERS, 
  COMMODITIES, 
  VEHICLE_TYPES,
  SUPPORTED_LANGUAGES, 
  I18N_TRANSLATIONS 
} from '../data/constants';

const PortalContext = createContext();

const STORAGE_KEY_TOKENS = 'kisansetu_tokens_v1';
const STORAGE_KEY_CENTERS = 'kisansetu_centers_v1';
const STORAGE_KEY_OFFLINE_QUEUE = 'kisansetu_offline_queue_v1';
const STORAGE_KEY_LANGUAGE = 'kisansetu_lang_v1';
const STORAGE_KEY_NOTIFICATIONS = 'kisansetu_notifications_v1';
const CHANNEL_NAME = 'kisansetu_state_sync_channel';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'notif-1',
    type: 'LEAVE_HOME',
    title: '[Transit] Leave Home Reminder (समय पर प्रस्थान)',
    message: 'Your slot window (02:00 PM - 04:00 PM) at Rampur Central PPC begins in 45 minutes. Traffic is normal on NH-24.',
    timestamp: '10 mins ago',
    read: false,
    tokenNumber: 'KS-2026-RAM-0105',
    actionText: 'View Route & Pass'
  },
  {
    id: 'notif-2',
    type: 'CONGESTION_REROUTE',
    title: '[Advisory] Smart Reroute Suggestion (भीड़ परामर्श)',
    message: 'Rampur PPC has 85% capacity with ~60 mins yard wait. Divert to Kalyanpur Buffer Depot (11 km) to save 45 minutes.',
    timestamp: '25 mins ago',
    read: false,
    centerId: 'ppc-kalyanpur-03',
    actionText: 'Divert to Kalyanpur'
  },
  {
    id: 'notif-3',
    type: 'PAYMENT_DISBURSED',
    title: '[Payment] PFMS DBT Settlement Complete (खाते में भुगतान)',
    message: '₹1,51,264 successfully credited to Ramesh Chandra Verma (Aadhaar linked A/C) for Token KS-2026-RAM-0101.',
    timestamp: '1 hour ago',
    read: true,
    tokenNumber: 'KS-2026-RAM-0101',
    actionText: 'Download Voucher'
  }
];

export const PortalProvider = ({ children }) => {
  // Navigation & Localization
  const [activeRole, setActiveRole] = useState('farmer'); // 'farmer' | 'mandi_ops' | 'yard_display'
  const [farmerActiveView, setFarmerActiveView] = useState('book'); // 'book' | 'timeline' | 'queue' | 'calendar' | 'recommend'
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_LANGUAGE) || 'hi';
  });
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);
  const [selectedCenterId, setSelectedCenterId] = useState('ppc-rampur-01');
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Enterprise Infrastructure & Communication Gateway Telemetry State
  const [systemTelemetry, setSystemTelemetry] = useState({
    loadBalancer: {
      provider: 'Nginx / Cloud ALB (HA Cluster)',
      status: 'HEALTHY',
      tlsVersion: 'TLSv1.3 (National PKI / NIC Trust)',
      requestsPerSec: 2840,
      activeConnections: 1420,
      rateLimitBlockedIps: 4,
      avgLatencyMs: 6.8
    },
    appCluster: [
      { id: 'app-node-01', zone: 'NIC-Cloud-UP-West1', status: 'ONLINE', cpu: '22%', memory: '1.4 / 4 GB', role: 'Primary Leader' },
      { id: 'app-node-02', zone: 'NIC-Cloud-UP-West2', status: 'ONLINE', cpu: '19%', memory: '1.2 / 4 GB', role: 'Worker Replica' }
    ],
    gateways: {
      sms: {
        vendor: 'NIC Cloud SMS Gateway (DLT Certified)',
        status: 'OPERATIONAL',
        queueLatency: '1.1s',
        dailyDispatched: 18450,
        deliverySuccessRate: '99.8%'
      },
      whatsapp: {
        vendor: 'Meta WhatsApp Cloud API Gateway (v20.0)',
        status: 'OPERATIONAL',
        queueLatency: '380ms',
        dailyDispatched: 12600,
        deliverySuccessRate: '99.5%'
      }
    },
    database: {
      primary: 'PostgreSQL 16.2 Enterprise Master (Write/Transactions)',
      replica: 'PostgreSQL 16.2 Read Replica (Analytics & Yard Boards)',
      replicationType: 'WAL Streaming Replication (Synchronous)',
      replicationLagMs: 1.8,
      activePool: '46 / 120 Connections',
      transactionsPerSec: 320
    }
  });

  // Text-To-Speech (Audio Guidance for Farmers)
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Core Data
  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TOKENS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_TOKENS;
  });

  const [centers, setCenters] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CENTERS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return PROCUREMENT_CENTERS;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Offline Simulation State
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY_OFFLINE_QUEUE);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [];
  });

  // Active Modals & Selected items
  const [activePassToken, setActivePassToken] = useState(null);
  const [activeWhatsAppModal, setActiveWhatsAppModal] = useState(null); // { token, eventType }
  const [activeTimelineToken, setActiveTimelineToken] = useState(null);

  const setLanguage = (langCode) => {
    setLanguageState(langCode);
    localStorage.setItem(STORAGE_KEY_LANGUAGE, langCode);
  };

  // BroadcastChannel for instant cross-tab synchronization
  useEffect(() => {
    let broadcastChannel;
    try {
      broadcastChannel = new BroadcastChannel(CHANNEL_NAME);
      broadcastChannel.onmessage = (event) => {
        const { type, payload } = event.data;
        if (type === 'SYNC_STATE') {
          if (payload.tokens) setTokens(payload.tokens);
          if (payload.centers) setCenters(payload.centers);
          if (payload.notifications) setNotifications(payload.notifications);
        }
      };
    } catch (e) {
      console.warn('BroadcastChannel not supported in this environment:', e);
    }

    return () => {
      if (broadcastChannel) broadcastChannel.close();
    };
  }, []);

  // Save to LocalStorage and broadcast changes
  const broadcastSync = (newTokens, newCenters, newNotifs = notifications) => {
    try {
      const channel = new BroadcastChannel(CHANNEL_NAME);
      channel.postMessage({
        type: 'SYNC_STATE',
        payload: { tokens: newTokens, centers: newCenters, notifications: newNotifs }
      });
      channel.close();
    } catch (e) {
      // fallback
    }
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TOKENS, JSON.stringify(tokens));
  }, [tokens]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CENTERS, JSON.stringify(centers));
  }, [centers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_OFFLINE_QUEUE, JSON.stringify(offlineQueue));
  }, [offlineQueue]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Current Selected Center Object
  const currentCenter = centers.find(c => c.id === selectedCenterId) || centers[0];
  const t = I18N_TRANSLATIONS[language] || I18N_TRANSLATIONS.en;

  // Localized Helper Functions
  const getCommodityName = useCallback((commodityObjOrName, lang = language) => {
    if (!commodityObjOrName) return '';
    if (typeof commodityObjOrName === 'object') {
      if (commodityObjOrName.names && commodityObjOrName.names[lang]) {
        return commodityObjOrName.names[lang];
      }
      return commodityObjOrName.name || '';
    }
    const match = COMMODITIES.find(c => c.name === commodityObjOrName || c.id === commodityObjOrName);
    if (match && match.names && match.names[lang]) {
      return match.names[lang];
    }
    return commodityObjOrName;
  }, [language]);

  const getVehicleName = useCallback((vehicleObjOrName, lang = language) => {
    if (!vehicleObjOrName) return '';
    if (typeof vehicleObjOrName === 'object') {
      if (vehicleObjOrName.names && vehicleObjOrName.names[lang]) {
        return vehicleObjOrName.names[lang];
      }
      return vehicleObjOrName.name || '';
    }
    const match = VEHICLE_TYPES.find(v => v.name === vehicleObjOrName || v.id === vehicleObjOrName);
    if (match && match.names && match.names[lang]) {
      return match.names[lang];
    }
    return vehicleObjOrName;
  }, [language]);

  const getCenterName = useCallback((centerObjOrId, lang = language) => {
    if (!centerObjOrId) return '';
    if (typeof centerObjOrId === 'object') {
      if (centerObjOrId.names && centerObjOrId.names[lang]) {
        return centerObjOrId.names[lang];
      }
      return lang === 'hi' ? centerObjOrId.nameHindi || centerObjOrId.name : centerObjOrId.name;
    }
    const match = centers.find(c => c.id === centerObjOrId || c.code === centerObjOrId || c.name === centerObjOrId);
    if (match && match.names && match.names[lang]) {
      return match.names[lang];
    }
    return centerObjOrId;
  }, [centers, language]);

  // Text-To-Speech (Voice Guidance Assistant)
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const speakText = (textToSpeak, langCode = language) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported on this browser.');
      return;
    }
    window.speechSynthesis.cancel();

    const langMeta = SUPPORTED_LANGUAGES.find(l => l.code === langCode) || SUPPORTED_LANGUAGES[0];
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = langMeta.bcp47;
    utterance.rate = 0.9;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Smart Notification Dispatcher
  const dispatchSmartNotification = (newNotif) => {
    const formatted = {
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
      ...newNotif
    };
    const updated = [formatted, ...notifications];
    setNotifications(updated);
    broadcastSync(tokens, centers, updated);
  };

  const markAllNotificationsAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
  };

  // 1. Live Queue & Wait Time Prediction Algorithm
  const calculatePredictedWaitTime = useCallback((targetCenterId = selectedCenterId, vehicleType = 'tractor') => {
    const targetCenter = centers.find(c => c.id === targetCenterId) || currentCenter;
    const yardVehicles = tokens.filter(t => (t.centerId === targetCenter.id || t.centerName === targetCenter.name) && t.status === 'WAITING_IN_YARD');
    const scalesCount = Math.max(1, targetCenter.activeWeighbridges || 2);
    
    // Vehicle handling factor in minutes
    const loadFactor = vehicleType.includes('Tractor') ? 3.5 : vehicleType.includes('Mini') ? 2.5 : vehicleType.includes('Heavy') ? 5.5 : 2.0;
    const baseMinutes = Math.round((yardVehicles.length * loadFactor) / scalesCount);
    
    // Minimum 5 mins if there are vehicles, or zero if empty
    const waitTime = yardVehicles.length === 0 ? 0 : Math.max(5, baseMinutes);
    const queuePos = yardVehicles.length + 1;
    
    return {
      waitTimeMinutes: waitTime,
      queuePosition: queuePos,
      yardCount: yardVehicles.length,
      activeScales: scalesCount,
      velocityPerHr: targetCenter.hourlyThroughput || 18,
      status: waitTime > 60 ? 'HIGH' : waitTime > 30 ? 'MODERATE' : 'OPTIMAL'
    };
  }, [centers, currentCenter, selectedCenterId, tokens]);

  // 2. Smart Center Recommendation Engine
  const recommendBestCenter = useCallback((farmerVillage = 'Dhamora', cropName = 'Paddy (Grade A)', qty = 50) => {
    // Evaluation scores based on: Distance (30%), Wait Time (50%), Quota Availability (20%)
    const evaluated = centers.map(c => {
      const waitData = calculatePredictedWaitTime(c.id, 'tractor');
      const isBuffer = c.id.includes('kalyanpur');
      const isBilaspur = c.id.includes('bilaspur');
      
      const distanceKm = isBuffer ? 11 : isBilaspur ? 18 : 6;
      const travelTimeMins = Math.round(distanceKm * 2.5); // avg speed 25 km/h
      const totalTimeMins = travelTimeMins + waitData.waitTimeMinutes;
      const capacityLeftQtl = Math.max(0, c.dailyTargetQtl - c.currentBookedQtl);

      // Score: lower total time is better
      let score = 100 - (totalTimeMins * 0.7) + (capacityLeftQtl / 50);
      if (c.capacityPercentage >= 80) score -= 30; // heavy penalty for congested main yard

      return {
        ...c,
        distanceKm,
        travelTimeMins,
        waitData,
        totalTimeMins,
        capacityLeftQtl,
        score: Math.round(score),
        isRecommended: isBuffer // Buffer PPC has zero wait time advantage
      };
    });

    evaluated.sort((a, b) => b.score - a.score);
    return evaluated;
  }, [centers, calculatePredictedWaitTime]);

  // 1. Farmer Action: Book Slot
  const bookSlot = (formData) => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix = formData.centerId.includes('bilaspur') ? 'BIL' : formData.centerId.includes('kalyanpur') ? 'KAL' : 'RAM';
    const tokenNumber = `KS-2026-${prefix}-${randomSuffix}`;

    const matchedCommodity = COMMODITIES.find(c => c.name === formData.commodity) || COMMODITIES[0];
    const centerObj = centers.find(c => c.id === formData.centerId) || centers[0];

    const newToken = {
      id: `tok-${Date.now()}`,
      tokenNumber,
      farmerName: formData.farmerName,
      farmerMobile: formData.farmerMobile,
      kisanRegId: formData.kisanRegId,
      village: formData.village,
      district: formData.district || centerObj.district,
      state: formData.state || 'Uttar Pradesh',
      centerId: formData.centerId,
      centerName: centerObj.name,
      slotId: formData.slotId,
      slotWindow: formData.slotWindow,
      slotDate: formData.slotDate || selectedCalendarDate,
      commodity: formData.commodity,
      mspRate: matchedCommodity.mspRate,
      estimatedQuantityQtl: parseFloat(formData.estimatedQuantityQtl) || 50,
      vehicleType: formData.vehicleType,
      vehicleRegistration: formData.vehicleRegistration.toUpperCase(),
      status: 'BOOKED',
      moisturePercentage: null,
      qcResult: 'PENDING',
      grossWeightQtl: null,
      tareWeightQtl: null,
      netWeightQtl: null,
      totalMspPayout: null,
      createdAt: new Date().toISOString()
    };

    // Update slot booking count in center
    const updatedCenters = centers.map(c => {
      if (c.id === formData.centerId) {
        const updatedSlots = c.slots.map(s => {
          if (s.id === formData.slotId) {
            const nextBooked = Math.min(s.maxCapacity, s.booked + 1);
            return {
              ...s,
              booked: nextBooked,
              available: Math.max(0, s.maxCapacity - nextBooked),
              status: nextBooked >= s.maxCapacity ? 'FULL' : (s.maxCapacity - nextBooked <= 3 ? 'LIMITED' : 'AVAILABLE')
            };
          }
          return s;
        });
        const nextCenterBooked = c.currentBookedQtl + (parseFloat(formData.estimatedQuantityQtl) || 50);
        return {
          ...c,
          slots: updatedSlots,
          currentBookedQtl: nextCenterBooked,
          capacityPercentage: Math.min(100, Math.round((nextCenterBooked / c.dailyTargetQtl) * 100))
        };
      }
      return c;
    });

    const updatedTokens = [newToken, ...tokens];

    if (isOffline) {
      setOfflineQueue(prev => [...prev, { action: 'BOOK_SLOT', payload: newToken, timestamp: new Date().toISOString() }]);
    }

    setTokens(updatedTokens);
    setCenters(updatedCenters);

    // Automated smart arrival notification for the farmer
    dispatchSmartNotification({
      type: 'LEAVE_HOME',
      title: `[Slot Confirmed] ${tokenNumber}`,
      message: `Dear ${formData.farmerName}, your arrival slot is booked for ${newToken.slotWindow} at ${centerObj.name}. Leave 30 mins early.`,
      tokenNumber
    });

    broadcastSync(updatedTokens, updatedCenters);

    // Auto-open gate pass modal & set active timeline
    setActivePassToken(newToken);
    setActiveTimelineToken(newToken);
    return newToken;
  };

  // 2. Mandi Terminal: Gate Check-in
  const checkInToken = (tokenNumber) => {
    let checkedToken = null;
    const updatedTokens = tokens.map(t => {
      if (t.tokenNumber.toLowerCase() === tokenNumber.toLowerCase()) {
        checkedToken = {
          ...t,
          status: 'WAITING_IN_YARD',
          checkedInAt: new Date().toISOString()
        };
        return checkedToken;
      }
      return t;
    });

    if (isOffline) {
      setOfflineQueue(prev => [...prev, { action: 'CHECK_IN', tokenNumber, timestamp: new Date().toISOString() }]);
    }

    setTokens(updatedTokens);

    if (checkedToken) {
      dispatchSmartNotification({
        type: 'QUEUE_UPDATE',
        title: `[Yard Check-In] ${tokenNumber}`,
        message: `${checkedToken.farmerName} entered holding yard. Electronic queue order assigned.`,
        tokenNumber
      });
    }

    broadcastSync(updatedTokens, centers);
  };

  // 3. Mandi Terminal: QC Moisture update
  const updateMoisture = (tokenNumber, moisture) => {
    const parsedMoist = parseFloat(moisture);
    const updatedTokens = tokens.map(t => {
      if (t.tokenNumber.toLowerCase() === tokenNumber.toLowerCase()) {
        const isPassed = parsedMoist <= 17.0;
        return {
          ...t,
          moisturePercentage: parsedMoist,
          qcResult: isPassed ? 'PASSED' : 'HIGH_MOISTURE',
          status: isPassed && (t.status === 'BOOKED' || t.status === 'CHECKED_IN') ? 'WAITING_IN_YARD' : t.status,
          qcTestedAt: new Date().toISOString()
        };
      }
      return t;
    });

    if (isOffline) {
      setOfflineQueue(prev => [...prev, { action: 'QC_UPDATE', tokenNumber, moisture: parsedMoist, timestamp: new Date().toISOString() }]);
    }

    setTokens(updatedTokens);
    broadcastSync(updatedTokens, centers);
  };

  // 4. Mandi Terminal: Call to Weighbridge Desk
  const callToWeighbridge = (tokenNumber) => {
    let calledToken = null;
    const updatedTokens = tokens.map(t => {
      if (t.tokenNumber.toLowerCase() === tokenNumber.toLowerCase()) {
        calledToken = {
          ...t,
          status: 'AT_WEIGHBRIDGE',
          calledToWeighbridgeAt: new Date().toISOString()
        };
        return calledToken;
      }
      return t;
    });

    if (isOffline) {
      setOfflineQueue(prev => [...prev, { action: 'CALL_TO_WEIGHBRIDGE', tokenNumber, timestamp: new Date().toISOString() }]);
    }

    setTokens(updatedTokens);

    if (calledToken) {
      dispatchSmartNotification({
        type: 'TURN_APPROACHING',
        title: `[Turn Calling] ${tokenNumber}`,
        message: `Calling ${calledToken.farmerName} (Vehicle ${calledToken.vehicleRegistration}) to Weighbridge Terminal #01 now!`,
        tokenNumber
      });
      speakText(`Calling ${calledToken.farmerName} to weighbridge terminal 1 now.`, language);
    }

    broadcastSync(updatedTokens, centers);
  };

  // 5. Mandi Terminal: Record Weighbridge Data & Complete Procurement
  const completeWeighment = (tokenNumber, grossWeight, tareWeight) => {
    const g = parseFloat(grossWeight) || 0;
    const tr = parseFloat(tareWeight) || 0;
    const net = Math.max(0, g - tr);

    let completedToken = null;

    const updatedTokens = tokens.map(t => {
      if (t.tokenNumber.toLowerCase() === tokenNumber.toLowerCase()) {
        const totalPayout = Math.round(net * t.mspRate);
        const updated = {
          ...t,
          grossWeightQtl: g,
          tareWeightQtl: tr,
          netWeightQtl: parseFloat(net.toFixed(2)),
          totalMspPayout: totalPayout,
          status: 'COMPLETED',
          completedAt: new Date().toISOString(),
          pfmsRefId: `PFMS-2026-DBT-${Math.floor(100000 + Math.random() * 900000)}`
        };
        completedToken = updated;
        return updated;
      }
      return t;
    });

    if (isOffline) {
      setOfflineQueue(prev => [...prev, { action: 'WEIGHMENT_COMPLETE', tokenNumber, grossWeight: g, tareWeight: tr, timestamp: new Date().toISOString() }]);
    }

    setTokens(updatedTokens);

    if (completedToken) {
      dispatchSmartNotification({
        type: 'PAYMENT_DISBURSED',
        title: `[Payment Settled] ${tokenNumber}`,
        message: `₹${(completedToken.totalMspPayout || 0).toLocaleString('en-IN')} remitted via PFMS DBT for ${completedToken.farmerName}. Ref: ${completedToken.pfmsRefId}`,
        tokenNumber
      });
    }

    broadcastSync(updatedTokens, centers);
    return completedToken;
  };

  // 6. Offline Mode Toggle & Auto-Sync
  const toggleOfflineMode = () => {
    if (isOffline) {
      setIsOffline(false);
      if (offlineQueue.length > 0) {
        console.log(`[Offline Sync] Successfully synchronized ${offlineQueue.length} pending actions with server.`);
        setOfflineQueue([]);
      }
    } else {
      setIsOffline(true);
    }
  };

  // 7. National Cross-Center Aggregate Telemetry Calculator
  const getCrossCenterMetrics = useCallback(() => {
    const totalTarget = centers.reduce((acc, c) => acc + (c.dailyTargetQtl || 0), 0);
    const totalBooked = centers.reduce((acc, c) => acc + (c.currentBookedQtl || 0), 0);
    const totalProcuredQtl = tokens
      .filter(t => t.status === 'COMPLETED')
      .reduce((acc, t) => acc + (t.netWeightQtl || t.estimatedQuantityQtl || 0), 0);
    const totalDbtDisbursed = tokens
      .filter(t => t.status === 'COMPLETED')
      .reduce((acc, t) => acc + (t.totalMspPayout || (t.netWeightQtl || t.estimatedQuantityQtl || 0) * (t.mspRate || 2320)), 0);
    
    const activeVehiclesInYards = tokens.filter(t => t.status === 'WAITING_IN_YARD' || t.status === 'AT_WEIGHBRIDGE').length;
    const totalRegisteredFarmers = tokens.length;
    
    // Check if any center is overloaded (>80% booked or wait time > 60m)
    const overloadedCenters = centers.filter(c => c.capacityPercentage >= 80);
    const hasOverload = overloadedCenters.length > 0;

    return {
      totalTargetQtl: totalTarget,
      totalBookedQtl: totalBooked,
      totalProcuredQtl: Math.round(totalProcuredQtl),
      totalDbtDisbursed: Math.round(totalDbtDisbursed),
      activeVehiclesInYards,
      totalRegisteredFarmers,
      aggregateCapacityPercent: Math.round((totalBooked / Math.max(1, totalTarget)) * 100),
      overloadedCenters,
      hasOverload
    };
  }, [centers, tokens]);

  // 8. Cross-Center Smart Load Rebalancing Command
  const triggerCrossCenterRebalance = useCallback((sourceCenterId = 'ppc-rampur-01', targetCenterId = 'ppc-kalyanpur-03') => {
    const sourceCenter = centers.find(c => c.id === sourceCenterId);
    const targetCenter = centers.find(c => c.id === targetCenterId);

    // Notify farmers and Mandi operators
    dispatchSmartNotification({
      type: 'CONGESTION_REROUTE',
      title: '[Traffic Balancer] Load Rebalanced',
      message: `Automatic diversion active: 30% inward traffic from congested ${sourceCenter?.name || 'Rampur PPC'} routed to ${targetCenter?.name || 'Kalyanpur Buffer Depot'} (11 km, Nil waiting).`,
      centerId: targetCenterId
    });

    // Update telemetry rate-limiting/load count
    setSystemTelemetry(prev => ({
      ...prev,
      loadBalancer: {
        ...prev.loadBalancer,
        requestsPerSec: prev.loadBalancer.requestsPerSec + 150
      }
    }));
  }, [centers]);

  return (
    <PortalContext.Provider
      value={{
        activeRole,
        setActiveRole,
        farmerActiveView,
        setFarmerActiveView,
        language,
        setLanguage,
        isLanguageModalOpen,
        setIsLanguageModalOpen,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        isArchitectureModalOpen,
        setIsArchitectureModalOpen,
        systemTelemetry,
        getCrossCenterMetrics,
        triggerCrossCenterRebalance,
        notifications,
        dispatchSmartNotification,
        markAllNotificationsAsRead,
        selectedCalendarDate,
        setSelectedCalendarDate,
        activeTimelineToken,
        setActiveTimelineToken,
        calculatePredictedWaitTime,
        recommendBestCenter,
        SUPPORTED_LANGUAGES,
        selectedCenterId,
        setSelectedCenterId,
        currentCenter,
        centers,
        tokens,
        isOffline,
        offlineQueue,
        toggleOfflineMode,
        activePassToken,
        setActivePassToken,
        activeWhatsAppModal,
        setActiveWhatsAppModal,
        bookSlot,
        checkInToken,
        updateMoisture,
        callToWeighbridge,
        completeWeighment,
        getCommodityName,
        getVehicleName,
        getCenterName,
        speakText,
        stopSpeaking,
        isSpeaking,
        t
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
