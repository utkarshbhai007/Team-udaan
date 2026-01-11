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
  Brain,
  Activity,
  Zap,
  ChevronDown
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/login') return null;

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
      case 'lab_admin': return [{ name: 'Lab Systems', path: '/lab-dashboard', icon: Microscope }];
      case 'doctor': return [{ name: 'Clinical Portal', path: '/doctor-dashboard', icon: Stethoscope }];
      case 'patient': return [{ name: 'Health Record', path: '/patient-portal', icon: Activity }];
      case 'researcher': return [{ name: 'R&D Discovery', path: '/drug-discovery', icon: Brain }];
      default: return [];
    }
  };

  const navigationItems = getRoleBasedNavigation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          {/* Brand Logo */}
          <div className="flex items-center gap-10">
            <Link to={user ? "/home" : "/"} className="flex items-center space-x-2 group">
              <div className="w-9 h-9 bg-slate-950 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                <Zap className="h-5 w-5 text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tighter leading-none uppercase italic">
                  MedGenius <span className="text-slate-400 font-light">AI</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 tracking-[0.15em] uppercase mt-0.5">
                  Systems
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            {user && (
              <div className="hidden lg:flex items-center gap-1">
                <Link
                  to="/home"
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full ${location.pathname === '/home' ? 'text-slate-950 bg-slate-100' : 'text-slate-400 hover:text-slate-950'
                    }`}
                >
                  Overview
                </Link>
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full ${location.pathname === item.path ? 'text-slate-950 bg-slate-100' : 'text-slate-400 hover:text-slate-950'
                      }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Badge variant="outline" className="hidden sm:flex rounded-none border-slate-200 text-[10px] font-bold tracking-widest uppercase py-1 px-3 text-slate-500">
                  {user.role.replace('_', ' ')}
                </Badge>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="group flex items-center gap-2 p-1 pl-3 hover:bg-slate-50 rounded-full border border-transparent hover:border-slate-100 transition-all">
                      <div className="flex flex-col items-end hidden sm:flex">
                        <span className="text-xs font-bold tracking-tight text-slate-900">{user.name || 'Account'}</span>
                        <span className="text-[9px] font-medium text-slate-400 uppercase">Manage</span>
                      </div>
                      <div className="h-9 w-9 rounded-full bg-slate-950 flex items-center justify-center text-white text-xs font-bold ring-4 ring-white shadow-sm">
                        {user.name?.charAt(0) || 'U'}
                      </div>
                      <ChevronDown className="h-3 w-3 text-slate-400 group-hover:text-slate-950 transition-colors" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-64 mt-2 p-2 rounded-2xl border-slate-100 shadow-2xl shadow-slate-200/50">
                    <div className="px-3 py-4">
                      <div className="font-bold tracking-tight text-slate-900">{user.name || user.email}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{user.role}</div>
                    </div>
                    <DropdownMenuSeparator className="bg-slate-50" />
                    <DropdownMenuItem onClick={() => navigate('/dashboard')} className="rounded-xl py-3 focus:bg-slate-50 cursor-pointer">
                      <LayoutDashboard className="mr-3 h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium">Control Center</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')} className="rounded-xl py-3 focus:bg-slate-50 cursor-pointer">
                      <Settings className="mr-3 h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium">System Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-50" />
                    <DropdownMenuItem onClick={handleLogout} className="rounded-xl py-3 text-red-600 focus:bg-red-50 focus:text-red-700 cursor-pointer">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span className="text-sm font-bold uppercase tracking-widest">Terminate Session</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button onClick={() => navigate('/login')} className="bg-slate-950 hover:bg-slate-800 text-white rounded-none px-8 font-normal tracking-wide">
                Login
              </Button>
            )}

            {/* Mobile Menu Icon */}
            <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;