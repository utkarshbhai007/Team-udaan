import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface AnalyticsProps {
  loading?: boolean;
}

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description, color }) => (
  <div className={`text-center p-4 ${color} rounded-lg`}>
    <div className="text-2xl font-bold">{value}</div>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

const ProgressMetric: React.FC<{ 
  label: string; 
  value: number; 
  displayValue: string;
}> = ({ label, value, displayValue }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="font-medium text-gray-900">{displayValue}</span>
    </div>
    <Progress value={value} className="h-2" />
  </div>
);

export const Analytics: React.FC<AnalyticsProps> = ({ loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const patientOutcomes = [
    { label: 'Treatment Success Rate', value: 94, displayValue: '94%' },
    { label: 'Patient Satisfaction', value: 96, displayValue: '4.8/5' },
    { label: 'Follow-up Compliance', value: 87, displayValue: '87%' },
    { label: 'Diagnostic Accuracy', value: 92, displayValue: '92%' }
  ];

  const aiImpactMetrics = [
    {
      title: 'Faster Diagnosis',
      value: '23%',
      description: 'Reduction in diagnosis time',
      color: 'bg-blue-50'
    },
    {
      title: 'Fewer Missed Diagnoses',
      value: '15%',
      description: 'Improvement in detection rate',
      color: 'bg-green-50'
    },
    {
      title: 'AI Recommendation Accuracy',
      value: '89%',
      description: 'Clinical decision support accuracy',
      color: 'bg-purple-50'
    },
    {
      title: 'Time Saved Daily',
      value: '2.5h',
      description: 'Average time saved per day',
      color: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Patient Outcomes</CardTitle>
          <CardDescription>Treatment effectiveness and patient progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {patientOutcomes.map((metric, index) => (
              <ProgressMetric key={index} {...metric} />
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>AI Impact Metrics</CardTitle>
          <CardDescription>How AI is improving your practice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {aiImpactMetrics.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};