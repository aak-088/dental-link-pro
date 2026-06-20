/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = 'gp' | 'specialist' | 'student' | 'clinic' | 'patient' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  arName: string;
  role: UserRole;
  avatar: string;
  email: string;
  phone: string;
  city: string;
  arCity: string;
  specialty?: string;
  arSpecialty?: string;
  experience?: number;
  rating?: number;
  clinicName?: string;
  arClinicName?: string;
  university?: string;
  arUniversity?: string;
  verified: boolean;
  licenseNumber?: string;
  casesCompleted?: number;
  referralStats?: {
    totalSent: number;
    totalReceived: number;
    accepted: number;
    completed: number;
    avgResponseTime: string; // e.g., "1.2 hours"
    arAvgResponseTime: string;
  };
  studentStats?: {
    points: number;
    tier: 'Bronze' | 'Silver' | 'Gold' | 'Elite';
    arTier: string;
    verifiedCases: number;
  };
}

export type CaseStatus = 'new' | 'under_review' | 'accepted' | 'scheduled' | 'completed';

export interface AuditLog {
  id: string;
  action: string;
  arAction: string;
  timestamp: string;
  userId: string;
  userName: string;
  ipAddress: string;
  details: string;
  arDetails: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  timestamp: string;
  attachmentUrl?: string;
  attachmentName?: string;
}

export interface AIAssessment {
  difficulty: 'Low' | 'Moderate' | 'High';
  arDifficulty: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  arRiskLevel: string;
  suggestedSpecialty: string;
  arSuggestedSpecialty: string;
  insights: string[];
  arInsights: string[];
  suggestedTreatmentSteps: string[];
  arSuggestedTreatmentSteps: string[];
  recommendedSpecialists: string[]; // names
}

export interface DentalCase {
  id: string;
  patientInitials: string; // HIPAA-compliant: No full name publicly visible
  patientAge: number;
  patientGender: 'M' | 'F';
  arPatientGender: string;
  dentistId: string; // Sender
  specialistId: string; // Receiver
  dentistName: string;
  specialistName: string;
  diagnosis: string;
  arDiagnosis: string;
  treatmentPlan: string;
  arTreatmentPlan: string;
  status: CaseStatus;
  createdAt: string;
  xrays: string[];
  cbct?: string[];
  photos?: string[];
  auditLogs: AuditLog[];
  messages: ChatMessage[];
  aiAssessment?: AIAssessment;
  urgency: 'routine' | 'urgent' | 'emergency';
  arUrgency: string;
}

export interface StudentCase {
  id: string;
  studentId: string;
  studentName: string;
  university: string;
  title: string;
  arTitle: string;
  description: string;
  arDescription: string;
  image: string;
  comments: {
    id: string;
    author: string;
    role: string;
    arRole: string;
    content: string;
    timestamp: string;
    isVerifiedSpecialist: boolean;
  }[];
  upvotes: number;
  createdAt: string;
  tags: string[];
}

export interface VerificationRequest {
  id: string;
  userId: string;
  dentistName: string;
  arDentistName: string;
  role: 'gp' | 'specialist';
  licenseNumber: string;
  nationalID: string;
  university: string;
  certificateUrl: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
