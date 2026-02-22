import React, { useState } from 'react';

// Data extracted from the Cantor Fitzgerald AI Report (February 1, 2025)
const reportData = {
  reportTitle: "Cantor's AI Monthly Muse-ings - February 2025 Edition",
  reportDate: "February 1, 2025",
  mainFocus: "DeepSeek Drama & its implications for AI Investment",
  deepSeekAnalysis: {
    coreQuestion: "What is the impact of DeepSeek's emergence and its claims of significantly cheaper AI model training/inference on the AI industry, particularly AI compute demand and investment?",
    keyFinding: "DeepSeek's emergence, despite the 'drama' around its cost claims, is viewed as a *significant positive* for the AI industry. It accelerates the path towards AGI/ASI and is therefore a *positive for AI infrastructure investment*. The report argues that claims of a 100x cost reduction are based on 'bad math' as DeepSeek is a distilled model leveraging costly foundational models and its figures exclude many cost inputs. Any sell-off is a buying opportunity.",
    topThoughts: [
      {
        title: "1. 'Bad Math' on Cost Reduction",
        detail: "The 100x cost reduction claim is misleading. DeepSeek is a distilled model using expensive foundational models (OpenAI, Llama, Alibaba) and excludes many cost inputs (e.g., >10k NVDA GPUs secured 3 years ago by the HF behind DeepSeek)."
      },
      {
        title: "2. Efficiency, Not New Capability",
        detail: "DeepSeek optimizes existing techniques (FP8, MOE, Cold Start Fine-Tuning, PTX, MLA, unsupervised RL), driving adoption, not replacing foundational innovation. Unsupervised RL may even increase compute."
      },
      {
        title: "3. Inference Cost-Downs = NVDA Product Cycle",
        detail: "Efficiency gains are normal (Huang's Law: 1M x in 10 yrs, 1M x more planned) and expand the market. DeepSeek's inference is ~1/4 of GPT-4. NVDA's Blackwell/Hopper saw up to 30x inference gains."
      },
      {
        title: "4. China's Advance Spurs US Investment",
        detail: "China's 'catch-up' (despite compute disadvantages) will likely increase US R&D and infrastructure spending to maintain leadership."
      },
      {
        title: "5. Efficiency Accelerates Innovation & Adoption",
        detail: "Like Moore's Law, efficiency opens new applications and democratizes AI. DeepSeek's rapid app store rise (#1) shows robust market appetite."
      }
    ],
    investorQA: [
      {
        q: "Foundational models: open-sourced / lifetime value decreased?",
        a: "Unlikely to reduce; opportunities for new specialized models. Security around models may increase to hamper distillation."
      },
      {
        q: "Spending plans altered into 2026 (ROIC focus)?",
        a: "More likely an *acceleration* of AI infrastructure buildouts due to the race to AI supremacy (AGI/ASI as 'winner take all')."
      },
      {
        q: "Custom ASIC vs. Merchant GPU debate?",
        a: "Faster innovation and model evolution favor GPU flexibility (NVDA). ASICs remain for scale and known workloads. No real change; HBM is key for both."
      },
      {
        q: "Accelerate Enterprise AI adoption with lower costs?",
        a: "Yes! (Jevons Paradox). Opens new AI applications within enterprises, good for NVDA's democratization efforts."
      },
      {
        q: "Accelerate edge AI adoption with LLM distillation?",
        a: "Could be. AI-driven device refresh (beyond 2026) could be pulled in. Gating factors: power consumption, on-device DRAM/logic."
      },
      {
        q: "Training cost reduction & inference focus: bad for NVDA?",
        a: "No. Inference is evolving (test-time scaling), compute becoming akin to training, playing to NVDA's strength. Both are tailwinds."
      },
      {
        q: "US Administration response to DeepSeek/China?",
        a: "Focus should be on restricting access to foundational models to limit distillation, not just hardware. AI Diffusion Rule likely to remain aggressive."
      }
    ]
  },
  marketData: {
    cloudCapex: {
      title: "Cloud Capex (MSFT, AMZN, GOOGL, META, ORCL - Consensus)",
      data: [
        { year: "2024E", value: "$227 Billion" },
        { year: "2025E", value: "$276 Billion", note: "up 1% since last publication" },
        { year: "2026E", value: "$299 Billion", note: "up 2% since last publication" }
      ]
    },
    sovereignAI: {
      title: "Sovereign AI Investments (Selected)",
      examples: [
        "US: 'Stargate' Project (up to $500B for new AI Infrastructure)",
        "India: $1.24B for sovereign AI supercomputer (10,000+ GPUs)",
        "Saudi Arabia: Plans for a $40B investment fund in AI companies",
        "UK: NextGen Cloud investing $1B for AI supercloud (>20,000 H100 GPUs)",
        "France: €2.5B national AI strategy, €500M for AI clusters",
        "Germany: Govt. pledged €1.6B, Microsoft investing $3.4B in Germany for AI",
        "Japan: Ministry approved $740M for AI initiative",
        "Canada: Allocating $2B for AI development"
      ]
    },
    privateFunding: {
      title: "Recent Private AI Fundraising Activity (Examples)",
      deals: [
        "OpenAI: $56B round (Thrive Capital)",
        "Anthropic: $2B (Lightspeed Venture Partners)",
        "Databricks: $1B+ (Meta joined as strategic investor)",
        "Skild AI: $4B (SoftBank, robotics foundational model)",
        "ElevenLabs: $500M (ICONIQ Growth, synthetic voice)",
        "Physical Intelligence: $400M (Jeff Bezos, OpenAI, Thrive, Lux Capital)"
      ]
    },
    historicalCostReduction: {
        title: "Historical AI Cost Reduction Example (GPT-3)",
        detail: "Processing 1M tokens with GPT-3: Cost dropped from ~$60 in 2021 to ~$0.06 in 2024 (a 1,000x reduction over 3 years)."
    }
  },
  investmentOutlook: {
    title: "Investment Insights & Outlook",
    insights: [
      "AI infrastructure investment remains strong, with efficiency gains driving broader adoption and further innovation.",
      "The race to AGI/ASI will fuel sustained, possibly accelerated, spending on R&D and infrastructure.",
      "GPUs (NVIDIA) maintain a favorable position due to flexibility in the rapidly evolving AI landscape; ASICs for specific, known workloads.",
      "High Bandwidth Memory (HBM) is a critical enabler for all AI accelerators (good for MU, TER, ONTO).",
      "Enterprise and Edge AI adoption curves are expected to steepen with cost reductions and capability improvements.",
      "Inference workloads are becoming as compute-intensive as training, benefiting GPU leaders.",
      "Market sell-offs based on misinterpretations of efficiency gains (like DeepSeek) present buying opportunities in AI stocks."
    ]
  },
  stockRecommendations: {
    title: "Stock Calls & Investment Theses (Cantor Fitzgerald)",
    overallCall: "Absolutely recommend buying AI stocks on the recent sell-off. Expect AI-levered stocks to outperform.",
    topPicks: [
      { name: "NVDA (NVIDIA Corp.)", rating: "Overweight", pt: "$200", thesis: "Sustained AI spend, strong product cycle (Blackwell), GPU leadership for training/inference, AI democratization." },
      { name: "AVGO (Broadcom Inc.)", rating: "Overweight", pt: "$300", thesis: "Custom silicon ramp, networking strength in AI data centers." },
      { name: "MRVL (Marvell Technology)", rating: "Overweight", pt: "$160", thesis: "Custom silicon ramp, networking solutions for AI." },
      { name: "MU (Micron Technology)", rating: "Overweight", pt: "$130", thesis: "HBM-related upside, critical for AI accelerators." }
    ],
    otherPicks: [
      { name: "ASML (ASML Holding NV)", rating: "Overweight", pt: "€900", thesis: "Bleeding-edge lithography ramp, essential for advanced semis." },
      { name: "TER (Teradyne Inc.)", rating: "Overweight", pt: "$150", thesis: "Under-appreciated AI exposure (Networking/Custom Silicon/HBM testing)." },
      { name: "WDC (Western Digital Corp.)", rating: "Overweight", pt: "$95", thesis: "NAND asset spin catalyst, AI storage demand." }
    ]
  },
  techRoadmaps: {
    title: "Semiconductor Tech Roadmaps (Selected Highlights - Node, HBM)",
    largePlayers: [
      { player: "Nvidia", products: [
        { name: "Hopper (H100, 3Q22)", details: "4nm, HBM3" },
        { name: "H200 (2Q24)", details: "4nm, HBM3E" },
        { name: "Blackwell (B200, 4Q24 est.)", details: "4nm, HBM3E" },
        { name: "Rubin (R100, 4Q25 est.)", details: "3nm, HBM4 (expected)" }
      ]},
      { player: "AMD", products: [
        { name: "MI300X (4Q23)", details: "5nm, HBM3" },
        { name: "MI325X (4Q24)", details: "5nm, HBM3E" },
        { name: "MI350 (CY25E)", details: "3nm, HBM3E" }
      ]},
      { player: "Intel", products: [
        { name: "Gaudi3 (4Q24)", details: "5nm, HBM2E" },
        { name: "Falcon Shores (CY25E)", details: "N/A Node, N/A HBM" }
      ]},
      { player: "Google (TPU)", products: [
        { name: "TPU v5e/5p (3Q23)", details: "5nm, HBM2E (Design: Broadcom)" },
        { name: "TPU v6 (2024E)", details: "5nm, HBM2E (Design: Broadcom)" },
        { name: "TPU v7 (2025E)", details: "3nm (exp.), N/A HBM (Design: Broadcom)" }
      ]},
       { player: "Amazon (Trainium)", products: [
        { name: "Trainium2 (3Q23)", details: "5nm, HBM3 (Design: Marvell)" },
        { name: "Trainium3 (4Q25E)", details: "3nm (exp.), HBM3E (Design: Marvell)" }
      ]},
      { player: "Microsoft (Maia)", products: [
        { name: "Maia 100 (4Q24E)", details: "5nm, HBM2E (est.) (Design: Marvell)" }
      ]}
    ],
    upAndComers: [
      { name: "Cerebras (CS-3)", focus: "Wafer-Scale Architecture, Unified Memory/Compute" },
      { name: "SambaNova Systems (SN40L)", focus: "Reconfigurable Dataflow Architecture for Enterprise AI" },
      { name: "Groq (LPU Inference Engine)", focus: "Low Latency & Energy Efficient AI Inference" },
      { name: "Tenstorrent (Grayskull, Tensix IP)", focus: "HPC Applications, RISC-V based inference" },
      { name: "Lightmatter (Envise/Passage)", focus: "Photonic accelerators for AI/ML" }
    ]
  },
  favoriteQuotes: [
    { quote: "\"All I know is: I am good for my $80 Billion\"", source: "Satya Nadella (CEO, MSFT)"},
    { quote: "\"Little Hacks like DeepSeek's won't get us to AGI\"", source: "Pedro Domingos (Prof. University of Washington)"},
    { quote: "\"The United States already has the best closed models in the world. To remain competitive, we must also support the development of a vibrant open-source ecosystem.\"", source: "Eric Schmidt (Former Chair and CEO, GOOGL)"}
  ]
}; // End of reportData object

// Reusable Card Component
const Card = ({ title, children, className = "" }) => (
  <div className={`bg-white shadow-lg rounded-xl p-6 mb-6 ${className}`}>
    {title && <h3 className="text-xl font-semibold text-indigo-700 mb-3">{title}</h3>}
    <div className="text-gray-700 space-y-2">{children}</div>
  </div>
); // End of Card component

// Reusable Tab Component
const Tab = ({ label, isActive, onClick }) => (
  <button
    className={`px-4 py-3 font-medium text-sm sm:text-base focus:outline-none transition-colors duration-150 ease-in-out
      ${isActive 
        ? 'border-b-2 border-indigo-600 text-indigo-600' 
        : 'text-gray-500 hover:text-indigo-500 hover:border-b-2 hover:border-indigo-300'
      }
    `}
    onClick={onClick}
  >
    {label}
  </button>
); // End of Tab component

// Main App Component
const App = () => { // Start of App component
  const [activeTab, setActiveTab] = useState('DeepSeek Analysis');

  const tabs = [
    'DeepSeek Analysis', 
    'Market Data & Trends', 
    'Investment Outlook', 
    'Stock Recommendations', 
    'Tech Roadmaps',
    'Favorite Quotes'
  ];

  // Helper to render content based on active tab
  const renderContent = () => { // Start of renderContent function
    switch (activeTab) { // Start of switch
      case 'DeepSeek Analysis':
        return (
          <>
            <Card title="Core Research Question & Cantor's Key Finding">
              <p className="font-semibold">Core Question:</p>
              <p>{reportData.deepSeekAnalysis.coreQuestion}</p>
              <p className="mt-2 font-semibold">Key Finding:</p>
              <p dangerouslySetInnerHTML={{ __html: reportData.deepSeekAnalysis.keyFinding.replace(/\*(.*?)\*/g, '<strong>$1</strong>') }}></p>
            </Card>
            <Card title="Top 5 Thoughts Supporting Cantor's Thesis">
              {reportData.deepSeekAnalysis.topThoughts.map((thought, index) => (
                <div key={index} className="mb-3 pb-3 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
                  <p className="font-semibold text-indigo-600">{thought.title}</p>
                  <p className="text-sm">{thought.detail}</p>
                </div>
              ))}
            </Card>
            <Card title="Key Investor Q&A Highlights">
              {reportData.deepSeekAnalysis.investorQA.map((item, index) => (
                <div key={index} className="mb-3 pb-3 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
                  <p className="font-semibold text-gray-800">Q: {item.q}</p>
                  <p className="text-sm">A: {item.a}</p>
                </div>
              ))}
            </Card>
          </>
        );
      case 'Market Data & Trends':
        return (
          <>
            <Card title={reportData.marketData.cloudCapex.title}>
              <ul className="list-disc list-inside space-y-1">
                {reportData.marketData.cloudCapex.data.map(item => (
                  <li key={item.year}>{item.year}: <span className="font-semibold">{item.value}</span> {item.note && <span className="text-xs text-gray-500">({item.note})</span>}</li>
                ))}
              </ul>
            </Card>
            <Card title={reportData.marketData.sovereignAI.title}>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {reportData.marketData.sovereignAI.examples.map((ex, i) => <li key={i}>{ex}</li>)}
              </ul>
            </Card>
            <Card title={reportData.marketData.privateFunding.title}>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {reportData.marketData.privateFunding.deals.map((deal, i) => <li key={i}>{deal}</li>)}
              </ul>
            </Card>
             <Card title={reportData.marketData.historicalCostReduction.title}>
                <p>{reportData.marketData.historicalCostReduction.detail}</p>
            </Card>
          </>
        );
      case 'Investment Outlook':
        return (
          <Card title={reportData.investmentOutlook.title}>
            <ul className="list-disc list-inside space-y-2">
              {reportData.investmentOutlook.insights.map((insight, i) => <li key={i}>{insight}</li>)}
            </ul>
          </Card>
        );
      case 'Stock Recommendations':
        return (
          <Card title={reportData.stockRecommendations.title}>
            <p className="mb-4 text-center bg-indigo-50 p-3 rounded-md">{reportData.stockRecommendations.overallCall}</p>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-indigo-600 mb-2">Top AI Picks (Post-DeepSeek):</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportData.stockRecommendations.topPicks.map(stock => (
                  <div key={stock.name} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <p className="font-bold text-gray-800">{stock.name} ({stock.rating}) - PT: {stock.pt}</p>
                    <p className="text-xs text-gray-600 mt-1">{stock.thesis}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-indigo-600 mb-2">Other Top Picks (Reaffirmed):</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportData.stockRecommendations.otherPicks.map(stock => (
                  <div key={stock.name} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <p className="font-bold text-gray-800">{stock.name} ({stock.rating}) - PT: {stock.pt}</p>
                    <p className="text-xs text-gray-600 mt-1">{stock.thesis}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        );
      case 'Tech Roadmaps':
        return (
          <>
            <Card title={reportData.techRoadmaps.title}>
              <h4 className="text-lg font-semibold text-indigo-600 mb-3">Large Players:</h4>
              <div className="space-y-4">
                {reportData.techRoadmaps.largePlayers.map(player => (
                  <div key={player.player} className="p-3 border border-gray-200 rounded-md">
                    <p className="font-bold text-gray-800">{player.player}</p>
                    <ul className="list-disc list-inside ml-4 text-sm space-y-1 mt-1">
                      {player.products.map(prod => ( 
                        <li key={prod.name}>{prod.name}: <span className="text-gray-600">{prod.details}</span></li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <h4 className="text-lg font-semibold text-indigo-600 mt-6 mb-3">Up and Comers:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {reportData.techRoadmaps.upAndComers.map(uc => ( 
                  <li key={uc.name}><span className="font-semibold">{uc.name}:</span> {uc.focus}</li>
                ))}
              </ul>
            </Card>
          </>
        );
      case 'Favorite Quotes':
        return (
            <Card title="Favorite AI-Related Quotes (from report)">
                {reportData.favoriteQuotes.map((q, index) => (
                    <blockquote key={index} className="p-4 my-4 border-l-4 border-indigo-300 bg-indigo-50 rounded-r-lg">
                        <p className="text-gray-700 italic">"{q.quote}"</p>
                        <footer className="text-sm text-indigo-500 mt-1">- {q.source}</footer>
                    </blockquote>
                ))}
            </Card>
        );
      default:
        return null;
    } // End of switch
  }; // End of renderContent function

  return (
    // Main container for the dashboard
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-100 p-4 sm:p-6 md:p-8 font-sans">
      {/* Header Section */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800">{reportData.reportTitle}</h1>
        <p className="text-lg text-gray-600">Focus: {reportData.mainFocus}</p>
        <p className="text-sm text-gray-500 mt-1">Source: Cantor Fitzgerald Report | Date: {reportData.reportDate}</p>
      </header>

      {/* Tab Navigation */}
      <div className="mb-8 bg-white shadow-md rounded-lg overflow-x-auto">
        <nav className="flex space-x-1 sm:space-x-2 p-1">
          {tabs.map(tabName => (
            <Tab
              key={tabName}
              label={tabName}
              isActive={activeTab === tabName}
              onClick={() => setActiveTab(tabName)}
            />
          ))}
        </nav>
      </div>
      
      {/* Content Area */}
      <main>
        {renderContent()}
      </main>

      {/* Footer/Disclaimer */}
      <footer className="mt-12 text-center text-xs text-gray-500">
        <p>This dashboard summarizes information extracted from the Cantor Fitzgerald AI Monthly report dated February 1, 2025. For full details and disclosures, please refer to the original report.</p>
        <p>All interpretations and summaries are for informational purposes only and should not be considered investment advice.</p>
      </footer>
    </div>
  ); // End of return statement for App
}; // End of App component

export default App;
