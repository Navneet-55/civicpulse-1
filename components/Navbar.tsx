import React from 'react';
import { 
  Heart, 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Download,
  UserCircle
} from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  return (
    <div className="h-16 bg-white border-b border-slate-200 sticky top-0 z-50 flex items-center justify-between px-6 shadow-sm">
      
      {/* Logo Area */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
        <div className="bg-slate-900 p-1.5 rounded-lg">
          <Heart className="w-5 h-5 text-white fill-current" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 leading-none tracking-tight">CivicPulse</h1>
          <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Impact Assessment Engine</span>
        </div>
      </div>

      {/* Center Navigation */}
      <nav className="hidden md:flex items-center gap-1 bg-slate-50 p-1 rounded-lg border border-slate-100">
        <button
          onClick={() => onNavigate('dashboard')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
            currentView === 'dashboard'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>
        <button
          onClick={() => onNavigate('intake')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
            currentView === 'intake'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <FileText className="w-4 h-4" />
          Policy Intake
        </button>
        <button
          onClick={() => onNavigate('impact')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
            currentView === 'impact'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200/50'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Reports
        </button>
      </nav>

      {/* Right User/Actions */}
      <div className="flex items-center gap-4">
        <button className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <Download className="w-4 h-4" />
          Export Data
        </button>
        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-slate-900">Alex Planner</div>
            <div className="text-[10px] text-slate-500">City Admin</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <UserCircle className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;