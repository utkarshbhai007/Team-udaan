import api from '@/services/api';

export interface LabStats {
    totalReports: number;
    completedToday: number;
    avgProcessingTime: number;
    errorRate: number;
    patientSatisfaction: number;
    costSavings: number;
}

export interface AgentStatus {
    status: 'active' | 'inactive' | 'testing';
    processed?: number;
    queue?: number;
    checked?: number;
    flagged?: number;
    predictions?: number;
    alerts?: number;
    interactions?: number;
    warnings?: number;
    coordinated?: number;
    pending?: number;
}

export interface LabReport {
    id: string;
    patient: string;
    status: 'completed' | 'processing' | 'flagged';
    time: string;
    agent: string;
}

class LabService {
    /**
     * Fetch all lab dashboard data
     */
    async getDashboardData() {
        try {
            const response = await api.get('/reports');
            const reports = response.data.data;

            // Calculate Stats
            const totalReports = reports.length;
            const completedReports = reports.filter((r: any) => r.status === 'completed').length;
            const flaggedReports = reports.filter((r: any) => r.status === 'flagged').length;

            // Mock daily count for now (or filter by today's date)
            const today = new Date().toDateString();
            const completedToday = reports.filter((r: any) =>
                r.status === 'completed' && new Date(r.createdAt).toDateString() === today
            ).length;

            // Calculate mock efficiency metrics based on volume
            const avgTime = reports.length > 0 ? 0.5 : 0; // Fake calc
            const errorRate = totalReports > 0 ? (flaggedReports / totalReports) * 100 : 0;

            const stats: LabStats = {
                totalReports,
                completedToday,
                avgProcessingTime: 4.2, // Keep some static benchmarks
                errorRate: parseFloat(errorRate.toFixed(1)),
                patientSatisfaction: 94.8,
                costSavings: totalReports * 1200 // Mock savings per report
            };

            // Map Reports to Recent Activity
            const recentReports: LabReport[] = reports.slice(0, 5).map((r: any) => ({
                id: `RPT-${r._id.substr(-6)}`,
                patient: r.patientName,
                status: r.status,
                time: new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                agent: 'report-generation' // Default attribution
            }));

            // Calculate Agent Statuses (Dynamic based on volume)
            const agentStatus = {
                'report-generation': { status: 'active', processed: totalReports, queue: 0 },
                'quality-control': { status: 'active', checked: totalReports, flagged: flaggedReports },
                'early-detection': { status: 'active', predictions: totalReports, alerts: flaggedReports },
                'medication-safety': { status: 'active', interactions: totalReports * 2, warnings: 0 },
                'care-coordinator': { status: 'active', coordinated: completedReports, pending: totalReports - completedReports }
            };

            return {
                stats,
                recentReports,
                agentStatus
            };

        } catch (error) {
            console.error('Error fetching lab data:', error);
            throw error;
        }
    }
}

export const labService = new LabService();
