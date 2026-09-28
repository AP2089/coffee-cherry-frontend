<script setup lang="ts">
interface IProps {
  lineTotal: number
  name?: string
  label?: string
  meta?: string
}

defineProps<IProps>()
</script>

<template>
  <div class="flex justify-between gap-4 text-sm">
    <div class="min-w-0">
      <p v-if="name" class="font-display text-foreground">{{ formatCoffeeName(name) }}</p>
      <span v-else-if="label" class="text-foreground/70">{{ label }}</span>
      <p v-if="meta" class="mt-1 text-sm text-muted-foreground">{{ meta }}</p>
    </div>
    <p class="font-serif shrink-0" :class="name ? 'text-xl' : ''">
      {{ formatPrice(lineTotal) }}
    </p>
  </div>
</template>
