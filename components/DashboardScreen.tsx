import { Search, Menu, MapPin, Plus, AlertCircle, FileText, User, LogOut, Info, X } from 'lucide-react';
import { useState } from 'react';
import { Screen } from '../App';

export function DashboardScreen({ 
  onNavigate, 
  isLoggedIn, 
  userEmail, 
  onLogout,
  elevators 
}: { 
  onNavigate: (screen: Screen) => void;
  isLoggedIn: boolean;
  userEmail: string;
  onLogout: () => void;
  elevators: any[];
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="size-full bg-gray-50 flex flex-col relative">
      {/* Header with Menu */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center gap-3 mb-3">
          <button className="p-1" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex gap-1">
            {['K', 'O', 'N', 'E'].map((letter) => (
              <div
                key={letter}
                className="w-6 h-8 border border-[#005EB8] flex items-center justify-center text-[#005EB8] text-xs"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by location or equipment ID"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded bg-gray-50 text-sm"
          />
        </div>
      </div>
      
      {/* Hamburger Menu Drawer */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-30" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-64 bg-white border-r border-gray-300 shadow-lg">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex gap-1">
                {['K', 'O', 'N', 'E'].map((letter) => (
                  <div
                    key={letter}
                    className="w-6 h-8 border border-[#005EB8] flex items-center justify-center text-[#005EB8] text-xs"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            
            <div className="p-4 space-y-2">
              {isLoggedIn ? (
                <>
                  {/* User Profile */}
                  <div className="p-3 bg-gray-50 border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-xs text-gray-600">Logged in as:</span>
                    </div>
                    <div className="text-sm text-gray-900">{userEmail}</div>
                  </div>
                  
                  {/* Logout */}
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 p-3 border border-gray-300 hover:border-[#005EB8] transition-colors"
                  >
                    <LogOut className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  {/* Login */}
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onNavigate({ name: 'login' });
                    }}
                    className="w-full flex items-center gap-3 p-3 border border-gray-300 hover:border-[#005EB8] transition-colors"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">Login</span>
                  </button>
                </>
              )}
              
              {/* App Info */}
              <button className="w-full flex items-center gap-3 p-3 border border-gray-300">
                <Info className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-700">App Info</span>
              </button>
              
              <div className="text-xs text-gray-500 text-center mt-4 pt-4 border-t border-gray-200">
                Prototype access control
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Elevator List */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {elevators.map((elevator) => (
          <div
            key={elevator.id}
            onClick={() => onNavigate({ name: 'elevator-detail', elevatorId: elevator.id })}
            className="bg-white border border-gray-300 p-4 cursor-pointer hover:border-[#005EB8] transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#005EB8]">{elevator.id}</span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      elevator.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  />
                </div>
                <div className="text-gray-700 text-sm">{elevator.building}</div>
                <div className="text-gray-500 text-xs mt-1">{elevator.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-300 px-4 py-3">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onNavigate({ name: 'kmp-webview' })}
            className="flex flex-col items-center gap-1 px-3"
          >
            <div className="text-xs border border-gray-600 px-2 py-1 text-gray-700">KMP</div>
          </button>
          
          <button 
            onClick={() => onNavigate({ name: 'movement-heatmap-overview' })}
            className="flex flex-col items-center gap-1 px-3"
          >
            <MapPin className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Map</span>
          </button>
          
          <button 
            onClick={() => onNavigate({ name: 'add-elevator' })}
            className="flex flex-col items-center gap-1 px-3"
          >
            <div className="w-12 h-12 rounded-full bg-[#005EB8] flex items-center justify-center -mt-6 border-4 border-white">
              <Plus className="w-6 h-6 text-white" />
            </div>
          </button>
          
          <button 
            onClick={() => onNavigate({ name: 'all-issues-overview' })}
            className="flex flex-col items-center gap-1 px-3"
          >
            <AlertCircle className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Issues</span>
          </button>
          
          <button 
            onClick={() => onNavigate({ name: 'saved-reports' })}
            className="flex flex-col items-center gap-1 px-3"
          >
            <FileText className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Reports</span>
          </button>
        </div>
      </div>
    </div>
  );
}
