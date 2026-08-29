import type { CoffeeSlug } from '~/types'

export interface CoffeeTheme {
  slug: CoffeeSlug
  accent: string
  accentDeep: string
  mist: string
  glow: string
}

const themes: Record<CoffeeSlug, CoffeeTheme> = {
  bloom: {
    slug: 'bloom',
    accent: '#C9A0B0',
    accentDeep: '#8E5F72',
    mist: '#E8D5DC',
    glow: 'rgba(201, 160, 176, 0.28)',
  },
  velvet: {
    slug: 'velvet',
    accent: '#8B5E3C',
    accentDeep: '#3A241A',
    mist: '#D4C0B0',
    glow: 'rgba(92, 61, 46, 0.35)',
  },
  santos: {
    slug: 'santos',
    accent: '#C4A35A',
    accentDeep: '#8A6F2E',
    mist: '#E8D9A8',
    glow: 'rgba(196, 163, 90, 0.28)',
  },
  noir: {
    slug: 'noir',
    accent: '#8B3A4A',
    accentDeep: '#0D141C',
    mist: '#A8B8C8',
    glow: 'rgba(27, 40, 56, 0.45)',
  },
  ember: {
    slug: 'ember',
    accent: '#C45C26',
    accentDeep: '#7A3214',
    mist: '#E8B89A',
    glow: 'rgba(196, 92, 38, 0.3)',
  },
}

export function useCoffeeTheme(slug: string): CoffeeTheme {
  const key = slug.toLowerCase() as CoffeeSlug
  return themes[key] ?? themes.bloom
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatCoffeeName(name: string): string {
  if (!name) return ''
  return name.charAt(0).toLocaleUpperCase('ru-RU') + name.slice(1).toLocaleLowerCase('ru-RU')
}

export function capitalizeFirst(text: string): string {
  if (!text) return ''
  return text.charAt(0).toLocaleUpperCase('ru-RU') + text.slice(1)
}
