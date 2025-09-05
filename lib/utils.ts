import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Format as 1-XXX-XXX-XXXX for 11 digits
  if (cleaned.length === 11 && cleaned[0] === '1') {
    return `1-${cleaned.slice(1, 4)}-${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if doesn't match expected patterns
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
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

export function callPhoneNumber(phone: string) {
  window.location.href = `tel:${phone}`;
}

export function sendEmail(email: string, subject?: string) {
  const mailtoUrl = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
  window.location.href = mailtoUrl;
}
