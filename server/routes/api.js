const express = require('express');
const router = express.Router();
const { calculateEstimatedWaitTime, getCrowdLevel } = require('../services/queueService');
const { recommendBestCenter } = require('../services/recommendationService');

// In-Memory Fallback Seed Database (for high-availability demo without requiring local MongoDB server)
let CENTERS_DB = [
  {
    id: 'ppc-rampur-01',
    code: 'PPC-UP-RAM-001',
    name: 'Rampur Procurement Center',
    district: 'Rampur',
    state: 'Uttar Pradesh',
    distanceKm: 2.4,
    dailyCapacityQtl: 3000,
    currentBookedQtl: 2550,
    capacityPercent: 85,
    activeWeighbridges: 2,
    avgWaitMinutes: 75,
    slots: [
      { slotId: 's1', timeWindow: '08:00 AM - 10:00 AM', maxCapacity: 20, bookedCount: 20 },
      { slotId: 's2', timeWindow: '10:00 AM - 12:00 PM', maxCapacity: 20, bookedCount: 18 },
      { slotId: 's3', timeWindow: '12:00 PM - 02:00 PM', maxCapacity: 20, bookedCount: 17 },
      { slotId: 's4', timeWindow: '02:00 PM - 04:00 PM', maxCapacity: 20, bookedCount: 12 },
      { slotId: 's5', timeWindow: '04:00 PM - 06:00 PM', maxCapacity: 20, bookedCount: 8 }
    ]
  },
  {
    id: 'ppc-bilaspur-02',
    code: 'PPC-UP-BIL-002',
    name: 'Bilaspur Procurement Center',
    district: 'Rampur',
    state: 'Uttar Pradesh',
    distanceKm: 5.1,
    dailyCapacityQtl: 2500,
    currentBookedQtl: 625,
    capacityPercent: 25,
    activeWeighbridges: 2,
    avgWaitMinutes: 15,
    slots: [
      { slotId: 'b1', timeWindow: '08:00 AM - 10:00 AM', maxCapacity: 20, bookedCount: 6 },
      { slotId: 'b2', timeWindow: '10:00 AM - 12:00 PM', maxCapacity: 20, bookedCount: 8 },
      { slotId: 'b3', timeWindow: '12:00 PM - 02:00 PM', maxCapacity: 20, bookedCount: 5 },
      { slotId: 'b4', timeWindow: '02:00 PM - 04:00 PM', maxCapacity: 20, bookedCount: 4 },
      { slotId: 'b5', timeWindow: '04:00 PM - 06:00 PM', maxCapacity: 20, bookedCount: 2 }
    ]
  },
  {
    id: 'ppc-kalyanpur-03',
    code: 'PPC-UP-KAL-003',
    name: 'Kalyanpur Buffer Depot',
    district: 'Rampur',
    state: 'Uttar Pradesh',
    distanceKm: 11.0,
    dailyCapacityQtl: 2000,
    currentBookedQtl: 300,
    capacityPercent: 15,
    activeWeighbridges: 2,
    avgWaitMinutes: 5,
    isBufferDepot: true,
    slots: [
      { slotId: 'k1', timeWindow: '08:00 AM - 10:00 AM', maxCapacity: 20, bookedCount: 2 },
      { slotId: 'k2', timeWindow: '10:00 AM - 12:00 PM', maxCapacity: 20, bookedCount: 3 },
      { slotId: 'k3', timeWindow: '12:00 PM - 02:00 PM', maxCapacity: 20, bookedCount: 2 },
      { slotId: 'k4', timeWindow: '02:00 PM - 04:00 PM', maxCapacity: 20, bookedCount: 1 },
      { slotId: 'k5', timeWindow: '04:00 PM - 06:00 PM', maxCapacity: 20, bookedCount: 1 }
    ]
  }
];

let BOOKINGS_DB = [
  {
    tokenNumber: 'KS-2026-1024',
    farmerName: 'Ramesh Kumar',
    farmerMobile: '+91 98765 43210',
    kisanId: 'UP-RAM-2024-88912',
    village: 'Dhamora',
    district: 'Rampur',
    centerId: 'ppc-bilaspur-02',
    centerName: 'Bilaspur Procurement Center',
    slotDate: '2026-09-08',
    slotWindow: '12:00 PM - 02:00 PM',
    commodity: 'Wheat',
    mspRate: 2425.0,
    maxAllowedMoisture: 12.0,
    estimatedQuantityQtl: 65.0,
    vehicleType: 'Tractor-Trolley',
    vehicleRegistration: 'UP 22 AB 4591',
    status: 'WAITING_IN_QUEUE',
    farmersAhead: 8,
    moisturePercentage: null,
    qcInspector: null,
    grossWeightQtl: null,
    tareWeightQtl: null,
    netWeightQtl: null,
    totalMspPayout: null,
    createdAt: new Date('2026-09-08T08:00:00Z'),
    checkedInAt: new Date('2026-09-08T11:45:00Z')
  },
  {
    tokenNumber: 'KS-2026-1016',
    farmerName: 'Baldev Yadav',
    farmerMobile: '+91 97590 99881',
    kisanId: 'UP-RAM-2024-65102',
    village: 'Chamraua',
    district: 'Rampur',
    centerId: 'ppc-bilaspur-02',
    centerName: 'Bilaspur Procurement Center',
    slotDate: '2026-09-08',
    slotWindow: '10:00 AM - 12:00 PM',
    commodity: 'Paddy',
    mspRate: 2320.0,
    maxAllowedMoisture: 17.0,
    estimatedQuantityQtl: 50.0,
    vehicleType: 'Tractor-Trolley',
    vehicleRegistration: 'UP 22 K 6140',
    status: 'WEIGHING',
    farmersAhead: 0,
    moisturePercentage: 15.2,
    qcInspector: 'Insp. R.S. Bisht',
    grossWeightQtl: 115.40,
    tareWeightQtl: 50.20,
    netWeightQtl: 65.20,
    totalMspPayout: 151264.0,
    createdAt: new Date('2026-09-08T07:30:00Z'),
    checkedInAt: new Date('2026-09-08T09:30:00Z')
  }
];

let NOTIFICATIONS_DB = [
  {
    id: 'notif-1',
    farmerMobile: '+91 98765 43210',
    tokenNumber: 'KS-2026-1024',
    category: 'PROCUREMENT',
    title: 'Slot Confirmed',
    message: 'Your slot is confirmed for Wheat at Bilaspur Procurement Center on 12:00 PM - 02:00 PM. Token: KS-2026-1024',
    channel: 'SMS & App',
    isRead: false,
    createdAt: new Date(Date.now() - 3600000)
  },
  {
    id: 'notif-2',
    farmerMobile: '+91 98765 43210',
    tokenNumber: 'KS-2026-1024',
    category: 'QUEUE',
    title: 'Queue Update',
    message: '8 farmers are ahead of you. Estimated waiting time is approximately 35 minutes.',
    channel: 'App',
    isRead: false,
    createdAt: new Date(Date.now() - 1200000)
  }
];

// --- 1. PROCUREMENT CENTERS & SMART RECOMMENDATION ---
router.get('/centers', (req, res) => {
  const enhanced = CENTERS_DB.map(c => {
    const crowd = getCrowdLevel(c.capacityPercent, c.avgWaitMinutes);
    const availableSlots = c.slots.reduce((acc, s) => acc + (s.maxCapacity - s.bookedCount), 0);
    return {
      ...c,
      crowdLevel: crowd.label,
      crowdColor: crowd.color,
      availableSlotsTotal: availableSlots
    };
  });
  res.json({ success: true, centers: enhanced });
});

router.get('/recommendation', (req, res) => {
  const { crop = 'Wheat', distance = 5 } = req.query;
  const recommendation = recommendBestCenter(CENTERS_DB, crop, Number(distance));
  res.json({ success: true, ...recommendation });
});

// --- 2. SLOT BOOKING & TOKENS ---
router.post('/bookings', (req, res) => {
  const {
    farmerName,
    farmerMobile,
    kisanId,
    village,
    district,
    centerId,
    slotId,
    slotDate,
    commodity,
    mspRate,
    maxAllowedMoisture,
    estimatedQuantityQtl,
    vehicleType,
    vehicleRegistration
  } = req.body;

  if (!farmerName || !farmerMobile || !centerId || !slotId) {
    return res.status(400).json({ success: false, message: 'Please provide all required booking fields.' });
  }

  const center = CENTERS_DB.find(c => c.id === centerId) || CENTERS_DB[0];
  const slot = center.slots.find(s => s.slotId === slotId) || center.slots[0];

  const tokenSuffix = Math.floor(1000 + Math.random() * 9000);
  const tokenNumber = `KS-2026-${tokenSuffix}`;

  const newBooking = {
    tokenNumber,
    farmerName,
    farmerMobile: farmerMobile.startsWith('+91') ? farmerMobile : `+91 ${farmerMobile}`,
    kisanId: kisanId || `UP-REG-${tokenSuffix}`,
    village: village || 'Local Panchayat',
    district: district || 'Rampur',
    centerId: center.id,
    centerName: center.name,
    slotDate: slotDate || new Date().toISOString().split('T')[0],
    slotWindow: slot.timeWindow,
    commodity: commodity || 'Wheat',
    mspRate: Number(mspRate) || 2425.0,
    maxAllowedMoisture: Number(maxAllowedMoisture) || 12.0,
    estimatedQuantityQtl: Number(estimatedQuantityQtl) || 50,
    vehicleType: vehicleType || 'Tractor-Trolley',
    vehicleRegistration: vehicleRegistration || 'UP 22 AB 1234',
    status: 'BOOKED',
    farmersAhead: Math.floor(Math.random() * 6) + 2,
    createdAt: new Date()
  };

  BOOKINGS_DB.unshift(newBooking);

  // Auto-generate slot confirmation notification
  NOTIFICATIONS_DB.unshift({
    id: `notif-${Date.now()}`,
    farmerMobile: newBooking.farmerMobile,
    tokenNumber: newBooking.tokenNumber,
    category: 'PROCUREMENT',
    title: 'Slot Confirmed',
    message: `Your slot is confirmed for ${newBooking.commodity} at ${center.name} on ${newBooking.slotWindow}. Token: ${tokenNumber}`,
    channel: 'SMS & App',
    isRead: false,
    createdAt: new Date()
  });

  // Emit Socket.IO event if io instance is attached
  const io = req.app.get('io');
  if (io) {
    io.emit('queue:update', { tokenNumber, event: 'BOOKED' });
  }

  res.status(201).json({ success: true, booking: newBooking });
});

router.get('/bookings/:tokenNumber', (req, res) => {
  const query = req.params.tokenNumber.trim().toLowerCase();
  const booking = BOOKINGS_DB.find(b => 
    b.tokenNumber.toLowerCase() === query || 
    b.farmerMobile.replace(/\s+/g, '').includes(query)
  );

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Procurement token record not found.' });
  }

  // Calculate dynamic wait time
  const waitMinutes = calculateEstimatedWaitTime(booking.farmersAhead, 7, 2, booking.vehicleType);

  res.json({ 
    success: true, 
    booking: {
      ...booking,
      estimatedWaitingMinutes: waitMinutes
    } 
  });
});

// --- 3. GATE CHECK-IN & STAKEHOLDER ACTIONS ---
router.post('/gate/checkin', (req, res) => {
  const { tokenNumber } = req.body;
  const booking = BOOKINGS_DB.find(b => b.tokenNumber.toLowerCase() === tokenNumber.trim().toLowerCase());
  
  if (!booking) {
    return res.status(404).json({ success: false, message: 'Invalid QR token or token not found.' });
  }

  booking.status = 'WAITING_IN_QUEUE';
  booking.checkedInAt = new Date();

  const io = req.app.get('io');
  if (io) {
    io.emit('queue:update', { tokenNumber: booking.tokenNumber, status: 'WAITING_IN_QUEUE' });
  }

  res.json({ success: true, message: `Farmer ${booking.farmerName} successfully checked in at security gate.`, booking });
});

// Quality Check Verification (Crop-specific moisture standard)
router.post('/officer/quality-check', (req, res) => {
  const { tokenNumber, moisturePercentage, inspectorName } = req.body;
  const booking = BOOKINGS_DB.find(b => b.tokenNumber.toLowerCase() === tokenNumber.trim().toLowerCase());

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Token not found.' });
  }

  const moisture = Number(moisturePercentage);
  const passed = moisture <= booking.maxAllowedMoisture;

  booking.moisturePercentage = moisture;
  booking.qcInspector = inspectorName || 'Procurement QC Inspector';
  booking.qcTimestamp = new Date();
  booking.status = passed ? 'QUALITY_PASSED' : 'QUALITY_FAILED';

  const io = req.app.get('io');
  if (io) {
    io.emit('queue:update', { tokenNumber: booking.tokenNumber, status: booking.status, qcPassed: passed });
  }

  res.json({
    success: true,
    passed,
    allowedMoisture: booking.maxAllowedMoisture,
    recordedMoisture: moisture,
    booking
  });
});

// Weighbridge Gross & Tare Processing
router.post('/weighbridge/record', (req, res) => {
  const { tokenNumber, grossWeightQtl, tareWeightQtl, operatorName } = req.body;
  const booking = BOOKINGS_DB.find(b => b.tokenNumber.toLowerCase() === tokenNumber.trim().toLowerCase());

  if (!booking) {
    return res.status(404).json({ success: false, message: 'Token not found.' });
  }

  const gross = Number(grossWeightQtl);
  const tare = Number(tareWeightQtl);
  const net = Math.max(0, gross - tare);
  const totalPayout = Math.round(net * booking.mspRate);

  booking.grossWeightQtl = gross;
  booking.tareWeightQtl = tare;
  booking.netWeightQtl = Number(net.toFixed(2));
  booking.totalMspPayout = totalPayout;
  booking.weighbridgeOperator = operatorName || 'Certified Scale Operator';
  booking.weighmentTimestamp = new Date();
  booking.status = 'PROCUREMENT_COMPLETED';
  booking.paymentReference = `PFMS-DBT-${Date.now().toString().slice(-8)}`;

  // Dispatch payment notification
  NOTIFICATIONS_DB.unshift({
    id: `notif-${Date.now()}`,
    farmerMobile: booking.farmerMobile,
    tokenNumber: booking.tokenNumber,
    category: 'PAYMENT',
    title: 'Payment Initiated',
    message: `Procurement complete for ${booking.netWeightQtl} Quintals. Payout of ₹${totalPayout.toLocaleString()} initiated via PFMS DBT. Ref: ${booking.paymentReference}`,
    channel: 'SMS & App',
    isRead: false,
    createdAt: new Date()
  });

  const io = req.app.get('io');
  if (io) {
    io.emit('queue:update', { tokenNumber: booking.tokenNumber, status: 'PROCUREMENT_COMPLETED' });
  }

  res.json({ success: true, message: 'Weighment recorded and J-Form procurement receipt issued.', booking });
});

// --- 4. NOTIFICATIONS API ---
router.get('/notifications', (req, res) => {
  const { category, mobile } = req.query;
  let results = NOTIFICATIONS_DB;

  if (category && category !== 'ALL') {
    results = results.filter(n => n.category === category);
  }
  if (mobile) {
    results = results.filter(n => n.farmerMobile.includes(mobile));
  }

  res.json({ success: true, notifications: results });
});

router.post('/notifications/test', (req, res) => {
  const { title, message, category = 'SYSTEM' } = req.body;
  const newNotif = {
    id: `notif-${Date.now()}`,
    farmerMobile: '+91 98765 43210',
    category,
    title: title || 'System Update',
    message: message || 'Mandi operations are running on schedule.',
    channel: 'In-App',
    isRead: false,
    createdAt: new Date()
  };
  NOTIFICATIONS_DB.unshift(newNotif);
  res.json({ success: true, notification: newNotif });
});

// --- 5. ADMIN AGGREGATE STATS ---
router.get('/admin/overview', (req, res) => {
  res.json({
    success: true,
    stats: {
      totalFarmersToday: 1245,
      totalProcurementQtl: 4250,
      avgWaitingTimeMinutes: 28,
      waitingTimeReductionPercent: 42,
      activeProcurementCenters: 18,
      systemStatus: 'Operational',
      beforeKisanSetu: {
        avgWaitHours: 5.0,
        slotBooking: 'None (Unorganized)',
        queueTransparency: 'Zero Visibility',
        congestion: 'Overcrowded Gate Jams'
      },
      afterKisanSetu: {
        avgWaitMinutes: 35,
        slotBooking: 'Guaranteed 2-Hour Window',
        queueTransparency: 'Live Token Stream',
        congestion: '42% Balanced via Buffer Depots'
      }
    }
  });
});

module.exports = router;
