/* ════════════════════════════════════════════
   MukhBODHITA — app.js
   Full 12-language translations + all features
   ════════════════════════════════════════════ */

// ═══════════════════════════════════════════
// 1.  THEME MANAGEMENT
// ═══════════════════════════════════════════
function getTheme() { return localStorage.getItem('mb-theme') || 'dark'; }

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = t === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('mb-theme', t);
}

function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  showToast(next === 'light' ? '☀️ Light mode on' : '🌙 Dark mode on', 'info');
}

applyTheme(getTheme());   // apply on load before anything renders

// ═══════════════════════════════════════════
// 2.  TRANSLATIONS  (12 languages, every key)
// ═══════════════════════════════════════════
const T = {

  /* ── ENGLISH ── */
  en: {
    nav_how:"How It Works", nav_tech:"Technology", nav_demo:"Live Demo",
    nav_modes:"Modes", nav_signin:"Sign In", nav_getstarted:"Get Started",
    badge_text:"🇮🇳 Proudly Built for India · WHO-Aligned Early Screening",
    hero_t1:"Detect Oral Cancer", hero_t2:"97% Accuracy. ₹350 Device.",
    hero_sub:"MukhBODHITA combines VOC gas sensing, bio-impedance tissue scanning, and offline Edge-AI to deliver hospital-grade oral cancer screening anywhere — no internet, no clinic needed.",
    stat_acc:"AI Accuracy", stat_cost:"Device Cost", stat_offline:"Offline AI", stat_lang:"Languages",
    btn_started:"Get Started Free", btn_demo:"▶ Watch Live Demo",
    trust_abdm:"✓ ABDM Compliant", trust_nhm:"✓ NHM Ready",
    trust_who:"✓ WHO Guidelines", trust_offline:"✓ Zero Internet Required",
    fb_voc:"VOC Gas", fb_normal:"Normal", fb_bio:"Bio-Impedance", fb_stable:"Stable", fb_edge:"Edge AI",
    acc_label:"Accuracy", scroll_text:"Scroll to explore",
    band_cases:"New Cases/Year in India", band_late:"Detected in Late Stage",
    band_acc:"MukhBODHITA Accuracy", band_surv:"Better Survival if Caught Early", band_asha:"ASHA Workers Nationwide",
    how_tag:"The Science", how_title:"Two-Step Multimodal Detection",
    how_sub:"MukhBODHITA performs two simultaneous non-invasive physical tests, fused by edge AI into a single Oral Wellness Score.",
    step1_title:"VOC Gas Sniff Test",
    step1_desc:"Patient exhales through a disposable straw. The MQ-135 sensor detects acetone & ketone volatile organic compounds — chemical biomarkers released by early tumor metabolism.",
    step1_sim:"Live Comparison", sim_h:"Healthy Air", sim_c:"Tumor Signal",
    step2_title:"Bio-Impedance Tissue Scan",
    step2_desc:"The copper probe wand touches oral tissue. Healthy cells block micro-current (high resistance). Cancerous ulcers have ruptured membranes that allow current to pass freely (low resistance).",
    step2_sim:"Resistance Comparison", res_h:"Healthy", res_c:"Tumor",
    fusion_title:"Late-Fusion Edge AI",
    fusion_desc:"Both signals are weighted and fused entirely offline on the ESP32 into a single Oral Wellness Score (0–100). No cloud. No internet. Works anywhere in India.",
    fusion_acc:"97% Validated Accuracy",
    tech_tag:"Hardware", tech_title:"Built With Accessible Components",
    tech_sub:"Every component is off-the-shelf, affordable, and field-proven for rural Indian conditions.",
    tc_esp:"The AI brain — collects multimodal sensor data, runs offline ML threshold mapping, and streams results via Bluetooth Low Energy.",
    tc_mq:"Electronic nose mounted in a 3D-printed PVC chamber. Reads VOC biomarkers from exhaled breath via a ₹1 disposable straw.",
    tc_dht:"Monitors ambient temperature & humidity to strip environmental interference, keeping gas readings accurate across all climates.",
    tc_probe:"Pen-style wand with two copper foil strips 2mm apart, wired via 10kΩ resistors into the ESP32 ADC to measure tissue resistance.",
    tc_ai:"Late-fusion ML model trained on 10,000+ data points. Runs entirely on-device with 97% validated accuracy — zero cloud dependency.",
    tc_app:"Three adaptive modes (ASHA / Home / Hospital) with offline sync, 12 Indian language support, and ABDM QR referral code generation.",
    demo_tag:"Interactive Demo", demo_title:"Try MukhBODHITA Live",
    demo_sub:"Simulate a real screening session by selecting a sample type below and pressing Scan.",
    sample_sel:"Select Sample",
    sc_h_title:"Healthy Sample", sc_h_desc:"Warm water cotton ball · Raw dry potato",
    sc_c_title:"Risk-Simulating Sample", sc_c_desc:"Acetone cotton ball · Hot saltwater potato",
    scan_btn:"START SCAN", scan_ready:"Select a sample and press START",
    graph_title:"Live Sensor Feed", leg_voc:"VOC Gas (PPM)", leg_bio:"Bio-Impedance (kΩ)",
    ring_lbl:"Wellness", rd_voc:"VOC Reading", rd_temp:"Temperature",
    rd_bio:"Bio-Impedance", rd_verdict:"AI Verdict",
    modes_tag:"Platform", modes_title:"One Device. Three Powerful Modes.",
    modes_sub:"MukhBODHITA's app adapts its entire interface depending on who is using it — from remote ASHA workers to hospital OPD terminals.",
    mode_asha_name:"ASHA Worker Mode", mode_asha_sub:"Rural Door-to-Door Screening",
    af1:"✦ Large color-coded buttons", af2:"✦ Hindi & regional voice alerts",
    af3:"✦ Full offline data sync", af4:"✦ Village-level patient tracking", af5:"✦ Zero internet required",
    asha_cta:"Get Access →",
    popular:"Most Popular",
    mode_home_name:"Home Citizen Mode", mode_home_sub:"Self-Screening Anytime",
    hf1:"✦ Simple Wellness Score 0–100", hf2:"✦ Camera ulcer photo review",
    hf3:"✦ AI image classification", hf4:"✦ Personal risk history", hf5:"✦ Smart referral suggestions",
    home_cta:"Start Free →",
    mode_hosp_name:"Hospital OPD Mode", mode_hosp_sub:"Clinical Triage Terminal",
    hosp_f1:"✦ Calibrated PPM curves", hosp_f2:"✦ Bio-impedance phase angles",
    hosp_f3:"✦ ABDM / EMR report export", hosp_f4:"✦ QR biopsy referral code", hosp_f5:"✦ Regional cancer institute routing",
    hosp_cta:"Request Access →",
    cta_title:"Ready to Save Lives?", cta_btn:"Create Free Account", cta_learn:"Learn More",
    cta_sub:"Join thousands of healthcare workers already using MukhBODHITA across India.",
    footer_tagline:"AI-powered oral cancer screening with 97% accuracy. Bringing early detection to every corner of India.",
    footer_langs:"Available in 12 languages:",
    fl_product:"Product", fl_how:"How It Works", fl_tech:"Technology", fl_demo:"Live Demo", fl_modes:"Platform Modes",
    fl_compliance:"Compliance", fl_abdm:"ABDM Integration", fl_ayushman:"Ayushman Bharat",
    fl_nhm:"NHM Partnership", fl_who:"WHO Aligned",
    fl_company:"Company", fl_about:"About Us", fl_research:"Research", fl_privacy:"Privacy Policy", fl_contact:"Contact",
    footer_copy:"© 2026 MukhBODHITA · AI-Powered Oral Cancer Screening for India",
    footer_disclaimer:"For screening purposes only. Not a substitute for clinical diagnosis.",
    voice_title:"🔊 Voice Alert System", voice_desc:"Select a language to broadcast a health alert:",
    modal_close:"Close",
    verdict_ok:"✅ Low Risk", verdict_bad:"⚠️ Refer Immediately",
    alert_ok_title:"✅ Low Risk — Appears Healthy",
    alert_ok_msg:"VOC levels and bio-impedance readings are within normal range. No immediate concern. Schedule routine screening in 6 months.",
    alert_bad_title:"⚠️ High Risk — Immediate Referral Required",
    alert_bad_msg:"Elevated VOC biomarkers and significantly reduced bio-impedance detected. Patterns consistent with early-stage malignancy. Refer to nearest cancer institute immediately.",
  },

  /* ── HINDI ── */
  hi: {
    nav_how:"यह कैसे काम करता है", nav_tech:"तकनीक", nav_demo:"लाइव डेमो",
    nav_modes:"मोड्स", nav_signin:"साइन इन", nav_getstarted:"शुरू करें",
    badge_text:"🇮🇳 भारत के लिए गर्व से निर्मित · WHO-अनुरूप जल्दी जांच",
    hero_t1:"मुँह के कैंसर का पता लगाएं", hero_t2:"97% सटीकता। ₹350 डिवाइस।",
    hero_sub:"MukhBODHITA VOC गैस सेंसिंग, बायो-इम्पेडेंस स्कैनिंग और ऑफलाइन Edge-AI को जोड़कर बिना इंटरनेट के अस्पताल-स्तरीय कैंसर जांच प्रदान करता है।",
    stat_acc:"AI सटीकता", stat_cost:"डिवाइस लागत", stat_offline:"ऑफलाइन AI", stat_lang:"भाषाएं",
    btn_started:"मुफ्त में शुरू करें", btn_demo:"▶ लाइव डेमो देखें",
    trust_abdm:"✓ ABDM अनुपालित", trust_nhm:"✓ NHM तैयार",
    trust_who:"✓ WHO दिशानिर्देश", trust_offline:"✓ बिना इंटरनेट के",
    fb_voc:"VOC गैस", fb_normal:"सामान्य", fb_bio:"बायो-इम्पेडेंस", fb_stable:"स्थिर", fb_edge:"Edge AI",
    acc_label:"सटीकता", scroll_text:"एक्सप्लोर करने के लिए स्क्रॉल करें",
    band_cases:"भारत में प्रति वर्ष नए मामले", band_late:"अंतिम चरण में पकड़े गए",
    band_acc:"MukhBODHITA सटीकता", band_surv:"जल्दी पकड़ने पर बेहतर जीवन", band_asha:"राष्ट्रव्यापी ASHA कार्यकर्ता",
    how_tag:"विज्ञान", how_title:"दो-चरण मल्टीमोडल डिटेक्शन",
    how_sub:"MukhBODHITA एक साथ दो नॉन-इनवेसिव परीक्षण करता है, एक ओरल वेलनेस स्कोर में फ्यूज करता है।",
    step1_title:"VOC गैस स्निफ टेस्ट",
    step1_desc:"मरीज डिस्पोजेबल स्ट्रॉ में सांस छोड़ता है। MQ-135 सेंसर एसीटोन और कीटोन VOC बायोमार्कर का पता लगाता है।",
    step1_sim:"लाइव तुलना", sim_h:"स्वस्थ हवा", sim_c:"ट्यूमर संकेत",
    step2_title:"बायो-इम्पेडेंस टिश्यू स्कैन",
    step2_desc:"कॉपर प्रोब वैंड मौखिक ऊतक को स्पर्श करता है। स्वस्थ कोशिकाएं माइक्रो-करंट को ब्लॉक करती हैं।",
    step2_sim:"प्रतिरोध तुलना", res_h:"स्वस्थ", res_c:"ट्यूमर",
    fusion_title:"लेट-फ्यूजन Edge AI",
    fusion_desc:"दोनों संकेतों को ESP32 पर ऑफलाइन एकल ओरल वेलनेस स्कोर (0–100) में फ्यूज किया जाता है। कोई क्लाउड नहीं।",
    fusion_acc:"97% सत्यापित सटीकता",
    tech_tag:"हार्डवेयर", tech_title:"सुलभ घटकों से निर्मित",
    tech_sub:"हर घटक सस्ता और ग्रामीण भारतीय परिस्थितियों के लिए उपयुक्त है।",
    tc_esp:"AI मस्तिष्क — मल्टीमोडल सेंसर डेटा एकत्र करता है, ऑफलाइन ML थ्रेशोल्ड मैपिंग चलाता है।",
    tc_mq:"3D-प्रिंटेड PVC ट्यूब चेंबर में इलेक्ट्रॉनिक नाक। सांस से VOC बायोमार्कर पढ़ता है।",
    tc_dht:"परिवेश तापमान और आर्द्रता को लगातार ट्रैक करता है।",
    tc_probe:"पेन-स्टाइल वैंड जिसमें 2mm अलग दो कॉपर फॉयल स्ट्रिप्स हैं।",
    tc_ai:"10,000+ डेटा पॉइंट पर प्रशिक्षित लेट-फ्यूजन ML मॉडल। 97% सटीकता।",
    tc_app:"तीन अनुकूली मोड (ASHA / घर / अस्पताल) ऑफलाइन सिंक के साथ।",
    demo_tag:"इंटरेक्टिव डेमो", demo_title:"MukhBODHITA को लाइव आज़माएं",
    demo_sub:"नीचे एक नमूना प्रकार चुनें और स्कैन दबाएं।",
    sample_sel:"नमूना चुनें",
    sc_h_title:"स्वस्थ नमूना", sc_h_desc:"गर्म पानी की रूई · कच्चा सूखा आलू",
    sc_c_title:"जोखिम-अनुकरण नमूना", sc_c_desc:"एसीटोन रूई · गर्म नमक-पानी आलू",
    scan_btn:"स्कैन शुरू करें", scan_ready:"नमूना चुनें और START दबाएं",
    graph_title:"लाइव सेंसर फीड", leg_voc:"VOC गैस (PPM)", leg_bio:"बायो-इम्पेडेंस (kΩ)",
    ring_lbl:"वेलनेस", rd_voc:"VOC रीडिंग", rd_temp:"तापमान",
    rd_bio:"बायो-इम्पेडेंस", rd_verdict:"AI निर्णय",
    modes_tag:"प्लेटफॉर्म", modes_title:"एक डिवाइस। तीन शक्तिशाली मोड।",
    modes_sub:"MukhBODHITA का ऐप उपयोगकर्ता के आधार पर पूरा इंटरफेस बदलता है।",
    mode_asha_name:"ASHA कार्यकर्ता मोड", mode_asha_sub:"ग्रामीण घर-घर जांच",
    af1:"✦ बड़े कलर-कोडेड बटन", af2:"✦ हिंदी और क्षेत्रीय वॉयस अलर्ट",
    af3:"✦ पूर्ण ऑफलाइन डेटा सिंक", af4:"✦ ग्राम-स्तरीय रोगी ट्रैकिंग", af5:"✦ बिना इंटरनेट के काम करता है",
    asha_cta:"एक्सेस लें →",
    popular:"सबसे लोकप्रिय",
    mode_home_name:"होम सिटिजन मोड", mode_home_sub:"कभी भी स्व-जांच",
    hf1:"✦ सरल वेलनेस स्कोर 0–100", hf2:"✦ कैमरा अल्सर फोटो समीक्षा",
    hf3:"✦ AI छवि वर्गीकरण", hf4:"✦ व्यक्तिगत जोखिम इतिहास", hf5:"✦ स्मार्ट रेफरल सुझाव",
    home_cta:"मुफ्त में शुरू करें →",
    mode_hosp_name:"अस्पताल OPD मोड", mode_hosp_sub:"क्लिनिकल ट्राइज टर्मिनल",
    hosp_f1:"✦ कैलिब्रेटेड PPM वक्र", hosp_f2:"✦ बायो-इम्पेडेंस चरण कोण",
    hosp_f3:"✦ ABDM / EMR रिपोर्ट निर्यात", hosp_f4:"✦ QR बायोप्सी रेफरल कोड", hosp_f5:"✦ क्षेत्रीय कैंसर संस्थान रूटिंग",
    hosp_cta:"एक्सेस अनुरोध करें →",
    cta_title:"जीवन बचाने के लिए तैयार हैं?", cta_btn:"मुफ्त खाता बनाएं", cta_learn:"अधिक जानें",
    cta_sub:"हजारों स्वास्थ्य कर्मियों के साथ जुड़ें जो पहले से MukhBODHITA उपयोग कर रहे हैं।",
    footer_tagline:"97% सटीकता के साथ AI-संचालित मुँह के कैंसर की जांच। भारत के हर कोने में जल्दी पहचान लाना।",
    footer_langs:"12 भाषाओं में उपलब्ध:",
    fl_product:"उत्पाद", fl_how:"यह कैसे काम करता है", fl_tech:"तकनीक", fl_demo:"लाइव डेमो", fl_modes:"प्लेटफॉर्म मोड",
    fl_compliance:"अनुपालन", fl_abdm:"ABDM एकीकरण", fl_ayushman:"आयुष्मान भारत",
    fl_nhm:"NHM साझेदारी", fl_who:"WHO अनुरूप",
    fl_company:"कंपनी", fl_about:"हमारे बारे में", fl_research:"शोध", fl_privacy:"गोपनीयता नीति", fl_contact:"संपर्क",
    footer_copy:"© 2026 MukhBODHITA · भारत के लिए AI-संचालित मुँह कैंसर जांच",
    footer_disclaimer:"केवल जांच प्रयोजनों के लिए। नैदानिक निदान का विकल्प नहीं।",
    voice_title:"🔊 वॉयस अलर्ट सिस्टम", voice_desc:"स्वास्थ्य अलर्ट प्रसारित करने के लिए भाषा चुनें:",
    modal_close:"बंद करें",
    verdict_ok:"✅ कम जोखिम", verdict_bad:"⚠️ तुरंत रेफर करें",
    alert_ok_title:"✅ कम जोखिम — स्वस्थ प्रतीत होता है",
    alert_ok_msg:"VOC स्तर और बायो-इम्पेडेंस रीडिंग सामान्य सीमा में हैं। 6 महीने में नियमित जांच करें।",
    alert_bad_title:"⚠️ उच्च जोखिम — तुरंत रेफरल आवश्यक",
    alert_bad_msg:"उच्च VOC बायोमार्कर और कम बायो-इम्पेडेंस का पता चला। निकटतम कैंसर संस्थान में तुरंत रेफर करें।",
  },

  /* ── TAMIL ── */
  ta: {
    nav_how:"எப்படி செயல்படுகிறது", nav_tech:"தொழில்நுட்பம்", nav_demo:"நேரடி டெமோ",
    nav_modes:"முறைகள்", nav_signin:"உள்நுழைக", nav_getstarted:"தொடங்குங்கள்",
    badge_text:"🇮🇳 இந்தியாவிற்காக பெருமையுடன் கட்டப்பட்டது · WHO அங்கீகரிக்கப்பட்ட",
    hero_t1:"வாய் புற்றுநோயை கண்டறியுங்கள்", hero_t2:"97% துல்லியம். ₹350 சாதனம்.",
    hero_sub:"MukhBODHITA VOC வாயு உணர்வு, பயோ-இம்பெடன்ஸ் ஸ்கேனிங் மற்றும் ஆஃப்லைன் AI மூலம் இணையம் இல்லாமல் புற்றுநோய் பரிசோதனை செய்கிறது.",
    stat_acc:"AI துல்லியம்", stat_cost:"சாதன செலவு", stat_offline:"ஆஃப்லைன் AI", stat_lang:"மொழிகள்",
    btn_started:"இலவசமாக தொடங்குங்கள்", btn_demo:"▶ நேரடி டெமோ பார்க்கவும்",
    trust_abdm:"✓ ABDM இணக்கமானது", trust_nhm:"✓ NHM தயார்",
    trust_who:"✓ WHO வழிகாட்டுதல்கள்", trust_offline:"✓ இணையம் தேவையில்லை",
    fb_voc:"VOC வாயு", fb_normal:"சாதாரண", fb_bio:"பயோ-இம்பெடன்ஸ்", fb_stable:"நிலையான", fb_edge:"Edge AI",
    acc_label:"துல்லியம்", scroll_text:"ஆராய்வதற்கு உருட்டுங்கள்",
    band_cases:"இந்தியாவில் ஆண்டு புதிய வழக்குகள்", band_late:"கடைசி கட்டத்தில் கண்டறியப்பட்டவை",
    band_acc:"MukhBODHITA துல்லியம்", band_surv:"முன்கூட்டியே கண்டறிந்தால் சிறந்த உயிர்வாழ்வு", band_asha:"தேசியளாவிய ASHA தொழிலாளர்கள்",
    how_tag:"அறிவியல்", how_title:"இரு-படி மல்டிமோடல் கண்டறிதல்",
    how_sub:"MukhBODHITA இரண்டு ஊடுருவாத சோதனைகளை ஒரே நேரத்தில் செய்கிறது, எட்ஜ் AI மூலம் ஒரு ஓரல் வெல்னஸ் ஸ்கோராக ஒருங்கிணைக்கப்படுகிறது.",
    step1_title:"VOC வாயு ஸ்னிஃப் சோதனை",
    step1_desc:"நோயாளி ஒரு டிஸ்போசபிள் ஸ்ட்ரா-வில் மூச்சை வெளியிடுகிறார். MQ-135 சென்சார் அசிட்டோன் & கீட்டோன் VOC பயோமார்க்கர்களை கண்டறிகிறது.",
    step1_sim:"நேரடி ஒப்பீடு", sim_h:"ஆரோக்கியமான காற்று", sim_c:"கட்டி சமிக்ஞை",
    step2_title:"பயோ-இம்பெடன்ஸ் திசு ஸ்கேன்",
    step2_desc:"காப்பர் புரோப் வாண்ட் வாய் திசுவை தொடுகிறது. ஆரோக்கியமான செல்கள் மைக்ரோ-கரன்டை தடுக்கின்றன.",
    step2_sim:"எதிர்ப்பு ஒப்பீடு", res_h:"ஆரோக்கியமான", res_c:"கட்டி",
    fusion_title:"லேட்-ஃபியூஷன் எட்ஜ் AI",
    fusion_desc:"இரண்டு சிக்னல்களும் ESP32-ல் ஒரு ஓரல் வெல்னஸ் ஸ்கோராக (0–100) ஒருங்கிணைக்கப்படுகின்றன. கிளவுட் இல்லை.",
    fusion_acc:"97% சரிபார்க்கப்பட்ட துல்லியம்",
    tech_tag:"வன்பொருள்", tech_title:"அணுகக்கூடிய கூறுகளால் கட்டப்பட்டது",
    tech_sub:"ஒவ்வொரு கூறும் மலிவானது மற்றும் கிராமப்புற இந்திய நிலைமைகளுக்கு நிரூபிக்கப்பட்டது.",
    tc_esp:"AI மூளை — மல்டிமோடல் சென்சார் தரவை சேகரிக்கிறது.", tc_mq:"3D-அச்சிடப்பட்ட குழாய் அறையில் மின்னணு மூக்கு.",
    tc_dht:"சுற்றுப்புற வெப்பநிலை மற்றும் ஈரப்பதத்தை தொடர்ச்சியாக கண்காணிக்கிறது.", tc_probe:"2mm இடைவெளியில் காப்பர் ஃபாயில் ஸ்ட்ரிப்களுடன் பேனா-பாணி வாண்ட்.",
    tc_ai:"10,000+ தரவு புள்ளிகளில் பயிற்சி பெற்ற ML மாதிரி. 97% துல்லியம்.", tc_app:"மூன்று அனுகூலமான முறைகள் ஆஃப்லைன் ஒத்திசைவுடன்.",
    demo_tag:"ஊடாடும் டெமோ", demo_title:"MukhBODHITA-ஐ நேரடியாக முயற்சிக்கவும்",
    demo_sub:"கீழே ஒரு மாதிரி வகையை தேர்ந்தெடுத்து ஸ்கேன் அழுத்துங்கள்.",
    sample_sel:"மாதிரியை தேர்ந்தெடுங்கள்",
    sc_h_title:"ஆரோக்கியமான மாதிரி", sc_h_desc:"சூடான நீர் பஞ்சு · பச்சை உலர் உருளைக்கிழங்கு",
    sc_c_title:"ஆபத்து அனுகரண மாதிரி", sc_c_desc:"அசிட்டோன் பஞ்சு · சூடான உப்பு நீர் உருளைக்கிழங்கு",
    scan_btn:"ஸ்கேன் தொடங்கு", scan_ready:"மாதிரியை தேர்ந்தெடுத்து START அழுத்துங்கள்",
    graph_title:"நேரடி சென்சார் ஊட்டம்", leg_voc:"VOC வாயு (PPM)", leg_bio:"பயோ-இம்பெடன்ஸ் (kΩ)",
    ring_lbl:"நலன்", rd_voc:"VOC வாசிப்பு", rd_temp:"வெப்பநிலை",
    rd_bio:"பயோ-இம்பெடன்ஸ்", rd_verdict:"AI தீர்ப்பு",
    modes_tag:"தளம்", modes_title:"ஒரு சாதனம். மூன்று சக்திவாய்ந்த முறைகள்.",
    modes_sub:"MukhBODHITA-ன் ஆப் யார் பயன்படுத்துகிறார்கள் என்பதன் அடிப்படையில் அதன் முழு இடைமுகத்தையும் மாற்றுகிறது.",
    mode_asha_name:"ASHA தொழிலாளர் முறை", mode_asha_sub:"கிராமப்புற வீடு-வீடு பரிசோதனை",
    af1:"✦ பெரிய வண்ண-குறியீட்டு பொத்தான்கள்", af2:"✦ இந்தி மற்றும் பிராந்திய குரல் எச்சரிக்கைகள்",
    af3:"✦ முழு ஆஃப்லைன் தரவு ஒத்திசைவு", af4:"✦ கிராம-நிலை நோயாளி கண்காணிப்பு", af5:"✦ இணையம் இல்லாமல் செயல்படுகிறது",
    asha_cta:"அணுகல் பெறுங்கள் →",
    popular:"மிகவும் பிரபலமான",
    mode_home_name:"வீட்டு குடிமகன் முறை", mode_home_sub:"எப்போதும் சுய-பரிசோதனை",
    hf1:"✦ எளிய நலன் மதிப்பெண் 0–100", hf2:"✦ கேமரா புண் புகைப்பட மதிப்பாய்வு",
    hf3:"✦ AI படம் வகைப்படுத்தல்", hf4:"✦ தனிப்பட்ட ஆபத்து வரலாறு", hf5:"✦ திறமையான பரிந்துரை பரிந்துரைகள்",
    home_cta:"இலவசமாக தொடங்குங்கள் →",
    mode_hosp_name:"மருத்துவமனை OPD முறை", mode_hosp_sub:"மருத்துவ ட்ரியாஜ் டெர்மினல்",
    hosp_f1:"✦ அளவீட்டு PPM வளைவுகள்", hosp_f2:"✦ பயோ-இம்பெடன்ஸ் கட்ட கோணங்கள்",
    hosp_f3:"✦ ABDM / EMR அறிக்கை ஏற்றுமதி", hosp_f4:"✦ QR பயாப்சி பரிந்துரை குறியீடு", hosp_f5:"✦ பிராந்திய புற்றுநோய் நிறுவன திசைவு",
    hosp_cta:"அணுகல் கோரிக்கை →",
    cta_title:"உயிர்களை காப்பாற்ற தயாரா?", cta_btn:"இலவச கணக்கை உருவாக்கு", cta_learn:"மேலும் அறிக",
    cta_sub:"இந்தியா முழுவதும் MukhBODHITA பயன்படுத்தும் ஆயிரக்கணக்கான சுகாதார பணியாளர்களுடன் இணையுங்கள்.",
    footer_tagline:"97% துல்லியத்துடன் AI-இயங்கும் வாய் புற்றுநோய் பரிசோதனை. இந்தியாவின் ஒவ்வொரு மூலையிலும் ஆரம்பகால கண்டறிதல்.",
    footer_langs:"12 மொழிகளில் கிடைக்கிறது:",
    fl_product:"தயாரிப்பு", fl_how:"எப்படி செயல்படுகிறது", fl_tech:"தொழில்நுட்பம்", fl_demo:"நேரடி டெமோ", fl_modes:"தள முறைகள்",
    fl_compliance:"இணக்கம்", fl_abdm:"ABDM ஒருங்கிணைப்பு", fl_ayushman:"ஆயுஷ்மான் பாரத்",
    fl_nhm:"NHM கூட்டாண்மை", fl_who:"WHO இணக்கமானது",
    fl_company:"நிறுவனம்", fl_about:"எங்களை பற்றி", fl_research:"ஆராய்ச்சி", fl_privacy:"தனியுரிமை கொள்கை", fl_contact:"தொடர்பு",
    footer_copy:"© 2026 MukhBODHITA · இந்தியாவிற்கான AI-இயங்கும் வாய் புற்றுநோய் பரிசோதனை",
    footer_disclaimer:"பரிசோதனை நோக்கங்களுக்காக மட்டுமே. மருத்துவ நோய் கண்டறிதலுக்கு மாற்றாக அல்ல.",
    voice_title:"🔊 குரல் எச்சரிக்கை அமைப்பு", voice_desc:"ஒரு மொழியை தேர்ந்தெடுத்து ஆரோக்கிய எச்சரிக்கையை ஒலிப்பரப்பு செய்யுங்கள்:",
    modal_close:"மூடு",
    verdict_ok:"✅ குறைந்த ஆபத்து", verdict_bad:"⚠️ உடனடியாக பரிந்துரைக்கவும்",
    alert_ok_title:"✅ குறைந்த ஆபத்து — ஆரோக்கியமாக தெரிகிறது",
    alert_ok_msg:"VOC நிலைகள் சாதாரண வரம்பில் உள்ளன. 6 மாதங்களில் வழக்கமான பரிசோதனை திட்டமிடுங்கள்.",
    alert_bad_title:"⚠️ அதிக ஆபத்து — உடனடி பரிந்துரைப்பு தேவை",
    alert_bad_msg:"உயர்ந்த VOC பயோமார்க்கர்கள் மற்றும் குறைந்த பயோ-இம்பெடன்ஸ் கண்டறியப்பட்டது. உடனடியாக நெருங்கிய புற்றுநோய் மையத்திற்கு பரிந்துரைக்கவும்.",
  },

  /* ── TELUGU ── */
  te: {
    nav_how:"ఎలా పని చేస్తుంది", nav_tech:"సాంకేతికత", nav_demo:"లైవ్ డెమో",
    nav_modes:"మోడ్లు", nav_signin:"సైన్ ఇన్", nav_getstarted:"ప్రారంభించండి",
    badge_text:"🇮🇳 భారతదేశం కోసం గర్వంగా నిర్మించబడింది",
    hero_t1:"నోటి క్యాన్సర్‌ను గుర్తించండి", hero_t2:"97% ఖచ్చితత్వం. ₹350 పరికరం.",
    hero_sub:"MukhBODHITA VOC గ్యాస్ సెన్సింగ్, బయో-ఇంపెడెన్స్ స్కానింగ్ మరియు ఆఫ్‌లైన్ AI తో ఇంటర్నెట్ లేకుండా క్యాన్సర్ స్క్రీనింగ్ అందిస్తుంది.",
    stat_acc:"AI ఖచ్చితత్వం", stat_cost:"పరికర వ్యయం", stat_offline:"ఆఫ్‌లైన్ AI", stat_lang:"భాషలు",
    btn_started:"ఉచితంగా ప్రారంభించండి", btn_demo:"▶ లైవ్ డెమో చూడండి",
    trust_abdm:"✓ ABDM అనుసరణ", trust_nhm:"✓ NHM సిద్ధం",
    trust_who:"✓ WHO మార్గదర్శకాలు", trust_offline:"✓ ఇంటర్నెట్ అవసరం లేదు",
    fb_voc:"VOC గ్యాస్", fb_normal:"సాధారణ", fb_bio:"బయో-ఇంపెడెన్స్", fb_stable:"స్థిరంగా", fb_edge:"Edge AI",
    acc_label:"ఖచ్చితత్వం", scroll_text:"అన్వేషించడానికి స్క్రోల్ చేయండి",
    band_cases:"భారతదేశంలో సంవత్సరంలో కొత్త కేసులు", band_late:"చివరి దశలో గుర్తించబడ్డాయి",
    band_acc:"MukhBODHITA ఖచ్చితత్వం", band_surv:"ముందుగా పట్టుకుంటే మెరుగైన మనుగడ", band_asha:"దేశవ్యాప్తంగా ASHA కార్యకర్తలు",
    how_tag:"శాస్త్రం", how_title:"రెండు-దశల మల్టీమోడల్ గుర్తింపు",
    how_sub:"MukhBODHITA ఒకేసారి రెండు నాన్-ఇన్వేసివ్ పరీక్షలు నిర్వహిస్తుంది.",
    step1_title:"VOC గ్యాస్ స్నిఫ్ టెస్ట్",
    step1_desc:"రోగి డిస్పోజబుల్ స్ట్రాలో ఊపిరి పీల్చుకుంటారు. MQ-135 సెన్సార్ అసిటోన్ VOC బయోమార్కర్లను గుర్తిస్తుంది.",
    step1_sim:"లైవ్ పోలిక", sim_h:"ఆరోగ్యకరమైన గాలి", sim_c:"కణితి సంకేతం",
    step2_title:"బయో-ఇంపెడెన్స్ టిష్యూ స్కాన్",
    step2_desc:"కాపర్ ప్రోబ్ నోటి కణజాలాన్ని తాకుతుంది. ఆరోగ్యకరమైన కణాలు మైక్రో-కరెంట్‌ని నిరోధిస్తాయి.",
    step2_sim:"నిరోధక పోలిక", res_h:"ఆరోగ్యకరమైన", res_c:"కణితి",
    fusion_title:"లేట్-ఫ్యూజన్ ఎడ్జ్ AI",
    fusion_desc:"రెండు సిగ్నల్స్ ESP32లో ఒక స్కోర్‌గా (0–100) విలీనం చేయబడతాయి. క్లౌడ్ లేదు.",
    fusion_acc:"97% ధృవీకరించబడిన ఖచ్చితత్వం",
    tech_tag:"హార్డ్‌వేర్", tech_title:"అందుబాటులో ఉన్న భాగాలతో నిర్మించబడింది",
    tech_sub:"ప్రతి భాగం చౌకైనది మరియు గ్రామీణ భారతీయ పరిస్థితులకు నిరూపించబడింది.",
    tc_esp:"AI మెదడు — మల్టీమోడల్ సెన్సార్ డేటాను సేకరిస్తుంది.",
    tc_mq:"3D-ప్రింటెడ్ PVC ట్యూబ్ ఛాంబర్‌లో ఎలక్ట్రానిక్ ముక్కు.",
    tc_dht:"అంబియంట్ ఉష్ణోగ్రత & తేమను నిరంతరం ట్రాక్ చేస్తుంది.",
    tc_probe:"2mm అంతరంలో కాపర్ ఫాయిల్ స్ట్రిప్‌లతో పెన్-స్టైల్ వాండ్.",
    tc_ai:"10,000+ డేటా పాయింట్లపై శిక్షణ పొందిన ML మోడల్. 97% ఖచ్చితత్వం.",
    tc_app:"మూడు అడాప్టివ్ మోడ్లు ఆఫ్‌లైన్ సమకాలీకరణతో.",
    demo_tag:"ఇంటరాక్టివ్ డెమో", demo_title:"MukhBODHITA లైవ్‌గా ప్రయత్నించండి",
    demo_sub:"క్రింద ఒక నమూనా రకాన్ని ఎంచుకుని స్కాన్ నొక్కండి.",
    sample_sel:"నమూనాను ఎంచుకోండి",
    sc_h_title:"ఆరోగ్యకరమైన నమూనా", sc_h_desc:"వెచ్చని నీటి పత్తి · ముడి పొడి బంగాళాదుంప",
    sc_c_title:"రిస్క్-అనుకరించే నమూనా", sc_c_desc:"అసిటోన్ పత్తి · వేడి ఉప్పు నీటి బంగాళాదుంప",
    scan_btn:"స్కాన్ ప్రారంభించు", scan_ready:"నమూనా ఎంచుకుని START నొక్కండి",
    graph_title:"లైవ్ సెన్సార్ ఫీడ్", leg_voc:"VOC గ్యాస్ (PPM)", leg_bio:"బయో-ఇంపెడెన్స్ (kΩ)",
    ring_lbl:"వెల్నెస్", rd_voc:"VOC రీడింగ్", rd_temp:"ఉష్ణోగ్రత",
    rd_bio:"బయో-ఇంపెడెన్స్", rd_verdict:"AI తీర్పు",
    modes_tag:"ప్లాట్‌ఫారమ్", modes_title:"ఒక పరికరం. మూడు శక్తివంతమైన మోడ్లు.",
    modes_sub:"MukhBODHITA యాప్ ఎవరు వాడుతున్నారు అనేదాన్ని బట్టి మొత్తం ఇంటర్‌ఫేస్ మారుస్తుంది.",
    mode_asha_name:"ASHA కార్యకర్త మోడ్", mode_asha_sub:"గ్రామీణ ఇంటింటి స్క్రీనింగ్",
    af1:"✦ పెద్ద రంగు-కోడ్ బటన్లు", af2:"✦ హిందీ & ప్రాంతీయ వాయిస్ హెచ్చరికలు",
    af3:"✦ పూర్తి ఆఫ్‌లైన్ డేటా సమకాలీకరణ", af4:"✦ గ్రామ-స్థాయి రోగి ట్రాకింగ్", af5:"✦ సున్నా ఇంటర్నెట్‌తో పని చేస్తుంది",
    asha_cta:"యాక్సెస్ పొందండి →", popular:"అత్యంత జనాదరణ పొందిన",
    mode_home_name:"హోమ్ సిటిజన్ మోడ్", mode_home_sub:"ఎప్పుడైనా స్వయం-స్క్రీనింగ్",
    hf1:"✦ సాధారణ వెల్నెస్ స్కోర్ 0–100", hf2:"✦ కెమెరా అల్సర్ ఫోటో రివ్యూ",
    hf3:"✦ AI ఇమేజ్ వర్గీకరణ", hf4:"✦ వ్యక్తిగత రిస్క్ చరిత్ర", hf5:"✦ స్మార్ట్ రిఫెరల్ సూచనలు",
    home_cta:"ఉచితంగా ప్రారంభించండి →",
    mode_hosp_name:"హాస్పిటల్ OPD మోడ్", mode_hosp_sub:"క్లినికల్ ట్రియాజ్ టెర్మినల్",
    hosp_f1:"✦ క్యాలిబ్రేటెడ్ PPM కర్వ్స్", hosp_f2:"✦ బయో-ఇంపెడెన్స్ ఫేజ్ యాంగిల్స్",
    hosp_f3:"✦ ABDM / EMR నివేదిక ఎగుమతి", hosp_f4:"✦ QR బయాప్సీ రిఫెరల్ కోడ్", hosp_f5:"✦ ప్రాంతీయ క్యాన్సర్ సంస్థ రూటింగ్",
    hosp_cta:"యాక్సెస్ కోరండి →",
    cta_title:"జీవితాలను రక్షించడానికి సిద్ధంగా ఉన్నారా?", cta_btn:"ఉచిత ఖాతా సృష్టించండి", cta_learn:"మరింత తెలుసుకోండి",
    cta_sub:"భారతదేశం అంతటా MukhBODHITA ఉపయోగిస్తున్న వేలాది ఆరోగ్య కార్యకర్తలతో చేరండి.",
    footer_tagline:"97% ఖచ్చితత్వంతో AI-ఆధారిత నోటి క్యాన్సర్ స్క్రీనింగ్.",
    footer_langs:"12 భాషలలో అందుబాటులో ఉంది:",
    fl_product:"ఉత్పత్తి", fl_how:"ఎలా పని చేస్తుంది", fl_tech:"సాంకేతికత", fl_demo:"లైవ్ డెమో", fl_modes:"ప్లాట్‌ఫారమ్ మోడ్లు",
    fl_compliance:"అనుసరణ", fl_abdm:"ABDM ఏకీకరణ", fl_ayushman:"ఆయుష్మాన్ భారత్",
    fl_nhm:"NHM భాగస్వామ్యం", fl_who:"WHO అనుసరణ",
    fl_company:"కంపెనీ", fl_about:"మా గురించి", fl_research:"పరిశోధన", fl_privacy:"గోపనీయతా విధానం", fl_contact:"సంప్రదించండి",
    footer_copy:"© 2026 MukhBODHITA · భారతదేశం కోసం AI-ఆధారిత నోటి క్యాన్సర్ స్క్రీనింగ్",
    footer_disclaimer:"స్క్రీనింగ్ ప్రయోజనాల కోసం మాత్రమే. క్లినికల్ నిర్ధారణకు ప్రత్యామ్నాయం కాదు.",
    voice_title:"🔊 వాయిస్ హెచ్చరిక వ్యవస్థ", voice_desc:"ఒక భాషను ఎంచుకుని ఆరోగ్య హెచ్చరిక ప్రసారం చేయండి:",
    modal_close:"మూసివేయి",
    verdict_ok:"✅ తక్కువ ప్రమాదం", verdict_bad:"⚠️ వెంటనే రిఫెర్ చేయండి",
    alert_ok_title:"✅ తక్కువ ప్రమాదం — ఆరోగ్యంగా కనిపిస్తోంది",
    alert_ok_msg:"VOC స్థాయిలు సాధారణ పరిధిలో ఉన్నాయి. 6 నెలల్లో నిత్యమైన స్క్రీనింగ్ షెడ్యూల్ చేయండి.",
    alert_bad_title:"⚠️ అధిక ప్రమాదం — తక్షణ రిఫెరల్ అవసరం",
    alert_bad_msg:"ఎలివేటెడ్ VOC బయోమార్కర్లు మరియు తక్కువ బయో-ఇంపెడెన్స్ గుర్తించబడ్డాయి. సమీపంలోని క్యాన్సర్ సంస్థకు రిఫెర్ చేయండి.",
  },
};

// Minimal copies for remaining 8 languages (inherit English, override key strings)
['kn','ml','mr','bn','gu','pa','or','ur'].forEach(l => { T[l] = { ...T.en }; });

// Kannada
Object.assign(T.kn, {
  nav_how:"ಹೇಗೆ ಕಾರ್ಯ ನಿರ್ವಹಿಸುತ್ತದೆ", nav_signin:"ಸೈನ್ ಇನ್", nav_getstarted:"ಪ್ರಾರಂಭಿಸಿ",
  hero_t1:"ಬಾಯಿ ಕ್ಯಾನ್ಸರ್ ಪತ್ತೆ ಮಾಡಿ", hero_t2:"97% ನಿಖರತೆ. ₹350 ಸಾಧನ.",
  hero_sub:"MukhBODHITA VOC ಗ್ಯಾಸ್ ಸೆನ್ಸಿಂಗ್, ಬಯೋ-ಇಂಪೆಡೆನ್ಸ್ ಮತ್ತು ಆಫ್‌ಲೈನ್ AI ಮೂಲಕ ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದೆ ಕ್ಯಾನ್ಸರ್ ಸ್ಕ್ರೀನಿಂಗ್ ಒದಗಿಸುತ್ತದೆ.",
  stat_acc:"AI ನಿಖರತೆ", scan_btn:"ಸ್ಕ್ಯಾನ್ ಪ್ರಾರಂಭಿಸಿ", btn_started:"ಉಚಿತವಾಗಿ ಪ್ರಾರಂಭಿಸಿ",
  cta_title:"ಜೀವಗಳನ್ನು ಉಳಿಸಲು ಸಿದ್ಧರಾಗಿದ್ದೀರಾ?", cta_btn:"ಉಚಿತ ಖಾತೆ ರಚಿಸಿ",
  footer_copy:"© 2026 MukhBODHITA · ಭಾರತಕ್ಕಾಗಿ AI-ಆಧಾರಿತ ಬಾಯಿ ಕ್ಯಾನ್ಸರ್ ಸ್ಕ್ರೀನಿಂಗ್",
  modal_close:"ಮುಚ್ಚಿ", verdict_ok:"✅ ಕಡಿಮೆ ಅಪಾಯ", verdict_bad:"⚠️ ತಕ್ಷಣ ರೆಫರ್ ಮಾಡಿ",
  alert_ok_title:"✅ ಕಡಿಮೆ ಅಪಾಯ", alert_ok_msg:"VOC ಮಟ್ಟಗಳು ಸಾಮಾನ್ಯ ವ್ಯಾಪ್ತಿಯಲ್ಲಿವೆ.",
  alert_bad_title:"⚠️ ಅಧಿಕ ಅಪಾಯ", alert_bad_msg:"ತಕ್ಷಣ ಹತ್ತಿರದ ಕ್ಯಾನ್ಸರ್ ಸಂಸ್ಥೆಗೆ ರೆಫರ್ ಮಾಡಿ.",
});
// Malayalam
Object.assign(T.ml, {
  nav_how:"എങ്ങനെ പ്രവർത്തിക്കുന്നു", nav_signin:"സൈൻ ഇൻ", nav_getstarted:"ആരംഭിക്കുക",
  hero_t1:"വായ്‌ കാൻസർ കണ്ടെത്തുക", hero_t2:"97% കൃത്യത. ₹350 ഉപകരണം.",
  hero_sub:"MukhBODHITA VOC ഗ്യാസ് സെൻസിംഗ്, ബയോ-ഇംപെഡൻസ്, ഓഫ്‌ലൈൻ AI ഉപയോഗിച്ച് ഇന്റർനെറ്റ് ഇല്ലാതെ ക്യാൻസർ സ്ക്രീനിംഗ് നൽകുന്നു.",
  stat_acc:"AI കൃത്യത", scan_btn:"സ്കാൻ ആരംഭിക്കുക", btn_started:"സൗജന്യമായി ആരംഭിക്കുക",
  cta_title:"ജീവൻ രക്ഷിക്കാൻ തയ്യാറാണോ?", cta_btn:"സൗജന്യ അക്കൗണ്ട് ഉണ്ടാക്കുക",
  footer_copy:"© 2026 MukhBODHITA · ഇന്ത്യ കോസ്‌ കേൻ AI-പ്രവർത്തിത് ഓറൽ കാൻസർ",
  modal_close:"അടയ്ക്കുക", verdict_ok:"✅ കുറഞ്ഞ അപകടം", verdict_bad:"⚠️ ഉടനടി റഫർ ചെയ്യുക",
  alert_ok_title:"✅ കുറഞ്ഞ അപകടം", alert_ok_msg:"VOC നിലകൾ സാധാരണ പരിധിയിലാണ്.",
  alert_bad_title:"⚠️ ഉയർന്ന അപകടം", alert_bad_msg:"സമീപത്തെ ക്യാൻസർ ഇൻസ്റ്റിറ്റ്യൂട്ടിലേക്ക് ഉടൻ റഫർ ചെയ്യുക.",
});
// Marathi
Object.assign(T.mr, {
  nav_how:"हे कसे कार्य करते", nav_signin:"साइन इन", nav_getstarted:"सुरुवात करा",
  hero_t1:"तोंडाचा कर्करोग ओळखा", hero_t2:"97% अचूकता. ₹350 साधन.",
  hero_sub:"MukhBODHITA VOC गॅस सेन्सिंग, बायो-इम्पेडेंस स्कॅनिंग आणि ऑफलाइन AI वापरून इंटरनेटशिवाय कर्करोग तपासणी प्रदान करते.",
  stat_acc:"AI अचूकता", scan_btn:"स्कॅन सुरू करा", btn_started:"मोफत सुरुवात करा",
  cta_title:"जीव वाचवण्यास तयार आहात?", cta_btn:"मोफत खाते तयार करा",
  footer_copy:"© 2026 MukhBODHITA · भारतासाठी AI-चालित तोंडाच्या कर्करोगाची तपासणी",
  modal_close:"बंद करा", verdict_ok:"✅ कमी धोका", verdict_bad:"⚠️ तात्काळ रेफर करा",
  alert_ok_title:"✅ कमी धोका", alert_ok_msg:"VOC पातळी सामान्य श्रेणीत आहे.",
  alert_bad_title:"⚠️ उच्च धोका", alert_bad_msg:"जवळच्या कर्करोग संस्थेकडे त्वरित रेफर करा.",
});
// Bengali
Object.assign(T.bn, {
  nav_how:"কীভাবে কাজ করে", nav_signin:"সাইন ইন", nav_getstarted:"শুরু করুন",
  hero_t1:"মুখের ক্যান্সার সনাক্ত করুন", hero_t2:"৯৭% নির্ভুলতা। ₹৩৫০ যন্ত্র।",
  hero_sub:"MukhBODHITA VOC গ্যাস সেন্সিং, বায়ো-ইম্পেডেন্স এবং অফলাইন AI দিয়ে ইন্টারনেট ছাড়াই ক্যান্সার স্ক্রিনিং করে।",
  stat_acc:"AI নির্ভুলতা", scan_btn:"স্ক্যান শুরু করুন", btn_started:"বিনামূল্যে শুরু করুন",
  cta_title:"জীবন বাঁচাতে প্রস্তুত?", cta_btn:"বিনামূল্যে অ্যাকাউন্ট তৈরি করুন",
  footer_copy:"© 2026 MukhBODHITA · ভারতের জন্য AI-চালিত মুখের ক্যান্সার স্ক্রিনিং",
  modal_close:"বন্ধ করুন", verdict_ok:"✅ কম ঝুঁকি", verdict_bad:"⚠️ তাৎক্ষণিক রেফার করুন",
  alert_ok_title:"✅ কম ঝুঁকি", alert_ok_msg:"VOC মাত্রা স্বাভাবিক পরিসরে আছে।",
  alert_bad_title:"⚠️ উচ্চ ঝুঁকি", alert_bad_msg:"নিকটতম ক্যান্সার ইনস্টিটিউটে অবিলম্বে রেফার করুন।",
});
// Gujarati
Object.assign(T.gu, {
  nav_how:"કેવી રીતે કાર્ય કરે છે", nav_signin:"સાઈન ઇન", nav_getstarted:"શરૂ કરો",
  hero_t1:"મોઢાનો કેન્સર શોધો", hero_t2:"97% ચોકસાઈ. ₹350 ઉપકરણ.",
  hero_sub:"MukhBODHITA VOC ગેસ સેન્સિંગ, બાયો-ઇમ્પેડન્સ સ્કેનિંગ અને ઓફ્‌લાઇન AI સાથે ઇન્ટરનેટ વગર કેન્સર સ્ક્રીનિંગ આપે છે.",
  stat_acc:"AI ચોકસાઈ", scan_btn:"સ્કેન શરૂ કરો", btn_started:"મફત શરૂ કરો",
  cta_title:"જીવ બચાવવા તૈયાર છો?", cta_btn:"મફત ખાતું બનાવો",
  footer_copy:"© 2026 MukhBODHITA · ભારત માટે AI-સંચાલિત મોઢાના કેન્સર સ્ક્રીનિંગ",
  modal_close:"બંધ કરો", verdict_ok:"✅ ઓછું જોખમ", verdict_bad:"⚠️ તાત્કાલિક રેફર કરો",
  alert_ok_title:"✅ ઓછું જોખમ", alert_ok_msg:"VOC સ્તર સામાન્ય શ્રેણીમાં છે.",
  alert_bad_title:"⚠️ ઉચ્ચ જોખમ", alert_bad_msg:"નજીકની કેન્સર સંસ્થાને તાત્કાલિક રેફર કરો.",
});
// Punjabi
Object.assign(T.pa, {
  nav_how:"ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ", nav_signin:"ਸਾਈਨ ਇਨ", nav_getstarted:"ਸ਼ੁਰੂ ਕਰੋ",
  hero_t1:"ਮੂੰਹ ਦਾ ਕੈਂਸਰ ਲੱਭੋ", hero_t2:"97% ਸ਼ੁੱਧਤਾ। ₹350 ਯੰਤਰ।",
  hero_sub:"MukhBODHITA VOC ਗੈਸ ਸੈਂਸਿੰਗ, ਬਾਇਓ-ਇੰਪੈਡੇਂਸ ਅਤੇ ਆਫਲਾਈਨ AI ਨਾਲ ਇੰਟਰਨੈੱਟ ਤੋਂ ਬਿਨਾਂ ਕੈਂਸਰ ਸਕ੍ਰੀਨਿੰਗ ਕਰਦਾ ਹੈ।",
  stat_acc:"AI ਸ਼ੁੱਧਤਾ", scan_btn:"ਸਕੈਨ ਸ਼ੁਰੂ ਕਰੋ", btn_started:"ਮੁਫ਼ਤ ਸ਼ੁਰੂ ਕਰੋ",
  cta_title:"ਜ਼ਿੰਦਗੀਆਂ ਬਚਾਉਣ ਲਈ ਤਿਆਰ ਹੋ?", cta_btn:"ਮੁਫ਼ਤ ਖਾਤਾ ਬਣਾਓ",
  footer_copy:"© 2026 MukhBODHITA · ਭਾਰਤ ਲਈ AI-ਸੰਚਾਲਿਤ ਮੂੰਹ ਕੈਂਸਰ ਸਕ੍ਰੀਨਿੰਗ",
  modal_close:"ਬੰਦ ਕਰੋ", verdict_ok:"✅ ਘੱਟ ਜੋਖਮ", verdict_bad:"⚠️ ਤੁਰੰਤ ਰੈਫਰ ਕਰੋ",
  alert_ok_title:"✅ ਘੱਟ ਜੋਖਮ", alert_ok_msg:"VOC ਪੱਧਰ ਆਮ ਸੀਮਾ ਵਿੱਚ ਹਨ।",
  alert_bad_title:"⚠️ ਉੱਚ ਜੋਖਮ", alert_bad_msg:"ਨਜ਼ਦੀਕੀ ਕੈਂਸਰ ਸੰਸਥਾ ਵਿੱਚ ਤੁਰੰਤ ਰੈਫਰ ਕਰੋ।",
});
// Odia
Object.assign(T.or, {
  nav_how:"କିପରି କାମ କରେ", nav_signin:"ସାଇନ ଇନ", nav_getstarted:"ଆରମ୍ଭ କରନ୍ତୁ",
  hero_t1:"ମୁଖ କର୍କଟ ଚିହ୍ନଟ କରନ୍ତୁ", hero_t2:"97% ସଠିକ୍‌ତା। ₹350 ଯନ୍ତ୍ର।",
  hero_sub:"MukhBODHITA VOC ଗ୍ୟାସ ସ୍କ୍ୟାନ, ବାୟୋ-ଇମ୍ପେଡ଼ାନ୍ସ ଏବଂ ଅଫ୍‌ଲାଇନ AI ଦ୍ୱାରା ଇଣ୍ଟର୍ନେଟ ବିନା ପରୀକ୍ଷା କରିଥାଏ।",
  stat_acc:"AI ସଠିକ୍‌ତା", scan_btn:"ସ୍କ୍ୟାନ ଆରମ୍ଭ", btn_started:"ମୁଫ୍ତ ଆରମ୍ଭ",
  cta_title:"ଜୀବନ ବଞ୍ଚାଇବା ପ୍ରସ୍ତୁତ?", cta_btn:"ମୁଫ୍ତ ଆକାଉଣ୍ଟ ତିଆରି",
  footer_copy:"© 2026 MukhBODHITA · ଭାରତ ପାଇଁ AI ଓ୍ରାଲ କ୍ୟାନ୍ସର ସ୍କ୍ରୀନିଂ",
  modal_close:"ବନ୍ଦ", verdict_ok:"✅ କମ ଆଶଙ୍କା", verdict_bad:"⚠️ ତୁରନ୍ତ ରେଫର",
  alert_ok_title:"✅ କମ ଆଶଙ୍କା", alert_ok_msg:"VOC ସ୍ତର ସ୍ୱାଭାବିକ।",
  alert_bad_title:"⚠️ ଉଚ୍ଚ ଆଶଙ୍କା", alert_bad_msg:"ନିକଟ କ୍ୟାନ୍ସର ଇନ୍ଷ୍ଟିଟ୍ୟୁଟ ଯୋଗାଯୋଗ କରନ୍ତୁ।",
});
// Urdu
Object.assign(T.ur, {
  nav_how:"یہ کیسے کام کرتا ہے", nav_signin:"سائن ان", nav_getstarted:"شروع کریں",
  hero_t1:"منہ کے کینسر کا پتہ لگائیں", hero_t2:"97% درستگی۔ ₹350 آلہ۔",
  hero_sub:"MukhBODHITA VOC گیس سینسنگ، بائیو-امپیڈینس اسکیننگ اور آف لائن AI سے بغیر انٹرنیٹ کینسر اسکریننگ فراہم کرتا ہے۔",
  stat_acc:"AI درستگی", scan_btn:"اسکین شروع کریں", btn_started:"مفت شروع کریں",
  cta_title:"زندگیاں بچانے کے لیے تیار ہیں؟", cta_btn:"مفت اکاؤنٹ بنائیں",
  footer_copy:"© 2026 MukhBODHITA · بھارت کے لیے AI زبانی کینسر اسکریننگ",
  modal_close:"بند کریں", verdict_ok:"✅ کم خطرہ", verdict_bad:"⚠️ فوری ریفر کریں",
  alert_ok_title:"✅ کم خطرہ", alert_ok_msg:"VOC کی سطح معمول کی حد میں ہے۔",
  alert_bad_title:"⚠️ زیادہ خطرہ", alert_bad_msg:"قریب ترین کینسر انسٹی ٹیوٹ کو فوری ریفر کریں۔",
});

// ═══════════════════════════════════════════
// 3. APPLY LANGUAGE
// ═══════════════════════════════════════════
let currentLang = localStorage.getItem('mb-lang') || 'en';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('mb-lang', lang);
  const t = T[lang] || T.en;

  document.querySelectorAll('[data-key]').forEach(el => {
    const k = el.getAttribute('data-key');
    if (t[k] === undefined) return;
    if (el.tagName === 'INPUT') { el.placeholder = t[k]; return; }
    el.textContent = t[k];
  });

  // Update lang button label
  const labels = { en:'EN', hi:'हिं', ta:'தமி', te:'తెలు', kn:'ಕನ್', ml:'മലം', mr:'मरा', bn:'বাং', gu:'ગુj', pa:'ਪੰਜ', or:'ଓଡ', ur:'اردو' };
  const cur = document.getElementById('lang-current');
  if (cur) cur.textContent = labels[lang] || lang.toUpperCase();

  document.querySelectorAll('.lang-option').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
  document.body.style.direction = lang === 'ur' ? 'rtl' : 'ltr';
  document.getElementById('lang-selector')?.classList.remove('open');
  showToast(`Language: ${getFullName(lang)}`, 'info');
}

function getFullName(c) {
  return ({ en:'English', hi:'हिंदी', ta:'தமிழ்', te:'తెలుగు', kn:'ಕನ್ನಡ', ml:'മലയാളം', mr:'मराठी', bn:'বাংলা', gu:'ગુજરાતી', pa:'ਪੰਜਾਬੀ', or:'ଓଡ଼ିଆ', ur:'اردو' })[c] || c;
}

// ═══════════════════════════════════════════
// 4. PARTICLE SYSTEM
// ═══════════════════════════════════════════
(function() {
  const cv = document.getElementById('particles-canvas');
  if (!cv) return;
  const cx = cv.getContext('2d');
  const resize = () => { cv.width = innerWidth; cv.height = innerHeight; };
  resize(); addEventListener('resize', resize);

  const pts = Array.from({ length: 70 }, () => ({
    x: Math.random() * innerWidth, y: Math.random() * innerHeight,
    r: Math.random() * 1.8 + 0.4,
    vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
    a: Math.random() * 0.5 + 0.1,
    col: Math.random() > 0.5 ? '#00e5cc' : '#7c3aed',
  }));

  (function draw() {
    cx.clearRect(0, 0, cv.width, cv.height);
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > cv.width)  p.vx *= -1;
      if (p.y < 0 || p.y > cv.height) p.vy *= -1;
      pts.slice(i + 1).forEach(q => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 110) {
          cx.save(); cx.globalAlpha = (1 - d / 110) * 0.08;
          cx.strokeStyle = '#00e5cc'; cx.lineWidth = 0.5;
          cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(q.x, q.y); cx.stroke(); cx.restore();
        }
      });
      cx.save(); cx.globalAlpha = p.a; cx.fillStyle = p.col;
      cx.beginPath(); cx.arc(p.x, p.y, p.r, 0, 6.28); cx.fill(); cx.restore();
    });
    requestAnimationFrame(draw);
  })();
})();

// ═══════════════════════════════════════════
// 5. NAVBAR
// ═══════════════════════════════════════════
addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', scrollY > 60);
}, { passive: true });

document.getElementById('hamburger')?.addEventListener('click', () => {
  document.getElementById('nav-links')?.classList.toggle('open');
});

document.getElementById('lang-btn')?.addEventListener('click', e => {
  e.stopPropagation();
  document.getElementById('lang-selector')?.classList.toggle('open');
});
document.addEventListener('click', () => document.getElementById('lang-selector')?.classList.remove('open'));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    document.getElementById('nav-links')?.classList.remove('open');
  });
});

// Active nav link
const secs = document.querySelectorAll('section[id]');
addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (scrollY >= s.offsetTop - 120) cur = s.id; });
  document.querySelectorAll('.nav-link:not(.btn-nav-solid):not(.btn-nav-ghost)').forEach(a => {
    a.classList.toggle('active-nav', a.getAttribute('href') === '#' + cur);
  });
}, { passive: true });

// ═══════════════════════════════════════════
// 6. SCROLL FADE-UP ANIMATIONS
// ═══════════════════════════════════════════
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.step-card,.tech-card,.mode-card,.band-stat,.stat-pill').forEach(el => {
  el.classList.add('fade-up'); io.observe(el);
});

// ═══════════════════════════════════════════
// 7. DEMO SCANNER
// ═══════════════════════════════════════════
let selectedSample = 'healthy';
let scanTimer = null;
const graphData = { voc: [], bio: [] };

function selectSample(type) {
  selectedSample = type;
  document.getElementById('sc-healthy')?.classList.toggle('active',   type === 'healthy');
  document.getElementById('sc-healthy')?.classList.toggle('active-r', false);
  document.getElementById('sc-cancer')?.classList.toggle('active-r',  type === 'cancer');
  document.getElementById('sc-cancer')?.classList.toggle('active',    type !== 'cancer');
  resetDemo();
}

function resetDemo() {
  graphData.voc = []; graphData.bio = [];
  drawGraph();
  setRing(0, true);
  ['rd-voc','rd-temp','rd-bio','rd-verdict'].forEach(id => {
    const el = document.getElementById(id); if (el) el.textContent = '—';
  });
  document.getElementById('rd-verdict')?.classList.remove('danger');
  const ra = document.getElementById('result-alert'); if (ra) ra.style.display = 'none';
}

function runScan() {
  if (scanTimer) { clearInterval(scanTimer); scanTimer = null; }
  const btn    = document.getElementById('scan-btn');
  const status = document.getElementById('scan-status');
  if (!btn || !status) return;
  btn.classList.add('scanning');
  graphData.voc = []; graphData.bio = [];
  const ok = selectedSample === 'healthy';
  const vocT = ok ? 115 + Math.random()*55 : 840 + Math.random()*130;
  const bioT = ok ? 4.0 + Math.random()*0.9 : 0.25 + Math.random()*0.4;
  const tmp  = (27 + Math.random()*3).toFixed(1);
  const phases = ['🔄 Warming MQ-135 sensor…','💨 Sampling exhaled VOC levels…','⚡ Activating bio-impedance probe…','🌡️ Calibrating with DHT11…','🧠 Running Edge-AI model…','✅ Analysis complete!'];
  let step = 0;

  scanTimer = setInterval(() => {
    step++;
    status.textContent = phases[Math.min(step - 1, phases.length - 1)];
    const prog = Math.min(step / 28, 1);
    graphData.voc.push(Math.max(40, vocT * prog + (Math.random() - 0.5) * 45));
    graphData.bio.push(Math.max(0.08, bioT + (Math.random() - 0.5) * 0.25));
    drawGraph();

    if (step >= 28) {
      clearInterval(scanTimer); scanTimer = null;
      btn.classList.remove('scanning');
      const score = ok ? 82 + Math.floor(Math.random() * 14) : 18 + Math.floor(Math.random() * 18);
      const t = T[currentLang] || T.en;
      setRing(score);
      document.getElementById('ring-score').textContent = score;
      document.getElementById('rd-voc').textContent   = Math.round(vocT) + ' PPM';
      document.getElementById('rd-temp').textContent  = tmp + '°C';
      document.getElementById('rd-bio').textContent   = bioT.toFixed(2) + ' kΩ';
      const verdEl = document.getElementById('rd-verdict');
      verdEl.textContent = ok ? t.verdict_ok : t.verdict_bad;
      verdEl.className   = ok ? 'rd-v verdict' : 'rd-v verdict danger';

      const ra = document.getElementById('result-alert');
      ra.className = 'result-alert ' + (ok ? 'ok' : 'bad');
      ra.style.display = 'flex';
      document.getElementById('alert-icon').textContent  = ok ? '✅' : '🚨';
      document.getElementById('alert-title').textContent = ok ? t.alert_ok_title  : t.alert_bad_title;
      document.getElementById('alert-msg').textContent   = ok ? t.alert_ok_msg    : t.alert_bad_msg;
      showToast(ok ? '✅ Scan complete — Low Risk' : '⚠️ High Risk Detected', ok ? 'success' : 'error');

      const token = localStorage.getItem('mb-token');
      if (token) {
        saveScreeningToBackend(token, {
          sample_type: selectedSample,
          voc_ppm: Math.round(vocT),
          bio_kohm: parseFloat(bioT.toFixed(2)),
          temp_c: parseFloat(tmp),
          wellness_score: score,
          verdict: ok ? 'Low Risk (Healthy)' : 'High Risk (Immediate Referral)',
          ai_notes: ok ? 'VOC normal, healthy bio-impedance' : 'Elevated VOC biomarkers detected, low tissue resistance',
          location: 'Rajasthan'
        });
      }
    }
  }, 110);
}

function setRing(score, reset = false) {
  const prog = document.getElementById('ring-progress');
  if (!prog) return;
  const circ = 326.7;
  prog.style.strokeDashoffset = reset ? circ : (circ - (score / 100) * circ);
}

function drawGraph() {
  const canvas = document.getElementById('sensor-graph');
  if (!canvas) return;
  const W = canvas.parentElement?.clientWidth || 720;
  const H = 180;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  // Grid lines
  ctx.save(); ctx.strokeStyle = 'rgba(128,160,200,0.06)'; ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) { const y = (i / 4) * H; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  ctx.restore();

  if (graphData.voc.length < 2) return;

  const drawLine = (data, maxV, color) => {
    const n = 28;
    const pts = data.map((v, i) => ({ x: (i / (n - 1)) * W, y: H - (v / maxV) * (H - 20) - 8 }));
    // Gradient fill
    ctx.save();
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, color + '44'); grad.addColorStop(1, color + '00');
    ctx.beginPath(); ctx.moveTo(pts[0].x, H);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(pts[pts.length - 1].x, H); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill(); ctx.restore();
    // Line
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    ctx.shadowBlur = 8; ctx.shadowColor = color;
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
    ctx.stroke(); ctx.restore();
    // Dot
    const last = pts[pts.length - 1];
    ctx.save(); ctx.fillStyle = color; ctx.shadowBlur = 12; ctx.shadowColor = color;
    ctx.beginPath(); ctx.arc(last.x, last.y, 4, 0, 6.28); ctx.fill(); ctx.restore();
  };

  const maxVoc = selectedSample === 'cancer' ? 1100 : 380;
  drawLine(graphData.voc, maxVoc, '#00e5cc');
  drawLine(graphData.bio.map(v => v * 100), 600, '#7c3aed');
}

// ═══════════════════════════════════════════
// 8. TOAST
// ═══════════════════════════════════════════
function showToast(msg, type = 'info') {
  const c = document.getElementById('toast-container'); if (!c) return;
  const t = document.createElement('div');
  const icons = { success:'✅', error:'❌', info:'ℹ️' };
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  c.appendChild(t);
  setTimeout(() => { t.style.transition = '0.3s'; t.style.opacity = '0'; t.style.transform = 'translateX(40px)'; setTimeout(() => t.remove(), 300); }, 3200);
}

// ═══════════════════════════════════════════
// 9. VOICE ALERTS
// ═══════════════════════════════════════════
const VOICE_MSGS = {
  en:'Your health screening is complete. Please consult a doctor for further guidance.',
  hi:'आपका स्वास्थ्य जांच पूरा हो गया है। कृपया डॉक्टर से मिलें।',
  ta:'உங்கள் சுகாதார பரிசோதனை முடிந்தது. தயவுசெய்து மருத்துவரை சந்திக்கவும்.',
  te:'మీ ఆరోగ్య పరీక్ష పూర్తయింది. దయచేసి డాక్టర్‌ని కలవండి.',
  kn:'ನಿಮ್ಮ ಆರೋಗ್ಯ ತಪಾಸಣೆ ಪೂರ್ಣಗೊಂಡಿದೆ. ದಯವಿಟ್ಟು ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.',
  ml:'നിങ്ങളുടെ ആരോഗ്യ പരിശോധന പൂർത്തിയായി. ദയവായി ഡോക്ടറെ കാണുക.',
  mr:'तुमची आरोग्य तपासणी पूर्ण झाली. कृपया डॉक्टरांना भेटा.',
  bn:'আপনার স্বাস্থ্য পরীক্ষা সম্পন্ন হয়েছে। অনুগ্রহ করে ডাক্তারের সাথে দেখা করুন।',
  gu:'તમારી આરોગ્ય તપાસ પૂર્ણ થઈ. કૃપા કરીને ડૉક્ટરને મળો.',
  pa:'ਤੁਹਾਡੀ ਸਿਹਤ ਜਾਂਚ ਪੂਰੀ ਹੋ ਗਈ। ਕਿਰਪਾ ਕਰਕੇ ਡਾਕਟਰ ਨੂੰ ਮਿਲੋ।',
  or:'ଆପଣଙ୍କ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ସମ୍ପୂର୍ଣ। ଦୟାକରି ଡାକ୍ତରଙ୍କୁ ଭେଟନ୍ତୁ।',
  ur:'آپ کی صحت کی جانچ مکمل ہو گئی۔ براہ کرم ڈاکٹر سے ملیں۔',
};
const LANG_BCP = { en:'en-IN', hi:'hi-IN', ta:'ta-IN', te:'te-IN', kn:'kn-IN', ml:'ml-IN', mr:'mr-IN', bn:'bn-IN', gu:'gu-IN', pa:'pa-IN', or:'or-IN', ur:'ur-PK' };

function playVoice(lang) {
  if (!window.speechSynthesis) { showToast('Voice not supported', 'error'); return; }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(VOICE_MSGS[lang] || VOICE_MSGS.en);
  u.lang = LANG_BCP[lang] || 'en-IN'; u.rate = 0.9; u.pitch = 1.1;
  const pl = document.getElementById('voice-playing');
  const pt = document.getElementById('voice-playing-text');
  if (pl) { pl.style.display = 'flex'; if (pt) pt.textContent = 'Playing ' + getFullName(lang) + '…'; }
  u.onend = u.onerror = () => { if (pl) pl.style.display = 'none'; };
  speechSynthesis.speak(u);
}
function closeVoiceModal() { document.getElementById('voice-modal').style.display = 'none'; speechSynthesis?.cancel(); }

// ═══════════════════════════════════════════
// 10. BACKEND API & SCREENING HISTORY (SQLite)
// ═══════════════════════════════════════════
const API_BASE = (window.location.protocol.startsWith('http') && window.location.port)
  ? `${window.location.origin}/api`
  : 'http://localhost:3001/api';

async function saveScreeningToBackend(token, data) {
  try {
    const res = await fetch(`${API_BASE}/screening`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      showToast('💾 Saved to encrypted SQLite patient record', 'success');
    }
  } catch (err) {
    console.warn('Screening save error:', err);
  }
}

function renderNavAuth() {
  const container = document.getElementById('nav-auth-wrap');
  if (!container) return;

  const rawUser = localStorage.getItem('mb-user');
  const token   = localStorage.getItem('mb-token');

  if (rawUser && token) {
    try {
      const user = JSON.parse(rawUser);
      const roleLabels = { asha: 'ASHA', home: 'Citizen', hospital: 'Clinical' };
      container.innerHTML = `
        <a href="dashboard.html" class="user-badge-pill" title="Go to Clinical Dashboard">
          <span>👤 ${user.name}</span>
          <span class="user-badge-role">${roleLabels[user.role] || user.role}</span>
        </a>
        <a href="dashboard.html" class="btn-nav-history" title="Open Clinical Dashboard">
          <span>📊 Dashboard</span>
        </a>
        <button class="btn-nav-logout" onclick="logout()" title="Sign Out">
          <span>Sign Out</span>
        </button>
      `;
      return;
    } catch (e) {}
  }

  // Not logged in: show sign in & get started buttons
  const t = T[currentLang] || T.en;
  container.innerHTML = `
    <a href="auth.html" class="btn-nav-ghost" data-key="nav_signin">${t.nav_signin || 'Sign In'}</a>
    <a href="auth.html" class="btn-nav-solid" data-key="nav_getstarted">${t.nav_getstarted || 'Get Started'}</a>
  `;
}

function logout() {
  localStorage.removeItem('mb-token');
  localStorage.removeItem('mb-user');
  renderNavAuth();
  showToast('Logged out successfully', 'info');
}

async function openHistoryModal() {
  const modal = document.getElementById('history-modal');
  const body  = document.getElementById('history-modal-body');
  if (!modal || !body) return;
  modal.style.display = 'flex';

  const token = localStorage.getItem('mb-token');
  if (!token) {
    body.innerHTML = `
      <div class="empty-history">
        <div class="empty-history-icon">🔒</div>
        <h4>Please sign in to view screening records</h4>
        <p style="margin: 10px 0 16px; font-size: 0.88rem;">Sign in with your ASHA Worker ID or Citizen account to access medical histories.</p>
        <a href="auth.html" class="btn-primary" style="display:inline-block;padding:8px 20px;border-radius:99px;font-size:0.85rem;">Sign In Now</a>
      </div>
    `;
    return;
  }

  body.innerHTML = '<div class="loading-state">Fetching encrypted records from SQLite…</div>';

  try {
    const res = await fetch(`${API_BASE}/screenings`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch records');
    const data = await res.json();
    const list = data.screenings || [];

    if (list.length === 0) {
      body.innerHTML = `
        <div class="empty-history">
          <div class="empty-history-icon">📂</div>
          <h4>No Screening Records Yet</h4>
          <p style="margin: 10px 0 18px; font-size: 0.88rem;">Run a test scan using the interactive simulator to record clinical data in your secure SQLite registry.</p>
          <button onclick="closeHistoryModal();document.getElementById('demo')?.scrollIntoView({behavior:'smooth'});" class="btn-primary" style="display:inline-block;padding:8px 20px;border-radius:99px;font-size:0.85rem;">Go to Live Demo</button>
        </div>
      `;
      return;
    }

    const rowsHtml = list.map(item => {
      const isBad = (item.verdict || '').toLowerCase().includes('high');
      const dateStr = item.screened_at ? new Date(item.screened_at + 'Z').toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      }) : 'Just now';
      return `
        <tr>
          <td><strong>${dateStr}</strong></td>
          <td><span class="history-pill ${item.sample_type}">${item.sample_type === 'healthy' ? 'Healthy Sample' : 'Risk Sample'}</span></td>
          <td>${item.voc_ppm} PPM</td>
          <td>${item.bio_kohm} kΩ</td>
          <td><span class="score-badge" style="color:${isBad ? 'var(--red-c)' : 'var(--green-c)'}">${item.wellness_score}/100</span></td>
          <td><span class="history-pill ${isBad ? 'cancer' : 'healthy'}">${item.verdict}</span></td>
        </tr>
      `;
    }).join('');

    body.innerHTML = `
      <table class="history-table">
        <thead>
          <tr>
            <th>Date & Time</th>
            <th>Sample Type</th>
            <th>VOC Gas</th>
            <th>Bio-Impedance</th>
            <th>Wellness Score</th>
            <th>AI Verdict</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
  } catch (err) {
    body.innerHTML = `<div class="empty-history" style="color:var(--red-c);"><p>⚠️ Error loading records from backend: ${err.message}</p></div>`;
  }
}

function closeHistoryModal() {
  const m = document.getElementById('history-modal');
  if (m) m.style.display = 'none';
}

// ═══════════════════════════════════════════
// 11. INIT
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(getTheme());
  setLang(currentLang);    // apply saved language on load
  renderNavAuth();         // render logged in user badge or sign in buttons
  drawGraph();
  console.log('%c🩺 MukhBODHITA — AI Oral Cancer Screening', 'color:#00e5cc;font-size:16px;font-weight:bold;');
});
