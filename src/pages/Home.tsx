import { motion } from 'framer-motion';
import {
  Microscope, Shield, Brain, Pill, ArrowUpRight,
  Check, Zap, Activity, ChevronRight, Globe, Lock, Cpu,
  BarChart3, Layers, Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Home = () => {
  const navigate = useNavigate();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 font-sans tracking-tight">

      {/* SECTION 1: LIGHT HERO */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-32" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="mb-10">
            <Badge variant="outline" className="rounded-full px-4 py-1 border-slate-200 text-slate-500 font-medium">
              Intelligence System v4.0
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[clamp(3.5rem,10vw,7rem)] font-semibold leading-[0.9] tracking-tighter mb-12"
          >
            The new standard <br />
            <span className="text-slate-400 font-light italic leading-relaxed">for clinical scale.</span>
          </motion.h1>

          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-6 text-xl text-slate-500 font-light leading-relaxed"
            >
              MedGenius orchestrates a fleet of specialized AI agents to automate
              diagnostics, reducing latency by 70% while maintaining
              absolute clinical precision.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="lg:col-span-6 flex gap-4 lg:justify-end"
            >
              <Button onClick={() => navigate('/dashboard')} className="h-16 px-10 bg-black text-white rounded-none hover:bg-slate-800 transition-all text-lg font-normal">
                Initialize System
              </Button>
              <Button variant="outline" className="h-16 px-10 rounded-none border-slate-900 text-lg hover:bg-slate-50">
                Documentation
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: DARK METRICS (High Contrast) */}
      <section className="bg-[#0a0a0a] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-l border-white/10 pl-8">
            {[
              { label: "Annual Throughput", val: "500M+" },
              { label: "Latency Reduction", val: "70%" },
              { label: "Accuracy Rate", val: "99.9%" },
              { label: "Market Volume", val: "₹15k Cr" }
            ].map((s, i) => (
              <motion.div
                key={s.label}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-2">{s.label}</p>
                <h3 className="text-4xl font-medium tracking-tighter italic">{s.val}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: THE AGENT GRID (Grey & White) */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-4xl font-medium tracking-tight">Agent Architecture</h2>
            <div className="h-[1px] flex-1 bg-slate-200 mx-8 hidden md:block" />
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Core Infrastructure</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200">
            {[
              { name: "Report Synthesis", icon: Microscope, desc: "Neural processing of raw clinical data into structured insights.", tag: "4h Turnaround" },
              { name: "Quality Audit", icon: Shield, desc: "Real-time verification against global pathology standards.", tag: "0.1% Margin" },
              { name: "Predictive ML", icon: Brain, desc: "Early detection of chronic markers 6-12 months pre-symptoms.", tag: "Advanced" },
              { name: "Safety Layer", icon: Pill, desc: "Interaction auditing via live FDA database integration.", tag: "Real-time" }
            ].map((item) => (
              <div key={item.name} className="bg-white p-12 hover:bg-slate-50 transition-all group">
                <item.icon className="h-8 w-8 text-slate-900 mb-12 stroke-[1.25]" />
                <h4 className="text-lg font-semibold mb-4">{item.name}</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light min-h-[60px]">{item.desc}</p>
                <Badge className="bg-slate-100 text-slate-900 rounded-none border-none px-3 font-bold text-[10px]">{item.tag}</Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: DARK FEATURE FOCUS (Obsidian) */}
      <section className="py-32 px-6 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <h2 className="text-5xl font-medium tracking-tighter leading-tight">
                Designed for <br />Enterprise Reliability.
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Immutable Security", icon: Lock, desc: "Blockchain-verified health records for tamper-proof auditing." },
                  { title: "Universal Integration", icon: Cpu, desc: "Direct LIS/HIS synchronization via encrypted API tunnels." },
                  { title: "Global Compliance", icon: Globe, desc: "Native HIPAA, GDPR, and clinical-standard adherence." }
                ].map((f) => (
                  <div key={f.title} className="flex gap-6 items-start border-l border-white/10 pl-6 hover:border-blue-500 transition-colors">
                    <f.icon className="h-6 w-6 text-slate-500 mt-1" />
                    <div>
                      <h5 className="font-semibold text-lg mb-1">{f.title}</h5>
                      <p className="text-slate-400 text-sm font-light">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] bg-gradient-to-br from-slate-800 to-black rounded-sm border border-white/10 p-12 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="h-1 w-20 bg-blue-500" />
                  <p className="text-2xl font-light italic text-slate-300">"The system handled 1.2M queries in its first month with zero downtime."</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 border border-white/5 bg-white/5">
                    <div className="text-3xl font-bold mb-1 italic">3x</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">Speed</div>
                  </div>
                  <div className="p-6 border border-white/5 bg-white/5">
                    <div className="text-3xl font-bold mb-1 italic">&lt;1%</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500">Errors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL CALL (Minimalist White/Grey) */}
      <section className="py-40 px-6 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-semibold tracking-tighter mb-8 italic text-slate-400">Ready to evolve?</h2>
          <p className="text-slate-500 text-lg font-light mb-12">
            MedGenius is the operating system for the next generation of pathology labs.
            Deploy in 48 hours. Scale indefinitely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-16 px-12 bg-black text-white rounded-none text-base">
              Request Deployment
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-12 rounded-none border-slate-200 text-base">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 font-bold tracking-tighter text-lg uppercase italic">
            <Zap className="h-5 w-5 fill-black" />
            <span>MedGenius AI</span>
          </div>
          <div className="flex gap-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-black transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Security</a>
          </div>
          <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
            © 2026 MedGenius Systems.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;