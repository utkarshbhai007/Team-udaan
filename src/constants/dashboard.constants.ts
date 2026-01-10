/**
 * Dashboard Constants
 * 
 * Centralized constants for the doctor dashboard application
 */

export const DASHBOARD_TABS = {
  OVERVIEW: 'overview',
  PATIENTS: 'patients',
  REPORTS: 'reports',
  INSIGHTS: 'insights',
  ANALYTICS: 'analytics'
} as const;

export const PRIORITY_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
} as const;

export const PATIENT_STATUS = {
  WAITING: 'Waiting',
  IN_PROGRESS: 'In Progress',
  SCHEDULED: 'Scheduled',
  COMPLETED: 'Completed'
} as const;

export const REPORT_STATUS = {
  CRITICAL: 'Critical',
  ATTENTION_REQUIRED: 'Attention Required',
  ELEVATED: 'Elevated',
  NORMAL: 'Normal'
} as const;

export const TREND_TYPES = {
  WORSENING: 'worsening',
  DECLINING: 'declining',
  STABLE: 'stable',
  IMPROVING: 'improving'
} as const;

export const AI_INSIGHT_TYPES = {
  EARLY_WARNING: 'early-warning',
  MEDICATION_SAFETY: 'medication-safety',
  CARE_COORDINATION: 'care-coordination'
} as const;

export const URGENCY_LEVELS = {
  HIGH: 'High',
  MEDIUM: 'Medium',
  LOW: 'Low'
} as const;

export const REFRESH_INTERVALS = {
  DASHBOARD_DATA: 30000, // 30 seconds
  CRITICAL_ALERTS: 10000, // 10 seconds
  PATIENT_QUEUE: 60000, // 1 minute
} as const;

export const API_ENDPOINTS = {
  DOCTOR_INFO: '/api/doctor/profile',
  DASHBOARD_STATS: '/api/doctor/stats',
  PATIENT_QUEUE: '/api/doctor/patients',
  LAB_REPORTS: '/api/doctor/reports',
  AI_INSIGHTS: '/api/doctor/insights'
} as const;

export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to fetch data. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  SERVER_ERROR: 'Server error. Please try again later.'
} as const;