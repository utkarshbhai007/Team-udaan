/**
 * Doctor Service
 * 
 * Service layer for doctor-related API calls and data management
 */

import { DoctorInfo, PatientQueueItem, LabReport, AIInsight, DashboardStats } from '@/types/doctor.types';
import { ERROR_MESSAGES } from '@/constants/dashboard.constants';
import api from '@/services/api';

class DoctorService {

  /**
   * Fetch doctor profile information
   */
  async getDoctorInfo(): Promise<DoctorInfo> {
    try {
      // For now, return mock info as we don't have a doctor profile endpoint yet
      return {
        id: 'DOC-001',
        name: 'Dr. Sarah Wilson',
        specialty: 'Internal Medicine',
        license: 'MD-12345',
        hospital: 'City General Hospital',
        patientsToday: 12,
        totalPatients: 847
      };
    } catch (error) {
      console.error('Error fetching doctor info:', error);
      throw new Error(ERROR_MESSAGES.FETCH_FAILED);
    }
  }

  /**
   * Fetch dashboard statistics
   */
  /**
   * Fetch dashboard statistics
   */
  async getDashboardStats(): Promise<DashboardStats> {
    try {
      // Fetch real report data to calculate stats
      const response = await api.get('/reports');
      const reports = response.data.data;

      const totalReports = reports.length;
      const criticalCount = reports.filter((r: any) => r.status === 'flagged' || r.aiAnalysis?.riskAssessment?.level === 'High').length;
      const reviewedCount = reports.filter((r: any) => r.status === 'completed').length;

      return {
        patientsSeen: { value: totalReports, target: Math.max(20, totalReports + 5), change: '+1' },
        criticalAlerts: { value: criticalCount, change: criticalCount > 0 ? '+1' : '0' },
        reportsReviewed: { value: reviewedCount, change: '+2' },
        aiRecommendations: { value: totalReports, change: '+1' } // Assuming 1 AI analysis per report
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      // Fallback to 0s if fetch fails, rather than static mock
      return {
        patientsSeen: { value: 0, target: 20, change: null },
        criticalAlerts: { value: 0, change: null },
        reportsReviewed: { value: 0, change: null },
        aiRecommendations: { value: 0, change: null }
      };
    }
  }

  /**
   * Fetch patient queue
   */
  async getPatientQueue(): Promise<PatientQueueItem[]> {
    try {
      // In a real app, this would be a specific endpoint. 
      // For hackathon, we can fetch latest reports and map them to queue items
      const response = await api.get('/reports');
      const reports = response.data.data;

      // Transform reports into patient queue items
      return reports.map((report: any, index: number) => ({
        id: report.patientId || `PAT-${index}`,
        name: report.patientName,
        age: report.patientAge || 45, // default if missing
        condition: report.testType,
        priority: report.aiAnalysis?.riskAssessment?.level === 'Critical' ? 'High' : 'Medium',
        appointmentTime: new Date(report.createdAt).toLocaleTimeString(),
        status: report.status === 'completed' ? 'Reviewed' : 'Waiting',
        aiAlerts: report.aiAnalysis?.diagnosis || [],
        lastVisit: '2024-01-01',
        riskScore: report.aiAnalysis?.riskAssessment?.score || 50
      })).slice(0, 5); // Return top 5

    } catch (error) {
      console.error('Error fetching patient queue:', error);
      // Fallback to empty if fails
      return [];
    }
  }

  /**
   * Fetch lab reports
   */
  async getLabReports(): Promise<LabReport[]> {
    try {
      const response = await api.get('/reports');
      return response.data.data.map((report: any) => ({
        id: report._id,
        patientName: report.patientName,
        patientId: report.patientId || 'UNKNOWN',
        testType: report.testType,
        result: typeof report.rawData === 'object' ? JSON.stringify(report.rawData) : report.rawData,
        status: report.status === 'flagged' ? 'Critical' : 'Normal',
        aiInsight: report.aiAnalysis?.summary || 'No insights generated',
        timestamp: new Date(report.createdAt).toISOString(),
        trend: 'stable', // Helper logic needed for trend
        recommendations: report.aiAnalysis?.recommendations || []
      }));
    } catch (error) {
      console.error('Error fetching lab reports:', error);
      throw new Error(ERROR_MESSAGES.FETCH_FAILED);
    }
  }

  /**
   * Fetch AI insights
   */
  /**
   * Fetch AI insights from successful reports
   */
  async getAIInsights(): Promise<AIInsight[]> {
    try {
      // Fetch reports from backend
      const response = await api.get('/reports');
      const reports = response.data.data;

      // Filter reports with high risk
      const criticalReports = reports.filter((r: any) =>
        r.aiAnalysis?.riskAssessment?.level === 'High' ||
        r.aiAnalysis?.riskAssessment?.level === 'Moderate'
      );

      // Map to AI Insight format
      return criticalReports.slice(0, 5).map((report: any, index: number) => ({
        id: `AI-INSIGHT-${report._id}`,
        type: report.aiAnalysis?.riskAssessment?.level === 'High' ? 'critical' : 'early-warning',
        title: `Risk Alert: ${report.patientName}`,
        patient: report.patientName,
        patientId: report.patientId || 'UNKNOWN',
        description: report.aiAnalysis?.summary || 'Automated AI Analysis indicates potential health risks.',
        confidence: report.aiAnalysis?.riskAssessment?.score || 85,
        timeframe: 'Immediate',
        urgency: report.aiAnalysis?.riskAssessment?.level === 'High' ? 'High' : 'Medium',
        actions: report.aiAnalysis?.recommendations?.slice(0, 2) || ['Review Full Report']
      }));
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      // Return empty array instead of failing, to keep dashboard alive
      return [];
    }
  }
}

// Export singleton instance
export const doctorService = new DoctorService();
export default DoctorService;