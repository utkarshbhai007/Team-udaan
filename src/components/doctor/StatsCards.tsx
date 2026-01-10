import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, AlertTriangle, FileText, Brain } from 'lucide-react';
import { DashboardStats } from '@/types/doctor.types';

interface StatsCardsProps {
  stats: DashboardStats | null;
  loading?: boolean;
}

const StatCard: React.FC<{
  title: string;
  value: number;
  target?: number;
  change?: string | null;
  icon: React.ElementType;
  iconColor: string;
  iconBgColor: string;
}> = ({ title, value, target, change, icon: Icon, iconColor, iconBgColor }) => (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 font-medium">{change} from yesterday</p>
          )}
          {target && (
            <p className="text-sm text-gray-500">Target: {target}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${iconBgColor}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, loading }) => {
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statsConfig = [
    {
      title: "Patients Seen",
      value: stats.patientsSeen.value,
      target: stats.patientsSeen.target,
      change: stats.patientsSeen.change,
      icon: Users,
      iconColor: "text-blue-600",
      iconBgColor: "bg-blue-50"
    },
    {
      title: "Critical Alerts",
      value: stats.criticalAlerts.value,
      change: stats.criticalAlerts.change,
      icon: AlertTriangle,
      iconColor: "text-red-600",
      iconBgColor: "bg-red-50"
    },
    {
      title: "Reports Reviewed",
      value: stats.reportsReviewed.value,
      change: stats.reportsReviewed.change,
      icon: FileText,
      iconColor: "text-green-600",
      iconBgColor: "bg-green-50"
    },
    {
      title: "AI Recommendations",
      value: stats.aiRecommendations.value,
      change: stats.aiRecommendations.change,
      icon: Brain,
      iconColor: "text-purple-600",
      iconBgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsConfig.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};