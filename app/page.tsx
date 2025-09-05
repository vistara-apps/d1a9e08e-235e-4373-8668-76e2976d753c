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
import { NotificationCenter } from '@/components/NotificationCenter';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Home, BookOpen, Phone, GraduationCap, AlertTriangle } from 'lucide-react';
import { useUIStore, useUserStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export default function RightsGuardianApp() {
  const { activeTab, setActiveTab, isLoading } = useUIStore();
  const { logAction } = useUserStore();
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
    logAction('app_opened');
  }, [setFrameReady, logAction]);

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

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    logAction(`tab_changed_${tab}`);
  };

  const tabs = [
    { 
      id: 'dashboard' as const, 
      label: 'Dashboard', 
      icon: Home,
      description: 'Overview and quick actions'
    },
    { 
      id: 'guides' as const, 
      label: 'Guides', 
      icon: BookOpen,
      description: 'Emergency guides and checklists'
    },
    { 
      id: 'contacts' as const, 
      label: 'Contacts', 
      icon: Phone,
      description: 'Emergency contacts and help'
    },
    { 
      id: 'education' as const, 
      label: 'Education', 
      icon: GraduationCap,
      description: 'Rights education and snippets'
    },
  ];

  if (isLoading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" />
        </div>
      </AppShell>
    );
  }

  return (
    <ErrorBoundary>
      <AppShell>
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="glass-card p-2 sticky top-4 z-10">
            <div className="grid grid-cols-4 gap-1">
              {tabs.map(tab => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => handleTabChange(tab.id)}
                  className={cn(
                    "flex flex-col items-center space-y-1 py-3 transition-all",
                    activeTab === tab.id && "shadow-lg scale-105"
                  )}
                  title={tab.description}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="min-h-[60vh]">
            {renderContent()}
          </div>

          {/* Emergency Quick Actions - Always Visible */}
          <div className="glass-card p-4 bg-red-500/10 border-red-400/30 sticky bottom-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span>Emergency Actions</span>
              </h3>
              <div className="status-indicator status-active" title="Emergency services available" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="destructive" 
                className="emergency-button flex items-center justify-center space-x-2"
                onClick={() => {
                  logAction('emergency_call_911');
                  window.location.href = 'tel:911';
                }}
              >
                <span className="text-lg">🚨</span>
                <span>Call 911</span>
              </Button>
              
              <Button 
                variant="secondary" 
                className="flex items-center justify-center space-x-2 hover:bg-white/30"
                onClick={() => {
                  logAction('quick_help_accessed');
                  handleTabChange('contacts');
                }}
              >
                <Phone className="w-4 h-4" />
                <span>Find Help</span>
              </Button>
            </div>
            
            <p className="text-xs text-red-200 mt-2 text-center">
              For immediate danger, always call 911 first
            </p>
          </div>
        </div>

        {/* Notification System */}
        <NotificationCenter />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            },
          }}
        />
      </AppShell>
    </ErrorBoundary>
  );
}
