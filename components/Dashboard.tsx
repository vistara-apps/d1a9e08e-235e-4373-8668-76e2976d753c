'use client';

import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ListItem } from './ui/ListItem';
import { Phone, BookOpen, Users, TrendingUp, AlertTriangle, CheckCircle, Shield, X } from 'lucide-react';
import { emergencyGuides, emergencyContacts } from '@/lib/data';

export function Dashboard() {
  const stats = [
    { 
      label: 'Available Guides', 
      value: emergencyGuides.length.toString(), 
      subtitle: 'Emergency guides ready to help', 
      icon: BookOpen 
    },
    { 
      label: 'Emergency Contacts', 
      value: emergencyContacts.length.toString(), 
      subtitle: 'Verified support contacts', 
      icon: Phone 
    },
  ];

  const recentActivity = [
    { 
      title: 'Police Encounter Guide', 
      subtitle: 'Accessed 2 hours ago',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-green-400'
    },
    { 
      title: 'ACLU Rights Hotline', 
      subtitle: 'Contact saved',
      icon: <Phone className="w-6 h-6" />,
      color: 'text-blue-400'
    },
    { 
      title: 'Tenant Rights Guide', 
      subtitle: 'Checklist completed',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-green-400'
    },
    { 
      title: 'Miranda Rights Snippet', 
      subtitle: 'Shared on social media',
      icon: <Users className="w-6 h-6" />,
      color: 'text-purple-400'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-purple-300 mb-2">
                  {stat.label}
                </div>
                <div className="text-xs text-purple-400">
                  {stat.subtitle}
                </div>
              </div>
              <div className="text-yellow-400">
                <stat.icon className="w-8 h-8" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Access */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Access</h3>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 py-6"
          >
            <BookOpen className="w-8 h-8" />
            <span>Browse Guides</span>
          </Button>
          <Button 
            variant="secondary" 
            className="flex flex-col items-center space-y-2 py-6"
          >
            <Phone className="w-8 h-8" />
            <span>Find Contacts</span>
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
          <Button variant="icon" size="sm">
            <TrendingUp className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentActivity.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 glass-card hover:bg-opacity-15 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className={item.color}>
                  {item.icon}
                </div>
                <div>
                  <div className="text-white font-medium">{item.title}</div>
                  <div className="text-sm text-purple-300">{item.subtitle}</div>
                </div>
              </div>
              <div className="text-purple-400 text-sm">
                {index === 0 ? '2h' : index === 1 ? '1d' : index === 2 ? '3d' : '1w'}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
