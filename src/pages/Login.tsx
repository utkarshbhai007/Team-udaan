import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  EyeOff
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { register, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const [registerData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'patient' as 'patient' | 'doctor' | 'lab_admin'
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!loginData.email || !loginData.password || !loginData.role) {
        throw new Error('Please fill in all fields');
      }

      // Demo authentication
      const demoUser = demoCredentials.find(
        cred => cred.email === loginData.email && cred.password === loginData.password && cred.role === loginData.role
      );

      if (demoUser) {
        // Create mock user for auth context
        const mockUser = {
          uid: `${demoUser.role}-001`,
          email: demoUser.email,
          displayName: demoUser.name,
          role: demoUser.role
        };
        
        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(mockUser));
        
        // Trigger storage event for auth context
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'user',
          newValue: JSON.stringify(mockUser)
        }));

        toast({
          title: "Success",
          description: `Logged in as ${demoUser.name}`,
        });

        // Navigate based on role
        setTimeout(() => {
          switch (loginData.role) {
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
      } else {
        throw new Error('Invalid credentials. Please use demo credentials.');
      }
    } catch (error: any) {
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoRole: string) => {
    const demo = demoCredentials.find(cred => cred.role === demoRole);
    if (demo) {
      setLoginData({
        email: demo.email,
        password: demo.password,
        role: demo.role
      });
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

        {/* Right Side - Login Form */}
        <div className="flex flex-col justify-center">
          <Card className="w-full max-w-md mx-auto shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to PathologyAI Hub</CardTitle>
              <CardDescription>
                Sign in to access your AI-powered dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="role">Select Your Role</Label>
                  <Select value={loginData.role} onValueChange={(value) => setLoginData({...loginData, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your role" />
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

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      placeholder="Enter your password"
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
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 text-center mb-4">
                  Demo Credentials (Click to auto-fill):
                </p>
                <div className="space-y-2">
                  {demoCredentials.map((demo) => {
                    const roleInfo = roles.find(r => r.value === demo.role);
                    const Icon = roleInfo?.icon || User;
                    
                    return (
                      <Button
                        key={demo.role}
                        variant="outline"
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => handleDemoLogin(demo.role)}
                        type="button"
                      >
                        <Icon className={`h-4 w-4 mr-2 ${roleInfo?.color}`} />
                        <span className="flex-1 text-left">{roleInfo?.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {demo.email}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Role Features */}
              {loginData.role && (
                <div className="mt-6 pt-6 border-t">
                  {(() => {
                    const selectedRole = roles.find(r => r.value === loginData.role);
                    if (!selectedRole) return null;
                    
                    const Icon = selectedRole.icon;
                    return (
                      <div className={`p-4 rounded-lg ${selectedRole.bgColor}`}>
                        <div className="flex items-center space-x-2 mb-3">
                          <Icon className={`h-5 w-5 ${selectedRole.color}`} />
                          <h4 className="font-semibold text-gray-900">{selectedRole.label} Features</h4>
                        </div>
                        <ul className="space-y-1">
                          {selectedRole.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm text-gray-700">
                              <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
