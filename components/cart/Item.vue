<template>
  <div class="flex gap-4 group">
    <div class="w-20 h-24 overflow-hidden bg-ink-mute shrink-0">
      <img :src="imageSrc" :alt="item.name" class="w-full h-full object-cover" loading="lazy" />
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex justify-between gap-3">
        <div>
          <p class="font-display tracking-tight">{{ formatCoffeeName(item.name) }}</p>
          <p class="text-xs text-bone/45 mt-1">
            {{ $t('cart.item.meta', { country: displayItem.country, weight: item.weight }) }}
          </p>
        </div>
        <p class="font-serif text-lg shrink-0">{{ formatPrice(item.price * item.quantity) }}</p>
      </div>

      <div class="mt-3 flex items-center justify-between">
        <div class="inline-flex items-center border border-bone/15">
          <button
            type="button"
            class="px-3 py-1.5 text-bone/60 hover:text-bone"
            :aria-label="$t('cart.decrease')"
            @click="cart.updateQuantity(item.slug, item.weight, item.quantity - 1)"
          >
            −
          </button>
          <span class="px-2 text-sm min-w-8 text-center">{{ item.quantity }}</span>
          <button
            type="button"
            class="px-3 py-1.5 text-bone/60 hover:text-bone"
            :aria-label="$t('cart.increase')"
            @click="cart.updateQuantity(item.slug, item.weight, item.quantity + 1)"
          >
            +
          </button>
        </div>
        <button
          type="button"
          class="text-xs tracking-widest uppercase text-bone/35 hover:text-bone/80 transition-colors"
          @click="cart.removeItem(item.slug, item.weight)"
        >
          {{ $t('cart.remove') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '~/types'

const props = defineProps<{ item: CartItem }>()
const cart = useCartStore()

const displayItem = computed(() => localizeCartItem(props.item))

const imageSrc = computed(() => {
  if (props.item.image && /\.(jpe?g|png|webp)$/i.test(props.item.image)) {
    return props.item.image
  }
  return `/images/${props.item.slug}.jpg`
})
</script>
