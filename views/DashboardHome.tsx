import React from 'react';
import { 
  ArrowRight, 
  FileText, 
  Users, 
  Activity, 
  Plus
} from 'lucide-react';

interface DashboardHomeProps {
  onStartNew: () => void;
  onViewReport: () => void;
}

const DashboardHome: React.FC<DashboardHomeProps> = ({ onStartNew, onViewReport }) => {
  
  const recentActivity = [
    { title: "Downtown Zoning Reform", date: "Today, 10:23 AM", score: 42 },
    { title: "Westside Park Expansion", date: "Yesterday, 2:15 PM", score: 88 },
    { title: "Public Transit Fare Cap", date: "May 20, 2024", score: 65 },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-sky-50/40 to-teal-50/40 p-6 md:p-12 animate-fadeIn">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 pt-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            CivicPulse – Human Impact Assessment
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-500 font-light">
            Empathy Engine for Public Policy
          </p>
          
          <div className="pt-8">
             <button 
               onClick={onStartNew}
               className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-slate-900 text-white rounded-full font-medium transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-teal-900/10 hover:-translate-y-0.5"
             >
               <Plus className="w-5 h-5 text-teal-300" />
               <span>Start New Assessment</span>
             </button>
          </div>
        </div>

        {/* Subtle KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
             { label: "Policies Analyzed", value: "124", sub: "+12 this month", icon: FileText, color: "text-sky-600", bg: "bg-sky-50" },
             { label: "Personas Protected", value: "85k", sub: "Across 12 districts", icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
             { label: "Empathy Score Avg", value: "72", sub: "+5.4% vs last year", icon: Activity, color: "text-indigo-600", bg: "bg-indigo-50" },
          ].map((kpi, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-center justify-center text-center hover:bg-white hover:border-sky-100 transition-all duration-300">
               <div className={`p-3 rounded-full ${kpi.bg} mb-3`}>
                 <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
               </div>
               <span className="text-3xl font-bold text-slate-800">{kpi.value}</span>
               <span className="text-sm font-semibold text-slate-700 mt-1">{kpi.label}</span>
               <span className="text-xs text-slate-400 mt-1 font-medium">{kpi.sub}</span>
            </div>
          ))}
        </div>

        {/* Clean Recent Activity */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden max-w-3xl mx-auto">
          <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <h3 className="font-semibold text-slate-800">Recent Reports</h3>
            <button onClick={onViewReport} className="text-sm text-slate-400 hover:text-sky-600 transition-colors">View All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {recentActivity.map((item, i) => (
              <div key={i} onClick={onViewReport} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                 <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${
                      item.score < 50 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                   }`}>
                      {item.score}
                   </div>
                   <div>
                     <h4 className="font-medium text-slate-800 group-hover:text-sky-600 transition-colors">{item.title}</h4>
                     <p className="text-xs text-slate-400">{item.date}</p>
                   </div>
                 </div>
                 <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;