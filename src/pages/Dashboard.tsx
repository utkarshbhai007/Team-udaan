
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Activity, User, Microscope, Pill, Clipboard, Shield, Users, Settings, Clock, Download, Search, FileBarChart, LayoutDashboard, ChevronRight, Zap } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import ActivityService, { ActivityItem } from '@/services/ActivityService';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load recent activities
    const userActivities = ActivityService.getActivities();
    setActivities(userActivities);
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged out successfully',
        description: 'You have been logged out of your account.',
      });
      navigate('/login');
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to log out.', variant: 'destructive' });
    }
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'search': return <Search className="h-4 w-4 text-blue-500" />;
      case 'analysis': return <FileBarChart className="h-4 w-4 text-green-500" />;
      case 'download': return <Download className="h-4 w-4 text-purple-500" />;
      case 'view': return <Activity className="h-4 w-4 text-amber-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatActivityDate = (timestamp: number) => {
    try {
      return format(new Date(timestamp), 'MMM d, h:mm a');
    } catch (error) {
      return '';
    }
  };

  if (!user) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <PageContainer>
        <div className="px-6 py-8 max-w-7xl mx-auto">

          {/* Hero Welcome */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Microscope className="h-64 w-64 text-white" />
            </div>
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-4xl font-bold mb-2">Welcome back, {user.displayName || user.email?.split('@')[0]}</h1>
                  <p className="text-blue-100 text-lg opacity-90 max-w-xl">
                    Command Center • {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'} Access
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 text-center">
                    <div className="text-2xl font-bold">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    <div className="text-xs text-blue-200 uppercase tracking-widest">{format(new Date(), 'EEEE, MMM d')}</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Quick Actions - Main Area */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-amber-500" /> Quick Actions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Admin Actions */}
                  {user.role === 'admin' && (
                    <>
                      <QuickActionCard
                        title="Manage Users"
                        desc="Control access & permissions"
                        icon={Users}
                        color="bg-blue-500"
                        onClick={() => navigate('/admin/users')}
                      />
                      <QuickActionCard
                        title="System Settings"
                        desc="Configure platform parameters"
                        icon={Settings}
                        color="bg-slate-600"
                        onClick={() => navigate('/admin/settings')}
                      />
                      <QuickActionCard
                        title="Admin Console"
                        desc="Full administrative overview"
                        icon={Shield}
                        color="bg-purple-600"
                        onClick={() => navigate('/admin')}
                      />
                    </>
                  )}

                  {/* Doctor Actions */}
                  {user.role === 'doctor' && (
                    <>
                      <QuickActionCard
                        title="Patient Analysis"
                        desc="AI-powered diagnostic reports"
                        icon={Clipboard}
                        color="bg-blue-600"
                        onClick={() => navigate('/patient-analysis')}
                      />
                      <QuickActionCard
                        title="Drug Discovery"
                        desc="Research new treatments"
                        icon={Microscope}
                        color="bg-indigo-600"
                        onClick={() => navigate('/drug-discovery')}
                      />
                      <QuickActionCard
                        title="Prescriptions"
                        desc="AI-assisted recommendations"
                        icon={Pill}
                        color="bg-emerald-600"
                        onClick={() => navigate('/drug-recommendation')}
                      />
                    </>
                  )}

                  {/* Patient Actions */}
                  {user.role === 'patient' && (
                    <>
                      <QuickActionCard
                        title="My Reports"
                        desc="View your health analysis"
                        icon={FileBarChart}
                        color="bg-blue-600"
                        onClick={() => navigate('/patient-portal')}
                      />
                      <QuickActionCard
                        title="Medications"
                        desc="Track your prescriptions"
                        icon={Pill}
                        color="bg-emerald-600"
                        onClick={() => navigate('/patient-portal')}
                      />
                    </>
                  )}

                  {/* Common Actions */}
                  <QuickActionCard
                    title="Profile Settings"
                    desc="Update your personal info"
                    icon={User}
                    color="bg-gray-600"
                    onClick={() => { }}
                  />
                </div>
              </div>

              {/* Status Overview Code Block (Optional Visual) */}
              <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="bg-gray-50 border-b border-gray-100">
                  <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-widest">System Status</CardTitle>
                </CardHeader>
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
                  <div className="p-4 text-center hover:bg-gray-50 transition-colors">
                    <div className="text-2xl font-bold text-gray-900">99.8%</div>
                    <div className="text-xs text-green-600 font-medium">Uptime</div>
                  </div>
                  <div className="p-4 text-center hover:bg-gray-50 transition-colors">
                    <div className="text-2xl font-bold text-gray-900">0.4s</div>
                    <div className="text-xs text-blue-600 font-medium">Latency</div>
                  </div>
                  <div className="p-4 text-center hover:bg-gray-50 transition-colors">
                    <div className="text-2xl font-bold text-gray-900">Secure</div>
                    <div className="text-xs text-purple-600 font-medium">Encryption</div>
                  </div>
                  <div className="p-4 text-center hover:bg-gray-50 transition-colors">
                    <div className="text-2xl font-bold text-gray-900">v2.4.0</div>
                    <div className="text-xs text-gray-500 font-medium">Version</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar - Activity & Info */}
            <div className="space-y-6">
              <Card className="border shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" /> Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 relative pl-4 border-l-2 border-gray-100 ml-2">
                    {activities.length === 0 ? (
                      <p className="text-sm text-gray-400 italic pl-4">No recent activity.</p>
                    ) : (
                      activities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="relative pl-4">
                          <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full border-2 border-white bg-blue-500 shadow-sm" />
                          <p className="text-sm font-medium text-gray-800">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{formatActivityDate(activity.timestamp)}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {activities.length > 0 && (
                    <Button variant="ghost" className="w-full mt-6 text-xs text-gray-400 hover:text-gray-600" onClick={() => {
                      ActivityService.clearActivities();
                      setActivities([]);
                    }}>
                      Clear History
                    </Button>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="h-8 w-8 text-emerald-400" />
                    <div>
                      <h3 className="font-bold">Enterprise Secured</h3>
                      <p className="text-xs text-gray-400">End-to-end Encrypted</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                    Your session is protected by 256-bit encryption. All medical records are stored in compliance with HIPAA guidelines.
                  </p>
                  <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700 text-white hover:text-white" onClick={handleLogout}>
                    Secure Logout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </PageContainer>
    </div>
  );
}

function QuickActionCard({ title, desc, icon: Icon, color, onClick }: any) {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className={`absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity`}>
        <Icon className="h-24 w-24 text-gray-900" />
      </div>

      <div className="relative z-10 flex items-start gap-4">
        <div className={`${color} p-3 rounded-xl text-white shadow-md group-hover:scale-110 transition-transform`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{desc}</p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
        <ChevronRight className="h-5 w-5 text-blue-500" />
      </div>
    </motion.div>
  )
}