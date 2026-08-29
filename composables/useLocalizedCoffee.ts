import type { Coffee, CartItem } from '~/types'

function getFlavorNotes(prefix: string, fallback: string[]): string[] {
  const { t, te } = useI18n()
  const notes: string[] = []

  for (let i = 0; i < fallback.length; i++) {
    const key = `${prefix}.flavorNotes.${i}`
    if (!te(key)) break
    notes.push(t(key))
  }

  return notes.length ? notes : fallback
}

export function localizeCoffee(coffee: Coffee): Coffee {
  const { locale, t, te } = useI18n()

  if (locale.value === 'ru') {
    return coffee
  }

  const prefix = `coffees.${coffee.slug}`

  if (!te(`${prefix}.description`)) {
    return coffee
  }

  return {
    ...coffee,
    country: t(`${prefix}.country`),
    region: t(`${prefix}.region`),
    variety: te(`${prefix}.variety`) ? t(`${prefix}.variety`) : coffee.variety,
    process: t(`${prefix}.process`),
    altitude: te(`${prefix}.altitude`) ? t(`${prefix}.altitude`) : coffee.altitude,
    description: t(`${prefix}.description`),
    story: t(`${prefix}.story`),
    flavorNotes: getFlavorNotes(prefix, coffee.flavorNotes),
  }
}

export function localizeCartItem(item: CartItem): CartItem {
  const { locale, t, te } = useI18n()

  if (locale.value === 'ru') {
    return item
  }

  const prefix = `coffees.${item.slug}`

  return {
    ...item,
    country: te(`${prefix}.country`) ? t(`${prefix}.country`) : item.country,
  }
}

export function useLocalizedCoffee(coffee: MaybeRefOrGetter<Coffee | null | undefined>) {
  return computed(() => {
    const value = toValue(coffee)
    if (!value) return null
    return localizeCoffee(value)
  })
}
