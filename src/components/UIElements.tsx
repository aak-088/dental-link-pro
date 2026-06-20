/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, Sparkles, Activity, AlertTriangle, CheckCircle, FileText, Stethoscope } from 'lucide-react';
import { AIAssessment, CaseStatus } from '../types';

interface StatusBadgeProps {
  status: CaseStatus;
  lang: 'en' | 'ar';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, lang }) => {
  const configs = {
    new: {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      en: "New Case",
      ar: "حالة جديدة"
    },
    under_review: {
      bg: "bg-amber-50 text-amber-700 border-amber-200",
      en: "Under Review",
      ar: "قيد المراجعة"
    },
    accepted: {
      bg: "bg-teal-50 text-teal-700 border-teal-200",
      en: "Accepted",
      ar: "مقبولة"
    },
    scheduled: {
      bg: "bg-blue-50 text-blue-700 border-blue-200",
      en: "Scheduled",
      ar: "مجدولة"
    },
    completed: {
      bg: "bg-gray-50 text-gray-700 border-gray-200",
      en: "Completed",
      ar: "مكتملة"
    }
  };

  const config = configs[status] || configs.new;

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${config.bg}`}>
      {lang === 'en' ? config.en : config.ar}
    </span>
  );
};

interface UrgencyBadgeProps {
  urgency: 'routine' | 'urgent' | 'emergency';
  lang: 'en' | 'ar';
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({ urgency, lang }) => {
  const configs = {
    routine: {
      bg: "bg-slate-100 text-slate-700 border-slate-200",
      en: "Routine",
      ar: "اعتيادي"
    },
    urgent: {
      bg: "bg-orange-50 text-orange-700 border-orange-200",
      en: "Urgent",
      ar: "عاجل"
    },
    emergency: {
      bg: "bg-rose-50 text-rose-700 border-rose-200",
      en: "Emergency",
      ar: "طارئ جداً"
    }
  };

  const config = configs[urgency] || configs.routine;

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${config.bg}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${urgency === 'emergency' ? 'bg-rose-500 animate-pulse' : urgency === 'urgent' ? 'bg-orange-500' : 'bg-slate-400'} mr-1.5 ml-1.5`}></span>
      {lang === 'en' ? config.en : config.ar}
    </span>
  );
};

// Custom interactive clinical radiograph mockup with bone loss and canal hotspots!
export const XRayVisualizer: React.FC<{
  type?: string;
  lang: 'en' | 'ar';
  interactive?: boolean;
}> = ({ type = "molar", lang, interactive = true }) => {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const hotspots = [
    {
      id: 1,
      x: "48%",
      y: "32%",
      enTitle: "Secondary Caries Under Restoration",
      arTitle: "تسوس ثانوي أسفل الحشوة التاجية",
      enDesc: "Marginal leakage detected. Radiolucency extending into the coronal dentin layer.",
      arDesc: "تسرب حوافي مكتشف. فرط الشفافية الإشعاعية يمتد إلى طبقة عاج الأسنان التاجية."
    },
    {
      id: 2,
      x: "38%",
      y: "58%",
      enTitle: "Mesiobuccal Canal Obstruction",
      arTitle: "انسداد في القناة الإنسية الدهليزية",
      enDesc: "Sclerotic calcification at mid-root level. Canal curvature estimated at 35°.",
      arDesc: "تكلس صلب في منتصف الجذر. تبلغ درجة انحناء القناة السنية حوالي ٣٥ درجة."
    },
    {
      id: 3,
      x: "44%",
      y: "85%",
      enTitle: "Periapical Radiolucency (Host)",
      arTitle: "منطقة شفافة إشعاعياً حول ذروة الجذر",
      enDesc: "Localized bone resorption (~3mm width) indicating symptomatic chronic apical lesion.",
      arDesc: "امتصاص عظمي موضعي بعرض ٣ مم يشير لآفة التهابية مزمنة أسفل الذروة."
    }
  ];

  return (
    <div className="relative bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-4 flex flex-col items-center">
      <div className="absolute top-3 left-3 flex items-center space-x-1.5 text-slate-400 text-[10px] font-mono z-10 select-none">
        <Activity className="h-3 w-3 text-emerald-500 animate-pulse" />
        <span>PANORAMIC_ZOOM_H101_ACTIVE</span>
      </div>
      <div className="absolute top-3 right-3 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px] text-emerald-400 font-mono z-10 shadow-lg">
        HIPAA ANONYMIZED
      </div>

      {/* SVG Stylized Radiograph Drawing */}
      <div className="relative w-full max-w-[280px] h-[220px] my-4 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-lg shadow-inner overflow-hidden select-none">
        
        {/* Radiograph background bones */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        {/* Soft radiographic glow */}
        <div className="absolute inset-x-6 bottom-4 top-24 bg-gradient-to-t from-slate-800/60 to-transparent rounded-full filter blur-xl"></div>

        {/* CSS Drawing of a Molar Tooth */}
        <svg viewBox="0 0 100 100" className="w-40 h-40 text-slate-200 fill-current drop-shadow-[0_0_15px_rgba(255,255,255,0.25)]">
          {/* Alveolar Bone Line */}
          <path d="M 0 75 Q 50 78 100 75 L 100 100 L 0 100 Z" fill="#2d3748" opacity="0.6"/>
          
          {/* Crown */}
          <path d="M 30 25 C 30 15, 70 15, 70 25 C 72 38, 68 45, 68 52 C 68 65, 60 70, 60 78 C 58 78, 56 68, 55 60 C 50 63, 45 60, 42 62 C 41 68, 38 78, 36 78 C 36 70, 28 65, 28 52 C 28 45, 30 38, 30 25 Z" fill="#e2e8f0" opacity="0.85"/>
          
          {/* Metallic restoration filling (high radiopacity!) */}
          <path d="M 40 20 C 40 18, 54 18, 54 20 C 56 25, 42 25, 40 20 Z" fill="#ffffff" opacity="0.95"/>
          
          {/* Root Canals (visible in clinical view) */}
          <path d="M 40 38 Q 38 52, 35 72" stroke="#4a5568" strokeWidth="2.5" fill="none" opacity="0.75" strokeLinecap="round"/>
          <path d="M 60 38 Q 63 52, 65 72" stroke="#4a5568" strokeWidth="2" fill="none" opacity="0.75" strokeLinecap="round"/>
          
          {/* Curvature on the mesial root */}
          <path d="M 35 72 Q 33 76, 29 80" stroke="#4a5568" strokeWidth="2.5" fill="none" opacity="0.75" strokeLinecap="round"/>
          
          {/* Bone resorption lesion (apical pathology) */}
          <circle cx="28" cy="81" r="5" fill="#1a202c" opacity="0.8" className="animate-pulse"/>
        </svg>

        {/* Hotspots */}
        {interactive && hotspots.map((hot) => (
          <button
            key={hot.id}
            onClick={() => setActiveHotspot(activeHotspot === hot.id ? null : hot.id)}
            style={{ left: hot.x, top: hot.y }}
            className={`absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center text-[10px] font-bold transition-all shadow-lg select-all cursor-pointer ${
              activeHotspot === hot.id 
                ? 'bg-emerald-500 text-white scale-110 ring-4 ring-emerald-950 animate-bounce' 
                : 'bg-white/80 text-slate-900 border border-slate-700 hover:bg-emerald-400 hover:text-white hover:scale-110'
            }`}
          >
            {hot.id}
          </button>
        ))}
      </div>

      {/* Hotspot details panel */}
      {interactive && (
        <div className="w-full mt-2 min-h-[60px] bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs">
          {activeHotspot !== null ? (
            <div>
              <div className="font-semibold text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block mr-1.5 ml-1.5"></span>
                <span>{lang === 'en' ? hotspots[activeHotspot - 1].enTitle : hotspots[activeHotspot - 1].arTitle}</span>
              </div>
              <p className="text-slate-400 mt-1 leading-relaxed">
                {lang === 'en' ? hotspots[activeHotspot - 1].enDesc : hotspots[activeHotspot - 1].arDesc}
              </p>
            </div>
          ) : (
            <p className="text-slate-500 text-center py-2 italic">
              {lang === 'en' 
                ? "💡 Click hotspots (1-3) on radiograph to analyze findings" 
                : "💡 اضغط على الأرقام (1-3) لتحليل موجودات التشخيص السريري"}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

// Premium, fully vector responsive inline dental stats charts!
export const InteractiveReferralChart: React.FC<{
  lang: 'en' | 'ar';
}> = ({ lang }) => {
  const isRtl = lang === 'ar';
  
  const stats = [
    { month: "Jan", arMonth: "يناير", sent: 4, received: 6 },
    { month: "Feb", arMonth: "فبراير", sent: 8, received: 11 },
    { month: "Mar", arMonth: "مارس", sent: 11, received: 9 },
    { month: "Apr", arMonth: "أبريل", sent: 14, received: 15 },
    { month: "May", arMonth: "مايو", sent: 16, received: 22 },
    { month: "Jun", arMonth: "يونيو", sent: 18, received: 24 }
  ];

  const maxVal = 25;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            {lang === 'en' ? "Clinical Referral Growth" : "معدل زيادة الإحالات السريرية"}
          </h4>
          <p className="text-xs text-slate-500">
            {lang === 'en' ? "Consolidated 6-Month activity stream" : "أداء النشاط الموحد لمدة ٦ أشهر قادمة"}
          </p>
        </div>
        <div className="flex items-center space-x-3 text-xs font-medium">
          <div className="flex items-center space-x-1.5 mr-2 ml-2">
            <span className="w-3 h-3 rounded bg-emerald-700 inline-block"></span>
            <span>{lang === 'en' ? "Outbound GPs" : "الصادرة من الأطباء"}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3 h-3 rounded bg-emerald-400 inline-block"></span>
            <span>{lang === 'en' ? "Inbound Specialist" : "الواردة للأخصائيين"}</span>
          </div>
        </div>
      </div>

      {/* Manual Responsive SVG Bar Chart */}
      <div className="h-44 w-full flex items-end justify-between pt-4 pb-2 px-1 border-b border-slate-200">
        {stats.map((item, idx) => {
          const sentHeight = (item.sent / maxVal) * 100;
          const recHeight = (item.received / maxVal) * 100;

          return (
            <div key={idx} className="flex flex-col items-center flex-1 mx-2 group">
              <div className="w-full flex justify-center items-end space-x-1 h-32 relative">
                {/* Tooltip on Hover */}
                <div className="absolute -top-10 bg-slate-900 text-white rounded text-[10px] px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap shadow-md">
                  {lang === 'en' 
                    ? `Sent: ${item.sent} | Rec: ${item.received}` 
                    : `صادرة: ${item.sent} | واردة: ${item.received}`}
                </div>

                {/* Sent bar */}
                <div 
                  style={{ height: `${sentHeight}%` }} 
                  className="w-3.5 bg-emerald-700 rounded-t-sm hover:opacity-90 transition-all duration-300"
                ></div>
                {/* Received bar */}
                <div 
                  style={{ height: `${recHeight}%` }} 
                  className="w-3.5 bg-emerald-400 rounded-t-sm hover:opacity-90 transition-all duration-300"
                ></div>
              </div>
              <span className="text-[10px] font-medium text-slate-500 mt-2 select-none">
                {isRtl ? item.arMonth : item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// HIPAA Compliant Real-time Patient Verification Queue & Trust badge!
export const HIPAASecurityNotice: React.FC<{
  lang: 'en' | 'ar';
}> = ({ lang }) => {
  return (
    <div className="bg-emerald-950/10 border border-emerald-900/20 rounded-xl p-4 flex items-start space-x-3 text-emerald-800">
      <Shield className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5 mr-2 ml-2" />
      <div>
        <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
          {lang === 'en' ? "Encrypted HIPAA Compliance Locker" : "الخزانة الطبية المؤمنة المشفرة HIPAA"}
        </h5>
        <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
          {lang === 'en' 
            ? "Patient data is fully anonymized. Names are truncated to protective initials according to strict health security guidelines. Clinical files (X-rays, CBCT) employ AES-256 end-to-end encryption. Zero advertising or data brokers access is permitted on DentLink Pro."
            : "بيانات المريض مجهولة الهوية بالكامل. يتم تقصير الأسماء إلى الأحرف الأولى للحماية طبقًا لإرشادات أمن المعلومات الصحية. تستخدم ملفات الأشعة (X-ray, CBCT) تشفيراً كاملاً من طرف إلى طرف AES-256. لا يُسمح بتبادل بيانات المرضى أبداً."}
        </p>
      </div>
    </div>
  );
};
