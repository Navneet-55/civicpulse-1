import React from 'react';
import { MessageSquare, AlertTriangle, Scale, DollarSign, Clock, CheckCircle2 } from 'lucide-react';
import { PolicyData } from '../types';

interface DebateViewProps {
  policyData: PolicyData;
}

const DebateView: React.FC<DebateViewProps> = ({ policyData }) => {
  const messages = [
    {
      id: 1,
      sender: "Senior Citizen Agent",
      role: "Senior",
      color: "bg-blue-100 text-blue-800",
      content: "I'm worried about the changes proposed in this policy. If I have to walk 400m more to the bus stop, I simply won't be able to get to my doctor appointments in the winter.",
      timestamp: "10:02 AM"
    },
    {
      id: 2,
      sender: "City Planner Bot",
      role: "System",
      color: "bg-gray-100 text-gray-700",
      content: `The provisions in "${policyData.title}" aim to improve overall route efficiency by 15%, reducing wait times for 85% of riders in ${policyData.location}.`,
      timestamp: "10:03 AM"
    },
    {
      id: 3,
      sender: "Disability Advocate Agent",
      role: "Disability",
      color: "bg-indigo-100 text-indigo-800",
      content: "Efficiency is meaningless if access is denied. That 400m stretch has uneven pavement and no curb cuts. You are effectively barring wheelchair users from the service.",
      timestamp: "10:04 AM"
    },
    {
      id: 4,
      sender: "Single Parent Agent",
      role: "Parent",
      color: "bg-purple-100 text-purple-800",
      content: "I agree with the Senior Agent. Also, the new schedule reduces frequency during mid-day. If my kid gets sick at school, I need to leave work immediately. Waiting 45 minutes for a bus could mean losing my job.",
      timestamp: "10:06 AM"
    },
    {
      id: 5,
      sender: "Low-Income Worker Agent",
      role: "Worker",
      color: "bg-emerald-100 text-emerald-800",
      content: "The fare increase is the real killer here. It's already $2.50. Raising it to $3.00 means I'm paying an hour's wage just to commute every couple of days.",
      timestamp: "10:08 AM"
    }
  ];

  const themes = [
    { label: "Efficiency vs Humanity", icon: Scale, count: 12 },
    { label: "Mobility Constraints", icon: AlertTriangle, count: 8 },
    { label: "Financial Impact", icon: DollarSign, count: 5 },
    { label: "Time Burdens", icon: Clock, count: 4 },
  ];

  return (
    <div className="flex-1 overflow-hidden bg-gray-50 flex flex-col h-full">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-200 bg-white shrink-0">
         <h1 className="text-2xl font-bold text-slate-900">Agent Debate</h1>
         <p className="text-slate-500 text-sm mt-1">Real-time discourse simulation regarding: <span className="font-semibold text-slate-700">{policyData.title}</span></p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
           {messages.map((msg) => (
             <div key={msg.id} className={`flex flex-col max-w-3xl ${msg.role === 'System' ? 'ml-auto items-end' : ''}`}>
               <div className="flex items-center gap-2 mb-1">
                 <span className={`text-xs font-bold px-2 py-0.5 rounded ${msg.color}`}>
                   {msg.sender}
                 </span>
                 <span className="text-xs text-slate-400">{msg.timestamp}</span>
               </div>
               <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                 msg.role === 'System' 
                   ? 'bg-slate-100 text-slate-800 rounded-tr-none' 
                   : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
               }`}>
                 {msg.content}
               </div>
             </div>
           ))}
           
           <div className="flex justify-center py-4">
             <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full animate-pulse">
               Agents are typing...
             </span>
           </div>
        </div>

        {/* Right Panel: Themes */}
        <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto shrink-0 hidden lg:block">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-500" />
            Key Debate Themes
          </h3>
          
          <div className="space-y-3 mb-8">
            {themes.map((theme, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3">
                  <theme.icon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-700">{theme.label}</span>
                </div>
                <span className="text-xs font-bold text-slate-400 bg-white px-2 py-0.5 rounded-full border border-gray-100">{theme.count}</span>
              </div>
            ))}
          </div>

          <h3 className="font-bold text-slate-900 mb-4 text-sm">Conflicting Outcomes</h3>
          <div className="flex flex-wrap gap-2">
             <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
               Access vs. Cost
             </span>
             <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-100">
               Digital vs. Analog
             </span>
             <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
               Speed vs. Safety
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebateView;