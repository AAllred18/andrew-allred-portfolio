import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(value?: string) {
  if (!value) return 'Recent work';
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(new Date(value));
}
