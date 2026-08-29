<template>
  <NuxtLink
    :to="`/coffee/${coffee.slug}`"
    class="coffee-card group relative mx-auto block w-full max-w-full overflow-hidden bg-ink-mute aspect-[3/4] max-h-[calc(100dvh-4rem)] md:max-h-[calc(100dvh-5rem)]"
  >
    <img
      :src="coffee.image"
      :alt="coffee.name"
      class="absolute inset-0 w-full h-full object-cover"
      loading="lazy"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Coffee } from '~/types'

defineProps<{ coffee: Coffee }>()
</script>
