/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { translations } from '../data/translations';
import { mockSpecialists, SpecialistSearchItem } from '../data/initialData';
import { 
  Network, Eye, ShieldCheck, Award, Sparkles, BookOpen, 
  ArrowRight, Check, Search, MapPin, Star, Clock 
} from 'lucide-react';

interface LandingPageProps {
  lang: 'en' | 'ar';
  setLang: (lang: 'en' | 'ar') => void;
  onLaunchRole: (role: 'gp' | 'specialist' | 'student' | 'clinic' | 'patient' | 'admin') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ lang, setLang, onLaunchRole }) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  // State for interactive Quick Search
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [searchResults, setSearchResults] = useState<SpecialistSearchItem[]>(mockSpecialists.slice(0, 3));
  const [searched, setSearched] = useState(false);

  const specialtiesList = [
    { en: "Endodontics", ar: "علاج عصب الأسنان" },
    { en: "Orthodontics", ar: "تقويم الأسنان" },
    { en: "Oral Surgery", ar: "جراحة الفم والفكين" },
    { en: "Implantology", ar: "زراعة الأسنان" },
    { en: "Pediatric Dentistry", ar: "طب أسنان الأطفال" }
  ];

  const citiesList = [
    { en: "Riyadh", ar: "الرياض" },
    { en: "Jeddah", ar: "جدة" },
    { en: "Dammam", ar: "الدمام" }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    let filtered = mockSpecialists;
    if (searchSpecialty) {
      filtered = filtered.filter(item => item.specialty.toLowerCase() === searchSpecialty.toLowerCase());
    }
    if (searchCity) {
      filtered = filtered.filter(item => item.city.toLowerCase() === searchCity.toLowerCase());
    }
    setSearchResults(filtered);
    setSearched(true);
  };

  return (
    <div className={`min-h-screen bg-[#FAFAFA] text-slate-900 ${isRtl ? 'direction-rtl' : 'direction-ltr'}`}>
      
      {/* Premium Header */}
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 rounded-xl bg-[#00674F] flex items-center justify-center text-white font-bold text-xl tracking-tight leading-none">
              D
            </div>
            <div>
              <span className="text-lg font-bold text-[#001712] tracking-tight">{t.brandName}</span>
              <span className="hidden sm:block text-[10px] text-[#00B88A] font-medium tracking-wide uppercase">{t.tagline}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Quick dashboard shortcuts for evaluation */}
            <span className="text-xs text-slate-400 font-mono hidden md:inline-block">
              {lang === 'en' ? "SECURE SANDBOX ENVIRONMENT" : "بيئة تجريبية معتمدة وآمنة"}
            </span>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="px-3.5 py-1.5 border border-slate-200 hover:border-[#00674F] text-xs font-semibold rounded-lg bg-white card-hover-effect cursor-pointer"
            >
              {t.langName}
            </button>

            {/* Live Workspace Entrance */}
            <button
              id="btn_launch_workspace"
              onClick={() => onLaunchRole('gp')}
              className="px-4 py-2 bg-[#00674F] hover:bg-[#00503D] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex items-center"
            >
              <span>{t.viewDashboard}</span>
              <ArrowRight className={`h-3 w-3 ${isRtl ? 'rotate-180 mr-1.5' : 'ml-1.5'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white to-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Security Trust MicroTag */}
            <div className="inline-flex items-center self-start px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs text-[#00674F] font-semibold mb-6">
              <ShieldCheck className="h-4 w-4 mr-1.5 ml-1.5 text-[#00674F]" />
              <span>{t.trustBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              {t.heroTitle}
            </h1>
            
            <p className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl">
              {t.heroSub}
            </p>

            {/* Core Segment CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                id="btn_join_dentist"
                onClick={() => onLaunchRole('gp')}
                className="px-6 py-3 bg-[#00674F] hover:bg-[#00503D] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {t.joinAsDentist}
              </button>
              
              <button
                onClick={() => onLaunchRole('student')}
                className="px-6 py-3 bg-[#001712] hover:bg-[#000502] text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                {t.joinAsStudent}
              </button>

              <a
                href="#quick_finder"
                className="px-6 py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer"
              >
                {t.findSpecialist}
              </a>
            </div>

            {/* Quick stat highlights */}
            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-slate-100 max-w-md">
              <div>
                <dt className="text-xl font-bold text-[#00674F]">500+</dt>
                <dd className="text-xs text-slate-400 mt-1">{lang === 'en' ? 'Verified Specialists' : 'أخصائي معتمد'}</dd>
              </div>
              <div>
                <dt className="text-xl font-bold text-[#00674F]">14K+</dt>
                <dd className="text-xs text-slate-400 mt-1">{lang === 'en' ? 'Surgical Referrals' : 'إحالة سريرية ناجحة'}</dd>
              </div>
              <div>
                <dt className="text-xl font-bold text-[#00674F]">100%</dt>
                <dd className="text-xs text-slate-400 mt-1">{lang === 'en' ? 'HIPAA Encrypted' : 'تشفير آمن للمعلومات'}</dd>
              </div>
            </div>
          </div>

          {/* Interactive CSS 3D Concept Mockup */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xl overflow-hidden">
              
              {/* Decorative nodes linking */}
              <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-100 via-emerald-600 to-teal-100 -translate-y-1/2 opacity-20"></div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#001712] text-white border border-slate-800">
                  <div className="flex items-center space-x-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping mr-1 ml-1" />
                    <div>
                      <h4 className="text-xs font-bold leading-none">Riyadh Family Dentistry</h4>
                      <p className="text-[9px] text-slate-400 mt-1">{lang === 'en' ? 'Transmitting Case #101' : 'جاري إحالة الحالة رقم ١٠١'}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-semibold font-mono">GP</span>
                </div>

                {/* Animated middle hub */}
                <div className="flex justify-center my-1.5">
                  <div className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#00674F] to-[#00B88A] text-white text-xs font-bold flex items-center space-x-2 shadow-md">
                    <Network className="h-3.5 w-3.5 mr-1 ml-1 animate-spin" />
                    <span>DentLink Encrypted Tunnel</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold mr-1.5 ml-1.5">TM</div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">Dr. Tariq Al-Mansoor</h4>
                        <p className="text-[9px] text-slate-400 mt-1">{lang === 'en' ? 'Endodontics - Riyadh' : 'علاج عصب الأسنان - الرياض'}</p>
                      </div>
                    </div>
                    <span className="text-[10px] bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full border border-sky-100 font-semibold font-mono">SPEC</span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg text-[9px] text-slate-500 font-mono flex items-center space-x-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 mr-1 ml-1" />
                    <span>Radiograph Hash: AES-256 Validated</span>
                  </div>
                </div>
              </div>

              {/* Background accent blobs */}
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#00B88A] rounded-full filter blur-xl opacity-10"></div>
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#00674F] rounded-full filter blur-xl opacity-10"></div>
            </div>
          </div>

        </div>
      </header>

      {/* Interactive Quick Specialist Finder Widget */}
      <section id="quick_finder" className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#FAFDFB] border border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            
            <div className="mb-6">
              <h3 className="text-lg sm:text-xl font-bold text-[#001712] flex items-center">
                <Search className="h-5 w-5 mr-2 ml-2 text-[#00674F]" />
                <span>{lang === 'en' ? "Interactive Specialist Matching" : "محاكاة مطابقة الاستشاريين الفورية"}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'en' ? "Simulate the specialist search discovery pipeline before dispatching structured cases" : "اختبر كفاءة محرك البحث واستعرض ملفات الأخصائيين والعيادات المهنية الآن"}
              </p>
            </div>

            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-5 relative">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {lang === 'en' ? "Dental Specialty" : "التخصص الطبي المطلوب"}
                </label>
                <select
                  value={searchSpecialty}
                  onChange={(e) => setSearchSpecialty(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:border-[#00674F]"
                >
                  <option value="">{lang === 'en' ? "All Specialties" : "كافة التخصصات السريرية"}</option>
                  {specialtiesList.map((spec, i) => (
                    <option key={i} value={spec.en}>{lang === 'en' ? spec.en : spec.ar}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-5 relative">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  {lang === 'en' ? "Region / City" : "المنطقة والمدينة"}
                </label>
                <select
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:border-[#00674F]"
                >
                  <option value="">{lang === 'en' ? "All Cities" : "كافة المدن"}</option>
                  {citiesList.map((city, i) => (
                    <option key={i} value={city.en}>{lang === 'en' ? city.en : city.ar}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 flex items-end">
                <button
                  type="submit"
                  className="w-full bg-[#00674F] hover:bg-[#00503D] text-white font-bold p-2.5 rounded-lg text-xs shadow-sm transition-all hover:scale-105 cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Search className="h-4 w-4 mr-1.5 ml-1.5" />
                  <span>{lang === 'en' ? "Query" : "استعلام"}</span>
                </button>
              </div>
            </form>

            {/* Results Grid */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {searchResults.length > 0 ? (
                searchResults.map((spec) => (
                  <div key={spec.id} className="bg-white border border-slate-100 rounded-xl p-4 shadow-xs hover:shadow-md card-hover-effect flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <img 
                          src={spec.avatar} 
                          alt={spec.name} 
                          className="w-11 h-11 rounded-full object-cover border border-slate-200 mr-2 ml-2" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 flex items-center">
                            <span>{lang === 'en' ? spec.name : spec.arName}</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 ml-1.5 mr-1.5" title="Verified Professional"></span>
                          </h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{lang === 'en' ? spec.clinic : spec.arClinic}</p>
                        </div>
                      </div>

                      <div className="space-y-1.5 py-2.5 border-t border-slate-100">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">{lang === 'en' ? "Specialty" : "التخصص السريري"}</span>
                          <span className="font-semibold text-[#00674F]">{lang === 'en' ? spec.specialty : spec.arSpecialty}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">{lang === 'en' ? "Experience" : "الخبرة المهنية"}</span>
                          <span className="font-semibold text-slate-700">{spec.experience} Yrs</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">{lang === 'en' ? "Availability" : "مواعيد الإحالة"}</span>
                          <span className="font-semibold text-emerald-700 flex items-center">
                            <Clock className="h-3 w-3 mr-1 ml-1" />
                            <span>{lang === 'en' ? spec.availability : spec.arAvailability}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onLaunchRole('gp')}
                      className="w-full mt-4 py-2 bg-slate-50 hover:bg-[#001712] hover:text-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 transition-colors cursor-pointer"
                    >
                      {lang === 'en' ? "Initiate Dental Case Referral" : "بدء إحالة مريض سريرية"}
                    </button>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-8 text-xs text-slate-400">
                  {lang === 'en' ? "No specialists matching criteria found." : "لا يوجد أطباء استشاريين يطابقون هذه الفلاتر حالياً."}
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {t.featuresTitle}
            </h2>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              {t.featuresSub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feat 1: Referral System */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md card-hover-effect">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00674F] flex items-center justify-center mb-5">
                <Network className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">{t.refSystemTitle}</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{t.refSystemDesc}</p>
            </div>

            {/* Feat 2: Case Management */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md card-hover-effect">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00674F] flex items-center justify-center mb-5">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">{t.caseMgmtTitle}</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{t.caseMgmtDesc}</p>
            </div>

            {/* Feat 3: Specialist Discovery */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md card-hover-effect">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00674F] flex items-center justify-center mb-5">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">{t.specDiscoveryTitle}</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{t.specDiscoveryDesc}</p>
            </div>

            {/* Feat 4: Student Network */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md card-hover-effect">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00674F] flex items-center justify-center mb-5">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">{t.studentNetTitle}</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{t.studentNetDesc}</p>
            </div>

            {/* Feat 5: AI Clinical Assistant */}
            <div className="bg-white border border-[#00B88A]/30 rounded-2xl p-6 shadow-xs hover:shadow-md card-hover-effect ring-1 ring-emerald-100">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00674F] flex items-center justify-center mb-5">
                <Sparkles className="h-5 w-5 text-[#00B88A]" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 flex items-center">
                <span>{t.aiClinicalTitle}</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-700 px-1.5 py-0.5 rounded ml-2 mr-2">INTEGRATED</span>
              </h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{t.aiClinicalDesc}</p>
            </div>

            {/* Feat 6: HIPAA Security */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-md card-hover-effect">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#00674F] flex items-center justify-center mb-5">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-800">{t.securityTitle}</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{t.securityDesc}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Membership Plans */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {t.pricingTitle}
            </h2>
            <p className="text-xs text-slate-400 mt-2 uppercase tracking-widest font-bold">
              {lang === 'en' ? "Fair and transparent pricing - absolutely no selling of patient information" : "مبادئ شفافة وقانونية خاضعة لـ HIPAA - نرفض كلياً بيع بيانات المرضى أو تداولها"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Tier 1 */}
            <div className="bg-[#FAFAFA] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase">{t.freePlan}</h4>
                <p className="text-xs text-slate-400 mt-1">{t.freeDesc}</p>
                <div className="my-6">
                  <span className="text-3xl font-black text-[#001712]">0 SAR</span>
                  <span className="text-xs text-slate-400"> / {lang === 'en' ? 'month' : 'شهرياً'}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center"><Check className="h-4 w-4 text-emerald-500 mr-2 ml-2 shrink-0" /> {lang === 'en' ? "Basic Referral dispatching" : "إرسال الإحالات الأساسية"}</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-emerald-500 mr-2 ml-2 shrink-0" /> {lang === 'en' ? "Verified Clinical Portfolio" : "ملف تعريفي معتمد للجمهور"}</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-emerald-500 mr-2 ml-2 shrink-0" /> {lang === 'en' ? "Up to 10 Radiographs storage" : "مساحة حفظ لـ ١٠ صور إشعاعية"}</li>
                </ul>
              </div>
              <button onClick={() => onLaunchRole('gp')} className="w-full mt-8 py-2.5 bg-white border border-slate-300 hover:border-[#00674F] text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer">
                {t.selectPlan}
              </button>
            </div>

            {/* Tier 2 (Pro) */}
            <div className="bg-white border-2 border-[#00674F] rounded-2xl p-6 relative shadow-lg flex flex-col justify-between transform lg:-translate-y-2">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00B88A] text-white font-bold text-[9px] px-3 py-1 rounded-full uppercase tracking-wider">
                {lang === 'en' ? "MOST POPULAR" : "الأكثر طلباً"}
              </span>
              <div>
                <h4 className="text-sm font-bold text-[#00674F] uppercase">{t.proPlan}</h4>
                <p className="text-xs text-slate-400 mt-1">{t.proDesc}</p>
                <div className="my-6">
                  <span className="text-3xl font-black text-[#001712]">399 SAR</span>
                  <span className="text-xs text-slate-400"> / {lang === 'en' ? 'month' : 'شهرياً'}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center"><Check className="h-4 w-4 text-emerald-500 mr-2 ml-2 shrink-0" /> {lang === 'en' ? "Unlimited medical referrals" : "إحالات مرضية غير محدودة"}</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-emerald-500 mr-2 ml-2 shrink-0" /> {lang === 'en' ? "Priority listing in specialist discovery" : "أولوية الظهور في نتائج البحث"}</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-emerald-500 mr-2 ml-2 shrink-0" /> {lang === 'en' ? "AI Diagnostics engine integration" : "تكامل كلي للمساعد التشخيصي AI"}</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-emerald-500 mr-2 ml-2 shrink-0" /> {lang === 'en' ? "Advanced analytics dashboard stats" : "إحصائيات وتحليلات نمو متقدمة"}</li>
                </ul>
              </div>
              <button onClick={() => onLaunchRole('gp')} className="w-full mt-8 py-2.5 bg-[#00674F] hover:bg-[#00503D] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">
                {t.selectPlan}
              </button>
            </div>

            {/* Tier 3 */}
            <div className="bg-[#FAFAFA] border border-slate-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase">{t.entPlan}</h4>
                <p className="text-xs text-slate-400 mt-1">{t.entDesc}</p>
                <div className="my-6">
                  <span className="text-3xl font-black text-[#001712]">1,200 SAR</span>
                  <span className="text-xs text-slate-400"> / {lang === 'en' ? 'month' : 'شهرياً'}</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-center"><Check className="h-4 w-4 text-emerald-500 mr-2 ml-2 shrink-0" /> {lang === 'en' ? "Multi-clinic and centers accounts" : "إدارة مراكز وعيادات متعددة الفروع"}</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-emerald-500 mr-2 ml-2 shrink-0" /> {lang === 'en' ? "Staff clinician dispatch allocation" : "جدولة الطاقم وإرسال ملفات المرضى داخلياً"}</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-emerald-500 mr-2 ml-2 shrink-0" /> {lang === 'en' ? "Audit Logs HIPAA Export" : "تصدير سجلات العمليات الطبية"}</li>
                  <li className="flex items-center"><Check className="h-4 w-4 text-emerald-500 mr-2 ml-2 shrink-0" /> {lang === 'en' ? "Custom EHR / PMS API integration" : "واجهات ربط مع برامج العيادات الكبرى"}</li>
                </ul>
              </div>
              <button onClick={() => onLaunchRole('clinic')} className="w-full mt-8 py-2.5 bg-[#001712] hover:bg-black text-white text-xs font-bold rounded-lg transition-colors cursor-pointer">
                {t.selectPlan}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Strategic Roadmap Section */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {t.roadmapTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              {lang === 'en' ? "Our engineering milestones towards clinical leadership in the region" : "خطوات تطور منصتنا نحو تحقيق آفاق النمو والتوسع في العالم العربي"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            
            <div className="bg-white border-t-4 border-[#00674F] rounded-xl p-4 shadow-xs">
              <span className="text-xs font-bold text-[#00674F]">PHASE 1</span>
              <h4 className="text-xs font-bold text-slate-800 mt-1">{lang === 'en' ? "Referral Network" : "شبكة الإحالات المؤمنة"}</h4>
              <p className="text-[11px] text-slate-500 mt-2">{lang === 'en' ? "Bespoke HIPAA case file lockers and specialist matching engines." : "ربط الأطباء وإطلاق ملف التخزين المشفر واستشارات الغدد السنية."}</p>
            </div>

            <div className="bg-white border-t-4 border-[#00674F]/70 rounded-xl p-4 shadow-xs">
              <span className="text-xs font-bold text-[#00674F]/70">PHASE 2</span>
              <h4 className="text-xs font-bold text-slate-800 mt-1">{lang === 'en' ? "Patient Discovery" : "سوق اكتشاف المرضى"}</h4>
              <p className="text-[11px] text-slate-500 mt-2">{lang === 'en' ? "Enabling direct patient search and verified dental consultation request." : "سوق مخصصة لحجز مواعيد وتوجيه علاج المريض للأخصائي المباشر."}</p>
            </div>

            <div className="bg-white border-t-4 border-[#00B88A] rounded-xl p-4 shadow-xs">
              <span className="text-xs font-bold text-[#00B88A]">PHASE 3</span>
              <h4 className="text-xs font-bold text-slate-800 mt-1">{lang === 'en' ? "AI Decisions" : "المساعد الطبي الذكي"}</h4>
              <p className="text-[11px] text-slate-500 mt-2">{lang === 'en' ? "Radiographic bone level detection and automated difficult indexing." : "تحليل ذكي فوري لصور الأشعة وتنبؤات نجاح غرس وزرع الأسنان."}</p>
            </div>

            <div className="bg-white border-t-4 border-slate-300 rounded-xl p-4 shadow-xs opacity-75">
              <span className="text-xs font-bold text-slate-400">PHASE 4</span>
              <h4 className="text-xs font-bold text-slate-800 mt-1">{lang === 'en' ? "Mobile Units" : "عيادات ومراكز متنقلة"}</h4>
              <p className="text-[11px] text-slate-500 mt-2">{lang === 'en' ? "Physical support units dispatched to remote clinical clinics in real-time." : "دعم تكنولوجي وسريري للمناطق الريفية والمدارس غير الحضرية."}</p>
            </div>

            <div className="bg-white border-t-4 border-slate-300 rounded-xl p-4 shadow-xs opacity-75">
              <span className="text-xs font-bold text-slate-400">PHASE 5</span>
              <h4 className="text-xs font-bold text-slate-800 mt-1">{lang === 'en' ? "Arab Expansion" : "التوسع الإقليمي الشامل"}</h4>
              <p className="text-[11px] text-slate-500 mt-2">{lang === 'en' ? "Connecting major dental care guilds in Saudi Arabia, Egypt, and UAE." : "تحقيق الريادة والاعتماد المهني في المملكة والخليج وأفريقيا."}</p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#001712] text-white py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-[#00674F] flex items-center justify-center font-bold text-white text-base">
                D
              </div>
              <span className="text-sm font-bold tracking-tight">{t.brandName}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 max-w-xs leading-relaxed">
              {lang === 'en' 
                ? "The professional dental referral and safe healthcare collaboration ecosystem in the Arab world." 
                : "المنصة المهنية المعتمدة لشبكات التعاون السريري وإحالات الأسنان الآمنة للأخصائيين والمراكز في الشرق الأوسط."}
            </p>
          </div>
          
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider mb-3 text-[#00B88A]">
              {lang === 'en' ? "Clinical Portals" : "بوابة العيادات التخصصية"}
            </h5>
            <div className="flex flex-col space-y-2 text-xs text-slate-300">
              <button onClick={() => onLaunchRole('gp')} className="text-left cursor-pointer hover:text-white">{t.gpName}</button>
              <button onClick={() => onLaunchRole('specialist')} className="text-left cursor-pointer hover:text-white">{t.specialistName}</button>
              <button onClick={() => onLaunchRole('student')} className="text-left cursor-pointer hover:text-white">{t.studentName}</button>
            </div>
          </div>

          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider mb-3 text-[#00B88A]">
              {lang === 'en' ? "Regulatory Compliance" : "المعايير الطبية المعتمدة"}
            </h5>
            <div className="text-[11px] text-slate-400 space-y-2 leading-relaxed">
              <div className="flex items-center space-x-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mr-1 ml-1" />
                <span>{lang === 'en' ? "Fully encrypted HIPAA Compliant" : "تشفيرات وطاقم طبي متوافق مع HIPAA"}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0 mr-1 ml-1" />
                <span>{lang === 'en' ? "Saudi MOH Licensing compatible" : "متوافق مع تراخيص وزارة الصحة السعودية"}</span>
              </div>
              <div className="text-[9px] text-[#00B88A] pt-1">
                © 2026 DentLink Pro. All Rights and Professional Clinical Care Secured.
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
