import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle } from 'lucide-react';
import { AIInsight } from '@/types/doctor.types';
import { getUrgencyColor } from '@/utils/dashboard.utils';

interface AIInsightsProps {
  insights: AIInsight[];
  loading?: boolean;
  showAll?: boolean;
}

const InsightCard: React.FC<{ insight: AIInsight }> = ({ insight }) => (
  <div className="border rounded-lg p-6 space-y-4">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-lg font-semibold text-gray-900">{insight.title}</h4>
        <p className="text-sm text-gray-600">Patient: {insight.patient}</p>
      </div>
      <Badge variant="outline" className="text-purple-600 border-purple-200">
        {insight.confidence}% Confidence
      </Badge>
    </div>
    
    <p className="text-gray-700">{insight.description}</p>
    
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-sm font-medium mb-2 text-gray-900">Recommended Actions:</p>
      <ul className="space-y-2">
        {insight.actions.map((action, index) => (
          <li key={index} className="flex items-center text-sm text-gray-700">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
            {action}
          </li>
        ))}
      </ul>
    </div>
    
    <div className="flex justify-between items-center">
      <div className="flex space-x-4 text-sm text-gray-500">
        {insight.timeframe && <span>Timeframe: {insight.timeframe}</span>}
        {insight.severity && <span>Severity: {insight.severity}</span>}
        <span className={getUrgencyColor(insight.urgency)}>
          Urgency: {insight.urgency}
        </span>
      </div>
      <div className="flex space-x-2">
        <Button size="sm" variant="outline">
          View Evidence
        </Button>
        <Button size="sm">
          Implement
        </Button>
      </div>
    </div>
  </div>
);

export const AIInsights: React.FC<AIInsightsProps> = ({ 
  insights, 
  loading, 
  showAll = false 
}) => {
  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-600" />
            AI Clinical Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayInsights = showAll ? insights : insights.slice(0, 2);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="h-5 w-5 mr-2 text-purple-600" />
          {showAll ? 'AI Clinical Decision Support' : 'AI Clinical Insights'}
        </CardTitle>
        <CardDescription>
          {showAll 
            ? 'Advanced AI insights to enhance your clinical decision-making'
            : 'AI-powered recommendations for your patients'
          } ({insights.length} insights)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {displayInsights.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No AI insights available at this time
          </p>
        ) : (
          <div className="space-y-6">
            {displayInsights.map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};