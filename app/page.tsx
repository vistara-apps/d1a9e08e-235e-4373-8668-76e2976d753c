'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { Dashboard } from '@/components/Dashboard';
import { EmergencyGuides } from '@/components/EmergencyGuides';
import { EmergencyContacts } from '@/components/EmergencyContacts';
import { RightsEducation } from '@/components/RightsEducation';
import { Button } from '@/components/ui/Button';
import { Home, BookOpen, Phone, GraduationCap } from 'lucide-react';

type ActiveTab = 'dashboard' | 'guides' | 'contacts' | 'education';

export default function RightsGuardianApp() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

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

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="glass-card p-2">
          <div className="grid grid-cols-4 gap-1">
            {tabs.map(tab => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setActiveTab(tab.id)}
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

        {/* Emergency Quick Actions */}
        <div className="glass-card p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Emergency Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="destructive" 
              className="flex items-center justify-center space-x-2"
              onClick={() => window.location.href = 'tel:911'}
            >
              <span className="text-lg">🚨</span>
              <span>Call 911</span>
            </Button>
            <Button 
              variant="secondary" 
              className="flex items-center justify-center space-x-2"
              onClick={() => setActiveTab('contacts')}
            >
              <Phone className="w-4 h-4" />
              <span>Find Help</span>
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
