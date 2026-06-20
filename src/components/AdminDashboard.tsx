/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { translations } from '../data/translations';
import { UserProfile, VerificationRequest, AuditLog } from '../types';
import { ShieldAlert, CheckCircle, XCircle, FileText, Activity, UserCheck, ShieldCheck } from 'lucide-react';

interface AdminDashboardProps {
  lang: 'en' | 'ar';
  activeUser: UserProfile;
  verificationRequests: VerificationRequest[];
  onApproveVerification: (requestId: string) => void;
  auditLogs: AuditLog[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  lang,
  activeUser,
  verificationRequests,
  onApproveVerification,
  auditLogs
}) => {
  const t = translations[lang];
  const isRtl = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'verifications' | 'audits'>('verifications');

  return (
    <div className={`py-6 px-6 max-w-7xl mx-auto ${isRtl ? 'direction-rtl' : 'direction-ltr'}`}>
      
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <span className="text-xs text-rose-700 font-bold uppercase tracking-wider block">
            {lang === 'en' ? "DentLink Security Regulation Console" : "وحدة التحكم بخصوصية وضوابط المنصة"}
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-1 pb-1">
            {t.adminTitle}
          </h1>
          <p className="text-xs text-slate-500">
            {lang === 'en' ? "Secure audit verification dashboard and manual dental practice audits" : "إدارة الأنشطة الطبية والتحقق من التراخيص المهنية لأطباء الأسنان"}
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-slate-100 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setActiveTab('verifications')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${activeTab === 'verifications' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
          >
            <UserCheck className="h-4 w-4 mr-1 ml-1" />
            <span>{t.verificationRequests}</span>
          </button>

          <button
            onClick={() => setActiveTab('audits')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center space-x-1.5 ${activeTab === 'audits' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'}`}
          >
            <FileText className="h-4 w-4 mr-1 ml-1" />
            <span>{t.auditLogsTitle}</span>
          </button>
        </div>
      </div>

      {activeTab === 'verifications' ? (
        /* Verification requests table */
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="px-5 py-4.5 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.verificationRequests}</span>
              <span className="text-[10px] bg-rose-50 text-rose-700 px-3 py-1 rounded-full font-bold">MANUAL MODERATION REQUIRED</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-medium text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] text-slate-400 bg-slate-50/10 font-bold">
                    <th className="p-4 mr-2 ml-2">{lang === 'en' ? "Dentist Name" : "اسم الطبيب"}</th>
                    <th className="p-4">{lang === 'en' ? "Requested Role" : "التخصص المطلوب"}</th>
                    <th className="p-4">{t.licenseLabel}</th>
                    <th className="p-4">{t.nationalId}</th>
                    <th className="p-4">{lang === 'en' ? "Submitted Date" : "تاريخ الطلب"}</th>
                    <th className="p-4 text-center">{lang === 'en' ? "Review Certificate" : "شهادة الترخيص"}</th>
                    <th className="p-4 text-right">{lang === 'en' ? "Decision" : "القرار المهني"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {verificationRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-[#001712]">
                        {lang === 'en' ? req.dentistName : req.arDentistName}
                      </td>
                      <td className="p-4 capitalize">
                        {req.role === 'gp' ? 'General Practitioner' : 'Medical Specialist'}
                      </td>
                      <td className="p-4 font-mono select-all text-slate-500">{req.licenseNumber}</td>
                      <td className="p-4 font-mono text-slate-500">{req.nationalID}</td>
                      <td className="p-4 text-slate-400">
                        {new Date(req.submittedAt).toLocaleDateString(isRtl ? 'ar' : 'en')}
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded bg-[#001712]/5 text-[#00674F] font-semibold text-[10px] border border-emerald-900/10">
                          {req.certificateUrl}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {req.status === 'pending' ? (
                          <div className="flex justify-end space-x-1.5">
                            <button
                              onClick={() => {
                                onApproveVerification(req.id);
                                alert(lang === 'en' ? "Licensing credentials verified! Badge assigned." : "تم قبول الترخيص بنجاح وصرف الشارة للطبيب.");
                              }}
                              className="px-3.5 py-1.5 bg-[#00674F] hover:bg-[#00503D] text-white font-bold text-[10px] rounded-lg cursor-pointer"
                            >
                              {lang === 'en' ? "Verify" : "موافقة واعتماد"}
                            </button>
                            <button
                              onClick={() => alert("Credentials verification returned for missing documents.")}
                              className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-[10px] rounded-lg cursor-pointer"
                            >
                              {lang === 'en' ? "Decline" : "رفض"}
                            </button>
                          </div>
                        ) : (
                          <span className="text-emerald-700 font-bold flex items-center justify-end">
                            <CheckCircle className="h-4 w-4 mr-1 ml-1" />
                            <span>{lang === 'en' ? "Approved & Verified" : "معتمد وموثق"}</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {verificationRequests.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        {lang === 'en' ? "No requests pending evaluation." : "لا توجد طلبات تحقق معلقة متبقية."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* Immutable Audit Logs trace viewer */
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.auditLogsTitle} (HIPAA SECURE AD-TRAIL)</h4>
              <span className="px-2 py-0.5 text-[10px] bg-emerald-950/20 text-emerald-800 font-bold rounded">ENCRYPTED IMMUTABLE MEMORY</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] text-slate-400 bg-slate-50/10 font-bold">
                    <th className="p-4 mr-2 ml-2">{lang === 'en' ? "Trigger Trace Index" : "معرّف الإجراء المتتبع"}</th>
                    <th className="p-4">{t.actionLog}</th>
                    <th className="p-4">{t.operator}</th>
                    <th className="p-4">{t.ipAddress}</th>
                    <th className="p-4">{lang === 'en' ? "Trace UTC Timestamp" : "التوقيت الزمني"}</th>
                    <th className="p-4 text-right">{t.details}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-mono text-[10px] text-slate-400">{log.id}</td>
                      <td className="p-4 text-[#00674F] font-bold">
                        {lang === 'en' ? log.action : log.arAction}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{log.userName}</div>
                        <div className="text-[10px] text-slate-400">ID: {log.userId}</div>
                      </td>
                      <td className="p-4 font-mono text-slate-500">{log.ipAddress}</td>
                      <td className="p-4 font-mono text-slate-400">
                        {log.timestamp}
                      </td>
                      <td className="p-4 text-right max-w-xs truncate text-[11px] text-slate-500">
                        {lang === 'en' ? log.details : log.arDetails}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
