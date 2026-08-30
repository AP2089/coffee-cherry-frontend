<template>
  <div class="flex gap-4 group">
    <div class="relative w-20 h-24 shrink-0 overflow-hidden bg-ink-mute">
      <img
        :src="imageSrc"
        :alt="item.name"
        class="absolute inset-0 size-full object-cover object-center"
        loading="lazy"
      />
    </div>
    <div class="flex-1 min-w-0">
      <div class="flex justify-between gap-3">
        <div>
          <p class="font-display tracking-tight">{{ formatCoffeeName(item.name) }}</p>
          <p class="text-xs text-muted-foreground mt-1">
            {{ $t('cart.item.meta', { country: displayItem.country, weight: item.weight }) }}
          </p>
        </div>
        <p class="font-serif text-lg shrink-0">{{ formatPrice(item.price * item.quantity) }}</p>
      </div>

      <div class="mt-3 flex items-center justify-between">
        <div class="inline-flex items-center border border-border">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            class="rounded-none px-3 py-1.5 text-muted-foreground hover:text-foreground"
            :aria-label="$t('cart.decrease')"
            @click="cart.updateQuantity(item.slug, item.weight, item.quantity - 1)"
          >
            −
          </Button>
          <span class="px-2 text-sm min-w-8 text-center">{{ item.quantity }}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            class="rounded-none px-3 py-1.5 text-muted-foreground hover:text-foreground"
            :aria-label="$t('cart.increase')"
            @click="cart.updateQuantity(item.slug, item.weight, item.quantity + 1)"
          >
            +
          </Button>
        </div>
        <Button type="button" variant="ghost-text" @click="cart.removeItem(item.slug, item.weight)">
          {{ $t('cart.remove') }}
        </Button>
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
