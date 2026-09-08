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
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: center;
}
</style>
