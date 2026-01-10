import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Microscope, 
  Shield, 
  Brain, 
  Pill, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  FileText,
  Settings,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';

const LabDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [agentStatus, setAgentStatus] = useState({
    'report-generation': { status: 'active', processed: 1247, queue: 23 },
    'quality-control': { status: 'active', checked: 1198, flagged: 15 },
    'early-detection': { status: 'active', predictions: 89, alerts: 7 },
    'medication-safety': { status: 'active', interactions: 156, warnings: 12 },
    'care-coordinator': { status: 'active', coordinated: 1089, pending: 34 }
  });

  const [recentReports] = useState([
    { id: 'RPT-2024-001', patient: 'John Doe', status: 'completed', time: '2 hours ago', agent: 'report-generation' },
    { id: 'RPT-2024-002', patient: 'Jane Smith', status: 'processing', time: '30 minutes ago', agent: 'quality-control' },
    { id: 'RPT-2024-003', patient: 'Mike Johnson', status: 'flagged', time: '1 hour ago', agent: 'quality-control' },
    { id: 'RPT-2024-004', patient: 'Sarah Wilson', status: 'completed', time: '3 hours ago', agent: 'report-generation' },
    { id: 'RPT-2024-005', patient: 'David Brown', status: 'processing', time: '45 minutes ago', agent: 'early-detection' }
  ]);

  const [labStats] = useState({
    totalReports: 1247,
    completedToday: 89,
    avgProcessingTime: 4.2,
    errorRate: 2.1,
    patientSatisfaction: 94.8,
    costSavings: 1250000
  });

  const aiAgents = [
    {
      id: 'report-generation',
      name: 'Report Generation Agent',
      icon: Microscope,
      color: 'bg-blue-500',
      description: 'Automated pathology report generation',
      metrics: { processed: agentStatus['report-generation'].processed, queue: agentStatus['report-generation'].queue }
    },
    {
      id: 'quality-control',
      name: 'Quality Control Agent',
      icon: Shield,
      color: 'bg-green-500',
      description: 'Automated quality assurance and error detection',
      metrics: { checked: agentStatus['quality-control'].checked, flagged: agentStatus['quality-control'].flagged }
    },
    {
      id: 'early-detection',
      name: 'Early Disease Detection Agent',
      icon: Brain,
      color: 'bg-purple-500',
      description: 'Predictive health analytics and risk assessment',
      metrics: { predictions: agentStatus['early-detection'].predictions, alerts: agentStatus['early-detection'].alerts }
    },
    {
      id: 'medication-safety',
      name: 'Medication Safety Agent',
      icon: Pill,
      color: 'bg-red-500',
      description: 'Drug interaction monitoring and safety alerts',
      metrics: { interactions: agentStatus['medication-safety'].interactions, warnings: agentStatus['medication-safety'].warnings }
    },
    {
      id: 'care-coordinator',
      name: 'Care Coordinator Agent',
      icon: Users,
      color: 'bg-orange-500',
      description: 'Patient-doctor-lab coordination and follow-up',
      metrics: { coordinated: agentStatus['care-coordinator'].coordinated, pending: agentStatus['care-coordinator'].pending }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'flagged': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleTestAgent = async (agentId: string) => {
    console.log(`Testing ${agentId} agent...`);
    // Simulate agent testing
    setAgentStatus(prev => ({
      ...prev,
      [agentId]: { ...prev[agentId], status: 'testing' }
    }));

    setTimeout(() => {
      setAgentStatus(prev => ({
        ...prev,
        [agentId]: { ...prev[agentId], status: 'active' }
      }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PathologyAI Hub - Lab Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your AI-powered pathology operations</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{labStats.totalReports.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{labStats.completedToday} completed today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{labStats.avgProcessingTime}h</div>
              <p className="text-xs text-green-600">
                70% faster than manual
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{labStats.errorRate}%</div>
              <p className="text-xs text-green-600">
                30% reduction from baseline
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{(labStats.costSavings / 100000).toFixed(1)}L</div>
              <p className="text-xs text-green-600">
                This month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="agents">AI Agents</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* AI Agents Status */}
            <Card>
              <CardHeader>
                <CardTitle>AI Agents Status</CardTitle>
                <CardDescription>Real-time status of all PathologyAI agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {aiAgents.map((agent) => (
                    <div key={agent.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-8 h-8 rounded-lg ${agent.color} flex items-center justify-center`}>
                          <agent.icon className="h-4 w-4 text-white" />
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Active
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm mb-2">{agent.name}</h4>
                      <p className="text-xs text-gray-600 mb-3">{agent.description}</p>
                      <div className="space-y-1 text-xs">
                        {Object.entries(agent.metrics).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="capitalize">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
                <CardDescription>Latest pathology reports processed by AI agents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <div>
                          <p className="font-medium text-sm">{report.id}</p>
                          <p className="text-xs text-gray-600">{report.patient}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <span className="text-xs text-gray-500">{report.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiAgents.map((agent) => (
                <Card key={agent.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg ${agent.color} flex items-center justify-center`}>
                          <agent.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{agent.name}</CardTitle>
                          <CardDescription>{agent.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(agent.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-gray-900">{value}</div>
                            <div className="text-xs text-gray-600 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleTestAgent(agent.id)}
                          className="flex-1"
                        >
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Test Agent
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Report Management</CardTitle>
                    <CardDescription>Manage and monitor pathology reports</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Batch
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export Reports
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{report.id}</p>
                          <p className="text-sm text-gray-600">{report.patient}</p>
                          <p className="text-xs text-gray-500">Processed by {report.agent}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(report.status)}>
                          {report.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{report.time}</span>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Processing Efficiency</CardTitle>
                  <CardDescription>Report processing time trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Average Processing Time</span>
                      <span className="font-medium">4.2 hours</span>
                    </div>
                    <Progress value={70} className="h-2" />
                    <p className="text-xs text-green-600">70% improvement from baseline (14 hours)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quality Metrics</CardTitle>
                  <CardDescription>Error rates and quality scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Error Rate</span>
                      <span className="font-medium">2.1%</span>
                    </div>
                    <Progress value={21} className="h-2" />
                    <p className="text-xs text-green-600">30% reduction from baseline (3%)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Impact</CardTitle>
                  <CardDescription>Financial benefits and savings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">₹12.5L</div>
                        <div className="text-xs text-gray-600">Monthly Savings</div>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">3x</div>
                        <div className="text-xs text-gray-600">Capacity Increase</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patient Satisfaction</CardTitle>
                  <CardDescription>Patient feedback and satisfaction scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Overall Satisfaction</span>
                      <span className="font-medium">94.8%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                    <p className="text-xs text-green-600">15% improvement from baseline</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LabDashboard;