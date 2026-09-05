<template>
  <NuxtLink
    :to="localePath(`/coffee/${coffee.slug}`)"
    class="coffee-card group absolute inset-0 overflow-hidden bg-ink-mute"
  >
    <img
      :src="coffee.image"
      :alt="formatCoffeeName(coffee.name)"
      class="size-full object-cover object-center"
      loading="lazy"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Coffee } from '~/types'

defineProps<{ coffee: Coffee }>()
const localePath = useLocalePath()
</script>

<style scoped lang="scss">
.coffee-card img {
  display: block;
  min-height: 100%;
  min-width: 100%;
}
</style>
