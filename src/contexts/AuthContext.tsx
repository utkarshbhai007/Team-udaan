import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';
import api from '@/services/api';

interface User {
  uid: string;
  email: string | null;
  name?: string;
  role?: 'patient' | 'doctor' | 'lab_admin' | 'researcher';
  token?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/auth/login', { email, password });

      const { user, token } = response.data;
      const authUser = {
        uid: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      };

      localStorage.setItem('user', JSON.stringify(authUser));
      localStorage.setItem('token', token);

      setUser(authUser);

      toast({
        title: "Success",
        description: "Logged in successfully",
      });
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: string = 'patient'): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.post('/auth/register', { email, password, name, role });

      const { user, token } = response.data;
      const authUser = {
        uid: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      };

      localStorage.setItem('user', JSON.stringify(authUser));
      localStorage.setItem('token', token);

      setUser(authUser);

      toast({
        title: "Success",
        description: "Account created successfully",
      });
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: message,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}