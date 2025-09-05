'use client';

import { CardProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function Card({ 
  children, 
  className = '', 
  variant = 'default',
  onClick 
}: CardProps) {
  const baseClasses = 'glass-card transition-all duration-200';
  
  const variantClasses = {
    default: 'p-6',
    interactive: 'p-6 hover:bg-opacity-15 cursor-pointer hover:scale-105'
  };

  return (
    <div 
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
