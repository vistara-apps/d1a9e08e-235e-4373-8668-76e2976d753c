'use client';

import { CardProps } from '@/lib/types';

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

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }

  return (
    <div className={classes}>
      {children}
    </div>
  );
}
