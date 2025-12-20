import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Bot, 
  BarChart3, 
  Settings, 
  Heart,
  MessageSquare
} from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onNavigate }) => {
  const navItems = [
    { id: 'intake', label: 'Policy Intake', icon: FileText, view: 'intake' },
    { id: 'simulation', label: 'Agent Simulation', icon: Bot, view: 'results' },
    { id: 'debate', label: 'Debate View', icon: MessageSquare, view: 'debate' },
    { id: 'impact', label: 'Human Impact Report', icon: BarChart3, view: 'impact' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col justify-between shrink-0">
      <div>
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <div className="bg-sky-100 p-2 rounded-lg">
            <Heart className="w-6 h-6 text-sky-500 fill-sky-500" />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">CivicPulse</span>
        </div>

        {/* Navigation */}
        <nav className="px-4 space-y-1 mt-4">
          {navItems.map((item) => {
            const isActive = item.view === currentView;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.view as ViewState)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-sky-50 text-sky-600'
                    : 'text-slate-500 hover:bg-gray-50 hover:text-slate-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Settings & User */}
      <div className="p-4 border-t border-gray-100 space-y-1">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-500 hover:bg-gray-50 hover:text-slate-900 transition-colors">
          <Settings className="w-5 h-5 text-slate-400" />
          Settings
        </button>
        
        <div className="flex items-center gap-3 px-4 py-3 mt-2">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center border border-orange-200 text-orange-700 text-xs font-bold">
            <img src="https://picsum.photos/100/100" alt="Alex Planner" className="w-8 h-8 rounded-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-900">Alex Planner</span>
            <span className="text-xs text-slate-500">City Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;