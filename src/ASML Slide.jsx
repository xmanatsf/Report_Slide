import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, Cpu, Server, Activity, Database, 
  Target, Layers, Zap, Crosshair, BarChart3, Maximize,
  PieChart, LineChart, TrendingUp, GitMerge
} from 'lucide-react';

const ASMLPresentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="flex flex-col h-screen w-full bg-[#0B1320] text-white font-sans overflow-hidden">
      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@300;400;600;800&display=swap');
        
        .font-sans-title { font-family: 'Inter', sans-serif; }
        .font-mono-data { font-family: 'IBM Plex Mono', monospace; }
        
        .blueprint-grid {
          background-image: 
            linear-gradient(rgba(74, 93, 126, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(74, 93, 126, 0.15) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
        }

        .wireframe-box {
          border: 1px solid #4A5D7E;
          background: rgba(11, 19, 32, 0.6);
          backdrop-filter: blur(4px);
        }

        .wireframe-box-cyan {
          border: 1px solid #00F0FF;
          background: rgba(0, 240, 255, 0.05);
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.1);
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0B1320; }
        ::-webkit-scrollbar-thumb { background: #4A5D7E; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #00F0FF; }
      `}} />

      {/* Main Content Area */}
      <div className="flex-1 relative blueprint-grid overflow-hidden">
        {/* Slide Content Container - Scrollable to prevent clipping, padded down to fit 100% scale */}
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
          <div className="min-h-full flex flex-col justify-center max-w-6xl mx-auto">
            {slides[currentSlide].content}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="h-12 border-t border-[#4A5D7E] bg-[#0B1320] flex items-center justify-between px-6 shrink-0 z-10">
        <div className="text-[#4A5D7E] font-mono-data text-xs md:text-sm tracking-widest uppercase">
          ASML // Investor Focus Analysis
        </div>
        
        <div className="flex items-center space-x-4 md:space-x-8">
          <div className="text-[#00F0FF] font-mono-data text-sm tracking-wider">
            {String(currentSlide + 1).padStart(2, '0')} <span className="text-[#4A5D7E]">/ {slides.length}</span>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className={`p-1.5 rounded border transition-all duration-200 ${
                currentSlide === 0 
                  ? 'border-[#4A5D7E]/30 text-[#4A5D7E]/30 cursor-not-allowed' 
                  : 'border-[#4A5D7E] text-white hover:border-[#00F0FF] hover:text-[#00F0FF] hover:bg-[#00F0FF]/10'
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={handleNext}
              disabled={currentSlide === slides.length - 1}
              className={`p-1.5 rounded border transition-all duration-200 ${
                currentSlide === slides.length - 1 
                  ? 'border-[#4A5D7E]/30 text-[#4A5D7E]/30 cursor-not-allowed' 
                  : 'border-[#4A5D7E] text-white hover:border-[#00F0FF] hover:text-[#00F0FF] hover:bg-[#00F0FF]/10'
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Components
const DataPoint = ({ label, value, highlight = false }) => (
  <div className={`wireframe-box p-3 border-l-2 ${highlight ? 'border-l-[#00F0FF] wireframe-box-cyan' : 'border-l-[#4A5D7E]'} transition-all`}>
    <div className="text-[#4A5D7E] text-[10px] md:text-xs uppercase tracking-widest mb-1">{label}</div>
    <div className={`font-mono-data text-lg md:text-xl ${highlight ? 'text-[#00F0FF]' : 'text-white'}`}>{value}</div>
  </div>
);

// Slide Content Definitions
const slides = [
  // SLIDE 01: COVER
  {
    id: 'cover',
    content: (
      <div className="flex flex-col md:flex-row items-center justify-between w-full h-full min-h-[60vh]">
        <div className="flex-1 pr-6 z-10">
          <div className="text-[#00F0FF] font-mono-data tracking-widest text-xs mb-4 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            STRATEGIC SYNTHESIS REPORT
          </div>
          <h1 className="font-sans-title text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
            Two engines drive the next decade of <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#4A5D7E]">semiconductor economics.</span>
          </h1>
          <div className="flex flex-col space-y-3 font-mono-data text-xs md:text-sm text-[#8FA4C5] max-w-xl">
            <div className="flex items-start">
              <span className="text-[#00F0FF] mr-3">01.</span>
              <p>Artificial Intelligence infrastructure demands unprecedented lithography volume.</p>
            </div>
            <div className="flex items-start">
              <span className="text-[#00F0FF] mr-3">02.</span>
              <p>High NA EUV adoption fundamentally alters the cost and complexity curve for advanced node manufacturing.</p>
            </div>
            <div className="flex items-start">
              <span className="text-[#00F0FF] mr-3">03.</span>
              <p>Together, these forces expand ASML's total share of Wafer Fab Equipment (WFE) and re-rate its historical valuation.</p>
            </div>
          </div>
        </div>
        <div className="flex-1 relative w-full h-[300px] mt-6 md:mt-0 opacity-80">
          {/* Abstract Converging Graphic */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 border border-[#4A5D7E] rounded-full absolute animate-[spin_60s_linear_infinite]" />
            <div className="w-48 h-48 border border-[#00F0FF] rotate-45 absolute opacity-50" />
            <div className="w-32 h-32 border border-[#4A5D7E] rounded-full absolute" />
            <div className="w-full h-[1px] bg-[#00F0FF] absolute opacity-40 shadow-[0_0_10px_#00F0FF]" />
            <div className="h-full w-[1px] bg-[#00F0FF] absolute opacity-40 shadow-[0_0_10px_#00F0FF]" />
            <Cpu className="text-[#00F0FF] w-12 h-12 absolute bg-[#0B1320]" />
          </div>
        </div>
      </div>
    )
  },

  // SLIDE 02: AI GW -> LITHOGRAPHY SPEND
  {
    id: 'ai-capacity-spend',
    content: (
      <div className="w-full h-full flex flex-col justify-center">
        <h2 className="font-sans-title text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          Artificial intelligence capacity dictates direct lithography expenditure
        </h2>
        <p className="text-[#8FA4C5] font-mono-data text-xs md:text-sm mb-6 max-w-3xl">
          Quantifying the direct relationship between global AI infrastructure build-outs and ASML's revenue. Total WFE spend per GW expands from ~$1.5B–$2B today to ~$3B by mid-2027.
        </p>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 flex-1">
          {/* Flow Diagram */}
          <div className="wireframe-box-cyan p-6 flex flex-col items-center justify-center w-full lg:w-1/4 h-32 lg:h-40">
            <Zap className="text-[#00F0FF] w-8 h-8 mb-2" />
            <div className="text-center">
              <div className="text-white font-sans-title font-bold text-xl">1 GW</div>
              <div className="text-[#4A5D7E] font-mono-data text-[10px] uppercase tracking-widest mt-1">AI Data Center Capacity</div>
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center px-4">
            <div className="w-16 h-[1px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            <div className="text-[#00F0FF] font-mono-data text-[10px] mt-2">TRANSLATES TO</div>
          </div>

          <div className="flex flex-col gap-3 w-full lg:w-2/3">
            <DataPoint label="Lithography Spend per GW" value="€500M - €900M" highlight={true} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <DataPoint label="Litho Intensity for AI" value="30% - 35% of WFE" />
              <DataPoint label="% of Proj. 2025 ASML Revs" value="1% - 3% per GW" />
            </div>
            <div className="wireframe-box p-3 mt-1 border-l-[#4A5D7E] border-l-2">
              <div className="font-mono-data text-xs text-[#8FA4C5]">
                <span className="text-white">Note:</span> Growth driven by introduction of denser rack configurations (Vera Rubin / Feynman), significantly pushing WFE requirements by mid-2027.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // SLIDE 03: MEMORY DOMINANCE
  {
    id: 'memory-dominance',
    content: (
      <div className="w-full h-full flex flex-col justify-center">
        <h2 className="font-sans-title text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          High-bandwidth memory dominates the AI hardware expenditure profile
        </h2>
        <p className="text-[#8FA4C5] font-mono-data text-xs md:text-sm mb-6 max-w-3xl">
          Correcting the logic-only assumption: AI lithography spend is overwhelmingly driven by memory fabrication scaling.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[250px] lg:min-h-[300px]">
          {/* Chart Area */}
          <div className="lg:col-span-2 flex items-end justify-center gap-6 h-full wireframe-box p-6 pb-8 relative">
            <div className="absolute top-4 left-4 text-[#4A5D7E] font-mono-data text-[10px] uppercase">WFE Spend Allocation (Rubin/Feynman Scenarios)</div>
            
            {/* Logic Bar */}
            <div className="flex flex-col items-center w-1/3 h-full justify-end">
              <div className="text-white font-mono-data text-lg mb-2">~15%</div>
              <div className="w-full bg-[#4A5D7E]/30 border border-[#4A5D7E] h-[15%] rounded-t-sm transition-all relative group">
                <div className="absolute inset-0 bg-[#4A5D7E]/10 group-hover:bg-[#4A5D7E]/30" />
              </div>
              <div className="mt-2 text-[#8FA4C5] font-mono-data text-xs">Logic WFE</div>
            </div>

            {/* Memory Bar */}
            <div className="flex flex-col items-center w-1/3 h-full justify-end">
              <div className="text-[#00F0FF] font-mono-data text-2xl mb-2 font-bold">~85%</div>
              <div className="w-full bg-[#00F0FF]/10 border border-[#00F0FF] h-[85%] rounded-t-sm transition-all relative group shadow-[0_0_15px_rgba(0,240,255,0.15)]">
                <div className="absolute inset-0 blueprint-grid opacity-30" />
              </div>
              <div className="mt-2 text-[#00F0FF] font-mono-data text-xs font-bold">Memory WFE</div>
            </div>
          </div>

          {/* Data Column */}
          <div className="flex flex-col gap-3 justify-center">
            <DataPoint label="Memory Lithography Spend" value="€250M - €750M / GW" highlight={true} />
            <DataPoint label="Logic Lithography Spend" value="€100M - €250M / GW" />
            <div className="wireframe-box p-3 border-l-[#00F0FF] border-l-2 mt-2">
              <Database className="text-[#00F0FF] w-5 h-5 mb-2" />
              <div className="text-white font-mono-data text-xs leading-relaxed">
                Memory lithography scales dramatically to <span className="text-[#00F0FF]">€2.5B–€3.5B per 100kwpm</span> at 1b/1c nodes, becoming the primary capital sink in AI scaling.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // SLIDE 04: AI REVENUE REVISION
  {
    id: 'ai-revenue-revision',
    content: (
      <div className="w-full h-full flex flex-col justify-center">
        <div className="border-b border-[#4A5D7E]/50 pb-4 mb-6">
          <h2 className="font-sans-title text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            AI revenue contribution models require upward revision
          </h2>
          <p className="text-[#8FA4C5] font-mono-data text-xs md:text-sm max-w-4xl">
            Prior models underestimated the intensity of the HBM/GPU dual demand. AI infrastructure is now projected to secure up to a fifth of total ASML revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
          {/* Dual Axis Simulation */}
          <div className="wireframe-box p-4 relative flex items-end justify-between h-48 lg:h-auto mt-4 lg:mt-0">
             {/* Background Grid Lines */}
             <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none">
              {[30, 20, 10, 0].map((val) => (
                <div key={val} className="w-full border-b border-[#4A5D7E]/20 flex items-end pb-1">
                  <span className="text-[#4A5D7E] text-[9px] font-mono-data">{val}%</span>
                </div>
              ))}
            </div>
            
            <div className="z-10 w-full h-full flex items-end justify-around px-6">
              {/* Previous Est */}
              <div className="flex flex-col items-center w-1/3">
                <span className="text-[#8FA4C5] font-mono-data text-xs mb-2">10-15%</span>
                <div className="w-full h-[40%] border border-[#4A5D7E] bg-[#4A5D7E]/20" />
                <span className="mt-2 text-[10px] font-mono-data text-[#8FA4C5] uppercase">Prior Estimate</span>
              </div>
              
              {/* Revised Est */}
              <div className="flex flex-col items-center w-1/3 relative">
                <span className="text-[#00F0FF] font-mono-data text-lg font-bold mb-2">15-20%</span>
                <div className="w-full h-[60%] border border-[#00F0FF] bg-[#00F0FF]/10 shadow-[0_0_15px_rgba(0,240,255,0.15)]" />
                <span className="mt-2 text-[10px] font-mono-data text-[#00F0FF] uppercase font-bold">Revised 2026/27</span>
                
                {/* Overlay Line Graph representation */}
                <svg className="absolute w-[200%] h-full top-[-40%] left-[-50%] pointer-events-none" preserveAspectRatio="none">
                  <path d="M 0,80 Q 50,70 100,20 T 200,10" fill="none" stroke="#00F0FF" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="100" cy="20" r="3" fill="#00F0FF" />
                </svg>
                <div className="absolute top-[-50%] right-[-60%] text-[#00F0FF] text-[10px] font-mono-data whitespace-nowrap bg-[#0B1320] px-2 border border-[#00F0FF]/50 rounded">
                  Max: 30% of EUV Demand
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4">
            <DataPoint label="Projected Rev Contribution (26/27)" value="15% - 20%" highlight={true} />
            <div className="grid grid-cols-2 gap-3">
              <DataPoint label="Previous Estimate" value="10% - 15%" />
              <DataPoint label="AI EUV Tool Demand" value="25% - 30%" />
            </div>
            <div className="text-[#8FA4C5] font-mono-data text-xs leading-relaxed mt-2">
              Factoring in cumulative demand for HBM and Nvidia/AMD GPUs across varying layer counts, the net lithography demand consistently overrides baseline expectations, demanding immediate structural forecast adjustments.
            </div>
          </div>
        </div>
      </div>
    )
  },

  // SLIDE 05: GLOBAL DATACENTER PIPELINE
  {
    id: 'pipeline-gap',
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="text-center mb-8">
          <h2 className="font-sans-title text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Global data center pipelines exceed priced expectations
          </h2>
          <p className="text-[#8FA4C5] font-mono-data text-xs md:text-sm max-w-2xl mx-auto">
            A significant gap exists between what the market expects and the actual physical infrastructure currently in the announced global pipeline.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center w-full max-w-4xl gap-8">
          {/* Target/Gauge Visual */}
          <div className="relative w-48 h-48 shrink-0 flex items-center justify-center">
            {/* Outer rings */}
            <div className="absolute inset-0 border border-[#4A5D7E]/30 rounded-full" />
            <div className="absolute inset-3 border border-[#4A5D7E]/50 rounded-full border-dashed animate-[spin_120s_linear_infinite]" />
            
            {/* Priced In Ring */}
            <div className="absolute inset-6 border-2 border-[#4A5D7E] rounded-full flex items-center justify-center">
               <div className="absolute top-[-8px] bg-[#0B1320] px-1 text-[#4A5D7E] text-[8px] font-mono-data">PRICED LIMIT</div>
            </div>
            
            {/* Actual Pipeline Ring - bursting out */}
            <div className="absolute inset-[-8px] border-2 border-[#00F0FF] rounded-full shadow-[0_0_15px_rgba(0,240,255,0.2)] animate-pulse" />
            
            <div className="text-center z-10">
              <div className="text-white font-mono-data text-2xl font-bold">&gt; 40 GW</div>
              <div className="text-[#00F0FF] text-[9px] font-mono-data mt-1 tracking-widest">ACTUAL DEMAND</div>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-4 border-b border-[#4A5D7E]/30 pb-3">
              <div className="text-[#4A5D7E] font-mono-data text-lg w-28">40 - 45 GW</div>
              <div className="flex-1">
                <div className="text-white font-sans-title text-sm font-semibold">Consensus Priced Deployment (by 2030)</div>
                <div className="text-[#8FA4C5] font-mono-data text-[10px] mt-1">Market expectation embedded in current valuation.</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 border-b border-[#4A5D7E]/30 pb-3">
              <div className="text-white font-mono-data text-lg w-28">&gt; 35 GW</div>
              <div className="flex-1">
                <div className="text-white font-sans-title text-sm font-semibold">Publicly Announced Projects (Ex-China)</div>
                <div className="text-[#8FA4C5] font-mono-data text-[10px] mt-1">Verified &gt;500MW scale projects currently in pipeline.</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-[#00F0FF] font-mono-data text-lg font-bold w-28">GAP UPSIDE</div>
              <div className="flex-1">
                <div className="text-[#00F0FF] font-sans-title text-sm font-semibold">Unannounced + Sovereign Build-outs</div>
                <div className="text-[#8FA4C5] font-mono-data text-[10px] mt-1">Factoring in China's infrastructure demands pushes total signaling well past consensus limits.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // SLIDE 06: HIGH NA TIPPING POINT
  {
    id: 'high-na-economics',
    content: (
      <div className="w-full h-full flex flex-col justify-center">
        <h2 className="font-sans-title text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          High NA EUV crosses the economic tipping point
        </h2>
        <p className="text-[#8FA4C5] font-mono-data text-xs md:text-sm mb-6 max-w-3xl">
          At sub-20nm metal pitches, brute-force multi-patterning becomes economically and structurally unviable. Single exposure High NA is no longer optional; it is imperative.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
          <div className="flex flex-col justify-center gap-4">
            <DataPoint label="High NA Cost Savings" value="20% to 40%" highlight={true} />
            <div className="wireframe-box p-4 border-l-[#4A5D7E] border-l-2">
              <div className="text-white font-sans-title text-sm font-semibold mb-1">The A10 Node Reality</div>
              <div className="text-[#8FA4C5] font-mono-data text-xs">
                Advanced logic roadmaps dictate that hitting the below-20nm metal pitch for the A10 node (Tools 29-30, MP 31) will require Low NA <span className="text-white font-bold">triple patterning</span> if High NA is not adopted.
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-1">
              <div className="wireframe-box p-3 border-t-2 border-t-[#4A5D7E]">
                <div className="text-white text-xs font-sans-title mb-1">Logic Targets</div>
                <div className="text-[#00F0FF] font-mono-data text-[10px]">3 Critical Layers<br/>(Nanosheet, Gate/Poly, Contacts)</div>
              </div>
              <div className="wireframe-box p-3 border-t-2 border-t-[#4A5D7E]">
                <div className="text-white text-xs font-sans-title mb-1">Memory Targets</div>
                <div className="text-[#00F0FF] font-mono-data text-[10px]">2 Critical Layers<br/>(BLP, SNLP / Capacitor Hole)</div>
              </div>
            </div>
          </div>

          {/* Cost Comparison Visual */}
          <div className="wireframe-box p-6 flex items-end justify-center gap-6 relative h-56 lg:h-auto lg:min-h-[250px]">
            {/* Bracket */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-40 h-6 border-t-2 border-l-2 border-r-2 border-[#00F0FF] opacity-50 flex justify-center">
              <div className="bg-[#0B1320] px-2 -mt-3 text-[#00F0FF] font-mono-data font-bold tracking-widest text-xs">-20% to -40%</div>
            </div>

            {/* Low NA Bar */}
            <div className="w-20 h-[85%] flex flex-col items-center justify-end group">
              <div className="w-full h-[33%] border border-[#4A5D7E] bg-[#4A5D7E]/10 mb-1" />
              <div className="w-full h-[33%] border border-[#4A5D7E] bg-[#4A5D7E]/20 mb-1" />
              <div className="w-full h-[34%] border border-[#4A5D7E] bg-[#4A5D7E]/30" />
              <div className="text-center mt-3">
                <div className="text-white text-xs font-sans-title">Low NA</div>
                <div className="text-[#8FA4C5] text-[9px] font-mono-data uppercase">Triple Pattern</div>
              </div>
            </div>

            {/* High NA Bar */}
            <div className="w-24 h-[55%] flex flex-col items-center justify-end group relative z-10">
              <div className="w-full h-full border-2 border-[#00F0FF] bg-[#00F0FF]/10 shadow-[0_0_15px_rgba(0,240,255,0.15)] flex items-center justify-center">
                <Target className="text-[#00F0FF] w-6 h-6 opacity-50" />
              </div>
              <div className="text-center mt-3">
                <div className="text-[#00F0FF] text-xs font-sans-title font-bold">High NA</div>
                <div className="text-[#00F0FF] text-[9px] font-mono-data uppercase">Single Exposure</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // SLIDE 07: TARGET CRITICAL LAYERS
  {
    id: 'layer-specifics',
    content: (
      <div className="w-full h-full flex flex-col justify-center">
        <h2 className="font-sans-title text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          High NA validates its premium at the physical limit
        </h2>
        <p className="text-[#8FA4C5] font-mono-data text-xs md:text-sm mb-6 max-w-3xl">
          Specific layer characteristics dictate where single exposure High NA delivers asymmetrical economic and qualitative advantages over Low NA multi-patterning.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
          {/* Logic Table */}
          <div className="wireframe-box flex flex-col">
            <div className="border-b border-[#4A5D7E] p-3 bg-[#4A5D7E]/10 flex items-center gap-2">
              <Cpu className="text-white w-4 h-4" />
              <h3 className="font-sans-title font-bold text-sm">Logic Targets</h3>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between gap-3">
              <div className="grid grid-cols-2 gap-3 border-b border-[#4A5D7E]/30 pb-3">
                <div>
                  <div className="text-[#4A5D7E] text-[9px] font-mono-data uppercase">Pitch Limit</div>
                  <div className="text-white font-mono-data text-lg">≤ 20 nm</div>
                </div>
                <div>
                  <div className="text-[#4A5D7E] text-[9px] font-mono-data uppercase">Tip2Top</div>
                  <div className="text-white font-mono-data text-lg">14 nm</div>
                </div>
                <div>
                  <div className="text-[#4A5D7E] text-[9px] font-mono-data uppercase">LCDU</div>
                  <div className="text-white font-mono-data text-lg">&lt; 4.5 nm</div>
                </div>
              </div>
              <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/30 p-3 mt-auto">
                <div className="text-[#00F0FF] text-[9px] font-mono-data uppercase mb-1">Economic Benefit</div>
                <div className="text-[#00F0FF] font-sans-title text-xl font-bold">-35% Cost</div>
                <div className="text-[#8FA4C5] text-[10px] font-mono-data mt-1">(vs. 3x Exposure 0.33 NA)</div>
              </div>
            </div>
          </div>

          {/* Memory Table */}
          <div className="wireframe-box flex flex-col">
            <div className="border-b border-[#4A5D7E] p-3 bg-[#4A5D7E]/10 flex items-center gap-2">
              <Database className="text-white w-4 h-4" />
              <h3 className="font-sans-title font-bold text-sm">Memory Targets</h3>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between gap-3">
              <div className="grid grid-cols-2 gap-3 border-b border-[#4A5D7E]/30 pb-3">
                <div>
                  <div className="text-[#4A5D7E] text-[9px] font-mono-data uppercase">Target Pattern</div>
                  <div className="text-white font-mono-data text-xs">Pillars / Holes</div>
                </div>
                <div>
                  <div className="text-[#4A5D7E] text-[9px] font-mono-data uppercase">Pitch</div>
                  <div className="text-white font-mono-data text-lg">28 nm</div>
                </div>
                <div>
                  <div className="text-[#4A5D7E] text-[9px] font-mono-data uppercase">LCDU</div>
                  <div className="text-white font-mono-data text-lg">1.9 - 2.2 nm</div>
                </div>
                <div>
                  <div className="text-[#4A5D7E] text-[9px] font-mono-data uppercase">Dose Target</div>
                  <div className="text-white font-mono-data text-lg">47 - 48 mJ</div>
                </div>
              </div>
              <div className="bg-[#00F0FF]/10 border border-[#00F0FF]/30 p-3 mt-auto">
                <div className="text-[#00F0FF] text-[9px] font-mono-data uppercase mb-1">Economic Benefit</div>
                <div className="text-[#00F0FF] font-sans-title text-xl font-bold">-30% to -40% Cost</div>
                <div className="text-[#8FA4C5] text-[10px] font-mono-data mt-1">(vs. Multi-patterning + DUV)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },

  // SLIDE 08: COMPLEXITY COLLAPSE
  {
    id: 'complexity-collapse',
    content: (
      <div className="w-full h-full flex flex-col justify-center">
        <div className="text-center mb-8">
          <h2 className="font-sans-title text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            Single exposure collapses manufacturing complexity
          </h2>
          <p className="text-[#8FA4C5] font-mono-data text-xs md:text-sm max-w-3xl mx-auto">
            The fundamental value of High NA is the elimination of compounded defect risk and massive cycle time reduction caused by multi-patterning logistics.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 flex-1 relative">
          
          {/* Low NA Stack */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-48 border-x border-b border-[#4A5D7E] relative flex flex-col-reverse p-1 gap-[2px]">
              {/* Generate 40 thin lines to represent 40 steps */}
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className={`w-full h-[2px] ${i%5===0 ? 'bg-[#4A5D7E]' : 'bg-[#4A5D7E]/40'}`} />
              ))}
            </div>
            <div className="mt-3 text-center">
              <div className="text-white font-mono-data text-xl font-bold">~40 Steps</div>
              <div className="text-[#8FA4C5] text-[10px] font-mono-data uppercase mt-1 max-w-[120px]">Low NA EUV Triple Exposure</div>
            </div>
          </div>

          {/* Transition Arrow */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="flex items-center text-[#00F0FF]">
               <div className="w-12 md:w-24 h-[2px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
               <ChevronRight size={20} className="ml-[-6px]" />
            </div>
            <div className="wireframe-box-cyan px-3 py-1.5 mt-3 text-center absolute top-1/2 -translate-y-1/2 bg-[#0B1320]">
              <div className="text-[#00F0FF] text-xs font-sans-title font-bold">CYCLE TIME & DEFECT COLLAPSE</div>
              <div className="text-white text-[9px] font-mono-data mt-1">Saves 1-2 days per mask</div>
            </div>
          </div>

          {/* High NA Stack */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-48 border-x border-b border-[#00F0FF]/30 relative flex flex-col-reverse p-1 gap-[4px]">
               {/* Generate 5 lines for single digits */}
               {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="w-full h-[3px] bg-[#00F0FF] shadow-[0_0_5px_rgba(0,240,255,0.5)]" />
              ))}
            </div>
            <div className="mt-3 text-center">
              <div className="text-[#00F0FF] font-mono-data text-xl font-bold">Single Digits</div>
              <div className="text-[#00F0FF] text-[10px] font-mono-data uppercase mt-1 max-w-[120px]">High NA EUV Single Exposure</div>
            </div>
          </div>

        </div>
      </div>
    )
  },

  // SLIDE 09: AVAILABILITY TRIGGER
  {
    id: 'availability-trigger',
    content: (
      <div className="w-full h-full flex flex-col justify-center">
        <h2 className="font-sans-title text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
          System availability triggers mass adoption phase
        </h2>
        <div className="flex flex-wrap gap-3 mb-4">
          <DataPoint label="Current Availability (Q3 25)" value="86.3%" />
          <DataPoint label="Mass Production Trigger" value="&gt; 90%" highlight={true} />
          <DataPoint label="Insertion Target" value="A14 2nd Gen (2028)" />
        </div>

        {/* Line Chart Area */}
        <div className="wireframe-box flex-1 relative p-4 mt-2 overflow-hidden flex flex-col min-h-[200px]">
           <div className="text-[#4A5D7E] text-[10px] font-mono-data absolute top-3 left-4 uppercase">EXE Tool Availability Trajectory</div>
           
           <div className="flex-1 w-full relative mt-6">
              {/* Y Axis Grid */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[100, 90, 80, 70, 60].map(val => (
                  <div key={val} className="w-full border-b border-[#4A5D7E]/20 flex items-center relative h-0">
                    <span className={`absolute -left-6 text-[9px] font-mono-data ${val === 90 ? 'text-[#00F0FF] font-bold' : 'text-[#4A5D7E]'}`}>{val}%</span>
                    {val === 90 && <div className="absolute w-full border-b border-[#00F0FF]/50 border-dashed" />}
                  </div>
                ))}
              </div>

              {/* Data Line (Abstracted SVG) */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <path d="M 5,90 L 15,72.5 L 30,50 L 50,34.25 L 75,25 L 95,17.5" fill="none" stroke="#4A5D7E" strokeWidth="2" />
                <path d="M 50,34.25 L 75,25 L 95,17.5" fill="none" stroke="#00F0FF" strokeWidth="2" strokeDasharray="4 4" />
                
                <circle cx="5" cy="90" r="1.5" fill="#4A5D7E" />
                <circle cx="15" cy="72.5" r="1.5" fill="#4A5D7E" />
                <circle cx="30" cy="50" r="1.5" fill="#4A5D7E" />
                <circle cx="50" cy="34.25" r="3" fill="#00F0FF" className="animate-pulse" /> {/* Current: 86.3% */}
                <circle cx="75" cy="25" r="3" fill="#00F0FF" /> {/* Target: >90% */}
              </svg>

              {/* X Axis Labels */}
              <div className="absolute bottom-[-20px] w-full flex justify-between text-[#4A5D7E] text-[9px] font-mono-data px-[5%]">
                <span>Q1 '25</span>
                <span>Q2 '25</span>
                <span>Q3 '25 (Current)</span>
                <span className="text-[#00F0FF]">Q4 '26 (Trigger)</span>
                <span>2028+ (HVM)</span>
              </div>
           </div>
        </div>
      </div>
    )
  },

  // SLIDE 10: LITHOGRAPHY SHARE EXPANSION
  {
    id: 'wfe-share',
    content: (
      <div className="w-full h-full flex flex-col justify-center">
        <h2 className="font-sans-title text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
          High NA permanently expands lithography WFE share
        </h2>
        <p className="text-[#8FA4C5] font-mono-data text-xs md:text-sm mb-6 max-w-3xl">
          Unlike multi-patterning, which dilutes lithography's share by requiring extensive etch and deposition tools, High NA structurally consolidates capital spend back into the lithography engine.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
          <div className="wireframe-box p-5 flex flex-col justify-center gap-4">
            <Layers className="text-white w-6 h-6" />
            <h3 className="font-sans-title text-lg font-bold">Consolidation Mechanic</h3>
            <p className="text-[#8FA4C5] font-mono-data text-[11px] leading-relaxed">
              By replacing 40-step multipatterning sequences with single-exposure High NA, fabs drastically cut capital expenditure on surrounding ecosystems (Deposition/Etch). 
              <br/><br/>
              The economic savings in the ecosystem fund the premium ASP of the EXE tools.
            </p>
          </div>

          <div className="wireframe-box p-5 flex flex-col justify-center items-center text-center">
            <BarChart3 className="text-white w-6 h-6 mb-4" />
            <div className="text-[#4A5D7E] font-mono-data text-[10px] uppercase mb-1">High NA System Sales</div>
            <div className="text-white font-mono-data text-3xl font-bold mb-1">15% - 20%</div>
            <div className="text-[#8FA4C5] font-mono-data text-[11px]">of total ASML system sales by end of decade</div>
          </div>

          <div className="wireframe-box-cyan p-5 flex flex-col justify-center items-center text-center relative overflow-hidden">
             <div className="absolute inset-0 blueprint-grid opacity-20" />
             <PieChart className="text-[#00F0FF] w-6 h-6 mb-4 relative z-10" />
             <div className="text-[#00F0FF] font-mono-data text-[10px] uppercase mb-1 relative z-10">Lithography WFE Share</div>
             <div className="text-[#00F0FF] font-sans-title text-4xl font-bold mb-1 relative z-10">+3 to 5</div>
             <div className="text-[#00F0FF] font-mono-data text-[11px] font-bold relative z-10">Percentage Points</div>
          </div>
        </div>
      </div>
    )
  },

  // SLIDE 11: FINANCIAL TRAJECTORY
  {
    id: 'financial-trajectory',
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center">
         <div className="text-center mb-8">
          <h2 className="font-sans-title text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            High NA drives sequential revenue scaling
          </h2>
          <p className="text-[#8FA4C5] font-mono-data text-xs md:text-sm max-w-2xl mx-auto">
            Following insertion, High NA revenues construct a formidable new pillar for total system sales, scaling aggressively toward the decade's end.
          </p>
        </div>

        <div className="w-full max-w-3xl wireframe-box p-6 relative flex flex-col">
           <div className="text-[#00F0FF] text-lg font-mono-data font-bold absolute top-6 left-6">&gt; €6 Billion</div>
           <div className="text-[#4A5D7E] text-[10px] font-mono-data absolute top-12 left-6 uppercase">Projected Annual High NA Revenue by 2030</div>
           
           <div className="h-48 flex items-end justify-between gap-2 mt-12">
             {/* Abstract Bar Chart representation */}
             {[
               { year: '2024', val: 5 },
               { year: '2025E', val: 15 },
               { year: '2026E', val: 22 },
               { year: '2027E', val: 40 },
               { year: '2028E', val: 65 },
               { year: '2029E', val: 80 },
               { year: '2030E', val: 100, highlight: true }
             ].map((col, i) => (
               <div key={i} className="flex flex-col items-center flex-1 group">
                 <div className={`w-full transition-all duration-500 ease-out group-hover:opacity-100 ${col.highlight ? 'bg-[#00F0FF]/20 border-t-2 border-l-2 border-r-2 border-[#00F0FF] opacity-100 shadow-[0_-5px_15px_rgba(0,240,255,0.15)]' : 'bg-[#4A5D7E]/20 border border-[#4A5D7E] opacity-60'}`} style={{ height: `${col.val}%` }} />
                 <div className={`mt-2 text-[9px] md:text-[10px] font-mono-data ${col.highlight ? 'text-[#00F0FF] font-bold' : 'text-[#4A5D7E]'}`}>{col.year}</div>
               </div>
             ))}
           </div>
        </div>
      </div>
    )
  },

  // SLIDE 12: VALUATION DISCONNECT
  {
    id: 'valuation-disconnect',
    content: (
      <div className="w-full h-full flex flex-col justify-center items-center">
         <h2 className="font-sans-title text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-center">
          Strategic dominance unaligned with current multiples
        </h2>

        <div className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-8">
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="wireframe-box p-4 border-l-[#4A5D7E] border-l-2">
              <div className="text-[#4A5D7E] text-[10px] font-mono-data uppercase mb-1">Growth Profile</div>
              <div className="text-white font-mono-data text-xl">16% EPS CAGR <span className="text-xs text-[#8FA4C5]">(25-30E)</span></div>
              <div className="text-[#8FA4C5] text-xs font-sans-title mt-2">Trading at only 27x FY27 P/E, below the 29x historical average despite dual growth engines.</div>
            </div>
            
            <div className="wireframe-box-cyan p-4">
              <div className="text-[#00F0FF] text-[10px] font-mono-data uppercase mb-1">Target Valuation</div>
              <div className="text-[#00F0FF] font-mono-data text-xl font-bold">DCF Base: €1,000</div>
              <div className="text-white text-xs font-sans-title mt-2">Driven by AI intensity and WFE share capture.</div>
            </div>
          </div>

          {/* Spread Chart Visual */}
          <div className="w-full md:w-1/2 flex flex-col items-center">
             <div className="text-center mb-4">
               <div className="text-white font-sans-title text-lg">P/E Premium vs. US Peers</div>
             </div>
             
             <div className="relative w-full h-32 border-l border-[#4A5D7E] pl-6 flex flex-col justify-between py-2">
                {/* Historical Band */}
                <div className="w-full relative flex items-center">
                  <div className="w-full h-10 bg-[#4A5D7E]/10 border border-[#4A5D7E] flex items-center px-4 relative">
                    <span className="text-white font-mono-data text-xs z-10">~86%</span>
                    <span className="absolute right-4 text-[#4A5D7E] font-mono-data text-[9px] uppercase z-10">10-Year Historical Avg</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="absolute left-[50%] top-10 h-10 w-0 border-l-2 border-dashed border-[#00F0FF] flex items-center justify-center">
                   <div className="bg-[#0B1320] py-1 px-1 rotate-90 text-[#00F0FF]">
                     <ChevronRight size={14} />
                   </div>
                </div>

                {/* Current Band */}
                <div className="w-full relative flex items-center">
                  <div className="w-1/4 h-10 bg-[#00F0FF]/10 border border-[#00F0FF] flex items-center px-3 relative shadow-[0_0_10px_rgba(0,240,255,0.1)]">
                    <span className="text-[#00F0FF] font-mono-data text-xs font-bold z-10">10-20%</span>
                    <span className="absolute -right-28 text-[#00F0FF] font-mono-data text-[9px] uppercase z-10 whitespace-nowrap">Current Valuation</span>
                  </div>
                </div>
             </div>
             
             <div className="text-[#8FA4C5] font-mono-data text-[10px] mt-4 text-center max-w-xs">
               The gap represents severe undervaluation of the High NA structural shift and AI infrastructure requirements.
             </div>
          </div>

        </div>
      </div>
    )
  },

  // SLIDE 13: CLOSING
  {
    id: 'closing',
    content: (
      <div className="w-full h-full flex flex-col items-center justify-center relative min-h-[60vh]">
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div className="w-[60vw] h-[60vw] border border-[#00F0FF] rounded-full" />
          <div className="absolute w-[40vw] h-[40vw] border border-[#4A5D7E] rounded-full" />
        </div>
        
        <div className="z-10 text-center max-w-3xl">
          <h1 className="font-sans-title text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            The architecture of the next decade is written in lithography.
          </h1>
          
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#00F0FF] to-transparent mx-auto mb-8 shadow-[0_0_15px_#00F0FF]" />
          
          <div className="flex flex-col items-center space-y-3 font-mono-data text-xs md:text-sm text-[#8FA4C5]">
            <p className="flex items-center"><ChevronRight className="w-3 h-3 text-[#00F0FF] mr-2" /> AI infrastructure sets the volume.</p>
            <p className="flex items-center"><ChevronRight className="w-3 h-3 text-[#00F0FF] mr-2" /> High NA EUV secures the margins.</p>
            <p className="flex items-center text-white font-bold"><ChevronRight className="w-3 h-3 text-[#00F0FF] mr-2" /> ASML owns the baseline.</p>
          </div>
        </div>
      </div>
    )
  }
];

export default ASMLPresentation;