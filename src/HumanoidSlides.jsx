import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Cpu, 
  Bot, 
  Factory, 
  TrendingUp, 
  Zap, 
  ShieldAlert, 
  Microchip, 
  Database,
  ArrowRight,
  Server,
  Network
} from 'lucide-react';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);
  
  const TOTAL_SLIDES = 15;
  const STAGE_WIDTH = 1280;
  const STAGE_HEIGHT = 720;

  // Fixed-Stage Transform Logic
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const scaleX = clientWidth / STAGE_WIDTH;
        const scaleY = clientHeight / STAGE_HEIGHT;
        setScale(Math.min(scaleX, scaleY));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, TOTAL_SLIDES - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  // Shared Components
  const Ribbon = () => (
    <div className="absolute bottom-0 left-0 w-full h-[40px] bg-slate-900 text-slate-300 flex items-center justify-center px-8 text-[14px] tracking-wide font-medium z-50">
      Adoption gate = cost-per-task under strict power + safety <ArrowRight className="inline mx-2 w-4 h-4 text-blue-400"/> 
      Processor platform + SW stack bends the curve <ArrowRight className="inline mx-2 w-4 h-4 text-blue-400"/> 
      Memory/sensor constraints shape architecture <ArrowRight className="inline mx-2 w-4 h-4 text-blue-400"/> 
      TAM depends on platform→ASIC transition timing.
    </div>
  );

  const SlideHeader = ({ title, subtitle, icon: Icon }) => (
    <div className="w-full h-[120px] bg-slate-900 text-white flex flex-col justify-center px-[60px] relative shadow-lg">
      <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-blue-600/30 to-transparent"></div>
      <div className="flex items-center gap-4 relative z-10">
        {Icon && <Icon className="w-10 h-10 text-blue-400" />}
        <div>
          <h1 className="text-[36px] font-bold leading-tight">{title}</h1>
          <h2 className="text-[20px] text-blue-300 font-medium mt-1">{subtitle}</h2>
        </div>
      </div>
    </div>
  );

  // --- SLIDES ---

  const Slide0 = () => (
    <div className="w-full h-full bg-slate-900 flex flex-col items-center justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>
      <div className="z-10 text-center px-[100px]">
        <Bot className="w-24 h-24 text-blue-500 mx-auto mb-8 opacity-80" />
        <h1 className="text-[64px] font-extrabold text-white leading-tight mb-6">
          Humanoid Robotics & <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            The Semiconductor Inflection
          </span>
        </h1>
        <p className="text-[24px] text-slate-300 max-w-[900px] mx-auto leading-relaxed">
          From Use Cases to S-Curve Timing, Edge Compute Platforms, and SoC Constraints
        </p>
        <div className="mt-[80px] w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
      </div>
    </div>
  );

  const Slide1 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="HUMANOID TAM: Use Cases & The Adoption Ladder" 
        subtitle="TAM is large, but timing is gated by “cost-per-useful-task” and trust/safety"
        icon={Factory}
      />
      <div className="flex-1 px-[60px] py-[40px] flex gap-[40px]">
        <div className="w-1/2 flex flex-col gap-6">
          <h3 className="text-[24px] font-bold text-slate-800 border-b-2 border-blue-500 pb-2 inline-block">The Use-Case Ladder (Why Now)</h3>
          <ul className="space-y-6 text-[20px] text-slate-700">
            <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></span><p><strong>Controlled environments</strong> (factory/logistics) provide ROI visibility, repeatability, and safer validation loops.</p></li>
            <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></span><p><strong>Structural “market physics”:</strong> Humanoids require 3D + contact-rich autonomy (loco-manipulation + tactile interaction).</p></li>
            <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></span><p>This enlarges long-run task TAM but raises severe near-term reliability hurdles compared to single-purpose robotics.</p></li>
            <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></span><p><strong>Decision-support framing:</strong> Must separate execution/cycle risks (2026–2029) from structural scaling (2030+).</p></li>
          </ul>
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          <div className="bg-white rounded-xl shadow-lg p-[30px] border border-slate-200">
            <h4 className="text-[20px] font-bold text-slate-800 mb-6 text-center">Adoption Gates & Environment Complexity</h4>
            <div className="flex flex-col gap-4">
              {[
                { stage: 'Factory', gate: 'Yield & Integration', color: 'bg-blue-100 border-blue-400' },
                { stage: 'Logistics', gate: 'Reliability & Uptime', color: 'bg-indigo-100 border-indigo-400' },
                { stage: 'Retail', gate: 'Safety Validation', color: 'bg-purple-100 border-purple-400' },
                { stage: 'Home', gate: 'Cost & Regulation', color: 'bg-rose-100 border-rose-400' },
              ].map((step, i) => (
                <div key={i} className={`flex items-center p-4 border-l-4 rounded-r-lg ${step.color}`}>
                  <div className="w-[120px] font-bold text-[18px] text-slate-800">{step.stage}</div>
                  <ArrowRight className="w-5 h-5 text-slate-400 mx-4" />
                  <div className="flex-1 font-medium text-[18px] text-slate-600">Gated by: <span className="text-slate-900">{step.gate}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const Slide2 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="HUMANOID TAM: S-Curve Timing & Market Physics" 
        subtitle="Adoption inflects when reliability + cost-down clear thresholds"
        icon={TrendingUp}
      />
      <div className="flex-1 px-[60px] py-[30px] flex flex-col gap-[30px]">
        <div className="flex justify-between items-start gap-[40px]">
          <div className="w-[40%] space-y-5 text-[20px] text-slate-700">
            <p><strong>Adoption gates (near term):</strong> Pilot-to-ramp risks dominate 2026–2029. Key bottlenecks include thermal envelopes, safety validation, integration complexity, and yield maturity.</p>
            <p><strong>Secular slope (long term):</strong> Robot Almanac frames a world of <strong>~1.4B robots sold in 2050</strong> and <strong>~$25T robot hardware revenues</strong>—implying steep upside if early gates fall.</p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 italic">If adoption depends on bending cost-per-task, which part of the BOM is the highest-leverage knob?</p>
            </div>
          </div>
          <div className="w-[60%] bg-white rounded-xl shadow-lg p-[30px] border border-slate-200 h-[400px] relative">
            <h4 className="text-[18px] font-bold text-center mb-2">Projected S-Curve Timeline (2025 - 2050+)</h4>
            <div className="absolute top-[80px] left-[60px] right-[40px] bottom-[40px]">
              <svg width="100%" height="100%" viewBox="0 0 800 300" preserveAspectRatio="none">
                {/* Background Shading */}
                <rect x="0" y="0" width="160" height="300" fill="#f1f5f9" />
                <rect x="160" y="0" width="240" height="300" fill="#e2e8f0" />
                <rect x="400" y="0" width="200" height="300" fill="#cbd5e1" opacity="0.5" />
                
                {/* Grid Lines */}
                <line x1="0" y1="300" x2="800" y2="300" stroke="#94a3b8" strokeWidth="2" />
                <line x1="0" y1="0" x2="0" y2="300" stroke="#94a3b8" strokeWidth="2" />
                
                {/* S-Curve */}
                <path d="M 0 290 C 250 290, 400 250, 500 100 C 600 -20, 750 20, 800 20" fill="none" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" />
                
                {/* Labels */}
                <text x="80" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569">Pilot</text>
                <text x="80" y="40" textAnchor="middle" fontSize="12" fill="#64748b">(2025-27)</text>
                
                <text x="280" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569">Early Deploy</text>
                <text x="280" y="40" textAnchor="middle" fontSize="12" fill="#64748b">(2027-30)</text>

                <text x="500" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e40af">Inflection</text>
                <text x="500" y="40" textAnchor="middle" fontSize="12" fill="#1e40af">(2030-35)</text>

                <text x="700" y="20" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569">Scale</text>
                <text x="700" y="40" textAnchor="middle" fontSize="12" fill="#64748b">(2035+)</text>

                {/* Callout */}
                <circle cx="200" cy="275" r="6" fill="#ef4444" />
                <text x="200" y="255" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#ef4444">Pilot-to-Ramp Risk</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const Slide3 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="HUMANOIDS = NEXT BIG SEMI DEMAND WAVE" 
        subtitle="“Edge compute as a platform” turns robots into distributed datacenters"
        icon={Cpu}
      />
      <div className="flex-1 px-[60px] py-[50px] flex flex-col justify-center items-center">
        <div className="max-w-[1000px] text-center mb-[40px]">
          <h3 className="text-[32px] font-bold text-slate-800 mb-6">Compute Becomes a First-Class BOM Line</h3>
          <p className="text-[22px] text-slate-600 leading-relaxed">
            Semiconductors don’t scale as one monolithic market—compute becomes the <strong>dominant long-run value pool</strong>, with memory and sensors acting as the second-order constraints.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-[40px] w-full max-w-[1000px]">
          <div className="bg-white p-[30px] rounded-xl shadow-md border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="text-[20px] font-bold text-slate-800 mb-3">Structural Shift</h4>
            <p className="text-[18px] text-slate-600">Edge compute becomes a primary BOM line as autonomy shifts from rule-based to multimodal, VLA (Vision-Language-Action), and world-model inference.</p>
          </div>
          <div className="bg-white p-[30px] rounded-xl shadow-md border border-slate-200">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Microchip className="w-6 h-6 text-indigo-600" />
            </div>
            <h4 className="text-[20px] font-bold text-slate-800 mb-3">The Foundry “So What”</h4>
            <p className="text-[18px] text-slate-600">Winning humanoid compute is a <strong>platform bet</strong> (node + packaging + SW ecosystem alignment), not merely a spot wafer sale. It creates the foundry’s “high-value wafer slope.”</p>
          </div>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const Slide4 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="Edge Compute: Humanoids vs Autonomous Vehicles" 
        subtitle="By 2050, the humanoid compute pool structurally eclipses the AV compute pool"
        icon={Database}
      />
      <div className="flex-1 px-[60px] py-[30px] flex gap-[40px]">
        <div className="w-[45%] flex flex-col justify-center space-y-6">
          <h3 className="text-[24px] font-bold text-slate-800">Robot Almanac 2050 Projections</h3>
          <ul className="space-y-6 text-[20px] text-slate-700">
            <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></span><p><strong>AI Edge Compute Pool:</strong> Humanoids reach ~$789.7B vs Autonomous Vehicles at ~$261.6B.</p></li>
            <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-slate-500 mt-2 shrink-0"></span><p><strong>Analog + MCU Pool:</strong> Humanoids are ~$53.5B vs AV at ~$155.5B.</p></li>
            <li className="flex items-start gap-3"><span className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></span><p><strong>Implication:</strong> Compute intensity rises with autonomy level (not just unit volume). Compute pool {">>"} analog pool for humanoids; the opposite skew holds for AV.</p></li>
          </ul>
        </div>
        <div className="w-[55%] bg-white rounded-xl shadow-lg p-[40px] border border-slate-200 flex flex-col justify-between">
          <h4 className="text-[22px] font-bold text-center text-slate-800 mb-6">2050 TAM Projections ($ Billions)</h4>
          
          <div className="flex h-[250px] items-end justify-center gap-[60px] border-b-2 border-slate-300 pb-4 relative">
            {/* AI Edge Compute Cluster */}
            <div className="flex items-end gap-4 h-full relative group">
              <div className="absolute -top-[40px] w-full text-center font-bold text-[18px] text-slate-600">AI Edge Compute</div>
              <div className="flex flex-col items-center gap-2">
                <span className="font-bold text-blue-700">$790B</span>
                <div className="w-[80px] h-[100%] bg-blue-600 rounded-t-md shadow-md"></div>
                <span className="font-semibold text-[16px]">Humanoid</span>
              </div>
              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="font-bold text-slate-600">$262B</span>
                <div className="w-[80px] h-[33%] bg-slate-400 rounded-t-md shadow-md"></div>
                <span className="font-semibold text-[16px]">AV</span>
              </div>
            </div>

            {/* Analog + MCU Cluster */}
            <div className="flex items-end gap-4 h-full relative">
              <div className="absolute -top-[40px] w-full text-center font-bold text-[18px] text-slate-600">Analog + MCU</div>
              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="font-bold text-blue-700">$54B</span>
                <div className="w-[80px] h-[7%] bg-blue-300 rounded-t-md shadow-md"></div>
                <span className="font-semibold text-[16px]">Humanoid</span>
              </div>
              <div className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="font-bold text-slate-600">$156B</span>
                <div className="w-[80px] h-[20%] bg-slate-500 rounded-t-md shadow-md"></div>
                <span className="font-semibold text-[16px]">AV</span>
              </div>
            </div>
          </div>
          <p className="text-center text-[16px] text-slate-500 mt-4 italic font-medium">Data constraint framing: If compute is the lever, what makes a humanoid processor fundamentally different from an AV/ADAS SoC?</p>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const Slide5 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="REQUIREMENTS: Why Humanoid SoC ≠ AV SoC" 
        subtitle="Contact-rich embodiment forces determinism + PPW under tight thermals"
        icon={ShieldAlert}
      />
      <div className="flex-1 px-[60px] py-[40px] flex flex-col justify-center">
        <h3 className="text-[26px] font-bold text-slate-800 mb-8 text-center bg-blue-100 py-3 rounded-lg border border-blue-200">
          Physics Break Simple Reuse
        </h3>
        <div className="grid grid-cols-2 gap-[30px]">
          <div className="bg-white p-[24px] rounded-lg shadow border border-slate-200 border-l-4 border-l-blue-500">
            <h4 className="text-[20px] font-bold text-slate-800 mb-2">Workload Delta</h4>
            <p className="text-[18px] text-slate-600"><strong>AV:</strong> Perception/fusion/planning in semi-structured ODDs.<br/><strong>Humanoids:</strong> Loco-manipulation with tight perception↔control coupling in unstructured 3D.</p>
          </div>
          <div className="bg-white p-[24px] rounded-lg shadow border border-slate-200 border-l-4 border-l-indigo-500">
            <h4 className="text-[20px] font-bold text-slate-800 mb-2">Control-Loop Delta</h4>
            <p className="text-[18px] text-slate-600"><strong>Humanoids:</strong> Require two-tier loop: ~24–30 Hz mid-level + 500–1000+ Hz low-level torque/balance. Missed deadlines = falling over.</p>
          </div>
          <div className="bg-white p-[24px] rounded-lg shadow border border-slate-200 border-l-4 border-l-orange-500">
            <h4 className="text-[20px] font-bold text-slate-800 mb-2">Power / Thermal Delta</h4>
            <p className="text-[18px] text-slate-600"><strong>AV:</strong> ~250–500W+ is feasible given vehicle cooling.<br/><strong>Humanoids:</strong> Strict ~20–100W envelope limits. Performance-Per-Watt (PPW) dominates design.</p>
          </div>
          <div className="bg-white p-[24px] rounded-lg shadow border border-slate-200 border-l-4 border-l-emerald-500">
            <h4 className="text-[20px] font-bold text-slate-800 mb-2">Safety Delta</h4>
            <p className="text-[18px] text-slate-600"><strong>AV:</strong> Can afford heavy mass redundancy.<br/><strong>Humanoids:</strong> Must achieve safety with tighter mass/power, relying heavily on determinism and graceful degradation.</p>
          </div>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const Slide6 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="Comparison: Autonomous Driving vs Humanoid SoC" 
        subtitle="These constraints define the limits of leveraging automotive silicon"
        icon={Server}
      />
      <div className="flex-1 px-[60px] py-[30px] flex flex-col">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden w-full h-full flex flex-col">
          {/* Table Header */}
          <div className="grid grid-cols-12 bg-slate-800 text-white font-bold text-[18px] py-4 px-6">
            <div className="col-span-3">Design Vector</div>
            <div className="col-span-4 border-l border-slate-600 pl-4">AV (L4/L5 Target)</div>
            <div className="col-span-5 border-l border-slate-600 pl-4 text-blue-300">Humanoid (Contact-Rich)</div>
          </div>
          {/* Table Body */}
          <div className="flex-1 flex flex-col">
            {[
              { vec: 'Primary Workload', av: 'Macro-perception, routing, planning in 2D/2.5D semi-structured space', hum: 'Loco-manipulation, high-DoF coordination in unstructured 3D space' },
              { vec: 'Control Loops', av: '10-30 Hz (relatively slow dynamics)', hum: 'Two-tier: 24-30Hz mid-level + 500-1000Hz+ low-level torque control' },
              { vec: 'Power / Thermal', av: '250W - 500W+ (liquid cooling feasible)', hum: '20W - 100W strict envelope (passive/light active, weight constrained)' },
              { vec: 'Compute Mix', av: 'Heavy GPU/NPU for vision fusion + CPU for planning', hum: 'Heterogeneous: CPU orchestration + NPU arrays + extreme ISP/DSP offloads' },
              { vec: 'Safety Regime', av: 'Hardware redundancy, fail-operational', hum: 'Determinism, graceful degradation, mass/power constrained safety' }
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-12 px-6 py-[18px] border-b border-slate-200 text-[16px] ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'} flex-1 items-center`}>
                <div className="col-span-3 font-bold text-slate-800 pr-4">{row.vec}</div>
                <div className="col-span-4 border-l border-slate-300 pl-4 text-slate-600">{row.av}</div>
                <div className="col-span-5 border-l border-slate-300 pl-4 text-blue-800 font-medium">{row.hum}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const Slide7 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="COMPETITIVE STRATEGY: Platformization vs Vertical Integration" 
        subtitle="Near-term share = ecosystem/tooling; long-term share = ASIC economics + data"
        icon={Network}
      />
      <div className="flex-1 px-[60px] py-[40px] flex flex-col gap-[30px]">
        <h3 className="text-[22px] text-slate-700 font-medium text-center">The market bifurcates into two distinct approaches with different timing advantages:</h3>
        
        <div className="grid grid-cols-2 gap-[40px] h-full">
          <div className="bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl p-[30px] text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white opacity-5 rounded-bl-full"></div>
            <h4 className="text-[28px] font-bold mb-6 flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-300" /> Platformization Moat
            </h4>
            <ul className="space-y-6 text-[18px] leading-relaxed">
              <li><strong>Ecosystem lock-in:</strong> Full-stack robotics platforms (tooling, runtime, simulation, deployment) matter more than raw TOPS.</li>
              <li><strong>Winner-take-most dynamics:</strong> Developer familiarity and compiler integrations create high switching costs.</li>
              <li><strong>Timing Advantage (2026-2029):</strong> "Ship-now" hardware captures early design-in windows while vertical ramps are still maturing.</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-600 rounded-xl p-[30px] text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-white opacity-5 rounded-bl-full"></div>
            <h4 className="text-[28px] font-bold mb-6 flex items-center gap-3">
              <Factory className="w-8 h-8 text-slate-300" /> Vertical Integration Moat
            </h4>
            <ul className="space-y-6 text-[18px] leading-relaxed">
              <li><strong>Amortized NRE:</strong> Scale across fleets (vehicles → robots) justifies custom silicon costs.</li>
              <li><strong>Proprietary Data Loops:</strong> Own the entire data flywheel from edge capture to simulation validation.</li>
              <li><strong>Long-Term Economics:</strong> Drive aggressive cost/performance curves, structurally increasing ASIC share over time.</li>
            </ul>
          </div>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const Slide8 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="The Auto→Humanoid Migration & Vendor Landscape" 
        subtitle="Auto SoC extenders must cross the tooling gap to compete with pure platforms"
        icon={Cpu}
      />
      <div className="flex-1 px-[60px] py-[30px] flex gap-[40px]">
        <div className="w-[45%] flex flex-col justify-center">
          <div className="bg-white rounded-xl shadow p-[30px] border border-slate-200">
            <h3 className="text-[22px] font-bold text-slate-800 mb-6">Auto→Humanoid Migration Ladder</h3>
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-[20px] top-[20px] bottom-[20px] w-1 bg-blue-200"></div>
              {[
                'Reuse automotive perception + safety islands',
                'Add robotics I/O + sensor synchronization',
                'Rebalance compute mix for PPW + determinism',
                'Migrate from GPU/module to SoC/ASIC (as scale justifies NRE)'
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[18px] border-4 border-white shadow">
                    {i+1}
                  </div>
                  <div className="flex-1 bg-slate-50 p-3 rounded border border-slate-200 text-[16px] font-medium text-slate-700">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-[55%] flex flex-col justify-center">
          <div className="w-full h-[400px] relative border-l-2 border-b-2 border-slate-400 bg-white p-4">
            {/* Axis Labels */}
            <div className="absolute -left-[40px] top-1/2 -translate-y-1/2 -rotate-90 text-[14px] font-bold text-slate-500 tracking-widest whitespace-nowrap">SILICON CUSTOMIZATION</div>
            <div className="absolute -bottom-[30px] left-1/2 -translate-x-1/2 text-[14px] font-bold text-slate-500 tracking-widest">ECOSYSTEM & TOOLING CONTROL</div>
            
            {/* Grid Lines */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-200 dashed"></div>
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-slate-200 dashed"></div>
            
            {/* Quadrants / Data Points */}
            <div className="absolute top-[20%] right-[20%] w-[120px] h-[80px] bg-blue-100 border-2 border-blue-500 rounded-lg flex flex-col items-center justify-center shadow-md">
              <span className="font-bold text-blue-900">Platform</span>
              <span className="text-[14px] text-blue-700 font-medium">NVDA</span>
            </div>

            <div className="absolute top-[20%] left-[20%] w-[120px] h-[80px] bg-slate-100 border-2 border-slate-500 rounded-lg flex flex-col items-center justify-center shadow-md">
              <span className="font-bold text-slate-900">Vertical</span>
              <span className="text-[14px] text-slate-700 font-medium">TSLA</span>
            </div>

            <div className="absolute bottom-[20%] left-[30%] w-[150px] h-[80px] bg-orange-100 border-2 border-orange-500 rounded-lg flex flex-col items-center justify-center shadow-md">
              <span className="font-bold text-orange-900 text-center leading-tight">Auto Extenders</span>
              <span className="text-[14px] text-orange-700 font-medium">QCOM, MBLY</span>
            </div>

            <div className="absolute bottom-[30%] right-[30%] w-[140px] h-[80px] bg-purple-100 border-2 border-purple-500 rounded-lg flex flex-col items-center justify-center shadow-md">
              <span className="font-bold text-purple-900 text-center leading-tight">Gen Compute</span>
              <span className="text-[14px] text-purple-700 font-medium">AMD, INTC</span>
            </div>
            
            <div className="absolute bottom-[10%] left-[10%] w-[160px] h-[40px] bg-red-50 border border-red-200 rounded text-[12px] flex items-center justify-center text-red-800 text-center px-2">
              China Stack (Horizon, Huawei, Biren)
            </div>
          </div>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const Slide9 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="SW + DATA BOTTLENECK: Evolution to World Models" 
        subtitle="Embodied intelligence is closed-loop: perception + action + world modeling"
        icon={Database}
      />
      <div className="flex-1 px-[60px] py-[30px] flex flex-col gap-[30px] justify-center">
        <div className="w-full bg-white rounded-xl shadow-lg border border-slate-200 p-[30px]">
          <h3 className="text-[24px] font-bold text-slate-800 mb-8 text-center">The Model Evolution Pipeline</h3>
          
          <div className="flex items-center justify-between px-[40px] relative">
            <div className="absolute top-1/2 left-[80px] right-[80px] h-2 bg-blue-100 -translate-y-1/2 z-0"></div>
            
            {[
              { title: 'LLM', desc: 'Text-based logic & reasoning', color: 'bg-slate-200 text-slate-700' },
              { title: 'VLM', desc: 'Vision + Language grounding', color: 'bg-indigo-200 text-indigo-800' },
              { title: 'VLA', desc: 'Vision, Language + Action output', color: 'bg-blue-300 text-blue-900' },
              { title: 'World Models', desc: 'Physics prediction & simulation', color: 'bg-blue-600 text-white shadow-xl scale-110' }
            ].map((node, i) => (
              <div key={i} className={`z-10 w-[200px] h-[120px] rounded-xl flex flex-col items-center justify-center p-4 text-center border-2 border-white ${node.color}`}>
                <span className="font-bold text-[24px] mb-1">{node.title}</span>
                <span className="text-[14px] font-medium leading-snug">{node.desc}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center text-[18px] text-slate-600 font-medium">
            <span className="flex items-center gap-2"><ArrowRight className="w-5 h-5 text-red-500"/> Increases multimodal inputs, longer context, and closed-loop action latency demands.</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[30px]">
          <div className="bg-white p-[24px] rounded-lg shadow border-l-4 border-slate-800">
            <h4 className="text-[18px] font-bold text-slate-800 mb-2">On-Device Imperative</h4>
            <p className="text-[16px] text-slate-600">Control-critical loops cannot tolerate cloud latency/availability for safety and stability → forces massive compute to the edge.</p>
          </div>
          <div className="bg-white p-[24px] rounded-lg shadow border-l-4 border-slate-800">
            <h4 className="text-[18px] font-bold text-slate-800 mb-2">Data Scarcity</h4>
            <p className="text-[16px] text-slate-600">Manipulation data is expensive/sparse vs internet text. Simulation toolchains + real-world fleet capture become gating assets.</p>
          </div>
          <div className="bg-white p-[24px] rounded-lg shadow border-l-4 border-slate-800">
            <h4 className="text-[18px] font-bold text-slate-800 mb-2">The "Ecosystem Tax"</h4>
            <p className="text-[16px] text-slate-600">Compilers/runtime, sim toolchains, and deployment frameworks create sticky platform lock-in, hard to displace.</p>
          </div>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const Slide10 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="Hardware Implications of Model Evolution" 
        subtitle="Memory bandwidth-per-watt and sensor I/O shape SoC + packaging constraints"
        icon={Microchip}
      />
      <div className="flex-1 px-[60px] py-[30px] flex flex-col">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden w-full h-full flex flex-col">
          <div className="grid grid-cols-5 bg-slate-800 text-white font-bold text-[18px] py-4 px-6 text-center">
            <div className="text-left border-r border-slate-600 pr-4">HW Requirement</div>
            <div className="border-r border-slate-600 px-2">LLM</div>
            <div className="border-r border-slate-600 px-2">VLM</div>
            <div className="border-r border-slate-600 px-2">VLA</div>
            <div className="px-2 text-blue-300">World Model</div>
          </div>
          
          <div className="flex-1 flex flex-col text-[16px]">
            {[
              { req: 'Latency Tolerance', l: 'High (Seconds)', v1: 'Medium (500ms)', v2: 'Low (<50ms)', w: 'Real-time strict' },
              { req: 'Edge Necessity', l: 'Cloud possible', v1: 'Hybrid', v2: 'Edge mandatory', w: 'Edge mandatory' },
              { req: 'Memory BW Pressure', l: 'Moderate', v1: 'High (Images)', v2: 'Severe (Video/KV)', w: 'Extreme (State Gen)' },
              { req: 'Compute Kernel Mix', l: 'Matrix Multiply', v1: 'MM + Vision CNNs', v2: 'MM + Control + CNN', w: 'Heterogeneous + Sim' },
              { req: 'Determinism / Safety', l: 'N/A', v1: 'Low', v2: 'Critical', w: 'Critical' },
              { req: 'Data Requirement', l: 'Internet Text', v1: 'Image Datasets', v2: 'Teleoperation Data', w: 'High-Fidelity Sim + Real' }
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-5 px-6 py-[14px] border-b border-slate-200 items-center text-center ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                <div className="font-bold text-slate-800 text-left border-r border-slate-200 pr-4">{row.req}</div>
                <div className="text-slate-600 border-r border-slate-200 px-2">{row.l}</div>
                <div className="text-slate-600 border-r border-slate-200 px-2">{row.l}</div>
                <div className="text-slate-700 font-medium border-r border-slate-200 px-2">{row.v2}</div>
                <div className="text-blue-800 font-bold px-2">{row.w}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const Slide11 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="MEMORY & SENSORS: The Second-Order Constraints" 
        subtitle="Compute is #1; memory BW and sensor I/O determine the “real” SoC floorplan"
        icon={Cpu}
      />
      <div className="flex-1 px-[60px] py-[40px] flex gap-[40px]">
        <div className="w-1/2 flex flex-col justify-center space-y-8">
          <div>
            <h3 className="text-[24px] font-bold text-slate-800 mb-3 border-b-2 border-blue-500 inline-block pb-1">Memory Trajectory</h3>
            <p className="text-[18px] text-slate-700 mt-2 leading-relaxed">
              Near-term bias heavily toward LPDDR/GDDR. Long-term possibility of low-power HBM variants <strong>if bandwidth needs outpace LPDDR limits</strong>, though cost/thermals remain gating factors.
            </p>
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-slate-800 mb-3 border-b-2 border-indigo-500 inline-block pb-1">Why Memory Inflates</h3>
            <p className="text-[18px] text-slate-700 mt-2 leading-relaxed">
              VLM/VLA inference increases KV cache size, necessitates high-res video buffers, and stores massive multimodal intermediate states. <strong>Bandwidth-per-Watt (BW/W)</strong> becomes decisive.
            </p>
          </div>
          <div>
            <h3 className="text-[24px] font-bold text-slate-800 mb-3 border-b-2 border-emerald-500 inline-block pb-1">Sensor Stack Pressure</h3>
            <p className="text-[18px] text-slate-700 mt-2 leading-relaxed">
              Multi-camera arrays + potential LiDAR + high-Hz IMU + tactile/force sensing + audio. The synchronization and bandwidth requirements are brutal on I/O.
            </p>
          </div>
        </div>
        
        <div className="w-1/2 flex flex-col justify-center">
           <div className="bg-white rounded-xl shadow border border-slate-200 p-[30px]">
             <h4 className="text-[20px] font-bold text-center text-slate-800 mb-8">Memory Roadmap Inflection</h4>
             <div className="relative h-[250px] flex items-center justify-between px-4">
                {/* Arrow line */}
                <div className="absolute top-1/2 left-[10%] right-[10%] h-[4px] bg-slate-300 -translate-y-1/2"></div>
                
                <div className="z-10 bg-slate-100 border-2 border-slate-400 w-[140px] h-[100px] rounded-lg flex flex-col items-center justify-center shadow-md">
                  <span className="font-bold text-[18px] text-slate-800">LPDDR5/6</span>
                  <span className="text-[14px] text-slate-500">Mainstream 2024-28</span>
                </div>

                <div className="z-10 bg-blue-100 border-2 border-blue-500 w-[180px] h-[120px] rounded-lg flex flex-col items-center justify-center shadow-lg relative -top-4">
                  <span className="font-bold text-[18px] text-blue-900 text-center">Mobile-HBM / Adv. Packaging</span>
                  <span className="text-[14px] text-blue-700">Late Decade Potential</span>
                </div>
                
                {/* Trigger annotation */}
                <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 bg-red-100 border border-red-300 px-4 py-2 rounded text-red-800 font-bold text-[14px] whitespace-nowrap">
                  TRIGGER: BW/W Threshold Crossed
                </div>
             </div>
           </div>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const Slide12 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="SoC Architecture & Packaging Consequences" 
        subtitle="Sensors and control loops fundamentally alter silicon floorplans"
        icon={Microchip}
      />
      <div className="flex-1 px-[60px] py-[40px] flex flex-col gap-[40px]">
        <div className="grid grid-cols-2 gap-[40px]">
          <div className="bg-white p-[25px] rounded-xl shadow-md border-l-4 border-blue-600">
            <h4 className="text-[20px] font-bold text-slate-800 mb-2">SoC Consequences</h4>
            <p className="text-[18px] text-slate-600">Drive toward more fixed-function offloads (ISP/DSP) to manage I/O power, higher on-chip SRAM/NoC pressure to minimize DRAM round-trips, under tight 20-100W thermal caps.</p>
          </div>
          <div className="bg-white p-[25px] rounded-xl shadow-md border-l-4 border-indigo-600">
            <h4 className="text-[20px] font-bold text-slate-800 mb-2">Packaging Consequences</h4>
            <p className="text-[18px] text-slate-600">Currently substrate/FC-BGA. Thermals, yield, and memory integration drive the "module vs monolithic" decision. Advanced packaging becomes a direct competitive moat.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-[30px] flex-1">
          <h4 className="text-[18px] font-bold text-center text-slate-800 mb-8">Architecture Forcing Function Dataflow</h4>
          <div className="flex items-center justify-between w-full h-[120px] px-8">
             {[
               { name: 'Sensors (I/O)', icon: Database, color: 'bg-slate-100 border-slate-400 text-slate-700' },
               { name: 'ISP / DSP', icon: Cpu, color: 'bg-blue-50 border-blue-400 text-blue-800' },
               { name: 'NPU / GPU', icon: Microchip, color: 'bg-indigo-50 border-indigo-400 text-indigo-800' },
               { name: 'Memory Sys', icon: Server, color: 'bg-purple-50 border-purple-400 text-purple-800' },
               { name: 'Control Loops', icon: Bot, color: 'bg-emerald-50 border-emerald-400 text-emerald-800' }
             ].map((block, i) => (
               <React.Fragment key={i}>
                 <div className={`w-[160px] h-[100px] border-2 rounded-xl flex flex-col items-center justify-center shadow-sm ${block.color}`}>
                   <block.icon className="w-8 h-8 mb-2 opacity-80" />
                   <span className="font-bold text-[16px] text-center px-2">{block.name}</span>
                 </div>
                 {i < 4 && <ArrowRight className="w-8 h-8 text-slate-400" />}
               </React.Fragment>
             ))}
          </div>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const Slide13 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="PROCESSOR TAM: Two-Method Approach" 
        subtitle="TAM is shaped by (units × autonomy depth) and by GPU→ASIC timing"
        icon={TrendingUp}
      />
      <div className="flex-1 px-[60px] py-[40px] flex gap-[40px] justify-center">
        
        <div className="w-1/2 bg-white rounded-xl shadow-lg border border-slate-200 p-[30px] flex flex-col">
          <h3 className="text-[22px] font-bold text-slate-800 text-center mb-6">Method A: Macro Compute Pool (2050)</h3>
          <p className="text-[16px] text-slate-600 mb-6 text-center">Robot Almanac AI Edge Compute pools provide a long-run upper bound for the semiconductor market.</p>
          
          <div className="flex-1 flex items-end justify-center gap-[40px] pb-8 relative border-b border-slate-300">
            <div className="flex flex-col items-center gap-2 h-full justify-end">
              <span className="font-bold text-blue-700 text-[24px]">$789.7B</span>
              <div className="w-[100px] h-[80%] bg-gradient-to-t from-blue-800 to-blue-500 rounded-t-md shadow"></div>
              <span className="font-bold text-[18px] text-slate-800">Humanoids</span>
            </div>
            <div className="flex flex-col items-center gap-2 h-full justify-end">
              <span className="font-bold text-slate-600 text-[24px]">$261.6B</span>
              <div className="w-[100px] h-[26%] bg-gradient-to-t from-slate-500 to-slate-400 rounded-t-md shadow"></div>
              <span className="font-bold text-[18px] text-slate-800">Autos / AV</span>
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-white rounded-xl shadow-lg border border-slate-200 p-[30px] flex flex-col">
          <h3 className="text-[22px] font-bold text-slate-800 text-center mb-6">Method B: Near-Term SoC ASP (Early 2030s)</h3>
          <p className="text-[16px] text-slate-600 mb-6 text-center">Project sources cite “several $B” processor TAM via millions of units combined with high ASP content.</p>
          
          <div className="flex-1 flex flex-col items-center justify-center gap-6">
            <div className="bg-slate-50 border-2 border-dashed border-slate-400 rounded-xl p-[20px] w-full text-center">
              <span className="block text-[20px] font-bold text-slate-500 mb-2">Annual Units</span>
              <span className="block text-[36px] font-extrabold text-slate-800">Millions</span>
            </div>
            <span className="text-[32px] font-bold text-slate-400">×</span>
            <div className="bg-blue-50 border-2 border-blue-400 rounded-xl p-[20px] w-full text-center shadow-inner">
              <span className="block text-[20px] font-bold text-blue-600 mb-2">SoC ASP</span>
              <span className="block text-[36px] font-extrabold text-blue-900">$400 – $500</span>
            </div>
          </div>
        </div>

      </div>
      <Ribbon />
    </div>
  );

  const Slide14 = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col relative">
      <SlideHeader 
        title="Transition Scenarios & Strategic Foundry Implications" 
        subtitle="GPU→ASIC transition speed is the most important disruption vector"
        icon={Factory}
      />
      <div className="flex-1 px-[60px] py-[30px] flex gap-[30px]">
        
        <div className="w-[45%] flex flex-col justify-between">
          <div className="bg-white rounded-xl shadow p-[25px] border border-slate-200">
            <h3 className="text-[20px] font-bold text-slate-800 mb-4 border-b pb-2">Key Growth Drivers</h3>
            <ul className="space-y-3 text-[16px] text-slate-700">
              <li>• VLA/world-model complexity (intensity)</li>
              <li>• On-device inference for latency/safety</li>
              <li>• PPW race under 20–100W envelope</li>
              <li>• GPU→ASIC transition speed</li>
            </ul>
          </div>
          
          <div className="bg-slate-800 rounded-xl shadow p-[25px] text-white">
            <h3 className="text-[20px] font-bold text-blue-300 mb-3">Foundry Alignment Strategy</h3>
            <p className="text-[16px] leading-relaxed">
              Vertical integrators treat foundry selection as multi-year strategic capacity, not standard procurement. This creates <span className="text-yellow-300 font-bold">"anchored wafer slope"</span> opportunities (e.g., TSMC, Samsung).
            </p>
          </div>
        </div>

        <div className="w-[55%] bg-white rounded-xl shadow-lg p-[30px] border border-slate-200 flex flex-col">
          <h4 className="text-[18px] font-bold text-center text-slate-800 mb-2">ASIC Penetration vs. Unit Volume S-Curve</h4>
          <div className="flex-1 relative">
            <svg width="100%" height="100%" viewBox="0 0 600 300" preserveAspectRatio="none">
               {/* Axes */}
               <line x1="40" y1="260" x2="580" y2="260" stroke="#94a3b8" strokeWidth="2" />
               <line x1="40" y1="20" x2="40" y2="260" stroke="#94a3b8" strokeWidth="2" />
               
               <text x="310" y="290" textAnchor="middle" fontSize="14" fill="#64748b" fontWeight="bold">Annual Units (Scale)</text>
               <text x="15" y="140" textAnchor="middle" fontSize="14" fill="#64748b" fontWeight="bold" transform="rotate(-90 15,140)">% ASIC Pen.</text>

               {/* Grid */}
               <line x1="40" y1="140" x2="580" y2="140" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="5,5" />
               <text x="35" y="145" textAnchor="end" fontSize="12" fill="#94a3b8">50%</text>
               <text x="35" y="25" textAnchor="end" fontSize="12" fill="#94a3b8">100%</text>

               {/* S-Curve Path */}
               <path d="M 40 250 C 200 250, 300 30, 580 30" fill="none" stroke="#2563eb" strokeWidth="5" />

               {/* Annotations */}
               <circle cx="150" cy="245" r="5" fill="#ef4444" />
               <text x="150" y="225" textAnchor="middle" fontSize="12" fill="#ef4444" fontWeight="bold">Model Stabilization</text>
               
               <circle cx="260" cy="120" r="5" fill="#f59e0b" />
               <text x="260" y="100" textAnchor="middle" fontSize="12" fill="#d97706" fontWeight="bold">NRE Justified</text>

               <circle cx="400" cy="45" r="5" fill="#10b981" />
               <text x="400" y="25" textAnchor="middle" fontSize="12" fill="#059669" fontWeight="bold">PPW Binding / BOM Pres.</text>
            </svg>
          </div>
          <div className="mt-4 text-[14px] text-slate-600 bg-slate-100 p-3 rounded text-center font-medium">
            Company Callouts: NVDA (Platform), TSLA (Vertical ASIC), QCOM/MBLY (Extenders), MU/SK (Memory)
          </div>
        </div>
      </div>
      <Ribbon />
    </div>
  );

  const slides = [Slide0, Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13, Slide14];
  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className="w-full h-screen bg-slate-950 flex items-center justify-center overflow-hidden relative font-sans">
      {/* Outer Scaling Container */}
      <div 
        ref={containerRef}
        className="w-full h-full relative"
      >
        {/* Fixed Stage */}
        <div 
          className="absolute top-1/2 left-1/2 bg-white shadow-2xl origin-center"
          style={{ 
            width: `${STAGE_WIDTH}px`, 
            height: `${STAGE_HEIGHT}px`,
            transform: `translate(-50%, -50%) scale(${scale})`
          }}
        >
          <CurrentSlideComponent />

          {/* Navigation Controls (Inside Stage for scaling) */}
          <div className="absolute bottom-4 right-8 flex items-center gap-4 z-50">
            <span className="text-slate-400 font-bold text-[14px] mr-2">
              {currentSlide + 1} / {TOTAL_SLIDES}
            </span>
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 rounded-full bg-slate-800 text-white disabled:opacity-30 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentSlide === TOTAL_SLIDES - 1}
              className="p-2 rounded-full bg-slate-800 text-white disabled:opacity-30 hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}