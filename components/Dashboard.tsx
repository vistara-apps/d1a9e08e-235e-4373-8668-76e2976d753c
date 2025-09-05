'use client';

import { useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ListItem } from './ui/ListItem';
import { 
  Phone, 
  BookOpen, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Shield, 
  Star,
  Clock,
  Activity,
  Heart,
  Eye,
  ArrowRight
} from 'lucide-react';
import { useContentStore, useUserStore, useUIStore, useAnalytics } from '@/lib/store';
import { formatRelativeTime } from '@/lib/utils';

export function Dashboard() {
  const { guides, contacts, recentlyViewed, favoriteGuides, favoriteContacts } = useContentStore();
  const { user, sessionLogs } = useUserStore();
  const { setActiveTab } = useUIStore();
  const analytics = useAnalytics();

  // Get recent guides and contacts
  const recentGuides = guides.filter(guide => recentlyViewed.includes(guide.guideId)).slice(0, 3);
  const recentContacts = contacts.filter(contact => recentlyViewed.includes(contact.contactId)).slice(0, 3);
  const favoriteGuidesData = guides.filter(guide => favoriteGuides.includes(guide.guideId)).slice(0, 3);

  const stats = [
    { 
      label: 'Guides Accessed', 
      value: analytics.uniqueGuidesViewed.toString(), 
      subtitle: 'Unique guides viewed',
      icon: BookOpen,
      color: 'text-blue-400'
    },
    { 
      label: 'Total Actions', 
      value: analytics.totalActions.toString(), 
      subtitle: 'App interactions',
      icon: Activity,
      color: 'text-green-400'
    },
    { 
      label: 'Favorites', 
      value: analytics.favoritesCount.toString(), 
      subtitle: 'Saved items',
      icon: Heart,
      color: 'text-pink-400'
    },
    { 
      label: 'Recent Views', 
      value: analytics.recentlyViewedCount.toString(), 
      subtitle: 'Recently accessed',
      icon: Eye,
      color: 'text-purple-400'
    },
  ];

  const quickActions = [
    { 
      title: 'Emergency Contacts', 
      subtitle: 'Get help immediately',
      icon: <Phone className="w-6 h-6" />,
      color: 'text-red-400',
      action: () => setActiveTab('contacts'),
      urgent: true
    },
    { 
      title: 'Know Your Rights', 
      subtitle: 'Browse emergency guides',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-blue-400',
      action: () => setActiveTab('guides')
    },
    { 
      title: 'Legal Education', 
      subtitle: 'Learn about your rights',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'text-green-400',
      action: () => setActiveTab('education')
    },
    { 
      title: 'Community Support', 
      subtitle: 'Connect with others',
      icon: <Users className="w-6 h-6" />,
      color: 'text-orange-400',
      action: () => setActiveTab('contacts')
    },
  ];

  return (
    <div className="space-y-6 fade-in">
      {/* Welcome Section */}
      <Card className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome to RightsGuardian
            </h2>
            <p className="text-purple-200">
              Your pocket guide to instant legal clarity and emergency action
            </p>
            {analytics.lastActiveDate && (
              <p className="text-sm text-purple-300 mt-2">
                Last active: {formatRelativeTime(analytics.lastActiveDate)}
              </p>
            )}
          </div>
          <Shield className="w-16 h-16 text-purple-300" />
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 hover:bg-opacity-15 transition-all cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-purple-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-purple-400">
                  {stat.subtitle}
                </div>
              </div>
              <div className={stat.color}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          <AlertTriangle className="w-5 h-5 text-yellow-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <div 
              key={index} 
              className={`flex items-center justify-between p-4 glass-card-interactive ${
                action.urgent ? 'border-red-400/50 bg-red-500/10' : ''
              }`}
              onClick={action.action}
            >
              <div className="flex items-center space-x-3">
                <div className={action.color}>
                  {action.icon}
                </div>
                <div>
                  <div className="text-white font-medium">{action.title}</div>
                  <div className="text-sm text-purple-300">{action.subtitle}</div>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-purple-400" />
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      {recentGuides.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recently Viewed</h3>
            <Clock className="w-5 h-5 text-purple-400" />
          </div>
          
          <div className="space-y-3">
            {recentGuides.map((guide) => (
              <ListItem 
                key={guide.guideId}
                variant="withArrow"
                className="p-3 glass-card hover:bg-opacity-15 transition-all cursor-pointer"
                onClick={() => setActiveTab('guides')}
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">{guide.title}</div>
                    <div className="text-sm text-purple-300">{guide.category}</div>
                  </div>
                </div>
              </ListItem>
            ))}
          </div>
        </Card>
      )}

      {/* Favorites */}
      {favoriteGuidesData.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Your Favorites</h3>
            <Star className="w-5 h-5 text-yellow-400" />
          </div>
          
          <div className="space-y-3">
            {favoriteGuidesData.map((guide) => (
              <ListItem 
                key={guide.guideId}
                variant="withArrow"
                className="p-3 glass-card hover:bg-opacity-15 transition-all cursor-pointer"
                onClick={() => setActiveTab('guides')}
              >
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <div>
                    <div className="text-white font-medium">{guide.title}</div>
                    <div className="text-sm text-purple-300">{guide.category}</div>
                  </div>
                </div>
              </ListItem>
            ))}
          </div>
        </Card>
      )}

      {/* Activity Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Activity Overview</h3>
        <div className="h-48 flex items-end justify-center space-x-2">
          {/* Simulated activity chart based on session logs */}
          {Array.from({ length: 14 }, (_, i) => {
            const dayActivity = sessionLogs.filter(log => {
              const logDate = new Date(log.timestamp);
              const targetDate = new Date();
              targetDate.setDate(targetDate.getDate() - (13 - i));
              return logDate.toDateString() === targetDate.toDateString();
            }).length;
            
            const height = Math.max((dayActivity / Math.max(1, Math.max(...sessionLogs.map(log => 1)))) * 80, 10);
            
            return (
              <div
                key={i}
                className="bg-gradient-to-t from-purple-500 to-pink-400 rounded-t-sm flex-1 max-w-[20px] transition-all hover:opacity-80"
                style={{ height: `${height}%` }}
                title={`${dayActivity} actions`}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-purple-400 mt-2">
          <span>2 weeks ago</span>
          <span>Today</span>
        </div>
      </Card>

      {/* Emergency Notice */}
      <Card className="p-6 bg-red-500/10 border-red-400/30">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
          <div>
            <h4 className="text-white font-semibold mb-2">Emergency Reminder</h4>
            <p className="text-red-200 text-sm mb-3">
              In case of immediate danger, always call 911 first. This app provides guidance and resources 
              but should not replace emergency services.
            </p>
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => window.location.href = 'tel:911'}
            >
              Call 911 Now
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
