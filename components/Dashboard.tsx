'use client';

import { useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { useAppStore, useSessionStats } from '@/lib/store';
import { 
  Phone, 
  BookOpen, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  Clock,
  Activity,
  Star
} from 'lucide-react';

export function Dashboard() {
  const { guides, contacts, logAction, setActiveTab } = useAppStore();
  const sessionStats = useSessionStats();

  useEffect(() => {
    logAction('dashboard_viewed');
  }, [logAction]);

  const stats = [
    { 
      label: 'Guides Available', 
      value: guides.length.toString(), 
      subtitle: `${guides.filter(g => !g.isPremium).length} free, ${guides.filter(g => g.isPremium).length} premium`, 
      icon: BookOpen,
      color: 'text-blue-400'
    },
    { 
      label: 'Emergency Contacts', 
      value: contacts.length.toString(), 
      subtitle: `${contacts.filter(c => !c.isPremium).length} free, ${contacts.filter(c => c.isPremium).length} premium`, 
      icon: Phone,
      color: 'text-green-400'
    },
    { 
      label: 'Guides Accessed', 
      value: sessionStats.guidesAccessed.toString(), 
      subtitle: 'This session', 
      icon: Activity,
      color: 'text-purple-400'
    },
    { 
      label: 'Total Actions', 
      value: sessionStats.totalActions.toString(), 
      subtitle: 'This session', 
      icon: TrendingUp,
      color: 'text-orange-400'
    },
  ];

  const quickActions = [
    { 
      title: 'Know Your Rights', 
      subtitle: 'Access emergency guides',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-green-400',
      action: () => setActiveTab('guides')
    },
    { 
      title: 'Emergency Contacts', 
      subtitle: 'Find help immediately',
      icon: <Phone className="w-6 h-6" />,
      color: 'text-red-400',
      action: () => setActiveTab('contacts')
    },
    { 
      title: 'Rights Education', 
      subtitle: 'Learn and share knowledge',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'text-blue-400',
      action: () => setActiveTab('education')
    },
    { 
      title: 'Recent Activity', 
      subtitle: 'View your session history',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-purple-400',
      action: () => console.log('View activity')
    },
  ];

  const recentGuides = guides.slice(0, 3);
  const featuredContacts = contacts.filter(c => !c.isPremium).slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="p-6 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="flex items-center space-x-3 mb-3">
          <Shield className="w-8 h-8 text-yellow-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Welcome to RightsGuardian</h2>
            <p className="text-purple-300">Your pocket guide to instant legal clarity</p>
          </div>
        </div>
        <p className="text-sm text-purple-200">
          Access emergency guides, contact legal aid, and know your rights in any situation.
        </p>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
              <div className="text-2xl font-bold text-white">
                {stat.value}
              </div>
            </div>
            <div className="text-sm text-white font-medium mb-1">
              {stat.label}
            </div>
            <div className="text-xs text-purple-300">
              {stat.subtitle}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="flex items-center space-x-3 p-3 glass-card hover:bg-opacity-15 transition-all duration-200 text-left"
            >
              <div className={action.color}>
                {action.icon}
              </div>
              <div>
                <div className="text-white font-medium">{action.title}</div>
                <div className="text-sm text-purple-300">{action.subtitle}</div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Recent Guides */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Featured Guides</h3>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => setActiveTab('guides')}
          >
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {recentGuides.map((guide) => (
            <div 
              key={guide.guideId} 
              className="flex items-center justify-between p-3 glass-card hover:bg-opacity-15 transition-all duration-200 cursor-pointer"
              onClick={() => {
                setActiveTab('guides');
                logAction('guide_viewed', guide.guideId);
              }}
            >
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-white font-medium">{guide.title}</div>
                  <div className="text-sm text-purple-300">{guide.category}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {guide.isPremium && (
                  <Star className="w-4 h-4 text-yellow-400" />
                )}
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Emergency Contacts Preview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Emergency Contacts</h3>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => setActiveTab('contacts')}
          >
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {featuredContacts.map((contact) => (
            <div 
              key={contact.contactId} 
              className="flex items-center justify-between p-3 glass-card hover:bg-opacity-15 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-400" />
                <div>
                  <div className="text-white font-medium">{contact.name}</div>
                  <div className="text-sm text-purple-300">{contact.situationType}</div>
                </div>
              </div>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => {
                  window.location.href = `tel:${contact.phone}`;
                  logAction('contact_called', contact.contactId);
                }}
              >
                Call
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Emergency Alert */}
      <Card className="p-4 bg-red-500/20 border-red-500/30">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <div>
            <div className="text-white font-medium">Emergency Situation?</div>
            <div className="text-sm text-red-200">
              If you're in immediate danger, call 911 or your local emergency services.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
