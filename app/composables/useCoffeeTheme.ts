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
  const { locale } = useI18n()
  const numberLocale = locale.value === 'en' ? 'en-US' : 'ru-RU'

  return new Intl.NumberFormat(numberLocale, {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatCoffeeName(name: string): string {
  if (!name) return ''
  const { locale } = useI18n()
  const localeTag = locale.value === 'en' ? 'en-US' : 'ru-RU'
  return name.charAt(0).toLocaleUpperCase(localeTag) + name.slice(1).toLocaleLowerCase(localeTag)
}

export function capitalizeFirst(text: string): string {
  if (!text) return ''
  const { locale } = useI18n()
  const localeTag = locale.value === 'en' ? 'en-US' : 'ru-RU'
  return text.charAt(0).toLocaleUpperCase(localeTag) + text.slice(1)
}
