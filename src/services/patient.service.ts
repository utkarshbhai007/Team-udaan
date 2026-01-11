import api from '@/services/api';

export interface PatientProfile {
    name: string;
    age: number;
    gender: string;
    patientId: string;
    lastVisit: string;
    nextAppointment: string;
}

export interface HealthRecord {
    id: string;
    date: string;
    type: string;
    status: 'Normal' | 'Attention Required' | 'Critical';
    aiInsights: string;
    riskScore: number;
    trend: 'stable' | 'increasing' | 'decreasing';
}

class PatientService {
    /**
     * Fetch patient profile (Mocked for now as we don't have full profile DB)
     */
    async getProfile(): Promise<PatientProfile> {
        // In a real app, this would come from /auth/me or /patients/:id
        return {
            name: 'John Doe', // We could fetch from AuthContext if name is stored
            age: 45,
            gender: 'Male',
            patientId: 'PAT-2024-001',
            lastVisit: new Date().toLocaleDateString(),
            nextAppointment: '2024-02-15'
        };
    }

    /**
     * Fetch patient reports from backend
     */
    async getHealthRecords(): Promise<HealthRecord[]> {
        try {
            const response = await api.get('/reports');
            const reports = response.data.data;

            // Map backend reports to frontend HealthRecord format
            return reports.map((r: any) => ({
                id: `RPT-${r._id.substr(-6)}`,
                date: new Date(r.createdAt).toLocaleDateString(),
                type: r.testType || 'General Analysis',
                status: r.aiAnalysis?.riskAssessment?.level === 'High' ? 'Critical' :
                    r.aiAnalysis?.riskAssessment?.level === 'Moderate' ? 'Attention Required' : 'Normal',
                aiInsights: r.aiAnalysis?.summary || 'No analysis summary available.',
                riskScore: r.aiAnalysis?.riskAssessment?.score || 0,
                trend: 'stable' // Mock trend
            }));

        } catch (error) {
            console.error('Error fetching patient records:', error);
            return [];
        }
    }

    /**
     * Get AI Insights based on reports
     */
    async getInsights() {
        // Deriving insights from recent reports
        const records = await this.getHealthRecords();
        const critical = records.filter(r => r.status === 'Critical' || r.status === 'Attention Required');

        return critical.map(c => ({
            type: 'early-warning',
            title: 'Health Alert: ' + c.type,
            message: c.aiInsights,
            priority: c.status === 'Critical' ? 'high' : 'medium',
            date: c.date
        }));
    }
}

export const patientService = new PatientService();
