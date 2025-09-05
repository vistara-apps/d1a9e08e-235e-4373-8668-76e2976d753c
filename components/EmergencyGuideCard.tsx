'use client';

import { Shield, Lock, Clock } from 'lucide-react';
import { EmergencyGuide } from '@/lib/types';
import { Card } from './Card';
import { Button } from './Button';

interface EmergencyGuideCardProps {
  guide: EmergencyGuide;
  onSelect: (guide: EmergencyGuide) => void;
}

export function EmergencyGuideCard({ guide, onSelect }: EmergencyGuideCardProps) {
  return (
    <Card variant="interactive" onClick={() => onSelect(guide)}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{guide.title}</h3>
              <p className="text-sm text-white/70">{guide.category}</p>
            </div>
          </div>
          {guide.isPremium && (
            <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
              <Lock className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-yellow-400">Premium</span>
            </div>
          )}
        </div>
        
        <p className="text-white/80 text-sm line-clamp-2">
          {guide.contentJson.summary}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-white/60 text-xs">
            <Clock className="w-3 h-3" />
            <span>5 min read</span>
          </div>
          <Button size="sm" variant="secondary">
            View Guide
          </Button>
        </div>
      </div>
    </Card>
  );
}
