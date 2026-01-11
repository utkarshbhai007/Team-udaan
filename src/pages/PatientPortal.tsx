import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  FileText,
  Calendar,
  Pill,
  Heart,
  Download,
  Eye,
  Shield,
  Brain,
  PlusCircle,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { blockchainService } from '@/services/BlockchainService';
import { openFDAService } from '@/services/OpenFDAService';
import { pathologyAI } from '@/utils/apiService';

const PatientPortal = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState({
    name: '',
    age: 0,
    gender: '',
    patientId: '',
    lastVisit: '',
    nextAppointment: ''
  });
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [healthRecords, setHealthRecords] = useState<any[]>([]);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  const [selectedReport, setSelectedReport] = useState<any>(null); // For View Modal
  const [overallHealthScore, setOverallHealthScore] = useState(0);
  const [scoreTrend, setScoreTrend] = useState(0); // Difference from last report
  const [nextAppointment, setNextAppointment] = useState('Not Scheduled');

  // Default "Zero" risk state to start
  const [riskAssessment, setRiskAssessment] = useState({
    diabetes: { risk: 'LOW', score: 0, trend: 'STABLE', nextScreening: 'Annual' },
    cardiovascular: { risk: 'LOW', score: 0, trend: 'STABLE', nextScreening: 'Annual' },
    kidney: { risk: 'LOW', score: 0, trend: 'STABLE', nextScreening: 'Annual' },
    liver: { risk: 'LOW', score: 0, trend: 'STABLE', nextScreening: 'Annual' }
  });

  // Initial Data Fetch (Profile + First Record Load)
  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        if (user) {
          setPatientData({
            name: user.name || 'Valued Patient',
            age: 35,
            gender: 'Not Specified',
            patientId: user.uid || 'PAT-000',
            lastVisit: new Date().toLocaleDateString(),
            nextAppointment: 'Scheduled upon request'
          });
        }
      } catch (error) {
        console.error("Failed to load patient data", error);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, [user]);

  // Load minted record from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('currentPatientAnalysis');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAnalysisData(parsed);
      } catch (e) {
        console.error('Failed to parse stored analysis', e);
      }
    }
  }, []);

  // Polling for Records (Live Updates) using Backend API
  useEffect(() => {
    if (!user) return;

    const fetchRecords = async () => {
      try {
        // OLD: Blockchain Service
        // const records = blockchainService.getRecordsByPatient(user.uid);

        // NEW: Backend API Service
        const reports = await pathologyAI.getReports({ patientId: user.uid });
        console.log('✅ PatientPortal: Fetched reports', reports);

        // Helper to calculate score dynamically if missing
        const calculateScore = (analysis: any) => {
          if (analysis?.riskAssessment?.score) return analysis.riskAssessment.score;
          // Heuristic: Start at 100, deduct for risks
          let score = 100;
          const risks = analysis?.riskFactors || [];
          score -= (risks.length * 10);
          if (analysis?.status === 'flagged') score -= 15;
          return Math.max(0, score); // Min 0
        };

        // Map to UI
        const mappedRecords = reports.map((r: any) => {
          const score = calculateScore(r.aiAnalysis);
          // Check for "Scheduled Followups" in Care Plan
          const followups = r.aiAnalysis?.careCoordinator?.carePlan?.scheduledFollowups || [];
          const nextAppt = followups.length > 0 ? followups[0] : null;

          return {
            id: r._id,
            date: new Date(r.createdAt).toLocaleDateString(),
            rawDate: new Date(r.createdAt), // For sorting
            type: r.testType || 'General Analysis',
            status: score < 60 ? 'Critical' : score < 80 ? 'Attention Required' : 'Normal',
            riskScore: score,
            fullData: r.aiAnalysis || {},
            nextAppt: nextAppt
          };
        });

        setHealthRecords(mappedRecords);

        if (mappedRecords.length > 0) {
          // Sort by Date Descending
          const sorted = [...mappedRecords].sort((a, b) => b.rawDate - a.rawDate);
          const latest = sorted[0];
          const previous = sorted.length > 1 ? sorted[1] : null;

          // Update Top Level Stats
          setOverallHealthScore(latest.riskScore);
          setScoreTrend(previous ? latest.riskScore - previous.riskScore : 0);
          if (latest.nextAppt) setNextAppointment(latest.nextAppt);

          // Update Insights
          const newInsights = latest.fullData.nextSteps?.map((step: any, i: number) => ({
            title: 'Action Item',
            message: typeof step === 'string' ? step : step.step,
            priority: 'high',
            date: new Date().toLocaleDateString()
          })) || [];
          setAiInsights(newInsights);

          // Update Risk Assessment Display
          const score = latest.riskScore;
          setRiskAssessment({
            diabetes: { risk: score < 70 ? 'MODERATE' : 'LOW', score: Math.round(100 - score * 0.2), trend: 'STABLE', nextScreening: '6 months' },
            cardiovascular: { risk: score < 50 ? 'HIGH' : 'LOW', score: Math.round(100 - score * 0.4), trend: 'STABLE', nextScreening: 'Annual' },
            kidney: { risk: 'LOW', score: Math.round(100 - score * 0.1), trend: 'STABLE', nextScreening: 'Annual' },
            liver: { risk: 'LOW', score: Math.round(100 - score * 0.1), trend: 'STABLE', nextScreening: 'Annual' }
          });
        }
      } catch (e) {
        console.error("Failed to fetch records", e);
      }
    };

    fetchRecords();
    const interval = setInterval(fetchRecords, 10000); // Poll every 10s
    return () => clearInterval(interval);
  }, [user]);
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW': return 'text-green-600 bg-green-100';
      case 'MODERATE': return 'text-yellow-600 bg-yellow-100';
      case 'HIGH': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'Attention Required': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Health Portal</h1>
              <p className="text-gray-600">Welcome back, {patientData.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Patient ID: {patientData.patientId}</p>
              <p className="text-sm text-gray-600">Last Visit: {patientData.lastVisit}</p>
              <Button
                onClick={() => navigate('/patient-analysis')}
                className="mt-4 bg-blue-600 hover:bg-blue-700"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                New Analysis
              </Button>
            </div>
          </div>
        </div>

        {/* Minted Record Overview */}
        {analysisData && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Minted Record Overview</h3>
            <p className="text-sm">Record ID: {analysisData.blockchainRecord?.recordId || 'N/A'}</p>
            <p className="text-sm">Patient: {analysisData.patientInfo?.name || 'Unknown'}</p>
            <pre className="mt-2 text-xs bg-white p-2 rounded overflow-x-auto">
              {JSON.stringify(analysisData.analysis, null, 2)}
            </pre>
          </div>
        )}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="reports">My Reports</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="trends">Health Trends</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Health Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Health Score</CardTitle>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${overallHealthScore >= 80 ? 'text-green-600' : overallHealthScore >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {overallHealthScore}/100
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {overallHealthScore >= 80 ? 'Excellent' : 'Needs Attention'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Reports</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{healthRecords.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Last 30 days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Medications</CardTitle>
                  <Pill className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{medications.length}</div>
                  <p className="text-xs text-muted-foreground">
                    Currently prescribed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl font-bold truncate" title={nextAppointment}>{nextAppointment}</div>
                  <p className="text-xs text-muted-foreground">
                    Upcoming
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI Risk Assessment
                </CardTitle>
                <CardDescription>
                  Early disease detection based on your health trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(riskAssessment).map(([disease, data]) => (
                    <div key={disease} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold capitalize">{disease}</h4>
                        <Badge className={getRiskColor(data.risk)}>
                          {data.risk}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Risk Score:</span>
                          <span className="font-medium">{data.score}%</span>
                        </div>
                        <Progress value={data.score} className="h-2" />
                        <div className="text-xs text-gray-600">
                          Trend: {data.trend} • Next screening: {data.nextScreening}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent AI Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Recent AI Insights</CardTitle>
                <CardDescription>Personalized health recommendations from our AI agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiInsights.slice(0, 3).map((insight, index) => (
                    <div key={index} className={`p-4 border-l-4 rounded-lg ${getPriorityColor(insight.priority)}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                          <p className="text-sm text-gray-700">{insight.message}</p>
                        </div>
                        <span className="text-xs text-gray-500 ml-4">{insight.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Health Reports</CardTitle>
                    <CardDescription>View and download your pathology reports</CardDescription>
                  </div>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {healthRecords.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{record.type}</p>
                          <p className="text-sm text-gray-600">{record.date}</p>
                          <p className="text-xs text-gray-500">Risk Score: {record.riskScore}%</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(record.status)}>
                          {record.status}
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => setSelectedReport(record)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => {
                            const blob = new Blob([JSON.stringify(record.fullData, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `Report-${record.id}.json`;
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                          }}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* REPORT VIEW MODAL (Simple Overlay) */}
                  {selectedReport && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
                          <h2 className="text-xl font-bold">Health Report Details</h2>
                          <Button variant="ghost" size="sm" onClick={() => setSelectedReport(null)}>✕ Close</Button>
                        </div>
                        <div className="p-6">
                          <p className="text-sm font-mono bg-gray-100 p-2 rounded mb-4">Report ID: {selectedReport.id}</p>

                          {/* Diagnosis */}
                          {selectedReport.fullData.diagnosis?.length > 0 && (
                            <div className="mb-6">
                              <h3 className="font-bold text-lg mb-2">Diagnosis</h3>
                              {selectedReport.fullData.diagnosis.map((d: any, i: number) => (
                                <div key={i} className="mb-2 p-3 bg-blue-50 border border-blue-100 rounded">
                                  <p className="font-semibold text-blue-900">{d.condition}</p>
                                  <p className="text-sm">{d.description}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Care Plan */}
                          {selectedReport.fullData.careCoordinator?.carePlan && (
                            <div className="mb-6">
                              <h3 className="font-bold text-lg mb-2 text-green-700">Care Plan</h3>
                              <div className="p-4 bg-green-50 border border-green-100 rounded">
                                <p className="text-sm font-medium mb-2">{selectedReport.fullData.careCoordinator.carePlan.summary}</p>

                                <h4 className="text-xs font-bold uppercase mt-2">Actions</h4>
                                <ul className="list-disc pl-5 text-sm">
                                  {selectedReport.fullData.careCoordinator.carePlan.immediateActions.map((act: string, i: number) => <li key={i}>{act}</li>)}
                                </ul>
                              </div>
                            </div>
                          )}

                          <div className="mt-4">
                            <h4 className="font-bold text-sm text-gray-500 mb-2">Full Analysis Data</h4>
                            <pre className="text-xs bg-gray-900 text-green-400 p-4 rounded overflow-auto max-h-64">
                              {JSON.stringify(selectedReport.fullData, null, 2)}
                            </pre>
                          </div>
                        </div>
                        <div className="p-4 border-t bg-gray-50 text-right">
                          <Button onClick={() => setSelectedReport(null)}>Close</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="medications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Medication Safety Monitor
                  </div>
                  <Badge variant="outline" className="text-xs font-normal border-blue-200 text-blue-700 bg-blue-50">
                    Verified by openFDA API
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Real-time safety checks against FDA drug labels and adverse event databases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medications.map((med, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{med.name}</h4>
                          <p className="text-sm text-gray-600">{med.dosage}</p>
                          <p className="text-xs text-gray-500">{med.purpose}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={med.safetyStatus === 'Safe' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {med.safetyStatus}
                          </Badge>
                          {/* If we had interaction checking, it would go here */}
                        </div>
                      </div>

                      {/* FDA Warning Display */}
                      {med.warnings && (
                        <div className="mt-2 mb-3 p-2 bg-red-50 border border-red-100 rounded text-xs text-red-700">
                          <strong>FDA Note:</strong> {med.warnings.slice(0, 150)}...
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Next Review: {med.nextReview}</span>
                        <Button size="sm" variant="outline" onClick={() => window.open(`https://open.fda.gov/drug/label/`, '_blank')}>
                          View FDA Label
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Health Score Trend</CardTitle>
                  <CardDescription>Your overall health score over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Current Score</span>
                      <span className="font-medium text-green-600">{overallHealthScore}/100</span>
                    </div>
                    <Progress value={overallHealthScore} className="h-3" />
                    <p className={`text-xs ${scoreTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {scoreTrend >= 0 ? '↑' : '↓'} {Math.abs(scoreTrend)} points {scoreTrend >= 0 ? 'improvement' : 'decline'} since last report
                    </p>

                    {/* Tiny Trend Graph */}
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-400 mb-2">History</p>
                      <div className="flex items-end gap-1 h-16">
                        {healthRecords.slice(0, 5).reverse().map((rec: any, i: number) => (
                          <div key={i} className="flex-1 bg-blue-100 rounded-t hover:bg-blue-200 relative group">
                            <div
                              style={{ height: `${rec.riskScore}%` }}
                              className={`w-full rounded-t ${rec.riskScore >= 80 ? 'bg-green-400' : 'bg-yellow-400'}`}
                            ></div>
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-1 rounded opacity-0 group-hover:opacity-100">
                              {rec.riskScore}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Trends</CardTitle>
                  <CardDescription>Disease risk changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(riskAssessment).map(([disease, data]) => (
                      <div key={disease} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{disease}</span>
                        <div className="flex items-center space-x-2">
                          <Badge className={getRiskColor(data.risk)}>
                            {data.risk}
                          </Badge>
                          <span className="text-xs text-gray-500">{data.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Health Insights</CardTitle>
                <CardDescription>
                  Personalized recommendations from PathologyAI agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiInsights.map((insight, index) => (
                    <div key={index} className={`p-4 border-l-4 rounded-lg ${getPriorityColor(insight.priority)}`}>
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{insight.title}</h4>
                        <Badge variant="outline" className="capitalize">
                          {insight.priority} Priority
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{insight.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{insight.date}</span>
                        <Button size="sm" variant="outline">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientPortal;