
import * as React from "react";
import { useState, useEffect } from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import GlassCard from "@/components/ui/GlassCard";
import { Loader2, FileText, Upload, Play, CheckCircle2, User, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { pathologyAI } from "@/utils/apiService";
import { blockchainService, MOCK_USERS, MOCK_DOCTORS } from "@/services/BlockchainService";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const LabDashboard = () => {
  const [patientData, setPatientData] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'analyzing' | 'minting' | 'complete'>('idle');

  // Real Data State
  const [patients, setPatients] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);

  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch Real Users on Mount
  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedPatients = await pathologyAI.getPatients();
      const fetchedDoctors = await pathologyAI.getDoctors();
      setPatients(fetchedPatients);
      setDoctors(fetchedDoctors);
    };
    fetchUsers();
  }, []);

  const handleRunAnalysis = async () => {
    if (!patientData || !selectedPatientId || !selectedDoctorId) {
      toast({ variant: "destructive", title: "Missing Information", description: "Please select a patient, doctor, and enter data." });
      return;
    }

    setLoading(true);
    setStatus('analyzing');

    try {
      const patient = patients.find(u => u._id === selectedPatientId);

      // 1. Run Core AI Analysis
      const response = await pathologyAI.generatePathologyReport(
        { patientData },
        { name: patient?.name || 'Unknown', age: patient?.profile?.age || 'N/A', source: 'Lab Entry' }
      );

      // Parse response... 
      let result = typeof response === 'string' ? JSON.parse(response) : response;

      // Normalize result structure
      const baseResult = {
        diagnosis: result.diagnosis || [],
        riskFactors: result.riskFactors || [],
        recommendations: result.recommendations || [],
        nextSteps: result.nextSteps || [],
        metadata: { date: new Date().toISOString() }
      };

      // 2. Trigger Secondary Agents
      const [qcResult, careResult] = await Promise.all([
        pathologyAI.performQualityCheck(baseResult),
        pathologyAI.coordinateCare(patient?.name || 'Patient', baseResult)
      ]);

      const fullAnalysis = { ...baseResult, qualityControl: qcResult, careCoordinator: careResult };

      // 3. Mint to Blockchain
      setStatus('minting');
      // Use the real MongoDB _id as the ID for blockchain records
      const record = await blockchainService.mintRecord(selectedPatientId, selectedDoctorId, fullAnalysis);

      // Also save as "Current" for immediate View in other dashboards (optional, but good for demo continuity)
      localStorage.setItem('currentPatientAnalysis', JSON.stringify({
        analysis: fullAnalysis,
        blockchainRecord: record,
        patientInfo: { patientData, name: patient?.name }
      }));

      setStatus('complete');
      toast({ title: "Analysis Complete", description: `Record Minted: ${record.recordId}` });

    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Analysis failed" });
      setStatus('idle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🔬 Lab Dashboard</h1>
          <p className="text-gray-600">Sample Processing & AI Analysis Operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <GlassCard>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" /> Patient Assignment
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Registered Patient</Label>
                  <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Patient..." />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.length === 0 ? (
                        <SelectItem value="none" disabled>No patients found</SelectItem>
                      ) : (
                        patients.map(user => (
                          <SelectItem key={user._id} value={user._id}>{user.name} (Email: {user.email})</SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {selectedPatientId && (
                    <p className="text-xs text-gray-500 font-mono">Patient ID: {selectedPatientId}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Assign Consulting Doctor</Label>
                  <Select value={selectedDoctorId} onValueChange={setSelectedDoctorId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Assign Doctor..." />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.length === 0 ? (
                        <SelectItem value="none" disabled>No doctors found</SelectItem>
                      ) : (
                        doctors.map(doc => (
                          <SelectItem key={doc._id} value={doc._id}>{doc.name}</SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {selectedDoctorId && (
                    <p className="text-xs text-gray-500 font-mono">Doctor ID: {selectedDoctorId}</p>
                  )}
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-600" /> Clinical Data
              </h2>
              <Textarea
                placeholder="Paste raw LIS data or drag & drop JSON..."
                className="min-h-[200px] font-mono text-sm"
                value={patientData}
                onChange={(e) => setPatientData(e.target.value)}
              />
              <div className="flex gap-4 mt-4">
                <Button variant="outline" className="w-full" onClick={() => setPatientData("Patient: 45M. Sugar fast: 140, PP: 220. BP: 140/90. History of HTN.")}>
                  Load Sample
                </Button>
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={loading || !patientData || !selectedPatientId || !selectedDoctorId}
                  onClick={handleRunAnalysis}
                >
                  {loading ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  Run Analysis
                </Button>
              </div>
            </GlassCard>
          </div>

          {/* Status Section */}
          <div>
            <GlassCard className="h-full">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" /> Operations Log
              </h2>

              <div className="space-y-6">
                <div className={`flex items-center gap-4 p-3 rounded-lg ${status !== 'idle' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}>
                  <div className="font-bold">1. Report Agent</div>
                  <div className="ml-auto text-sm">{status === 'analyzing' ? <Loader2 className="animate-spin" /> : status !== 'idle' ? 'Done' : 'Waiting'}</div>
                </div>
                <div className={`flex items-center gap-4 p-3 rounded-lg ${status !== 'idle' && status !== 'analyzing' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}>
                  <div className="font-bold">2. QC & Safety Agents</div>
                  <div className="ml-auto text-sm">{status === 'analyzing' ? 'Pending...' : status === 'complete' || status === 'minting' ? 'Done' : 'Waiting'}</div>
                </div>
                <div className={`flex items-center gap-4 p-3 rounded-lg ${status === 'complete' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-400'}`}>
                  <div className="font-bold">3. Blockchain Minting</div>
                  <div className="ml-auto text-sm">{status === 'minting' ? <Loader2 className="animate-spin" /> : status === 'complete' ? 'Minted' : 'Waiting'}</div>
                </div>
              </div>

              {status === 'complete' && (
                <div className="mt-8 p-4 bg-green-100 rounded-xl border border-green-200 text-center">
                  <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-2" />
                  <h3 className="font-bold text-green-800">Processing Complete</h3>
                  <p className="text-sm text-green-600 mb-4">Record assigned to {doctors.find(d => d._id === selectedDoctorId)?.name}.</p>
                  <p className="text-xs text-gray-600 mt-2">
                    ℹ️ Doctor and Patient must log in with their credentials to view this record.
                  </p>
                </div>
              )}
            </GlassCard>

            {/* Registry View - Real Data */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Live Registry Stats</h3>
              <div className="flex justify-between text-sm">
                <span>Patients Registered: <strong>{patients.length}</strong></span>
                <span>Doctors Online: <strong>{doctors.length}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default LabDashboard;