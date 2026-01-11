import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { Chatbot } from '../Chatbot';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50">
      {!isLoginPage && <Navbar />}
      <main className={`flex-grow ${!isLoginPage ? 'pt-16' : ''}`}>
        {children || <Outlet />}
      </main>
      {!isLoginPage && <Footer />}
      {!isLoginPage && <Chatbot />}
    </div>
  );
};

export default Layout; 