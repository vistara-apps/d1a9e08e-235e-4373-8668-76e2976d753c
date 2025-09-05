'use client';

import { ListItemProps } from '@/lib/types';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ListItem({
  children,
  variant = 'withArrow',
  icon,
  onClick,
  className = ''
}: ListItemProps) {
  const baseClasses = 'flex items-center justify-between p-4 glass-card hover:bg-opacity-15 transition-all duration-200';
  
  const interactiveClasses = onClick ? 'cursor-pointer hover:scale-105' : '';

  return (
    <div 
      className={cn(baseClasses, interactiveClasses, className)}
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        {variant === 'withIcon' && icon && (
          <div className="text-purple-300">
            {icon}
          </div>
        )}
        <div className="flex-1">
          {children}
        </div>
      </div>
      {variant === 'withArrow' && (
        <ChevronRight className="w-5 h-5 text-purple-300" />
      )}
    </div>
  );
}
