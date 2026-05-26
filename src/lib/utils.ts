import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import slugify from 'slugify'
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, trim: true })
}

export function formatDate(date: string | Date, fmt = 'MMMM d, yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, fmt)
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length).trimEnd() + '…'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function formatPrice(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(amount)
}

export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const q = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      q.set(key, String(value))
    }
  })
  return q.toString()
}

export const WEDDING_STYLES = ['Royal', 'Rustic', 'Boho', 'Modern', 'Garden', 'Beach', 'Destination', 'Traditional']
export const LOCATIONS = ['Jaipur', 'Udaipur', 'Goa', 'Delhi', 'Mumbai', 'Agra', 'Jodhpur', 'Shimla', 'Mussoorie']
export const VENUE_TYPES = ['Palace', 'Resort', 'Beach', 'Heritage', 'Garden', 'Rooftop', 'Farmhouse', 'Hotel']
export const BLOG_CATEGORIES = ['Decor', 'Planning Tips', 'Venue Spotlight', 'Real Weddings', 'Trends', 'Food & Cuisine']
