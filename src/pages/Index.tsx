import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Microscope,
  Activity,
  ShieldCheck,
  BrainCircuit,
  Stethoscope,
  Clock,
  AlertTriangle,
  FileText,
  CheckCircle2,
  ArrowRight,
  Database,
  Lock
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Disclaimer } from "@/components/ui/Disclaimer";
import GlassCard from "@/components/ui/GlassCard";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <a href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10">
                  New Release
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                  <span>PathologyAI Hub v1.0</span>
                </span>
              </a>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              AI Operating System for Pathology Labs
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Transform your lab with 5 specialized AI Agents that process reports 3x faster, predict diseases 6 months early, and prevent 100% of medication errors.
            </p>
            <div className="mt-10 flex flex-col gap-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Select a Persona to Demo:</h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg w-full sm:w-auto"
                  onClick={() => navigate('/lab-dashboard')}
                >
                  🔬 Lab Dashboard
                </Button>
                <Button
                  size="lg"
                  className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg w-full sm:w-auto"
                  onClick={() => navigate('/doctor-dashboard')}
                >
                  👨‍⚕️ Doctor Portal
                </Button>
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg w-full sm:w-auto"
                  onClick={() => navigate('/patient-dashboard')}
                >
                  👤 Patient App
                </Button>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mt-0 lg:mr-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-400">The Challenge</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What's Broken in Healthcare Today?
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Inefficiencies cost labs ₹15,000 Cr annually while patients face delayed diagnoses and medication risks.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <Clock className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  For Pathology Labs
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">
                    • ⏰ <strong>Slow Processing:</strong> 24-48 hours TAT.<br />
                    • 👨‍⚕️ <strong>Capacity Bottleneck:</strong> Hiring pathologists is expensive.<br />
                    • ⚠️ <strong>Quality Issues:</strong> 30% error rate costs ₹15L/year.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <AlertTriangle className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  For Patients
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">
                    • 😕 <strong>Confusing Reports:</strong> Medical jargon is unintelligible.<br />
                    • ⏳ <strong>Late Detection:</strong> Missed early warning signs.<br />
                    • 💊 <strong>Medication Risks:</strong> Dangerous drug interactions ignored.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <FileText className="h-5 w-5 flex-none text-blue-400" aria-hidden="true" />
                  For Doctors
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-300">
                  <p className="flex-auto">
                    • 📄 <strong>Incomplete Info:</strong> No historical context.<br />
                    • ⚠️ <strong>Missed Red Flags:</strong> Critical findings buried.<br />
                    • ⏱️ <strong>Time Wasted:</strong> 20 mins interpreting raw data.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* The Solution - 5 Agents */}
      <div id="how-it-works" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">The Solution</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              5 AI Agents Working Together
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              A comprehensive multi-agent architecture that covers the entire diagnostic lifecycle.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-5">
              {/* Agent 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                  <Microscope className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">1. Report Generation</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Analyzes results in 30s. Generates interpretations. Saves 25 mins/report.
                </p>
              </div>

              {/* Agent 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">
                  <ShieldCheck className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">2. Quality Control</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Cross-checks against reference ranges. Flags anomalies. Reduces re-testing by 30%.
                </p>
              </div>

              {/* Agent 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50">
                  <Activity className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">3. Early Detection</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Predicts diabetes/heart risk 6-12 months early using trend analysis.
                </p>
              </div>

              {/* Agent 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">4. Medication Safety</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Checks drugs against 2.1M FDA adverse events. Prevents dangerous interactions.
                </p>
              </div>

              {/* Agent 5 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50">
                  <BrainCircuit className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold leading-7 text-gray-900">5. Care Coordinator</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">
                  Master agent. Orchestrates care, schedules follow-ups, ensures compliance.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* USPs */}
      <div className="bg-white py-24 sm:py-32 border-t border-gray-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Why We Win</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Unique Selling Points
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="flex gap-x-4 rounded-xl bg-gray-50 p-6 ring-1 ring-inset ring-gray-900/10">
                <Database className="h-7 w-5 flex-none text-blue-600" aria-hidden="true" />
                <div className="text-base leading-7">
                  <h3 className="font-semibold text-gray-900">Blockchain-Secured Records</h3>
                  <p className="mt-2 text-gray-600">Every report stored on Solana. Tamper-proof, lifetime access. NABH/JCI compliant.</p>
                </div>
              </div>
              <div className="flex gap-x-4 rounded-xl bg-gray-50 p-6 ring-1 ring-inset ring-gray-900/10">
                <CheckCircle2 className="h-7 w-5 flex-none text-blue-600" aria-hidden="true" />
                <div className="text-base leading-7">
                  <h3 className="font-semibold text-gray-900">3x Faster Processing</h3>
                  <p className="mt-2 text-gray-600">Reduces TAT from 24h to 4h. Labs can serve 3x more patients without hiring.</p>
                </div>
              </div>
              <div className="flex gap-x-4 rounded-xl bg-gray-50 p-6 ring-1 ring-inset ring-gray-900/10">
                <Activity className="h-7 w-5 flex-none text-blue-600" aria-hidden="true" />
                <div className="text-base leading-7">
                  <h3 className="font-semibold text-gray-900">Early Disease Prediction</h3>
                  <p className="mt-2 text-gray-600">Catches diseases when treatment is 80% more effective (6-12 months ahead).</p>
                </div>
              </div>
              <div className="flex gap-x-4 rounded-xl bg-gray-50 p-6 ring-1 ring-inset ring-gray-900/10">
                <Lock className="h-7 w-5 flex-none text-blue-600" aria-hidden="true" />
                <div className="text-base leading-7">
                  <h3 className="font-semibold text-gray-900">White-Label Platform</h3>
                  <p className="mt-2 text-gray-600">Labs keep their brand. We power the intelligence behind the scenes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Footer / CTA */}
      <div className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center mb-8">
            Ready to transform your Pathology Lab?
          </h2>
          <div className="flex gap-6">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 font-semibold"
              onClick={() => navigate('/patient-analysis')}
            >
              Start Free Pilot
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
              onClick={() => navigate('/drug-discovery')}
            >
              View Research Tools
            </Button>
          </div>
          <p className="mt-8 text-gray-400 text-sm">
            PathologyAI Hub - Powered by Intelligence, Secured by Blockchain.
          </p>
        </div>
      </div>

    </div>
  );
};

export default Index;
