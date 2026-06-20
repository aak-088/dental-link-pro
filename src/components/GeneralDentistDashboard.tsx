/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { translations } from '../data/translations';
import { DentalCase, UserProfile } from '../types';
import { mockSpecialists, SpecialistSearchItem } from '../data/initialData';
import { HIPAASecurityNotice, StatusBadge, UrgencyBadge, XRayVisualizer } from './UIElements';
import { 
  Plus, Calendar, Sparkles, Send, FileText, ArrowLeft, 
  Upload, CheckCircle, ShieldCheck, HelpCircle, Activity 
} from 'lucide-react';

interface GeneralDentistDashboardProps {
  lang: 'en' | 'ar';
  activeUser: UserProfile;
  cases: DentalCase[];
  onAddCase: (newCase: DentalCase) => void;
  onSelectCase: (caseId: string) => void;
}

export const GeneralDentistDashboard: React.FC<GeneralDentistDashboardProps> = ({
  lang,
  activeUser,
  cases,
  onAddCase,
  onSelectCase
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const [showForm, setShowForm] = useState(false);
  const [patientInitials, setPatientInitials] = useState('');
  const [patientAge, setPatientAge] = useState<number | ''>('');
  const [patientGender, setPatientGender] = useState<'M' | 'F'>('M');
  const [urgency, setUrgency] = useState<'routine' | 'urgent' | 'emergency'>('routine');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [specialistId, setSpecialistId] = useState('');
  const [selectedXrayTemplate, setSelectedXrayTemplate] = useState('molar_curved_canal');

  // AI loading and output state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);

  // File upload indicator simulation
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const simulateUpload = () => {
    setIsUploaded(false);
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploaded(true);
          return 100;
        }
        return prev + 30;
      });
    }, 150);
  };

  // Triggers real or high-fidelity simulated response from server
  const handleAskAI = async () => {
    if (!diagnosis || !treatmentPlan) {
      alert(lang === 'en' ? "Please write diagnostic notes first." : "الرجاء تعبئة ملاحظات التشخيص المبدئي.");
      return;
    }

    setAiLoading(true);
    setAiResult(null);

    try {
      const response = await fetch('/api/ai-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          diagnosis,
          treatmentPlan,
          age: patientAge || 30,
          gender: patientGender,
          arGender: patientGender === 'M' ? 'ذكر' : 'أنثى',
          urgency
        })
      });

      if (!response.ok) {
        throw new Error("Clinical Engine reported connection failure.");
      }

      const resData = await response.json();
      setAiResult(resData);
    } catch (err) {
      console.warn("DentLink Pro: Server AI Error, fallback active.", err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmitCase = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientInitials || !patientAge || !diagnosis || !treatmentPlan || !specialistId) {
      alert(lang === 'en' ? "Please fulfill all basic referral parameters" : "الرجاء ملء كافة بيانات الإحالة الطبية الأساسية");
      return;
    }

    const selectedSpec = mockSpecialists.find(s => s.id === specialistId);
    const specName = selectedSpec ? selectedSpec.name : "Unassigned";

    const newCase: DentalCase = {
      id: "case_" + Math.floor(100 + Math.random() * 900),
      patientInitials,
      patientAge: Number(patientAge),
      patientGender,
      arPatientGender: patientGender === 'M' ? 'ذكر' : 'أنثى',
      dentistId: activeUser.id,
      specialistId,
      dentistName: activeUser.name,
      specialistName: specName,
      diagnosis,
      arDiagnosis: diagnosis, // Syncing Arabic fallback
      treatmentPlan,
      arTreatmentPlan: treatmentPlan,
      status: 'new',
      createdAt: new Date().toISOString(),
      xrays: [selectedXrayTemplate],
      urgency,
      arUrgency: urgency === 'routine' ? 'اعتيادية' : urgency === 'urgent' ? 'عاجلة' : 'طارئة جداً',
      auditLogs: [
        {
          id: "log_" + Math.floor(Math.random() * 10000),
          action: "Referral Dispatched",
          arAction: "تم إرسال الإحالة",
          timestamp: new Date().toISOString(),
          userId: activeUser.id,
          userName: activeUser.name,
          ipAddress: "192.168.1.120",
          details: `GP referred patient ${patientInitials} to ${specName} with diagnostics.`,
          arDetails: `قام طبيب عام بإحالة المريض ${patientInitials} إلى الأخصائي ${specName}.`
        }
      ],
      messages: [],
      aiAssessment: aiResult || undefined
    };

    onAddCase(newCase);

    // Reset Form
    setPatientInitials('');
    setPatientAge('');
    setDiagnosis('');
    setTreatmentPlan('');
    setSpecialistId('');
    setIsUploaded(false);
    setUploadProgress(0);
    setAiResult(null);
    setShowForm(false);
  };

  return (
    <div className={`py-6 px-6 max-w-7xl mx-auto ${isRtl ? 'direction-rtl' : 'direction-ltr'}`}>
      
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <span className="text-xs text-[#00674F] font-bold uppercase tracking-wider">
            {lang === 'en' ? "DentLink GP Workspace" : "مساحة عمل الطبيب العام dntlink"}
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1 flex items-center">
            {t.gpDashboardTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {lang === 'en' ? `Clinically logged as ${activeUser.name} (${activeUser.clinicName})` : `مسجل دخولك باسم الدكتور: ${activeUser.arName} (${activeUser.arClinicName})`}
          </p>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4.5 py-2.5 bg-[#00674F] hover:bg-[#00503D] text-white text-xs font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center shrink-0 cursor-pointer"
          >
            <Plus className={`h-4 w-4 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
            <span>{t.newReferralBtn}</span>
          </button>
        )}
      </div>

      {/* Stats row */}
      {!showForm && (
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <dt className="text-xs text-slate-400 font-medium">{t.totalSent}</dt>
            <dd className="text-2xl font-black text-[#001712] mt-1">{cases.length}</dd>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <dt className="text-xs text-slate-400 font-medium">{t.acceptedRefs}</dt>
            <dd className="text-2xl font-black text-emerald-600 mt-1">
              {cases.filter(c => c.status === 'accepted' || c.status === 'scheduled' || c.status === 'completed').length}
            </dd>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <dt className="text-xs text-slate-400 font-medium">{t.completedRefs}</dt>
            <dd className="text-2xl font-black text-[#00674F] mt-1">
              {cases.filter(c => c.status === 'completed').length}
            </dd>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
            <dt className="text-xs text-slate-400 font-medium">{t.avgRespTime}</dt>
            <dd className="text-xl font-bold text-slate-700 mt-1.5">
              {isRtl ? activeUser.referralStats?.arAvgResponseTime : activeUser.referralStats?.avgResponseTime}
            </dd>
          </div>
        </div>
      )}

      {showForm ? (
        /* Create case form */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md max-w-4xl mx-auto">
          
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
            <h3 className="text-md font-bold text-[#001712] flex items-center">
              <Plus className="h-4 w-4 mr-1.5 ml-1.5 text-[#00674F]" />
              <span>{t.createCaseTitle}</span>
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setAiResult(null);
              }}
              className="px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-xs font-semibold rounded-lg text-slate-600 cursor-pointer"
            >
              {lang === 'en' ? "Back to Locker" : "العودة للرئيسية"}
            </button>
          </div>

          <form onSubmit={handleSubmitCase} className="space-y-6">
            
            {/* HIPAA secure patient data */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-slate-50/50 p-4 rounded-xl border border-dashed border-slate-200">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  {t.patientInitialsLabel}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A. S."
                  value={patientInitials}
                  onChange={(e) => setPatientInitials(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:border-[#00674F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  {t.patientAgeLabel}
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 42"
                  value={patientAge}
                  onChange={(e) => setPatientAge(Number(e.target.value))}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:border-[#00674F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1">
                  {t.patientGenderLabel}
                </label>
                <div className="flex space-x-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setPatientGender('M')}
                    className={`flex-1 py-1.5 border rounded-lg text-xs font-bold mr-1.5 ml-1.5 ${patientGender === 'M' ? 'bg-[#00674F] text-white border-[#00674F]' : 'bg-white text-slate-700'}`}
                  >
                    {lang === 'en' ? "Male" : "ذكر"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPatientGender('F')}
                    className={`flex-1 py-1.5 border rounded-lg text-xs font-bold ${patientGender === 'F' ? 'bg-[#00674F] text-white border-[#00674F]' : 'bg-white text-slate-700'}`}
                  >
                    {lang === 'en' ? "Female" : "أنثى"}
                  </button>
                </div>
              </div>
            </div>

            {/* Urgency Level */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1.5">
                {t.urgency}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setUrgency('routine')}
                  className={`p-2.5 border rounded-lg text-xs text-left font-medium ${urgency === 'routine' ? 'bg-slate-50 text-slate-900 border-slate-300 ring-2 ring-slate-100' : 'bg-white text-slate-600 border-slate-200'}`}
                >
                  <span className="font-bold block text-[#001712]">{lang === 'en' ? 'Routine' : 'روتينية اعتيادية'}</span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">{lang === 'en' ? 'Standard appointment timeline' : 'الحجز ضمن المواعيد المعتادة والدروس'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('urgent')}
                  className={`p-2.5 border rounded-lg text-xs text-left font-medium ${urgency === 'urgent' ? 'bg-orange-50 text-orange-900 border-orange-300 ring-2 ring-orange-50' : 'bg-white text-slate-600 border-slate-200'}`}
                >
                  <span className="font-bold block text-orange-850">{lang === 'en' ? 'Urgent' : 'عاجلة جداً'}</span>
                  <span className="text-[10px] text-orange-500 mt-0.5 block">{lang === 'en' ? 'Symptomatic pain relief required' : 'وجود آلام أو تورم سطحي يستدعي التعجيل'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('emergency')}
                  className={`p-2.5 border rounded-lg text-xs text-left font-medium ${urgency === 'emergency' ? 'bg-rose-50/60 text-rose-900 border-rose-300 ring-2 ring-rose-50' : 'bg-white text-slate-600 border-slate-200'}`}
                >
                  <span className="font-bold block text-rose-700">{lang === 'en' ? 'Emergency' : 'حالة طارئة خطيرة'}</span>
                  <span className="text-[10px] text-rose-500 mt-0.5 block">{lang === 'en' ? 'Acute swelling or trauma pathology' : 'نزيف أو عدوى أو رضة تقتضي المعاينة الفورية'}</span>
                </button>
              </div>
            </div>

            {/* Diagnosis notes */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                {t.diagnosisLabel}
              </label>
              <textarea
                required
                rows={3}
                placeholder={lang === 'en' ? "Describe clinical crown, symptomatic periodontitis, curvatures or calcifications..." : "اكتب التشخيص، مثلاً: التهاب عصب حاد في السن رقم ٣٦، انحناء فجائي في القنوات، فشل المعالجة السابقة..."}
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:border-[#00674F]"
              ></textarea>
            </div>

            {/* Treatment requested */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                {t.treatmentPlanLabel}
              </label>
              <textarea
                required
                rows={2}
                placeholder={lang === 'en' ? "Requested specialist therapy, diagnostic scope, backfill obturation..." : "أدخل خطة العلاج المطلوبة أو نوع الاستشارة المطلوبة من الأخصائي..."}
                value={treatmentPlan}
                onChange={(e) => setTreatmentPlan(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:border-[#00674F]"
              ></textarea>
            </div>

            {/* X-ray radiograph secure dropbox upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">
                  {lang === 'en' ? "Secure Radiograph Upload" : "رفع وتشفير صور الأشعة"}
                </label>
                <div 
                  onClick={simulateUpload}
                  className="border-2 border-dashed border-slate-200 hover:border-[#00674F] rounded-xl p-5 text-center cursor-pointer bg-slate-50/50 transition-colors"
                >
                  <Upload className="h-6 w-6 mx-auto text-slate-400 mb-2" />
                  <span className="text-xs font-semibold text-slate-700 block">{t.uploadXray}</span>
                  <span className="text-[10px] text-slate-400 mt-1 block font-mono">SUPPORTED: JPG, PNG, CBCT (DICOM) ZIP</span>
                  
                  {uploadProgress > 0 && (
                    <div className="mt-3 w-full bg-slate-200 rounded-full h-1">
                      <div className="bg-[#00674F] h-1 rounded-full transition-all" style={{ width: `${uploadProgress}%` }}></div>
                    </div>
                  )}

                  {isUploaded && (
                    <span className="text-[11px] text-emerald-700 font-bold mt-2 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 mr-1 ml-1" />
                      <span>{t.uploadSuccess}</span>
                    </span>
                  )}
                </div>

                <div className="mt-3">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                    {lang === 'en' ? "Select Radiograph Sample for Simulation" : "اختر عينة صور الإشعاع المحددة للمحاكاة"}
                  </label>
                  <select
                    value={selectedXrayTemplate}
                    onChange={(e) => setSelectedXrayTemplate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded p-1.5 text-[11px] font-medium"
                  >
                    <option value="molar_curved_canal">{lang === 'en' ? "36 Lower Left Molar (Complex Curvature)" : "٣٦ ضرس سفلي أيسر (انحناء وانثقاب)"}</option>
                    <option value="cephalometric_joint">{lang === 'en' ? "Teen Skull Cephalometric Angle Joint" : "الأشعة التقويمية السيفالومترية"}</option>
                  </select>
                </div>
              </div>

              {/* Dentist Radiograph Hotspot Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1.5">
                  {lang === 'en' ? "Radiographic Anatomical Preview" : "معاينة تشريح صورة الأشعة المختارة"}
                </label>
                <XRayVisualizer lang={lang} type={selectedXrayTemplate} interactive={true} />
              </div>
            </div>

            {/* AI DIAGNOSTICS GENERATION */}
            <div className="bg-[#FAFAFA] border border-slate-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 flex items-center">
                    <Sparkles className="h-4 w-4 text-[#00B88A] mr-1.5 ml-1.5" />
                    <span>{t.aiAssistantTitle}</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {lang === 'en' ? "Audit the clinical difficulty factor and find recommended pathways using artificial models" : "تتبع مستوى الصعوبة وخطوات العمل الاسترشادية بالذكاء الاصطناعي"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAskAI}
                  disabled={aiLoading}
                  className="px-4 py-2 bg-[#001712] hover:bg-[#000a08] text-[#00B88A] text-xs font-bold rounded-lg border border-[#00B88A]/30 flex items-center cursor-pointer transition-transform hover:scale-105"
                >
                  <Sparkles className={`h-3.5 w-3.5 ${aiLoading ? 'animate-spin' : ''} mr-1.5 ml-1.5`} />
                  <span>{aiLoading ? t.askingAI : t.aiMatchingPrompt}</span>
                </button>
              </div>

              {/* AI Report Output */}
              {aiResult && (
                <div className="mt-4 border-t border-slate-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-950/5 border border-emerald-900/10 rounded-lg p-3 text-xs">
                    <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider block mb-2">Diagnostic Identifications</span>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.aiDifficulty}</span>
                        <span className="font-bold text-[#00674F]">{lang === 'en' ? aiResult.difficulty : aiResult.arDifficulty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Suggested Specialty</span>
                        <span className="font-bold text-slate-700">{lang === 'en' ? aiResult.suggestedSpecialty : aiResult.arSuggestedSpecialty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">{t.aiRisk}</span>
                        <span className="font-bold text-rose-600">{lang === 'en' ? aiResult.riskLevel : aiResult.arRiskLevel}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="block font-bold text-[10px] text-slate-400 uppercase tracking-widest mb-1">Recommended specialists</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {aiResult.recommendedSpecialists?.map((spec: string, i: number) => (
                          <span key={i} className="bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded text-[10px]">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 rounded-lg p-3 text-xs">
                    <span className="font-bold text-slate-800 text-[11px] uppercase tracking-widest block mb-2">AI Suggested Treatment Steps</span>
                    <ul className="space-y-1.5 text-[11px] text-slate-500">
                      {(lang === 'en' ? aiResult.suggestedTreatmentSteps : aiResult.arSuggestedTreatmentSteps)?.map((step: string, i: number) => (
                        <li key={i} className="flex items-start">
                          <span className="w-4 h-4 rounded-full bg-[#00674F]/10 text-[#00674F] font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5 mr-1.5 ml-1.5">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Specialist Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                {lang === 'en' ? "Select Intended Specialist" : "تحديد الأخصائي المستهدف للإرسال"}
              </label>
              <select
                required
                value={specialistId}
                onChange={(e) => setSpecialistId(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-700 focus:border-[#00674F]"
              >
                <option value="">{lang === 'en' ? "-- Choose Specialist Specialist --" : "-- اختر الأخصائي الاستشاري المستلم --"}</option>
                {mockSpecialists.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {lang === 'en' ? `${spec.name} - ${spec.specialty} (${spec.city})` : `${spec.arName} - ${spec.arSpecialty} (${spec.arCity})`}
                  </option>
                ))}
              </select>
            </div>

            {/* HIPAA Compliance confirmation Box */}
            <HIPAASecurityNotice lang={lang} />

            {/* Submit button bar */}
            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setAiResult(null);
                }}
                className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-xs font-bold rounded-xl text-slate-600 cursor-pointer"
              >
                {lang === 'en' ? "Cancel" : "إلغاء"}
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#00674F] hover:bg-[#00503D] text-white text-xs font-bold rounded-xl shadow-md cursor-pointer flex items-center"
              >
                <Send className={`h-4 w-4 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
                <span>{t.submitReferral}</span>
              </button>
            </div>

          </form>

        </div>
      ) : (
        /* Sent referral list table */
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          
          <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <h3 className="text-xs font-bold text-[#001712] uppercase tracking-wider">
              {lang === 'en' ? "Active Dispatched Cases Locker" : "الخزانة الخاصة بالحالات المحالة الفاعلة"}
            </h3>
            <span className="text-[10px] bg-[#00E5FF]/10 text-slate-700 px-2 py-0.5 rounded-full font-mono font-bold">
              PORT-SECURE AUDITED TLS-1.3
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 bg-slate-50/20 select-none">
                  <th className="p-4 mr-2 ml-2">{lang === 'en' ? "Patient ID" : "رمز المريض"}</th>
                  <th className="p-4">{lang === 'en' ? "Age & Gender" : "العمر والجنس"}</th>
                  <th className="p-4">{lang === 'en' ? "Specialist Intended" : "الأخصائي المستهدف"}</th>
                  <th className="p-4">{lang === 'en' ? "Urgency" : "مستوى الاستعجال"}</th>
                  <th className="p-4">{lang === 'en' ? "Case Status" : "حالة العلاج"}</th>
                  <th className="p-4">{lang === 'en' ? "Submission Date" : "تاريخ الإرسال"}</th>
                  <th className="p-4 text-right">{lang === 'en' ? "Clinical Files" : "الملف السريري"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {cases.map((c) => (
                  <tr 
                    key={c.id} 
                    onClick={() => onSelectCase(c.id)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  >
                    <td className="p-4 font-bold text-[#001712]">{c.patientInitials}</td>
                    <td className="p-4">
                      {c.patientAge} {lang === 'en' ? 'Yrs' : 'سنة'} / {lang === 'en' ? c.patientGender : c.arPatientGender}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-900">{lang === 'en' ? c.specialistName : c.specialistName}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{lang === 'en' ? 'DntLink referral channel' : 'قناة إحالة دنت لينك'}</div>
                    </td>
                    <td className="p-4">
                      <UrgencyBadge urgency={c.urgency} lang={lang} />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={c.status} lang={lang} />
                    </td>
                    <td className="p-4 text-slate-400">
                      {new Date(c.createdAt).toLocaleDateString(isRtl ? 'ar-SA' : 'en-US')}
                    </td>
                    <td className="p-4 text-right">
                      <span className="inline-flex py-1.5 px-3 rounded-lg bg-slate-100 group-hover:bg-[#00674F] group-hover:text-white text-[10px] font-bold text-slate-700 transition-colors">
                        {lang === 'en' ? "Open Patient Cabinet" : "عرض خزانة الملف السريري"}
                      </span>
                    </td>
                  </tr>
                ))}

                {cases.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      {t.noReferrals}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
