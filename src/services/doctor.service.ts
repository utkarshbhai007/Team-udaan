/**
 * Doctor Service
 * 
 * Service layer for doctor-related API calls and data management
 */

import { DoctorInfo, PatientQueueItem, LabReport, AIInsight, DashboardStats } from '@/types/doctor.types';
import { API_ENDPOINTS, ERROR_MESSAGES } from '@/constants/dashboard.constants';

class DoctorService {
  private baseURL: string;

  constructor(baseURL: string = process.env.REACT_APP_API_URL || '') {
    this.baseURL = baseURL;
  }

  /**
   * Fetch doctor profile information
   */
  async getDoctorInfo(): Promise<DoctorInfo> {
    try {
      // Mock implementation - replace with actual API call
      return this.mockDoctorInfo();
    } catch (error) {
      console.error('Error fetching doctor info:', error);
      throw new Error(ERROR_MESSAGES.FETCH_FAILED);
    }
  }

  /**
   * Fetch dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Mock implementation - replace with actual API call
      return this.mockDashboardStats();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw new Error(ERROR_MESSAGES.FETCH_FAILED);
    }
  }

  /**
   * Fetch patient queue
   */
  async getPatientQueue(): Promise<PatientQueueItem[]> {
    try {
      // Mock implementation - replace with actual API call
      return this.mockPatientQueue();
    } catch (error) {
      console.error('Error fetching patient queue:', error);
      throw new Error(ERROR_MESSAGES.FETCH_FAILED);
    }
  }

  /**
   * Fetch lab reports
   */
  async getLabReports(): Promise<LabReport[]> {
    try {
      // Mock implementation - replace with actual API call
      return this.mockLabReports();
    } catch (error) {
      console.error('Error fetching lab reports:', error);
      throw new Error(ERROR_MESSAGES.FETCH_FAILED);
    }
  }

  /**
   * Fetch AI insights
   */
  async getAIInsights(): Promise<AIInsight[]> {
    try {
      // Mock implementation - replace with actual API call
      return this.mockAIInsights();
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      throw new Error(ERROR_MESSAGES.FETCH_FAILED);
    }
  }

  // Mock data methods - replace with actual API calls
  private async mockDoctorInfo(): Promise<DoctorInfo> {
    await this.delay(500);
    return {
      id: 'DOC-001',
      name: 'Dr. Sarah Wilson',
      specialty: 'Internal Medicine',
      license: 'MD-12345',
      hospital: 'City General Hospital',
      patientsToday: 12,
      totalPatients: 847
    };
  }

  private async mockDashboardStats(): Promise<DashboardStats> {
    await this.delay(300);
    return {
      patientsSeen: { value: 12, target: 15, change: null },
      criticalAlerts: { value: 3, change: '+1' },
      reportsReviewed: { value: 18, change: '+5' },
      aiRecommendations: { value: 12, change: '+3' }
    };
  }

  private async mockPatientQueue(): Promise<PatientQueueItem[]> {
    await this.delay(400);
    return [
      {
        id: 'PAT-001',
        name: 'John Doe',
        age: 45,
        condition: 'Diabetes Follow-up',
        priority: 'Medium',
        appointmentTime: '10:00 AM',
        status: 'Waiting',
        aiAlerts: ['High HbA1c trend', 'Medication interaction risk'],
        lastVisit: '2024-01-01',
        riskScore: 65
      },
      {
        id: 'PAT-002',
        name: 'Jane Smith',
        age: 38,
        condition: 'Hypertension Check',
        priority: 'High',
        appointmentTime: '10:30 AM',
        status: 'In Progress',
        aiAlerts: ['Blood pressure spike detected', 'Early kidney risk'],
        lastVisit: '2023-12-15',
        riskScore: 78
      },
      {
        id: 'PAT-003',
        name: 'Mike Johnson',
        age: 52,
        condition: 'Routine Checkup',
        priority: 'Low',
        appointmentTime: '11:00 AM',
        status: 'Scheduled',
        aiAlerts: ['Cholesterol trending up'],
        lastVisit: '2023-11-20',
        riskScore: 42
      }
    ];
  }

  private async mockLabReports(): Promise<LabReport[]> {
    await this.delay(600);
    return [
      {
        id: 'RPT-2024-001',
        patientName: 'John Doe',
        patientId: 'PAT-001',
        testType: 'HbA1c',
        result: '8.2%',
        status: 'Critical',
        aiInsight: 'Significant increase from 7.1% last month. Medication adjustment recommended.',
        timestamp: '2 hours ago',
        trend: 'worsening',
        recommendations: ['Increase Metformin dosage', 'Dietary consultation', 'Follow-up in 2 weeks']
      },
      {
        id: 'RPT-2024-002',
        patientName: 'Jane Smith',
        patientId: 'PAT-002',
        testType: 'Comprehensive Metabolic Panel',
        result: 'Creatinine 1.4 mg/dL',
        status: 'Attention Required',
        aiInsight: 'Early signs of kidney function decline. Monitor closely.',
        timestamp: '4 hours ago',
        trend: 'declining',
        recommendations: ['Nephrology referral', 'ACE inhibitor adjustment', 'Protein restriction']
      }
    ];
  }

  private async mockAIInsights(): Promise<AIInsight[]> {
    await this.delay(700);
    return [
      {
        id: 'AI-001',
        type: 'early-warning',
        title: 'Pre-diabetes Risk Detected',
        patient: 'Robert Chen',
        patientId: 'PAT-005',
        description: 'AI analysis of recent glucose trends suggests 78% probability of pre-diabetes development within 6 months',
        confidence: 78,
        timeframe: '6 months',
        urgency: 'Medium',
        actions: ['Schedule glucose tolerance test', 'Lifestyle counseling', 'Weight management program']
      },
      {
        id: 'AI-002',
        type: 'medication-safety',
        title: 'Drug Interaction Alert',
        patient: 'Mary Johnson',
        patientId: 'PAT-006',
        description: 'Potential interaction between newly prescribed Warfarin and existing Metformin therapy',
        confidence: 92,
        severity: 'Moderate',
        urgency: 'High',
        actions: ['Monitor INR closely', 'Adjust Warfarin dosing', 'Patient education on signs']
      }
    ];
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const doctorService = new DoctorService();
export default DoctorService;