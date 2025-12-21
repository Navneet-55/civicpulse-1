import React, { useState } from 'react';
import { 
  AlertOctagon, 
  FileText, 
  Layout, 
  AlignLeft, 
  Printer,
  Calendar,
  MapPin,
  Paperclip,
  EyeOff,
  Presentation
} from 'lucide-react';
import { PolicyData } from '../types';
import pptxgen from 'pptxgenjs';
// @ts-ignore
import html2pdf from 'html2pdf.js';

interface ImpactReportProps {
  policyData: PolicyData;
}

const ImpactReport: React.FC<ImpactReportProps> = ({ policyData }) => {
  const [viewMode, setViewMode] = useState<'dashboard' | 'document'>('dashboard');
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPDF = () => {
    setIsExporting(true);
    // Switch to document view to ensure the detailed report is rendered
    setViewMode('document');
    
    // Allow time for DOM to update
    setTimeout(() => {
      const element = document.getElementById('impact-report-content');
      if (element) {
        const opt = {
          margin:       0.5,
          filename:     `Impact-Report-${new Date().toISOString().split('T')[0]}.pdf`,
          image:        { type: 'jpeg' as const, quality: 0.98 },
          html2canvas:  { scale: 2, useCORS: true },
          jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        
        html2pdf().set(opt).from(element).save().then(() => {
          setIsExporting(false);
        });
      } else {
        setIsExporting(false);
      }
    }, 500);
  };

  const handleExportPPT = () => {
    const pres = new pptxgen();

    // Define common styles
    const slideTitleOpts = { x: 0.5, y: 0.5, w: 9, fontSize: 24, color: '1e293b', bold: true, fontFace: 'Arial' };
    const sectionHeaderOpts = { fontSize: 12, color: '94a3b8', bold: true };
    const bodyTextOpts = { x: 0.5, y: 1.5, w: 9, fontSize: 14, color: '334155', fontFace: 'Arial', lineSpacing: 18 };

    // --- SLIDE 1: Title Slide ---
    let slide = pres.addSlide();
    slide.addText("Impact Assessment Report", { x: 1, y: 2, fontSize: 36, color: '1e293b', bold: true, align: 'center' });
    slide.addText("CONFIDENTIAL • DRAFT FOR REVIEW", { x: 1, y: 1.5, fontSize: 12, color: '64748b', align: 'center' });
    slide.addText(policyData.title, { x: 1, y: 3, fontSize: 18, color: '64748b', align: 'center' });
    slide.addText(`Location: ${policyData.location}  |  Date: ${policyData.date}`, { x: 1, y: 3.5, fontSize: 14, color: '94a3b8', align: 'center' });
    
    // --- SLIDE 2: 1.0 Policy Overview ---
    slide = pres.addSlide();
    slide.addText("1.0 Policy Overview", slideTitleOpts);
    
    const overviewText = `This assessment evaluates the proposed policy changes regarding "${policyData.title}" within the jurisdiction of ${policyData.location}.\n\nThe policy aims to address key urban challenges but initial empathy simulations indicate significant negative externalities for marginalized groups, specifically regarding displacement risks and reduced accessibility to essential services during the implementation phase.`;
    
    slide.addText(overviewText, bodyTextOpts);
    if (policyData.fileName) {
      slide.addText(`Reference Source: ${policyData.fileName}`, { x: 0.5, y: 4.5, fontSize: 10, italic: true, color: '64748b' });
    }

    // --- SLIDE 3: 2.0 Key Findings ---
    slide = pres.addSlide();
    slide.addText("2.0 Key Findings", slideTitleOpts);
    
    // Quote box simulation
    slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.2, w: 9, h: 1.2, fill: { color: 'f8fafc' }, line: { color: '1e293b', width: 3 } });
    slide.addText(`"The policy as written achieves efficiency goals at the direct expense of equity, with a projected -12% impact on the Quality of Life index for seniors in ${policyData.location}."`, { x: 0.7, y: 1.3, w: 8.6, fontSize: 14, color: '1e293b', italic: true });

    const findingsBullets = [
      { text: "Economic Displacement: Rental costs in affected zones are projected to rise by 22% within 18 months.", options: { bullet: true, breakLine: true } },
      { text: "Transit Accessibility: Consolidation of stops increases average walking distance for seniors from 150m to 400m.", options: { bullet: true, breakLine: true } },
      { text: "Communication Gaps: Digital-first public engagement strategies have failed to reach 65% of non-native English speakers.", options: { bullet: true } }
    ];
    
    slide.addText(findingsBullets, { x: 0.5, y: 3, w: 9, h: 3, fontSize: 14, color: '334155', lineSpacing: 20 });

    // --- SLIDE 4: 3.0 Demographic Impact Matrix ---
    slide = pres.addSlide();
    slide.addText("3.0 Demographic Impact Matrix", slideTitleOpts);

    const tableData = [
      [
        { text: "Demographic", options: { bold: true, fill: { color: 'f1f5f9' }, color: '0f172a' } }, 
        { text: "Impact Score", options: { bold: true, fill: { color: 'f1f5f9' }, color: '0f172a' } }, 
        { text: "Primary Risk", options: { bold: true, fill: { color: 'f1f5f9' }, color: '0f172a' } }
      ],
      [
        { text: "Senior Citizens" }, 
        { text: "High (92/100)", options: { color: 'b91c1c', bold: true } }, 
        { text: "Isolation & Healthcare Access" }
      ],
      [
        { text: "Single Parents" }, 
        { text: "High (88/100)", options: { color: 'b91c1c', bold: true } }, 
        { text: "Time Poverty & Job Security" }
      ],
      [
        { text: "Low-Income Workers" }, 
        { text: "Medium (65/100)", options: { color: 'ea580c', bold: true } }, 
        { text: "Cost of Living Increase" }
      ]
    ];

    slide.addTable(tableData, { x: 0.5, y: 1.5, w: 9, border: { pt: 1, color: 'e2e8f0' }, fontSize: 12 });

    // --- SLIDE 5: 4.0 Recommendations ---
    slide = pres.addSlide();
    slide.addText("4.0 Recommendations", slideTitleOpts);
    slide.addText("To align the policy with the city's equity charter, the following modifications are recommended:", { x: 0.5, y: 1.2, fontSize: 14, color: '334155' });

    const recs = [
      { text: "1. Implement 'Fare Capping' Mechanism", options: { bold: true, breakLine: true, fontSize: 16, color: '0f172a' } },
      { text: "Introduce a daily and weekly fare cap on public transit to protect low-income commuters from cost spikes associated with new zone transfers.\n", options: { fontSize: 12, color: '475569', breakLine: true } },
      
      { text: "2. Mandatory Impact-Fee for Developers", options: { bold: true, breakLine: true, fontSize: 16, color: '0f172a' } },
      { text: "Establish a dedicated fund financed by new developments to subsidize displacement costs for residents aged 65+.\n", options: { fontSize: 12, color: '475569', breakLine: true } },

      { text: "3. Hybrid Engagement Strategy", options: { bold: true, breakLine: true, fontSize: 16, color: '0f172a' } },
      { text: "Require all public notices to be distributed via mail in English, Spanish, and Vietnamese, alongside digital channels.", options: { fontSize: 12, color: '475569' } }
    ];

    slide.addText(recs, { x: 0.5, y: 2, w: 9, h: 4 });

    pres.writeFile({ fileName: `Impact-Report-${new Date().toISOString().split('T')[0]}.pptx` });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Human Impact Report</h1>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              Analysis Ref: <span className="font-mono text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-xs">#2024-05-A</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* View Toggle */}
            <div className="bg-white p-1 rounded-lg border border-slate-200 flex shadow-sm">
              <button
                onClick={() => setViewMode('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'dashboard' 
                    ? 'bg-slate-100 text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <Layout className="w-4 h-4" />
                Visual Dashboard
              </button>
              <button
                onClick={() => setViewMode('document')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'document' 
                    ? 'bg-slate-100 text-slate-900 shadow-sm' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <AlignLeft className="w-4 h-4" />
                Detailed Report
              </button>
            </div>

            <div className="h-6 w-px bg-slate-300 mx-1 hidden sm:block"></div>

            <button 
              onClick={handleExportPPT}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Presentation className="w-4 h-4" /> Export PPT
            </button>
            
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm ${isExporting ? 'opacity-75 cursor-wait' : ''}`}
            >
              {isExporting ? 'Generating...' : (
                <>
                  <Printer className="w-4 h-4" /> Export PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* --- VIEW MODE: DASHBOARD (Visuals) --- */}
        {viewMode === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Top Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Executive Summary Card */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">Executive Summary</h2>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">
                  The <strong className="text-slate-900">{policyData.title}</strong> proposal, located in {policyData.location}, presents 
                  <strong className="text-red-600"> high-risk outcomes</strong> for vulnerable demographics. 
                  Based on the uploaded documentation {policyData.fileName ? `(${policyData.fileName})` : ''}, 
                  immediate mitigation is required for transit accessibility and digital-only application processes to prevent 
                  displacement of seniors and exclusion of non-native speakers.
                </p>
              </div>

              {/* Score Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-400 to-emerald-500"></div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Projected Empathy Score</h3>
                <div className="relative w-36 h-36 flex items-center justify-center mb-2">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="72" cy="72" r="60" stroke="#f1f5f9" strokeWidth="12" fill="none" />
                    <circle 
                      cx="72" 
                      cy="72" 
                      r="60" 
                      stroke="#ef4444" 
                      strokeWidth="12" 
                      fill="none" 
                      strokeDasharray="377" 
                      strokeDashoffset="220" 
                      strokeLinecap="round" 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-5xl font-extrabold text-slate-900">42</span>
                    <span className="text-sm text-slate-400 font-medium">/ 100</span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold border border-red-100 flex items-center gap-1">
                  <AlertOctagon className="w-3 h-3" /> Low Empathy
                </div>
              </div>
            </div>

            {/* Persona Impact Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg font-bold text-slate-900">Persona Impact Matrix</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-4 px-8 font-semibold text-xs text-slate-500 uppercase tracking-wider bg-slate-50/50">Persona Group</th>
                      <th className="py-4 px-8 font-semibold text-xs text-slate-500 uppercase tracking-wider bg-slate-50/50">Severity</th>
                      <th className="py-4 px-8 font-semibold text-xs text-slate-500 uppercase tracking-wider bg-slate-50/50">Primary Harm</th>
                      <th className="py-4 px-8 font-semibold text-xs text-slate-500 uppercase tracking-wider bg-slate-50/50">Required Adjustment</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-8 font-medium text-slate-900">Senior Citizens</td>
                      <td className="py-5 px-8"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">High Impact</span></td>
                      <td className="py-5 px-8 text-slate-600">Physical isolation; healthcare access denied</td>
                      <td className="py-5 px-8 text-slate-900">Mandatory shuttle service</td>
                    </tr>
                    <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-8 font-medium text-slate-900">Single Parents</td>
                      <td className="py-5 px-8"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200">High Impact</span></td>
                      <td className="py-5 px-8 text-slate-600">Childcare pickup failures; job risk</td>
                      <td className="py-5 px-8 text-slate-900">90-min free transfer window</td>
                    </tr>
                    <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-8 font-medium text-slate-900">Low-Income Workers</td>
                      <td className="py-5 px-8"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">Medium Impact</span></td>
                      <td className="py-5 px-8 text-slate-600">Disproportionate cost burden</td>
                      <td className="py-5 px-8 text-slate-900">Subsidized monthly passes</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-5 px-8 font-medium text-slate-900">Non-Native Speakers</td>
                      <td className="py-5 px-8"><span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 border border-orange-200">Medium Impact</span></td>
                      <td className="py-5 px-8 text-slate-600">Systemic exclusion from feedback</td>
                      <td className="py-5 px-8 text-slate-900">Multi-lingual printed notices</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Grid: Warnings & Blind Spots */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-xl shadow-sm border border-red-100 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <AlertOctagon className="w-5 h-5 text-red-600" />
                  <h2 className="text-lg font-bold text-red-900">Critical Risk Factors</h2>
                </div>
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                    <span className="font-bold text-red-500 mt-0.5">1.</span>
                    <div>
                      <h4 className="font-bold text-red-900 text-sm">Displacement Spiral</h4>
                      <p className="text-xs text-red-700 mt-1 leading-relaxed">Rent increases exceed fixed income COLA by 200%, creating immediate homelessness risk for 15% of seniors.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                    <span className="font-bold text-red-500 mt-0.5">2.</span>
                    <div>
                      <h4 className="font-bold text-red-900 text-sm">ADA Non-Compliance</h4>
                      <p className="text-xs text-red-700 mt-1 leading-relaxed">Temporary stops during construction lack wheelchair access, violating federal accessibility mandates.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                <div className="flex items-center gap-2 mb-6">
                  <EyeOff className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-bold text-slate-900">Blind Spots Detected</h2>
                </div>
                <ul className="space-y-4">
                   <li className="flex items-start gap-3 text-sm text-slate-600">
                     <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></span>
                     <span><strong>Night Shift Inequity:</strong> Schedule reductions disproportionately affect 11 PM - 5 AM service workers.</span>
                   </li>
                   <li className="flex items-start gap-3 text-sm text-slate-600">
                     <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></span>
                     <span><strong>Digital Divide:</strong> Online-only feedback forms exclude 18% of the district's population without home internet.</span>
                   </li>
                   <li className="flex items-start gap-3 text-sm text-slate-600">
                     <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></span>
                     <span><strong>Informal Care Economy:</strong> Zoning restrictions on ADUs limit multi-generational housing options for families.</span>
                   </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* --- VIEW MODE: DOCUMENT (Official Report) --- */}
        {/* Force display when viewMode is document OR when rendered by html2pdf (via ID) */}
        <div 
          id="impact-report-content"
          className={`${viewMode === 'document' ? 'block' : 'hidden'} bg-white shadow-md mx-auto max-w-4xl p-12 min-h-[1100px] text-slate-900`}
        >
            
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-8 mb-12 flex justify-between items-end">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-4 tracking-tight">Impact Assessment Report</h1>
              <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">Confidential • Draft for Review</div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end mb-1">
                 <MapPin className="w-4 h-4 text-slate-400" />
                 <span className="font-semibold">{policyData.location}</span>
              </div>
              <div className="flex items-center gap-2 justify-end">
                 <Calendar className="w-4 h-4 text-slate-400" />
                 <span className="font-semibold">{policyData.date}</span>
              </div>
            </div>
          </div>

          {/* Document Body */}
          <div className="prose prose-slate max-w-none">
            
            <div className="mb-10">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">1.0 Policy Overview</h3>
              <h2 className="text-2xl font-serif font-bold mb-4">{policyData.title}</h2>
              <p className="text-slate-700 leading-relaxed text-justify mb-4">
                This assessment evaluates the proposed policy changes regarding <strong>{policyData.title}</strong> within 
                the jurisdiction of <strong>{policyData.location}</strong>. 
                {policyData.fileName && (
                  <span className="block mt-2 italic text-sm text-slate-500">
                    <Paperclip className="inline w-3 h-3 mr-1" />
                    Reference Source: {policyData.fileName}
                  </span>
                )}
                <br /><br />
                The policy aims to address key urban challenges but initial empathy simulations indicate 
                significant negative externalities for marginalized groups, specifically regarding displacement risks and 
                reduced accessibility to essential services during the implementation phase.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">2.0 Key Findings</h3>
              <div className="bg-slate-50 border-l-4 border-slate-900 p-6 my-6">
                <p className="font-serif italic text-lg text-slate-800">
                  "The policy as written achieves efficiency goals at the direct expense of equity, with a projected -12% impact on the Quality of Life index for seniors in {policyData.location}."
                </p>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 marker:text-slate-900">
                <li><strong>Economic Displacement:</strong> Rental costs in affected zones are projected to rise by 22% within 18 months, outpacing fixed-income adjustments.</li>
                <li><strong>Transit Accessibility:</strong> Consolidation of stops increases average walking distance for seniors from 150m to 400m, exceeding recommended thresholds for this demographic.</li>
                <li><strong>Communication Gaps:</strong> Digital-first public engagement strategies have failed to reach 65% of non-native English speakers in the affected wards.</li>
              </ul>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">3.0 Demographic Impact Matrix</h3>
              <table className="w-full text-sm text-left border border-slate-200 mt-4">
                <thead className="bg-slate-100 text-slate-900 font-bold">
                  <tr>
                    <th className="p-3 border-b border-slate-200">Demographic</th>
                    <th className="p-3 border-b border-slate-200">Impact Score</th>
                    <th className="p-3 border-b border-slate-200">Primary Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-3">Senior Citizens</td>
                    <td className="p-3 font-bold text-red-700">High (92/100)</td>
                    <td className="p-3">Isolation & Healthcare Access</td>
                  </tr>
                  <tr>
                    <td className="p-3">Single Parents</td>
                    <td className="p-3 font-bold text-red-700">High (88/100)</td>
                    <td className="p-3">Time Poverty & Job Security</td>
                  </tr>
                  <tr>
                    <td className="p-3">Low-Income Workers</td>
                    <td className="p-3 font-bold text-orange-600">Medium (65/100)</td>
                    <td className="p-3">Cost of Living Increase</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-10">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">4.0 Recommendations</h3>
              <p className="text-slate-700 mb-4">
                To align the policy with the city's equity charter, the following modifications are recommended for immediate adoption:
              </p>
              <ol className="list-decimal pl-5 space-y-4 text-slate-700 marker:font-bold marker:text-slate-900">
                <li className="pl-2">
                  <span className="font-bold text-slate-900 block mb-1">Implement "Fare Capping" Mechanism</span>
                  Introduce a daily and weekly fare cap on public transit to protect low-income commuters from cost spikes associated with new zone transfers.
                </li>
                <li className="pl-2">
                  <span className="font-bold text-slate-900 block mb-1">Mandatory Impact-Fee for Developers</span>
                  Establish a dedicated fund financed by new developments to subsidize displacement costs for residents aged 65+.
                </li>
                <li className="pl-2">
                  <span className="font-bold text-slate-900 block mb-1">Hybrid Engagement Strategy</span>
                  Require all public notices to be distributed via mail in English, Spanish, and Vietnamese, alongside digital channels.
                </li>
              </ol>
            </div>

          </div>
          
          {/* Footer */}
          <div className="mt-20 pt-8 border-t border-slate-200 flex justify-between text-xs text-slate-400">
             <span>CivicPulse Assessment Engine v2.4</span>
             <span>Page 1 of 1</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ImpactReport;