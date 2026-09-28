import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Coffee, CoffeeWeight } from '~/types'
import { calcCoffeePrice } from '~/utils/coffee-pricing'
import { normalizeCartImage, useCartItemsStorage } from '~/utils/cart-storage'

export const useCartStore = defineStore('cart', () => {
  const items = useCartItemsStorage()
  const hydrated = ref(false)

  const getItemsCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const getTotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  function hydrate() {
    if (hydrated.value) return
    hydrated.value = true
  }

  function addItem(coffee: Coffee, weight: CoffeeWeight, quantity = 1) {
    hydrate()
    const price = calcCoffeePrice(coffee.price, weight)
    const image = normalizeCartImage(coffee.image, coffee.slug)
    const existing = items.value.find((i) => i.slug === coffee.slug && i.weight === weight)

    if (existing) {
      existing.quantity += quantity
      existing.image = image
      existing.country = coffee.country
      existing.name = coffee.name
      existing.price = price
    } else {
      items.value.push({
        slug: coffee.slug,
        name: coffee.name,
        weight,
        quantity,
        price,
        image,
        country: coffee.country,
      })
    }
  }

  function removeItem(slug: string, weight: CoffeeWeight) {
    items.value = items.value.filter((i) => !(i.slug === slug && i.weight === weight))
  }

  function updateQuantity(slug: string, weight: CoffeeWeight, quantity: number) {
    const item = items.value.find((i) => i.slug === slug && i.weight === weight)
    if (!item) return

    if (quantity <= 0) {
      removeItem(slug, weight)
      return
    }

    item.quantity = quantity
  }

  function clearCart() {
    items.value = []
  }

  return {
    items,
    hydrated,
    getItemsCount,
    getTotal,
    hydrate,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
