// PathologyAI Hub API Service
// Handles all AI agent communications via Backend API

import api from '@/services/api';

// AI Agent Types
export type AIAgentType =
  | 'report-generation'
  | 'quality-control'
  | 'early-detection'
  | 'medication-safety'
  | 'care-coordinator';

// PathologyAI Hub API Service Class
class PathologyAIService {

  async getPatients() {
    try {
      const response = await api.get('/auth/users/patient');
      return response.data;
    } catch (error) {
      console.error('Error fetching patients:', error);
      return [];
    }
  }

  async getDoctors() {
    try {
      const response = await api.get('/auth/users/doctor');
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return [];
    }
  }

  // 🔬 Report Generation Agent
  async generatePathologyReport(patientData: any, context?: any) {
    try {
      // Context should contain { patientId, doctorId, patientName, testType }
      const payload = {
        patientName: context?.patientName || patientData.name || 'Unknown',
        patientId: context?.patientId,
        doctorId: context?.doctorId,
        testType: context?.testType || 'General Analysis',
        rawData: { ...patientData, ...context }
      };

      const response = await api.post('/ai/generate-report', payload);

      // Backend returns { success: true, data: Report }
      // We need to return the aiAnalysis object to match frontend expectation
      if (response.data?.data?.aiAnalysis) {
        return response.data.data; // Return full report object including IDs
      }
      throw new Error('Invalid response structure from backend');

    } catch (error) {
      console.error('Report Generation Agent Error:', error);
      return this.getFallbackReport(patientData, context);
    }
  }

  // Fetch Reports from Backend (Replaces Blockchain)
  async getReports(filters: { patientId?: string, doctorId?: string } = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.patientId) params.append('patientId', filters.patientId);
      if (filters.doctorId) params.append('doctorId', filters.doctorId);

      const response = await api.get(`/ai/reports?${params.toString()}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching reports:', error);
      return [];
    }
  }

  // Update Report (e.g. save Care Plan)
  async updateReport(reportId: string, updates: any) {
    try {
      const response = await api.put(`/ai/reports/${reportId}`, updates);
      return response.data.data;
    } catch (error) {
      console.error('Error updating report:', error);
      throw error;
    }
  }



  // 🚨 Quality Control Agent
  async performQualityCheck(reportData: any) {
    try {
      const response = await api.post('/ai/quality-check', {
        reportData: reportData
      });
      return response.data.data;
    } catch (error) {
      console.error('Quality Control Agent Error:', error);
      return {
        qualityScore: 85,
        status: "Flagged (Service Failure)",
        issues: ["Automated QC unavailable - please review manually"],
        verificationNotes: "Fallback mode active"
      };
    }
  }

  // 🧬 Early Disease Detection Agent
  async predictDiseaseRisk(patientHistory: any[], currentResults: any) {
    try {
      const response = await api.post('/ai/predict-risk', {
        patientData: currentResults
      });
      return response.data.data;
    } catch (error) {
      console.error('Early Detection Agent Error:', error);
      return this.getFallbackDiseaseRisk();
    }
  }

  // 💊 Medication Safety Agent
  async checkMedicationSafety(medications: string[], testResults: any) {
    try {
      if (medications.length === 1) {
        // Single drug: Side Effects Analysis
        const response = await api.post('/ai/analyze-side-effects', {
          drug: medications[0]
        });

        // Map backend response { sideEffects: [...] } to frontend expectation { alerts: [...] }
        return {
          aiAnalysis: {
            alerts: response.data.data.sideEffects || []
          }
        };
      } else {
        // Multiple drugs: Interaction Analysis
        const response = await api.post('/ai/check-interaction', {
          drugs: medications
        });

        // Map backend response { interactions: [...] } to frontend expectation
        return {
          aiAnalysis: {
            interactions: response.data.data.interactions || []
          }
        };
      }
    } catch (error) {
      console.error('Medication Safety Agent Error:', error);
      return this.getFallbackMedicationSafety(medications);
    }
  }

  // 🏥 Drug Recommendation Agent
  async getDrugRecommendations(data: { patientInfo?: string, disease?: string }) {
    try {
      const response = await api.post('/ai/recommend-drugs', data);
      return response.data.data;
    } catch (error) {
      console.error('Drug Recommendation Agent Error:', error);
      // Fallback
      return {
        recommendations: [
          {
            drugName: "Consult Physician",
            dosage: "N/A",
            sideEffects: "Service Unavailable",
            precautions: "Please consult a doctor manually",
            reason: "Automated recommendation failed"
          }
        ]
      };
    }
  }

  // 🤝 Care Coordinator Agent (Master Agent)
  async coordinateCare(patientId: string, allAgentResults: any) {
    try {
      const response = await api.post('/ai/coordinate-care', {
        patientId: patientId,
        agentResults: allAgentResults
      });
      return response.data.data;
    } catch (error) {
      console.error('Care Coordinator Agent Error:', error);
      return {
        carePlan: {
          summary: "Automated care coordination unavailable.",
          immediateActions: ["Review patient file manually"],
          scheduledFollowups: [],
          lifestyleAdjustments: []
        },
        status: "Monitoring"
      };
    }
  }


  // Fallback Methods (Simple mocks to prevent crashes if backend fails)
  private getFallbackReport(testResults: any, patientData: any) {
    return {
      diagnosis: [{
        condition: "Analysis Unavailable",
        confidenceLevel: "Low",
        description: "Unable to connect to analysis service. Please check your connection and try again.",
        evidenceFromText: "Network/Service Error"
      }],
      riskFactors: [{
        factor: "Unknown",
        impact: "Low",
        description: "Risk assessment unavailable offline.",
        mitigation: "Retry analysis"
      }],
      recommendations: [{
        recommendation: "Retry Analysis",
        reason: "Service unavailable",
        priority: "High",
        timeframe: "Immediate"
      }],
      nextSteps: [],
      dataQuality: {
        completeness: "Low",
        missingInformation: ["Service Connectivity"],
        suggestedTests: []
      }
    };
  }

  private getFallbackDiseaseRisk() {
    return { riskAssessment: { diabetes: { risk: "UNKNOWN" } } };
  }

  private getFallbackMedicationSafety(medications: string[]) {
    return {
      aiAnalysis: {
        alerts: [{ name: "Service Unavailable", probability: 0, severity: "Low", management: "Try again" }],
        interactions: []
      }
    };
  }
}

// Export singleton instance
export const pathologyAI = new PathologyAIService();

// Legacy compatibility exports
export const analyzePatientData = (data: any) => pathologyAI.generatePathologyReport(data.testResults, data.patientData);
export const getDrugRecommendations = (symptoms: string[]) => pathologyAI.checkMedicationSafety(symptoms, {});
export const analyzeSideEffects = (medications: string[]) => pathologyAI.checkMedicationSafety(medications, {});

export default pathologyAI;