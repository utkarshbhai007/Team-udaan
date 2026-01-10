import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, Eye, MessageSquare } from 'lucide-react';
import { LabReport } from '@/types/doctor.types';
import { getStatusColor, filterCriticalReports } from '@/utils/dashboard.utils';

interface CriticalAlertsProps {
  reports: LabReport[];
  loading?: boolean;
}

export const CriticalAlerts: React.FC<CriticalAlertsProps> = ({ reports, loading }) => {
  const criticalReports = filterCriticalReports(reports);

  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
            Critical Patient Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (criticalReports.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-green-600" />
            Critical Patient Alerts
          </CardTitle>
          <CardDescription>No critical alerts at this time</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            All patients are stable. Great work! 🎉
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
          Critical Patient Alerts
        </CardTitle>
        <CardDescription>
          Urgent cases requiring immediate attention ({criticalReports.length})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {criticalReports.map((report) => (
            <Alert key={report.id} className="border-l-4 border-l-red-500">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">
                      {report.patientName} - {report.testType}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      {report.aiInsight}
                    </p>
                    <div className="flex items-center space-x-4 text-sm">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      <span className="text-gray-500">{report.timestamp}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};