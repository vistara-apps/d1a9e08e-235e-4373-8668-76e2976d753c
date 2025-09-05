'use client';

import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { SearchBar } from './ui/SearchBar';
import { Modal } from './ui/Modal';
import { EmergencyGuideCard } from './EmergencyGuideCard';
import { ChecklistComponent } from './ChecklistComponent';
import { categories } from '@/lib/data';
import { EmergencyGuide } from '@/lib/types';
import { useAppStore, useFilteredGuides } from '@/lib/store';
import { Filter, Star, Lock, BookOpen, AlertTriangle, CheckCircle, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

export function EmergencyGuides() {
  const {
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    setActiveTab,
    logAction,
    isPremiumUnlocked
  } = useAppStore();
  
  const filteredGuides = useFilteredGuides();
  const [selectedGuide, setSelectedGuide] = useState<EmergencyGuide | null>(null);
  const [showChecklist, setShowChecklist] = useState(false);

  useEffect(() => {
    logAction('guides_viewed');
  }, [logAction]);

  const freeGuides = filteredGuides.filter(guide => !guide.isPremium);
  const premiumGuides = filteredGuides.filter(guide => guide.isPremium);

  const handleGuideClick = (guide: EmergencyGuide) => {
    if (guide.isPremium && !isPremiumUnlocked(guide.guideId)) {
      toast.error('This is a premium guide. Upgrade to access full content.');
      return;
    }
    
    setSelectedGuide(guide);
    logAction('guide_viewed', guide.guideId);
  };

  const handleViewChecklist = () => {
    setShowChecklist(true);
    logAction('checklist_viewed', selectedGuide?.guideId);
  };

  const handleFindContacts = () => {
    if (selectedGuide) {
      logAction('find_contacts_clicked', selectedGuide.guideId);
      setSelectedGuide(null);
      setActiveTab('contacts');
      toast.success('Switched to contacts for this situation');
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    logAction('filters_cleared');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <BookOpen className="w-8 h-8 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Emergency Guides</h2>
        </div>
        <p className="text-purple-300">Know your rights in any situation</p>
        <div className="mt-2 text-sm text-purple-400">
          {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''} available
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="space-y-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search guides by title, category, or keywords..."
          />
          
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="w-4 h-4 text-purple-300 flex-shrink-0" />
            <Button
              variant={selectedCategory === '' ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory('')}
            >
              All Categories
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>

          {(searchQuery || selectedCategory) && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-purple-300">
                {searchQuery && `Searching for "${searchQuery}"`}
                {searchQuery && selectedCategory && ' in '}
                {selectedCategory && `"${selectedCategory}"`}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleClearFilters}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Free Guides */}
      {freeGuides.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Free Guides</h3>
            <span className="text-sm text-purple-300">({freeGuides.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {freeGuides.map(guide => (
              <EmergencyGuideCard
                key={guide.guideId}
                guide={guide}
                onClick={() => handleGuideClick(guide)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Premium Guides */}
      {premiumGuides.length > 0 && (
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Star className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Premium Guides</h3>
            <span className="text-sm text-purple-300">({premiumGuides.length})</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {premiumGuides.map(guide => (
              <EmergencyGuideCard
                key={guide.guideId}
                guide={guide}
                onClick={() => handleGuideClick(guide)}
              />
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredGuides.length === 0 && (
        <Card className="p-8 text-center">
          <AlertTriangle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <div className="text-white font-medium mb-2">No guides found</div>
          <div className="text-sm text-purple-400 mb-4">
            Try adjusting your search or filter criteria
          </div>
          <Button
            variant="secondary"
            onClick={handleClearFilters}
          >
            Clear All Filters
          </Button>
        </Card>
      )}

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <Modal
          isOpen={!!selectedGuide}
          onClose={() => {
            setSelectedGuide(null);
            setShowChecklist(false);
            logAction('guide_closed', selectedGuide.guideId);
          }}
          title={selectedGuide.title}
        >
          <div className="space-y-4">
            {/* Guide Content */}
            {!showChecklist && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full">
                    {selectedGuide.category}
                  </span>
                  {selectedGuide.isPremium && (
                    <div className="flex items-center space-x-1 bg-yellow-500 bg-opacity-20 text-yellow-300 px-2 py-1 rounded-full text-xs">
                      <Lock className="w-3 h-3" />
                      <span>Premium</span>
                    </div>
                  )}
                </div>
                
                <div className="bg-blue-500/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Summary</h4>
                  <p className="text-blue-100">{selectedGuide.contentJson.summary}</p>
                </div>
                
                {selectedGuide.contentJson.sections.map((section, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-white flex items-center space-x-2">
                      {section.type === 'warning' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                      {section.type === 'tip' && <CheckCircle className="w-4 h-4 text-green-400" />}
                      <span>{section.title}</span>
                    </h4>
                    <div className={`text-sm rounded-lg p-3 ${
                      section.type === 'warning' ? 'text-red-200 bg-red-500 bg-opacity-20 border border-red-500/30' :
                      section.type === 'tip' ? 'text-green-200 bg-green-500 bg-opacity-20 border border-green-500/30' :
                      'text-purple-200 bg-purple-500 bg-opacity-10'
                    }`}>
                      {section.type === 'list' ? (
                        <ul className="list-disc list-inside space-y-1">
                          {section.content.split('\n').filter(item => item.trim()).map((item, i) => (
                            <li key={i}>{item.trim()}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{section.content}</p>
                      )}
                    </div>
                  </div>
                ))}
                
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/20">
                  <Button
                    variant="primary"
                    onClick={handleViewChecklist}
                    className="flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>View Action Checklist</span>
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={handleFindContacts}
                    className="flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Find Emergency Contacts</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Checklist View */}
            {showChecklist && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Action Checklist</span>
                  </h4>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowChecklist(false)}
                  >
                    ← Back to Guide
                  </Button>
                </div>
                <div className="text-sm text-purple-300 mb-4">
                  Follow these steps to protect your rights in this situation
                </div>
                <ChecklistComponent guideId={selectedGuide.guideId} />
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
