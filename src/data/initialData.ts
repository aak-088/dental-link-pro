/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { UserProfile, DentalCase, StudentCase, VerificationRequest, AuditLog } from '../types';

export const mockUsers: UserProfile[] = [
  {
    id: "gp_1",
    name: "Dr. Sarah Al-Otaibi",
    arName: "د. سارة العتيبي",
    role: "gp",
    avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=120",
    email: "s.otaibi@dentlink.pro",
    phone: "+966 50 123 4567",
    city: "Riyadh",
    arCity: "الرياض",
    clinicName: "Riyadh Family Dentistry",
    arClinicName: "عيادات عائلتي لطب الأسنان",
    verified: true,
    licenseNumber: "GP-2024-88910",
    referralStats: {
      totalSent: 18,
      totalReceived: 0,
      accepted: 14,
      completed: 12,
      avgResponseTime: "1.4 hours",
      arAvgResponseTime: "١.٤ ساعة"
    }
  },
  {
    id: "spec_1",
    name: "Dr. Tariq Al-Mansoor",
    arName: "د. طارق المنصور",
    role: "specialist",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120",
    email: "t.mansoor@dentlink.pro",
    phone: "+966 55 987 6543",
    city: "Riyadh",
    arCity: "الرياض",
    specialty: "Endodontics",
    arSpecialty: "علاج عصب الأسنان",
    experience: 12,
    rating: 4.9,
    clinicName: "Al-Mada Specialized Center",
    arClinicName: "مركز المدى التخصصي لطب الأسنان",
    verified: true,
    licenseNumber: "SPEC-2015-44321",
    casesCompleted: 345,
    referralStats: {
      totalSent: 0,
      totalReceived: 42,
      accepted: 38,
      completed: 35,
      avgResponseTime: "45 minutes",
      arAvgResponseTime: "٤٥ دقيقة"
    }
  },
  {
    id: "spec_2",
    name: "Dr. Reem Al-Sudairy",
    arName: "د. ريم السديري",
    role: "specialist",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120",
    email: "r.sudairy@dentlink.pro",
    phone: "+966 56 321 0987",
    city: "Jeddah",
    arCity: "جدة",
    specialty: "Orthodontics",
    arSpecialty: "تقويم الأسنان",
    experience: 8,
    rating: 4.8,
    clinicName: "Red Sea Dental Group",
    arClinicName: "مجموعة البحر الأحمر لطب الأسنان",
    verified: true,
    licenseNumber: "SPEC-2018-99014",
    casesCompleted: 198,
    referralStats: {
      totalSent: 0,
      totalReceived: 21,
      accepted: 19,
      completed: 16,
      avgResponseTime: "2.1 hours",
      arAvgResponseTime: "٢.١ ساعة"
    }
  },
  {
    id: "stud_1",
    name: "Yousef Al-Ahmad",
    arName: "يوسف الأحمد",
    role: "student",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120",
    email: "yousef.ahmad@student.reu.edu.sa",
    phone: "+966 54 444 8822",
    city: "Riyadh",
    arCity: "الرياض",
    university: "Riyadh Elm University",
    arUniversity: "جامعة الرياض العلم",
    verified: true,
    studentStats: {
      points: 1450,
      tier: "Gold",
      arTier: "الذهبي",
      verifiedCases: 6
    }
  },
  {
    id: "clinic_1",
    name: "Rayan Al-Mutairi",
    arName: "ريان المطيري",
    role: "clinic",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120",
    email: "r.mutairi@elixirdental.com",
    phone: "+966 11 405 9999",
    city: "Riyadh",
    arCity: "الرياض",
    clinicName: "Elixir Dental Center",
    arClinicName: "مركز إكسير لطب الأسنان",
    verified: true,
    licenseNumber: "CL-99081-RYD"
  },
  {
    id: "pat_1",
    name: "Layan Al-Harbi",
    arName: "ليان الحربي",
    role: "patient",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120",
    email: "layan.harbi@gmail.com",
    phone: "+966 53 777 6611",
    city: "Riyadh",
    arCity: "الرياض",
    verified: true
  },
  {
    id: "admin_1",
    name: "DentLink Admin Portal",
    arName: "إدارة دنت لينك بروّ",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120",
    email: "admin@dentlink.pro",
    phone: "+966 11 888 8888",
    city: "Riyadh",
    arCity: "الرياض",
    verified: true
  }
];

export const initialCases: DentalCase[] = [
  {
    id: "case_101",
    patientInitials: "A. S.",
    patientAge: 42,
    patientGender: "M",
    arPatientGender: "ذكر",
    dentistId: "gp_1",
    specialistId: "spec_1",
    dentistName: "Dr. Sarah Al-Otaibi",
    specialistName: "Dr. Tariq Al-Mansoor",
    diagnosis: "Irreversible Pulpitis with symptomatic apical periodontitis in tooth #36 (Lower Left First Molar). Extremely curved canals (~35 degrees) visible in buccal view. Previous unsuccessful pulpotomy attempt.",
    arDiagnosis: "التهاب عصب غير رجعي مع التهاب رباط حول ذروي مؤلم في السن رقم ٣٦ (الرحى الأولى السفلية اليسرى). انحناء شديد في القنوات العصبية (~٣٥ درجة) واضح في المعاينة الدهليزية. محاولة سابقة غير ناجحة لاستئصال العصب التاجي.",
    treatmentPlan: "Complete non-surgical root canal therapy (RCT) of tooth #36 under high-magnification dental microscope. Overcoming internal calcification and dynamic curvature. Backfill obturation with Gutta-percha and bioceramic sealer.",
    arTreatmentPlan: "علاج عصب غير جراحي كامل للسن رقم ٣٦ باستخدام المجهر السني للتكبير العالي. تخطي التكلس الداخلي والانحناء الصعب. حشو القنوات عمودياً بالجوتا بيرشا ومادة السداد الحيوية (bioceramic).",
    status: "accepted",
    createdAt: "2026-06-18T14:30:00Z",
    xrays: ["molar_curved_canal"],
    cbct: ["axial_slice_molar_cbct"],
    urgency: "urgent",
    arUrgency: "عاجلة",
    auditLogs: [
      {
        id: "log_1",
        action: "Case Created & Referred",
        arAction: "تم إنشاء القضية وإحالتها",
        timestamp: "2026-06-18T14:30:00Z",
        userId: "gp_1",
        userName: "Dr. Sarah Al-Otaibi",
        ipAddress: "192.168.1.104",
        details: "G.P. referred Case ID case_101 for Specialist consultation, uploading 2 radiographs",
        arDetails: "قام الطبيب العام بإحالة القضية رقم ١٠١ لاستشارة الأخصائي، ورفع صورتين إشعاعيتين"
      },
      {
        id: "log_2",
        action: "Case Diagnostic Assessment Updated",
        arAction: "تحديث التقييم التشخيصي",
        timestamp: "2026-06-18T17:15:00Z",
        userId: "spec_1",
        userName: "Dr. Tariq Al-Mansoor",
        ipAddress: "192.168.22.18",
        details: "Specialist accepted case with status: accepted, scheduling assessment",
        arDetails: "قبل الأخصائي الإحالة وغير الحالة إلى: مقبولة، جاري التنسيق للزيارة"
      }
    ],
    messages: [
      {
        id: "msg_1",
        senderId: "gp_1",
        senderName: "Dr. Sarah Al-Otaibi",
        senderRole: "gp",
        content: "Please review the apex curvatures closely. The mesiobuccal canal was highly calcified, and I did not want to risk instrument separation.",
        timestamp: "2026-06-18T14:32:00Z"
      },
      {
        id: "msg_2",
        senderId: "spec_1",
        senderName: "Dr. Tariq Al-Mansoor",
        senderRole: "specialist",
        content: "I review the radiograph. It is a classic 35-degree curved mesial root. I will use specialized NiTi rotary files under microscope representation to bypass the blockage safely. Well noted.",
        timestamp: "2026-06-18T17:13:00Z"
      }
    ],
    aiAssessment: {
      difficulty: "High",
      arDifficulty: "عالية جداً",
      riskLevel: "Moderate",
      arRiskLevel: "متوسطة",
      suggestedSpecialty: "Endodontics",
      arSuggestedSpecialty: "علاج عصب الأسنان",
      insights: [
        "Canal Curvature exceeds 30 degrees (R-type Curve in mesial root of #36), increasing standard instrument breakage risk by 40%.",
        "Moderate crown calcification indicates risk of pulp floor perforation if conventional gates glidden are used.",
        "Anatomical proximity to mandibular canal is normal; low direct neural risk."
      ],
      arInsights: [
        "انحناء القناة يتجاوز ٣٠ درجة (انحناء من النوع R في الجذر الإنسي للسن ٣٦)، مما يضاعف خطر كسر المبارد الطبية بنسبة ٤٠٪.",
        "تظهر تكلسات متوسطة في التاج، مما يزيد خطر انثقاب قاع الحجرة السنية في حال الحفر البدائي.",
        "المسافة التشريحية للقناة السنخية السفلية طبيعية ومأمونة تماماً."
      ],
      suggestedTreatmentSteps: [
        "Achieve coronal glide path manually using small C-Pilot files (#08, #10) with EDTA gel.",
        "Perform mechanical rotary preparation with controlled-memory (CM) NiTi files at 300 RPM.",
        "Apply 5.25% Sodium Hypochlorite activation via continuous ultrasonic irrigation (CUI)."
      ],
      arSuggestedTreatmentSteps: [
        "بناء مسار الانزلاق الإكليلي يدوياً باستخدام مبارد صغيرة الحجم (رقم ٨ ورقم ١٠) مع تشحيم بالـ EDTA.",
        "التوسيع الميكانيكي الدوار باستخدام مبارد النيكل تيتانيوم المعالجة حرارياً بمرونة فائقة.",
        "تنشيط غسول هيبوكلوريت الصوديوم بتركيز ٥.٢٥٪ بالموجات فوق الصوتية المستمرة."
      ],
      recommendedSpecialists: ["Dr. Tariq Al-Mansoor", "Dr. Faisal Al-Shammari"]
    }
  },
  {
    id: "case_102",
    patientInitials: "H. M.",
    patientAge: 14,
    patientGender: "F",
    arPatientGender: "أنثى",
    dentistId: "gp_1",
    specialistId: "spec_2",
    dentistName: "Dr. Sarah Al-Otaibi",
    specialistName: "Dr. Reem Al-Sudairy",
    diagnosis: "Severe skeletal Class II malocclusion, mandibular hypoplasia, anterior dental crowding of 6mm in maxillary arch.",
    arDiagnosis: "سوء إطباق هيكلي من الصنف الثاني شديد، ضمور بالفك السفلي، وتزاحم سني أمامي بمقدار ٦ مم في القوس السنية العلوية.",
    treatmentPlan: "Comprehensive two-phase orthodontic treatment. Growth modification using a Twin-Block appliance followed by fixed pre-adjusted edgewise metal brackets.",
    arTreatmentPlan: "علاج تقويم جهازي ثنائي المراحل. تعديل اتجاه نمو الفك السفلي بجهاز Twin-Block يليه تقويم معدني ثابت.",
    status: "new",
    createdAt: "2026-06-19T09:00:00Z",
    xrays: ["cephalometric_joint"],
    urgency: "routine",
    arUrgency: "اعتيادية",
    auditLogs: [
      {
        id: "log_3",
        action: "Case Creation & Referral Dispatch",
        arAction: "تم إنشاء القضية وإرسال الإحالة",
        timestamp: "2026-06-19T09:00:00Z",
        userId: "gp_1",
        userName: "Dr. Sarah Al-Otaibi",
        ipAddress: "192.168.1.104",
        details: "Referral case created and routed securely to orthdontist Dr. Reem Al-Sudairy",
        arDetails: "تم صياغة ملف الإحالة الرقمي وإرساله إلى أخصائية التقويم د. ريم السديري"
      }
    ],
    messages: [],
    aiAssessment: {
      difficulty: "Moderate",
      arDifficulty: "متوسطة الصعوبة",
      riskLevel: "Low",
      arRiskLevel: "منخفضة",
      suggestedSpecialty: "Orthodontics",
      arSuggestedSpecialty: "تقويم الأسنان",
      insights: [
        "Patient age (14 years) is at peak adolescent growth spurt, perfect clinical timing for mandibular growth modification.",
        "6mm crowding can likely be resolved without primary premolar extractions if interproximal reduction or arch expansion is performed."
      ],
      arInsights: [
        "عمر المريض (١٤ سنة) يقع في طفرة النمو المثالية للمراهقة، وهو التوقيت الأنسب طبيعياً لتعديل وتنشيط نمو الفك.",
        "التزاحم بمقدار ٦ مم يمكن علاجه دون الحاجة لخلع الضواحك العلوية عبر توسيع الفك المدروس."
      ],
      suggestedTreatmentSteps: [
        "Record high-resolution clinical intraoral and extraoral portrait photos.",
        "Design and construct twin-block functional orthodontic appliance.",
        "Schedule regular activation evaluations every 4-6 weeks to check skeletal progression."
      ],
      arSuggestedTreatmentSteps: [
        "توثيق صور فوتوغرافية سريرية داخل وخارج الفم عالية الدقة.",
        "تصميم وبناء جهاز التوريد الوظيفي المزدوج (Twin-Block).",
        "تنسيق تقييمات التنشيط المنتظمة كل ٤-٦ أسابيع لمتابعة التقدم الهيكلي."
      ],
      recommendedSpecialists: ["Dr. Reem Al-Sudairy", "Dr. Khaled Al-Nasser"]
    }
  }
];

export const initialStudentCases: StudentCase[] = [
  {
    id: "stud_case_1",
    studentId: "stud_1",
    studentName: "Yousef Al-Ahmad",
    university: "Riyadh Elm University",
    title: "Apexification case of immature non-vital maxillary central incisor #11",
    arTitle: "علاج استثارة نمو الذروة (Apexification) للقاطع المركزي العلوي الفتي وغير الحيوي رقم ١١",
    description: "I am presenting a case study of an 8-year-old child with a traumatized dental crown resulting in a wide-open apex and pulp necrosis. We utilized Mineral Trioxide Aggregate (MTA) apical plug technique (4mm barrier) followed by root canal obturation with thermoplasticized gutta-percha and composite build-up.",
    arDescription: "أقدم دراسة مخصصة لطفل بعمر ٨ سنوات تعرض لرضة سنيّة في السن رقم ١١ أدت لتوقف نمو الذروة المفتوحة وموت عصب السن. تم استخدام سدادة ذروية بمادة MTA (حاجز ٤ مم) ثم حشو القناة السنية بمادة الجوتا بيرشا الملدنة حرارياً وبناء السن الكومبوزيت.",
    image: "https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=300",
    upvotes: 34,
    createdAt: "2026-06-17T11:00:00Z",
    tags: ["Apexification", "MTA Barrier", "Endodontics", "Trauma"],
    comments: [
      {
        id: "c_1",
        author: "Dr. Tariq Al-Mansoor",
        role: "specialist",
        arRole: "أخصائي استشاري",
        content: "Outstanding implementation of the MTA barrier depth, Yousef! Your radiograph demonstrates exceptionally clean condensation. Did you use an internal matrix or collagen sponge to control the apical extrusion of MTA?",
        timestamp: "2026-06-17T16:45:00Z",
        isVerifiedSpecialist: true
      },
      {
        id: "c_2",
        author: "Yousef Al-Ahmad",
        role: "student",
        arRole: "طالب أسنان",
        content: "Thank you Dr. Tariq! Yes, I used a absorbable collagen sponge matrix (CollaPlug) to prevent extrusion since the apical diameter was around 2.5mm. It worked efficiently.",
        timestamp: "2026-06-17T19:10:00Z",
        isVerifiedSpecialist: false
      }
    ]
  },
  {
    id: "stud_case_2",
    studentId: "stud_2",
    studentName: "Mona Al-Qahtani",
    university: "King Saud University",
    title: "Anesthetic management of full-arch cosmetic rehabilitation cases",
    arTitle: "الإدارة الدوائية للتخدير وتدبير الألم في حالات إعادة تأهيل الابتسامة التجميلية الكاملة",
    description: "In this case study, we utilized a combination of local anesthetic techniques (lingual infiltration + bilateral infraorbital block) to achieve maximum patient comfort with minimum epinephrine doses during a 10-unit porcelain laminate veneers preparation.",
    arDescription: "في هذه الدراسة العلمية، استخدمنا مزيجاً ذكياً من تقنيات التخدير الموضعي (حقن الحنك الإضافي والمحاقن الثنائية) لضمان أعلى مستويات الطمأنينة للمركب دون جرعات عالية من الأدرينالين خلال تحضير ١٠ عدسات خزفية تجميلية.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=300",
    upvotes: 18,
    createdAt: "2026-06-19T15:20:00Z",
    tags: ["Aesthetics", "Anesthesia", "Veneers", "Prosthodontics"],
    comments: [
      {
        id: "c_3",
        author: "Dr. Sarah Al-Otaibi",
        role: "gp",
        arRole: "طبيبة أسنان عامة",
        content: "Excellent technique Mona. Post-operative sensitivity is indeed minimized when epinephrine levels and soft tissues are treated conservatively.",
        timestamp: "2026-06-19T18:00:00Z",
        isVerifiedSpecialist: false
      }
    ]
  }
];

export const mockVerificationRequests: VerificationRequest[] = [
  {
    id: "vr_1",
    userId: "spec_temp_1",
    dentistName: "Dr. Khaled Al-Nasser",
    arDentistName: "د. خالد الناصر",
    role: "specialist",
    licenseNumber: "SPEC-2019-89772",
    nationalID: "1098822104",
    university: "Dammam University",
    certificateUrl: "board_certificate_msc.jpg",
    submittedAt: "2026-06-19T20:10:00Z",
    status: "pending"
  },
  {
    id: "vr_2",
    userId: "gp_temp_2",
    dentistName: "Dr. Fatimah Al-Saeed",
    arDentistName: "د. فاطمة السعيد",
    role: "gp",
    licenseNumber: "GP-2022-77123",
    nationalID: "1044439103",
    university: "King Abdulaziz University",
    certificateUrl: "dentistry_degree_bds.jpg",
    submittedAt: "2026-06-20T08:15:00Z",
    status: "pending"
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: "al_1",
    action: "User Authentication",
    arAction: "المصادقة وتأكيد الهوية",
    timestamp: "2026-06-20T10:01:00Z",
    userId: "gp_1",
    userName: "Dr. Sarah Al-Otaibi",
    ipAddress: "192.168.1.104",
    details: "User successfully authenticated onto DentLink Pro system. Active secure token created.",
    arDetails: "قام المستخدم د. سارة بتسجيل دخول ناجح إلى دنت لينك برو. تم إنشاء رمز وصول مشفر."
  },
  {
    id: "al_2",
    action: "Radiograph Medical Document Retrieval",
    arAction: "تحميل واستعراض صور الأشعة التشخيصية",
    timestamp: "2026-06-20T10:03:15Z",
    userId: "spec_1",
    userName: "Dr. Tariq Al-Mansoor",
    ipAddress: "192.168.22.18",
    details: "Specialist retrieved radiographic files for Case #case_101. Fully audited under HIPAA requirements.",
    arDetails: "قام الأخصائي المشخص باستعراض صور الأشعة الرقمية للمريض في القضية رقم ١٠١. عملية مراقبة تحت قوانين HIPAA."
  },
  {
    id: "al_3",
    action: "Academic badging dispatch",
    arAction: "منح شارة أكاديمية للطالب للتميز",
    timestamp: "2026-06-19T16:00:00Z",
    userId: "admin_1",
    userName: "System Admin",
    ipAddress: "127.0.0.1",
    details: "System automated cron dispatched Gold Badges to الطالب Yousef Al-Ahmad for 1,400+ clinical learning points.",
    arDetails: "أرسل نظام المكافآت التلقائي شارة التميز الأكاديمي للطالب يوسف لتجاوز نقاطة ١٤٠٠ نقطة علمية."
  }
];

// List of all specialists for discovery
export interface SpecialistSearchItem {
  id: string;
  name: string;
  arName: string;
  avatar: string;
  specialty: string;
  arSpecialty: string;
  city: string;
  arCity: string;
  experience: number;
  rating: number;
  reviewsCount: number;
  languages: string[];
  arLanguages: string[];
  availability: 'Immediate' | 'Next 48 Hours' | 'Within a Week';
  arAvailability: string;
  clinic: string;
  arClinic: string;
}

export const mockSpecialists: SpecialistSearchItem[] = [
  {
    id: "spec_1",
    name: "Dr. Tariq Al-Mansoor",
    arName: "د. طارق المنصور",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120",
    specialty: "Endodontics",
    arSpecialty: "علاج عصب الأسنان",
    city: "Riyadh",
    arCity: "الرياض",
    experience: 12,
    rating: 4.9,
    reviewsCount: 142,
    languages: ["English", "Arabic"],
    arLanguages: ["العربية", "الإنجليزية"],
    availability: "Immediate",
    arAvailability: "متاح فوراً",
    clinic: "Al-Mada Specialized Center",
    arClinic: "مركز المدى التخصصي"
  },
  {
    id: "spec_2",
    name: "Dr. Reem Al-Sudairy",
    arName: "د. ريم السديري",
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=120",
    specialty: "Orthodontics",
    arSpecialty: "تقويم الأسنان",
    city: "Jeddah",
    arCity: "جدة",
    experience: 8,
    rating: 4.8,
    reviewsCount: 96,
    languages: ["English", "Arabic", "French"],
    arLanguages: ["العربية", "الإنجليزية", "الفرنسية"],
    availability: "Next 48 Hours",
    arAvailability: "خلال ٤٨ ساعة",
    clinic: "Red Sea Dental Group",
    arClinic: "مجموعة البحر الأحمر للأسنان"
  },
  {
    id: "spec_3",
    name: "Dr. Faisal Al-Shammari",
    arName: "د. فيصل الشمري",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=120",
    specialty: "Oral Surgery",
    arSpecialty: "جراحة الفم والفكين",
    city: "Riyadh",
    arCity: "الرياض",
    experience: 15,
    rating: 5.0,
    reviewsCount: 220,
    languages: ["English", "Arabic"],
    arLanguages: ["العربية", "الإنجليزية"],
    availability: "Next 48 Hours",
    arAvailability: "خلال ٤٨ ساعة",
    clinic: "Elite Medical Hospital",
    arClinic: "مستشفى مجمع النخبة الطبي"
  },
  {
    id: "spec_4",
    name: "Dr. Khaled Al-Nasser",
    arName: "د. خالد الناصر",
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=120",
    specialty: "Implantology",
    arSpecialty: "زراعة الأسنان",
    city: "Dammam",
    arCity: "الدمام",
    experience: 10,
    rating: 4.7,
    reviewsCount: 88,
    languages: ["English", "Arabic"],
    arLanguages: ["العربية", "الإنجليزية"],
    availability: "Within a Week",
    arAvailability: "خلال هذا الأسبوع",
    clinic: "Arabian Gulf Dental Clinic",
    arClinic: "عيادة الخليج العربي للأسنان"
  },
  {
    id: "spec_5",
    name: "Dr. Hind Al-Majed",
    arName: "د. هند الماجد",
    avatar: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=120",
    specialty: "Pediatric Dentistry",
    arSpecialty: "طب أسنان الأطفال",
    city: "Riyadh",
    arCity: "الرياض",
    experience: 9,
    rating: 4.9,
    reviewsCount: 112,
    languages: ["English", "Arabic"],
    arLanguages: ["العربية", "الإنجليزية"],
    availability: "Immediate",
    arAvailability: "متاح فوراً",
    clinic: "Bright Smile Kids Center",
    arClinic: "مركز الابتسامة المشرقة للأطفال"
  }
];
