import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PolicyIntake from './views/PolicyIntake';
import SimulationResults from './views/SimulationResults';
import ImpactReport from './views/ImpactReport';
import DashboardHome from './views/DashboardHome';
import DebateView from './views/DebateView';
import { ViewState, PolicyData, SimulationResponse, HistoryItem } from './types';
import { ApiService } from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // Default State
  const [policyData, setPolicyData] = useState<PolicyData>({
    title: "Downtown Zoning Reform Initiative 2024",
    description: "Proposed zoning changes for the central business district...",
    location: "Austin, TX",
    demographics: ["Low Income", "Single Parents", "Senior Citizens"],
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  });

  const [simulationResults, setSimulationResults] = useState<SimulationResponse | null>(null);

  // Load history on mount
  useEffect(() => {
    const loadHistory = async () => {
      const data = await ApiService.getHistory();
      setHistory(data);
    };
    loadHistory();
  }, []);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
  };

  const handleSimulationStart = async (data: PolicyData) => {
    setIsLoading(true);
    setPolicyData(data);
    
    try {
      const results = await ApiService.runSimulation(data);
      setSimulationResults(results);
      
      // Refresh history silently
      ApiService.getHistory().then(setHistory);
      
      setCurrentView('results');
    } catch (error) {
      console.error("Simulation failed:", error);
      alert("Failed to run simulation. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            history={history}
          />
        )}
        {currentView === 'intake' && (
          <PolicyIntake 
            onRunSimulation={handleSimulationStart} 
            isLoading={isLoading}
          />
        )}
        {currentView === 'results' && (
          <SimulationResults 
            onBack={() => setCurrentView('intake')} 
            policyData={policyData} 
            results={simulationResults}
          />
        )}
        {currentView === 'debate' && (
          <DebateView policyData={policyData} />
        )}
        {currentView === 'impact' && (
          <ImpactReport policyData={policyData} />
        )}
      </div>
    </div>
  );
}