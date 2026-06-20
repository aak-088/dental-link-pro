/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { translations } from '../data/translations';
import { DentalCase, UserProfile } from '../types';
import { StatusBadge, UrgencyBadge, XRayVisualizer } from './UIElements';
import { 
  MessageSquare, Send, CheckCircle, FileText, Camera, Shield, 
  MapPin, Clock, ArrowLeft, RefreshCw, ZoomIn, Activity
} from 'lucide-react';

interface SpecialistDashboardProps {
  lang: 'en' | 'ar';
  activeUser: UserProfile;
  cases: DentalCase[];
  selectedCaseId: string | null;
  onSelectCase: (caseId: string | null) => void;
  onUpdateCase: (updatedCase: DentalCase) => void;
}

export const SpecialistDashboard: React.FC<SpecialistDashboardProps> = ({
  lang,
  activeUser,
  cases,
  selectedCaseId,
  onSelectCase,
  onUpdateCase
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const myCases = cases.filter(c => c.specialistId === activeUser.id);
  const activeCase = myCases.find(c => c.id === selectedCaseId) || myCases[0];

  // Forms state
  const [feedback, setFeedback] = useState('');
  const [chatMessage, setChatMessage] = useState('');
  const [zoomRadiograph, setZoomRadiograph] = useState(false);

  const handleUpdateStatus = (status: DentalCase['status']) => {
    if (!activeCase) return;

    const updated: DentalCase = {
      ...activeCase,
      status,
      auditLogs: [
        ...activeCase.auditLogs,
        {
          id: "log_" + Math.floor(Math.random() * 1000),
          action: `Clinical Status → ${status.toUpperCase()}`,
          arAction: `تحديث الحالة الإكلينيكية → ${status.toUpperCase()}`,
          timestamp: new Date().toISOString(),
          userId: activeUser.id,
          userName: activeUser.name,
          ipAddress: "192.168.22.18",
          details: `Specialist updated treatment state to ${status}.`,
          arDetails: `قام الأخصائي بتغيير حالة المعالجة للمريض إلى ${status}.`
        }
      ]
    };

    onUpdateCase(updated);
  };

  const handleSaveFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCase || !feedback) return;

    const updated: DentalCase = {
      ...activeCase,
      treatmentPlan: feedback,
      arTreatmentPlan: feedback,
      auditLogs: [
        ...activeCase.auditLogs,
        {
          id: "log_" + Math.floor(Math.random() * 1000),
          action: "Specialist Feedback Logged",
          arAction: "تسجيل ملاحظات الأخصائي",
          timestamp: new Date().toISOString(),
          userId: activeUser.id,
          userName: activeUser.name,
          ipAddress: "192.168.22.18",
          details: "Physician appended detailed biological treatment feedback notes.",
          arDetails: "قام الاستشاري بتسجيل ملاحظات تشخيصية إضافية في ملف المريض."
        }
      ]
    };

    onUpdateCase(updated);
    setFeedback('');
    alert(lang === 'en' ? "Diagnostic feedback logged in secure cabinet." : "تم تدوين الملاحظات الإكلينيكية بأمان.");
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCase || !chatMessage) return;

    const updated: DentalCase = {
      ...activeCase,
      messages: [
        ...activeCase.messages,
        {
          id: "msg_" + Math.floor(Math.random() * 1000),
          senderId: activeUser.id,
          senderName: activeUser.name,
          senderRole: activeUser.role,
          content: chatMessage,
          timestamp: new Date().toISOString()
        }
      ]
    };

    onUpdateCase(updated);
    setChatMessage('');
  };

  return (
    <div className={`py-6 px-6 max-w-7xl mx-auto ${isRtl ? 'direction-rtl' : 'direction-ltr'}`}>
      
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <span className="text-xs text-[#00674F] font-bold uppercase tracking-wider">
            {lang === 'en' ? "Specialist Clinical Hub" : "منصة العيادة الاستشارية dntlink"}
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            {t.specDashboardTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'en' ? `Logged as Consult: ${activeUser.name} (${activeUser.specialty} Specialist)` : `تسجيل دخول الأخصائي المعتمد: ${activeUser.arName} (تخصص: ${activeUser.arSpecialty})`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Cases queue lists */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{t.receivedReferrals}</span>
              <span className="px-2 py-0.5 text-[10px] bg-emerald-50 text-[#00674F] font-bold rounded-full">{myCases.length}</span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[480px] overflow-y-auto">
              {myCases.map((c) => (
                <div
                  key={c.id}
                  onClick={() => onSelectCase(c.id)}
                  className={`p-3.5 hover:bg-slate-50/70 transition-colors cursor-pointer text-xs ${activeCase && activeCase.id === c.id ? 'bg-[#00674F]/5 border-r-4 border-[#00674F]' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-slate-900 text-sm">Patient initials {c.patientInitials}</span>
                    <UrgencyBadge urgency={c.urgency} lang={lang} />
                  </div>
                  
                  <p className="text-[11px] text-slate-400 mt-1 truncate">
                    {lang === 'en' ? c.diagnosis : c.arDiagnosis}
                  </p>

                  <div className="mt-3 flex justify-between items-center text-[10px] text-slate-400">
                    <span>{c.dentistName} (GP)</span>
                    <StatusBadge status={c.status} lang={lang} />
                  </div>
                </div>
              ))}

              {myCases.length === 0 && (
                <div className="p-8 text-center text-slate-400">
                  {lang === 'en' ? "No referrals forwarded to you." : "لم يتم استلام أي إحالات بعد."}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Active referral patient detail summary */}
        {activeCase ? (
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-6 border-b border-slate-100 gap-4">
                <div>
                  <div className="flex items-center space-x-2.5">
                    <h3 className="text-base font-bold text-slate-900">{t.caseLocker} ({activeCase.patientInitials})</h3>
                    <StatusBadge status={activeCase.status} lang={lang} />
                  </div>
                  <p className="text-[11px] text-[#00674F] mt-1 font-mono">ID: {activeCase.id} / SECURE TRANSMITTED TLS-1.3</p>
                </div>

                {/* Status action dropdown */}
                <div className="flex items-center space-x-2">
                  <label className="text-[10px] uppercase font-bold text-slate-400 mr-2 ml-2">
                    {lang === 'en' ? "Treatment Step" : "خطوة العلاج"}
                  </label>
                  <select
                    value={activeCase.status}
                    onChange={(e) => handleUpdateStatus(e.target.value as DentalCase['status'])}
                    className="bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-bold text-[#00674F] focus:border-[#00674F] cursor-pointer"
                  >
                    <option value="new">{lang === 'en' ? "New" : "حالة جديدة"}</option>
                    <option value="under_review">{lang === 'en' ? "Under Review" : "قيد المراجعة والتدقيق"}</option>
                    <option value="accepted">{lang === 'en' ? "Accept case" : "مقبولة وبدء العمل"}</option>
                    <option value="scheduled">{lang === 'en' ? "Scheduled" : "تحديد موعد للزيارة"}</option>
                    <option value="completed">{lang === 'en' ? "Completed العلاج" : "اكتمل العلاج بنجاح"}</option>
                  </select>
                </div>
              </div>

              {/* Patient Core diagnostic info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1">{lang === 'en' ? "Referring GP diagnostic notes" : "التشخيص المبدئي وملاحظات الطبيب الصادر"}</h5>
                    <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-100 text-xs text-slate-800 leading-relaxed font-medium">
                      {lang === 'en' ? activeCase.diagnosis : activeCase.arDiagnosis}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1">{lang === 'en' ? "Proposed treatment plan inquiry" : "خطة المداواة المقترحة"}</h5>
                    <div className="bg-emerald-950/5 p-3 rounded-xl border border-emerald-900/5 text-xs text-slate-800 leading-relaxed font-semibold">
                      {lang === 'en' ? activeCase.treatmentPlan : activeCase.arTreatmentPlan}
                    </div>
                  </div>

                  <div>
                    <h5 className="text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1">{lang === 'en' ? "Sender practitioner" : "الطبيب المراجع الصادر"}</h5>
                    <span className="inline-flex items-center text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 mr-1 ml-1 text-slate-400 animate-pulse" />
                      <span>{activeCase.dentistName} - {lang === 'en' ? 'Dentistry' : 'عيادة الأسنان المعتمدة'}</span>
                    </span>
                  </div>
                </div>

                {/* Secure Diagnostic Radiograph previewer */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center leading-none">
                    <h5 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                      {t.clinicalAttachments}
                    </h5>
                    <button
                      onClick={() => setZoomRadiograph(!zoomRadiograph)}
                      className="text-[#00674F] hover:text-[#00503D] text-[10px] font-bold flex items-center cursor-pointer"
                    >
                      <ZoomIn className="h-3 w-3 mr-1 ml-1" />
                      <span>{lang === 'en' ? "Fullscreen Analyze" : "تكبير ثنائي كامل"}</span>
                    </button>
                  </div>

                  <XRayVisualizer lang={lang} type={activeCase.xrays?.[0]} interactive={true} />
                </div>
              </div>

              {/* AI Module clinical suggestions (if attached during GP creation) */}
              {activeCase.aiAssessment && (
                <div className="bg-emerald-950/10 border border-emerald-900/20 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-1.5 mb-2.5">
                    <Shield className="h-4 w-4 text-[#00674F] mr-1.5 ml-1.5" />
                    <span className="text-xs font-black text-[#00674F] uppercase tracking-wider">{lang === 'en' ? "AI Copilot Assessment Diagnostic insights" : "الذكاء السريري للمساعد الطبي AI"}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-slate-500 font-bold text-[10px] block mb-1">Anatomical Risks:</span>
                      <ul className="list-disc pl-4 space-y-1 text-slate-700 text-[11px]">
                        {(lang === 'en' ? activeCase.aiAssessment.insights : activeCase.aiAssessment.arInsights)?.map((ins: string, idx: number) => (
                          <li key={idx}>{ins}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-slate-500 font-bold text-[10px] block mb-1">Anatomical Treatment steps:</span>
                      <ul className="list-decimal pl-4 space-y-1 text-slate-700 text-[11px]">
                        {(lang === 'en' ? activeCase.aiAssessment.suggestedTreatmentSteps : activeCase.aiAssessment.arSuggestedTreatmentSteps)?.map((step: string, idx: number) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Diagnostic feedback form */}
              <div className="border-t border-slate-100 pt-6">
                <form onSubmit={handleSaveFeedback} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">
                      {t.feedbackLabel}
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder={lang === 'en' ? "Log specific clinical outcome notes or follow-up criteria for the GP..." : "اكتب ملاحظات العلاج النهائية، كشف القنوات، تدوين التوصيات للطبيب العام الصادر..."}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:border-[#00674F]"
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#00674F] hover:bg-[#00503D] text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
                    >
                      {t.saveFeedback}
                    </button>
                  </div>
                </form>
              </div>

            </div>

            {/* Medical consult chat widget */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
                <MessageSquare className="h-4 w-4 mr-1.5 ml-1.5 text-slate-500" />
                <span>{t.secureChat}</span>
              </h3>

              {/* Chat messages lists */}
              <div className="space-y-3.5 max-h-[220px] overflow-y-auto mb-4 p-3 bg-slate-50 rounded-xl">
                {activeCase.messages?.map((msg, i) => {
                  const isMe = msg.senderId === activeUser.id;
                  return (
                    <div key={i} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center space-x-1.5 text-[10px] text-slate-400 mb-1">
                        <span className="font-bold">{msg.senderName}</span>
                        <span>•</span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className={`p-2.5 rounded-xl max-w-sm text-xs leading-relaxed ${isMe ? 'bg-[#00674F] text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}`}>
                        {msg.content}
                      </div>
                    </div>
                  );
                })}

                {activeCase.messages?.length === 0 && (
                  <p className="text-center text-slate-400 py-4 italic text-[11px]">
                    {lang === 'en' ? "Open discussion tunnel. Send a message to Dr. Sarah above securely." : "نفق المناقشة لملف الحالة السريرية فارغ. ناقش الحالة مع الدكتور العام الصادر."}
                  </p>
                )}
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendChat} className="flex space-x-2">
                <input
                  type="text"
                  required
                  placeholder={lang === 'en' ? "Type medical advisory note..." : "اكتب ملاحظتك الطبية الاستشارية..."}
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl p-2.5 text-xs focus:border-[#00674F]"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-[#001712] hover:bg-black text-[#00B88A] rounded-xl cursor-pointer"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-400">
            {lang === 'en' ? "Select a referral from the locker to analyze case details." : "يرجى تحديد إحالة واردة من قائمة الحالات لاستعراض التفاصيل."}
          </div>
        )}

      </div>

    </div>
  );
};
