import type { CoffeeSlug } from '~/types'

export interface CoffeeTheme {
  slug: CoffeeSlug
  accent: string
  glow: string
}

const themes: Record<CoffeeSlug, CoffeeTheme> = {
  bloom: {
    slug: 'bloom',
    accent: '#C9A0B0',
    glow: 'rgba(201, 160, 176, 0.28)',
  },
  velvet: {
    slug: 'velvet',
    accent: '#8B5E3C',
    glow: 'rgba(92, 61, 46, 0.35)',
  },
  santos: {
    slug: 'santos',
    accent: '#C4A35A',
    glow: 'rgba(196, 163, 90, 0.28)',
  },
  noir: {
    slug: 'noir',
    accent: '#8B3A4A',
    glow: 'rgba(27, 40, 56, 0.45)',
  },
  ember: {
    slug: 'ember',
    accent: '#C45C26',
    glow: 'rgba(196, 92, 38, 0.3)',
  },
}

export function useCoffeeTheme(slug: string): CoffeeTheme {
  const key = slug.toLowerCase() as CoffeeSlug
  return themes[key] ?? themes.bloom
}
