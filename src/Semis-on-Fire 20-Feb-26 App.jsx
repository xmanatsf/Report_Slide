import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Cpu, Activity, Network, Layers, Server, Radio, 
  Target, Database, ArrowRight, ArrowLeft 
} from 'lucide-react';

const COLORS = {
  bg: '#0B0C10',
  text: '#E0E2E4',
  cyan: '#66FCF1',
  amber: '#F5A623',
  gray: '#1F2833',
  lightGray: '#45A29E'
};

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef(null);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Handle scaling to fit any screen perfectly while maintaining 16:9
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        // Base resolution is 1280x720
        const scaleX = clientWidth / 1280;
        const scaleY = clientHeight / 720;
        setScale(Math.min(scaleX, scaleY));
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Terminal Grid Background
  const gridBackground = {
    backgroundImage: `linear-gradient(rgba(102, 252, 241, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 252, 241, 0.03) 1px, transparent 1px)`,
    backgroundSize: '30px 30px'
  };

  const slides = [
    // SLIDE 1: COVER
    (
      <div className="flex flex-col h-full relative p-16 overflow-hidden">
        <div className="absolute inset-0 z-0 flex">
          <div className="w-1/2 h-full flex items-end justify-end p-10 opacity-80 relative">
            <svg viewBox="0 0 100 100" className="absolute top-1/4 -right-1/4 w-full h-full" preserveAspectRatio="none">
              <path d="M0,50 L40,50 L60,10 L100,10" fill="none" stroke={COLORS.cyan} strokeWidth="2" className="drop-shadow-[0_0_8px_#66FCF1]" />
              <path d="M0,52 L40,52 L60,90 L100,90" fill="none" stroke={COLORS.amber} strokeWidth="2" className="drop-shadow-[0_0_8px_#F5A623]" />
              <circle cx="40" cy="51" r="2" fill={COLORS.text} />
              <circle cx="60" cy="10" r="2" fill={COLORS.cyan} />
              <circle cx="60" cy="90" r="2" fill={COLORS.amber} />
            </svg>
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div className="w-2/3">
            <div className="font-mono text-sm tracking-widest text-[#45A29E] uppercase mb-6">Institutional Analysis / Evercore ISI / Feb 2026</div>
            <h1 className="font-sans font-bold text-7xl leading-tight tracking-tight uppercase">
              The Semiconductor <br/>
              <span className="text-[#66FCF1]">Supercycle</span> is Structurally <br/>
              <span className="text-[#F5A623]">Bifurcated</span>
            </h1>
          </div>
          <div className="font-mono text-xl border-l-2 border-[#66FCF1] pl-6 mt-8 w-1/2">
            AI Infrastructure accelerates while Analog and Edge markets execute a conservative reset.
          </div>
        </div>
      </div>
    ),

    // SLIDE 2: EXECUTIVE MANDATE
    (
      <div className="flex flex-col h-full p-12 overflow-hidden">
        <h2 className="font-sans font-bold text-4xl text-[#66FCF1] uppercase mb-8 pb-4 border-b border-[#1F2833]">
          Strategic Environment Parameters: Q1 2026
        </h2>
        <div className="grid grid-cols-3 gap-8 h-full">
          <div className="border border-[#1F2833] bg-[#0B0C10]/50 p-8 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#66FCF1] opacity-50 shadow-[0_0_10px_#66FCF1]"></div>
            <Activity className="text-[#66FCF1] w-10 h-10 mb-6" />
            <h3 className="font-sans font-bold text-2xl uppercase mb-4">AI Compute Dominance</h3>
            <p className="font-mono text-base text-[#E0E2E4]/80 leading-relaxed flex-grow">
              Hyperscaler capital expenditure dictates supply chain momentum. Silicon diversity increases as foundation training and specialized inference requirements diverge.
            </p>
          </div>
          <div className="border border-[#1F2833] bg-[#0B0C10]/50 p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#E0E2E4] opacity-50"></div>
            <Cpu className="text-[#E0E2E4] w-10 h-10 mb-6" />
            <h3 className="font-sans font-bold text-2xl uppercase mb-4">Core Computing Shifts</h3>
            <p className="font-mono text-base text-[#E0E2E4]/80 leading-relaxed flex-grow">
              TCO advantages drive profound market share acquisition across server and client architectures. Incumbents face severe structural pressure in high-margin segments.
            </p>
          </div>
          <div className="border border-[#1F2833] bg-[#0B0C10]/50 p-8 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#F5A623] opacity-50 shadow-[0_0_10px_#F5A623]"></div>
            <Network className="text-[#F5A623] w-10 h-10 mb-6" />
            <h3 className="font-sans font-bold text-2xl uppercase mb-4">Analog / Edge Reset</h3>
            <p className="font-mono text-base text-[#E0E2E4]/80 leading-relaxed flex-grow">
              Automotive inventory digestion forces conservative target derisking. Simultaneously, aggressive M&A activity consolidates the intelligent edge for future deployment.
            </p>
          </div>
        </div>
      </div>
    ),

    // SLIDE 3: CAPEX VS FCF MACRO
    (
      <div className="flex flex-col h-full p-12 overflow-hidden">
        <h2 className="font-sans font-bold text-4xl text-[#E0E2E4] uppercase mb-8 leading-tight border-l-4 border-[#66FCF1] pl-6">
          Hyperscaler capital expenditure for AI infrastructure remains resilient despite free cash flow compression
        </h2>
        <div className="flex flex-row gap-12 mt-4 flex-grow min-h-0">
          <div className="w-5/12 font-mono text-lg space-y-8">
            <div className="flex items-start">
              <span className="text-[#66FCF1] mr-4 mt-1">❯</span>
              <p>Market concerns regarding a CapEx pullback fundamentally overlook structural investment mandates.</p>
            </div>
            <div className="flex items-start">
              <span className="text-[#66FCF1] mr-4 mt-1">❯</span>
              <p>Strategic investments prioritize long-term computational dominance over short-term FCF optics.</p>
            </div>
            <div className="flex items-start">
              <span className="text-[#66FCF1] mr-4 mt-1">❯</span>
              <p>Compute density requirements dictate continuous hardware refresh cycles regardless of immediate revenue realization.</p>
            </div>
            <div className="mt-8 p-6 border border-[#1F2833] bg-[#1F2833]/20">
              <span className="block text-sm text-[#45A29E] uppercase mb-2">Conclusion Matrix</span>
              <span className="font-bold text-[#E0E2E4]">Hardware deployment is decoupled from quarter-to-quarter cash generation constraints.</span>
            </div>
          </div>
          <div className="w-7/12 border border-[#1F2833] bg-[#0B0C10] p-6 relative flex flex-col h-full">
            <div className="font-mono text-sm text-[#45A29E] mb-4 uppercase flex justify-between">
              <span>Projected FCF vs AI CapEx Committments (Normalized Index)</span>
              <span className="flex items-center gap-2"><div className="w-4 h-4 bg-[#1F2833]"></div> FCF <div className="w-4 h-1.5 bg-[#66FCF1] shadow-[0_0_5px_#66FCF1]"></div> CapEx</span>
            </div>
            <div className="relative flex-grow w-full flex items-end justify-between px-6 pb-6 min-h-0">
              {/* Background FCF Bars */}
              {[95, 88, 75, 70, 68, 65, 66, 62].map((val, i) => (
                <div key={`fcf-${i}`} className="w-12 bg-[#1F2833] transition-all" style={{ height: `${val}%` }}></div>
              ))}
              {/* Overlay CapEx Line */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <polyline 
                  points="5%,80% 18%,75% 31%,60% 43%,50% 56%,35% 69%,20% 81%,10% 95%,5%" 
                  fill="none" 
                  stroke={COLORS.cyan} 
                  strokeWidth="4" 
                  className="drop-shadow-[0_0_10px_#66FCF1]" 
                />
                {[80, 75, 60, 50, 35, 20, 10, 5].map((val, i) => (
                  <circle key={`dot-${i}`} cx={`${5 + (i * 12.8)}%`} cy={`${val}%`} r="6" fill={COLORS.bg} stroke={COLORS.cyan} strokeWidth="3" />
                ))}
              </svg>
            </div>
            <div className="flex justify-between font-mono text-xs text-[#E0E2E4]/50 border-t border-[#1F2833] pt-4 px-4">
              <span>Q1'24</span><span>Q2'24</span><span>Q3'24</span><span>Q4'24</span><span>Q1'25</span><span>Q2'25</span><span>Q3'25</span><span>Q4'25</span>
            </div>
          </div>
        </div>
      </div>
    ),

    // SLIDE 4: CHANNEL CHECKS OVERVIEW
    (
      <div className="flex flex-col h-full p-12 overflow-hidden">
        <h2 className="font-sans font-bold text-4xl text-[#E0E2E4] uppercase mb-12 text-center tracking-tight">
          4Q25 Channel Checks: <span className="text-[#66FCF1]">GPU</span> vs <span className="text-[#66FCF1]">Custom ASICs</span>
        </h2>
        <div className="flex flex-col flex-grow items-center justify-center">
          <div className="w-full max-w-5xl border border-[#1F2833] relative p-12">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0B0C10] px-6 font-mono text-[#45A29E] text-base border border-[#1F2833]">
              Workload Routing Schematic
            </div>
            
            <div className="flex flex-row justify-between items-center gap-12">
              {/* GPU Block */}
              <div className="flex-1 border border-[#E0E2E4]/20 bg-[#1F2833]/30 p-8 flex flex-col items-center text-center h-64">
                <Database className="w-16 h-16 text-[#E0E2E4] mb-6 mt-2" />
                <h3 className="font-sans font-bold text-2xl uppercase mb-3">Merchant GPUs</h3>
                <p className="font-mono text-sm text-[#E0E2E4]/70 mb-4 px-4">General-Purpose Foundation Training</p>
                <div className="w-full h-1.5 bg-[#E0E2E4]/30 mt-auto"></div>
              </div>

              {/* Data Flow */}
              <div className="flex flex-col items-center justify-center px-4 w-48">
                <div className="flex items-center gap-2 mb-4 font-mono text-xs text-[#66FCF1]">
                  <span>AI INFRASTRUCTURE</span>
                </div>
                <svg viewBox="0 0 100 40" className="w-full h-16 overflow-visible">
                  <path d="M0,20 L40,20 L60,5 L100,5" fill="none" stroke={COLORS.text} strokeWidth="1" strokeDasharray="4" />
                  <path d="M0,20 L40,20 L60,35 L100,35" fill="none" stroke={COLORS.cyan} strokeWidth="3" className="drop-shadow-[0_0_8px_#66FCF1]" />
                  <circle cx="50" cy="20" r="4" fill={COLORS.bg} stroke={COLORS.text} strokeWidth="2" />
                </svg>
              </div>

              {/* ASIC Block */}
              <div className="flex-1 border border-[#66FCF1]/30 bg-[#66FCF1]/10 p-8 flex flex-col items-center text-center relative overflow-hidden h-64">
                <div className="absolute top-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(102,252,241,0.05)_50%,transparent_75%)] bg-[length:15px_15px]"></div>
                <Cpu className="w-16 h-16 text-[#66FCF1] mb-6 mt-2 relative z-10" />
                <h3 className="font-sans font-bold text-2xl uppercase mb-3 text-[#66FCF1] relative z-10">Custom ASICs</h3>
                <p className="font-mono text-sm text-[#E0E2E4]/70 mb-4 px-4 relative z-10">Specialized Inference & Internal Workloads</p>
                <div className="w-full h-1.5 bg-[#66FCF1] shadow-[0_0_10px_#66FCF1] mt-auto relative z-10"></div>
              </div>
            </div>
            
            <div className="mt-12 font-mono text-base text-center border-t border-[#1F2833] pt-6 text-[#E0E2E4]/80">
              Silicon diversity is fundamentally increasing. Procurement strategies are executing a dual-track mandate rather than consolidating onto a single architecture.
            </div>
          </div>
        </div>
      </div>
    ),

    // SLIDE 5: GPU DOMINANCE
    (
      <div className="flex flex-col h-full p-12 overflow-hidden">
        <div className="flex items-center gap-6 mb-12 pb-6 border-b border-[#1F2833]">
          <Database className="w-10 h-10 text-[#E0E2E4]" />
          <h2 className="font-sans font-bold text-4xl text-[#E0E2E4] uppercase">
            GPUs remain the absolute standard for massive foundation model training
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-16 flex-grow items-center">
          <div className="space-y-8 font-mono text-lg">
            <p className="leading-relaxed">
              Despite the rise of custom silicon, 4Q25 Channel Checks confirm that for untargeted, parameter-heavy foundation models, merchant GPUs provide unassailable software ecosystem advantages.
            </p>
            <div className="p-6 border-l-4 border-[#E0E2E4] bg-[#1F2833]/20">
              CUDA and established libraries create a high friction barrier for switching core training clusters.
            </div>
            <ul className="space-y-4 pl-4">
              <li className="flex items-start"><span className="text-[#45A29E] mr-3 mt-1">■</span> Scalability across unpredictable workloads.</li>
              <li className="flex items-start"><span className="text-[#45A29E] mr-3 mt-1">■</span> Highest bandwidth memory integration availability.</li>
              <li className="flex items-start"><span className="text-[#45A29E] mr-3 mt-1">■</span> Rapid iteration cycles leveraging merchant R&D scale.</li>
            </ul>
          </div>
          <div className="border border-[#1F2833] p-12 bg-[#0B0C10] flex items-center justify-center relative h-full">
            {/* Abstract GPU Rack visual */}
            <div className="w-full max-w-sm grid grid-cols-1 gap-4">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="h-10 border border-[#45A29E] bg-[#1F2833]/40 flex items-center px-6 relative overflow-hidden">
                  <div className={`absolute top-0 left-0 h-full w-2 bg-[#E0E2E4]`}></div>
                  <div className="w-full flex justify-between items-center pl-6">
                    <span className="font-mono text-xs text-[#45A29E]">NODE_{i}</span>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#66FCF1] shadow-[0_0_8px_#66FCF1]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#66FCF1] shadow-[0_0_8px_#66FCF1]"></div>
                      <div className="w-2 h-2 rounded-full bg-[#E0E2E4]/20"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute -bottom-5 bg-[#0B0C10] px-6 py-1 font-mono text-sm border border-[#1F2833] text-[#E0E2E4]/60">
              Training Cluster Topology
            </div>
          </div>
        </div>
      </div>
    ),

    // SLIDE 6: CUSTOM ASIC ACCELERATION
    (
      <div className="flex flex-col h-full p-12 overflow-hidden">
        <div className="flex items-center gap-6 mb-12 pb-6 border-b border-[#66FCF1]">
          <Cpu className="w-10 h-10 text-[#66FCF1]" />
          <h2 className="font-sans font-bold text-4xl text-[#66FCF1] uppercase">
            Custom ASICs show accelerating deployment in specialized inference
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-16 flex-grow items-center">
          <div className="order-1 border border-[#66FCF1]/40 p-12 bg-[#0B0C10] flex items-center justify-center relative shadow-[inset_0_0_30px_rgba(102,252,241,0.05)] h-full">
            {/* ASIC Die Visual */}
            <div className="w-64 h-64 border-2 border-[#66FCF1] p-3 relative">
              <div className="w-full h-full border border-[#45A29E] grid grid-cols-3 grid-rows-3 gap-2 p-2">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`bg-[#66FCF1]/20 border border-[#66FCF1]/40 ${i === 4 ? 'bg-[#66FCF1]/40 shadow-[0_0_15px_#66FCF1]' : ''}`}></div>
                ))}
              </div>
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-4 border-l-4 border-[#E0E2E4]"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-4 border-r-4 border-[#E0E2E4]"></div>
            </div>
            <div className="absolute -bottom-5 bg-[#0B0C10] px-6 py-1 font-mono text-sm border border-[#66FCF1]/50 text-[#66FCF1]">
              Optimized Silicon Die
            </div>
          </div>
          <div className="order-2 space-y-8 font-mono text-lg">
            <p className="leading-relaxed">
              Hyperscalers are aggressively transitioning deterministic, high-volume inference workloads to internal custom silicon to drastically lower CapEx-per-query.
            </p>
            <div className="p-6 border-l-4 border-[#66FCF1] bg-[#66FCF1]/10">
              Power efficiency and specific workload optimization render merchant GPUs economically unviable for mature product deployment.
            </div>
            <ul className="space-y-4 pl-4">
              <li className="flex items-start"><span className="text-[#66FCF1] mr-3 mt-1">■</span> Meta MTIA, Google TPU, AWS Trainium/Inferentia.</li>
              <li className="flex items-start"><span className="text-[#66FCF1] mr-3 mt-1">■</span> Focused on search, recommendation engines, and ad serving.</li>
              <li className="flex items-start"><span className="text-[#66FCF1] mr-3 mt-1">■</span> Reduces dependency on single-source supply chains.</li>
            </ul>
          </div>
        </div>
      </div>
    ),

    // SLIDE 7: CPU SHIFTS OVERVIEW
    (
      <div className="flex flex-col h-full p-12 overflow-hidden">
        <h2 className="font-sans font-bold text-4xl text-[#E0E2E4] uppercase mb-6 leading-tight border-l-4 border-[#E0E2E4] pl-6">
          AMD accelerates market share acquisition across both server and client computing architectures
        </h2>
        <div className="flex flex-col flex-grow justify-center pb-4">
          <div className="text-center font-mono text-2xl text-[#66FCF1] mb-16">
            4Q25 CPU Analysis confirms structural shifts in processor deployment.
          </div>
          <div className="grid grid-cols-2 gap-12 max-w-6xl mx-auto w-full">
            <div className="border border-[#1F2833] p-10 text-center bg-[#1F2833]/10">
              <Server className="w-14 h-14 text-[#E0E2E4] mx-auto mb-6" />
              <h3 className="font-sans font-bold text-2xl uppercase mb-4">Server Deployments</h3>
              <div className="h-1 w-24 bg-[#66FCF1] mx-auto mb-6"></div>
              <p className="font-mono text-lg text-[#E0E2E4]/70 leading-relaxed px-4">
                Driven by overwhelming Total Cost of Ownership (TCO) advantages and absolute core-density leadership in data centers.
              </p>
            </div>
            <div className="border border-[#1F2833] p-10 text-center bg-[#1F2833]/10">
              <Layers className="w-14 h-14 text-[#E0E2E4] mx-auto mb-6" />
              <h3 className="font-sans font-bold text-2xl uppercase mb-4">Client Architectures</h3>
              <div className="h-1 w-24 bg-[#66FCF1] mx-auto mb-6"></div>
              <p className="font-mono text-lg text-[#E0E2E4]/70 leading-relaxed px-4">
                Reflects aggressive enterprise adoption and robust architectural execution against incumbent inertia.
              </p>
            </div>
          </div>
        </div>
      </div>
    ),

    // SLIDE 8: SERVER CPU DATA
    (
      <div className="flex flex-col h-full p-12 overflow-hidden">
        <h2 className="font-sans font-bold text-4xl text-[#E0E2E4] uppercase mb-8 flex items-center justify-between">
          <span>Server CPU Market Share Trajectory</span>
          <span className="font-mono text-lg text-[#66FCF1] border border-[#66FCF1] px-4 py-2">Q1'24 - Q4'25</span>
        </h2>
        <div className="flex-grow flex flex-col relative border border-[#1F2833] bg-[#0B0C10] p-8 min-h-0">
          <p className="font-mono text-base text-[#E0E2E4]/80 mb-8 max-w-4xl">
            Incumbent architectures face sustained competitive pressure in high-margin segments as cloud providers prioritize power-to-performance ratios.
          </p>
          
          {/* Area Chart Representation */}
          <div className="flex-grow w-full relative min-h-0">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="10" x2="100" y2="10" stroke="#1F2833" strokeDasharray="2" />
              <line x1="0" y1="25" x2="100" y2="25" stroke="#1F2833" strokeDasharray="2" />
              <line x1="0" y1="40" x2="100" y2="40" stroke="#1F2833" strokeDasharray="2" />
              
              {/* Incumbent Area (Gray) */}
              <polygon points="0,50 0,10 20,12 40,15 60,20 80,25 100,28 100,50" fill="#1F2833" opacity="0.5" />
              <polyline points="0,10 20,12 40,15 60,20 80,25 100,28" fill="none" stroke="#45A29E" strokeWidth="1" />
              
              {/* AMD Area (Cyan) */}
              <polygon points="0,50 0,40 20,38 40,35 60,30 80,25 100,22 100,50" fill="url(#cyanGradient)" />
              <polyline points="0,40 20,38 40,35 60,30 80,25 100,22" fill="none" stroke="#66FCF1" strokeWidth="2" className="drop-shadow-[0_0_8px_#66FCF1]" />
              
              <defs>
                <linearGradient id="cyanGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#66FCF1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#66FCF1" stopOpacity="0.0" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-6 right-6 bg-[#0B0C10] border border-[#1F2833] p-4 font-mono text-sm">
              <div className="flex items-center gap-3 mb-3"><div className="w-4 h-4 bg-[#1F2833]"></div> Incumbent (Share ↓)</div>
              <div className="flex items-center gap-3"><div className="w-4 h-4 bg-[#66FCF1] shadow-[0_0_8px_#66FCF1]"></div> AMD (Share ↑)</div>
            </div>
          </div>
          <div className="flex justify-between font-mono text-xs text-[#E0E2E4]/50 pt-6 px-2 uppercase mt-2">
            <span>Q1 24</span><span>Q2 24</span><span>Q3 24</span><span>Q4 24</span><span>Q1 25</span><span>Q2 25</span><span>Q3 25</span><span className="text-[#66FCF1] font-bold">Q4 25</span>
          </div>
        </div>
      </div>
    ),

    // SLIDE 9: ANALOG/EDGE TRANSITION
    (
      <div className="flex flex-col h-full p-12 overflow-hidden justify-center items-center relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,166,35,0.05)_0%,transparent_60%)]"></div>
        <Radio className="w-24 h-24 text-[#F5A623] mb-10" />
        <h2 className="font-sans font-bold text-6xl text-[#E0E2E4] uppercase text-center mb-8 tracking-tight">
          The <span className="text-[#F5A623]">Analog</span> & <span className="text-[#F5A623]">Automotive</span> Reset
        </h2>
        <div className="w-32 h-1 bg-[#F5A623] shadow-[0_0_15px_#F5A623] mb-10"></div>
        <p className="font-mono text-2xl text-[#E0E2E4]/80 text-center max-w-4xl leading-relaxed">
          While digital logic accelerates, the physical edge is undergoing a necessary, structural derisking driven by automotive inventory digestion and industrial consolidation.
        </p>
      </div>
    ),

    // SLIDE 10: ALGM WATERFALL
    (
      <div className="flex flex-col h-full p-12 overflow-hidden">
        <h2 className="font-sans font-bold text-4xl text-[#E0E2E4] uppercase mb-10 border-l-4 border-[#F5A623] pl-6">
          Allegro MicroSystems executes a conservative target model reset reflecting automotive market realities
        </h2>
        <div className="flex flex-row gap-12 flex-grow min-h-0">
          {/* Waterfall Chart */}
          <div className="w-2/3 border border-[#1F2833] bg-[#0B0C10] p-8 relative flex flex-col justify-end">
            <div className="absolute top-6 left-6 font-mono text-sm text-[#F5A623] uppercase">Revenue Target Waterfall (Illustrative)</div>
            <div className="flex h-full items-end gap-4 px-12 font-mono text-base text-center border-b border-[#1F2833] pb-2 mt-10">
              
              <div className="flex-1 flex flex-col items-center h-full justify-end">
                <span className="mb-3 text-[#E0E2E4] font-bold text-xl">$1.5B</span>
                <div className="w-full bg-[#1F2833] h-[90%]"></div>
                <span className="mt-4 text-[#45A29E]">Prior Target</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-end h-[90%]">
                <span className="mb-3 text-red-400 font-bold text-xl">-$200M</span>
                <div className="w-full bg-red-900/50 border border-red-500/50 h-[20%]"></div>
                <span className="mt-4 text-[#E0E2E4]/50 leading-tight">Auto<br/>Inventory</span>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-end h-[70%]">
                <span className="mb-3 text-red-400 font-bold text-xl">-$100M</span>
                <div className="w-full bg-red-900/50 border border-red-500/50 h-[14%]"></div>
                <span className="mt-4 text-[#E0E2E4]/50 leading-tight">Industrial<br/>Softness</span>
              </div>

              <div className="flex-1 flex flex-col items-center h-full justify-end">
                <span className="mb-3 text-[#F5A623] font-bold text-xl">$1.2B</span>
                <div className="w-full bg-[#F5A623]/20 border border-[#F5A623] h-[56%] shadow-[inset_0_0_15px_rgba(245,166,35,0.2)]"></div>
                <span className="mt-4 text-[#F5A623] font-bold">New Baseline</span>
              </div>

            </div>
          </div>
          {/* Text panel */}
          <div className="w-1/3 font-mono text-lg space-y-8 flex flex-col justify-center">
            <div className="p-6 bg-[#F5A623]/10 border border-[#F5A623]/30">
              <strong className="text-[#F5A623] block mb-3 uppercase text-xl">Defensive Posture</strong>
              The ALGM Analyst Day established a highly defensive forward-looking posture, anchoring to a lower-growth environment.
            </div>
            <ul className="space-y-6 text-[#E0E2E4]/80">
              <li className="flex gap-4 items-start"><ArrowRight className="w-6 h-6 text-[#F5A623] flex-shrink-0 mt-1" /> Target models actively derisked for prolonged automotive digestion.</li>
              <li className="flex gap-4 items-start"><ArrowRight className="w-6 h-6 text-[#F5A623] flex-shrink-0 mt-1" /> Baseline expectations preserve high-margin operating models despite top-line cuts.</li>
              <li className="flex gap-4 items-start"><ArrowRight className="w-6 h-6 text-[#F5A623] flex-shrink-0 mt-1" /> The reset structurally clears the deck for future outperformance as demand normalizes.</li>
            </ul>
          </div>
        </div>
      </div>
    ),

    // SLIDE 11: TXN + SLAB OVERVIEW
    (
      <div className="flex flex-col h-full p-12 overflow-hidden">
        <h2 className="font-sans font-bold text-4xl text-[#E0E2E4] uppercase text-center mb-12">
          Texas Instruments' acquisition of Silicon Labs unlocks massive industrial and edge connectivity synergies
        </h2>
        <div className="grid grid-cols-3 gap-6 h-full min-h-0">
          {/* TXN Panel */}
          <div className="border border-[#1F2833] bg-[#0B0C10] p-8 flex flex-col items-center text-center">
            <div className="w-full border-b border-[#1F2833] pb-6 mb-6">
              <h3 className="font-sans font-bold text-3xl text-[#E0E2E4] uppercase">TXN</h3>
              <p className="font-mono text-sm text-[#45A29E] mt-2">Acquirer Core</p>
            </div>
            <ul className="font-mono text-base text-left space-y-4 w-full">
              <li className="bg-[#1F2833]/30 p-4 border-l-2 border-[#E0E2E4]">Massive Internal Manufacturing Scale (300mm transition)</li>
              <li className="bg-[#1F2833]/30 p-4 border-l-2 border-[#E0E2E4]">Unmatched Analog Catalog & Power Management</li>
              <li className="bg-[#1F2833]/30 p-4 border-l-2 border-[#E0E2E4]">Extensive Direct Sales Channels</li>
            </ul>
          </div>

          {/* Synergy Center Panel */}
          <div className="border border-[#F5A623] bg-[#F5A623]/5 p-8 flex flex-col items-center justify-center relative shadow-[inset_0_0_40px_rgba(245,166,35,0.05)]">
            <Target className="w-16 h-16 text-[#F5A623] mb-6" />
            <h3 className="font-sans font-bold text-2xl text-[#F5A623] uppercase mb-8 text-center">Structural Consolidation</h3>
            <div className="font-mono text-sm text-center text-[#E0E2E4]/90 space-y-4 w-full">
              <p className="border border-[#F5A623]/30 p-3 bg-[#F5A623]/10">Single-Vendor Edge Solutions</p>
              <p className="border border-[#F5A623]/30 p-3 bg-[#F5A623]/10">SG&A Redundancy Elimination</p>
              <p className="border border-[#F5A623]/30 p-3 bg-[#F5A623]/10">Immediate Margin Expansion</p>
            </div>
          </div>

          {/* SLAB Panel */}
          <div className="border border-[#1F2833] bg-[#0B0C10] p-8 flex flex-col items-center text-center">
            <div className="w-full border-b border-[#1F2833] pb-6 mb-6">
              <h3 className="font-sans font-bold text-3xl text-[#E0E2E4] uppercase">SLAB</h3>
              <p className="font-mono text-sm text-[#45A29E] mt-2">Acquired Asset</p>
            </div>
            <ul className="font-mono text-base text-left space-y-4 w-full">
              <li className="bg-[#1F2833]/30 p-4 border-r-2 border-[#E0E2E4]">Premier Wireless Connectivity IP (Zigbee, Matter, BLE)</li>
              <li className="bg-[#1F2833]/30 p-4 border-r-2 border-[#E0E2E4]">Industrial IoT Penetration</li>
              <li className="bg-[#1F2833]/30 p-4 border-r-2 border-[#E0E2E4]">Specialized Edge Computing MCUs</li>
            </ul>
          </div>
        </div>
      </div>
    ),

    // SLIDE 12: SCE EARNINGS
    (
      <div className="flex flex-col h-full p-12 overflow-hidden">
        <h2 className="font-sans font-bold text-4xl text-[#E0E2E4] uppercase mb-10 leading-tight border-l-4 border-[#66FCF1] pl-6">
          Onto Innovation and Camtek demonstrate the critical necessity of advanced packaging metrology
        </h2>
        <div className="flex flex-row gap-12 flex-grow min-h-0">
          <div className="w-5/12 font-mono text-base space-y-8 flex flex-col justify-center">
            <p className="text-xl text-[#66FCF1] leading-relaxed">Earnings reports from ADI, CAMT, and ONTO reveal divergent sector momentum.</p>
            <div className="space-y-6">
              <div className="border border-[#1F2833] p-6 bg-[#0B0C10]">
                <span className="text-[#45A29E] uppercase text-sm block mb-2 font-bold">Driver 1</span>
                SCE surprises are actively driven by the complexity of advanced AI packaging (e.g., CoWoS, HBM stacks).
              </div>
              <div className="border border-[#1F2833] p-6 bg-[#0B0C10]">
                <span className="text-[#45A29E] uppercase text-sm block mb-2 font-bold">Driver 2</span>
                Yield management and 3D metrology transition from optional enhancements to mission-critical fabrication bottlenecks.
              </div>
              <div className="border border-[#1F2833] p-6 bg-[#0B0C10]">
                <span className="text-[#45A29E] uppercase text-sm block mb-2 font-bold">Driver 3</span>
                Capital equipment linked to advanced logic packaging severely outperforms broader wafer fabrication equipment.
              </div>
            </div>
          </div>
          
          {/* Packaging Schematic */}
          <div className="w-7/12 border border-[#1F2833] bg-[#0B0C10] p-10 flex items-center justify-center relative">
             <div className="absolute top-6 right-6 font-mono text-sm text-[#45A29E] uppercase">2.5D/3D Package Metrology</div>
             <div className="w-full max-w-lg relative mt-8">
                {/* Laser scan effect */}
                <div className="absolute left-0 w-full h-1 bg-[#66FCF1] shadow-[0_0_20px_#66FCF1] animate-pulse z-10" style={{top: '40%'}}></div>
                
                {/* Structure */}
                <div className="border-2 border-[#1F2833] p-4 flex gap-4 justify-center bg-[#1F2833]/10">
                  <div className="w-24 flex flex-col gap-1.5">
                    <div className="h-6 bg-[#E0E2E4]/40 border border-[#E0E2E4]"></div>
                    <div className="h-6 bg-[#E0E2E4]/40 border border-[#E0E2E4]"></div>
                    <div className="h-6 bg-[#E0E2E4]/40 border border-[#E0E2E4]"></div>
                    <div className="h-6 bg-[#E0E2E4]/40 border border-[#E0E2E4]"></div>
                    <div className="text-center font-mono text-[10px] mt-2 text-[#E0E2E4]/70 uppercase">HBM Stack</div>
                  </div>
                  <div className="w-48 h-32 bg-[#66FCF1]/20 border border-[#66FCF1] flex items-center justify-center relative">
                    <span className="font-mono text-base text-[#66FCF1] uppercase">Logic Die</span>
                    {/* Defect marker */}
                    <div className="absolute top-4 right-4 w-3 h-3 border-2 border-red-500 bg-red-500/50 rounded-full animate-ping"></div>
                  </div>
                  <div className="w-24 flex flex-col gap-1.5">
                    <div className="h-6 bg-[#E0E2E4]/40 border border-[#E0E2E4]"></div>
                    <div className="h-6 bg-[#E0E2E4]/40 border border-[#E0E2E4]"></div>
                    <div className="h-6 bg-[#E0E2E4]/40 border border-[#E0E2E4]"></div>
                    <div className="h-6 bg-[#E0E2E4]/40 border border-[#E0E2E4]"></div>
                    <div className="text-center font-mono text-[10px] mt-2 text-[#E0E2E4]/70 uppercase">HBM Stack</div>
                  </div>
                </div>
                <div className="w-full h-10 bg-[#45A29E]/20 border border-[#45A29E] mt-3 flex items-center justify-center">
                   <span className="font-mono text-sm text-[#45A29E] uppercase">Silicon Interposer</span>
                </div>
                <div className="w-full flex justify-between px-6 mt-2">
                  {[...Array(16)].map((_, i) => <div key={i} className="w-3 h-5 bg-[#F5A623]/50"></div>)}
                </div>
                <div className="w-full h-12 bg-[#1F2833] mt-2 flex items-center justify-center">
                   <span className="font-mono text-sm text-[#E0E2E4]/50 uppercase">Package Substrate</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    ),

    // SLIDE 13: QUANTUM TRANSITION (QUBITS 2026)
    (
      <div className="flex flex-col h-full p-12 overflow-hidden relative">
        <h2 className="font-sans font-bold text-4xl text-[#E0E2E4] uppercase mb-12 text-center z-10">
          Qubits 2026 confirms the steady commercial maturation of quantum architectures
        </h2>
        
        <div className="flex-grow flex items-center justify-center relative min-h-0">
          {/* Central Chandelier Wireframe */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
            <svg width="400" height="500" viewBox="0 0 200 300">
              <circle cx="100" cy="50" r="40" fill="none" stroke={COLORS.cyan} strokeWidth="2" strokeDasharray="4"/>
              <circle cx="100" cy="120" r="30" fill="none" stroke={COLORS.text} strokeWidth="1"/>
              <circle cx="100" cy="180" r="20" fill="none" stroke={COLORS.text} strokeWidth="1"/>
              <circle cx="100" cy="230" r="10" fill="none" stroke={COLORS.text} strokeWidth="1"/>
              <path d="M60,50 L70,120 L80,180 L90,230" fill="none" stroke={COLORS.cyan} strokeWidth="1"/>
              <path d="M140,50 L130,120 L120,180 L110,230" fill="none" stroke={COLORS.cyan} strokeWidth="1"/>
              <line x1="100" y1="10" x2="100" y2="280" stroke={COLORS.text} strokeWidth="1" strokeDasharray="2" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-x-32 gap-y-12 max-w-5xl z-10 w-full">
            <div className="border border-[#1F2833] bg-[#0B0C10]/90 p-8 backdrop-blur-md">
              <div className="font-mono text-base text-[#45A29E] mb-3 uppercase font-bold">01. Physics to Silicon</div>
              <p className="font-mono text-lg text-[#E0E2E4] leading-relaxed">The transition from theoretical physics to engineered silicon scaling is actively underway across the supply chain.</p>
            </div>
            <div className="border border-[#1F2833] bg-[#0B0C10]/90 p-8 backdrop-blur-md">
              <div className="font-mono text-base text-[#45A29E] mb-3 uppercase font-bold">02. Predictable Improvement</div>
              <p className="font-mono text-lg text-[#E0E2E4] leading-relaxed">Error correction and logical qubit fidelity show measurable, predictable improvement trajectories rather than stochastic jumps.</p>
            </div>
            <div className="border border-[#1F2833] bg-[#0B0C10]/90 p-8 backdrop-blur-md">
              <div className="font-mono text-base text-[#45A29E] mb-3 uppercase font-bold">03. Hybrid Integration</div>
              <p className="font-mono text-lg text-[#E0E2E4] leading-relaxed">Integration pathways between classical supercomputing clusters and quantum processing units (QPUs) are hardening.</p>
            </div>
            <div className="border border-[#1F2833] bg-[#0B0C10]/90 p-8 backdrop-blur-md">
              <div className="font-mono text-base text-[#45A29E] mb-3 uppercase font-bold">04. Supply Chain Standardization</div>
              <p className="font-mono text-lg text-[#E0E2E4] leading-relaxed">The traditional semiconductor supply chain is beginning to standardize quantum control and cryogenic readout infrastructure.</p>
            </div>
          </div>
        </div>
      </div>
    ),

    // SLIDE 14: SUMMARY DATA POINTS
    (
      <div className="flex flex-col h-full p-12 overflow-hidden">
        <h2 className="font-sans font-bold text-4xl text-[#E0E2E4] uppercase mb-12 pb-6 border-b border-[#1F2833]">
          Quantitative Market Synthesis
        </h2>
        <div className="grid grid-cols-4 gap-6 flex-grow content-center min-h-0">
          <div className="border border-[#66FCF1]/30 p-8 flex flex-col justify-center text-center bg-[#66FCF1]/5 h-64">
            <span className="font-sans font-bold text-5xl text-[#66FCF1] mb-4">Resilient</span>
            <span className="font-mono text-sm text-[#E0E2E4]/80 uppercase tracking-widest">AI CapEx Mandates</span>
          </div>
          <div className="border border-[#E0E2E4]/30 p-8 flex flex-col justify-center text-center bg-[#1F2833]/20 h-64">
            <span className="font-sans font-bold text-5xl text-[#E0E2E4] mb-4">Dual</span>
            <span className="font-mono text-sm text-[#E0E2E4]/80 uppercase tracking-widest">Track Silicon Strategy</span>
          </div>
          <div className="border border-[#E0E2E4]/30 p-8 flex flex-col justify-center text-center bg-[#1F2833]/20 h-64">
            <span className="font-sans font-bold text-5xl text-[#E0E2E4] mb-4">Share↑</span>
            <span className="font-mono text-sm text-[#E0E2E4]/80 uppercase tracking-widest">AMD Market Acquistion</span>
          </div>
          <div className="border border-[#F5A623]/30 p-8 flex flex-col justify-center text-center bg-[#F5A623]/5 h-64">
            <span className="font-sans font-bold text-5xl text-[#F5A623] mb-4">Reset</span>
            <span className="font-mono text-sm text-[#E0E2E4]/80 uppercase tracking-widest">Analog & Auto Targets</span>
          </div>
        </div>
      </div>
    ),

    // SLIDE 15: CLOSING THESIS
    (
      <div className="flex flex-col h-full p-12 overflow-hidden relative justify-center items-center bg-[#0B0C10]">
        <div className="absolute inset-0 z-0">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Diverging Lines */}
            <path d="M0,50 L30,50 L100,10" fill="none" stroke={COLORS.cyan} strokeWidth="3" className="drop-shadow-[0_0_20px_#66FCF1]" />
            <path d="M0,50 L30,50 L100,50" fill="none" stroke={COLORS.amber} strokeWidth="3" className="drop-shadow-[0_0_20px_#F5A623]" />
          </svg>
        </div>
        
        <div className="relative z-10 bg-[#0B0C10]/90 p-12 border-y-2 border-[#1F2833] backdrop-blur-md max-w-5xl text-center">
          <h1 className="font-sans font-bold text-6xl text-[#E0E2E4] uppercase leading-tight mb-8 tracking-tight">
            The architecture of computation has permanently bifurcated.
          </h1>
          <p className="font-mono text-2xl text-[#45A29E] leading-relaxed">
            Capital will concentrate heavily on the architects of AI scale <br/>and the consolidators of the intelligent edge.
          </p>
        </div>
      </div>
    )
  ];

  return (
    <div className="min-h-screen bg-[#000000] flex items-center justify-center p-2 sm:p-4 font-sans overflow-hidden">
      {/* Outer bounding box that enforces maximum 16:9 size relative to screen */}
      <div 
        ref={containerRef}
        className="relative shadow-[0_0_50px_rgba(31,40,51,0.5)] overflow-hidden rounded-md border border-[#1F2833]"
        style={{ 
          aspectRatio: '16/9',
          width: '100%',
          maxHeight: 'calc(100vh - 2rem)',
          maxWidth: 'calc((100vh - 2rem) * 16 / 9)',
          backgroundColor: COLORS.bg
        }}
      >
        {/* Fixed 1280x720 internal stage that perfectly scales down/up to fit */}
        <div 
          className="absolute top-1/2 left-1/2 origin-center"
          style={{ 
            width: '1280px', 
            height: '720px', 
            transform: `translate(-50%, -50%) scale(${scale})`,
            backgroundColor: COLORS.bg,
            color: COLORS.text,
            ...gridBackground
          }}
        >
          {/* Slide Content */}
          <div className="w-full h-full relative z-10">
            {slides[currentSlide]}
          </div>

          {/* Navigation UI - Positioned absolutely inside the 1280x720 container so it scales cleanly */}
          <div className="absolute bottom-6 right-8 z-50 flex items-center gap-4 bg-[#0B0C10] border border-[#1F2833] p-3 shadow-lg">
            <span className="font-mono text-sm text-[#45A29E] mr-3">
              {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
            <button 
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`p-2 rounded hover:bg-[#1F2833] transition-colors ${currentSlide === 0 ? 'opacity-30 cursor-not-allowed' : 'text-[#E0E2E4]'}`}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNext}
              disabled={currentSlide === slides.length - 1}
              className={`p-2 rounded hover:bg-[#1F2833] transition-colors ${currentSlide === slides.length - 1 ? 'opacity-30 cursor-not-allowed' : 'text-[#E0E2E4]'}`}
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Top subtle progress bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1F2833] z-50">
            <div 
              className="h-full bg-[#45A29E] transition-all duration-300 ease-out"
              style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation;