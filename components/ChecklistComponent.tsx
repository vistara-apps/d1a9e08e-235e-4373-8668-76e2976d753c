'use client';

import { Check, Square } from 'lucide-react';
import { useState } from 'react';
import { Card } from './Card';

interface ChecklistComponentProps {
  items: string[];
  title: string;
}

export function ChecklistComponent({ items, title }: ChecklistComponentProps) {
  const [completedItems, setCompletedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedItems(newCompleted);
  };

  const completionPercentage = (completedItems.size / items.length) * 100;

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-white mb-2">{title}</h3>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-white/70 mt-1">
            {completedItems.size} of {items.length} completed
          </p>
        </div>
        
        <div className="space-y-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => toggleItem(index)}
              className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 w-full text-left"
            >
              {completedItems.has(index) ? (
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              ) : (
                <Square className="w-5 h-5 text-white/60 mt-0.5 flex-shrink-0" />
              )}
              <span className={`text-sm ${
                completedItems.has(index) 
                  ? 'text-white/70 line-through' 
                  : 'text-white'
              }`}>
                {item}
              </span>
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
