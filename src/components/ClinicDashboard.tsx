/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { translations } from '../data/translations';
import { UserProfile, DentalCase } from '../types';
import { Users, LayoutGrid, BarChart2, CheckCircle, RefreshCw, Activity, ArrowRight } from 'lucide-react';

interface ClinicDashboardProps {
  lang: 'en' | 'ar';
  activeUser: UserProfile;
  cases: DentalCase[];
  onUpdateCase: (updatedCase: DentalCase) => void;
}

export const ClinicDashboard: React.FC<ClinicDashboardProps> = ({
  lang,
  activeUser,
  cases,
  onUpdateCase
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const [staff, setStaff] = useState([
    { id: "dent_1", name: "Dr. Lulwa Al-Sheddi", role: "Resident Endodontist", capacity: "85%", activeCases: 4 },
    { id: "dent_2", name: "Dr. Majed Sulaiman", role: "General Practitioner", capacity: "40%", activeCases: 1 },
    { id: "dent_3", name: "Dr. Sultan Al-Onazi", role: "Pediatric Orthodontist", capacity: "95%", activeCases: 7 }
  ]);

  const [selectedCaseId, setSelectedCaseId] = useState('');
  const [selectedDentistId, setSelectedDentistId] = useState('');

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCaseId || !selectedDentistId) return;

    const targetCase = cases.find(c => c.id === selectedCaseId);
    const targetStaff = staff.find(s => s.id === selectedDentistId);
    if (!targetCase || !targetStaff) return;

    const updated: DentalCase = {
      ...targetCase,
      status: 'accepted',
      treatmentPlan: `${targetCase.treatmentPlan}\n[Assigned Clinician: ${targetStaff.name}]`,
      auditLogs: [
        ...targetCase.auditLogs,
        {
          id: "log_" + Math.floor(Math.random() * 1000),
          action: "Internal Staff Allocation",
          arAction: "توزيع الكادر الطبي",
          timestamp: new Date().toISOString(),
          userId: activeUser.id,
          userName: activeUser.name,
          ipAddress: "192.168.10.4",
          details: `Clinic Manager assigned case to practitioner ${targetStaff.name}`,
          arDetails: `قام مدير العيادة بتعيين الحالة للطبيب المعالج ${targetStaff.name}`
        }
      ]
    };

    onUpdateCase(updated);
    alert(lang === 'en' ? `Case successfully assigned to ${targetStaff.name}` : `تم تكليف الطبيب ${targetStaff.name} بمتابعة الحالة.`);
    setSelectedCaseId('');
    setSelectedDentistId('');
  };

  return (
    <div className={`py-6 px-6 max-w-7xl mx-auto ${isRtl ? 'direction-rtl' : 'direction-ltr'}`}>
      
      {/* Header */}
      <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
        {t.clinicManagerTitle}
      </h1>
      <p className="text-xs text-slate-500 mb-8">
        {lang === 'en' ? `Clinic Admin: ${activeUser.name} - ${activeUser.clinicName}` : `مدير التشغيل: ${activeUser.arName} - ${activeUser.arClinicName}`}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Assign Clinicians */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center">
              <LayoutGrid className="h-4 w-4 mr-1.5 ml-1.5 text-emerald-700" />
              <span>{t.allocationTitle}</span>
            </h3>

            <form onSubmit={handleAssign} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  {lang === 'en' ? "Select Referral Case File" : "اختر الحالة السريرية المعلقة"}
                </label>
                <select
                  value={selectedCaseId}
                  onChange={(e) => setSelectedCaseId(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:border-[#00674F]"
                >
                  <option value="">-- Choose Patient Case --</option>
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>{c.patientInitials} ({c.id}) - Urgency: {c.urgency}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  {lang === 'en' ? "Allocate to Staff Clinician" : "تكليف الطبيب المختص"}
                </label>
                <select
                  value={selectedDentistId}
                  onChange={(e) => setSelectedDentistId(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:border-[#00674F]"
                >
                  <option value="">-- Choose Clinician Dentist --</option>
                  {staff.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#00674F] hover:bg-[#00503D] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                {lang === 'en' ? "Dispatch Task Assignment" : "تأكيد التكليف وإرسال الملف"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Capacity & Staff grids */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Clinician Staff Grid */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.clinicianStaff}</h4>
              <span className="px-2 py-0.5 text-[10px] bg-[#001712] text-[#00B88A] rounded-full font-bold">{staff.length} {t.staffCount}</span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {staff.map((s) => (
                <div key={s.id} className="p-4 flex justify-between items-center hover:bg-slate-50/50">
                  <div>
                    <span className="font-bold text-slate-900 block">{s.name}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">{s.role}</span>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">{lang === 'en' ? "Chair Capacity used" : "إشغال كرسي الأسنان"}</span>
                      <span className="font-bold text-[#00674F] text-xs">{s.capacity}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">{lang === 'en' ? "Active Cases" : "الحالات الفاعلة"}</span>
                      <span className="font-bold text-slate-700 text-xs">{s.activeCases}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Capacity Notice */}
          <div className="bg-teal-950/10 border border-teal-905/30 rounded-xl p-4 flex items-center justify-between text-teal-900 text-xs">
            <div className="flex items-center space-x-3">
              <Activity className="h-5 w-5 text-[#00674F] animate-pulse mr-2 ml-2" />
              <div>
                <span className="font-bold block">{lang === 'en' ? "Optimal Scheduling recommendation" : "توصية التشغيل الفاعل لكراسي العيادة"}</span>
                <span className="text-slate-500 text-[11px] block mt-0.5">{lang === 'en' ? "Weekly dental chair occupation is at 74%. Free blocks available tomorrow at 10 AM." : "معدل إشغال العيادة الأسبوعي حالياً هو ٧٤٪. الأوقات الشاغرة غداً تبدأ من العاشرة صباحاً."}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
