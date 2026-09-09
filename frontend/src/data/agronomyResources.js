// BigHaat.com Agronomy & Market Intelligence Knowledge Base
// Knowledge Partner Attribution: BigHaat (India's Leading Digital Agri-Tech Platform - bighaat.com)

export const BIGHAAT_CROP_DOCTOR_DB = [
  {
    id: 'paddy-blast',
    crop: 'Paddy (Grade A)',
    cropHindi: 'धान (ग्रेड-ए)',
    diseaseName: 'Paddy Blast (झुलसा रोग / ब्लास्ट)',
    category: 'Fungal Disease',
    severity: 'High (Causes 30-50% grain discoloration & rejection)',
    symptoms: 'Spindle-shaped or eye-shaped lesions on leaves with greyish centers and dark brown borders; rotten neck phase causes white/chaffy grains.',
    causes: 'High humidity (>90%), night temperatures 20-25°C, excessive nitrogen application without potash balance.',
    organicRemedy: 'Foliar spray of Pseudomonas fluorescens @ 10g/L or Neem oil (10,000 ppm) @ 2ml/L.',
    chemicalTreatment: 'Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L at early tillering and panicle emergence.',
    withholdingDays: 14,
    mandiImpact: 'Infected grains lead to high Agmark QC rejection at Mandi gate due to discolored chaff.'
  },
  {
    id: 'paddy-stem-borer',
    crop: 'Paddy (Grade A)',
    cropHindi: 'धान (ग्रेड-ए)',
    diseaseName: 'Yellow Stem Borer (तना छेदक / सुंडी)',
    category: 'Insect Pest',
    severity: 'Medium-High',
    symptoms: 'Dead hearts in vegetative stage and white ears/panicles at maturity with hollow stems.',
    causes: 'Continuous stagnant water, warm humid climate, late transplantation.',
    organicRemedy: 'Install Pheromone Traps @ 5 traps/acre with Scirpophaga incertulas lures; release Trichogramma japonicum egg parasitoids.',
    chemicalTreatment: 'Apply Cartap Hydrochloride 4% GR @ 7.5 kg/acre or Chlorantraniliprole 18.5% SC @ 0.4 ml/L water.',
    withholdingDays: 21,
    mandiImpact: 'Hollow grains decrease net quintal weight on certified electronic weighbridges.'
  },
  {
    id: 'wheat-rust',
    crop: 'Wheat (Sharbati / Grade I)',
    cropHindi: 'गेहूं (शरबती / ग्रेड-१)',
    diseaseName: 'Yellow & Brown Rust (पीला व भूरा रतुआ)',
    category: 'Fungal Disease',
    severity: 'High',
    symptoms: 'Yellow/orange pustules arranged in linear stripes on leaves, shedding yellow powder when touched.',
    causes: 'Prolonged winter fog, high relative humidity, temperatures between 10-20°C.',
    organicRemedy: 'Spray Cow urine (10%) fermented with neem leaves or Trichoderma viride @ 5g/L.',
    chemicalTreatment: 'Foliar spray of Propiconazole 25% EC @ 1 ml/L or Tebuconazole 25.9% EC @ 1 ml/L water immediately upon first symptom.',
    withholdingDays: 20,
    mandiImpact: 'Shriveled grains lower test weight and grade classification at Mandi Agmark desk.'
  },
  {
    id: 'mustard-aphids',
    crop: 'Mustard (Standard AGMARK)',
    cropHindi: 'सरसों (मानक एगमार्क)',
    diseaseName: 'Mustard Aphid / Chepa (माहू / चेंपा कीट)',
    category: 'Sucking Pest',
    severity: 'High (Up to 40% oil reduction)',
    symptoms: 'Tiny green/brown insects clustering on tender shoots, flowers, and pods, sucking sap and secreting sticky honeydew.',
    causes: 'Cloudy, overcast weather with high humidity and mild temperatures in Jan-Feb.',
    organicRemedy: 'Spray 5% Neem Seed Kernel Extract (NSKE) or Verticillium lecanii @ 5g/L; install Yellow Sticky Traps @ 10/acre.',
    chemicalTreatment: 'Spray Dimethoate 30% EC @ 1.7 ml/L or Thiamethoxam 25% WG @ 0.4g/L water.',
    withholdingDays: 15,
    mandiImpact: 'Drastically reduces oil content percentage, leading to deduction in final MSP value.'
  },
  {
    id: 'gram-pod-borer',
    crop: 'Gram (Chana / Desi)',
    cropHindi: 'चना (देसी)',
    diseaseName: 'Gram Pod Borer / Helicoverpa (चना फली छेदक)',
    category: 'Caterpillar Pest',
    severity: 'High',
    symptoms: 'Circular holes bored into young pods with hollowed out seeds and defoliated tender shoots.',
    causes: 'Intermittent rains followed by warm dry spells during flowering and pod development.',
    organicRemedy: 'Spray HaNPV (Helicoverpa Nuclear Polyhedrosis Virus) @ 100 LE/acre + install Bird Perches @ 15/acre.',
    chemicalTreatment: 'Spray Emamectin Benzoate 5% SG @ 0.4g/L or Indoxacarb 14.5% SC @ 1 ml/L water.',
    withholdingDays: 14,
    mandiImpact: 'Bored grains counted as FAQ defects, causing QC moisture and grading deductions.'
  }
];

export const BIGHAAT_MANDI_BHAV_COMPARISON = [
  {
    commodity: 'Paddy (Grade A)',
    commodityHindi: 'धान (ग्रेड-ए)',
    govMspRate: 2320,
    localApmcRate: 2040,
    traderSpotRate: 1980,
    differencePerQtl: 280,
    extraEarning50Qtl: 14000,
    fciProcurementStatus: 'Active Procurement (100% PFMS DBT)',
    trend: 'MSP Higher by +13.7%',
    primaryMandi: 'Rampur Mandi Samiti'
  },
  {
    commodity: 'Paddy (Common)',
    commodityHindi: 'धान (सामान्य)',
    govMspRate: 2300,
    localApmcRate: 2020,
    traderSpotRate: 1950,
    differencePerQtl: 280,
    extraEarning50Qtl: 14000,
    fciProcurementStatus: 'Active Procurement (100% PFMS DBT)',
    trend: 'MSP Higher by +13.8%',
    primaryMandi: 'Bilaspur Mandi'
  },
  {
    commodity: 'Wheat (Sharbati / Grade I)',
    commodityHindi: 'गेहूं (शरबती / ग्रेड-१)',
    govMspRate: 2425,
    localApmcRate: 2280,
    traderSpotRate: 2220,
    differencePerQtl: 145,
    extraEarning50Qtl: 7250,
    fciProcurementStatus: 'Rabi Window Active',
    trend: 'MSP Higher by +6.3%',
    primaryMandi: 'Milak APMC'
  },
  {
    commodity: 'Mustard (Standard AGMARK)',
    commodityHindi: 'सरसों (मानक एगमार्क)',
    govMspRate: 5650,
    localApmcRate: 5120,
    traderSpotRate: 4950,
    differencePerQtl: 530,
    extraEarning50Qtl: 26500,
    fciProcurementStatus: 'NAFED Procurement Open',
    trend: 'MSP Higher by +10.3%',
    primaryMandi: 'Bareilly Grain Mandi'
  },
  {
    commodity: 'Gram (Chana / Desi)',
    commodityHindi: 'चना (देसी)',
    govMspRate: 5440,
    localApmcRate: 4980,
    traderSpotRate: 4850,
    differencePerQtl: 460,
    extraEarning50Qtl: 23000,
    fciProcurementStatus: 'NAFED Direct Purchase',
    trend: 'MSP Higher by +9.2%',
    primaryMandi: 'Aligarh APMC'
  }
];

export const BIGHAAT_FERTILIZER_RECOMMENDATIONS = {
  'Paddy (Grade A)': {
    seedRateKgPerAcre: 15,
    ureaBagsPerAcre: 2.5, // 45kg bag
    dapBagsPerAcre: 1.0, // 50kg bag
    mopBagsPerAcre: 0.8, // 50kg bag
    zincKgPerAcre: 10,
    organicCompostTons: 2.0,
    schedule: [
      { stage: 'Basal (बुवाई / रोपाई के समय)', items: '100% DAP (50kg) + 100% MOP (40kg) + 33% Urea (35kg) + 10kg Zinc' },
      { stage: 'Tillering (कल्ले फूटते समय - 25 दिन)', items: '33% Urea (35kg) + Biozyme Micronutrient granules' },
      { stage: 'Panicle Emergence (बालियां निकलते समय - 45 दिन)', items: '34% Urea (35kg) top-dressing + 0:0:50 foliar spray' }
    ]
  },
  'Wheat (Sharbati / Grade I)': {
    seedRateKgPerAcre: 40,
    ureaBagsPerAcre: 2.7,
    dapBagsPerAcre: 1.2,
    mopBagsPerAcre: 0.6,
    zincKgPerAcre: 8,
    organicCompostTons: 2.5,
    schedule: [
      { stage: 'Basal (बुवाई पूर्व)', items: '100% DAP (60kg) + 100% MOP (30kg) + 33% Urea (40kg) + 8kg Zinc' },
      { stage: 'CRI Stage (पहली सिंचाई / 21 दिन)', items: '33% Urea (40kg)' },
      { stage: 'Jointing (गांठ बनते समय / 45 दिन)', items: '34% Urea (40kg) + 19:19:19 foliar spray' }
    ]
  },
  'Mustard (Standard AGMARK)': {
    seedRateKgPerAcre: 2.0,
    ureaBagsPerAcre: 1.8,
    dapBagsPerAcre: 0.8,
    mopBagsPerAcre: 0.5,
    zincKgPerAcre: 10,
    organicCompostTons: 1.5,
    schedule: [
      { stage: 'Basal (बुवाई पूर्व)', items: '100% DAP (40kg) + 100% MOP (25kg) + 50% Urea (35kg) + 10kg Bentonite Sulphur' },
      { stage: 'First Flowering (फूल आने पर - 30 दिन)', items: '50% Urea (35kg) + Boron 20% foliar spray (1g/L)' }
    ]
  },
  'Gram (Chana / Desi)': {
    seedRateKgPerAcre: 30,
    ureaBagsPerAcre: 0.5,
    dapBagsPerAcre: 1.0,
    mopBagsPerAcre: 0.4,
    zincKgPerAcre: 5,
    organicCompostTons: 1.5,
    schedule: [
      { stage: 'Basal (बुवाई पूर्व)', items: '100% DAP (50kg) + 100% MOP (20kg) + Rhizobium seed inoculant' },
      { stage: 'Pod Formation (फली बनते समय)', items: '0:52:34 Foliar spray @ 10g/L water' }
    ]
  }
};

export const BIGHAAT_MOISTURE_CURING_GUIDE = [
  {
    step: 1,
    title: 'Sun Drying on High-Density Polythene Tarpaulin (तिरपाल पर धूप सुखाना)',
    desc: 'Spread threshed paddy/wheat grains in a 5-7 cm thin layer on clean tarpaulin sheets. Rake the grain layer every 2 hours under direct sunlight for 2 consecutive sunny days.',
    targetMoisture: 'Drops moisture from 22% down to 15.5%'
  },
  {
    step: 2,
    title: 'Winnower & Mechanical Cleaning (भूसी व कंकड़ की सफाई)',
    desc: 'Pass grain through a mechanical winnower or fan blower to remove chaff, immature discolored kernels, and foreign dust particles to meet FAQ Grade-I purity.',
    targetMoisture: 'Eliminates damp chaff that falsely spikes electronic moisture meters'
  },
  {
    step: 3,
    title: 'Hand-Held Moisture Meter Verification (नमी मीटर पूर्व जांच)',
    desc: 'Take 3 random samples from top, middle, and bottom bags using a probe. Verify that average moisture reading is strictly below 17.0% before loading vehicle.',
    targetMoisture: 'Target 14.5% - 16.5% for 100% instant QC pass at Mandi gate'
  },
  {
    step: 4,
    title: 'Storage in Clean, Moisture-Free Gunny Bags (नई जूट बोरियों में पैकिंग)',
    desc: 'Pack dried grain in new 50kg FCI-certified jute bags. Keep stacked on wooden pallets 15 cm above ground to prevent moisture absorption from soil.',
    targetMoisture: 'Prevents condensation during overnight tractor transit'
  }
];
