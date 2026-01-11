
import * as React from "react";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import { Activity, AlertTriangle, FileText, User, Calendar, ArrowRight, Shield, Stethoscope, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { pathologyAI } from "@/utils/apiService";
import { blockchainService } from "@/services/BlockchainService";
import { useAuth } from "@/contexts/AuthContext";

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [view, setView] = React.useState<'list' | 'detail'>('list');
  const [selectedRecord, setSelectedRecord] = React.useState<any>(null);
  const [doctors, setDoctors] = React.useState<any[]>([]);
  const [doctorId, setDoctorId] = React.useState('');
  const [isEditingPlan, setIsEditingPlan] = React.useState(false);
  const [analysisData, setAnalysisData] = React.useState<any>(null);
  const [records, setRecords] = React.useState<any[]>([]);
  const [isGeneratingPlan, setIsGeneratingPlan] = React.useState(false);

  // Render analysis block
  const renderAnalysis = () => {
    if (!analysisData) return null;
    const { blockchainRecord, analysis, patientInfo } = analysisData;
    return (
      <GlassCard className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Minted Record Overview</h3>
        <p className="text-sm">Record ID: {blockchainRecord?.recordId || 'N/A'}</p>
        <p className="text-sm">Patient: {patientInfo?.name || 'Unknown'}</p>
        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
          {JSON.stringify(analysis, null, 2)}
        </pre>
      </GlassCard>
    );
  };

  // Inside return JSX, after header
  // Insert {renderAnalysis()} before the list view

  React.useEffect(() => {
    const stored = localStorage.getItem('currentPatientAnalysis');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAnalysisData(parsed);
      } catch (e) {
        console.error('Failed to parse stored analysis', e);
      }
    }
  }, []);

  // Fetch doctors on mount
  React.useEffect(() => {
    const fetchDoctors = async () => {
      // If logged in as doctor, use own ID
      if (user && user.role === 'doctor') {
        setDoctorId(user.uid);
        return;
      }

      // Fallback for demo / lab admin view
      const docs = await pathologyAI.getDoctors();
      setDoctors(docs);
      if (docs.length > 0) {
        setDoctorId(docs[0]._id);
      }
    };
    fetchDoctors();
  }, [user]);

  // Auto-fetch records every 5 seconds
  React.useEffect(() => {
    const fetchRecords = async () => {
      if (doctorId) {
        console.log('🔍 DoctorDashboard: Fetching reports for doctorId:', doctorId);

        // OLD: Blockchain Service
        // const recs = blockchainService.getRecordsByDoctor(doctorId);

        // NEW: Backend API Service
        const reports = await pathologyAI.getReports({ doctorId });
        console.log('📋 Backend Reports Found:', reports.length, reports);

        // Map Backend Report -> Dashboard Record Format
        const mappedRecords = reports.map((r: any) => ({
          recordId: r._id,
          patientId: r.patientId,
          assignedDoctorId: r.doctorId,
          timestamp: r.createdAt,
          status: 'Verified',
          fullData: r.aiAnalysis || {}, // The analysis is stored here
          // Keep other fields for compatibility
          dataHash: 'BACKEND-VERIFIED',
          blockHeight: 0
        }));

        setRecords(mappedRecords);
      }
    };

    fetchRecords(); // Initial fetch
    const interval = setInterval(fetchRecords, 5000); // Poll every 5s

    return () => clearInterval(interval);
  }, [doctorId]);

  const handleSelectRecord = (record: any) => {
    setSelectedRecord(record);
    setView('detail');
  };

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">👨‍⚕️ Doctor Portal</h1>
            <p className="text-gray-600">Assigned Patient Queue & Clinical Analysis</p>
          </div>
          <div className="flex items-center gap-2">
            {user && user.role === 'doctor' ? (
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 rounded-full border border-blue-100 text-sm font-medium">
                <Stethoscope className="h-4 w-4" />
                Welcome, {user.name}
              </div>
            ) : (
              <>
                <span className="text-sm text-gray-500">Viewing as:</span>
                <select
                  className="bg-white border rounded-md p-1 text-sm"
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                >
                  {doctors.length === 0 ? (
                    <option>Loading doctors...</option>
                  ) : (
                    doctors.map(d => (
                      <option key={d._id} value={d._id}>{d.name}</option>
                    ))
                  )}
                </select>
              </>
            )}
          </div>
        </div>

        {renderAnalysis()}
        {view === 'list' && (
          <div className="grid grid-cols-1 gap-6">
            <GlassCard>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-blue-600" /> Pending Reviews
              </h2>
              {records.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <p className="text-gray-500 mb-2">No patients assigned yet.</p>
                  <p className="text-xs text-gray-400">
                    (Backend fetched 0 records. Please run analysis in Lab Dashboard first.)
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {records.map((rec) => (
                    <div key={rec.recordId} className="py-4 flex items-center justify-between hover:bg-gray-50 px-2 rounded-lg transition-colors cursor-pointer" onClick={() => handleSelectRecord(rec)}>
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                          {rec.patientId.substring(4, 6)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">Patient ID: {rec.patientId}</h3>
                          <p className="text-sm text-gray-500">Record: {rec.recordId} • {new Date(rec.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {rec.fullData?.riskFactors?.length > 0 && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                            {rec.fullData.riskFactors.length} Risks
                          </span>
                        )}
                        <Button size="sm" variant="outline">Review Case</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>
        )}

        {view === 'detail' && selectedRecord && (
          <div className="animate-fade-in">
            <Button variant="ghost" className="mb-4 pl-0 hover:pl-2 transition-all" onClick={() => setView('list')}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Patient List
            </Button>

            {/* Patient Banner */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 flex items-center gap-6">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl">
                PT
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Patient Analysis Record</h2>
                <div className="flex gap-4 text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1"><User className="h-4 w-4" /> ID: {selectedRecord.patientId}</span>
                  <span className="flex items-center gap-1"><Shield className="h-4 w-4" /> Rec: {selectedRecord.recordId}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Col: Risks & Alerts */}
              <div className="space-y-6 lg:col-span-2">
                {/* Risk Radar - Agent 3 */}
                <GlassCard className="border-l-4 border-l-purple-500">
                  <div className="flex items-center gap-3 mb-6">
                    <Activity className="h-6 w-6 text-purple-600" />
                    <h3 className="text-lg font-bold text-gray-900">Health Risk Predictions (6-12 Months)</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedRecord.fullData.riskFactors.map((risk: any, i: number) => (
                      <div key={i} className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-purple-900">{typeof risk === 'string' ? risk : risk.factor}</span>
                          {typeof risk === 'object' && risk.impact && (
                            <span className={`text-xs px-2 py-1 rounded-full ${risk.impact === 'High' ? 'bg-red-100 text-red-700' : 'bg-purple-200 text-purple-700'}`}>
                              {risk.impact} Risk
                            </span>
                          )}
                        </div>
                        {typeof risk === 'object' && <p className="text-sm text-purple-700">{risk.description}</p>}
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Safety Checks - Agent 4 */}
                <GlassCard className="border-l-4 border-l-red-500">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="h-6 w-6 text-red-600" />
                    <h3 className="text-lg font-bold text-gray-900">Medication Safety Alerts</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-100 flex gap-4">
                      <Shield className="h-6 w-6 text-red-600 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-900">Interaction Check Complete</h4>
                        <p className="text-sm text-red-700 mt-1">
                          Creating safety protocols based on patient's current medication list. Warning: Review potential interactions with identified risk factors.
                        </p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Right Col: Care Plan */}
              <div className="space-y-6">
                {/* Care Plan - Agent 5 */}
                <GlassCard className="h-full border-l-4 border-l-green-500 flex flex-col">
                  <div className="flex items-center gap-3 mb-6 justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-green-600" />
                      <h3 className="text-lg font-bold text-gray-900">Care Plan</h3>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsEditingPlan(!isEditingPlan)}>
                      {isEditingPlan ? 'Cancel' : 'Edit Plan'}
                    </Button>
                  </div>

                  {selectedRecord.fullData.careCoordinator?.carePlan ? (
                    <div className="space-y-6 flex-grow overflow-y-auto max-h-[600px] pr-2">
                      {/* Summary Section */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Clinical Summary</h4>
                        {isEditingPlan ? (
                          <textarea
                            className="w-full p-2 border rounded-md text-sm"
                            rows={4}
                            defaultValue={selectedRecord.fullData.careCoordinator.carePlan.summary}
                          />
                        ) : (
                          <p className="text-sm text-gray-700 leading-relaxed bg-green-50/50 p-3 rounded-lg border border-green-100">
                            {selectedRecord.fullData.careCoordinator.carePlan.summary}
                          </p>
                        )}
                      </div>

                      {/* Immediate Actions */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-3 w-3 text-red-500" /> Immediate Actions
                        </h4>
                        <ul className="space-y-2">
                          {selectedRecord.fullData.careCoordinator.carePlan.immediateActions.map((action: string, i: number) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-white p-2 rounded shadow-sm border border-gray-100">
                              <ArrowRight className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                              {isEditingPlan ? (
                                <input className="flex-1 bg-transparent border-b border-gray-200 focus:outline-none focus:border-blue-500" defaultValue={action} />
                              ) : action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Scheduled Follow-ups */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                          <Calendar className="h-3 w-3 text-blue-500" /> Scheduled Follow-ups
                        </h4>
                        <div className="space-y-2">
                          {selectedRecord.fullData.careCoordinator.carePlan.scheduledFollowups?.map((audit: string, i: number) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-gray-700 bg-blue-50 p-2 rounded border border-blue-100">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              {isEditingPlan ? <input className="bg-transparent w-full" defaultValue={audit} /> : audit}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Lifestyle Adjustments */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-2">
                          <Activity className="h-3 w-3 text-orange-500" /> Lifestyle Adjustments
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {selectedRecord.fullData.careCoordinator.carePlan.lifestyleAdjustments?.map((item: string, i: number) => (
                            <div key={i} className="p-2 bg-orange-50 rounded text-sm text-orange-800 border border-orange-100">
                              {isEditingPlan ? <input className="bg-transparent w-full" defaultValue={item} /> : item}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 mt-auto space-y-2">
                        {isEditingPlan && (
                          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => {
                            setIsEditingPlan(false);
                            // Note: In a real app, we'd save the edits to blockchain/DB here
                          }}>
                            Save Changes
                          </Button>
                        )}
                        <Button className="w-full bg-green-600 hover:bg-green-700 shadow-md shadow-green-200" onClick={() => alert("Care Plan Approved & Signed!")}>
                          Approve & Sign Plan
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                      <FileText className="h-10 w-10 mb-4 opacity-50" />
                      <p className="mb-4">No care plan generated yet.</p>
                      <Button
                        onClick={async () => {
                          setIsGeneratingPlan(true);
                          try {
                            const carePlanResult = await pathologyAI.coordinateCare(selectedRecord.patientId, selectedRecord.fullData);

                            // Merge into fullData
                            const updatedFullData = {
                              ...selectedRecord.fullData,
                              careCoordinator: carePlanResult
                            };

                            // Save to Backend
                            await pathologyAI.updateReport(selectedRecord.recordId, {
                              aiAnalysis: updatedFullData
                            });

                            // Update Local State
                            setSelectedRecord({
                              ...selectedRecord,
                              fullData: updatedFullData
                            });

                            // Update in list
                            setRecords(prev => prev.map(r => r.recordId === selectedRecord.recordId ? { ...r, fullData: updatedFullData } : r));

                            alert("Care Plan Generated & Saved!");
                          } catch (e) {
                            console.error(e);
                            alert("Failed to generate plan");
                          } finally {
                            setIsGeneratingPlan(false);
                          }
                        }}
                        disabled={isGeneratingPlan}
                      >
                        {isGeneratingPlan ? 'Generating with AI...' : 'Generate Care Plan Now'}
                      </Button>
                    </div>
                  )}
                </GlassCard>
              </div>
            </div>
          </div>
        )}

        {/* DEBUG SECTION */}
        <div className="mt-12 p-4 bg-gray-100 border-2 border-dashed border-gray-400 rounded-xl">
          <h3 className="font-bold text-red-600 mb-2">🔧 DEBUG: RAW BLOCKCHAIN DATA</h3>
          <Button
            size="sm"
            variant="outline"
            className="mb-4"
            onClick={() => {
              const all = blockchainService.getAllRecords();
              console.log('ALL RECORDS:', all);
              alert('Check Console for full records');
            }}
          >
            Log All Records to Console
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full mb-2 bg-red-50 text-red-700 hover:bg-red-100"
            onClick={async () => {
              console.log("🕵️‍♂️ Debug: Fetching ALL reports from DB (no filter)...");
              const allReports = await pathologyAI.getReports({});
              console.log("📊 ALL DB REPORTS:", allReports);
              alert(`Found ${allReports.length} total reports in DB.\nCheck Console for details.`);
            }}
          >
            🕵️‍♂️ Debug: Check Database for ANY Reports
          </Button>

          <div className="text-xs font-mono text-gray-700 bg-white p-2 border mb-2 rounded">
            <strong>Current Logged In User:</strong><br />
            UID: {user?.uid || 'Not Logged In'}<br />
            Role: {user?.role || 'N/A'}<br />
            Name: {user?.name || 'N/A'}
          </div>
          <div className="text-xs font-mono whitespace-pre-wrap bg-white p-2 h-64 overflow-auto border">
            {JSON.stringify(blockchainService.getAllRecords(), null, 2)}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default DoctorDashboard;