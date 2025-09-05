'use client';

import { Phone, Mail, Lock } from 'lucide-react';
import { EmergencyContact } from '@/lib/types';
import { Card } from './Card';
import { Button } from './Button';

interface EmergencyContactCardProps {
  contact: EmergencyContact;
  onCall: (phone: string) => void;
  onEmail?: (email: string) => void;
}

export function EmergencyContactCard({ contact, onCall, onEmail }: EmergencyContactCardProps) {
  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-white">{contact.name}</h3>
            <p className="text-sm text-white/70">{contact.category}</p>
          </div>
          {contact.isPremium && (
            <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
              <Lock className="w-3 h-3 text-yellow-400" />
              <span className="text-xs text-yellow-400">Premium</span>
            </div>
          )}
        </div>
        
        <p className="text-white/80 text-sm">
          {contact.description}
        </p>
        
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={() => onCall(contact.phone)}
            className="flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Call
          </Button>
          {contact.email && onEmail && (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onEmail(contact.email!)}
              className="flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Email
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
