import { PatientQueueItem, LabReport } from '@/types/doctor.types';

export const getPriorityColor = (priority: string): string => {
  const colors = {
    high: 'text-red-600 bg-red-50 border-red-200',
    medium: 'text-orange-600 bg-orange-50 border-orange-200',
    low: 'text-green-600 bg-green-50 border-green-200'
  };
  return colors[priority.toLowerCase() as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
};

export const getStatusColor = (status: string): string => {
  const colors = {
    critical: 'text-red-600 bg-red-50 border-red-200',
    'attention required': 'text-orange-600 bg-orange-50 border-orange-200',
    elevated: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    normal: 'text-green-600 bg-green-50 border-green-200'
  };
  return colors[status.toLowerCase() as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
};

export const getRiskScoreColor = (score: number): string => {
  if (score >= 70) return 'text-red-600';
  if (score >= 40) return 'text-orange-600';
  return 'text-green-600';
};

export const getTrendIcon = (trend: string): string => {
  const icons = {
    worsening: '📈',
    declining: '📉',
    stable: '➡️',
    improving: '📊'
  };
  return icons[trend as keyof typeof icons] || '➡️';
};

export const formatTimestamp = (timestamp: string): string => {
  // In a real app, you'd use a proper date formatting library like date-fns
  return timestamp;
};

export const calculateRiskLevel = (score: number): 'High' | 'Medium' | 'Low' => {
  if (score >= 70) return 'High';
  if (score >= 40) return 'Medium';
  return 'Low';
};

export const filterCriticalReports = (reports: LabReport[]): LabReport[] => {
  return reports.filter(report => report.status === 'Critical');
};

export const sortPatientsByPriority = (patients: PatientQueueItem[]): PatientQueueItem[] => {
  const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
  return [...patients].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
};

export const getUrgencyColor = (urgency: string): string => {
  const colors = {
    high: 'text-red-600',
    medium: 'text-orange-600',
    low: 'text-green-600'
  };
  return colors[urgency.toLowerCase() as keyof typeof colors] || 'text-gray-600';
};