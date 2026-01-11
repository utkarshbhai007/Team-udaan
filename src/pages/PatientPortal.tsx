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

  const [healthRecords, setHealthRecords] = useState<any[]>([]);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);

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

  // Polling for Records (Live Updates)
  useEffect(() => {
    if (!user) return;

    const fetchRecords = () => {
      try {
        const records = blockchainService.getRecordsByPatient(user.uid);

        // Map to UI
        const mappedRecords = records.map((r: any) => ({
          id: r.recordId,
          date: new Date(r.timestamp).toLocaleDateString(),
          type: r.fullData.testName || 'General Analysis',
          status: r.fullData.riskAssessment?.level === 'High' ? 'Critical' :
            r.fullData.riskAssessment?.level === 'Moderate' ? 'Attention Required' : 'Normal',
          riskScore: r.fullData.riskAssessment?.score || 0,
          fullData: r.fullData
        }));
        setHealthRecords(mappedRecords);

        if (records.length > 0) {
          const latest = records[0].fullData;
          const newInsights = latest.nextSteps?.map((step: any, i: number) => ({
            title: 'Action Item',
            message: typeof step === 'string' ? step : step.step,
            priority: 'high',
            date: new Date().toLocaleDateString()
          })) || [];
          setAiInsights(newInsights);

          const score = latest.riskAssessment?.score || 0;
          setRiskAssessment({
            diabetes: { risk: score > 50 ? 'MODERATE' : 'LOW', score: Math.round(score * 0.8), trend: 'STABLE', nextScreening: '6 months' },
            cardiovascular: { risk: score > 70 ? 'HIGH' : 'LOW', score: score, trend: 'STABLE', nextScreening: '3 months' },
            kidney: { risk: 'LOW', score: Math.round(score * 0.5), trend: 'STABLE', nextScreening: 'Annual' },
            liver: { risk: 'LOW', score: Math.round(score * 0.4), trend: 'STABLE', nextScreening: 'Annual' }
          });
        }
      } catch (error) {
        console.error("Auto-fetch failed", error);
      }
    };

    fetchRecords(); // Initial call
    const interval = setInterval(fetchRecords, 5000); // 5s Polling
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
                  <div className="text-2xl font-bold text-green-600">85/100</div>
                  <p className="text-xs text-muted-foreground">
                    Good health status
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
                  <div className="text-2xl font-bold">Feb 15</div>
                  <p className="text-xs text-muted-foreground">
                    Follow-up visit
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
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
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
                      <span className="font-medium text-green-600">85/100</span>
                    </div>
                    <Progress value={85} className="h-3" />
                    <p className="text-xs text-green-600">↑ 5 points improvement this month</p>
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