import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface RoleBasedRouteProps {
    allowedRoles: string[];
}

const RoleBasedRoute = ({ allowedRoles }: RoleBasedRouteProps) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="h-[calc(100vh-64px)] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role || '')) {
        console.warn(`Access denied for user role: ${user.role} to path: ${location.pathname}`);
        // Redirect to their appropriate dashboard based on their actual role
        if (user.role === 'patient') return <Navigate to="/patient-portal" replace />;
        if (user.role === 'doctor') return <Navigate to="/doctor-dashboard" replace />;
        if (user.role === 'lab_admin') return <Navigate to="/lab-dashboard" replace />;

        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default RoleBasedRoute;
