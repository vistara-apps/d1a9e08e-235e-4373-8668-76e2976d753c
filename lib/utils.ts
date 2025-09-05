import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Phone number formatting and validation
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  return phone;
}

export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length === 10 || (cleaned.length === 11 && cleaned[0] === '1');
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Local storage utilities
export function getFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

export function removeFromStorage(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Failed to remove from localStorage:', error);
  }
}

// Array utilities
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key]);
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

// Search utilities
export function fuzzySearch<T>(
  items: T[],
  query: string,
  getSearchText: (item: T) => string
): T[] {
  if (!query.trim()) return items;
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return items.filter(item => {
    const searchText = getSearchText(item).toLowerCase();
    return searchText.includes(normalizedQuery) ||
           normalizedQuery.split(' ').every(term => searchText.includes(term));
  });
}

// URL utilities
export function createTelLink(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  return `tel:${cleaned}`;
}

export function createEmailLink(email: string, subject?: string): string {
  const params = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${email}${params}`;
}

// Legacy functions for backward compatibility
export function callPhoneNumber(phone: string) {
  window.location.href = createTelLink(phone);
}

export function sendEmail(email: string, subject?: string) {
  window.location.href = createEmailLink(email, subject);
}

export function shareContent(title: string, text: string, url?: string) {
  if (navigator.share) {
    navigator.share({
      title,
      text,
      url: url || window.location.href,
    });
  } else {
    // Fallback to copying to clipboard
    navigator.clipboard.writeText(`${title}\n\n${text}\n\n${url || window.location.href}`);
  }
}

// Analytics utilities
export function trackEvent(eventName: string, properties?: Record<string, any>): void {
  // In a real app, this would integrate with analytics services
  console.log('Event tracked:', eventName, properties);
}

// Error handling utilities
export function handleError(error: unknown, context?: string): void {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error(`Error${context ? ` in ${context}` : ''}:`, message);
  
  // In a real app, this would integrate with error reporting services
  if (typeof window !== 'undefined') {
    // Could integrate with Sentry, LogRocket, etc.
  }
}

// Clipboard utilities
export async function copyToClipboard(text: string): Promise<boolean> {
  if (!navigator.clipboard) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      document.body.removeChild(textArea);
      return false;
    }
  }
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
