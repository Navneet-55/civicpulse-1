import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  MinusCircle, 
  PlusCircle, 
  AlertTriangle, 
  CheckCircle, 
  Briefcase, 
  Baby, 
  Accessibility, 
  Languages, 
  ArrowDownRight,
  FileText
} from 'lucide-react';
import { Persona, PolicyData, SimulationResponse } from '../types';

interface SimulationResultsProps {
  onBack: () => void;
  policyData: PolicyData;
  results?: SimulationResponse | null;
}

const SimulationResults: React.FC<SimulationResultsProps> = ({ onBack, policyData, results }) => {
  const [filter, setFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

  // Fallback if no results exist (shouldn't happen in normal flow due to loader)
  const personas = results?.personas || [];
  const score = results?.score || 0;

  const getIcon = (type: string) => {
    switch(type) {
      case 'parent': return <Baby className="w-6 h-6 text-purple-600" />;
      case 'worker': return <Briefcase className="w-6 h-6 text-emerald-600" />;
      case 'disability': return <Accessibility className="w-6 h-6 text-indigo-600" />;
      case 'language': return <Languages className="w-6 h-6 text-orange-600" />;
      case 'senior': return <Users className="w-6 h-6 text-blue-600" />;
      default: return <Users className="w-6 h-6 text-slate-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch(type) {
      case 'parent': return 'bg-purple-100';
      case 'worker': return 'bg-emerald-100';
      case 'disability': return 'bg-indigo-100';
      case 'language': return 'bg-orange-100';
      case 'senior': return 'bg-blue-100';
      default: return 'bg-slate-100';
    }
  };

  const getImpactBadge = (level: string) => {
    if (level === 'High') {
      return <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>High Impact</span>;
    }
    if (level === 'Medium') {
      return <span className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>Medium Impact</span>;
    }
    return <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>Low Impact</span>;
  };

  const filteredPersonas = filter === 'All' ? personas : personas.filter(p => p.impactLevel === filter);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <span onClick={onBack} className="cursor-pointer hover:text-blue-600">Assessment Setup</span>
          <span>&gt;</span>
          <span className="text-slate-900 font-medium">Results</span>
        </div>

        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">{policyData.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-500 font-medium">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-slate-200 text-sm shadow-sm">
                 <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                 {policyData.location}
              </span>
              {policyData.fileName && (
                <span className="flex items-center gap-1.5 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 text-blue-700 text-sm shadow-sm">
                  <FileText className="w-3.5 h-3.5" />
                  Source: {policyData.fileName}
                </span>
              )}
              <span className="text-xs text-slate-400 ml-auto">
                Analyzed {personas.length} demographic segments
              </span>
            </div>
          </div>
          
          {/* Score Card */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Empathy Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-slate-900">{score}</span>
                <span className="text-lg text-slate-400 font-medium">/ 100</span>
              </div>
              <div className="w-32 h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
                <div 
                   className={`h-full rounded-full transition-all duration-1000 ${score > 70 ? 'bg-emerald-500' : score > 50 ? 'bg-orange-500' : 'bg-red-500'}`} 
                   style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end text-red-500 font-bold text-lg">
                <ArrowDownRight className="w-5 h-5 mr-1" />
                -5%
              </div>
              <p className="text-xs text-slate-400 mt-1">vs. last simulation</p>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
            <button 
              onClick={() => setFilter('All')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'All' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Users className="w-4 h-4" /> All Agents
            </button>
            <button 
              onClick={() => setFilter('High')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'High' ? 'bg-red-50 text-red-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <AlertTriangle className="w-4 h-4" /> High Impact
            </button>
            <button 
              onClick={() => setFilter('Medium')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'Medium' ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <AlertTriangle className="w-4 h-4" /> Medium Impact
            </button>
            <button 
              onClick={() => setFilter('Low')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === 'Low' ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <CheckCircle className="w-4 h-4" /> Low Impact
            </button>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search personas..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {filteredPersonas.map((persona) => (
            <div key={persona.id} className="bg-white rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200 flex flex-col h-full">
              
              {/* Card Header */}
              <div className="p-5 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${getBgColor(persona.iconType)}`}>
                    {getIcon(persona.iconType)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight">{persona.role}</h3>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {persona.id}</p>
                  </div>
                </div>
                {getImpactBadge(persona.impactLevel)}
              </div>

              {/* Quote */}
              <div className="px-5 pb-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 relative">
                  <div className="absolute top-2 left-2 text-3xl text-slate-200 font-serif leading-none">"</div>
                  <p className="text-sm text-slate-600 italic leading-relaxed relative z-10">{persona.quote}</p>
                </div>
              </div>

              {/* Lists */}
              <div className="px-5 pb-4 space-y-4 flex-1">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Pain Points</h4>
                  <ul className="space-y-2">
                    {persona.painPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                        <MinusCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {persona.adjustments.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Adjustments</h4>
                    <ul className="space-y-2">
                      {persona.adjustments.map((adj, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                          <PlusCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <span>{adj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-b-xl">
                <span className="text-xs text-slate-500 font-medium">AI Confidence: {persona.confidence}%</span>
                <button className="text-xs font-bold text-blue-600 hover:text-blue-700 uppercase tracking-wide">Analysis</button>
              </div>
            </div>
          ))}
          {filteredPersonas.length === 0 && (
             <div className="col-span-full py-12 text-center text-slate-400">
               <p>No personas found matching this filter.</p>
             </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SimulationResults;