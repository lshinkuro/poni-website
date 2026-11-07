import type { LucideIcon } from 'lucide-react'

// Theme + Palette from UI.swift.
export const theme = {
  mint: ['#34D399', '#0EA5A4'],
  electric: ['#60A5FA', '#6366F1'],
  coral: ['#FB7185', '#F97316'],
  violet: ['#C084FC', '#EC4899'],
  amber: ['#FBBF24', '#F97316'],
} as const
export type Theme = readonly [string, string]
export const P = {
  green: '#22C55E', teal: '#14B8A6', blue: '#3B82F6', indigo: '#6366F1', violet: '#A855F7', pink: '#EC4899',
  red: '#F43F5E', orange: '#F97316', amber: '#F59E0B', yellow: '#EAB308', sky: '#0EA5E9', slate: '#64748B',
}
export const grad = (t: Theme) => `linear-gradient(135deg, ${t[0]}, ${t[1]})`

export type Icon = LucideIcon
