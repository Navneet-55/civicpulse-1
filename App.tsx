import React, { useState } from 'react';
import Navbar from './components/Navbar';
import PolicyIntake from './views/PolicyIntake';
import SimulationResults from './views/SimulationResults';
import ImpactReport from './views/ImpactReport';
import DashboardHome from './views/DashboardHome';
import { ViewState, PolicyData } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  
  // Default State
  const [policyData, setPolicyData] = useState<PolicyData>({
    title: "Downtown Zoning Reform Initiative 2024",
    description: "Proposed zoning changes for the central business district...",
    location: "Austin, TX",
    demographics: ["Low Income", "Single Parents", "Senior Citizens"],
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  });

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleSimulationStart = (data: PolicyData) => {
    setPolicyData(data);
    setCurrentView('results');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Sticky Top Navigation */}
      <Navbar currentView={currentView} onNavigate={handleNavigate} />

      {/* Main Content Wrapper */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {currentView === 'dashboard' && (
          <DashboardHome 
            onStartNew={() => setCurrentView('intake')} 
            onViewReport={() => setCurrentView('impact')}
          />
        )}
        {currentView === 'intake' && (
          <PolicyIntake onRunSimulation={handleSimulationStart} />
        )}
        {currentView === 'results' && (
          <SimulationResults 
            onBack={() => setCurrentView('intake')} 
            policyData={policyData} 
          />
        )}
        {currentView === 'impact' && (
          <ImpactReport policyData={policyData} />
        )}
      </div>
    </div>
  );
}