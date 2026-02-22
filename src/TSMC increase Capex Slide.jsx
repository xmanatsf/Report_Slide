import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, Cpu, TrendingUp, Network, 
  Layers, Database, ArrowUpRight, Crosshair, Server, 
  Zap, Globe, Shield, Target, BarChart3 
} from 'lucide-react';

// --- THEME CONSTANTS ---
const THEME = {
  bg: '#F8F7F5',
  text: '#2F3542',
  accent: '#007AFF',
  grid: 'rgba(47, 53, 66, 0.06)',
  fontTitle: '"Century Gothic", sans-serif',
  fontBody: '"Times New Roman", serif',
};

// --- HELPER COMPONENTS ---
const BlueprintGrid = () => (
  <div 
    className="absolute inset-0 z-0 pointer-events-none opacity-50"
    style={{
      backgroundImage: `linear-gradient(${THEME.grid} 1px, transparent 1px), linear-gradient(90deg, ${THEME.grid} 1px, transparent 1px)`,
      backgroundSize: '40px 40px'
    }}
  />
);

const SlideContainer = ({ children }) => (
  <div 
    className="absolute inset-0 flex flex-col p-4 sm:p-8 md:p-12 overflow-y-auto overflow-x-hidden"
    style={{ backgroundColor: THEME.bg, color: THEME.text }}
  >
    <BlueprintGrid />
    <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col justify-center min-h-full py-8">
      {children}
    </div>
  </div>
);

const Title = ({ children, className = '' }) => (
  <h1 
    className={`font-bold leading-tight mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight ${className}`}
    style={{ fontFamily: THEME.fontTitle, color: THEME.text }}
  >
    {children}
  </h1>
);

const BodyText = ({ children, className = '' }) => (
  <p 
    className={`leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl mb-4 ${className}`}
    style={{ fontFamily: THEME.fontBody }}
  >
    {children}
  </p>
);

const BulletList = ({ items }) => (
  <ul className="space-y-2 sm:space-y-3">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start text-xs sm:text-sm md:text-base lg:text-lg" style={{ fontFamily: THEME.fontBody }}>
        <span className="mr-3 font-bold mt-1 shrink-0" style={{ color: THEME.accent }}>•</span>
        <span dangerouslySetInnerHTML={{ __html: item }} />
      </li>
    ))}
  </ul>
);

const BarChart = ({ data, yAxisLabel, maxValue }) => (
  <div className="flex flex-col w-full border-b border-l pt-8 pr-4 h-64 sm:h-80" style={{ borderColor: THEME.text }}>
    <div className="text-[10px] mb-2 opacity-70 uppercase tracking-widest" style={{ fontFamily: THEME.fontTitle }}>{yAxisLabel}</div>
    <div className="flex-1 flex items-end justify-around space-x-2 h-full">
      {data.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center justify-end flex-1 h-full group relative">
          {/* Old Value Guide */}
          {item.oldValue && (
            <div 
              className="absolute bottom-0 w-full border-t-2 border-dashed opacity-30 z-0"
              style={{ height: `${(item.oldValue / maxValue) * 100}%`, borderColor: THEME.text }}
            >
               <span className="absolute -top-5 left-0 w-full text-center text-[8px] font-bold" style={{ fontFamily: THEME.fontTitle }}>PREV: {item.oldValue}</span>
            </div>
          )}
          {/* Main Bar */}
          <div 
            className="w-full max-w-[40px] transition-all duration-1000 ease-out border flex flex-col justify-start overflow-visible"
            style={{ 
              height: `${(item.value / maxValue) * 100}%`, 
              backgroundColor: item.highlight ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
              borderColor: item.highlight ? THEME.accent : THEME.text,
              borderWidth: item.highlight ? '2px' : '1px'
            }}
          >
            <span className="w-full text-center -mt-6 font-bold text-[10px] sm:text-xs" style={{ fontFamily: THEME.fontTitle, color: item.highlight ? THEME.accent : THEME.text }}>
              {item.label}
            </span>
          </div>
          <span className="mt-4 text-[9px] sm:text-[10px] font-bold text-center uppercase leading-tight" style={{ fontFamily: THEME.fontTitle }}>{item.xLabel}</span>
        </div>
      ))}
    </div>
  </div>
);

// --- SLIDE COMPONENTS ---

const Slide1 = () => (
  <SlideContainer>
    <div className="flex flex-col md:flex-row min-h-[400px] items-stretch gap-8">
      <div className="w-full md:w-1/2 relative overflow-hidden flex items-center justify-center border border-gray-200 bg-white">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke={THEME.text} strokeWidth="0.1" />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
          <circle cx="50" cy="50" r="30" fill="none" stroke={THEME.accent} strokeWidth="0.5" />
          <path d="M 20 20 L 80 80 M 80 20 L 20 80" stroke={THEME.text} strokeWidth="0.2" strokeDasharray="1,1" />
          <rect x="45" y="45" width="10" height="10" fill={THEME.accent} opacity="0.1" stroke={THEME.accent} strokeWidth="0.2" />
        </svg>
      </div>
      <div className="w-full md:w-1/2 p-4 flex flex-col justify-center border-r-[10px]" style={{ borderColor: THEME.accent }}>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 opacity-70" style={{ fontFamily: THEME.fontTitle }}>UBS Global Research • FEB 2026</p>
        <h1 className="font-bold leading-[1.1] text-3xl sm:text-4xl lg:text-5xl tracking-tighter" style={{ fontFamily: THEME.fontTitle, color: THEME.text }}>
           TSMC Elevates <br/> Capital Expenditure <br/> for Cloud AI
        </h1>
        <div className="w-16 h-1 bg-blue-500 my-6"></div>
        <BodyText className="max-w-md">Multi-year acceleration in infrastructure investment driven by the next generation of global compute demand.</BodyText>
      </div>
    </div>
  </SlideContainer>
);

const Slide2 = () => (
  <SlideContainer>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <Title>Infrastructure Revisions: US$75 Billion Peak by 2028</Title>
        <BodyText>UBS has significantly lifted CAPEX forecasts for 2027 and 2028 to accommodate the accelerating roadmap for leading-edge nodes and advanced packaging.</BodyText>
        <BulletList items={[
          "<b>2026E CAPEX:</b> US$52bn – US$56bn guidance range.",
          "<b>2027E Revision:</b> Lifted to US$65bn (previously US$60bn).",
          "<b>2028E Revision:</b> Lifted to US$75bn (previously US$62bn)."
        ]} />
      </div>
      <div className="bg-white p-6 border shadow-sm border-gray-200">
        <BarChart 
          yAxisLabel="CAPEX Revision (US$ Billions)"
          maxValue={80}
          data={[
            { xLabel: '2026 Guidance', value: 54, label: '$54bn', highlight: false },
            { xLabel: '2027 Forecast', oldValue: 60, value: 65, label: '$65bn', highlight: true },
            { xLabel: '2028 Forecast', oldValue: 62, value: 75, label: '$75bn', highlight: true }
          ]}
        />
      </div>
    </div>
  </SlideContainer>
);

const Slide3 = () => (
  <SlideContainer>
    <div className="flex flex-col space-y-8">
      <Title>Shift toward Wafer Fabrication Equipment (WFE)</Title>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 border border-gray-200 flex flex-col justify-center">
          <p className="text-[10px] uppercase font-bold tracking-widest mb-4" style={{ fontFamily: THEME.fontTitle }}>2028 Allocation</p>
          <p className="text-5xl font-bold mb-2" style={{ color: THEME.accent }}>55%</p>
          <p className="text-sm opacity-70" style={{ fontFamily: THEME.fontBody }}>Share of CAPEX dedicated to tools and fabrication equipment.</p>
        </div>
        <div className="col-span-1 md:col-span-2 space-y-4 flex flex-col justify-center pl-0 md:pl-8">
          <BodyText>As the physical "shells" of new fabs reach completion, spending moves from construction to high-value tool installation.</BodyText>
          <BulletList items={[
            "WFE share increases from 45% in 2026 to 55% in 2028.",
            "UBS rolls out 2028 total WFE market forecast at <b>US$182.0bn</b>.",
            "Structural transition from 'Building' phase to 'Equipping' phase."
          ]} />
        </div>
      </div>
    </div>
  </SlideContainer>
);

const Slide4 = () => (
  <SlideContainer>
    <div className="flex flex-col h-full">
      <Title>Manageable Capital Intensity vs Historical Cycles</Title>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 flex-1 mt-4">
        <div className="lg:col-span-2 flex flex-col justify-center">
          <BodyText>Despite record spending, TSMC’s massive revenue scale prevents the capital intensity (CAPEX/Revenue) from reaching prior cycle peaks of 50%.</BodyText>
          <div className="mt-4 space-y-4">
             <div className="flex justify-between border-b border-gray-200 pb-2">
               <span className="text-xs font-bold" style={{ fontFamily: THEME.fontTitle }}>Smartphone Cycle (11-13)</span>
               <span className="text-xs font-mono">~50%</span>
             </div>
             <div className="flex justify-between border-b border-gray-200 pb-2">
               <span className="text-xs font-bold" style={{ fontFamily: THEME.fontTitle }}>HPC Cycle (21-22)</span>
               <span className="text-xs font-mono">~50%</span>
             </div>
             <div className="flex justify-between border-b border-blue-200 pb-2">
               <span className="text-xs font-bold text-blue-600" style={{ fontFamily: THEME.fontTitle }}>AI Cycle (27-28E)</span>
               <span className="text-xs font-mono font-bold text-blue-600">29-32%</span>
             </div>
          </div>
        </div>
        <div className="lg:col-span-3 bg-white border border-gray-200 p-6 flex items-end">
           <div className="w-full h-48 sm:h-64 flex items-end justify-between px-4 border-l border-b border-gray-300 relative">
              <div className="absolute top-0 w-full border-t border-dashed border-red-300 opacity-50 flex justify-end">
                <span className="text-[8px] text-red-500 pr-2 -mt-4">HISTORIC CAP (50%)</span>
              </div>
              {[
                { label: '2025E', val: 33 },
                { label: '2026E', val: 35 },
                { label: '2027E', val: 32 },
                { label: '2028E', val: 29 },
              ].map((d, i) => (
                <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
                   <div className="w-8 bg-blue-100 border border-blue-500 transition-all" style={{ height: `${(d.val / 50) * 100}%` }}></div>
                   <span className="mt-2 text-[10px] font-bold" style={{ fontFamily: THEME.fontTitle }}>{d.label}</span>
                   <span className="text-[9px] opacity-60 font-mono">{d.val}%</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  </SlideContainer>
);

const Slide5 = () => (
  <SlideContainer>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="relative h-64 sm:h-80 w-full flex items-center justify-center">
         <svg viewBox="0 0 100 100" className="w-full h-full max-w-sm">
            <circle cx="50" cy="50" r="45" fill="none" stroke={THEME.accent} strokeWidth="1" />
            <circle cx="50" cy="50" r="35" fill="rgba(0,122,255,0.05)" stroke={THEME.accent} strokeWidth="0.5" />
            <text x="50" y="48" textAnchor="middle" fontSize="12" fontWeight="bold" fill={THEME.accent} fontFamily={THEME.fontTitle}>TSMC N2</text>
            <text x="50" y="62" textAnchor="middle" fontSize="10" fill={THEME.text} fontFamily={THEME.fontTitle}>{'>'}80% SHARE</text>
            
            <circle cx="85" cy="20" r="12" fill="none" stroke={THEME.text} strokeWidth="0.2" strokeDasharray="1,1" />
            <text x="85" y="22" textAnchor="middle" fontSize="3" fill={THEME.text} fontFamily={THEME.fontTitle}>Intel 18A</text>
            
            <circle cx="15" cy="80" r="10" fill="none" stroke={THEME.text} strokeWidth="0.2" strokeDasharray="1,1" />
            <text x="15" y="82" textAnchor="middle" fontSize="3" fill={THEME.text} fontFamily={THEME.fontTitle}>Samsung N2</text>
         </svg>
      </div>
      <div>
        <Title>Two-Nanometer (N2) Dominance</Title>
        <BodyText>While competitors show improved execution, TSMC’s yield and volume production experience—especially in large-die accelerators—secure its structural leadership.</BodyText>
        <BulletList items={[
          "Retaining <b>80%+ market share</b> in N2 foundry services.",
          "Accelerating capacity to meet a robust pipeline of tape-outs.",
          "Yield advantages provide massive cost-of-ownership benefits for CSPs."
        ]} />
      </div>
    </div>
  </SlideContainer>
);

const Slide6 = () => (
  <SlideContainer>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <Title>Margin Expansion via Mature Node Sales</Title>
        <BodyText>The continuous scaling of N3 and N5 nodes delivers significant gross margin tailwinds as sales expand in years 4 and 5 of node production.</BodyText>
        <div className="p-4 border border-blue-100 bg-blue-50">
           <p className="text-[10px] font-bold uppercase mb-2" style={{ fontFamily: THEME.fontTitle }}>Projected Gross Margin</p>
           <div className="flex justify-between items-baseline">
             <span className="text-3xl font-bold" style={{ color: THEME.accent }}>64.9%</span>
             <span className="text-xs opacity-60" style={{ fontFamily: THEME.fontTitle }}>TARGET BY 2028E</span>
           </div>
        </div>
      </div>
      <div className="lg:col-span-2 bg-white border border-gray-200 p-8">
         <div className="h-64 sm:h-80 flex items-end justify-between border-b border-gray-300 px-4 space-x-4">
            {[
              { label: 'Year 1', val: 20, color: '#DDD' },
              { label: 'Year 2', val: 40, color: '#CCC' },
              { label: 'Year 3', val: 65, color: '#BBB' },
              { label: 'Year 4', val: 90, color: THEME.accent, high: true },
              { label: 'Year 5', val: 100, color: THEME.accent, high: true }
            ].map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end h-full group">
                <div 
                  className="w-full transition-all duration-700 border" 
                  style={{ height: `${d.val}%`, backgroundColor: d.high ? 'rgba(0,122,255,0.2)' : 'white', borderColor: d.color }}
                ></div>
                <span className="mt-4 text-[10px] font-bold uppercase" style={{ fontFamily: THEME.fontTitle }}>{d.label}</span>
                {d.high && <span className="text-[8px] font-bold text-blue-600 mt-1">PEAK MARGIN</span>}
              </div>
            ))}
         </div>
         <p className="mt-4 text-[10px] text-center opacity-60" style={{ fontFamily: THEME.fontBody }}>Figure 1: Structural GM tailwinds from TSMC expanding N5 and N3 node sales in years 4-5.</p>
      </div>
    </div>
  </SlideContainer>
);

const Slide7 = () => (
  <SlideContainer>
    <div className="flex flex-col space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <Title>Forecast Revisions: Growth Acceleration</Title>
        <BodyText>The upward shift in CAPEX directly supports a 3-4% lift in long-term revenue and earnings estimates.</BodyText>
      </div>
      <div className="bg-white border border-gray-200 shadow-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-6 text-left text-xs uppercase tracking-widest font-bold" style={{ fontFamily: THEME.fontTitle }}>Metrics (NT$ Millions)</th>
              <th className="p-6 text-right text-xs uppercase tracking-widest font-bold" style={{ fontFamily: THEME.fontTitle }}>2026E</th>
              <th className="p-6 text-right text-xs uppercase tracking-widest font-bold" style={{ fontFamily: THEME.fontTitle }}>2027E</th>
              <th className="p-6 text-right text-xs uppercase tracking-widest font-bold text-blue-600" style={{ fontFamily: THEME.fontTitle }}>2028E</th>
            </tr>
          </thead>
          <tbody style={{ fontFamily: THEME.fontBody }}>
            <tr className="border-b border-gray-100">
              <td className="p-6 font-bold">Total Revenues</td>
              <td className="p-6 text-right font-mono">5,007,382</td>
              <td className="p-6 text-right font-mono">6,484,793</td>
              <td className="p-6 text-right font-mono font-bold text-blue-600">8,110,091</td>
            </tr>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <td className="p-6 font-bold">Operating Margin (%)</td>
              <td className="p-6 text-right font-mono">55.0%</td>
              <td className="p-6 text-right font-mono">55.7%</td>
              <td className="p-6 text-right font-mono font-bold text-blue-600">56.6%</td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="p-6 font-bold">Net Earnings</td>
              <td className="p-6 text-right font-mono">2,348,668</td>
              <td className="p-6 text-right font-mono">3,079,731</td>
              <td className="p-6 text-right font-mono font-bold text-blue-600">3,939,145</td>
            </tr>
            <tr>
              <td className="p-6 font-bold text-lg">EPS (NT$)</td>
              <td className="p-6 text-right font-mono text-lg">90.58</td>
              <td className="p-6 text-right font-mono text-lg">118.77</td>
              <td className="p-6 text-right font-mono text-xl font-bold text-blue-600">151.92</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </SlideContainer>
);

const Slide8 = () => (
  <SlideContainer>
    <div className="flex flex-col h-full justify-center space-y-12">
      <div className="max-w-4xl mx-auto text-center">
        <Target size={48} className="mx-auto mb-6" style={{ color: THEME.accent }} />
        <Title>Price Target Maintained: NT$2,500</Title>
        <BodyText className="text-xl">Valuation remains compelling even with elevated spending, as the 21x forward multiple reflects structural AI tailwinds.</BodyText>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="p-8 border border-gray-200 bg-white">
            <p className="text-[10px] font-bold uppercase opacity-60 mb-2" style={{ fontFamily: THEME.fontTitle }}>Current Price</p>
            <p className="text-3xl font-mono font-bold">NT$1,915</p>
            <p className="text-[10px] opacity-40 mt-1" style={{ fontFamily: THEME.fontBody }}>AS OF FEB 11, 2026</p>
         </div>
         <div className="p-8 border border-gray-200 bg-white">
            <p className="text-[10px] font-bold uppercase opacity-60 mb-2" style={{ fontFamily: THEME.fontTitle }}>Target Multiple</p>
            <p className="text-3xl font-mono font-bold">21x</p>
            <p className="text-[10px] opacity-40 mt-1" style={{ fontFamily: THEME.fontBody }}>ON 2027E EARNINGS</p>
         </div>
         <div className="p-8 border border-blue-500 bg-blue-50">
            <p className="text-[10px] font-bold uppercase text-blue-600 mb-2" style={{ fontFamily: THEME.fontTitle }}>Price Target</p>
            <p className="text-3xl font-mono font-bold text-blue-600">NT$2,500</p>
            <p className="text-[10px] opacity-60 mt-1" style={{ fontFamily: THEME.fontBody }}>12-MONTH OUTLOOK</p>
         </div>
      </div>
    </div>
  </SlideContainer>
);

const Slide9 = () => (
  <SlideContainer>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <Title>WFE Market Expansion: US$182B Baseline</Title>
        <BodyText>TSMC’s higher spending mirrors a broader revision in the Wafer Fabrication Equipment market as CSPs prioritize compute-heavy infrastructure.</BodyText>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
           <div className="p-4 border border-gray-200 bg-white">
             <p className="text-[10px] font-bold opacity-50 uppercase" style={{ fontFamily: THEME.fontTitle }}>2027 WFE (UBS Rev)</p>
             <p className="text-xl font-bold" style={{ color: THEME.accent }}>US$172.5bn</p>
           </div>
           <div className="p-4 border border-blue-200 bg-blue-50">
             <p className="text-[10px] font-bold text-blue-600 uppercase" style={{ fontFamily: THEME.fontTitle }}>2028 WFE (UBS Rollout)</p>
             <p className="text-xl font-bold text-blue-600">US$182.0bn</p>
           </div>
        </div>
      </div>
      <div className="bg-white p-6 border border-gray-200">
        <div className="h-64 sm:h-80 w-full flex items-end justify-between border-b border-gray-300 relative">
           {[
             { year: '2026E', val: 142 },
             { year: '2027E', val: 172.5 },
             { year: '2028E', val: 182 }
           ].map((d, i) => (
             <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group px-4">
                <div className="w-full bg-blue-500 opacity-20 border border-blue-500" style={{ height: `${(d.val / 200) * 100}%` }}></div>
                <span className="mt-4 text-[10px] font-bold" style={{ fontFamily: THEME.fontTitle }}>{d.year}</span>
                <span className="text-[9px] opacity-60">${d.val}bn</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  </SlideContainer>
);

const Slide10 = () => (
  <SlideContainer>
    <div className="flex flex-col space-y-8 h-full">
      <Title>Cash Generation Recovery by 2027</Title>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 flex-1 items-center">
         <div className="lg:col-span-3 bg-white border border-gray-200 p-8 flex flex-col h-full min-h-[350px]">
            <p className="text-[10px] font-bold uppercase mb-8" style={{ fontFamily: THEME.fontTitle }}>Free Cash Flow (FCF) Yield %</p>
            <div className="flex-1 flex items-end justify-between px-8 border-b border-gray-300 relative">
              <div className="absolute top-1/2 w-full border-t border-gray-100 pointer-events-none"></div>
              {[
                { year: '2025E', val: 2.0 },
                { year: '2026E', val: 1.8 },
                { year: '2027E', val: 3.4 },
                { year: '2028E', val: 5.1 }
              ].map((d, i) => (
                <div key={i} className="flex flex-col items-center flex-1 h-full justify-end group">
                   {/* Explicit bar rendering with minimum height check */}
                   <div 
                    className="w-12 bg-blue-500/10 border-t-2 border-blue-500 transition-all duration-1000 group-hover:bg-blue-500/20" 
                    style={{ height: `${(d.val / 6) * 100}%` }}
                   ></div>
                   <span className="mt-4 text-[10px] font-bold" style={{ fontFamily: THEME.fontTitle }}>{d.year}</span>
                   <span className="text-[10px] font-mono font-bold text-blue-600">{d.val}%</span>
                </div>
              ))}
            </div>
         </div>
         <div className="lg:col-span-2 space-y-6">
           <BodyText>The expanding revenue base triggers an aggressive recovery in yield as investment intensity stabilizes.</BodyText>
           <BulletList items={[
             "<b>2025/26 Cycle:</b> Peak absorption of capital into new nodes.",
             "<b>2027 Inflection:</b> Structural recovery to 3.4% yield.",
             "<b>2028 Outlook:</b> 5.1% yield allows for unparalleled reinvestment."
           ]} />
         </div>
      </div>
    </div>
  </SlideContainer>
);

const Slide11 = () => (
  <SlideContainer>
    <div className="flex flex-col h-full items-center justify-center space-y-12 max-w-5xl mx-auto">
      <div className="text-center">
        <Title>Operational Scaling: Throughput vs. Value</Title>
        <BodyText>TSMC is not just growing in physical volume, but in the dollar value processed per silicon wafer.</BodyText>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
         <div className="p-8 border border-gray-200 bg-white group hover:border-blue-500 transition-colors">
            <Cpu size={32} className="mb-4 text-gray-400 group-hover:text-blue-500" />
            <p className="text-[10px] font-bold uppercase opacity-60 mb-1" style={{ fontFamily: THEME.fontTitle }}>Capacity (kpcs 8" eq.)</p>
            <div className="flex items-baseline space-x-4">
               <span className="text-4xl font-bold">45,455</span>
               <span className="text-xs text-blue-600 font-bold">+30% VS 2022</span>
            </div>
         </div>
         <div className="p-8 border border-gray-200 bg-white group hover:border-blue-500 transition-colors">
            <Zap size={32} className="mb-4 text-gray-400 group-hover:text-blue-500" />
            <p className="text-[10px] font-bold uppercase opacity-60 mb-1" style={{ fontFamily: THEME.fontTitle }}>Blended ASP (US$)</p>
            <div className="flex items-baseline space-x-4">
               <span className="text-4xl font-bold">$4,256</span>
               <span className="text-xs text-blue-600 font-bold">+118% VS 2022</span>
            </div>
         </div>
      </div>
    </div>
  </SlideContainer>
);

const Slide12 = () => (
  <SlideContainer>
    <div className="flex flex-col h-full items-center justify-center text-center max-w-4xl mx-auto space-y-8">
       <Shield size={64} style={{ color: THEME.accent }} strokeWidth={1} />
       <Title className="text-center">The Moat of Competition</Title>
       <div className="w-16 h-1 bg-gray-300"></div>
       <BodyText className="italic text-xl sm:text-2xl leading-relaxed">
         "Given the geopolitical dynamics, we think it is better for TSMC's competitors to continue to invest, rather than there being no competition at all."
       </BodyText>
       <p className="text-sm opacity-60 uppercase tracking-widest font-bold" style={{ fontFamily: THEME.fontTitle }}>— UBS STRATEGIC INSIGHT, FEB 2026</p>
       <BodyText>The continued execution of Intel and Samsung validates the market's vast scale while TSMC maintains the apex yield and volume production.</BodyText>
    </div>
  </SlideContainer>
);

const Slide13 = () => (
  <SlideContainer>
    <div className="flex flex-col h-full space-y-12">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2">
          <Title>UBS vs. Market Consensus Gap</Title>
          <BodyText>UBS estimates for 2028 are materially higher than current market consensus, suggesting a mispricing of the long-term AI benefit.</BodyText>
          <div className="mt-8 space-y-4">
             <div className="bg-blue-50 p-4 border-l-4 border-blue-500">
               <p className="text-[10px] font-bold text-blue-600 uppercase" style={{ fontFamily: THEME.fontTitle }}>2028E EPS Advantage</p>
               <p className="text-3xl font-bold">NT$151.92 <span className="text-sm font-normal opacity-60">vs. NT$133.36</span></p>
               <p className="text-xs font-bold text-blue-500 mt-1 uppercase">+14% DELTA</p>
             </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 bg-white border border-gray-200 p-8 h-80">
           <p className="text-[10px] font-bold uppercase mb-8" style={{ fontFamily: THEME.fontTitle }}>Net Profit (NT$ Billion, 2028E)</p>
           <div className="flex items-end justify-around h-48 border-b border-gray-300 px-8 space-x-8">
              <div className="flex-1 flex flex-col items-center justify-end h-full">
                 <div className="w-full bg-gray-100 border border-gray-300" style={{ height: '70%' }}></div>
                 <span className="mt-4 text-[10px] font-bold">CONSENSUS</span>
                 <span className="text-[10px] font-mono">3,538bn</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-end h-full">
                 <div className="w-full bg-blue-100 border border-blue-500" style={{ height: '81%' }}></div>
                 <span className="mt-4 text-[10px] font-bold text-blue-600">UBS EST</span>
                 <span className="text-[10px] font-mono font-bold text-blue-600">3,939bn</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  </SlideContainer>
);

const Slide14 = () => (
  <SlideContainer>
    <div className="grid grid-cols-1 md:grid-cols-2 h-full items-center gap-16">
      <div className="bg-white border-2 border-blue-500 p-12 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-4">
           <BarChart3 size={120} className="text-blue-500/5" />
         </div>
         <Title className="text-blue-600">Investment Summary</Title>
         <div className="space-y-8 mt-12">
            <div>
              <p className="text-[10px] font-bold uppercase opacity-40 mb-2" style={{ fontFamily: THEME.fontTitle }}>Core Thesis</p>
              <p className="text-xl font-bold italic" style={{ fontFamily: THEME.fontBody }}>Decisive capital allocation secures unassailable dominance in the Cloud AI era.</p>
            </div>
            <BulletList items={[
              "CAPEX acceleration to <b>US$75bn</b> is justified by robust CSP demand.",
              "Technology leadership at <b>N2 node</b> remains intact with 80% share.",
              "Significant earnings revision to <b>NT$151.92 EPS</b> by 2028E."
            ]} />
         </div>
      </div>
      <div className="flex flex-col justify-center text-center space-y-4">
         <p className="text-5xl font-bold tracking-tighter" style={{ fontFamily: THEME.fontTitle }}>NT$2,500</p>
         <p className="text-xs font-bold uppercase tracking-[0.4em] opacity-40" style={{ fontFamily: THEME.fontTitle }}>12-MONTH PRICE TARGET</p>
         <div className="w-24 h-1 bg-blue-500 mx-auto mt-8"></div>
         <p className="text-2xl font-bold text-blue-600 uppercase" style={{ fontFamily: THEME.fontTitle }}>BUY RATING REITERATED</p>
      </div>
    </div>
  </SlideContainer>
);

const Slide15 = () => (
  <div 
    className="relative w-full h-full flex flex-col justify-center items-center overflow-hidden p-6"
    style={{ backgroundColor: THEME.bg }}
  >
    <BlueprintGrid />
    <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10">
      <svg viewBox="0 0 100 100" className="w-[150%] h-[150%] animate-[spin_60s_linear_infinite]">
         {[...Array(20)].map((_, i) => (
           <circle key={i} cx="50" cy="50" r={i * 4} fill="none" stroke={THEME.text} strokeWidth="0.1" />
         ))}
      </svg>
    </div>
    <div className="relative z-10 bg-white border border-gray-200 p-12 md:p-20 shadow-2xl max-w-4xl text-center">
       <h1 
        className="font-bold uppercase tracking-[0.2em] mb-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        style={{ fontFamily: THEME.fontTitle, color: THEME.text }}
      >
        Scaling the Moat.
      </h1>
      <div className="w-16 h-1 mx-auto mb-8 bg-blue-500"></div>
      <p className="text-lg md:text-xl lg:text-2xl opacity-80" style={{ fontFamily: THEME.fontBody }}>
        Superior yield, unrivaled capacity, and decisive capital allocation engineer a foundational advantage in the global AI infrastructure landscape.
      </p>
    </div>
  </div>
);

// --- MAIN APPLICATION ---
export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <Slide1 />, <Slide2 />, <Slide3 />, <Slide4 />, <Slide5 />, 
    <Slide6 />, <Slide7 />, <Slide8 />, <Slide9 />, <Slide10 />,
    <Slide11 />, <Slide12 />, <Slide13 />, <Slide14 />, <Slide15 />
  ];

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 overflow-hidden select-none">
      
      {/* Slide Canvas */}
      <div className="flex-1 min-h-0 relative">
        <div className="absolute inset-0 m-2 sm:m-4 md:m-8 lg:m-12 shadow-2xl bg-white border border-gray-200 rounded-sm overflow-hidden">
          {slides[currentSlide]}
        </div>
      </div>

      {/* Control Bar */}
      <div className="h-14 bg-white border-t border-gray-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-50">
        <div className="flex items-center space-x-3 opacity-40">
          <Crosshair size={14} />
          <span className="font-mono text-[10px] tracking-widest font-bold">UBS.EQUITY.RESEARCH.ANALYSIS</span>
        </div>
        
        <div className="flex items-center space-x-8">
          <button 
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className={`p-2 transition-all rounded-full hover:bg-gray-100 ${currentSlide === 0 ? 'opacity-10 cursor-not-allowed' : 'opacity-100'}`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex flex-col items-center">
             <span className="font-mono text-xs font-bold" style={{ color: THEME.text }}>
               {String(currentSlide + 1).padStart(2, '0')} <span className="opacity-20 mx-1">/</span> {String(slides.length).padStart(2, '0')}
             </span>
             <div className="w-24 h-[2px] bg-gray-100 mt-1 relative overflow-hidden">
                <div 
                  className="absolute h-full bg-blue-500 transition-all duration-300" 
                  style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                ></div>
             </div>
          </div>

          <button 
            onClick={handleNext}
            disabled={currentSlide === slides.length - 1}
            className={`p-2 transition-all rounded-full hover:bg-gray-100 ${currentSlide === slides.length - 1 ? 'opacity-10 cursor-not-allowed' : 'opacity-100'}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="hidden sm:block text-[10px] font-mono opacity-20 uppercase tracking-tighter">
          Architect v4.2 // Final Review // February 2026
        </div>
      </div>
    </div>
  );
}