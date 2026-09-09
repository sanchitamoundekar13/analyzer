/**
 * Centralized i18n translation configuration for KisanSetu.
 * Supports English, Hindi, and Marathi with 100% semantic keys and zero emojis.
 */

export const TRANSLATIONS = {
  en: {
    portalName: 'KisanSetu',
    tagline: 'Intelligent Procurement Slot and Queue Management System',
    subTitle: 'Reducing farmer waiting time through intelligent slot allocation and real-time procurement queue management',
    namaste: 'Namaste',
    welcomeBack: 'Welcome to your procurement portal',
    tollFree: 'Toll-Free Kisan Helpdesk',
    
    // Navigation
    navDashboard: 'Dashboard',
    navBookSlot: 'Book Slot',
    navLiveQueue: 'Live Queue',
    navCenters: 'Procurement Centers',
    navMyProcurement: 'My Procurement',
    navNotifications: 'Notifications',
    navAdditionalServices: 'Additional Farmer Services',
    
    // Roles
    roleFarmer: 'Farmer',
    roleOfficer: 'Procurement Officer',
    roleGate: 'Gate Operator',
    roleWeighbridge: 'Weighbridge Operator',
    roleAdmin: 'Administrator',
    roleDisplayBoard: 'Public Display Board',
    
    // Dashboard Cards
    todaysProcurement: "Today's Procurement",
    yourSlot: 'Your Slot Window',
    liveQueueStatus: 'Live Queue Status',
    farmersAhead: 'Farmers Ahead',
    estimatedWaitTime: 'Estimated Waiting Time',
    currentStatus: 'Current Status',
    trackLiveQueue: 'Track Live Queue',
    viewDetails: 'View Procurement Details',
    navigateCenter: 'Navigate to Center',
    
    // Booking Form Steps
    step1Title: 'Select Crop',
    step2Title: 'Estimated Quantity',
    step3Title: 'Vehicle Type',
    step4Title: 'Procurement Center',
    step5Title: 'Available Slots',
    step6Title: 'Confirm Booking',
    
    cropLabel: 'Crop Commodity',
    quantityLabel: 'Harvest Volume (Quintals)',
    vehicleLabel: 'Vehicle Registration',
    confirmBookingBtn: 'Confirm & Generate Digital QR Token',
    
    // Smart Recommendation
    recommendedForYou: 'RECOMMENDED FOR YOU',
    bestProcurementCenter: 'Best Procurement Center',
    recommendedSlot: 'Recommended Slot',
    bookRecommendedSlot: 'Book Recommended Slot',
    
    // Queue
    currentlyServing: 'Currently Serving',
    yourToken: 'Your Token',
    lowCrowd: 'Low Crowd',
    moderateCrowd: 'Moderate Crowd',
    highCrowd: 'High Crowd',
    
    // Lifecycle Steps
    stepSlotBooked: 'Slot Booked',
    stepArrived: 'Arrived at Center',
    stepQueue: 'Waiting in Queue',
    stepQuality: 'Quality Check',
    stepWeighing: 'Weighbridge Weighment',
    stepCompleted: 'Procurement Completed',
    stepPaymentInitiated: 'Payment Initiated',
    stepPaymentReceived: 'Payment Received via DBT',
    
    // Impact
    beforeTitle: 'Before KisanSetu',
    afterTitle: 'After KisanSetu',
    
    // Offline
    offlineBanner: 'Internet Disconnected - Your data is safely stored locally. Actions will sync automatically when internet returns.'
  },
  
  hi: {
    portalName: 'किसान सेतु',
    tagline: 'बुद्धिमान उपार्जन स्लॉट एवं कतार प्रबंधन प्रणाली',
    subTitle: 'सटीक स्लॉट आवंटन और वास्तविक समय कतार प्रबंधन द्वारा किसानों के प्रतीक्षा समय को न्यूनतम करना',
    namaste: 'नमस्ते',
    welcomeBack: 'आपके उपार्जन पोर्टल में स्वागत है',
    tollFree: 'निशुल्क किसान हेल्पलाइन',
    
    navDashboard: 'डैशबोर्ड',
    navBookSlot: 'स्लॉट बुक करें',
    navLiveQueue: 'लाइव कतार',
    navCenters: 'क्रय केंद्र',
    navMyProcurement: 'मेरा उपार्जन',
    navNotifications: 'सूचनाएं',
    navAdditionalServices: 'अतिरिक्त किसान सेवाएं',
    
    roleFarmer: 'किसान',
    roleOfficer: 'क्रय अधिकारी',
    roleGate: 'गेट ऑपरेटर',
    roleWeighbridge: 'धर्मकांटा ऑपरेटर',
    roleAdmin: 'प्रशासक',
    roleDisplayBoard: 'सार्वजनिक डिस्प्ले बोर्ड',
    
    todaysProcurement: 'आज का उपार्जन',
    yourSlot: 'आपका स्लॉट समय',
    liveQueueStatus: 'लाइव कतार स्थिति',
    farmersAhead: 'आगे किसान',
    estimatedWaitTime: 'अनुमानित प्रतीक्षा समय',
    currentStatus: 'वर्तमान स्थिति',
    trackLiveQueue: 'लाइव कतार ट्रैक करें',
    viewDetails: 'उपार्जन विवरण देखें',
    navigateCenter: 'केंद्र का रास्ता देखें',
    
    step1Title: 'फसल चुनें',
    step2Title: 'अनुमानित मात्रा',
    step3Title: 'वाहन प्रकार',
    step4Title: 'क्रय केंद्र चुनें',
    step5Title: 'उपलब्ध स्लॉट',
    step6Title: 'बुकिंग की पुष्टि',
    
    cropLabel: 'फसल',
    quantityLabel: 'उपज मात्रा (क्विंटल)',
    vehicleLabel: 'वाहन पंजीकरण संख्या',
    confirmBookingBtn: 'पुष्टि करें और डिजिटल क्यूआर टोकन प्राप्त करें',
    
    recommendedForYou: 'आपके लिए अनुशंसित',
    bestProcurementCenter: 'सर्वोत्तम क्रय केंद्र',
    recommendedSlot: 'सुझाया गया स्लॉट',
    bookRecommendedSlot: 'अनुशंसित स्लॉट बुक करें',
    
    currentlyServing: 'वर्तमान में तौल जारी',
    yourToken: 'आपका टोकन',
    lowCrowd: 'कम भीड़',
    moderateCrowd: 'मध्यम भीड़',
    highCrowd: 'अधिक भीड़',
    
    stepSlotBooked: 'स्लॉट बुक हुआ',
    stepArrived: 'केंद्र पर आगमन',
    stepQueue: 'कतार में प्रतीक्षारत',
    stepQuality: 'गुणवत्ता परीक्षण',
    stepWeighing: 'धर्मकांटा तौल',
    stepCompleted: 'उपार्जन पूर्ण',
    stepPaymentInitiated: 'भुगतान प्रेषित',
    stepPaymentReceived: 'डीबीटी खाते में प्राप्त',
    
    beforeTitle: 'किसान सेतु से पहले',
    afterTitle: 'किसान सेतु के बाद',
    
    offlineBanner: 'इंटरनेट संपर्क नहीं है - आपका विवरण सुरक्षित संग्रहित है। इंटरनेट आने पर स्वतः सिंक हो जाएगा।'
  },
  
  mr: {
    portalName: 'किसान सेतू',
    tagline: 'बुद्धिमान खरेदी स्लॉट आणि रांग व्यवस्थापन प्रणाली',
    subTitle: 'अचूक स्लॉट वाटप आणि थेट रांग व्यवस्थापनाद्वारे शेतकऱ्यांचा प्रतीक्षा वेळ कमी करणे',
    namaste: 'नमस्कार',
    welcomeBack: 'आपल्या खरेदी पोर्टलवर स्वागत आहे',
    tollFree: 'टोल-फ्री किसान हेल्पलाइन',
    
    navDashboard: 'डॅशबोर्ड',
    navBookSlot: 'स्लॉट बुक करा',
    navLiveQueue: 'थेट रांग',
    navCenters: 'खरेदी केंद्र',
    navMyProcurement: 'माझी खरेदी',
    navNotifications: 'सूचना',
    navAdditionalServices: 'अतिरिक्त शेतकरी सेवा',
    
    roleFarmer: 'शेतकरी',
    roleOfficer: 'खरेदी अधिकारी',
    roleGate: 'गेट ऑपरेटर',
    roleWeighbridge: 'वजनकाटा ऑपरेटर',
    roleAdmin: 'प्रशासक',
    roleDisplayBoard: 'सार्वजनिक डिस्प्ले बोर्ड',
    
    todaysProcurement: 'आजची खरेदी',
    yourSlot: 'आपली स्लॉट वेळ',
    liveQueueStatus: 'थेट रांग स्थिती',
    farmersAhead: 'पुढील शेतकरी',
    estimatedWaitTime: 'अंदाजे प्रतीक्षा वेळ',
    currentStatus: 'सद्यस्थिती',
    trackLiveQueue: 'थेट रांग ट्रॅक करा',
    viewDetails: 'खरेदी तपशील पहा',
    navigateCenter: 'केंद्राकडे जा',
    
    step1Title: 'पीक निवडा',
    step2Title: 'अंदाजे प्रमाण',
    step3Title: 'वाहन प्रकार',
    step4Title: 'खरेदी केंद्र निवडा',
    step5Title: 'उपलब्ध स्लॉट',
    step6Title: 'बुकिंग निश्चित करा',
    
    cropLabel: 'पीक',
    quantityLabel: 'उत्पादन प्रमाण (क्विंटल)',
    vehicleLabel: 'वाहन नोंदणी क्रमांक',
    confirmBookingBtn: 'निश्चित करा आणि डिजिटल क्यूआर टोकन मिळवा',
    
    recommendedForYou: 'आपल्यासाठी शिफारस केलेले',
    bestProcurementCenter: 'उत्कृष्ट खरेदी केंद्र',
    recommendedSlot: 'शिफारस केलेला स्लॉट',
    bookRecommendedSlot: 'शिफारस केलेला स्लॉट बुक करा',
    
    currentlyServing: 'सध्या वजन सुरू',
    yourToken: 'आपला टोकन',
    lowCrowd: 'कमी गर्दी',
    moderateCrowd: 'मध्यम गर्दी',
    highCrowd: 'जास्त गर्दी',
    
    stepSlotBooked: 'स्लॉट बुक झाला',
    stepArrived: 'केंद्रावर आगमन',
    stepQueue: 'रांगेत प्रतीक्षेत',
    stepQuality: 'गुणवत्ता तपासणी',
    stepWeighing: 'काटा वजन',
    stepCompleted: 'खरेदी पूर्ण',
    stepPaymentInitiated: 'पेमेंट पाठवले',
    stepPaymentReceived: 'डीबीटी खात्यात जमा',
    
    beforeTitle: 'किसान सेतू पूर्वी',
    afterTitle: 'किसान सेतू नंतर',
    
    offlineBanner: 'इंटरनेट जोडणी उपलब्ध नाही - आपला डेटा सुरक्षित साठवला आहे. इंटरनेट पूर्ववत झाल्यावर आपोआप सिंक होईल.'
  }
};
