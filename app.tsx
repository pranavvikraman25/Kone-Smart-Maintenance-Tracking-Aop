import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ElevatorDetailScreen } from './components/ElevatorDetailScreen';
import { FloorMaintenanceScreen } from './components/FloorMaintenanceScreen';
import { MovementHeatMapScreen } from './components/MovementHeatMapScreen';
import { ReportSummaryScreen } from './components/ReportSummaryScreen';
import { MovementHeatMapOverview } from './components/MovementHeatMapOverview';
import { AllIssuesOverview } from './components/AllIssuesOverview';
import { SavedReports } from './components/SavedReports';
import { FloorSpecificHeatMap } from './components/FloorSpecificHeatMap';
import { LoginScreen } from './components/LoginScreen';
import { AddElevatorScreen } from './components/AddElevatorScreen';
import { KMPWebViewScreen } from './components/KMPWebViewScreen';

export type Screen = 
  | { name: 'splash' }
  | { name: 'dashboard' }
  | { name: 'elevator-detail'; elevatorId: string }
  | { name: 'floor-maintenance'; elevatorId: string; floor: number }
  | { name: 'movement-heatmap'; elevatorId: string }
  | { name: 'report-summary'; sessionData: any }
  | { name: 'movement-heatmap-overview' }
  | { name: 'all-issues-overview' }
  | { name: 'saved-reports' }
  | { name: 'floor-specific-heatmap'; elevatorId: string; floor: number }
  | { name: 'login' }
  | { name: 'add-elevator' }
  | { name: 'kmp-webview' };

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>({ name: 'splash' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [elevators, setElevators] = useState([
    { id: 'ELV-001', building: 'Tower A', location: 'Helsinki Central', status: 'active' },
    { id: 'ELV-002', building: 'Tower A', location: 'Helsinki Central', status: 'inactive' },
    { id: 'ELV-003', building: 'Office Building B', location: 'Espoo Campus', status: 'active' },
    { id: 'ELV-004', building: 'Residential C', location: 'Tampere North', status: 'active' },
    { id: 'ELV-005', building: 'Shopping Mall D', location: 'Vantaa District', status: 'inactive' },
  ]);

  // Auto-transition from splash to login/dashboard
  useState(() => {
    if (currentScreen.name === 'splash') {
      const timeout = setTimeout(() => {
        setCurrentScreen({ name: isLoggedIn ? 'dashboard' : 'login' });
      }, 2500);
      return () => clearTimeout(timeout);
    }
  });

  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setCurrentScreen({ name: 'dashboard' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setCurrentScreen({ name: 'login' });
  };

  const handleAddElevator = (elevator: any) => {
    setElevators([...elevators, elevator]);
    setCurrentScreen({ name: 'dashboard' });
  };

  return (
    <div className="size-full bg-white flex items-center justify-center">
      {/* Mobile frame container */}
      <div className="w-full max-w-[390px] h-full max-h-[844px] bg-white shadow-2xl overflow-hidden relative">
        {currentScreen.name === 'splash' && (
          <SplashScreen onComplete={() => setCurrentScreen({ name: 'dashboard' })} />
        )}
        
        {currentScreen.name === 'dashboard' && (
          <DashboardScreen 
            onNavigate={setCurrentScreen}
            isLoggedIn={isLoggedIn}
            userEmail={userEmail}
            onLogout={handleLogout}
            elevators={elevators}
          />
        )}
        
        {currentScreen.name === 'elevator-detail' && (
          <ElevatorDetailScreen 
            elevatorId={currentScreen.elevatorId}
            onNavigate={setCurrentScreen}
          />
        )}
        
        {currentScreen.name === 'floor-maintenance' && (
          <FloorMaintenanceScreen 
            elevatorId={currentScreen.elevatorId}
            floor={currentScreen.floor}
            onNavigate={setCurrentScreen}
          />
        )}
        
        {currentScreen.name === 'movement-heatmap' && (
          <MovementHeatMapScreen 
            elevatorId={currentScreen.elevatorId}
            onNavigate={setCurrentScreen}
          />
        )}
        
        {currentScreen.name === 'report-summary' && (
          <ReportSummaryScreen 
            sessionData={currentScreen.sessionData}
            onNavigate={setCurrentScreen}
          />
        )}
        
        {currentScreen.name === 'movement-heatmap-overview' && (
          <MovementHeatMapOverview onNavigate={setCurrentScreen} />
        )}
        
        {currentScreen.name === 'all-issues-overview' && (
          <AllIssuesOverview onNavigate={setCurrentScreen} />
        )}
        
        {currentScreen.name === 'saved-reports' && (
          <SavedReports onNavigate={setCurrentScreen} />
        )}
        
        {currentScreen.name === 'floor-specific-heatmap' && (
          <FloorSpecificHeatMap 
            elevatorId={currentScreen.elevatorId}
            floor={currentScreen.floor}
            onNavigate={setCurrentScreen}
          />
        )}
        
        {currentScreen.name === 'login' && (
          <LoginScreen onLogin={handleLogin} onNavigate={setCurrentScreen} />
        )}
        
        {currentScreen.name === 'add-elevator' && (
          <AddElevatorScreen onAddElevator={handleAddElevator} onNavigate={setCurrentScreen} />
        )}
        
        {currentScreen.name === 'kmp-webview' && (
          <KMPWebViewScreen onNavigate={setCurrentScreen} />
        )}
      </div>
    </div>
  );
}
