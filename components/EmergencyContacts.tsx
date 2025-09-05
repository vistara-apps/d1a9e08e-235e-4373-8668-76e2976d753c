'use client';

import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ListItem } from './ui/ListItem';
import { Modal } from './ui/Modal';
import { SearchBar } from './ui/SearchBar';
import { emergencyContacts, situationTypes } from '@/lib/data';
import { EmergencyContact } from '@/lib/types';
import { Phone, Mail, Lock, MapPin, Clock } from 'lucide-react';
import { formatPhoneNumber, callPhoneNumber, sendEmail } from '@/lib/utils';

export function EmergencyContacts() {
  const [selectedContact, setSelectedContact] = useState<EmergencyContact | null>(null);
  const [selectedSituation, setSelectedSituation] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = emergencyContacts.filter(contact => {
    const matchesSituation = selectedSituation === 'all' || contact.situationType === selectedSituation;
    const matchesSearch = contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contact.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSituation && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'legal aid': return '⚖️';
      case 'housing': return '🏠';
      case 'employment': return '💼';
      case 'safety': return '🛡️';
      default: return '📞';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Emergency Contacts</h2>
        <p className="text-purple-300">Quick access to essential support services</p>
      </div>

      <SearchBar 
        placeholder="Search contacts..."
        onSearch={setSearchQuery}
      />

      {/* Situation Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedSituation === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSelectedSituation('all')}
        >
          All Situations
        </Button>
        {situationTypes.map(situation => (
          <Button
            key={situation}
            variant={selectedSituation === situation ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedSituation(situation)}
          >
            {situation}
          </Button>
        ))}
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="interactive" onClick={() => callPhoneNumber('911')}>
          <div className="text-center">
            <div className="text-3xl mb-2">🚨</div>
            <h3 className="font-bold text-white text-lg">Emergency: 911</h3>
            <p className="text-sm text-purple-300">Life-threatening emergencies</p>
          </div>
        </Card>
        
        <Card variant="interactive" onClick={() => callPhoneNumber('988')}>
          <div className="text-center">
            <div className="text-3xl mb-2">💙</div>
            <h3 className="font-bold text-white text-lg">Crisis: 988</h3>
            <p className="text-sm text-purple-300">Suicide & Crisis Lifeline</p>
          </div>
        </Card>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {filteredContacts.map(contact => (
          <ListItem
            key={contact.contactId}
            variant="withIcon"
            icon={
              <div className="relative text-2xl">
                {getCategoryIcon(contact.category)}
                {contact.isPremium && (
                  <Lock className="w-3 h-3 absolute -top-1 -right-1 text-yellow-400" />
                )}
              </div>
            }
            onClick={() => setSelectedContact(contact)}
          >
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-white">{contact.name}</h3>
                {contact.isPremium && (
                  <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full">
                    Premium
                  </span>
                )}
              </div>
              <p className="text-sm text-purple-300">{contact.category} • {contact.situationType}</p>
              <p className="text-xs text-purple-400 mt-1">{contact.description}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-xs text-green-400 flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  {formatPhoneNumber(contact.phone)}
                </span>
                {contact.email && (
                  <span className="text-xs text-blue-400 flex items-center">
                    <Mail className="w-3 h-3 mr-1" />
                    Email
                  </span>
                )}
              </div>
            </div>
          </ListItem>
        ))}
      </div>

      {/* Contact Detail Modal */}
      <Modal
        isOpen={!!selectedContact}
        onClose={() => setSelectedContact(null)}
        title={selectedContact?.name}
      >
        {selectedContact && (
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getCategoryIcon(selectedContact.category)}</div>
                <div>
                  <h3 className="font-semibold text-white">{selectedContact.name}</h3>
                  <p className="text-sm text-purple-300">
                    {selectedContact.category} • {selectedContact.situationType}
                  </p>
                </div>
              </div>

              <p className="text-purple-200">{selectedContact.description}</p>

              {/* Contact Methods */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 glass-card">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-400" />
                    <div>
                      <div className="text-white font-medium">Phone</div>
                      <div className="text-sm text-purple-300">
                        {formatPhoneNumber(selectedContact.phone)}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => callPhoneNumber(selectedContact.phone)}
                  >
                    Call
                  </Button>
                </div>

                {selectedContact.email && (
                  <div className="flex items-center justify-between p-3 glass-card">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <div>
                        <div className="text-white font-medium">Email</div>
                        <div className="text-sm text-purple-300">
                          {selectedContact.email}
                        </div>
                      </div>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => sendEmail(selectedContact.email!, `Help Request - ${selectedContact.situationType}`)}
                    >
                      Email
                    </Button>
                  </div>
                )}
              </div>

              {/* Additional Info */}
              <div className="p-4 bg-blue-500 bg-opacity-20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">Availability</span>
                </div>
                <p className="text-sm text-blue-200">
                  Most services operate 24/7. Some may have specific hours - call to confirm availability.
                </p>
              </div>

              {selectedContact.isPremium && (
                <div className="p-4 bg-yellow-500 bg-opacity-20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Lock className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-white">Premium Contact</span>
                  </div>
                  <p className="text-sm text-yellow-200">
                    This contact is part of our premium service. Unlock for $0.50 or upgrade to unlimited access.
                  </p>
                  <Button variant="primary" size="sm" className="mt-3">
                    Unlock Contact
                  </Button>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => callPhoneNumber(selectedContact.phone)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button variant="secondary">
                Save Contact
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
