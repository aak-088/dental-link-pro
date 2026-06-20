/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { translations } from '../data/translations';
import { StudentCase, UserProfile } from '../types';
import { Award, BookOpen, MessageSquare, ThumbsUp, Send, Share2, Plus, Users, Clock } from 'lucide-react';

interface StudentDashboardProps {
  lang: 'en' | 'ar';
  activeUser: UserProfile;
  studentCases: StudentCase[];
  onAddStudentCase: (newCase: StudentCase) => void;
  onUpdateStudentCase: (updatedCase: StudentCase) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  lang,
  activeUser,
  studentCases,
  onAddStudentCase,
  onUpdateStudentCase
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const [showSubmission, setShowSubmission] = useState(false);
  const [caseTitle, setCaseTitle] = useState('');
  const [caseDesc, setCaseDesc] = useState('');
  const [caseTags, setCaseTags] = useState('');
  const [caseImage, setCaseImage] = useState('https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&q=80&w=300');

  // Comment state
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleUpvote = (caseId: string) => {
    const target = studentCases.find(c => c.id === caseId);
    if (!target) return;

    const updated: StudentCase = {
      ...target,
      upvotes: target.upvotes + 1
    };
    onUpdateStudentCase(updated);
  };

  const handlePostComment = (e: React.FormEvent, caseId: string) => {
    e.preventDefault();
    if (!commentText) return;

    const target = studentCases.find(c => c.id === caseId);
    if (!target) return;

    const updated: StudentCase = {
      ...target,
      comments: [
        ...target.comments,
        {
          id: "comm_" + Math.floor(Math.random() * 1000),
          author: activeUser.name,
          role: "Student",
          arRole: "طالب أسنان",
          content: commentText,
          timestamp: new Date().toISOString(),
          isVerifiedSpecialist: false
        }
      ]
    };
    onUpdateStudentCase(updated);
    setCommentText('');
  };

  const handleSubmitCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseTitle || !caseDesc) {
      alert("Please enter case details!");
      return;
    }

    const tagsArray = caseTags ? caseTags.split(',').map(tag => tag.trim()) : ["General"];

    const newCase: StudentCase = {
      id: "stud_case_" + Math.floor(100 + Math.random() * 900),
      studentId: activeUser.id,
      studentName: activeUser.name,
      university: activeUser.university || "KSU Faculty",
      title: caseTitle,
      arTitle: caseTitle,
      description: caseDesc,
      arDescription: caseDesc,
      image: caseImage,
      upvotes: 1,
      createdAt: new Date().toISOString(),
      tags: tagsArray,
      comments: []
    };

    onAddStudentCase(newCase);
    setCaseTitle('');
    setCaseDesc('');
    setCaseTags('');
    setShowSubmission(false);
  };

  return (
    <div className={`py-6 px-6 max-w-7xl mx-auto ${isRtl ? 'direction-rtl' : 'direction-ltr'}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <span className="text-xs text-[#00674F] font-bold uppercase tracking-wider">
            {lang === 'en' ? "Dental Student Educational Forum" : "أوائل طلبة الأسنان - النقاش السريري المفتوح"}
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            {t.studentNetHeader}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t.studentSub}
          </p>
        </div>

        {!showSubmission && (
          <button
            onClick={() => setShowSubmission(true)}
            className="px-4.5 py-2.5 bg-[#00674F] hover:bg-[#00503D] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center cursor-pointer shrink-0"
          >
            <Plus className={`h-4 w-4 ${isRtl ? 'ml-1.5' : 'mr-1.5'}`} />
            <span>{t.uploadCaseBtn}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Student Profile & Badge Metrics */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
            <div className="text-center pb-5 border-b border-slate-100">
              <img 
                src={activeUser.avatar} 
                alt={activeUser.name} 
                className="w-16 h-16 rounded-full mx-auto object-cover border border-slate-200 mb-3" 
                referrerPolicy="no-referrer"
              />
              <h3 className="text-sm font-bold text-slate-800">{lang === 'en' ? activeUser.name : activeUser.arName}</h3>
              <p className="text-[11px] text-[#00674F] font-semibold mt-1">{lang === 'en' ? activeUser.university : activeUser.arUniversity}</p>
            </div>

            <div className="pt-4.5 space-y-4">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.studentBadges}</h4>
              
              {/* Point tracker */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-2 mr-1 ml-1">
                  <Award className="h-5 w-5 text-amber-500 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block leading-none">{t.pointsText}</span>
                    <span className="text-sm font-black text-slate-800 mt-1 block">
                      {activeUser.studentStats?.points} PTS
                    </span>
                  </div>
                </div>
                <span className="text-[9px] bg-amber-500/10 text-amber-700 font-bold px-2 py-0.5 rounded-full border border-amber-500/20 font-mono">
                  {lang === 'en' ? `${activeUser.studentStats?.tier} Tier` : `الرتبة: ${activeUser.studentStats?.arTier}`}
                </span>
              </div>

              {/* Badges Earned Container */}
              <div className="space-y-2">
                <span className="text-[10px] text-slate-400 block font-semibold">{t.badgesEarned}:</span>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 border border-slate-200 bg-white rounded-lg flex items-center space-x-1.5 mr-1 ml-1 shrink-0">
                    <span className="text-base">🥉</span>
                    <span className="font-semibold text-slate-600">{t.bronzeBadge}</span>
                  </div>
                  <div className="p-2 border border-slate-200 bg-white rounded-lg flex items-center space-x-1.5 shrink-0">
                    <span className="text-base">🥈</span>
                    <span className="font-semibold text-slate-600">{t.silverBadge}</span>
                  </div>
                  <div className="p-2 border border-amber-500/30 bg-amber-500/5 rounded-lg flex items-center space-x-1.5 mr-1 ml-1 shrink-0 col-span-2">
                    <span className="text-lg">🥇</span>
                    <span className="font-bold text-amber-800">{t.goldBadge}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Educational Cases Feed */}
        <div className="lg:col-span-8 space-y-6">
          
          {showSubmission ? (
            /* Submission case form */
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-[#001712] mb-4 pb-3 border-b border-slate-100">
                {lang === 'en' ? "Describe Academic Case Study" : "نشر حالة سريرية أكاديمية للتأهيل"}
              </h3>
              <form onSubmit={handleSubmitCase} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    {lang === 'en' ? "Case Investigation Title" : "عنوان القضية السريرية"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apexification of incisor #11 with MTA plug..."
                    value={caseTitle}
                    onChange={(e) => setCaseTitle(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:border-[#00674F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    {lang === 'en' ? "Intervention Description & Outcomes" : "وصف الحالة والتدخل العلاجي السريري"}
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe clinical parameters, symptoms, radiography details, files, apex length, materials chosen..."
                    value={caseDesc}
                    onChange={(e) => setCaseDesc(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs focus:border-[#00674F]"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">
                    {lang === 'en' ? "Keywords / Tags (comma separated)" : "الكلمات الدلالية المرافقة (مفصولة بفاصلة)"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Endodontics, MTA, Apexification, Trauma"
                    value={caseTags}
                    onChange={(e) => setCaseTags(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs focus:border-[#00674F]"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmission(false)}
                    className="px-4 py-2 border border-slate-200 text-xs font-bold rounded-lg text-slate-600"
                  >
                    {lang === 'en' ? "Cancel" : "إلغاء"}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#00674F] text-white text-xs font-bold rounded-lg hover:bg-[#00503D]"
                  >
                    {lang === 'en' ? "Publish Study" : "نشر الدراسة فوراً"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Feed list */
            <div className="space-y-6">
              {studentCases.map((c) => (
                <div key={c.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                  <div className="p-5">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-950 hover:text-[#00674F] transition-colors leading-snug">
                          {lang === 'en' ? c.title : c.arTitle}
                        </h3>
                        <div className="flex items-center space-x-2 mt-2 text-[10px] text-slate-400">
                          <span className="font-semibold text-slate-600">{c.studentName}</span>
                          <span>•</span>
                          <span>{c.university}</span>
                          <span>•</span>
                          <span>{new Date(c.createdAt).toLocaleDateString(isRtl ? 'ar' : 'en')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Desc */}
                    <p className="text-xs text-slate-500 leading-relaxed mb-4">
                      {lang === 'en' ? c.description : c.arDescription}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {c.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions panel */}
                    <div className="flex items-center space-x-4 border-t border-b border-slate-100 py-2.5">
                      <button 
                        onClick={() => handleUpvote(c.id)}
                        className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-[#00674F] cursor-pointer"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1 ml-1" />
                        <span>{c.upvotes} {lang === 'en' ? "Upvotes" : "تأييد وموافقة"}</span>
                      </button>

                      <button 
                        onClick={() => setActiveCaseId(activeCaseId === c.id ? null : c.id)}
                        className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 hover:text-[#00674F] cursor-pointer"
                      >
                        <MessageSquare className="h-4 w-4 mr-1 ml-1" />
                        <span>{c.comments.length} {lang === 'en' ? "Academic Comments" : "مراجعة علمية للأخصائيين"}</span>
                      </button>
                    </div>

                    {/* Comments accordion drawer */}
                    {activeCaseId === c.id && (
                      <div className="mt-4 space-y-4 pt-2">
                        <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                          {t.commentsList}
                        </h4>
                        
                        <div className="space-y-3">
                          {c.comments.map((comm) => (
                            <div key={comm.id} className="bg-slate-50/70 p-3 rounded-lg border border-slate-100 text-xs">
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-bold text-slate-800 flex items-center">
                                  <span>{comm.author}</span>
                                  {comm.isVerifiedSpecialist && (
                                    <span className="ml-1.5 mr-1.5 text-[9px] font-bold bg-[#00674F]/10 text-[#00674F] px-1.5 py-0.5 rounded">
                                      {t.verified}
                                    </span>
                                  )}
                                </span>
                                <span className="text-[9px] text-slate-400">
                                  {new Date(comm.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-slate-600 mt-1 leading-relaxed">{comm.content}</p>
                            </div>
                          ))}
                        </div>

                        {/* Compose comment */}
                        <form onSubmit={(e) => handlePostComment(e, c.id)} className="flex space-x-2 pt-2">
                          <input
                            type="text"
                            required
                            placeholder={lang === 'en' ? "Provide academic feedback or clinical inquiry..." : "تقديم مراجعة أو فحص أكاديمي..."}
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="flex-1 bg-white border border-slate-200 rounded-lg p-2 text-xs focus:border-[#00674F]"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 bg-[#001712] text-[#00B88A] rounded-lg text-xs font-bold hover:bg-black cursor-pointer"
                          >
                            {t.send}
                          </button>
                        </form>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
