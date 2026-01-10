import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Microscope, 
  Shield, 
  Brain, 
  Pill, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Zap,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  const aiAgents = [
    {
      id: 'report-generation',
      name: 'Report Generation Agent',
      icon: Microscope,
      description: '3x faster report processing (4 hours vs 24 hours)',
      color: 'bg-blue-500',
      stats: '25 minutes saved per report',
      benefit: '3x more reports with same staff'
    },
    {
      id: 'quality-control',
      name: 'Quality Control Agent',
      icon: Shield,
      description: '30% reduction in re-testing and errors',
      color: 'bg-green-500',
      stats: '₹10-15L saved annually',
      benefit: 'Automated error detection'
    },
    {
      id: 'early-detection',
      name: 'Early Disease Detection Agent',
      icon: Brain,
      description: 'Predict diseases 6-12 months early',
      color: 'bg-purple-500',
      stats: '80% more effective treatment',
      benefit: 'Catch diseases before symptoms'
    },
    {
      id: 'medication-safety',
      name: 'Medication Safety Agent',
      icon: Pill,
      description: 'Real-time drug interaction checking',
      color: 'bg-red-500',
      stats: '2.1M adverse events monitored',
      benefit: 'Prevent medication errors'
    },
    {
      id: 'care-coordinator',
      name: 'Care Coordinator Agent',
      icon: Users,
      description: 'Seamless patient-doctor-lab coordination',
      color: 'bg-orange-500',
      stats: '100% care continuity',
      benefit: 'No one falls through cracks'
    }
  ];

  const marketStats = [
    { label: 'Reports Generated Annually', value: '500M+', icon: BarChart3 },
    { label: 'Market Size', value: '₹15,000 Cr', icon: TrendingUp },
    { label: 'Pathology Labs in India', value: '100K+', icon: Microscope },
    { label: 'Processing Time Reduction', value: '70%', icon: Clock }
  ];

  const usps = [
    {
      title: '3x Faster Report Processing',
      description: 'AI generates reports in 4-6 hours vs 24-48 hours manual work',
      icon: Zap
    },
    {
      title: 'Early Disease Prediction',
      description: 'Predict diabetes, cardiovascular, kidney diseases 6-12 months ahead',
      icon: Brain
    },
    {
      title: 'Medication Safety Shield',
      description: 'Real-time drug interaction checking with FDA FAERS database',
      icon: Shield
    },
    {
      title: 'Multi-Agent Intelligence',
      description: '5 specialized agents working together like a medical team',
      icon: Users
    },
    {
      title: 'Blockchain Security',
      description: 'Tamper-proof medical records with lifetime access',
      icon: Lock
    },
    {
      title: 'White-Label Platform',
      description: 'Labs keep their brand while we power the technology',
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              AI Operating System for Pathology Labs
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              PathologyAI Hub
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              5 AI Agents Working 24/7 to Transform Pathology Labs with 3x Faster Reports, 
              Early Disease Detection, and Medication Safety
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                onClick={() => navigate('/dashboard')}
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
                onClick={() => navigate('/documentation')}
              >
                View Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {marketStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Agents Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Your AI Agent Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              5 specialized AI agents working together to revolutionize pathology operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiAgents.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onHoverStart={() => setActiveAgent(agent.id)}
                onHoverEnd={() => setActiveAgent(null)}
              >
                <Card className={`h-full cursor-pointer transition-all duration-300 ${
                  activeAgent === agent.id ? 'shadow-xl scale-105' : 'shadow-lg hover:shadow-xl'
                }`}>
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${agent.color} flex items-center justify-center mb-4`}>
                      <agent.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{agent.name}</CardTitle>
                    <CardDescription className="text-base">
                      {agent.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Impact:</span>
                        <Badge variant="secondary">{agent.stats}</Badge>
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        ✓ {agent.benefit}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* USPs Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why PathologyAI Hub Wins
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our unfair advantages that make us the #1 choice for pathology labs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {usps.map((usp, index) => (
              <motion.div
                key={usp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-4">
                      <usp.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{usp.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{usp.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
                The Problem
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="font-semibold text-lg mb-2">For Pathology Labs:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>⏰ 24-48 hours to generate reports (pathologists overwhelmed)</li>
                    <li>👨‍⚕️ Need expensive pathologists (₹15-20L/year) for growing demand</li>
                    <li>⚠️ 30% of reports have errors (costs ₹10-15L annually)</li>
                    <li>📉 Low patient retention (patients disappear after reports)</li>
                  </ul>
                </div>
                <div className="border-l-4 border-orange-500 pl-6">
                  <h4 className="font-semibold text-lg mb-2">For Patients:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>😕 Confusing medical jargon in reports</li>
                    <li>📊 No historical context or health trends</li>
                    <li>⏳ Late disease detection (symptoms appear too late)</li>
                    <li>💊 Dangerous medication interactions unchecked</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                Our Solution
              </h3>
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="font-semibold text-lg mb-2">PathologyAI Hub:</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>🔬 Auto-generated reports in 4 hours (vs 24 hours)</li>
                    <li>🚨 30% reduction in errors with AI quality control</li>
                    <li>🧬 Predict diseases 6-12 months early</li>
                    <li>💊 Real-time medication safety monitoring</li>
                    <li>🤝 Seamless patient-doctor-lab coordination</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">Market Impact:</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold text-blue-600">₹70 Cr</div>
                      <div className="text-gray-600">Year 1 ARR Target</div>
                    </div>
                    <div>
                      <div className="font-semibold text-purple-600">500M+</div>
                      <div className="text-gray-600">Reports/Year</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Pathology Lab?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the AI revolution in pathology. Start your free trial today and see 3x faster reports in 30 days.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
                onClick={() => navigate('/dashboard')}
              >
                Start Free Trial
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-3"
                onClick={() => navigate('/contact')}
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;