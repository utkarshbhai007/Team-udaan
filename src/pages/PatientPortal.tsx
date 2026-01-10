import { useState } from 'react';
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
  Brain
} from 'lucide-react';

const PatientPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patientData] = useState({
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    patientId: 'PAT-2024-001',
    lastVisit: '2024-01-15',
    nextAppointment: '2024-02-15'
  });

  const [healthRecords] = useState([
    {
      id: 'RPT-2024-001',
      date: '2024-01-15',
      type: 'Complete Blood Count',
      status: 'Normal',
      aiInsights: 'All parameters within healthy range. Continue current lifestyle.',
      riskScore: 15,
      trend: 'stable'
    },
    {
      id: 'RPT-2024-002',
      date: '2024-01-10',
      type: 'Lipid Profile',
      status: 'Attention Required',
      aiInsights: 'Cholesterol levels slightly elevated. Dietary modifications recommended.',
      riskScore: 35,
      trend: 'increasing'
    },
    {
      id: 'RPT-2024-003',
      date: '2024-01-05',
      type: 'Liver Function Test',
      status: 'Normal',
      aiInsights: 'Liver enzymes optimal. No concerns detected.',
      riskScore: 8,
      trend: 'stable'
    }
  ]);

  const [medications] = useState([
    {
      name: 'Metformin',
      dosage: '500mg twice daily',
      purpose: 'Blood sugar control',
      safetyStatus: 'Safe',
      interactions: 0,
      nextReview: '2024-02-01'
    },
    {
      name: 'Lisinopril',
      dosage: '10mg once daily',
      purpose: 'Blood pressure management',
      safetyStatus: 'Monitor',
      interactions: 1,
      nextReview: '2024-01-25'
    }
  ]);

  const [riskAssessment] = useState({
    diabetes: { risk: 'MODERATE', score: 35, trend: 'STABLE', nextScreening: '6 months' },
    cardiovascular: { risk: 'LOW', score: 20, trend: 'IMPROVING', nextScreening: '1 year' },
    kidney: { risk: 'LOW', score: 12, trend: 'STABLE', nextScreening: '1 year' },
    liver: { risk: 'LOW', score: 8, trend: 'STABLE', nextScreening: '1 year' }
  });

  const [aiInsights] = useState([
    {
      type: 'early-warning',
      title: 'Cholesterol Trend Alert',
      message: 'Your cholesterol levels have increased by 15% over the last 3 months. Consider dietary changes.',
      priority: 'medium',
      date: '2024-01-15'
    },
    {
      type: 'medication-safety',
      title: 'Drug Interaction Check',
      message: 'No dangerous interactions detected with your current medications.',
      priority: 'low',
      date: '2024-01-15'
    },
    {
      type: 'preventive-care',
      title: 'Preventive Screening Due',
      message: 'Your next diabetes screening is recommended in 6 months.',
      priority: 'low',
      date: '2024-01-15'
    }
  ]);

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
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Medication Safety Monitor
                </CardTitle>
                <CardDescription>
                  AI-powered medication safety and interaction checking
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
                          {med.interactions > 0 && (
                            <p className="text-xs text-yellow-600 mt-1">
                              {med.interactions} interaction(s) detected
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Next Review: {med.nextReview}</span>
                        <Button size="sm" variant="outline">
                          View Details
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