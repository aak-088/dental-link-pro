/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { translations } from '../data/translations';
import { UserProfile, DentalCase } from '../types';
import { mockSpecialists } from '../data/initialData';
import { Calendar, Stethoscope, Search, Clock, MapPin, CheckCircle, Smartphone } from 'lucide-react';

interface PatientDashboardProps {
  lang: 'en' | 'ar';
  activeUser: UserProfile;
  cases: DentalCase[];
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  lang,
  activeUser,
  cases
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const [bookingSpecId, setBookingSpecId] = useState('');
  const [bookingDate, setBookingDate] = useState('');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingSpecId || !bookingDate) return;

    const spec = mockSpecialists.find(s => s.id === bookingSpecId);
    if (!spec) return;

    alert(lang === 'en' 
      ? `Booking request successfully sent to ${spec.name} for ${bookingDate}. Dental clinic will call to confirm.` 
      : `تم إرسال طلب الحجز المبدئي للاستشاري ${spec.arName} ليوم ${bookingDate}. ستصلك مكالمة تأكيد وتذكير.`);
    setBookingSpecId('');
    setBookingDate('');
  };

  return (
    <div className={`py-6 px-6 max-w-7xl mx-auto ${isRtl ? 'direction-rtl' : 'direction-ltr'}`}>
      
      {/* Header */}
      <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-1">
        {t.patientDashboardTitle}
      </h1>
      <p className="text-xs text-slate-500 mb-8">
        {lang === 'en' ? `Welcome back, ${activeUser.name}` : `مرحباً بك مجدداً، ${activeUser.arName}`}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Request consultations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 mb-4 pb-2 border-b border-slate-100 flex items-center">
              <Calendar className="h-4 w-4 mr-1.5 ml-1.5 text-emerald-700" />
              <span>{t.requestAppointment}</span>
            </h3>

            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  {lang === 'en' ? "Choose Preferred Specialist" : "اختر دكتور الأسنان الاستشاري"}
                </label>
                <select
                  required
                  value={bookingSpecId}
                  onChange={(e) => setBookingSpecId(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:border-[#00674F]"
                >
                  <option value="">-- Choose Specialist / Provider --</option>
                  {mockSpecialists.map((s) => (
                    <option key={s.id} value={s.id}>{lang === 'en' ? s.name : s.arName} ({lang === 'en' ? s.specialty : s.arSpecialty})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  {lang === 'en' ? "Preferred Consult Date" : "اليوم المفضل للكشف والزيارة"}
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:border-[#00674F]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#00674F] hover:bg-[#00503D] text-white text-xs font-bold rounded-lg cursor-pointer"
              >
                {lang === 'en' ? "Dispatch Booking Inquiry" : "إرسال طلب الحجز للعيادة"}
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Active referral therapy / Active details */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.myTreatmentPlans}</h4>
            </div>

            <div className="divide-y divide-slate-100 p-5 text-xs text-slate-700">
              {cases.length > 0 ? (
                cases.map((c) => (
                  <div key={c.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-900 text-sm">Patient Initials Locker: {c.patientInitials}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px]">{c.status}</span>
                    </div>

                    <p className="text-slate-500 mt-1.5 leading-relaxed">
                      <span className="font-semibold block text-slate-800">{lang === 'en' ? "Initial Diagnosis" : "التشخيص الأولي للملف S"}:</span>
                      {lang === 'en' ? c.diagnosis : c.arDiagnosis}
                    </p>

                    <div className="text-[11px] text-slate-400 mt-3 flex items-center space-x-4">
                      <span>{lang === 'en' ? "Consultant assigned" : "الأخصائي المتابع"}: <b className="text-slate-600">{c.specialistName}</b></span>
                      <span>•</span>
                      <span>{lang === 'en' ? "Referring GP" : "الطبيب العام المحيل"}: <b className="text-[#00674F]">{c.dentistName}</b></span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-6 text-slate-400">
                  {lang === 'en' ? "No referral treatment procedures running current time." : "لا توجد معالجات سريرية نشطة حالياً."}
                </p>
              )}
            </div>
          </div>

          {/* Reminders banner */}
          <div className="bg-[#FAFDFB] border border-emerald-100 rounded-xl p-4 flex items-center space-x-3.5 text-emerald-800 text-xs">
            <Smartphone className="h-5 w-5 text-emerald-700 shrink-0 mr-2 ml-2" />
            <div>
              <span className="font-bold block text-emerald-900">{t.upcomingReminder}</span>
              <span className="text-emerald-700 mt-0.5 block">{lang === 'en' ? "An SMS notice of your medical referral profile will be dispatched 2 hours prior to confirmation." : "ستصلك رسالة تذكيرية قصيرة SMS قبل موعد الكشف السريري بـ ٢٤ ساعة للتحضير."}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
