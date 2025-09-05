'use client';

import { useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Toaster } from 'react-hot-toast';
import { AppShell } from '@/components/AppShell';
import { Dashboard } from '@/components/Dashboard';
import { EmergencyGuides } from '@/components/EmergencyGuides';
import { EmergencyContacts } from '@/components/EmergencyContacts';
import { RightsEducation } from '@/components/RightsEducation';
import { Button } from '@/components/ui/Button';
import { useAppStore, useActiveTab } from '@/lib/store';
import { Home, BookOpen, Phone, GraduationCap, AlertTriangle } from 'lucide-react';

type ActiveTab = 'dashboard' | 'guides' | 'contacts' | 'education';

export default function RightsGuardianApp() {
  const activeTab = useActiveTab();
  const { setActiveTab, initialize, logAction } = useAppStore();
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    // Initialize the app store
    initialize();
    
    // Set frame ready for Base MiniKit
    setFrameReady();
    
    // Log app start
    logAction('app_started');
  }, [setFrameReady, initialize, logAction]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'guides':
        return <EmergencyGuides />;
      case 'contacts':
        return <EmergencyContacts />;
      case 'education':
        return <RightsEducation />;
      default:
        return <Dashboard />;
    }
  };

  const tabs = [
    { id: 'dashboard' as ActiveTab, label: 'Dashboard', icon: Home },
    { id: 'guides' as ActiveTab, label: 'Guides', icon: BookOpen },
    { id: 'contacts' as ActiveTab, label: 'Contacts', icon: Phone },
    { id: 'education' as ActiveTab, label: 'Education', icon: GraduationCap },
  ];

  const handleTabChange = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    logAction('tab_changed', tabId);
  };

  const handleEmergencyCall = () => {
    logAction('emergency_call_initiated');
    window.location.href = 'tel:911';
  };

  const handleFindHelp = () => {
    logAction('find_help_clicked');
    setActiveTab('contacts');
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="glass-card p-2 sticky top-0 z-10">
          <div className="grid grid-cols-4 gap-1">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => handleTabChange(tab.id)}
                className="flex flex-col items-center space-y-1 py-3"
              >
                <tab.icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-[60vh]">
          {renderContent()}
        </div>

        {/* Emergency Quick Actions - Always Visible */}
        <div className="glass-card p-4 sticky bottom-0 z-10">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span>Emergency Actions</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="destructive" 
              className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700"
              onClick={handleEmergencyCall}
            >
              <span className="text-lg">🚨</span>
              <span>Call 911</span>
            </Button>
            <Button 
              variant="secondary" 
              className="flex items-center justify-center space-x-2"
              onClick={handleFindHelp}
            >
              <Phone className="w-4 h-4" />
              <span>Find Help</span>
            </Button>
          </div>
          <p className="text-xs text-purple-300 mt-2 text-center">
            For immediate danger, always call emergency services first
          </p>
        </div>
      </div>
      
      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      />
    </AppShell>
  );
}
