import { defineStore } from 'pinia'
import type { CartItem, Coffee, CoffeeWeight } from '~/types'

const STORAGE_KEY = 'coffee-cherry-cart'

const WEIGHT_MULTIPLIER: Record<CoffeeWeight, number> = {
  250: 1,
  500: 1.9,
  1000: 3.6,
}

function calcPrice(basePrice: number, weight: CoffeeWeight): number {
  return Math.round(basePrice * WEIGHT_MULTIPLIER[weight])
}

function normalizeImage(image: string | undefined, slug: string): string {
  if (image && /\.(jpe?g|png|webp)$/i.test(image)) {
    return image
  }
  return `/images/${slug}.jpg`
}

function loadCart(): CartItem[] {
  if (!import.meta.client) return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    if (!Array.isArray(parsed)) return []

    return parsed.map((item) => ({
      ...item,
      image: normalizeImage(item.image, item.slug),
    }))
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]): void {
  if (!import.meta.client) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    hydrated: false,
  }),

  getters: {
    getItemsCount: (state): number => state.items.reduce((sum, item) => sum + item.quantity, 0),

    getTotal: (state): number =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },

  actions: {
    hydrate() {
      if (this.hydrated) return
      this.items = loadCart()
      this.hydrated = true
      this.persist()
    },

    persist() {
      saveCart(this.items)
    },

    addItem(coffee: Coffee, weight: CoffeeWeight, quantity = 1) {
      this.hydrate()
      const price = calcPrice(coffee.price, weight)
      const image = normalizeImage(coffee.image, coffee.slug)
      const existing = this.items.find((i) => i.slug === coffee.slug && i.weight === weight)

      if (existing) {
        existing.quantity += quantity
        existing.image = image
        existing.country = coffee.country
        existing.name = coffee.name
        existing.price = price
      } else {
        this.items.push({
          slug: coffee.slug,
          name: coffee.name,
          weight,
          quantity,
          price,
          image,
          country: coffee.country,
        })
      }

      this.persist()
    },

    removeItem(slug: string, weight: CoffeeWeight) {
      this.items = this.items.filter((i) => !(i.slug === slug && i.weight === weight))
      this.persist()
    },

    updateQuantity(slug: string, weight: CoffeeWeight, quantity: number) {
      const item = this.items.find((i) => i.slug === slug && i.weight === weight)
      if (!item) return

      if (quantity <= 0) {
        this.removeItem(slug, weight)
        return
      }

      item.quantity = quantity
      this.persist()
    },

    clearCart() {
      this.items = []
      this.persist()
    },
  },
})
