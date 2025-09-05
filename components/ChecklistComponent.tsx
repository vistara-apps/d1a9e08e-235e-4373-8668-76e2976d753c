'use client';

import { useEffect } from 'react';
import { Button } from './ui/Button';
import { useAppStore } from '@/lib/store';
import { CheckCircle, Circle, RotateCcw, Trophy } from 'lucide-react';
import toast from 'react-hot-toast';

interface ChecklistComponentProps {
  guideId: string;
}

export function ChecklistComponent({ guideId }: ChecklistComponentProps) {
  const { 
    getChecklistForGuide, 
    toggleChecklistItem, 
    resetChecklist,
    logAction 
  } = useAppStore();

  const checklist = getChecklistForGuide(guideId);

  useEffect(() => {
    logAction('checklist_loaded', guideId);
  }, [logAction, guideId]);

  const handleToggleItem = (itemId: string) => {
    toggleChecklistItem(guideId, itemId);
    const item = checklist.find(item => item.itemId === itemId);
    if (item && !item.completed) {
      toast.success('Step completed!');
    }
  };

  const handleResetChecklist = () => {
    resetChecklist(guideId);
    toast.success('Checklist reset');
  };

  const completedCount = checklist.filter(item => item.completed).length;
  const totalCount = checklist.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isComplete = completedCount === totalCount && totalCount > 0;

  if (checklist.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-purple-300 mb-2">No checklist available</div>
        <div className="text-sm text-purple-400">
          This guide doesn't have an action checklist
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-purple-300">Progress</span>
          <span className="text-white font-medium">
            {completedCount}/{totalCount} completed
            {isComplete && <span className="text-green-400 ml-2">🎉</span>}
          </span>
        </div>
        <div className="w-full bg-purple-900 bg-opacity-50 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              isComplete 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                : 'bg-gradient-to-r from-purple-500 to-blue-500'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {isComplete && (
          <div className="text-center text-green-400 text-sm font-medium flex items-center justify-center space-x-1">
            <Trophy className="w-4 h-4" />
            <span>All steps completed! You're prepared.</span>
          </div>
        )}
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {checklist
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <div
              key={item.itemId}
              className={`flex items-start space-x-3 p-3 glass-card hover:bg-opacity-15 transition-all duration-200 cursor-pointer ${
                item.completed ? 'opacity-75 bg-green-500/10' : 'hover:bg-purple-500/10'
              }`}
              onClick={() => handleToggleItem(item.itemId)}
            >
              <div className="flex-shrink-0 mt-0.5">
                {item.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <Circle className="w-5 h-5 text-purple-400 hover:text-purple-300" />
                )}
              </div>
              <div className={`flex-1 text-sm transition-all duration-200 ${
                item.completed 
                  ? 'text-purple-300 line-through' 
                  : 'text-white'
              }`}>
                <span className="text-xs text-purple-400 block mb-1">
                  Step {item.order + 1}
                </span>
                {item.stepText}
              </div>
            </div>
          ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-white border-opacity-20">
        <div className="text-sm">
          {isComplete ? (
            <span className="text-green-400 font-medium flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>All steps completed!</span>
            </span>
          ) : (
            <span className="text-purple-300">
              {totalCount - completedCount} step{totalCount - completedCount !== 1 ? 's' : ''} remaining
            </span>
          )}
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={handleResetChecklist}
          className="flex items-center space-x-2"
          disabled={completedCount === 0}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </Button>
      </div>

      {/* Completion Message */}
      {isComplete && (
        <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
          <div className="text-green-300 font-medium mb-2">
            🎉 Congratulations! You've completed all steps.
          </div>
          <div className="text-sm text-green-200">
            You're now prepared to handle this situation while protecting your rights.
          </div>
        </div>
      )}
    </div>
  );
}
