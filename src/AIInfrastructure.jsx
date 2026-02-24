import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, ChevronLeft, Activity, Server, AlertTriangle, 
  TrendingDown, TrendingUp, DollarSign, MessageSquare, 
  BarChart3, Lock, RefreshCw, Layers
} from 'lucide-react';

export default function App() {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fixed Stage Scaling Logic
  useEffect(() => {
    const currentContainer = containerRef.current;
    if (!currentContainer) return;

    // Use ResizeObserver for accurate scaling, avoiding blank (0 scale) renders
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        // Prevent scaling to 0 if the container temporarily loses dimensions
        if (width > 0 && height > 0) {
          const scaleFactor = Math.min(width / 1280, height / 720);
          setScale(scaleFactor);
        }
      }
    });

    observer.observe(currentContainer);
    return () => observer.disconnect();
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  // --- SLIDE DEFINITIONS ---
  const slides = [
    // 0: TITLE
    <div key="slide-0" className="flex flex-col items-center justify-center h-full w-full bg-slate-950 text-white p-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" stroke="#ffffff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="z-10 text-center flex flex-col items-center">
        <Activity className="w-24 h-24 text-cyan-400 mb-8" />
        <h1 className="text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          Synthesized Insights
        </h1>
        <h2 className="text-4xl font-light text-slate-300 mb-12">
          The 7 Pillars of AI Infrastructure & Capital
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-rose-500 to-orange-500 rounded-full mb-8"></div>
        <p className="text-xl text-slate-400 max-w-3xl">
          A structural analysis of capital intensity, supply chain stress, financial divergence, and market narratives.
        </p>
      </div>
    </div>,

    // 1: EXECUTIVE SUMMARY
    <div key="slide-1" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8 border-b border-slate-700 pb-4">
        <h2 className="text-4xl font-bold text-slate-100">Executive Summary: The 7 Pillars</h2>
      </div>
      <div className="grid grid-cols-4 gap-6 flex-grow">
        {[
          { num: 1, title: "Capital Intensity", color: "bg-rose-900/50 border-rose-500", icon: <Server className="w-6 h-6 text-rose-400"/> },
          { num: 2, title: "Supply Chain Stress", color: "bg-rose-900/50 border-rose-500", icon: <AlertTriangle className="w-6 h-6 text-rose-400"/> },
          { num: 3, title: "Financial Divergence", color: "bg-rose-900/50 border-rose-500", icon: <TrendingDown className="w-6 h-6 text-rose-400"/> },
          { num: 4, title: "Narrative Inflation", color: "bg-amber-900/50 border-amber-500", icon: <MessageSquare className="w-6 h-6 text-amber-400"/> },
          { num: 5, title: "Demand Quality", color: "bg-amber-900/50 border-amber-500", icon: <BarChart3 className="w-6 h-6 text-amber-400"/> },
          { num: 6, title: "Circular Capital", color: "bg-rose-900/50 border-rose-500", icon: <RefreshCw className="w-6 h-6 text-rose-400"/> },
          { num: 7, title: "AI Debt & Leverage", color: "bg-rose-900/50 border-rose-500", icon: <Lock className="w-6 h-6 text-rose-400"/> }
        ].map(pillar => (
          <div key={pillar.num} className={`border-l-4 p-6 rounded-r-xl shadow-lg flex flex-col bg-slate-800/50 ${pillar.color}`}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold text-slate-400">0{pillar.num}</span>
              {pillar.icon}
            </div>
            <h3 className="text-xl font-semibold">{pillar.title}</h3>
          </div>
        ))}
        <div className="col-span-1 flex items-center justify-center p-6 bg-slate-800/30 border border-slate-700 rounded-xl">
          <p className="text-slate-400 text-center italic">The system is exhibiting profound structural shifts across capital, supply, and narratives.</p>
        </div>
      </div>
    </div>,

    // 2: PILLAR 1 INTRO
    <div key="slide-2" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-rose-500/20 rounded-lg"><Server className="w-8 h-8 text-rose-500"/></div>
        <div>
          <h4 className="text-rose-500 font-bold tracking-widest text-sm uppercase">Pillar 1</h4>
          <h2 className="text-5xl font-bold text-slate-100">Capital Intensity</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12 flex-grow">
        <div className="flex flex-col justify-center space-y-8">
          <h3 className="text-3xl font-light text-cyan-300">Scale, simultaneity, and irreversibility</h3>
          <ul className="space-y-6 text-xl text-slate-300">
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Hyperscaler AI CapEx has step‑changed into the <strong>$700–750B forward run‑rate</strong>.</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Concentrated across Amazon, Alphabet, Meta, Microsoft, Oracle, neoclouds.</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> AI infra now contributes <strong>~1.2ppt to GDP growth</strong> (largest tech share in 20+ years).</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Spending is front-loaded with limited modularity (power, land, data centers).</li>
          </ul>
        </div>
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col justify-center">
          <h4 className="text-2xl font-semibold mb-6 text-white border-b border-slate-600 pb-4">Structural Impact</h4>
          <ul className="space-y-6 text-lg text-slate-300">
            <li className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg">Breakeven utilization thresholds rise materially.</li>
            <li className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg">Capital recovery relies on sustained demand + pricing discipline.</li>
            <li className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg"><span className="text-rose-400 font-bold">Risk:</span> Intensity is rising faster than visibility.</li>
          </ul>
        </div>
      </div>
    </div>,

    // 3: PILLAR 1 DATA
    <div key="slide-3" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Capital Intensity: The Quantitative View</h2>
      </div>
      <div className="grid grid-cols-3 gap-8 flex-grow">
        {/* Chart 1: Stacked CapEx */}
        <div className="col-span-2 bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-center">Top 6 Hyperscalers Forward CapEx Run-Rate</h3>
          
          <div className="flex-grow relative mt-4 min-h-[300px]">
            {/* Target Line */}
            <div className="absolute top-[30%] left-0 w-full border-t border-dashed border-slate-600 z-0">
              <span className="absolute -top-6 left-4 text-xs text-slate-400">$750B Target</span>
            </div>
            
            <div className="absolute inset-0 flex items-end justify-around pb-8 pt-12">
              {/* Bars */}
              {['2022', '2023', '2024', '2025E', '2026E'].map((year, i) => (
                <div key={year} className="flex flex-col items-center justify-end w-1/6 z-10 h-full">
                  <div 
                    className="w-full max-w-[80px] bg-cyan-500 rounded-t-md transition-all duration-1000 shadow-[0_0_15px_rgba(6,182,212,0.2)]" 
                    style={{ height: `${20 + i*16}%` }}
                  ></div>
                  <span className="mt-4 text-sm font-medium">{year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GDP & Visibility Gauge */}
        <div className="col-span-1 flex flex-col gap-8">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex-grow flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold mb-6 text-center">Commitments vs Visibility</h3>
            <div className="relative w-48 h-24 overflow-hidden">
              <div className="absolute top-0 left-0 w-48 h-48 border-[24px] border-slate-700 rounded-full"></div>
              <div className="absolute top-0 left-0 w-48 h-48 border-[24px] border-rose-500 rounded-full border-t-transparent border-r-transparent transform rotate-45"></div>
            </div>
            <div className="mt-4 text-center">
              <span className="text-rose-400 font-bold text-2xl">High Risk</span>
              <p className="text-xs text-slate-400 mt-1">Visibility lags commitments</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-900 to-slate-800 p-6 rounded-xl border border-blue-800 flex-grow flex flex-col justify-center">
            <h3 className="text-lg font-semibold mb-2 text-cyan-300">GDP Contribution</h3>
            <div className="text-5xl font-bold text-white mb-2">+1.2<span className="text-2xl text-cyan-400">ppt</span></div>
            <p className="text-sm text-slate-300">Largest tech-driven share of GDP growth in over 20 years.</p>
          </div>
        </div>
      </div>
    </div>,

    // 4: PILLAR 2 INTRO
    <div key="slide-4" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-rose-500/20 rounded-lg"><AlertTriangle className="w-8 h-8 text-rose-500"/></div>
        <div>
          <h4 className="text-rose-500 font-bold tracking-widest text-sm uppercase">Pillar 2</h4>
          <h2 className="text-5xl font-bold text-slate-100">Supply Chain Stress</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12 flex-grow">
        <div className="flex flex-col justify-center space-y-8">
          <h3 className="text-3xl font-light text-cyan-300">Persistent bottlenecks despite massive spend</h3>
          <ul className="space-y-6 text-xl text-slate-300">
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Advanced-node and AI‑specific supply explicitly constrained through <strong>2026–2027</strong> (TSMC guidance).</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Three years of elevated investment have <strong>not cleared</strong> bottlenecks in logic, memory, CoWoS, and testing.</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Minor relief from policy (e.g., tariff reversals), but structural AI‑specific constraints dominate.</li>
          </ul>
        </div>
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col justify-center">
          <h4 className="text-2xl font-semibold mb-6 text-white border-b border-slate-600 pb-4">Structural Impact</h4>
          <ul className="space-y-6 text-lg text-slate-300">
            <li className="p-4 bg-orange-950/30 border border-orange-900/50 rounded-lg">Prolonged tightness fundamentally distorts price signals.</li>
            <li className="p-4 bg-orange-950/30 border border-orange-900/50 rounded-lg">Encourages panic behavior: over‑ordering, pre‑commitments, and huge inventory risks.</li>
            <li className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg"><span className="text-rose-400 font-bold">Future Risk:</span> High probability of severe air pockets once supply clears.</li>
          </ul>
        </div>
      </div>
    </div>,

    // 5: PILLAR 2 DATA
    <div key="slide-5" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Supply Chain: Constraint Timelines</h2>
      </div>
      <div className="flex-grow flex flex-col gap-6 bg-slate-800 p-8 rounded-xl border border-slate-700">
        <div className="flex justify-between text-slate-400 font-bold border-b border-slate-600 pb-2 px-48">
          <span>2024</span><span>2025</span><span>2026</span><span>2027</span>
        </div>
        
        {/* Timeline rows */}
        <div className="flex items-center gap-4">
          <div className="w-48 text-right font-semibold text-lg">Foundry (Logic)</div>
          <div className="flex-grow h-12 bg-slate-900 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[80%] bg-gradient-to-r from-rose-600 to-rose-400 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold drop-shadow-md">Constrained thru mid-2027</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-48 text-right font-semibold text-lg">HBM Memory</div>
          <div className="flex-grow h-12 bg-slate-900 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[65%] bg-gradient-to-r from-orange-600 to-orange-400 rounded-full"></div>
            <div className="absolute inset-0 flex items-center pr-32 justify-end text-sm font-bold drop-shadow-md">Easing late-2026</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-48 text-right font-semibold text-lg">Packaging (CoWoS)</div>
          <div className="flex-grow h-12 bg-slate-900 rounded-full relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-[95%] bg-gradient-to-r from-red-700 to-red-500 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold drop-shadow-md">Critical Bottleneck thru 2027</div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <div className="flex-1 bg-slate-900 p-6 rounded-lg border border-slate-700">
            <h4 className="text-cyan-400 font-bold mb-2">Policy Relief Split</h4>
            <div className="flex h-6 rounded-full overflow-hidden">
              <div className="bg-emerald-500 w-[15%] flex items-center justify-center text-xs font-bold">15%</div>
              <div className="bg-rose-500 w-[85%] flex items-center justify-center text-xs font-bold">85% Structural Constraint</div>
            </div>
            <p className="text-xs text-slate-400 mt-2">Tariff reversals provide minimal relief compared to core AI-specific capacity limits.</p>
          </div>
        </div>
      </div>
    </div>,

    // 6: PILLAR 3 INTRO
    <div key="slide-6" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-rose-500/20 rounded-lg"><TrendingDown className="w-8 h-8 text-rose-500"/></div>
        <div>
          <h4 className="text-rose-500 font-bold tracking-widest text-sm uppercase">Pillar 3</h4>
          <h2 className="text-5xl font-bold text-slate-100">Financial Divergence</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12 flex-grow">
        <div className="flex flex-col justify-center space-y-8">
          <h3 className="text-3xl font-light text-cyan-300">Prices, earnings, and capital flows sever ties</h3>
          <ul className="space-y-6 text-xl text-slate-300">
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Severe <strong>software multiple compression</strong>—the worst relative underperformance since the Dot‑Com bubble.</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Compression occurring <em>despite</em> positive EPS expectations.</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Extreme dispersion: Infra beneficiaries soar vs. Software/App losers plummet.</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Private valuations accelerating rapidly while public comparables de‑rate.</li>
          </ul>
        </div>
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col justify-center">
          <h4 className="text-2xl font-semibold mb-6 text-white border-b border-slate-600 pb-4">Structural Impact</h4>
          <ul className="space-y-6 text-lg text-slate-300">
            <li className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg">Signals deep market disagreement on the <strong>durability</strong> of cash flows, not just near‑term earnings.</li>
            <li className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg">Widens the dangerous gap between public price discovery and private mark‑to‑model.</li>
            <li className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg"><span className="text-rose-400 font-bold">Risk:</span> Massive potential for abrupt re-alignment.</li>
          </ul>
        </div>
      </div>
    </div>,

    // 7: PILLAR 3 DATA
    <div key="slide-7" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Financial Divergence: The Valuation Chasm</h2>
      </div>
      <div className="grid grid-cols-2 gap-8 flex-grow">
        {/* Private vs Public Divergence */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col">
          <h3 className="text-xl font-semibold mb-6 text-center">Public vs Private Valuation Spread</h3>
          <div className="flex-grow relative border-l-2 border-b-2 border-slate-600 mt-4 ml-8 mb-8">
            {/* Y axis labels */}
            <div className="absolute -left-12 bottom-0 text-xs text-slate-400">Low</div>
            <div className="absolute -left-12 top-0 text-xs text-slate-400">High</div>
            {/* Lines */}
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              {/* Public Line - Trending Down */}
              <path d="M 0,20 Q 150,50 300,150 T 500,250" fill="none" stroke="#3b82f6" strokeWidth="4" />
              {/* Private Line - Trending Up */}
              <path d="M 0,150 Q 150,150 300,50 T 500,20" fill="none" stroke="#f43f5e" strokeWidth="4" />
            </svg>
            <div className="absolute top-4 right-4 text-rose-500 font-bold bg-slate-900 p-2 rounded">Private Marks Accelerating</div>
            <div className="absolute bottom-4 right-4 text-blue-500 font-bold bg-slate-900 p-2 rounded">Public Comps De-rating</div>
          </div>
        </div>
        
        {/* Infra vs Software & EPS vs Multiple */}
        <div className="flex flex-col gap-8">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex-grow">
            <h3 className="text-lg font-semibold mb-4 text-center">Infra vs. Software Disconnect</h3>
            <div className="flex justify-between items-end h-32 px-12">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 bg-emerald-500 h-28 rounded-t-md"></div>
                <span className="text-sm font-bold">Infra</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 bg-rose-500 h-10 rounded-t-md"></div>
                <span className="text-sm font-bold">Software</span>
              </div>
            </div>
          </div>
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex-grow">
            <h3 className="text-lg font-semibold mb-2 text-center">Software Multiple Compression</h3>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex justify-between items-center text-sm">
                <span>EPS Expectations</span>
                <span className="text-emerald-400 font-bold">Positive (+)</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded"><div className="bg-emerald-500 w-3/4 h-2 rounded"></div></div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span>Market Multiples</span>
                <span className="text-rose-400 font-bold">Crashing (-)</span>
              </div>
              <div className="w-full bg-slate-700 h-2 rounded flex justify-end"><div className="bg-rose-500 w-1/2 h-2 rounded"></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // 8: PILLAR 4 INTRO
    <div key="slide-8" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-amber-500/20 rounded-lg"><MessageSquare className="w-8 h-8 text-amber-500"/></div>
        <div>
          <h4 className="text-amber-500 font-bold tracking-widest text-sm uppercase">Pillar 4</h4>
          <h2 className="text-5xl font-bold text-slate-100">Narrative Inflation</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12 flex-grow">
        <div className="flex flex-col justify-center space-y-8">
          <h3 className="text-3xl font-light text-cyan-300">Language moving faster than monetization</h3>
          <ul className="space-y-6 text-xl text-slate-300">
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Proliferation of extreme framing terms: <span className="text-amber-300 italic">"agentic"</span>, <span className="text-amber-300 italic">"unprecedented"</span>, <span className="text-amber-300 italic">"paradigm shift"</span>.</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Broad, indiscriminate selloffs across multiple sectors attributed purely to "AI disruption" narratives.</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Adoption metrics (seats, pilots) are emphasized far heavily over realized revenue impact.</li>
          </ul>
        </div>
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-[-20%] right-[-10%] text-[150px] font-black text-slate-700/20">HYPE</div>
          <h4 className="text-2xl font-semibold mb-6 text-white border-b border-slate-600 pb-4 relative z-10">Structural Impact</h4>
          <ul className="space-y-6 text-lg text-slate-300 relative z-10">
            <li className="p-4 bg-amber-950/30 border border-amber-900/50 rounded-lg">Narrative volatility massively increases capital misallocation risk.</li>
            <li className="p-4 bg-amber-950/30 border border-amber-900/50 rounded-lg">Raises market sensitivity to disappointment, even without a true demand collapse.</li>
            <li className="p-4 bg-amber-950/30 border border-amber-900/50 rounded-lg">Encourages dangerous <em>"sell first, ask later"</em> market behavior.</li>
          </ul>
        </div>
      </div>
    </div>,

    // 9: PILLAR 4 DATA
    <div key="slide-9" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Narrative vs. Reality</h2>
      </div>
      <div className="grid grid-cols-2 gap-12 flex-grow">
        <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 flex flex-col items-center justify-center relative">
          <h3 className="text-xl font-semibold mb-8 absolute top-8 text-center w-full">Narrative Intensity Index</h3>
          
          <div className="w-full flex justify-center items-end h-64 gap-6 px-12">
            <div className="w-1/3 bg-cyan-900 flex flex-col justify-end h-[40%] rounded-t-lg relative group">
              <div className="absolute -top-8 w-full text-center text-sm font-bold text-cyan-400">Pre-2023</div>
            </div>
            <div className="w-1/3 bg-amber-600 flex flex-col justify-end h-[95%] rounded-t-lg relative shadow-[0_0_30px_rgba(217,119,6,0.5)]">
               <div className="absolute -top-12 w-full text-center">
                 <div className="text-xl font-bold text-amber-400">"Agentic"</div>
                 <div className="text-xs text-amber-200">Current Phase</div>
               </div>
            </div>
          </div>
          <p className="mt-8 text-center text-slate-400">Mentions of paradigm-shifting terms in earnings calls vs historical baseline.</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex-grow flex flex-col justify-center">
             <h3 className="text-lg font-semibold mb-6">Adoption vs Revenue Delta</h3>
             
             <div className="space-y-6">
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span>Reported AI Adoption (Pilots/Seats)</span>
                   <span className="text-emerald-400 font-bold">+85%</span>
                 </div>
                 <div className="w-full bg-slate-900 h-4 rounded-full overflow-hidden">
                   <div className="bg-emerald-500 h-full w-[85%]"></div>
                 </div>
               </div>
               
               <div>
                 <div className="flex justify-between text-sm mb-1">
                   <span>Realized AI Revenue Impact</span>
                   <span className="text-rose-400 font-bold">+12%</span>
                 </div>
                 <div className="w-full bg-slate-900 h-4 rounded-full overflow-hidden">
                   <div className="bg-rose-500 h-full w-[12%]"></div>
                 </div>
               </div>
             </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="text-lg font-semibold mb-4 text-amber-400 flex items-center gap-2"><TrendingDown className="w-5 h-5"/> Indiscriminate Selloffs</h3>
            <p className="text-sm text-slate-300">
              Sector selloff correlation matrix shows non-tech sectors suffering severe valuation hits purely on unquantified "AI disruption" fears, completely detached from fundamental earnings shifts.
            </p>
          </div>
        </div>
      </div>
    </div>,

    // 10: PILLAR 5 INTRO
    <div key="slide-10" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-amber-500/20 rounded-lg"><BarChart3 className="w-8 h-8 text-amber-500"/></div>
        <div>
          <h4 className="text-amber-500 font-bold tracking-widest text-sm uppercase">Pillar 5</h4>
          <h2 className="text-5xl font-bold text-slate-100">Demand Quality</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12 flex-grow">
        <div className="flex flex-col justify-center space-y-8">
          <h3 className="text-3xl font-light text-cyan-300">Real demand exists, but it is highly uneven</h3>
          <p className="text-xl text-slate-300">AI adoption is approaching peak acceleration in the 2025–2026 window.</p>
          
          <div className="grid grid-cols-2 gap-6">
             <div className="bg-emerald-950/40 p-6 rounded-xl border border-emerald-900/50">
               <h5 className="text-emerald-400 font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5"/> Durable Signals</h5>
               <ul className="space-y-2 text-sm text-slate-300">
                 <li>• Infrastructure</li>
                 <li>• Networking</li>
                 <li>• Bespoke enterprise AI</li>
               </ul>
             </div>
             <div className="bg-rose-950/40 p-6 rounded-xl border border-rose-900/50">
               <h5 className="text-rose-400 font-bold mb-4 flex items-center gap-2"><TrendingDown className="w-5 h-5"/> Weakening Signals</h5>
               <ul className="space-y-2 text-sm text-slate-300">
                 <li>• Enterprise software renewals</li>
                 <li>• Consumer hardware units</li>
                 <li>• Volume-driven growth</li>
               </ul>
             </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col justify-center">
          <h4 className="text-2xl font-semibold mb-6 text-white border-b border-slate-600 pb-4">Structural Impact</h4>
          <ul className="space-y-6 text-lg text-slate-300">
            <li className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg">Pull‑forward dynamics raise the explicit risk of upcoming <strong>demand digestion phases</strong>.</li>
            <li className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg">Fierce ROI scrutiny is rising precisely as spend levels remain historically high.</li>
            <li className="p-4 bg-blue-950/30 border border-blue-900/50 rounded-lg text-cyan-300"><strong>Conclusion:</strong> Demand durability is bifurcated, not collapsing.</li>
          </ul>
        </div>
      </div>
    </div>,

    // 11: PILLAR 5 DATA
    <div key="slide-11" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Demand Quality: Bifurcation Metrics</h2>
      </div>
      <div className="grid grid-cols-2 gap-8 flex-grow">
        {/* Adoption Curve */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex flex-col relative">
          <h3 className="text-xl font-semibold mb-4 text-center">Adoption Acceleration Curve</h3>
          <div className="flex-grow w-full relative">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              {/* Grid */}
              <line x1="0" y1="50" x2="100" y2="50" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2"/>
              <line x1="50" y1="0" x2="50" y2="100" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2"/>
              {/* S Curve */}
              <path d="M 0,90 C 40,90 40,10 80,10 L 100,10" fill="none" stroke="#06b6d4" strokeWidth="2" />
              {/* Marker */}
              <circle cx="50" cy="50" r="2" fill="#f59e0b" />
              <rect x="40" y="20" width="30" height="15" fill="#1e293b" stroke="#f59e0b" strokeWidth="0.5" rx="2" />
              <text x="55" y="30" fill="#f59e0b" fontSize="4" textAnchor="middle">2025-26 Peak</text>
            </svg>
            <div className="absolute bottom-4 right-4 text-xs text-slate-400">Time →</div>
          </div>
        </div>

        {/* Pricing vs Volume & Durable vs Fragile */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex-grow flex flex-col justify-center">
            <h3 className="text-lg font-semibold mb-4 text-center">Growth Contribution: Pricing vs Volume</h3>
            <div className="flex h-12 bg-slate-900 rounded-lg overflow-hidden border border-slate-600">
              <div className="w-[80%] bg-blue-600 flex items-center justify-center text-sm font-bold shadow-inner">
                Pricing-Driven (80%)
              </div>
              <div className="w-[20%] bg-rose-500 flex items-center justify-center text-sm font-bold shadow-inner">
                Volume (20%)
              </div>
            </div>
            <p className="text-xs text-slate-400 text-center mt-3">High reliance on pricing indicates fragile long-term volume scaling.</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex-grow">
            <h3 className="text-lg font-semibold mb-4">Durable vs Fragile Split</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Infra / Networking</span>
                <span className="text-emerald-400 text-sm font-bold border border-emerald-500/30 px-2 py-1 rounded bg-emerald-950/30">Durable</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Bespoke Enterprise AI</span>
                <span className="text-emerald-400 text-sm font-bold border border-emerald-500/30 px-2 py-1 rounded bg-emerald-950/30">Durable</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-700 pt-4">
                <span className="text-sm">SaaS Renewals</span>
                <span className="text-rose-400 text-sm font-bold border border-rose-500/30 px-2 py-1 rounded bg-rose-950/30">Fragile</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Consumer Hardware</span>
                <span className="text-rose-400 text-sm font-bold border border-rose-500/30 px-2 py-1 rounded bg-rose-950/30">Fragile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // 12: PILLAR 6 INTRO
    <div key="slide-12" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-rose-500/20 rounded-lg"><RefreshCw className="w-8 h-8 text-rose-500"/></div>
        <div>
          <h4 className="text-rose-500 font-bold tracking-widest text-sm uppercase">Pillar 6</h4>
          <h2 className="text-5xl font-bold text-slate-100">Cross‑Financing & Circular Capital</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12 flex-grow">
        <div className="flex flex-col justify-center space-y-8">
          <h3 className="text-3xl font-light text-cyan-300">Capital recycling replacing organic price discovery</h3>
          <ul className="space-y-6 text-xl text-slate-300">
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Multitier / back‑to‑back funding rounds with wildly different valuations within days.</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Large‑scale secondary liquidity (e.g., OpenAI, Anthropic) executing at near‑primary valuations, <strong>without injecting new operating capital</strong>.</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Affiliated balance sheets (insurers, tech platforms) are absorbing risk entirely internally.</li>
          </ul>
        </div>
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col justify-center">
          <h4 className="text-2xl font-semibold mb-6 text-white border-b border-slate-600 pb-4">Structural Impact</h4>
          <ul className="space-y-6 text-lg text-slate-300">
            <li className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg">Completely breaks single-price discovery mechanisms.</li>
            <li className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg">Anchors valuations via internal liquidity events rather than external market clearing.</li>
            <li className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg">Massively deepens systemic interconnectedness and opacity across the ecosystem.</li>
          </ul>
        </div>
      </div>
    </div>,

    // 13: PILLAR 6 DATA
    <div key="slide-13" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">The Circular Ecosystem</h2>
      </div>
      <div className="grid grid-cols-5 gap-8 flex-grow">
        <div className="col-span-3 bg-slate-800 p-8 rounded-xl border border-slate-700 relative overflow-hidden flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-center z-10">Circular Capital Flow Network</h3>
          <div className="flex-grow relative mt-8">
            {/* Network Nodes */}
            <div className="absolute top-[10%] left-[40%] w-24 h-24 bg-blue-600 rounded-full flex flex-col items-center justify-center z-20 shadow-lg border-4 border-slate-800">
              <span className="font-bold text-sm">Big Tech</span>
            </div>
            <div className="absolute top-[60%] left-[15%] w-20 h-20 bg-rose-600 rounded-full flex flex-col items-center justify-center z-20 shadow-lg border-4 border-slate-800 text-center leading-tight">
              <span className="font-bold text-xs">Foundation</span>
            </div>
            <div className="absolute top-[60%] left-[65%] w-20 h-20 bg-emerald-600 rounded-full flex flex-col items-center justify-center z-20 shadow-lg border-4 border-slate-800 text-center leading-tight">
              <span className="font-bold text-xs">Cloud/Infra</span>
            </div>
            
            {/* SVG Lines indicating circular flow */}
            <svg className="absolute inset-0 w-full h-full z-10" pointerEvents="none">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                </marker>
              </defs>
              {/* Lines */}
              <path d="M 230,80 Q 120,100 130,220" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
              <path d="M 150,220 Q 250,280 340,220" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
              <path d="M 320,200 Q 380,100 280,80" fill="none" stroke="#94a3b8" strokeWidth="3" strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
            </svg>
            <div className="absolute top-[40%] left-[20%] text-xs text-slate-300 bg-slate-900/80 px-2 py-1 rounded">Compute Credits</div>
            <div className="absolute bottom-[20%] left-[45%] text-xs text-slate-300 bg-slate-900/80 px-2 py-1 rounded">Equity Swap</div>
            <div className="absolute top-[40%] right-[20%] text-xs text-slate-300 bg-slate-900/80 px-2 py-1 rounded">Hardware Rev</div>
          </div>
        </div>
        
        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex-grow flex flex-col justify-center">
            <h3 className="text-lg font-semibold mb-4 text-center">Primary vs Secondary Spread</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center text-sm font-bold">
                <span>Primary Raise</span>
                <span className="text-slate-300">$80B Val</span>
              </div>
              <div className="w-full bg-slate-700 h-6 rounded overflow-hidden">
                <div className="bg-blue-500 h-full w-[100%]"></div>
              </div>
              <div className="flex justify-between items-center text-sm font-bold mt-4">
                <span>Secondary Liquidity</span>
                <span className="text-rose-400">~$78B Val (Near Parity)</span>
              </div>
              <div className="w-full bg-slate-700 h-6 rounded overflow-hidden">
                <div className="bg-rose-500 h-full w-[95%]"></div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 italic text-center">No new operating capital injected despite massive valuation markers.</p>
          </div>
        </div>
      </div>
    </div>,

    // 14: PILLAR 7 INTRO
    <div key="slide-14" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 bg-rose-500/20 rounded-lg"><Lock className="w-8 h-8 text-rose-500"/></div>
        <div>
          <h4 className="text-rose-500 font-bold tracking-widest text-sm uppercase">Pillar 7</h4>
          <h2 className="text-5xl font-bold text-slate-100">AI Debt & Leverage Dynamics</h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12 flex-grow">
        <div className="flex flex-col justify-center space-y-8">
          <h3 className="text-3xl font-light text-cyan-300">Stress appearing first on the liability side</h3>
          <ul className="space-y-6 text-xl text-slate-300">
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Massive surge in AI‑linked <strong>convertible issuance</strong> (zero‑coupon, mandatory converts).</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Private credit is gating capital, forcing asset sales, and accelerating capital returns (e.g., Blue Owl dynamics).</li>
            <li className="flex items-start gap-3"><ChevronRight className="w-6 h-6 text-cyan-400 mt-1 flex-shrink-0"/> Software‑heavy private credit portfolios face severe public‑market repricing before NAVs can formally adjust.</li>
          </ul>
        </div>
        <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 flex flex-col justify-center">
          <h4 className="text-2xl font-semibold mb-6 text-white border-b border-slate-600 pb-4">Structural Impact</h4>
          <ul className="space-y-6 text-lg text-slate-300">
            <li className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg">Convertibles defer immediate pain but vastly increase future equity & volatility sensitivity.</li>
            <li className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg">Gating + forced asset sales = a harsh <strong>regime shift</strong> in liquidity management.</li>
            <li className="p-4 bg-rose-950/30 border border-rose-900/50 rounded-lg font-bold text-rose-400">Credit stress is manifesting BEFORE any real demand collapse.</li>
          </ul>
        </div>
      </div>
    </div>,

    // 15: PILLAR 7 DATA
    <div key="slide-15" className="flex flex-col h-full w-full bg-slate-900 text-white p-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-100">Liability-Side Stress Profile</h2>
      </div>
      <div className="grid grid-cols-3 gap-8 flex-grow">
        <div className="col-span-1 bg-slate-800 p-8 rounded-xl border border-slate-700 flex flex-col items-center justify-center">
          <h3 className="text-xl font-semibold mb-8 text-center">Liability Stress Meter</h3>
          <div className="relative w-48 h-48 rounded-full border-[20px] border-slate-700 flex items-center justify-center">
             <svg className="absolute inset-0 w-full h-full transform -rotate-90">
               <circle cx="50%" cy="50%" r="42%" fill="none" stroke="#f43f5e" strokeWidth="20" strokeDasharray="264" strokeDashoffset="40" strokeLinecap="round" />
             </svg>
             <div className="text-center">
               <span className="text-4xl font-black text-rose-500">SEVERE</span>
             </div>
          </div>
          <p className="mt-8 text-center text-sm text-slate-400">Stress manifesting in credit before demand collapse.</p>
        </div>

        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex-grow">
             <h3 className="text-lg font-semibold mb-4">Debt Issuance Shift</h3>
             <div className="flex items-end h-32 gap-8 justify-center border-b border-slate-600 pb-2">
                <div className="flex flex-col items-center gap-2">
                   <div className="w-24 bg-slate-600 h-12 rounded-t flex items-center justify-center text-xs font-bold text-slate-300">Straight</div>
                   <span className="text-sm">2022</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                   <div className="w-24 bg-rose-500 h-28 rounded-t flex items-center justify-center text-xs font-bold text-white">Convertible</div>
                   <span className="text-sm">2024</span>
                </div>
             </div>
             <p className="text-center text-xs text-slate-400 mt-2">Explosion in zero-coupon and mandatory convertibles defers pain.</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 flex-grow">
            <h3 className="text-lg font-semibold mb-4 text-rose-400 flex items-center gap-2"><Lock className="w-5 h-5"/> Private Credit Redemptions</h3>
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                 <div className="w-32 text-sm text-right text-slate-400">Gating Actions</div>
                 <div className="flex-grow h-4 bg-slate-900 rounded"><div className="h-full bg-rose-600 rounded w-[80%]"></div></div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-32 text-sm text-right text-slate-400">Forced Asset Sales</div>
                 <div className="flex-grow h-4 bg-slate-900 rounded"><div className="h-full bg-orange-500 rounded w-[60%]"></div></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>,

    // 16: MASTER DASHBOARD (The requested visual synthesis)
    <div key="slide-16" className="flex flex-col h-full w-full bg-slate-950 text-white p-6 gap-4">
      {/* Top Row: Pillar Heat-Map & Liability Banner */}
      <div className="flex h-24 gap-4">
        <div className="w-2/3 bg-slate-900 border border-slate-800 rounded-lg p-3 flex flex-col">
          <div className="text-xs text-slate-400 uppercase tracking-widest mb-2 font-bold">Pillar Heat-Map</div>
          <div className="flex gap-2 flex-grow">
            <div className="flex-1 bg-rose-900/60 rounded border border-rose-500/50 flex items-center justify-center text-xs font-bold text-rose-300">Cap Intensity</div>
            <div className="flex-1 bg-rose-900/60 rounded border border-rose-500/50 flex items-center justify-center text-xs font-bold text-rose-300">Supply Stress</div>
            <div className="flex-1 bg-orange-900/60 rounded border border-orange-500/50 flex items-center justify-center text-xs font-bold text-orange-300">Fin Diverge</div>
            <div className="flex-1 bg-orange-900/60 rounded border border-orange-500/50 flex items-center justify-center text-xs font-bold text-orange-300">Narrative</div>
            <div className="flex-1 bg-blue-900/60 rounded border border-blue-500/50 flex items-center justify-center text-xs font-bold text-blue-300 text-center leading-tight">Demand Bifurcation</div>
            <div className="flex-1 bg-rose-900/60 rounded border border-rose-500/50 flex items-center justify-center text-xs font-bold text-rose-300 text-center leading-tight">Circular Capital</div>
          </div>
        </div>
        <div className="w-1/3 bg-gradient-to-r from-rose-950 to-rose-900 border border-rose-600 rounded-lg p-4 flex items-center gap-4">
          <AlertTriangle className="w-10 h-10 text-rose-500 animate-pulse" />
          <div>
            <div className="text-xs text-rose-300 font-bold uppercase tracking-wider">Pillar 7 Alert</div>
            <div className="text-sm font-semibold text-white">Liability-Side Stress Critical</div>
            <div className="text-xs text-rose-200 mt-1">Gating & Converts accelerating</div>
          </div>
        </div>
      </div>

      {/* Middle Row: CapEx Timeline + Circular Network */}
      <div className="flex h-64 gap-4">
        <div className="w-1/2 bg-slate-900 border border-slate-800 rounded-lg p-4 relative flex flex-col">
           <div className="text-xs text-slate-400 uppercase tracking-widest mb-4 font-bold">CapEx + Constraints</div>
           <div className="flex-grow flex items-end justify-between px-4 pb-4">
              <div className="w-8 bg-cyan-800 h-[30%]"></div>
              <div className="w-8 bg-cyan-700 h-[50%] relative"><div className="absolute -top-6 -left-4 text-xs text-rose-400 w-24 border-b border-rose-500">Supply Limit</div></div>
              <div className="w-8 bg-cyan-600 h-[80%]"></div>
              <div className="w-8 bg-rose-600 h-[100%] shadow-[0_0_15px_rgba(225,29,72,0.6)]"></div>
           </div>
           <div className="absolute top-1/2 left-0 w-full h-[1px] bg-rose-500/50 border-t border-dashed border-rose-500"></div>
        </div>
        <div className="w-1/2 bg-slate-900 border border-slate-800 rounded-lg p-4 relative overflow-hidden">
          <div className="text-xs text-slate-400 uppercase tracking-widest font-bold">Circular Capital Flows</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-slate-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-slate-500 rounded-full animate-[spin_10s_linear_infinite] border-dashed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-rose-600 p-3 rounded-full z-10 text-xs font-bold shadow-lg">Internal Liquidity</div>
          {/* Nodes */}
          <div className="absolute top-[20%] left-[20%] bg-blue-600 w-4 h-4 rounded-full"></div>
          <div className="absolute bottom-[20%] right-[20%] bg-emerald-600 w-4 h-4 rounded-full"></div>
          <div className="absolute bottom-[20%] left-[20%] bg-amber-600 w-4 h-4 rounded-full"></div>
        </div>
      </div>

      {/* Bottom Row: Demand + Divergence + Narrative */}
      <div className="flex h-52 gap-4">
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col">
          <div className="text-xs text-slate-400 uppercase tracking-widest mb-4 font-bold">Demand Bifurcation</div>
          <div className="flex flex-col gap-3 flex-grow justify-center">
            <div className="flex justify-between items-center text-xs"><span>Infra</span><span className="text-emerald-400">Strong</span></div>
            <div className="w-full h-1 bg-slate-800"><div className="w-full h-full bg-emerald-500"></div></div>
            <div className="flex justify-between items-center text-xs mt-2"><span>SaaS</span><span className="text-rose-400">Weak</span></div>
            <div className="w-full h-1 bg-slate-800"><div className="w-[30%] h-full bg-rose-500"></div></div>
          </div>
        </div>
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col relative overflow-hidden">
          <div className="text-xs text-slate-400 uppercase tracking-widest mb-4 font-bold">Public/Private Gap</div>
          <svg className="absolute inset-0 w-full h-full mt-8 px-4" preserveAspectRatio="none">
             <path d="M 10,80 Q 80,80 150,20" fill="none" stroke="#f43f5e" strokeWidth="3" />
             <path d="M 10,20 Q 80,40 150,90" fill="none" stroke="#3b82f6" strokeWidth="3" />
          </svg>
        </div>
        <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col">
          <div className="text-xs text-slate-400 uppercase tracking-widest mb-4 font-bold">Narrative vs Numbers</div>
          <div className="flex flex-col gap-4 flex-grow justify-center">
            <div className="flex gap-2 items-center"><MessageSquare className="w-4 h-4 text-amber-500"/><div className="h-4 bg-amber-500 w-[90%] rounded"></div></div>
            <div className="flex gap-2 items-center"><DollarSign className="w-4 h-4 text-emerald-500"/><div className="h-4 bg-emerald-500 w-[20%] rounded"></div></div>
          </div>
        </div>
      </div>
    </div>,

    // 17: CONCLUSION
    <div key="slide-17" className="flex flex-col items-center justify-center h-full w-full bg-slate-950 text-white p-12">
      <div className="max-w-4xl text-center flex flex-col items-center">
        <Layers className="w-20 h-20 text-cyan-400 mb-8" />
        <h2 className="text-5xl font-bold mb-8 text-slate-100">Strategic Implications</h2>
        <div className="w-24 h-1 bg-rose-500 mb-8"></div>
        <p className="text-2xl font-light text-slate-300 leading-relaxed mb-12">
          The AI infrastructure build-out has decoupled from traditional market mechanisms. Massive capital intensity is colliding with constrained supply and bifurcated demand.
        </p>
        <div className="bg-slate-900 border border-slate-700 p-8 rounded-xl w-full">
          <p className="text-xl text-amber-400 font-medium">
             Stress is already manifesting on the liability side through debt structures and illiquidity, well before any explicit collapse in fundamental demand. Proceed with extreme rigor in valuation and exposure.
          </p>
        </div>
      </div>
    </div>
  ];

  return (
    <div 
      className="absolute inset-0 w-full h-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden font-sans"
      ref={containerRef}
    >
      {/* FIXED STAGE TRANSFORM
        The inner container is strictly 1280x720. 
        It scales dynamically via transform to fit the outer container perfectly.
      */}
      <div 
        className="absolute top-1/2 left-1/2 bg-slate-900 shadow-2xl overflow-hidden flex flex-col"
        style={{
          width: '1280px',
          height: '720px',
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        {/* Slide Content */}
        {slides[currentSlide]}

        {/* Navigation Controls */}
        <div className="absolute bottom-6 right-6 flex items-center gap-4 z-50">
          <div className="text-slate-400 text-sm font-medium mr-4">
            {currentSlide + 1} / {slides.length}
          </div>
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-3 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'text-white'}`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className={`p-3 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors ${currentSlide === slides.length - 1 ? 'opacity-50 cursor-not-allowed' : 'text-white'}`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
          <div 
            className="h-full bg-cyan-500 transition-all duration-300 ease-out"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}