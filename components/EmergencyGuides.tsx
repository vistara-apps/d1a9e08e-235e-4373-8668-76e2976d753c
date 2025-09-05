'use client';

import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ListItem } from './ui/ListItem';
import { Modal } from './ui/Modal';
import { SearchBar } from './ui/SearchBar';
import { emergencyGuides, categories } from '@/lib/data';
import { EmergencyGuide } from '@/lib/types';
import { BookOpen, Lock, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export function EmergencyGuides() {
  const [selectedGuide, setSelectedGuide] = useState<EmergencyGuide | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const filteredGuides = emergencyGuides.filter(guide => {
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleStep = (stepIndex: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'tip': return <Info className="w-5 h-5 text-blue-400" />;
      case 'list': return <CheckCircle className="w-5 h-5 text-green-400" />;
      default: return <BookOpen className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Emergency Guides</h2>
        <p className="text-purple-300">Step-by-step guidance for rights-related situations</p>
      </div>

      <SearchBar 
        placeholder="Search guides..."
        onSearch={setSearchQuery}
      />

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setSelectedCategory('all')}
        >
          All
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Guides List */}
      <div className="space-y-4">
        {filteredGuides.map(guide => (
          <ListItem
            key={guide.guideId}
            variant="withIcon"
            icon={
              <div className="relative">
                <BookOpen className="w-6 h-6" />
                {guide.isPremium && (
                  <Lock className="w-3 h-3 absolute -top-1 -right-1 text-yellow-400" />
                )}
              </div>
            }
            onClick={() => setSelectedGuide(guide)}
          >
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-white">{guide.title}</h3>
                {guide.isPremium && (
                  <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full">
                    Premium
                  </span>
                )}
              </div>
              <p className="text-sm text-purple-300">{guide.category}</p>
              <p className="text-xs text-purple-400 mt-1">
                {guide.contentJson.summary}
              </p>
            </div>
          </ListItem>
        ))}
      </div>

      {/* Guide Detail Modal */}
      <Modal
        isOpen={!!selectedGuide}
        onClose={() => setSelectedGuide(null)}
        title={selectedGuide?.title}
        className="max-w-2xl max-h-[80vh] overflow-y-auto"
      >
        {selectedGuide && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="p-4 bg-purple-500 bg-opacity-20 rounded-lg">
              <p className="text-white">{selectedGuide.contentJson.summary}</p>
            </div>

            {/* Content Sections */}
            <div className="space-y-4">
              {selectedGuide.contentJson.sections.map((section, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {getSectionIcon(section.type)}
                    <h4 className="font-semibold text-white">{section.title}</h4>
                  </div>
                  
                  {section.type === 'list' ? (
                    <ul className="space-y-1 ml-7">
                      {section.content.split('\n').map((item, itemIndex) => (
                        <li key={itemIndex} className="text-purple-200 text-sm">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={`ml-7 text-sm ${
                      section.type === 'warning' ? 'text-red-300' : 
                      section.type === 'tip' ? 'text-blue-300' : 
                      'text-purple-200'
                    }`}>
                      {section.content}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Checklist */}
            {selectedGuide.contentJson.checklist.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-semibold text-white flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Action Checklist</span>
                </h4>
                <div className="space-y-2">
                  {selectedGuide.contentJson.checklist.map((step, index) => {
                    const stepId = `${selectedGuide.guideId}-${index}`;
                    const isCompleted = completedSteps.has(stepId);
                    
                    return (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-3 glass-card cursor-pointer hover:bg-opacity-15 transition-all duration-200"
                        onClick={() => toggleStep(stepId)}
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 ${
                          isCompleted 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-purple-300'
                        }`}>
                          {isCompleted && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className={`text-sm ${
                          isCompleted ? 'text-purple-300 line-through' : 'text-white'
                        }`}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button variant="primary" className="flex-1">
                View Emergency Contacts
              </Button>
              <Button variant="secondary">
                Share Guide
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
