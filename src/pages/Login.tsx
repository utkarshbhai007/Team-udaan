import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
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
  ArrowRight
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
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      features: ['AI Agent Management', 'Report Generation', 'Quality Control', 'Analytics Dashboard']
    },
    {
      value: 'doctor',
      label: 'Doctor',
      description: 'AI-enhanced clinical decision support',
      icon: Stethoscope,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      features: ['Patient Management', 'AI Insights', 'Lab Reports', 'Clinical Decision Support']
    },
    {
      value: 'patient',
      label: 'Patient',
      description: 'Personal health portal with AI insights',
      icon: User,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      features: ['Health Records', 'AI Health Insights', 'Medication Safety', 'Trend Analysis']
    }
  ];

  const demoCredentials = [
    {
      role: 'lab_admin',
      email: 'lab@pathologyai.com',
      password: 'demo123',
      name: 'Dr. Rajesh Patel'
    },
    {
      role: 'doctor',
      email: 'doctor@pathologyai.com',
      password: 'demo123',
      name: 'Dr. Sarah Wilson'
    },
    {
      role: 'patient',
      email: 'patient@pathologyai.com',
      password: 'demo123',
      name: 'John Doe'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login Logic
        await login(formData.email, formData.password);
      } else {
        // Register Logic
        if (!formData.name) throw new Error('Name is required for registration');
        await register(formData.email, formData.password, formData.name, formData.role);
      }

      // Determine where to redirect based on role
      // Note: In real app, we might check the user object returned from login/register
      // But here we can use the local selected role for immediate redirect prediction
      const targetRole = isLogin ? formData.role || 'patient' : formData.role;

      setTimeout(() => {
        switch (targetRole) {
          case 'lab_admin':
            navigate('/lab-dashboard');
            break;
          case 'doctor':
            navigate('/doctor-dashboard');
            break;
          case 'patient':
            navigate('/patient-portal');
            break;
          default:
            navigate('/home');
        }
      }, 100);

    } catch (error: any) {
      setError(error.message || (isLogin ? 'Login failed' : 'Registration failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoRole: string) => {
    const demo = demoCredentials.find(cred => cred.role === demoRole);
    if (demo) {
      setFormData({
        ...formData,
        email: demo.email,
        password: demo.password,
        role: demo.role as any
      });
      // Optionally auto-submit
      // handleSubmit(new Event('submit') as any); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Branding */}
        <div className="flex flex-col justify-center space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Microscope className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">PathologyAI Hub</h1>
                <p className="text-gray-600">AI Operating System for Pathology Labs</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                Transform Pathology with AI
              </h2>
              <p className="text-lg text-gray-600">
                5 AI agents working 24/7 to deliver 3x faster reports, early disease detection,
                and medication safety for labs, doctors, and patients.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Brain className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">3x Faster</p>
                  <p className="text-sm text-gray-600">Report Processing</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">30% Fewer</p>
                  <p className="text-sm text-gray-600">Errors</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">6-12 Months</p>
                  <p className="text-sm text-gray-600">Early Detection</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">₹12.5L</p>
                  <p className="text-sm text-gray-600">Monthly Savings</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login/Register Form */}
        <div className="flex flex-col justify-center">
          <Card className="w-full max-w-md mx-auto shadow-xl border-t-4 border-t-blue-600">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
              <CardDescription>
                {isLogin
                  ? 'Sign in to access your dashboard'
                  : 'Join thousands of healthcare professionals using AI'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Role Selection is useful for both, but critical for Register. 
                    For Login, we might optionalize it if we auto-detect, but keeping it simple for now. */}
                <div className="space-y-2">
                  <Label htmlFor="role">I am a...</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: any) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((roleOption) => {
                        const Icon = roleOption.icon;
                        return (
                          <SelectItem key={roleOption.value} value={roleOption.value}>
                            <div className="flex items-center space-x-2">
                              <Icon className={`h-4 w-4 ${roleOption.color}`} />
                              <span>{roleOption.label}</span>
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {!isLogin && (
                  <div className="space-y-2 animate-in fade-in slide-in-from-top-4 duration-300">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. John Doe"
                      required={!isLogin}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-11 text-base shadow-md transition-all hover:scale-[1.01]"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {isLogin ? 'Signing in...' : 'Creating Account...'}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Demo Credentials - Login Only */}
              {isLogin && (
                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-muted-foreground text-center mb-3 uppercase tracking-wider font-medium">
                    Or try with Demo Account
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {demoCredentials.map((demo) => {
                      const roleInfo = roles.find(r => r.value === demo.role);
                      const Icon = roleInfo?.icon || User;

                      return (
                        <Button
                          key={demo.role}
                          variant="outline"
                          size="sm"
                          className="w-full justify-start hover:bg-gray-50 border-gray-200"
                          onClick={() => handleDemoLogin(demo.role)}
                          type="button"
                        >
                          <Icon className={`h-4 w-4 mr-2 ${roleInfo?.color}`} />
                          <span className="flex-1 text-left font-medium">{roleInfo?.label}</span>
                          <Badge variant="secondary" className="text-[10px] font-normal bg-gray-100 text-gray-500">
                            Demo
                          </Badge>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="bg-gray-50 flex justify-center py-4 rounded-b-xl border-t">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-color"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </CardFooter>
          </Card>

          {/* Feature Highlight for Selected Role */}
          <div className={`mt-6 transition-all duration-500 ${formData.role ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {(() => {
              const selectedRole = roles.find(r => r.value === formData.role);
              if (!selectedRole) return null;

              const Icon = selectedRole.icon;
              return (
                <div className={`p-4 rounded-xl border ${selectedRole.bgColor} border-${selectedRole.color.split('-')[1]}-100 shadow-sm max-w-md mx-auto`}>
                  <div className="flex items-center space-x-2 mb-3">
                    <Icon className={`h-5 w-5 ${selectedRole.color}`} />
                    <h4 className="font-semibold text-gray-900">{selectedRole.label} Workspace</h4>
                  </div>
                  <ul className="space-y-1">
                    {selectedRole.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className={`h-3 w-3 mr-2 ${selectedRole.color}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
