import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useCartStore } from '~/stores/cart'
import type { Coffee } from '~/types'

const coffee = (overrides: Partial<Coffee> = {}): Coffee =>
  ({
    _id: '1',
    name: 'Bloom',
    slug: 'bloom',
    country: 'Ethiopia',
    region: 'Yirgacheffe',
    variety: 'Heirloom',
    process: 'Washed',
    altitude: '1800',
    description: 'desc',
    story: 'story',
    flavorNotes: ['floral'],
    price: 1000,
    weights: [250, 500, 1000],
    image: '/images/bloom.jpg',
    gallery: [],
    stock: 10,
    ...overrides,
  }) as Coffee

describe('cart store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('hydrates from localStorage once', () => {
    localStorage.setItem(
      'coffee-cherry-cart',
      JSON.stringify([
        {
          slug: 'bloom',
          name: 'Bloom',
          weight: 250,
          quantity: 2,
          price: 1000,
          image: '/images/bloom.jpg',
          country: 'Ethiopia',
        },
      ]),
    )

    const store = useCartStore()
    store.hydrate()
    store.hydrate()

    expect(store.items).toHaveLength(1)
    expect(store.items[0].quantity).toBe(2)
    expect(store.hydrated).toBe(true)
  })

  it('adds item with weight-based price', () => {
    const store = useCartStore()
    store.addItem(coffee(), 500, 1)

    expect(store.items).toHaveLength(1)
    expect(store.items[0].price).toBe(1900)
    expect(store.items[0].weight).toBe(500)
    expect(store.getItemsCount).toBe(1)
    expect(store.getTotal).toBe(1900)
  })

  it('merges same slug and weight', () => {
    const store = useCartStore()
    store.addItem(coffee(), 250, 1)
    store.addItem(coffee(), 250, 2)

    expect(store.items).toHaveLength(1)
    expect(store.items[0].quantity).toBe(3)
    expect(store.getItemsCount).toBe(3)
    expect(store.getTotal).toBe(3000)
  })

  it('keeps separate lines for different weights', () => {
    const store = useCartStore()
    store.addItem(coffee(), 250, 1)
    store.addItem(coffee(), 500, 1)

    expect(store.items).toHaveLength(2)
    expect(store.getTotal).toBe(1000 + 1900)
  })

  it('updates quantity and removes when quantity is zero', () => {
    const store = useCartStore()
    store.addItem(coffee(), 250, 2)

    store.updateQuantity('bloom', 250, 5)
    expect(store.items[0].quantity).toBe(5)

    store.updateQuantity('bloom', 250, 0)
    expect(store.items).toHaveLength(0)
  })

  it('removes item by slug and weight', () => {
    const store = useCartStore()
    store.addItem(coffee(), 250, 1)
    store.addItem(coffee(), 500, 1)

    store.removeItem('bloom', 250)

    expect(store.items).toHaveLength(1)
    expect(store.items[0].weight).toBe(500)
  })

  it('clears cart', () => {
    const store = useCartStore()
    store.addItem(coffee(), 250, 1)
    store.clearCart()

    expect(store.items).toHaveLength(0)
    expect(store.getTotal).toBe(0)
  })

  it('persists to localStorage', () => {
    const store = useCartStore()
    store.addItem(coffee(), 250, 1)

    expect(localStorage.getItem('coffee-cherry-cart')).toContain('bloom')
  })

  it('normalizes missing image on add', () => {
    const store = useCartStore()
    store.addItem(coffee({ image: 'not-an-image' }), 250, 1)

    expect(store.items[0].image).toBe('/images/bloom.jpg')
  })
})
