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
