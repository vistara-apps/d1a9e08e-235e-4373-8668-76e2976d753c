'use client';

import { ButtonProps } from '@/lib/types';
import { cn } from '@/lib/utils';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = ''
}: ButtonProps) {
  const baseClasses = 'font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl',
    secondary: 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 backdrop-blur-sm',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    icon: 'bg-transparent text-white hover:bg-white hover:bg-opacity-20'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-lg'
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
