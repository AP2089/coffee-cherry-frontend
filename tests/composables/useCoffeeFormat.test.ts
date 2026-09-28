import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

const locale = ref('ru')

vi.stubGlobal('useI18n', () => ({ locale }))

describe('useCoffeeFormat', () => {
  beforeEach(() => {
    locale.value = 'ru'
  })

  it('formats price in RUB for ru locale', async () => {
    const { formatPrice } = await import('~/composables/useCoffeeFormat')
    expect(formatPrice(1900)).toMatch(/1[\s\u00a0]?900/)
    expect(formatPrice(1900)).toMatch(/₽|RUB/)
  })

  it('formats coffee name with locale casing', async () => {
    const { formatCoffeeName } = await import('~/composables/useCoffeeFormat')
    expect(formatCoffeeName('bLOOM')).toBe('Bloom')
  })

  it('capitalizes first letter only', async () => {
    const { capitalizeFirst } = await import('~/composables/useCoffeeFormat')
    expect(capitalizeFirst('washed process')).toBe('Washed process')
    expect(capitalizeFirst('')).toBe('')
  })

  it('uses en locale for price formatting', async () => {
    locale.value = 'en'
    vi.resetModules()
    vi.stubGlobal('useI18n', () => ({ locale }))
    const { formatPrice } = await import('~/composables/useCoffeeFormat')
    expect(formatPrice(1900)).toMatch(/RUB|₽/)
  })
})
