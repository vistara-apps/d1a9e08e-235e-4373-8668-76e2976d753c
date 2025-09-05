'use client';

import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ListItem } from './ui/ListItem';
import { Phone, BookOpen, Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'Emergency Calls', value: '$5.00.30', subtitle: 'Unit Listing Colorists Ora shed Contact', icon: Phone },
    { label: 'Guides Accessed', value: 'Mac tip', subtitle: 'Floating Calls', icon: BookOpen },
  ];

  const dashboardItems = [
    { 
      title: 'Rights Guardian', 
      subtitle: 'Contact us or consults',
      icon: <Shield className="w-6 h-6" />,
      color: 'text-green-400'
    },
    { 
      title: 'Categorized aids', 
      subtitle: 'Rights related contacts',
      icon: <Users className="w-6 h-6" />,
      color: 'text-orange-400'
    },
    { 
      title: 'Floating Blades', 
      subtitle: 'Contactors',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-blue-400'
    },
    { 
      title: 'Floating Calls', 
      subtitle: 'Floating calls',
      icon: <Phone className="w-6 h-6" />,
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

      {/* Chart Placeholder */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Emergency Calls Activity</h3>
        <div className="h-48 flex items-end justify-center space-x-2">
          {/* Simulated bar chart */}
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="bg-gradient-to-t from-purple-500 to-pink-400 rounded-t-sm"
              style={{
                height: `${Math.random() * 80 + 20}%`,
                width: '12px',
              }}
            />
          ))}
        </div>
      </Card>

      {/* Dashboard Items */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Dashboard</h3>
          <Button variant="icon" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {dashboardItems.map((item, index) => (
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
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-white border-opacity-20">
          <div className="text-white font-medium">Emergency calls</div>
        </div>
      </Card>
    </div>
  );
}

// Import Shield from lucide-react
import { Shield, X } from 'lucide-react';
