'use client';

import { Check, Square, RotateCcw, Share2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { ChecklistItem } from '@/lib/types';

interface ChecklistComponentProps {
  items: string[];
  title: string;
  guideId: string;
  userId?: string;
}

export function ChecklistComponent({ items, title, guideId, userId = 'anonymous' }: ChecklistComponentProps) {
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);

  // Load existing checklist progress
  useEffect(() => {
    loadChecklistProgress();
  }, [guideId, userId]);

  const loadChecklistProgress = async () => {
    try {
      const response = await fetch(`/api/checklist?guideId=${guideId}&userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          const completed = new Set<number>();
          data.data.forEach((item: ChecklistItem) => {
            if (item.completed) {
              completed.add(item.order);
            }
          });
          setCompletedItems(completed);
          setChecklistItems(data.data);
        } else {
          // Initialize checklist if it doesn't exist
          initializeChecklist();
        }
      }
    } catch (error) {
      console.error('Error loading checklist progress:', error);
      initializeChecklist();
    }
  };

  const initializeChecklist = async () => {
    const initialItems = items.map((item, index) => ({
      stepText: item,
      completed: false,
      order: index
    }));

    try {
      const response = await fetch('/api/checklist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guideId,
          userId,
          items: initialItems
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setChecklistItems(data.data);
        }
      }
    } catch (error) {
      console.error('Error initializing checklist:', error);
    }
  };

  const toggleItem = async (index: number) => {
    setIsLoading(true);
    const newCompleted = new Set(completedItems);
    const isCompleted = !newCompleted.has(index);
    
    if (isCompleted) {
      newCompleted.add(index);
    } else {
      newCompleted.delete(index);
    }
    
    setCompletedItems(newCompleted);

    // Update on server
    try {
      const itemId = checklistItems[index]?.itemId || `${userId}-${guideId}-${index}`;
      const response = await fetch('/api/checklist', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guideId,
          userId,
          itemId,
          completed: isCompleted
        })
      });

      if (!response.ok) {
        // Revert on error
        setCompletedItems(completedItems);
      }
    } catch (error) {
      console.error('Error updating checklist item:', error);
      // Revert on error
      setCompletedItems(completedItems);
    } finally {
      setIsLoading(false);
    }
  };

  const resetChecklist = () => {
    setCompletedItems(new Set());
    // Update all items to uncompleted
    checklistItems.forEach((_, index) => {
      toggleItem(index);
    });
  };

  const shareProgress = async () => {
    const completionPercentage = Math.round((completedItems.size / items.length) * 100);
    const shareText = `I've completed ${completionPercentage}% of the "${title}" checklist on RightsGuardian! 💪 #KnowYourRights #RightsGuardian`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${title} Progress`,
          text: shareText,
          url: window.location.href
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText);
    }
  };

  const completionPercentage = (completedItems.size / items.length) * 100;

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">{title}</h3>
          <div className="flex gap-2">
            <Button
              variant="icon"
              size="sm"
              onClick={shareProgress}
              disabled={completedItems.size === 0}
              className="text-purple-300 hover:text-white"
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="icon"
              size="sm"
              onClick={resetChecklist}
              disabled={completedItems.size === 0}
              className="text-purple-300 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-white/70">
              {completedItems.size} of {items.length} completed
            </p>
            <p className="text-sm font-medium text-white">
              {Math.round(completionPercentage)}%
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => toggleItem(index)}
              disabled={isLoading}
              className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 w-full text-left ${
                isLoading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'bg-white/5 hover:bg-white/10 active:bg-white/15'
              }`}
            >
              {completedItems.has(index) ? (
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-white/60 mt-0.5 flex-shrink-0" />
              )}
              <span className={`text-sm transition-all duration-200 ${
                completedItems.has(index) 
                  ? 'text-white/70 line-through' 
                  : 'text-white'
              }`}>
                {item}
              </span>
            </button>
          ))}
        </div>

        {completedItems.size === items.length && (
          <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
            <div className="text-green-400 text-2xl mb-2">🎉</div>
            <p className="text-green-300 font-medium">Checklist Complete!</p>
            <p className="text-green-400/80 text-sm mt-1">
              Great job following through on your rights protection plan.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
