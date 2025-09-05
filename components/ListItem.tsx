'use client';

import { ChevronRight } from 'lucide-react';
import { ListItemProps } from '@/lib/types';

export function ListItem({
  children,
  variant = 'withArrow',
  icon,
  onClick,
  className = ''
}: ListItemProps) {
  const baseClasses = 'flex items-center justify-between p-4 glass-card hover:bg-opacity-15 transition-all duration-200';
  const interactiveClasses = onClick ? 'cursor-pointer hover:scale-105' : '';
  
  const classes = `${baseClasses} ${interactiveClasses} ${className}`;

  const content = (
    <>
      <div className="flex items-center gap-3">
        {variant === 'withIcon' && icon && (
          <div className="text-white/80">
            {icon}
          </div>
        )}
        <div className="text-white">
          {children}
        </div>
      </div>
      {variant === 'withArrow' && (
        <ChevronRight className="w-5 h-5 text-white/60" />
      )}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }

  return (
    <div className={classes}>
      {content}
    </div>
  );
}
