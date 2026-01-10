import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Eye, MessageSquare, TrendingUp, CheckCircle } from 'lucide-react';
import { LabReport } from '@/types/doctor.types';
import { getStatusColor, getTrendIcon } from '@/utils/dashboard.utils';

interface LabReportsProps {
  reports: LabReport[];
  loading?: boolean;
}

const ReportCard: React.FC<{ report: LabReport }> = ({ report }) => (
  <div className="border rounded-lg p-4 space-y-4">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="font-semibold text-gray-900">
          {report.patientName} - {report.testType}
        </h4>
        <p className="text-sm text-gray-600">
          {report.patientId} • {report.timestamp}
        </p>
        <p className="text-sm font-medium mt-1 text-gray-900">
          Result: {report.result}
        </p>
      </div>
      <Badge className={getStatusColor(report.status)}>
        {report.status}
      </Badge>
    </div>
    
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
      <p className="text-sm font-medium text-blue-800 mb-1">AI Clinical Insight:</p>
      <p className="text-sm text-blue-700">{report.aiInsight}</p>
    </div>
    
    <div>
      <p className="text-sm font-medium mb-2 text-gray-900">AI Recommendations:</p>
      <ul className="text-sm text-gray-600 space-y-1">
        {report.recommendations.map((rec, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="h-3 w-3 mr-2 text-green-500 flex-shrink-0" />
            {rec}
          </li>
        ))}
      </ul>
    </div>
    
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{getTrendIcon(report.trend)}</span>
        <span className="text-sm text-gray-600 capitalize">
          Trend: {report.trend}
        </span>
      </div>
      <div className="flex space-x-2">
        <Button size="sm" variant="outline">
          <Eye className="h-4 w-4 mr-1" />
          Full Report
        </Button>
        <Button size="sm" variant="outline">
          <MessageSquare className="h-4 w-4 mr-1" />
          Discuss
        </Button>
        <Button size="sm">
          Take Action
        </Button>
      </div>
    </div>
  </div>
);

export const LabReports: React.FC<LabReportsProps> = ({ reports, loading }) => {
  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Laboratory Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Laboratory Reports</CardTitle>
            <CardDescription>
              Recent lab results with AI analysis and recommendations ({reports.length} reports)
            </CardDescription>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Reports
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {reports.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No lab reports available
          </p>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};