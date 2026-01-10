import { useState, useEffect, useCallback } from 'react';
import { DoctorInfo, PatientQueueItem, LabReport, AIInsight, DashboardStats } from '@/types/doctor.types';
import { doctorService } from '@/services/doctor.service';
import { DASHBOARD_TABS } from '@/constants/dashboard.constants';

interface UseDoctorDashboardReturn {
  loading: boolean;
  error: string | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  doctorInfo: DoctorInfo | null;
  dashboardStats: DashboardStats | null;
  patientQueue: PatientQueueItem[];
  recentReports: LabReport[];
  aiInsights: AIInsight[];
  refetchData: () => Promise<void>;
}

export const useDoctorDashboard = (): UseDoctorDashboardReturn => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(DASHBOARD_TABS.OVERVIEW);
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [patientQueue, setPatientQueue] = useState<PatientQueueItem[]>([]);
  const [recentReports, setRecentReports] = useState<LabReport[]>([]);
  const [aiInsights, setAIInsights] = useState<AIInsight[]>([]);

  const loadDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [doctor, stats, queue, reports, insights] = await Promise.all([
        doctorService.getDoctorInfo(),
        doctorService.getDashboardStats(),
        doctorService.getPatientQueue(),
        doctorService.getLabReports(),
        doctorService.getAIInsights()
      ]);

      setDoctorInfo(doctor);
      setDashboardStats(stats);
      setPatientQueue(queue);
      setRecentReports(reports);
      setAIInsights(insights);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const refetchData = useCallback(async () => {
    await loadDashboardData();
  }, [loadDashboardData]);

  return {
    loading,
    error,
    activeTab,
    setActiveTab,
    doctorInfo,
    dashboardStats,
    patientQueue,
    recentReports,
    aiInsights,
    refetchData
  };
};

