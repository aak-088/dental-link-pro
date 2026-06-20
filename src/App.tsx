/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { translations } from './data/translations';
import { mockUsers, initialCases, initialStudentCases, mockVerificationRequests, mockAuditLogs } from './data/initialData';
import { UserRole, UserProfile, DentalCase, StudentCase, VerificationRequest, AuditLog } from './types';
import { LandingPage } from './components/LandingPage';
import { GeneralDentistDashboard } from './components/GeneralDentistDashboard';
import { SpecialistDashboard } from './components/SpecialistDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { ClinicDashboard } from './components/ClinicDashboard';
import { PatientDashboard } from './components/PatientDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { StatusBadge, UrgencyBadge, XRayVisualizer, InteractiveReferralChart } from './components/UIElements';
import { 
  ShieldCheck, Network, LogOut, ChevronDown, User, Sparkles, 
  X, Calendar, FileText, MessageSquare, Activity, CheckCircle2 
} from 'lucide-react';

export default function App() {
  // Global presentation configurations
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [currentView, setCurrentView] = useState<'landing' | 'workspace'>('landing');
  const [activeRole, setActiveRole] = useState<UserRole>('gp');

  // Shared state databases
  const [cases, setCases] = useState<DentalCase[]>(initialCases);
  const [studentCases, setStudentCases] = useState<StudentCase[]>(initialStudentCases);
  const [verificationRequests, setVerificationRequests] = useState<VerificationRequest[]>(mockVerificationRequests);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);

  // Specialist selection tracking
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Active full-screen drawer case cabinet details
  const [openedCabinetCaseId, setOpenedCabinetCaseId] = useState<string | null>(null);

  const t = translations[lang];
  const isRtl = lang === 'ar';

  // Retrieve active logged profile based on selected role session
  const activeUser = mockUsers.find(u => u.role === activeRole) || mockUsers[0];

  const handleLaunchRole = (role: UserRole) => {
    setActiveRole(role);
    setCurrentView('workspace');
    setSelectedCaseId(null);
  };

  // State handlers propagated down
  const handleAddCase = (newCase: DentalCase) => {
    setCases([newCase, ...cases]);
    
    // Auto-generate admin audit log
    const newAudit: AuditLog = {
      id: "al_" + Math.floor(1000 + Math.random() * 9000),
      action: "Referral Dispatched",
      arAction: "إرسال إحالة جديدة",
      timestamp: new Date().toISOString(),
      userId: activeUser.id,
      userName: activeUser.name,
      ipAddress: "192.168.1.120",
      details: `GP referred patient initials ${newCase.patientInitials} to specialist.`,
      arDetails: `قام الطبيب المحيل بإنشاء حالة إحالة للمريض بالأحرف الأولى ${newCase.patientInitials}.`
    };
    setAuditLogs([newAudit, ...auditLogs]);
  };

  const handleUpdateCase = (updated: DentalCase) => {
    setCases(cases.map(c => c.id === updated.id ? updated : c));

    // Update audit logs if state changes or chat comments added
    const newAudit: AuditLog = {
      id: "al_" + Math.floor(1000 + Math.random() * 9000),
      action: `Clinical File Modified (#${updated.id})`,
      arAction: `تعديل ملف طبي رقم #${updated.id}`,
      timestamp: new Date().toISOString(),
      userId: activeUser.id,
      userName: activeUser.name,
      ipAddress: "192.168.22.18",
      details: `Case details or status updated to '${updated.status}' in clinical locker.`,
      arDetails: `تحديث الحالة العلاجية والملاحظات إلى '${updated.status}' في خزانة الحفظ.`
    };
    setAuditLogs([newAudit, ...auditLogs]);
  };

  const handleAddStudentCase = (newCase: StudentCase) => {
    setStudentCases([newCase, ...studentCases]);
    
    // Add learning point award to student
    if (activeUser.studentStats) {
      activeUser.studentStats.points += 150;
      activeUser.studentStats.verifiedCases += 1;
    }
  };

  const handleUpdateStudentCase = (updated: StudentCase) => {
    setStudentCases(studentCases.map(sc => sc.id === updated.id ? updated : sc));
  };

  // Admin license verification approvals
  const handleApproveVerification = (requestId: string) => {
    setVerificationRequests(verificationRequests.map(r => r.id === requestId ? { ...r, status: 'approved' } : r));
    
    // Retrieve target GP / Specialist user and grant verified status badge!
    const req = verificationRequests.find(r => r.id === requestId);
    if (req) {
      const user = mockUsers.find(u => u.name === req.dentistName);
      if (user) {
        user.verified = true;
      }

      // Append security log
      const newAudit: AuditLog = {
        id: "al_" + Math.floor(1000 + Math.random() * 9000),
        action: "Licensing Status APPROVED",
        arAction: "اعتماد ومطابقة ترخيص المزاولة",
        timestamp: new Date().toISOString(),
        userId: activeUser.id,
        userName: activeUser.name,
        ipAddress: "127.0.0.1",
        details: `Administrator manually verified credentials for licensing ID ${req.licenseNumber}. Issued Verified Specialist Badge.`,
        arDetails: `قام مسؤول النظام بالمصادقة والموافقة على الترخيص الطبي رقم ${req.licenseNumber}. منح شارة أخصائي معتمد.`
      };
      setAuditLogs([newAudit, ...auditLogs]);
    }
  };

  const cabinetCase = cases.find(c => c.id === openedCabinetCaseId);

  return (
    <div className={`min-h-screen bg-[#FAFAFA] font-sans text-slate-900 ${isRtl ? 'direction-rtl' : 'direction-ltr'}`}>
      
      {currentView === 'landing' ? (
        <LandingPage 
          lang={lang} 
          setLang={setLang} 
          onLaunchRole={handleLaunchRole} 
        />
      ) : (
        /* Authenticated workspace dashboard wrapper with sleek sidebar layout */
        <div className="flex min-h-screen bg-[#FAFAFA]">
          
          {/* LEFT SIDEBAR (Sleek Interface Design Layout Pattern) */}
          <aside className="w-64 bg-[#001712] text-white flex flex-col justify-between shrink-0 border-r border-[#002D24] hidden md:flex select-none">
            <div>
              {/* Logo & Platform Name */}
              <div className="h-16 px-6 border-b border-[#002D24] flex items-center col-span-1 cursor-pointer hover:opacity-90" onClick={() => setCurrentView('landing')}>
                <div className="w-10 h-10 rounded-xl bg-[#00674F] flex items-center justify-center text-white font-extrabold text-xl font-sans mr-3 ml-3 shadow-sm border border-[#00B88A]/30">
                  D
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-tight text-white">{t.brandName}</span>
                  <span className="text-[8px] text-[#00B88A] font-extrabold tracking-widest uppercase leading-none">{t.tagline}</span>
                </div>
              </div>

              {/* Sidebar Navigation - Role Modules */}
              <div className="p-4 space-y-1">
                <div className="px-3 py-2 text-[10px] font-extrabold text-[#00B88A] tracking-wider uppercase opacity-80">
                  {lang === 'en' ? 'Clinical Portals' : 'البوابات السريرية'}
                </div>
                
                {/* 1. GP */}
                <button
                  onClick={() => handleLaunchRole('gp')}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeRole === 'gp' 
                      ? 'bg-[#00674F] text-white shadow-sm ring-1 ring-white/10' 
                      : 'text-slate-400 hover:text-white hover:bg-[#00231D]'
                  }`}
                >
                  <Activity className={`h-4 w-4 shrink-0 ${isRtl ? 'ml-3' : 'mr-3'}`} />
                  <span>{lang === 'en' ? 'General Dentist (GP)' : 'طبيب أسنان عام'}</span>
                </button>

                {/* 2. Specialist */}
                <button
                  onClick={() => handleLaunchRole('specialist')}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeRole === 'specialist' 
                      ? 'bg-[#00674F] text-white shadow-sm ring-1 ring-white/10' 
                      : 'text-slate-400 hover:text-white hover:bg-[#00231D]'
                  }`}
                >
                  <Sparkles className={`h-4 w-4 shrink-0 ${isRtl ? 'ml-3' : 'mr-3'}`} />
                  <span>{lang === 'en' ? 'Endodontics Spec.' : 'أخصائي علاج العصب'}</span>
                </button>

                {/* 3. Clinic Manager */}
                <button
                  onClick={() => handleLaunchRole('clinic')}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeRole === 'clinic' 
                      ? 'bg-[#00674F] text-white shadow-sm ring-1 ring-white/10' 
                      : 'text-slate-400 hover:text-white hover:bg-[#00231D]'
                  }`}
                >
                  <Network className={`h-4 w-4 shrink-0 ${isRtl ? 'ml-3' : 'mr-3'}`} />
                  <span>{lang === 'en' ? 'Clinic Operations' : 'عمليات العيادات'}</span>
                </button>

                {/* 4. Student */}
                <button
                  onClick={() => handleLaunchRole('student')}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeRole === 'student' 
                      ? 'bg-[#00674F] text-white shadow-sm ring-1 ring-white/10' 
                      : 'text-slate-400 hover:text-white hover:bg-[#00231D]'
                  }`}
                >
                  <FileText className={`h-4 w-4 shrink-0 ${isRtl ? 'ml-3' : 'mr-3'}`} />
                  <span>{lang === 'en' ? 'Dental Student' : 'طالب طب أسنان'}</span>
                </button>

                {/* 5. Patient */}
                <button
                  onClick={() => handleLaunchRole('patient')}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeRole === 'patient' 
                      ? 'bg-[#00674F] text-white shadow-sm ring-1 ring-white/10' 
                      : 'text-slate-400 hover:text-white hover:bg-[#00231D]'
                  }`}
                >
                  <User className={`h-4 w-4 shrink-0 ${isRtl ? 'ml-3' : 'mr-3'}`} />
                  <span>{lang === 'en' ? 'Patient Consults' : 'استشارات المرضى'}</span>
                </button>

                <div className="pt-4 px-3 py-2 text-[10px] font-extrabold text-[#00B88A] tracking-wider uppercase opacity-80">
                  {lang === 'en' ? 'Security & Admin' : 'الأمن والرقابة'}
                </div>

                {/* 6. Admin */}
                <button
                  onClick={() => handleLaunchRole('admin')}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    activeRole === 'admin' 
                      ? 'bg-[#00674F] text-white shadow-sm ring-1 ring-white/10' 
                      : 'text-slate-400 hover:text-white hover:bg-[#00231D]'
                  }`}
                >
                  <ShieldCheck className={`h-4 w-4 shrink-0 ${isRtl ? 'ml-3' : 'mr-3'}`} />
                  <span>{lang === 'en' ? 'Compliance Admin' : 'مشرف التراخيص'}</span>
                </button>
              </div>
            </div>

            {/* Sidebar Bottom Part */}
            <div className="p-4 border-t border-[#002D24] space-y-2">
              {/* Active user status info */}
              <div className="bg-[#002D24] rounded-lg p-2.5 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-[#00674F] flex items-center justify-center text-[10px] font-bold text-white uppercase mr-1 ml-1 shrink-0">
                    {activeUser.name.charAt(0)}
                  </div>
                  <div className="flex flex-col leading-none overflow-hidden">
                    <span className="text-[10px] font-bold text-slate-200 truncate max-w-[120px]">
                      {lang === 'en' ? activeUser.name : activeUser.arName}
                    </span>
                    <span className="text-[9px] text-[#00B88A] mt-1.5 uppercase font-mono tracking-tight font-semibold">
                      {activeRole.toUpperCase()}
                    </span>
                  </div>
                </div>
                {activeUser.verified && (
                  <span className="w-2 h-2 rounded-full bg-[#00B88A] shrink-0" title="Accredited Active License" />
                )}
              </div>

              {/* Language toggle trigger button */}
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                className="w-full py-1.5 border border-[#003C2E] hover:border-[#00B88A]/30 text-xs text-slate-300 font-bold rounded-lg bg-[#00231D] cursor-pointer transition-all flex items-center justify-center"
              >
                <span>{t.langName}</span>
              </button>

              {/* Exit Portal button */}
              <button
                onClick={() => setCurrentView('landing')}
                className="w-full py-1.5 border border-rose-900/30 text-rose-300 hover:bg-rose-950/20 text-xs font-semibold rounded-lg flex items-center justify-center cursor-pointer transition-all"
              >
                <LogOut className={`h-3.5 w-3.5 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
                <span>{lang === 'en' ? "Exit Portal" : "مغادرة المنصة"}</span>
              </button>
            </div>
          </aside>

          {/* MAIN VIEWPORT WRAPPER (Sleek layout alignment) */}
          <main className="flex-1 min-h-screen flex flex-col bg-[#FAFAFA] overflow-y-auto">
            
            {/* Top Workspace Bar (Header) */}
            <header className="bg-white border-b border-slate-100 h-16 px-6 flex items-center justify-between shadow-xs sticky top-0 z-40">
              <div className="flex items-center space-x-3">
                {/* Branding elements shown on mobile, hidden on desktop */}
                <div className="flex items-center space-x-2 md:hidden cursor-pointer" onClick={() => setCurrentView('landing')}>
                  <div className="w-8 h-8 rounded-lg bg-[#00674F] flex items-center justify-center text-white font-extrabold text-sm mr-1 ml-1">
                    D
                  </div>
                  <span className="font-bold text-sm text-slate-900">{t.brandName}</span>
                </div>

                {/* Breadcrumbs or Status indicators */}
                <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 font-medium">
                  <span>{t.brandName} Workspace</span>
                  <span>/</span>
                  <span className="text-slate-800 font-semibold uppercase">{activeRole === 'gp' ? 'General Dental Panel' : activeRole === 'specialist' ? 'Specialist clinical hub' : activeRole === 'clinic' ? 'operations & allocations' : activeRole === 'student' ? 'dentistry forum' : activeRole === 'patient' ? 'my referrals' : 'HIPAA Audit Control'}</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Mobile workspace selector dropdown (only visible on mobile screens) */}
                <div className="flex items-center space-x-2 md:hidden">
                  <select
                    value={activeRole}
                    onChange={(e) => handleLaunchRole(e.target.value as UserRole)}
                    className="bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-bold outline-none cursor-pointer"
                  >
                    <option value="gp">GP</option>
                    <option value="specialist">Spec</option>
                    <option value="clinic">Clinic</option>
                    <option value="student">Student</option>
                    <option value="patient">Patient</option>
                    <option value="admin">Compliance</option>
                  </select>

                  <button
                    onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                    className="p-1 px-2.5 border border-slate-200 text-xs font-bold rounded bg-slate-50 cursor-pointer"
                  >
                    {lang === 'en' ? "AR" : "EN"}
                  </button>

                  <button
                    onClick={() => setCurrentView('landing')}
                    className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                    title={lang === 'en' ? "Exit Portal" : "مغادرة المنصة"}
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </div>

                {/* Encryption Audit Safe badge on modern top-right desk */}
                <div className="hidden md:flex items-center space-x-2 bg-[#001712]/5 border border-emerald-950/10 px-3 py-1 rounded-full text-[10px] text-emerald-800 font-bold tracking-tight">
                  <ShieldCheck className={`h-3.5 w-3.5 text-emerald-600 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
                  <span>HIPAA CLIENT LOCKER • TLS_1_3_AES</span>
                </div>
              </div>
            </header>

            {/* Active Dashboard container viewport */}
            <div className="flex-1">
              <div>
                {activeRole === 'gp' && (
                  <GeneralDentistDashboard 
                    lang={lang} 
                    activeUser={activeUser}
                    cases={cases}
                    onAddCase={handleAddCase}
                    onSelectCase={(id) => setOpenedCabinetCaseId(id)}
                  />
                )}

                {activeRole === 'specialist' && (
                  <SpecialistDashboard 
                    lang={lang}
                    activeUser={activeUser}
                    cases={cases}
                    selectedCaseId={selectedCaseId}
                    onSelectCase={setSelectedCaseId}
                    onUpdateCase={handleUpdateCase}
                  />
                )}

                {activeRole === 'student' && (
                  <StudentDashboard 
                    lang={lang}
                    activeUser={activeUser}
                    studentCases={studentCases}
                    onAddStudentCase={handleAddStudentCase}
                    onUpdateStudentCase={handleUpdateStudentCase}
                  />
                )}

                {activeRole === 'clinic' && (
                  <ClinicDashboard 
                    lang={lang}
                    activeUser={activeUser}
                    cases={cases}
                    onUpdateCase={handleUpdateCase}
                  />
                )}

                {activeRole === 'patient' && (
                  <PatientDashboard
                    lang={lang}
                    activeUser={activeUser}
                    cases={cases}
                  />
                )}

                {activeRole === 'admin' && (
                  <AdminDashboard 
                    lang={lang}
                    activeUser={activeUser}
                    verificationRequests={verificationRequests}
                    onApproveVerification={handleApproveVerification}
                    auditLogs={auditLogs}
                  />
                )}
              </div>

              {/* Performance chart banner (only when viewing GP main panel, for analytics statistics) */}
              {activeRole === 'gp' && !openedCabinetCaseId && (
                <div className="max-w-7xl mx-auto px-6 pb-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InteractiveReferralChart lang={lang} />
                    
                    {/* Safe regulatory notices */}
                    <div className="bg-[#001712] text-white rounded-xl p-5 border border-slate-900 flex flex-col justify-between shadow-sm">
                      <div>
                        <span className="text-[10px] text-[#00B88A] font-bold uppercase tracking-wider block">Saudi dental registry network</span>
                        <h4 className="text-sm font-bold text-slate-100 mt-1 leading-normal">
                          {lang === 'en' ? "Integrated Licensing Synchronization" : "مطابقة الترخيص السحابي الفوري"}
                        </h4>
                        <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                          {lang === 'en' 
                            ? "Connecting clinic managers, oral consultants, and practitioners securely. DentLink Pro is structured under health encryption regulations, safeguarding both the general dentist and patient alike."
                            : "نظام ربط معتمد ومتقاطع يربط المستشفيات بالأخصائيين المؤهلين. مصمم كلياً لخدمة المرضى مع الامتثال الصارم للمواثيق المهنية الطبية."}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-emerald-950 flex items-center justify-between text-[11px] text-[#00B88A] font-semibold">
                        <span>SECURITY HASH: TLS_AES_128_GCM</span>
                        <span>100% ETHICAL</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>

        </div>
      )}

      {/* DETAILED PATIENT SLIDEOUT CABINET DRAWER (Apple / Linear style) */}
      {openedCabinetCaseId && cabinetCase && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
          <div 
            onClick={() => setOpenedCabinetCaseId(null)} 
            className="absolute inset-0"
          ></div>
          
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden">
            
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-slate-100 bg-[#001712] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#00B88A] font-bold uppercase tracking-widest block">SECURE CLINICAL LOCKER</span>
                <h3 className="text-base font-bold flex items-center mt-0.5">
                  <span>Patient Identifier initials: {cabinetCase.patientInitials}</span>
                  <span className="ml-2.5 mr-2.5"><StatusBadge status={cabinetCase.status} lang={lang} /></span>
                </h3>
              </div>
              <button 
                onClick={() => setOpenedCabinetCaseId(null)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Body Scroll */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              
              {/* Stats Metadata */}
              <div className="grid grid-cols-3 gap-4 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Age Factor</span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">{cabinetCase.patientAge} Years Old</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Biological Gender</span>
                  <span className="text-sm font-bold text-slate-900 mt-1 block">{lang === 'en' ? (cabinetCase.patientGender === 'M' ? 'Male' : 'Female') : cabinetCase.arPatientGender}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Urgency Timeline</span>
                  <span className="mt-1 block"><UrgencyBadge urgency={cabinetCase.urgency} lang={lang} /></span>
                </div>
              </div>

              {/* Diagnosis Details */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">{lang === 'en' ? "Core GP Diagnosis" : "التشخيص الإكلينيكي المرفق"}</span>
                <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-slate-700 leading-relaxed font-semibold">
                  {lang === 'en' ? cabinetCase.diagnosis : cabinetCase.arDiagnosis}
                </p>
              </div>

              {/* Treatment requested */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">{lang === 'en' ? "Proposed Treatment Plan" : "خطة المداواة المقترحة"}</span>
                <p className="bg-[#001712]/5 p-3.5 rounded-xl border border-slate-200 text-slate-700 leading-relaxed font-semibold">
                  {lang === 'en' ? cabinetCase.treatmentPlan : cabinetCase.arTreatmentPlan}
                </p>
              </div>

              {/* Attachments & Interactive radiographic zoom */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">{lang === 'en' ? "Diagnostic Radiographs" : "صور الأشعة والملفات الطبية"}</span>
                <XRayVisualizer lang={lang} type={cabinetCase.xrays?.[0]} interactive={true} />
              </div>

              {/* Real-time AI Assistant Output (if exist) */}
              {cabinetCase.aiAssessment && (
                <div className="bg-[#FAFDFB] border border-emerald-100 rounded-xl p-4 space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4.5 w-4.5 text-[#00B88A]" />
                    <span className="text-xs font-bold text-[#00674F] uppercase tracking-wider">{t.aiAssistantTitle}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] leading-relaxed">
                    <div className="bg-white border border-slate-100 rounded p-2.5">
                      <span className="font-bold text-slate-500 block">Identified Anatomical Risks:</span>
                      <ul className="list-disc pl-4 space-y-1 text-slate-600 mt-1.5">
                        {(lang === 'en' ? cabinetCase.aiAssessment.insights : cabinetCase.aiAssessment.arInsights).map((ins, i) => (
                          <li key={i}>{ins}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white border border-slate-100 rounded p-2.5">
                      <span className="font-bold text-slate-500 block">Suggested Steps:</span>
                      <ul className="list-decimal pl-4 space-y-1 text-slate-600 mt-1.5">
                        {(lang === 'en' ? cabinetCase.aiAssessment.suggestedTreatmentSteps : cabinetCase.aiAssessment.arSuggestedTreatmentSteps).map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Chat timeline dialog */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">{lang === 'en' ? "Secure consultation logs" : "سجل المناقشات السريرية الآمنة"}</span>
                <div className="space-y-3 max-h-[160px] overflow-y-auto bg-slate-50 p-3 rounded-lg">
                  {cabinetCase.messages?.map((msg, idx) => (
                    <div key={idx} className="text-xs">
                      <span className="font-bold text-slate-800">{msg.senderName} ({msg.senderRole.toUpperCase()}): </span>
                      <span className="text-slate-600">{msg.content}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                    </div>
                  ))}

                  {cabinetCase.messages?.length === 0 && (
                    <p className="text-slate-400 italic text-[11px] text-center">
                      {lang === 'en' ? "Consultation channel empty. Chat is secure and HIPAA-governed." : "لم يتم تسجيل رسائل مناقشة في نفق الدردشة الآمن لـ HIPAA."}
                    </p>
                  )}
                </div>
              </div>

              {/* Chronological Security audit trail */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">{lang === 'en' ? "HIPAA secure audit logs trail" : "سجل تدقيق العمليات الموثق لـ HIPAA"}</span>
                <div className="space-y-2 text-[10px] font-mono">
                  {cabinetCase.auditLogs.map((log) => (
                    <div key={log.id} className="bg-slate-50 p-2 border border-slate-100 rounded text-slate-500">
                      <div className="flex justify-between font-bold text-slate-700">
                        <span>{lang === 'en' ? log.action : log.arAction}</span>
                        <span>{log.id}</span>
                      </div>
                      <p className="mt-1">{lang === 'en' ? log.details : log.arDetails}</p>
                      <div className="mt-1 flex justify-between text-[9px] text-slate-400">
                        <span>Op: {log.userName}</span>
                        <span>IP: {log.ipAddress}</span>
                        <span>{new Date(log.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Cabinet close action */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button 
                onClick={() => setOpenedCabinetCaseId(null)}
                className="px-5 py-2 bg-[#001712] text-[#00B88A] text-xs font-bold rounded-lg cursor-pointer"
              >
                {lang === 'en' ? "Close cabinet file" : "إغلاق ملف الخزانة السريرية"}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
