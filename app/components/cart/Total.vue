<script setup lang="ts">
interface IProps {
  total: number
  label: string
}

defineProps<IProps>()
</script>

<template>
  <div class="flex justify-between items-baseline">
    <span class="text-xs tracking-[0.18em] uppercase text-muted-foreground">{{ label }}</span>
    <span class="font-serif text-3xl">{{ formatPrice(total) }}</span>
  </div>
</template>
