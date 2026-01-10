import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Settings, Calendar } from 'lucide-react';
import { DoctorInfo } from '@/types/doctor.types';

interface DashboardHeaderProps {
  doctorInfo: DoctorInfo | null;
  alertCount?: number;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  doctorInfo, 
  alertCount = 3 
}) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
        <p className="text-gray-600 mt-1">AI-enhanced clinical decision support</p>
        {doctorInfo && (
          <p className="text-sm text-gray-500 mt-1">
            {doctorInfo.name} • {doctorInfo.specialty} • {doctorInfo.hospital}
          </p>
        )}
      </div>
      
      <div className="flex space-x-3">
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Alerts ({alertCount})
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
        <Button size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          Schedule
        </Button>
      </div>
    </div>
  );
};