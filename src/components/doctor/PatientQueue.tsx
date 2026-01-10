import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Eye, MessageSquare, Video } from 'lucide-react';
import { PatientQueueItem } from '@/types/doctor.types';
import { getPriorityColor, getRiskScoreColor, sortPatientsByPriority } from '@/utils/dashboard.utils';

interface PatientQueueProps {
  patients: PatientQueueItem[];
  loading?: boolean;
  showAll?: boolean;
}

const PatientCard: React.FC<{ patient: PatientQueueItem; showActions?: boolean }> = ({ 
  patient, 
  showActions = true 
}) => (
  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
    <div className="flex items-center space-x-4">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <Users className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{patient.name}</h4>
        <p className="text-sm text-gray-600">{patient.condition}</p>
        <p className="text-xs text-gray-500">
          {patient.appointmentTime} • Age {patient.age}
          {patient.lastVisit && ` • Last visit: ${patient.lastVisit}`}
        </p>
      </div>
    </div>
    
    <div className="flex items-center space-x-3">
      <div className="text-right">
        <Badge className={getPriorityColor(patient.priority)}>
          {patient.priority} Priority
        </Badge>
        <div className={`text-sm font-medium mt-1 ${getRiskScoreColor(patient.riskScore)}`}>
          Risk: {patient.riskScore}%
        </div>
      </div>
      
      {showActions && (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Eye className="h-4 w-4 mr-1" />
            Chart
          </Button>
          <Button size="sm" variant="outline">
            <MessageSquare className="h-4 w-4 mr-1" />
            Message
          </Button>
          {patient.status === 'In Progress' && (
            <Button size="sm" variant="outline">
              <Video className="h-4 w-4 mr-1" />
              Video Call
            </Button>
          )}
          <Button size="sm">
            {patient.status === 'Waiting' ? 'Start Visit' : 'Continue'}
          </Button>
        </div>
      )}
    </div>
  </div>
);

export const PatientQueue: React.FC<PatientQueueProps> = ({ 
  patients, 
  loading, 
  showAll = false 
}) => {
  if (loading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Patient Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedPatients = sortPatientsByPriority(patients);
  const displayPatients = showAll ? sortedPatients : sortedPatients.slice(0, 4);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {showAll ? 'Patient Management' : "Today's Patient Queue"}
        </CardTitle>
        <CardDescription>
          {showAll 
            ? 'Complete patient queue with AI risk assessment' 
            : 'Scheduled appointments with AI risk assessment'
          } ({patients.length} patients)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {displayPatients.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No patients scheduled for today
          </p>
        ) : (
          <div className="space-y-4">
            {displayPatients.map((patient) => (
              <div key={patient.id}>
                <PatientCard patient={patient} showActions={showAll} />
                
                {showAll && patient.aiAlerts.length > 0 && (
                  <div className="ml-16 mt-2 mb-4">
                    <p className="text-sm font-medium mb-2 text-gray-700">AI Alerts:</p>
                    <div className="flex flex-wrap gap-2">
                      {patient.aiAlerts.map((alert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {alert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};