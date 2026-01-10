export interface DoctorInfo {
  id: string;
  name: string;
  specialty: string;
  license: string;
  hospital: string;
  patientsToday: number;
  totalPatients: number;
}

export interface PatientQueueItem {
  id: string;
  name: string;
  age: number;
  condition: string;
  priority: 'High' | 'Medium' | 'Low';
  appointmentTime: string;
  status: 'Waiting' | 'In Progress' | 'Scheduled' | 'Completed';
  aiAlerts: string[];
  lastVisit: string;
  riskScore: number;
}

export interface LabReport {
  id: string;
  patientName: string;
  patientId: string;
  testType: string;
  result: string;
  status: 'Critical' | 'Attention Required' | 'Elevated' | 'Normal';
  aiInsight: string;
  timestamp: string;
  trend: 'worsening' | 'declining' | 'stable' | 'improving';
  recommendations: string[];
}

export interface AIInsight {
  id: string;
  type: 'early-warning' | 'medication-safety' | 'care-coordination';
  title: string;
  patient: string;
  patientId: string;
  description: string;
  confidence: number;
  timeframe?: string;
  severity?: string;
  urgency: 'High' | 'Medium' | 'Low';
  actions: string[];
  lastContact?: string;
}

export interface DashboardStats {
  patientsSeen: {
    value: number;
    target: number;
    change: string | null;
  };
  criticalAlerts: {
    value: number;
    change: string;
  };
  reportsReviewed: {
    value: number;
    change: string;
  };
  aiRecommendations: {
    value: number;
    change: string;
  };
}