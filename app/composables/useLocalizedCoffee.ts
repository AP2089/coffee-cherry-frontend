import type { Coffee, CartItem } from '~/types'

export function localizeCoffee(coffee: Coffee): Coffee {
  return coffee
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
