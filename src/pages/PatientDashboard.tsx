
import * as React from "react";
import PageContainer from "@/components/layout/PageContainer";
import GlassCard from "@/components/ui/GlassCard";
import { Lock, Heart, TrendingUp, CheckCircle, FileText, ArrowRight, User, ChevronLeft, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { pathologyAI } from "@/utils/apiService";
import { blockchainService } from "@/services/BlockchainService";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useAuth } from "@/contexts/AuthContext";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [view, setView] = React.useState<'list' | 'detail'>('list');
  const [selectedRecord, setSelectedRecord] = React.useState<any>(null);
  const [patients, setPatients] = React.useState<any[]>([]);
  const [patientId, setPatientId] = React.useState('');
  const [downloading, setDownloading] = React.useState(false);
  const [records, setRecords] = React.useState<any[]>([]);

  // Fetch patients on mount
  React.useEffect(() => {
    const fetchPatients = async () => {
      // If logged in as patient, use own ID
      if (user && user.role === 'patient') {
        setPatientId(user.uid);
        return;
      }

      const pts = await pathologyAI.getPatients();
      setPatients(pts);
      if (pts.length > 0) {
        setPatientId(pts[0]._id);
      }
    };
    fetchPatients();
  }, [user]);

  // Auto-fetch records every 5 seconds
  React.useEffect(() => {
    const fetchRecords = () => {
      if (patientId) {
        const recs = blockchainService.getRecordsByPatient(patientId);
        setRecords(recs);
      }
    };

    fetchRecords();
    const interval = setInterval(fetchRecords, 5000);
    return () => clearInterval(interval);
  }, [patientId]);

  const handleSelectRecord = (record: any) => {
    setSelectedRecord(record);
    setView('detail');
  };

  const handleDownloadPDF = async () => {
    setDownloading(true);
    try {
      const element = document.getElementById('report-content');
      if (element) {
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`MedGenius_Report_${selectedRecord.recordId}.pdf`);
      }
    } catch (error) {
      console.error('Download failed', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">👤 My Health Ledger</h1>
            <p className="text-gray-600">Your secure, owned medical history</p>
          </div>
          <div className="flex items-center gap-2">
            {user && user.role === 'patient' ? (
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-50 text-purple-800 rounded-full border border-purple-100 text-sm font-medium">
                <User className="h-4 w-4" />
                Welcome, {user.name}
              </div>
            ) : (
              <>
                <span className="text-sm text-gray-500">Viewing as:</span>
                <select
                  className="bg-white border rounded-md p-1 text-sm"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                >
                  {patients.length === 0 ? (
                    <option>Loading patients...</option>
                  ) : (
                    patients.map(u => (
                      <option key={u._id} value={u._id}>{u.name}</option>
                    ))
                  )}
                </select>
              </>
            )}
          </div>
        </div>

        {view === 'list' && (
          <div className="space-y-4">
            {records.length === 0 ? (
              <GlassCard className="text-center py-10">
                <h3 className="text-lg font-semibold text-gray-700">No Health Records Found</h3>
                <p className="text-gray-500">Your records will appear here once processed by the Lab.</p>
              </GlassCard>
            ) : (
              records.map((rec) => (
                <div key={rec.recordId} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleSelectRecord(rec)}>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{new Date(rec.timestamp).toLocaleDateString(undefined, { dateStyle: 'medium' })} Report</h3>
                      <p className="text-xs text-gray-500 font-mono">HASH: {rec.dataHash.substring(0, 12)}...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full border border-emerald-100">
                      <Lock className="h-3 w-3" /> Verified
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {view === 'detail' && selectedRecord && (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <Button variant="ghost" className="pl-0" onClick={() => setView('list')}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back to History
              </Button>
              <Button onClick={handleDownloadPDF} disabled={downloading} className="bg-blue-600 hover:bg-blue-700">
                {downloading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                Download PDF
              </Button>
            </div>

            <div id="report-content" className="bg-white p-6 rounded-xl">
              {/* Blockchain Badge */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white mb-8 shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2 opacity-90">
                    <Lock className="h-5 w-5" />
                    <span className="text-sm font-medium tracking-wider uppercase">Secured by Solana</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-1">Record #{selectedRecord.recordId}</h2>
                  <p className="text-emerald-100 text-sm font-mono truncate">{selectedRecord.dataHash}</p>
                  <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                    <CheckCircle className="h-3 w-3" /> Blockchain Verified
                  </div>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
                  <Lock className="h-48 w-48" />
                </div>
              </div>

              {/* Simplified Report Details */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-pink-500" /> Health Summary
                </h2>

                {/* Diagnosis Card */}
                <GlassCard>
                  <h3 className="font-semibold text-gray-900 mb-3">What we found</h3>
                  <div className="space-y-3">
                    {selectedRecord.fullData.diagnosis.map((d: any, i: number) => (
                      <div key={i} className="p-3 bg-blue-50 rounded-lg text-blue-900 text-sm">
                        {typeof d === 'string' ? d : d.condition}
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Trends */}
                <GlassCard>
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-500" /> Risk Radar
                  </h3>
                  <div className="space-y-3">
                    {selectedRecord.fullData.riskFactors.length > 0 ? (
                      selectedRecord.fullData.riskFactors.map((r: any, i: number) => (
                        <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="text-sm font-medium text-gray-700">{typeof r === 'string' ? r : r.factor}</span>
                          <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Monitored</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-gray-400 text-sm">No significant risks detected.</div>
                    )}
                  </div>
                </GlassCard>

                {/* Next Steps */}
                <GlassCard className="bg-gradient-to-br from-white to-green-50/50">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4 text-green-600" /> Action Plan
                  </h3>
                  <ul className="space-y-2">
                    {selectedRecord.fullData.nextSteps.map((step: any, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <ArrowRight className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                        {typeof step === 'string' ? step : step.step}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default PatientDashboard;