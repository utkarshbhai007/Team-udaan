import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { 
  User, 
  LogOut, 
  Menu, 
  LayoutDashboard, 
  Settings, 
  Microscope,
  Stethoscope,
  Users,
  FileText,
  Brain,
  Shield,
  Activity
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Don't show navbar on login page
  if (location.pathname === '/' || location.pathname === '/login') {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getRoleBasedNavigation = () => {
    if (!user) return [];

    switch (user.role) {
      case 'lab_admin':
        return [
          { name: 'Lab Dashboard', path: '/lab-dashboard', icon: Microscope, badge: 'AI Hub' },
          { name: 'Reports', path: '/patient-analysis', icon: FileText },
          { name: 'AI Agents', path: '/drug-discovery', icon: Brain },
          { name: 'Quality Control', path: '/side-effects', icon: Shield }
        ];
      
      case 'doctor':
        return [
          { name: 'Doctor Dashboard', path: '/doctor-dashboard', icon: Stethoscope, badge: 'AI Enhanced' },
          { name: 'Patients', path: '/patient-analysis', icon: Users },
          { name: 'Lab Reports', path: '/drug-recommendation', icon: FileText },
          { name: 'AI Insights', path: '/drug-discovery', icon: Brain }
        ];
      
      case 'patient':
        return [
          { name: 'Patient Portal', path: '/patient-portal', icon: User, badge: 'My Health' },
          { name: 'My Reports', path: '/patient-analysis', icon: FileText },
          { name: 'Health Trends', path: '/drug-recommendation', icon: Activity },
          { name: 'Medications', path: '/side-effects', icon: Shield }
        ];
      
      default:
        return [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'Patient Analysis', path: '/patient-analysis', icon: FileText },
          { name: 'Drug Recommendation', path: '/drug-recommendation', icon: Shield },
          { name: 'Drug Discovery', path: '/drug-discovery', icon: Brain },
          { name: 'Side Effects', path: '/side-effects', icon: Activity }
        ];
    }
  };

  const navigationItems = getRoleBasedNavigation();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'lab_admin': return 'bg-blue-100 text-blue-800';
      case 'doctor': return 'bg-green-100 text-green-800';
      case 'patient': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'lab_admin': return 'Lab Admin';
      case 'doctor': return 'Doctor';
      case 'patient': return 'Patient';
      default: return 'User';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to={user ? "/home" : "/"} className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Microscope className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  <span className="text-gray-900">PathologyAI</span>
                  <span className="text-blue-600"> Hub</span>
                </h1>
                <div className="text-xs text-gray-500">AI Operating System for Labs</div>
              </div>
            </Link>

            {user && (
              <div className="hidden lg:flex lg:ml-8 lg:space-x-2">
                <Link
                  to="/home"
                  className={`text-gray-600 hover:text-blue-600 hover:bg-blue-50 inline-flex items-center px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    location.pathname === '/home' ? 'text-blue-600 bg-blue-50' : ''
                  }`}
                >
                  Home
                </Link>
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                        isActive
                          ? 'text-blue-600 bg-blue-50'
                          : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {user && (
              <>
                {/* Role Badge */}
                <Badge className={getRoleBadgeColor(user.role)}>
                  {getRoleDisplayName(user.role)}
                </Badge>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-blue-600 hover:bg-blue-50">
                      <User className="h-5 w-5 text-blue-600" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm">
                      <div className="font-medium">{user.name || user.email}</div>
                      <div className="text-xs text-gray-500">{getRoleDisplayName(user.role)}</div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:text-red-700 focus:text-red-700 focus:bg-red-50">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button variant="ghost" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {user && (
        <div className="lg:hidden border-t bg-gray-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/home"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                location.pathname === '/home'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Home
            </Link>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
