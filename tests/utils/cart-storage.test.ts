import { beforeEach, describe, expect, it } from 'vitest'
import { CART_STORAGE_KEY, normalizeCartImage, useCartItemsStorage } from '~/utils/cart-storage'

describe('cart-storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('normalizes missing or invalid images', () => {
    expect(normalizeCartImage('/images/bloom.jpg', 'bloom')).toBe('/images/bloom.jpg')
    expect(normalizeCartImage('not-an-image', 'bloom')).toBe('/images/bloom.jpg')
    expect(normalizeCartImage(undefined, 'noir')).toBe('/images/noir.jpg')
  })

  it('persists cart items via useLocalStorage', () => {
    const items = useCartItemsStorage()
    items.value = [
      {
        slug: 'bloom',
        name: 'Bloom',
        weight: 250,
        quantity: 1,
        price: 1000,
        image: '/images/bloom.jpg',
        country: 'Ethiopia',
      },
    ]

    expect(localStorage.getItem(CART_STORAGE_KEY)).toContain('bloom')
  })

  it('normalizes images when reading from storage', () => {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([
        {
          slug: 'bloom',
          name: 'Bloom',
          weight: 250,
          quantity: 2,
          price: 1000,
          image: 'bad',
          country: 'Ethiopia',
        },
      ]),
    )

    const items = useCartItemsStorage()

    expect(items.value).toHaveLength(1)
    expect(items.value[0].image).toBe('/images/bloom.jpg')
    expect(items.value[0].quantity).toBe(2)
  })

  it('falls back to empty array for invalid storage data', () => {
    localStorage.setItem(CART_STORAGE_KEY, '{not-json')
    const items = useCartItemsStorage()
    expect(items.value).toEqual([])
  })
})
