import { useLocalStorage, type RemovableRef } from '@vueuse/core'
import type { CartItem } from '~/types'

export const CART_STORAGE_KEY = 'coffee-cherry-cart'

export function normalizeCartImage(image: string | undefined, slug: string): string {
  if (image && /\.(jpe?g|png|webp)$/i.test(image)) {
    return image
  }
  return `/images/${slug}.jpg`
}

const cartItemsSerializer = {
  read: (raw: string): CartItem[] => {
    try {
      const parsed = JSON.parse(raw) as unknown
      if (!Array.isArray(parsed)) return []

      return (parsed as CartItem[]).map((item) => ({
        ...item,
        image: normalizeCartImage(item.image, item.slug),
      }))
    } catch {
      return []
    }
  },
  write: (value: CartItem[]) => JSON.stringify(value),
}

export function useCartItemsStorage(): RemovableRef<CartItem[]> {
  return useLocalStorage<CartItem[]>(CART_STORAGE_KEY, [], {
    serializer: cartItemsSerializer,
    deep: true,
    flush: 'sync',
  })
}
