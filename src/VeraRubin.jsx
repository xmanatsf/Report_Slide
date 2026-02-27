import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Cpu,
  Network,
  Zap,
  Server,
  Layers,
  ThermometerSnowflake,
  Activity,
  Box,
  ArrowRight,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const TOTAL_SLIDES = 22;

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < TOTAL_SLIDES - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        const scaleFactor = Math.min(clientWidth / 1280, clientHeight / 720) * 0.98;
        setScale(scaleFactor);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-black relative overflow-hidden font-sans text-white select-none"
    >
      <div
        className="absolute top-1/2 left-1/2 bg-[#0B0C10] shadow-[0_0_100px_rgba(0,229,255,0.05)] overflow-hidden"
        style={{
          width: '1280px',
          height: '720px',
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center',
        }}
      >
        <SlideContent slideIndex={currentSlide} />

        {/* Navigation Overlay */}
        <div className="absolute bottom-6 right-6 flex items-center space-x-4 z-50 bg-[#0B0C10]/80 px-4 py-2 rounded-full backdrop-blur-sm border border-[#333]">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`p-2 rounded-full transition-all ${
              currentSlide === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#00E5FF]/20 text-[#00E5FF]'
            }`}
          >
            <ChevronLeft size={24} />
          </button>
          <div className="font-mono text-[#00E5FF] text-lg font-bold w-16 text-center">
            {currentSlide + 1} / {TOTAL_SLIDES}
          </div>
          <button
            onClick={nextSlide}
            disabled={currentSlide === TOTAL_SLIDES - 1}
            className={`p-2 rounded-full transition-all ${
              currentSlide === TOTAL_SLIDES - 1
                ? 'opacity-20 cursor-not-allowed'
                : 'hover:bg-[#00E5FF]/20 text-[#00E5FF]'
            }`}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- REUSABLE COMPONENTS ---

const Title = ({ children, className = '' }) => (
  <h1 className={`font-sans font-bold text-[#FFFFFF] leading-tight z-20 relative ${className}`}>
    {children}
  </h1>
);

const BulletList = ({ items, className = '' }) => (
  <ul className={`font-mono text-[#A0A0A0] text-[18px] space-y-3 z-20 relative ${className}`}>
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start">
        <span className="text-[#76B900] mr-3 mt-1 text-[20px]">▪</span>
        <span className="leading-snug">{item}</span>
      </li>
    ))}
  </ul>
);

const IsometricRack = ({ activeZone = 'all' }) => (
  <div className="relative w-full h-full flex justify-center items-center opacity-80 pointer-events-none">
    <svg viewBox="0 0 400 600" className="w-full h-full max-h-[600px]">
      <g transform="translate(200, 50) scale(1, 0.5) rotate(45)">
        {[...Array(20)].map((_, i) => (
          <rect key={i} x={i * 15} y={0} width={12} height={300} fill="transparent" stroke={activeZone === 'power' && i > 15 ? '#76B900' : '#00E5FF'} strokeWidth={1} opacity={0.3} />
        ))}
        {[...Array(30)].map((_, i) => (
          <rect key={`tray-${i}`} x={0} y={i * 10} width={280} height={6} fill={activeZone === 'compute' && i > 10 && i < 20 ? 'rgba(118, 185, 0, 0.4)' : 'rgba(0, 229, 255, 0.1)'} stroke={activeZone === 'all' || activeZone === 'compute' ? '#00E5FF' : '#333'} strokeWidth={1} />
        ))}
        {activeZone === 'all' && <circle cx="140" cy="150" r="40" fill="#76B900" opacity="0.4" filter="blur(10px)" />}
        {activeZone === 'all' && <circle cx="140" cy="150" r="15" fill="#76B900" />}
      </g>
    </svg>
  </div>
);

// --- SLIDE CONTENT SWITCHER ---

const SlideContent = ({ slideIndex }) => {
  switch (slideIndex) {
    case 0:
      return (
        <div className="w-full h-full flex">
          <div className="w-[60%] h-full p-20 flex flex-col justify-end z-10 relative">
            <Title className="text-[56px] tracking-tight mb-8">
              The Vera Rubin architecture enforces extreme co-design across the entire datacenter.
            </Title>
          </div>
          <div className="w-[60%] h-full absolute right-0 top-0">
            <IsometricRack activeZone="all" />
          </div>
          <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-r from-[#0B0C10] via-transparent to-transparent z-0"></div>
        </div>
      );

    case 1:
      return (
        <div className="w-full h-full flex">
          <div className="w-1/2 h-full p-16 flex flex-col justify-center bg-[#0B0C10] z-10 border-r border-[#333]">
            <Title className="text-[44px] mb-10">
              Grace Blackwell exposed the absolute physical limits of component modularity.
            </Title>
            <BulletList
              items={[
                "Bandwidth bottlenecks at the interconnect level artificially restrict compute utilization.",
                "Power delivery inefficiencies compound in standard rack configurations.",
                "Cable density actively obstructs necessary thermal management."
              ]}
            />
          </div>
          <div className="w-1/2 h-full relative overflow-hidden bg-[#0F111A]">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-60 pointer-events-none">
              <path d="M10,10 Q50,90 90,10 T50,50 Q10,90 90,90" stroke="#555" strokeWidth="0.5" fill="none" />
              <path d="M20,0 Q60,80 100,0 T60,40 Q20,80 100,80" stroke="#555" strokeWidth="0.5" fill="none" />
              <path d="M0,20 Q40,100 80,20 T40,60 Q0,100 80,100" stroke="#555" strokeWidth="0.5" fill="none" />
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#76B900" strokeWidth="0.5" opacity="0.8"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" className="mix-blend-overlay" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#00E5FF" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#76B900]/20 to-[#00E5FF]/20 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="w-full h-full p-12 flex flex-col items-center justify-between">
          <Title className="text-[40px] text-center w-[900px] mt-4 mb-4">
            Extreme co-design merges the processor, the fabric, and the infrastructure into one contiguous system.
          </Title>
          
          <div className="flex-1 w-full flex justify-between items-center px-8">
            <div className="w-[320px]">
              <BulletList items={[
                "Vera (CPU) and Rubin (GPU) engineered for symbiotic operation.",
                "Network switching strictly dictates physical tray layouts."
              ]} />
            </div>
            
            <div className="relative w-[400px] h-[400px] flex justify-center items-center">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-full border-2 border-[#00E5FF] flex items-top justify-center pt-6 text-[16px] font-mono tracking-widest text-[#00E5FF] bg-[#00E5FF]/5 backdrop-blur-sm">
                SILICON
              </div>
              <div className="absolute bottom-4 left-4 w-[220px] h-[220px] rounded-full border-2 border-[#A0A0A0] flex items-end justify-start pb-10 pl-6 text-[16px] font-mono tracking-widest text-[#A0A0A0] bg-[#FFFFFF]/5 backdrop-blur-sm">
                NETWORK
              </div>
              <div className="absolute bottom-4 right-4 w-[220px] h-[220px] rounded-full border-2 border-[#76B900] flex items-end justify-end pb-10 pr-6 text-[16px] font-mono tracking-widest text-[#76B900] bg-[#76B900]/5 backdrop-blur-sm">
                INFRASTRUCTURE
              </div>
              <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[60px] h-[60px] bg-[#76B900] rounded-full blur-xl opacity-80 mix-blend-screen animate-pulse pointer-events-none"></div>
            </div>

            <div className="w-[320px]">
              <BulletList items={[
                "Power routing and thermal dissipation govern silicon placement."
              ]} />
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="w-full h-full flex p-16 items-center">
          <div className="w-[45%] pr-12">
            <Title className="text-[44px] mb-10">
              The Vera CPU is purpose-built to eliminate host-side data starvation.
            </Title>
            <BulletList
              items={[
                "Engineered specifically to pair seamlessly with the Rubin compute cluster.",
                "Maximizes data preparation throughput for massive parallel workloads.",
                "Handles complex control-plane operations without interrupting the GPU."
              ]}
            />
          </div>
          <div className="w-[55%] h-full flex justify-center items-center">
            <div className="w-[480px] h-[480px] border-2 border-[#FFFFFF] bg-[#111] p-5 relative shadow-[0_0_50px_rgba(0,229,255,0.1)]">
              <div className="w-full h-full border border-[#333] grid grid-cols-4 grid-rows-4 gap-3 p-3 relative">
                {[...Array(16)].map((_, i) => (
                  <div key={i} className="border border-[#555] flex justify-center items-center opacity-70">
                    <div className="w-1/2 h-1/2 border border-[#777] rounded-[2px]"></div>
                  </div>
                ))}
                <div className="absolute top-0 right-0 h-full w-[30px] bg-[#00E5FF]/20 border-l border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.4)]"></div>
                <div className="absolute top-1/2 right-[-50px] text-[#00E5FF] font-mono text-sm uppercase tracking-widest whitespace-nowrap transform -translate-y-1/2 flex items-center">
                  <div className="w-[40px] h-[2px] bg-[#00E5FF] mr-2"></div>
                  Coherent Interface
                </div>
              </div>
              <div className="absolute top-[-24px] left-4 font-mono text-[#FFF] text-lg tracking-widest bg-[#0B0C10] px-2">VERA_CPU_DIE</div>
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className="w-full h-full p-16 flex flex-col justify-between">
          <Title className="text-[44px] mb-8 w-[1000px]">
            A coherent NVLink-C2C interface drives 1,800 GB/s between Vera and Rubin.
          </Title>
          
          <div className="flex-1 flex flex-col justify-center items-center relative gap-12">
            <div className="w-full flex justify-between items-center px-12">
              <div className="w-[180px] h-[180px] border-2 border-[#FFFFFF] flex items-center justify-center flex-col bg-[#111] z-10">
                <Cpu size={40} className="text-[#FFFFFF] mb-3" />
                <span className="font-mono text-[20px]">VERA CPU</span>
              </div>
              
              <div className="flex-1 h-[50px] relative mx-4">
                <div className="absolute w-full h-full bg-[#76B900]/20 border-y-2 border-[#76B900]"></div>
                <div className="w-full h-full overflow-hidden absolute flex space-x-6 px-4 items-center">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="w-[20px] h-[8px] bg-[#76B900] opacity-80 skew-x-[-20deg]" />
                  ))}
                </div>
                <div className="absolute top-[-36px] left-1/2 -translate-x-1/2 font-mono text-[#76B900] text-[22px] font-bold whitespace-nowrap bg-[#0B0C10] px-4 border border-[#76B900]/30 rounded-full">
                  1,800 GB/s Coherent NVLink-C2C
                </div>
              </div>

              <div className="w-[320px] h-[320px] border-2 border-[#00E5FF] flex items-center justify-center flex-col bg-[#00E5FF]/5 z-10">
                <Server size={56} className="text-[#00E5FF] mb-3" />
                <span className="font-mono text-[28px] text-[#00E5FF]">RUBIN GPU</span>
              </div>
            </div>
            
            <div className="w-[900px] text-center">
              <BulletList items={[
                "Operates as a dedicated, fully coherent CPU-GPU interface.",
                "Completely bypasses traditional PCIe latency bottlenecks.",
                "Enables the GPU to access host memory identically to local memory."
              ]} />
            </div>
          </div>
        </div>
      );

    case 5:
      return (
        <div className="w-full h-full p-12 flex flex-col items-center justify-between">
          <Title className="text-[40px] text-center w-full mb-6">
            The Rubin GPU architecture redefines the scale of a single graphics processor cluster.
          </Title>
          
          <div className="w-[700px] h-[360px] border border-[#333] relative p-8 flex justify-center items-center bg-[#0F111A]">
            <div className="absolute top-3 left-4 font-mono text-[#76B900] text-[14px] uppercase tracking-widest bg-[#0F111A] px-2">RUBIN_MACRO_ARCHITECTURE</div>
            
            <div className="w-[180px] h-[180px] border-2 border-[#FFFFFF] bg-[#FFF]/10 flex justify-center items-center z-10 font-mono text-[20px] font-bold">
              L2 CACHE
            </div>

            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[440px] h-[60px] border border-[#00E5FF] flex justify-center items-center font-mono text-[#00E5FF] text-[14px] bg-[#00E5FF]/10">GRAPHICS PROCESSOR CLUSTER</div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[440px] h-[60px] border border-[#00E5FF] flex justify-center items-center font-mono text-[#00E5FF] text-[14px] bg-[#00E5FF]/10">GRAPHICS PROCESSOR CLUSTER</div>
            <div className="absolute left-8 top-1/2 -translate-y-1/2 h-[180px] w-[60px] border border-[#00E5FF] flex justify-center items-center font-mono text-[#00E5FF] text-[14px] bg-[#00E5FF]/10 writing-vertical rotate-180">GPC</div>
            <div className="absolute right-8 top-1/2 -translate-y-1/2 h-[180px] w-[60px] border border-[#00E5FF] flex justify-center items-center font-mono text-[#00E5FF] text-[14px] bg-[#00E5FF]/10 writing-vertical rotate-180">GPC</div>
          </div>
          
          <div className="w-full flex justify-between px-12 mt-6">
            <div className="w-1/3 pr-4"><BulletList items={["Integrates multiple internal GPCs."]} /></div>
            <div className="w-1/3 px-2"><BulletList items={["Centralizes L2 Cache to minimize data travel distance."]} /></div>
            <div className="w-1/3 pl-4"><BulletList items={["Surrounds cores with massive I/O controllers."]} /></div>
          </div>
        </div>
      );

    case 6:
      return (
        <div className="w-full h-full flex p-16">
          <div className="w-[45%] flex flex-col justify-center pr-12">
            <Title className="text-[44px] mb-10">
              Rubin packs 224 Streaming Multiprocessors per GPU.
            </Title>
            <BulletList
              items={[
                "Massive parallelization requires extreme core density.",
                "Each SM is optimized for maximum instruction throughput.",
                "Architectural layout prioritizes minimal latency between adjacent multiprocessors."
              ]}
            />
          </div>
          <div className="w-[55%] h-full flex justify-center items-center">
            <div className="w-[480px] h-[480px] border border-[#333] p-4 bg-[#111] flex flex-col">
               <div className="font-mono text-[#76B900] mb-3 text-[12px] tracking-widest bg-[#111] px-1 w-max">GPC_INTERNAL_MATRIX // 224_SM_ARRAY</div>
               <div className="flex-1 w-full grid grid-cols-14 grid-rows-16 gap-1 relative overflow-hidden">
                  {[...Array(224)].map((_, i) => (
                    <div key={i} className="bg-[#76B900]/20 border border-[#76B900]/40 rounded-[1px] hover:bg-[#76B900] transition-colors duration-200"></div>
                  ))}
                  <div className="absolute top-0 left-0 w-full h-[15px] bg-[#76B900]/50 blur-sm animate-[ping_3s_infinite] pointer-events-none"></div>
               </div>
            </div>
          </div>
        </div>
      );

    case 7:
      return (
        <div className="w-full h-full p-16 flex relative overflow-hidden">
           <div className="w-[45%] flex flex-col justify-center z-10 pr-10">
              <Title className="text-[40px] mb-8">
                896 dedicated Tensor Cores accelerate complex matrix multiplication.
              </Title>
              <BulletList
                items={[
                  "Four Tensor Cores integrated per Streaming Multiprocessor.",
                  "Purpose-built hardware for deep learning primitives.",
                  "Operates independently from standard floating-point units to maximize throughput."
                ]}
              />
           </div>
           
           <div className="w-[55%] h-full flex items-center justify-end relative">
              <div className="w-[500px] h-[460px] border border-[#333] bg-[#0F111A] flex items-center justify-center relative shadow-[0_0_60px_rgba(118,185,0,0.1)]">
                 <div className="w-[380px] h-[380px] border-2 border-[#76B900] p-5 relative flex flex-col justify-between">
                    <div className="absolute top-[-12px] left-4 bg-[#0B0C10] px-2 font-mono text-[#76B900] tracking-widest text-[12px]">STREAMING_MULTIPROCESSOR (SM)</div>
                    
                    <div className="w-full h-[100px] border border-[#555] flex justify-between p-3 bg-[#111]">
                       <div className="w-[20%] h-full border border-[#444] bg-[#222]"></div>
                       <div className="w-[70%] h-full border border-[#444] bg-[#222] flex flex-col justify-around p-2">
                          <div className="h-[2px] w-full bg-[#555]"></div>
                          <div className="h-[2px] w-full bg-[#555]"></div>
                          <div className="h-[2px] w-full bg-[#555]"></div>
                       </div>
                    </div>

                    <div className="w-full h-[220px] grid grid-cols-2 grid-rows-2 gap-3 relative">
                       {[1,2,3,4].map((i) => (
                         <div key={i} className="border border-[#00E5FF] bg-[#00E5FF]/10 flex flex-col items-center justify-center group relative overflow-hidden">
                            <div className="w-12 h-12 border-2 border-[#00E5FF] rotate-45 flex items-center justify-center">
                               <div className="w-6 h-6 bg-[#00E5FF]/50 -rotate-45"></div>
                            </div>
                            <div className="absolute bottom-2 font-mono text-[#00E5FF] text-[10px] uppercase">Tensor Core {i}</div>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      );

    case 8:
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-16">
          <div className="text-center mb-12 relative">
            <div className="font-sans font-bold text-[180px] leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#76B900] to-[#00E5FF] select-all drop-shadow-lg">
              50
            </div>
            <div className="font-sans font-bold text-[64px] leading-none tracking-tight text-[#FFFFFF] uppercase mt-[-10px]">
              PetaFLOPS
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#76B900]/10 blur-[80px] -z-10 pointer-events-none"></div>
          </div>
          <Title className="text-[32px] text-center w-[800px] mb-10">
            Rubin delivers 50 PetaFLOPS of sparse INT4 and FP4 performance.
          </Title>
          <div className="w-[900px]">
            <BulletList
              items={[
                "Drives unprecedented speed in lower-precision inferencing and training.",
                "Hardware-level sparsity support literally doubles effective throughput.",
                "Optimized specifically for next-generation large language models."
              ]}
            />
          </div>
        </div>
      );

    case 9:
      return (
        <div className="w-full h-full p-16 flex relative overflow-hidden items-center">
           <div className="w-[50%] flex flex-col justify-center z-10 pr-12">
              <Title className="text-[44px] mb-10 leading-tight">
                Advanced HBM controllers and NV-HBI eliminate memory bandwidth constraints.
              </Title>
              <BulletList
                items={[
                  "High Bandwidth Memory Controllers surround the core compute clusters.",
                  "NV-HBI ensures seamless data flow from memory directly into the L2 Cache.",
                  "Prevents the 896 Tensor Cores from stalling during data retrieval."
                ]}
              />
           </div>
           
           <div className="w-[50%] h-[560px] border-[3px] border-[#333] rounded-[30px] p-6 flex justify-start items-center bg-[#0F111A] relative shadow-lg">
               <div className="w-[200px] h-[460px] border-l-[3px] border-dashed border-[#00E5FF]/40 absolute left-20 flex flex-col justify-between py-6">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-[100px] h-[60px] border border-[#00E5FF] bg-[#00E5FF]/20 absolute left-[-50px] flex items-center justify-center font-mono text-[12px] text-[#00E5FF] text-center" style={{ top: `${(i-1)*23}%` }}>
                       HBM CTRL
                       <div className="absolute right-[-60px] w-[60px] h-[3px] bg-[#00E5FF]">
                          <div className="absolute right-[-3px] top-[-4.5px] w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[10px] border-l-[#00E5FF]"></div>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="w-[260px] h-[500px] border-2 border-[#FFFFFF] ml-[180px] bg-[#FFFFFF]/5 flex items-center justify-center shadow-inner">
                  <span className="font-sans font-bold text-[48px] text-[#FFFFFF]/30 -rotate-90 tracking-widest whitespace-nowrap">L2 CACHE</span>
               </div>
           </div>
        </div>
      );

    case 10:
      return (
        <div className="w-full h-full p-16 flex flex-col justify-between">
           <div>
              <Title className="text-[44px] w-[900px] mb-8">
                PCIe Gen 6 architecture guarantees 256 GB/s across the CPU Host Interface.
              </Title>
              <div className="w-[900px]">
                <BulletList
                  items={[
                    "Integrates x16 PCIe Gen 6 lanes directly into the Rubin architecture.",
                    "Doubles baseline I/O bandwidth compared to previous generations.",
                    "Future-proofs connectivity for secondary storage and auxiliary networking."
                  ]}
                />
              </div>
           </div>

           <div className="w-full h-[220px] mt-8 relative flex items-end">
              <div className="w-full h-[80px] border-t-[3px] border-x-[3px] border-[#555] bg-[#1A1C23] relative rounded-t-xl flex justify-center items-end px-12 pb-2 gap-3">
                 <div className="absolute top-3 left-4 font-mono text-[#FFF] tracking-widest text-[12px] bg-[#1A1C23] px-2">RUBIN_PERIMETER_I/O</div>
                 {[...Array(16)].map((_, i) => (
                    <div key={i} className="flex-1 h-[120px] border-x border-[#00E5FF]/40 bg-gradient-to-b from-[#00E5FF]/20 to-transparent relative translate-y-16">
                       <div className="w-full h-[3px] bg-[#00E5FF] absolute top-0"></div>
                       <div className="absolute top-0 left-1/2 w-[2px] h-[40px] bg-[#FFFFFF] -translate-x-1/2 animate-bounce"></div>
                    </div>
                 ))}
              </div>
              <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[500px] h-[30px] bg-[#00E5FF]/20 blur-xl pointer-events-none"></div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[20px] text-[#00E5FF] bg-[#0B0C10] px-6 py-2 border border-[#00E5FF] rounded shadow-lg whitespace-nowrap z-10">
                 256 GB/s Host Interface (x16 Lanes)
              </div>
           </div>
        </div>
      );

    case 11:
      return (
        <div className="w-full h-full flex p-16 items-center">
          <div className="w-[45%] flex flex-col z-10 pr-12">
            <Title className="text-[44px] mb-10">
              The NVLink 6 Switch dictates physical cluster topology and data routing.
            </Title>
            <BulletList
              items={[
                "Scales the coherent GPU-to-GPU memory fabric across the entire rack.",
                "Essential for operating massive model parameters that exceed single-node memory.",
                "The physical design of the switch tray determines the layout of the compute trays."
              ]}
            />
          </div>
          <div className="w-[55%] h-[500px] flex justify-center items-center relative perspective-[1000px]">
             <svg viewBox="0 0 800 600" className="w-full h-full drop-shadow-2xl">
               <g transform="translate(150, 250) rotate(-15) skewX(30) scale(1.1)">
                 <rect x="0" y="0" width="350" height="200" fill="rgba(118, 185, 0, 0.05)" stroke="#76B900" strokeWidth="2" />
                 <rect x="125" y="60" width="100" height="80" fill="#76B900" stroke="#FFF" strokeWidth="2" className="drop-shadow-[0_0_15px_rgba(118,185,0,0.8)]" />
                 {[...Array(12)].map((_, i) => (
                    <path key={`t-${i}`} d={`M ${125 + i*(100/12)} 60 L ${i*30} 0`} stroke="#76B900" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                 ))}
                 {[...Array(12)].map((_, i) => (
                    <path key={`b-${i}`} d={`M ${125 + i*(100/12)} 140 L ${350 - i*30} 200`} stroke="#76B900" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                 ))}
                 <rect x="0" y="-10" width="350" height="10" fill="#444" stroke="#76B900" strokeWidth="1" />
                 <text x="20" y="180" fill="#76B900" fontFamily="monospace" fontSize="14" transform="skewX(-30) rotate(15)">NVLINK 6 SWITCH TRAY</text>
               </g>
             </svg>
          </div>
        </div>
      );

    case 12:
      return (
        <div className="w-full h-full p-16 flex flex-col justify-center">
           <Title className="text-[44px] w-full text-center mb-16">
             The ecosystem establishes a strict 1.6T networking standard.
           </Title>
           
           <div className="flex w-full items-center justify-center space-x-10 mb-20">
              <div className="flex flex-col items-center">
                 <div className="font-mono text-[20px] text-[#A0A0A0] mb-3">Legacy 400G</div>
                 <div className="w-[180px] h-[16px] bg-[#333] border-y border-[#555] relative overflow-hidden">
                    <div className="w-1/2 h-full bg-[#555] absolute left-0 animate-pulse"></div>
                 </div>
              </div>

              <ArrowRight size={28} className="text-[#555]" />

              <div className="flex flex-col items-center">
                 <div className="font-mono text-[24px] text-[#00E5FF] mb-3">Current 800G</div>
                 <div className="w-[260px] h-[30px] bg-[#00E5FF]/20 border-y border-[#00E5FF] relative overflow-hidden shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                    <div className="w-1/2 h-full bg-[#00E5FF]/60 absolute left-1/4 animate-[pulse_1s_infinite]"></div>
                 </div>
              </div>

              <ArrowRight size={40} className="text-[#00E5FF]" />

              <div className="flex flex-col items-center relative z-10">
                 <div className="font-sans font-bold text-[40px] text-[#FFFFFF] mb-3 tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">1.6T STANDARD</div>
                 <div className="w-[360px] h-[60px] bg-[#FFFFFF]/20 border-y-[3px] border-[#FFFFFF] relative overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                    <div className="w-full h-full flex justify-around items-center">
                       {[...Array(18)].map((_, i) => (
                         <div key={i} className="w-[8px] h-[50px] bg-[#FFFFFF] skew-x-[-20deg]"></div>
                       ))}
                    </div>
                 </div>
                 <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-[150px] h-[150px] bg-[#FFFFFF]/20 blur-2xl -z-10 pointer-events-none"></div>
              </div>
           </div>

           <div className="w-full flex justify-center">
             <div className="w-[900px]">
               <BulletList items={[
                 "Unprecedented 1.6 Terabits per second throughput per port.",
                 "Essential for synchronizing parameters across thousands of distinct GPUs.",
                 "Eliminates the network as the primary bottleneck in hyperscale training."
               ]} />
             </div>
           </div>
        </div>
      );

    case 13:
      return (
        <div className="w-full h-full p-12 grid grid-cols-2 grid-rows-2 gap-8 items-center">
           <div className="col-span-1 row-span-1 pr-6 flex flex-col justify-center">
              <Title className="text-[38px] leading-tight mb-6">
                BlueField-4 DPUs offload critical infrastructure tasks from the core cluster.
              </Title>
              <BulletList
                items={[
                  "Manages security, storage routing, and network virtualization.",
                  "Prevents host CPU cycles from being wasted on infrastructure management.",
                  "Drives the 1.6T Ethernet and InfiniBand connections directly at the edge."
                ]}
              />
           </div>

           <div className="col-span-1 row-span-1 h-[240px] border border-[#333] p-6 flex flex-col relative overflow-hidden bg-[#0F111A]">
              <div className="absolute top-4 left-4 text-[#00E5FF] font-mono text-xs tracking-widest bg-[#0F111A] px-1"><Activity size={16} className="inline mr-2" />INGRESS_TRAFFIC</div>
              <div className="mt-6 flex-1 flex items-center justify-between">
                 <div className="flex flex-col gap-3">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-12 h-3 bg-[#00E5FF] skew-x-12 opacity-80"></div>
                    ))}
                 </div>
                 <div className="w-[120px] h-[120px] border-2 border-[#FFFFFF] rounded-lg bg-[#222] flex flex-col justify-center items-center text-center px-3 relative z-10 shadow-lg">
                    <Layers size={28} className="text-[#FFF] mb-2" />
                    <span className="font-mono text-[12px] leading-tight text-[#FFF]">BLUEFIELD-4 INTERCEPT</span>
                 </div>
              </div>
           </div>

           <div className="col-span-1 row-span-1 h-[240px] border border-[#333] p-6 relative flex items-center justify-center bg-[#0F111A]">
              <div className="absolute top-4 left-4 text-[#A0A0A0] font-mono text-xs tracking-widest bg-[#0F111A] px-1"><Server size={16} className="inline mr-2" />INFRASTRUCTURE_MGMT</div>
              <div className="w-full h-[100px] flex gap-3 z-10 mt-4">
                 <div className="flex-1 border border-[#444] bg-[#111] flex flex-col justify-center items-center font-mono text-[#777] text-xs text-center px-2"><span>SECURITY</span><br/><span>FW</span></div>
                 <div className="flex-1 border border-[#444] bg-[#111] flex justify-center items-center font-mono text-[#777] text-xs text-center px-2">VIRTUALIZATION</div>
                 <div className="flex-1 border border-[#444] bg-[#111] flex justify-center items-center font-mono text-[#777] text-xs text-center px-2">STORAGE ROUTING</div>
              </div>
              <ArrowRight className="absolute right-[-20px] text-[#555] bg-[#0B0C10] z-20" size={40} />
           </div>

           <div className="col-span-1 row-span-1 h-[240px] border border-[#76B900] p-6 relative flex flex-col justify-center items-center bg-[#76B900]/5">
              <div className="absolute top-4 left-4 text-[#76B900] font-mono text-xs tracking-widest bg-[#0B0C10] px-1"><Cpu size={16} className="inline mr-2" />CLEAN_COMPUTE_FEED</div>
              <div className="w-full flex items-center justify-between mt-6 px-4">
                 <div className="w-1/2 h-6 bg-gradient-to-r from-[#76B900] to-transparent relative rounded-full">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#FFF] rounded-full shadow-[0_0_10px_#FFF]"></div>
                 </div>
                 <div className="w-[100px] h-[100px] border-2 border-[#76B900] bg-[#76B900]/20 flex items-center justify-center font-mono text-lg text-[#76B900] shadow-[0_0_20px_rgba(118,185,0,0.2)]">GPU</div>
              </div>
           </div>
        </div>
      );

    case 14:
      return (
        <div className="w-full h-full flex p-12 items-center">
          <div className="w-[45%] flex flex-col justify-center pr-12 border-r border-[#333]">
             <Title className="text-[44px] mb-10">
               ConnectX-9 SmartNICs provide the physical interface for scale-out fabrics.
             </Title>
             <BulletList
                items={[
                  "The primary engine for RDMA (Remote Direct Memory Access) over Converged Ethernet.",
                  "Minimizes tail latency across massive parallel workloads.",
                  "Works in tandem with BlueField-4 to guarantee the 1.6T throughput requirement."
                ]}
              />
          </div>
          <div className="w-[55%] h-[400px] bg-[#0F111A] relative overflow-hidden flex items-center justify-center perspective-[800px] ml-12 border border-[#333] rounded-lg">
             <div className="relative w-[500px] h-[220px] transform rotate-x-12 rotate-y-[-10deg] rotate-z-3 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
                <div className="absolute top-0 left-0 w-full h-full bg-[#1A3A1A] border-[3px] border-[#0F2F0F] rounded overflow-hidden">
                   <div className="absolute bottom-0 left-12 w-[240px] h-6 bg-gradient-to-b from-[#C5A059] to-[#8C6B26] flex gap-[2px] px-1">
                      {[...Array(30)].map((_,i) => <div key={i} className="flex-1 h-full bg-[#FFF]/10 border-x border-[#000]/20"></div>)}
                   </div>
                   <div className="absolute top-1/2 left-[240px] -translate-y-1/2 w-[90px] h-[90px] bg-[#111] border border-[#333] flex items-center justify-center shadow-inner">
                      <div className="w-[60px] h-[60px] bg-[#0A0A0A] flex items-center justify-center border border-[#222]">
                         <span className="font-sans text-[8px] text-[#555] tracking-widest">NVIDIA</span>
                      </div>
                   </div>
                   <div className="absolute top-3 left-[220px] w-[130px] h-[160px] border border-[#222] pointer-events-none flex flex-col justify-between py-1">
                     {[...Array(12)].map((_,i) => <div key={i} className="w-full h-[1px] bg-[#333]"></div>)}
                   </div>
                </div>

                <div className="absolute top-[-5px] right-[-20px] w-[30px] h-[230px] bg-[#C0C0C0] border border-[#999] shadow-xl flex flex-col items-center justify-around py-6 z-10">
                   <div className="w-6 h-12 bg-[#111] border border-[#000] relative group">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#00E5FF] rounded-full blur-[1px] animate-pulse"></div>
                      <div className="absolute top-1/2 left-6 w-[140px] h-[3px] bg-[#00E5FF] origin-left scale-x-0 transition-transform duration-[0.1s] group-hover:scale-x-100 drop-shadow-[0_0_8px_#00E5FF]"></div>
                   </div>
                   <div className="w-6 h-12 bg-[#111] border border-[#000] relative group">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#00E5FF] rounded-full blur-[1px] animate-[pulse_0.8s_infinite]"></div>
                      <div className="absolute top-1/2 left-6 w-[140px] h-[3px] bg-[#00E5FF] origin-left scale-x-[1] drop-shadow-[0_0_8px_#00E5FF]"></div>
                   </div>
                </div>
                
                <div className="absolute bottom-[-40px] right-0 font-mono text-[#00E5FF] text-[14px] tracking-widest drop-shadow-md bg-[#0B0C10] px-2 py-1 border border-[#00E5FF]/30">
                   CONNECTX-9_OSFP_1.6T_PORTS
                </div>
             </div>
          </div>
        </div>
      );

    case 15:
      return (
        <div className="w-full h-full p-16 flex flex-col items-center justify-between">
           <Title className="text-[44px] text-center mb-8 relative z-10">
              Spectrum-6 acts as the master traffic director for the entire datacenter fabric.
           </Title>

           <div className="flex-1 w-full flex justify-between items-center px-4">
              <div className="w-[340px]">
                 <BulletList items={[
                   "Coordinates the 1.6T Ethernet and InfiniBand hybrid ecosystem.",
                   "Designed to handle unprecedented data torrents across thousands of nodes."
                 ]} />
              </div>

              <div className="relative w-[480px] h-[400px] flex justify-center items-center">
                 <div className="w-[140px] h-[140px] bg-[#0B0C10] border-[3px] border-[#FFFFFF] flex flex-col items-center justify-center z-20 shadow-[0_0_50px_rgba(255,255,255,0.15)] rounded">
                    <Network size={36} className="text-[#FFFFFF] mb-2" />
                    <span className="font-mono text-[#FFFFFF] font-bold text-[14px]">SPECTRUM-6</span>
                 </div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] bg-[#FFFFFF]/10 blur-xl z-10 pointer-events-none"></div>

                 {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                    const radius = 170;
                    const rad = angle * (Math.PI / 180);
                    const x = Math.cos(rad) * radius;
                    const y = Math.sin(rad) * radius;
                    
                    return (
                      <React.Fragment key={i}>
                         <div className="absolute top-1/2 left-1/2 origin-left z-0 h-[2px] bg-gradient-to-r from-[#FFFFFF] to-[#00E5FF]/40" style={{ width: `${radius}px`, transform: `translateY(-50%) rotate(${angle}deg)` }}>
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-6 h-1.5 bg-[#00E5FF] rounded-full opacity-80 animate-[ping_1.5s_infinite]"></div>
                         </div>
                         <div className="absolute top-1/2 left-1/2 w-[60px] h-[60px] bg-[#0F111A] border border-[#00E5FF] -ml-[30px] -mt-[30px] flex items-center justify-center z-20 rounded" style={{ transform: `translate(${x}px, ${y}px)` }}>
                            <Box size={20} className="text-[#00E5FF]" />
                         </div>
                      </React.Fragment>
                    );
                 })}
              </div>

              <div className="w-[340px]">
                 <BulletList items={[
                   "Optimizes routing paths dynamically to prevent fabric congestion."
                 ]} />
              </div>
           </div>
        </div>
      );

    case 16:
      return (
        <div className="w-full h-full p-12 flex items-center">
           <div className="w-[45%] flex flex-col justify-center pr-10 z-10">
              <Title className="text-[44px] leading-tight mb-8">
                The VR NVL72 rack centralizes compute, networking, and power in one chassis.
              </Title>
              <BulletList
                items={[
                  "A monolithic system designed to operate as a single logical GPU.",
                  "Integrates 72 Rubin GPUs through NVLink 6 within a single footprint.",
                  "Marks the end of treating servers as independent, stackable boxes."
                ]}
              />
           </div>
           
           <div className="w-[55%] h-full flex justify-center relative items-center">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[540px] bg-[#76B900]/10 blur-[80px] z-0 pointer-events-none"></div>
              
              <div className="w-[260px] h-[540px] border-[3px] border-[#444] bg-[#0B0C10] flex flex-col justify-between p-2 z-10 relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-sm">
                 <div className="absolute top-[-28px] left-1/2 -translate-x-1/2 font-sans font-bold text-[14px] tracking-widest text-[#FFFFFF] bg-[#0B0C10] px-2 whitespace-nowrap border border-[#333]">VR_NVL72_ARCHITECTURE</div>
                 
                 {/* Networking/Switch Zone (Top) */}
                 <div className="w-full h-[15%] border border-[#00E5FF]/40 bg-[#00E5FF]/5 mb-1.5 flex flex-col gap-[2px] p-1.5 relative">
                    {[...Array(3)].map((_, i) => <div key={i} className="flex-1 border border-[#00E5FF]/60 flex items-center px-1"><div className="w-full h-[1px] bg-[#00E5FF] opacity-50"></div></div>)}
                    <div className="absolute -left-[110px] top-3 font-mono text-[11px] text-[#00E5FF] text-right w-[90px] leading-tight">NETWORK<br/>SWITCHES</div>
                    <div className="absolute -left-[10px] top-5 w-[10px] h-[1px] bg-[#00E5FF]"></div>
                 </div>

                 {/* Compute Zone (Middle) */}
                 <div className="w-full h-[70%] border border-[#76B900]/60 bg-[#76B900]/5 mb-1.5 flex flex-col justify-around p-1.5 gap-[2px] relative overflow-hidden">
                    {[...Array(18)].map((_, i) => (
                      <div key={i} className="flex-1 bg-[#111] border border-[#76B900]/30 relative flex items-center justify-center">
                         <div className="flex gap-1 w-[80%] opacity-40">
                            {[1,2,3,4].map((j) => <div key={j} className="flex-1 h-[2px] bg-[#76B900]"></div>)}
                         </div>
                      </div>
                    ))}
                    <div className="absolute top-0 left-0 w-[3px] h-full bg-[#76B900]"></div>
                    <div className="absolute right-[-140px] top-1/2 -translate-y-1/2 font-mono text-[11px] text-[#76B900] w-[120px] leading-tight">72x RUBIN GPUs<br/>(COMPUTE ZONE)</div>
                    <div className="absolute right-[-10px] top-1/2 w-[10px] h-[1px] bg-[#76B900]"></div>
                 </div>

                 {/* Power/Cooling Zone (Bottom) */}
                 <div className="w-full h-[12%] border border-[#FFFFFF]/40 bg-[#FFF]/5 flex flex-col gap-1 p-1.5">
                    {[...Array(2)].map((_, i) => <div key={i} className="flex-1 border border-[#FFF]/30 bg-[#FFF]/10 flex items-center justify-center font-mono text-[#FFF] text-[10px]">PSU BLOCK</div>)}
                 </div>
              </div>
           </div>
        </div>
      );

    case 17:
      return (
        <div className="w-full h-full p-16 flex items-center">
           <div className="w-[45%] pr-12 flex flex-col justify-center">
              <Title className="text-[44px] mb-10">
                The seamless cableless compute tray design revolutionizes physical scaling.
              </Title>
              <BulletList
                items={[
                  "Eliminates thousands of manual optical and copper cable connections.",
                  "Utilizes blind-mate, high-density backplane connectors for instantaneous links.",
                  "Drastically reduces mechanical failure points and accelerates deployment times."
                ]}
              />
           </div>

           <div className="w-[55%] h-[460px] relative perspective-[1200px] flex items-center justify-center border border-[#333] bg-[#0F111A] rounded-lg overflow-hidden">
              <div className="absolute right-12 w-[60px] h-[360px] bg-[#111] border-l-[3px] border-[#00E5FF] flex flex-col justify-around py-6 shadow-[-15px_0_30px_rgba(0,229,255,0.2)] transform rotate-y-[-15deg] rotate-x-5 z-10">
                 {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-full h-[16px] bg-[#00E5FF]/20 border-y border-[#00E5FF]/50 relative">
                       {i === 4 && <div className="absolute left-[-6px] top-0 w-2 h-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF] animate-pulse"></div>}
                    </div>
                 ))}
                 <div className="absolute -left-[140px] top-2 font-mono text-[12px] text-[#00E5FF] text-right bg-[#0F111A] px-1">BLIND-MATE<br/>BACKPLANE</div>
              </div>

              <div className="absolute left-8 w-[340px] h-[60px] bg-[#1A1C23] border border-[#555] shadow-xl transform rotate-y-[-15deg] rotate-x-5 translate-x-[20px] translate-y-[10px] transition-transform duration-1000 ease-in-out hover:translate-x-[100px] z-20">
                 <div className="absolute top-0 w-full h-full border-b-[6px] border-[#0F111A]"></div>
                 <div className="absolute top-[-8px] left-8 w-[240px] h-full flex gap-3 opacity-80">
                    {[1,2,3,4].map((i) => <div key={i} className="flex-1 bg-[#111] border-t-[2px] border-[#76B900]"></div>)}
                 </div>
                 <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 w-[15px] h-[40px] bg-[#333] border-r-[3px] border-[#00E5FF] shadow-[10px_0_20px_rgba(0,229,255,0.4)]"></div>
                 
                 <div className="absolute right-[-70px] top-1/2 -translate-y-1/2 w-[40px] h-[2px] bg-[#FFF]/40 border-dashed border-b flex justify-end items-center">
                    <ArrowRight size={14} className="text-[#FFF]" />
                 </div>
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[#A0A0A0] text-[14px] tracking-widest border border-[#333] px-4 py-2 bg-[#0B0C10] z-30 shadow-md">
                 Zero Rear Cabling / Direct Node Interface
              </div>
           </div>
        </div>
      );

    case 18:
      return (
        <div className="w-full h-full p-16 flex flex-col items-center justify-between">
           <Title className="text-[44px] text-center mb-6">
             Removing cable density unlocks the necessary pathways for extreme cooling.
           </Title>
           <div className="w-[900px] mb-8">
             <BulletList
                items={[
                  "Previous generations suffered from restricted airflow due to massive cable bundles.",
                  "The cableless backplane allows unobstructed thermal dissipation.",
                  "Enables the rack to support the intense thermal load of 72 densely packed GPUs."
                ]}
              />
           </div>

           <div className="w-[900px] h-[280px] border border-[#333] bg-[#0F111A] relative flex overflow-hidden rounded-lg shadow-xl">
              <div className="absolute top-3 left-4 font-mono text-[12px] text-[#A0A0A0] tracking-widest flex items-center gap-2 z-20 bg-[#0F111A] px-2 py-1 border border-[#333]">
                 <ThermometerSnowflake size={16} /> THERMAL_CROSS_SECTION
              </div>

              <div className="w-[140px] h-full bg-gradient-to-r from-[#00E5FF]/20 to-transparent flex flex-col justify-around py-6 z-10">
                 {[1,2,3,4].map((i) => (
                    <div key={i} className="w-[80px] h-3 bg-[#00E5FF]/40 rounded-r-full flex items-center justify-end pr-1 animate-[slideRight_2s_infinite]">
                       <ChevronRight size={14} className="text-[#00E5FF]" />
                    </div>
                 ))}
                 <div className="absolute bottom-3 left-4 font-mono text-[#00E5FF] font-bold text-[14px]">COLD AISLE</div>
              </div>

              <div className="flex-1 h-full border-x-2 border-[#555] bg-[#111] relative z-0 flex flex-col justify-around px-6 py-2">
                 {[1,2,3,4].map((i) => (
                    <div key={i} className="w-full h-[24px] border border-[#76B900]/30 bg-[#76B900]/5 flex justify-between px-8 relative">
                       <div className="w-full h-[1px] bg-gradient-to-r from-[#00E5FF]/40 via-transparent to-[#FF3366]/40 absolute top-1/2 -translate-y-1/2"></div>
                    </div>
                 ))}
              </div>

              <div className="w-[140px] h-full bg-gradient-to-l from-[#FF3366]/20 to-transparent flex flex-col justify-around py-6 z-10 items-end">
                 {[1,2,3,4].map((i) => (
                    <div key={i} className="w-[80px] h-3 bg-[#FF3366]/40 rounded-l-full flex items-center justify-start pl-1 animate-[slideRight_2s_infinite] delay-1000">
                       <ChevronRight size={14} className="text-[#FF3366]" />
                    </div>
                 ))}
                 <div className="absolute bottom-3 right-4 font-mono text-[#FF3366] font-bold text-[14px]">HOT AISLE</div>
              </div>
              
              <div className="absolute right-[140px] top-0 w-[3px] h-full bg-[#333] border-x border-[#555]">
                 <div className="absolute -left-[150px] top-1/2 -translate-y-1/2 bg-[#0B0C10] border border-[#A0A0A0] text-[#A0A0A0] font-mono text-[10px] px-2 py-1 shadow-md">UNOBSTRUCTED EXHAUST</div>
              </div>
           </div>
        </div>
      );

    case 19:
      return (
        <div className="w-full h-full p-16 flex items-center">
           <div className="w-[40%] h-full flex justify-center items-center relative pr-12 border-r border-[#333]">
              <div className="w-[100px] h-[520px] border-[3px] border-[#333] bg-[#111] relative flex justify-center shadow-[0_0_40px_rgba(118,185,0,0.15)] rounded-sm">
                 <div className="absolute top-[-24px] font-mono text-[14px] text-[#76B900] tracking-widest whitespace-nowrap bg-[#0B0C10] px-1 border border-[#333]">POWER_SPINE</div>
                 
                 <div className="w-[16px] h-full bg-gradient-to-b from-[#76B900] to-[#3B5D00] mx-1.5 shadow-[0_0_8px_#76B900]"></div>
                 <div className="w-[16px] h-full bg-gradient-to-b from-[#76B900] to-[#3B5D00] mx-1.5 shadow-[0_0_8px_#76B900]"></div>
                 
                 {[...Array(12)].map((_, i) => (
                    <div key={i} className="absolute w-[30px] h-[4px] bg-[#76B900] right-[-15px]" style={{ top: `${(i+1)*7.5}%` }}>
                       <div className="absolute right-[-45px] top-[-8px] text-[#76B900] font-mono text-[10px] flex items-center gap-1 bg-[#111] px-1"><Zap size={10} /> TAP</div>
                    </div>
                 ))}
                 
                 <div className="absolute bottom-[-30px] w-[70px] h-[30px] border-t-[3px] border-[#FFF] bg-[#222] flex justify-center items-center rounded-b-sm">
                    <span className="text-[#FFF] font-mono text-[10px] font-bold">HV INLET</span>
                 </div>
              </div>
           </div>

           <div className="w-[60%] pl-12 flex flex-col justify-center">
              <Title className="text-[44px] mb-10">
                A custom Power Rack architecture replaces standard power distribution units.
              </Title>
              <BulletList
                items={[
                  "Built specifically to handle the extreme kilowatt thresholds of the Rubin generation.",
                  "Consolidates power conversion to maximize usable compute space within the chassis.",
                  "Delivers precise, stable voltage directly to the massive silicon components without traditional wiring."
                ]}
              />
           </div>
        </div>
      );

    case 20:
      return (
        <div className="w-full h-full p-12 flex flex-col items-center justify-between">
           <Title className="text-[40px] text-center mt-2 mb-6">
             The BoM and TCO reflect the premium of ultimate system density.
           </Title>
           
           <div className="w-[800px] h-[260px] border-b-2 border-l-2 border-[#555] relative flex items-end justify-around px-12 mb-6 mt-4">
              <div className="absolute top-[-20px] left-[-30px] font-mono text-[10px] text-[#A0A0A0] rotate-[-90deg] tracking-widest">RELATIVE COST/FOOTPRINT</div>
              
              <div className="w-[100px] h-[65%] relative flex flex-col justify-end group">
                 <div className="w-full h-[55%] border border-[#333] bg-[#222] absolute bottom-0"></div>
                 <div className="w-full h-[45%] border border-[#00E5FF]/40 bg-[#00E5FF]/20 absolute bottom-[55%] flex items-center justify-center font-mono text-[10px] text-[#00E5FF]">INFRASTRUCTURE</div>
                 <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 font-sans font-bold text-[#A0A0A0] text-[12px] whitespace-nowrap">LEGACY CLUSTER</div>
              </div>

              <div className="w-[100px] h-[80%] relative flex flex-col justify-end group">
                 <div className="w-full h-[75%] border border-[#FF9900]/40 bg-[#FF9900]/20 absolute bottom-0 flex items-center justify-center font-mono text-[10px] text-[#FF9900] text-center">COMPUTE<br/>(4nm)</div>
                 <div className="w-full h-[25%] border border-[#333] bg-[#222] absolute bottom-[75%]"></div>
                 <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 font-sans font-bold text-[#FFF] text-[12px] whitespace-nowrap">256 LPU RACK</div>
              </div>

              <div className="w-[100px] h-[100%] relative flex flex-col justify-end group">
                 <div className="w-full h-[90%] border-[2px] border-[#76B900] bg-[#76B900]/30 absolute bottom-0 flex items-center justify-center font-mono text-[10px] text-[#76B900] shadow-[0_0_20px_rgba(118,185,0,0.2)] text-center">RUBIN<br/>COMPUTE</div>
                 <div className="w-full h-[10%] border border-[#333] bg-[#222] absolute bottom-[90%]"></div>
                 <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 font-sans font-bold text-[#76B900] text-[14px] whitespace-nowrap">VR NVL72</div>
              </div>
           </div>

           <div className="w-full px-8 flex justify-between gap-6 mb-4 relative z-10">
              <div className="flex-1 bg-[#0F111A] p-5 border border-[#333] rounded-sm shadow-lg">
                 <p className="font-mono text-[#E0E0E0] text-[14px] leading-relaxed">VR NVL72 presents a completely revised Bill of Materials heavily skewing toward silicon.</p>
              </div>
              <div className="flex-1 bg-[#0F111A] p-5 border border-[#333] rounded-sm shadow-lg">
                 <p className="font-mono text-[#E0E0E0] text-[14px] leading-relaxed">Upfront capital expenditure is offset by massive gains in <strong className="text-[#76B900]">PetaFLOPS per watt</strong>.</p>
              </div>
              <div className="flex-1 bg-[#0F111A] p-5 border border-[#333] rounded-sm shadow-lg">
                 <p className="font-mono text-[#E0E0E0] text-[14px] leading-relaxed">Competing architectures push similar density boundaries relying on nodes like Samsung 4nm Gen 3.</p>
              </div>
           </div>
        </div>
      );

    case 21:
      return (
        <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-[#000]">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] perspective-[800px] z-0 opacity-40">
              <div className="w-full h-full transform rotate-x-[75deg] translate-y-[-10%] scale-[2]">
                 <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(#76B900 1px, transparent 1px), linear-gradient(90deg, #76B900 1px, transparent 1px)', backgroundSize: '100px 100px', opacity: 0.1 }}></div>
                 <div className="absolute top-0 left-0 w-full h-full flex flex-wrap gap-[50px] p-[50px] justify-center">
                    {[...Array(200)].map((_, i) => (
                       <div key={i} className="w-[40px] h-[150px] bg-[#0A100A] border-t-[3px] border-[#76B900] shadow-[0_-15px_30px_rgba(118,185,0,0.5)] transform -translate-y-[150px] origin-bottom opacity-80" style={{ animation: `pulse ${2 + Math.random()*2}s infinite alternate` }}></div>
                    ))}
                 </div>
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_10%,#000_70%)]"></div>
           </div>

           <Title className="text-[60px] font-bold text-[#FFFFFF] text-center z-10 w-[1000px] drop-shadow-[0_0_20px_#000] leading-tight">
              The datacenter is no longer a collection of computers. <br/><span className="text-[#76B900] mt-4 block">It is the computer.</span>
           </Title>
        </div>
      );

    default:
      return null;
  }
};

export default Presentation;