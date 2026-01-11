import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Microscope,
  Stethoscope,
  User,
  Shield,
  Brain,
  Activity,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  Lock,
  Database
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'patient' as 'patient' | 'doctor' | 'lab_admin' | 'researcher'
  });

  const roles = [
    {
      value: 'lab_admin',
      label: 'Lab Administrator',
      description: 'Manage lab operations and AI agents',
      icon: Microscope,
      features: ['AI Agent Management', 'Report Generation', 'Quality Control', 'Analytics Dashboard']
    },
    {
      value: 'doctor',
      label: 'Doctor',
      description: 'AI-enhanced clinical decision support',
      icon: Stethoscope,
      features: ['Patient Management', 'AI Insights', 'Lab Reports', 'Clinical Decision Support']
    },
    {
      value: 'patient',
      label: 'Patient',
      description: 'Personal health portal with AI insights',
      icon: User,
      features: ['Health Records', 'AI Health Insights', 'Medication Safety', 'Trend Analysis']
    }
  ];

  const demoCredentials = [
    { role: 'lab_admin', email: 'lab@pathologyai.com', password: 'demo123' },
    { role: 'doctor', email: 'doctor@pathologyai.com', password: 'demo123' },
    { role: 'patient', email: 'patient@pathologyai.com', password: 'demo123' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        if (!formData.name) throw new Error('Name is required for registration');
        await register(formData.email, formData.password, formData.name, formData.role);
      }

      const targetRole = isLogin ? formData.role || 'patient' : formData.role;
      const routes = { lab_admin: '/lab-dashboard', doctor: '/doctor-dashboard', patient: '/patient-portal' };

      setTimeout(() => {
        navigate(routes[targetRole as keyof typeof routes] || '/home');
      }, 100);

    } catch (error: any) {
      setError(error.message || (isLogin ? 'Login failed' : 'Registration failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoRole: string) => {
    const demo = demoCredentials.find(cred => cred.role === demoRole);
    if (demo) {
      setFormData({ ...formData, email: demo.email, password: demo.password, role: demo.role as any });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans selection:bg-blue-100">

      {/* Left Panel: The Obsidian Brand Experience */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0a0a0a] relative p-16 flex-col justify-between overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-20">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Zap className="h-5 w-5 text-black fill-black" />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white uppercase italic">
              MedGenius <span className="text-slate-500 font-light leading-none">AI</span>
            </span>
          </div>

          <h1 className="text-6xl font-semibold tracking-tighter text-white leading-[0.95] mb-10">
            Precision Intelligence <br />
            <span className="text-slate-500 font-light italic">for clinical ecosystems.</span>
          </h1>

          <div className="space-y-6 max-w-md">
            <p className="text-slate-400 text-lg font-light leading-relaxed">
              Orchestrating 5 specialized AI agents to deliver hyper-accurate diagnostics
              and medication safety protocols in real-time.
            </p>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-y-12 gap-x-8 border-t border-white/10 pt-12">
          {[
            { label: 'Throughput', val: '3x Faster', icon: Brain },
            { label: 'Quality Audit', val: '30% Reduction', sub: 'in errors', icon: Shield },
            { label: 'Early Detection', val: '6-12 Months', icon: Activity },
            { label: 'Cost Efficiency', val: '₹12.5L Saved', sub: 'monthly', icon: Database }
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2">{stat.label}</p>
              <p className="text-2xl font-medium text-white italic tracking-tight">{stat.val}</p>
              {stat.sub && <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{stat.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel: The Snow Authentication Workspace */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50/30">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-[440px] space-y-8 bg-white p-8 lg:p-14 lg:shadow-2xl lg:shadow-slate-200/50 border border-slate-100 lg:rounded-[2.5rem]"
        >
          <div className="text-center lg:text-left space-y-2">
            <h3 className="text-3xl font-semibold tracking-tighter text-slate-900">
              {isLogin ? 'Initialize Session' : 'Create Credentials'}
            </h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
              Access the medgenius infrastructure
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="rounded-none border-red-200 bg-red-50/50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs font-bold uppercase tracking-tight">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Workspace Role</Label>
              <Select
                value={formData.role}
                onValueChange={(value: any) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="h-12 rounded-none border-slate-200 bg-slate-50/50 focus:ring-0 focus:border-slate-400 transition-all">
                  <SelectValue placeholder="Select Identity" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value} className="py-3 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <role.icon className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-medium">{role.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 overflow-hidden"
                >
                  <Label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Full Name</Label>
                  <Input
                    id="name"
                    className="h-12 rounded-none border-slate-200 bg-slate-50/50 focus:ring-0 focus:border-slate-400 px-4"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rajesh Patel"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Network Email</Label>
              <Input
                id="email"
                type="email"
                className="h-12 rounded-none border-slate-200 bg-slate-50/50 focus:ring-0 focus:border-slate-400 px-4"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@clinical.ai"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Security Key</Label>
                {isLogin && <button type="button" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-black transition-colors">Recover</button>}
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="h-12 rounded-none border-slate-200 bg-slate-50/50 focus:ring-0 focus:border-slate-400 px-4"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-black text-white hover:bg-slate-800 rounded-none transition-all font-normal text-base mt-6 group shadow-lg shadow-black/5"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>{isLogin ? "Sign In" : "Register Credentials"}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          {isLogin && (
            <div className="space-y-4 pt-8 border-t border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] text-center">Instant Sandbox Access</p>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => handleDemoLogin(role.value)}
                    className="py-2.5 border border-slate-200 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:border-black hover:text-black transition-all bg-white"
                  >
                    {role.value.split('_')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="text-center pt-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs font-bold text-slate-400 uppercase tracking-widest hover:text-black transition-colors"
            >
              {isLogin ? "No account? Join the network" : "Have access? Terminate registration"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}