<template>
  <div>
    <p class="text-[10px] tracking-[0.2em] uppercase text-bone/40 mb-5">
      {{ $t('coffee.flavor.notes') }}
    </p>
    <ul class="flex flex-wrap gap-3">
      <li
        v-for="(note, i) in notes"
        :key="note"
        class="flavor-note px-4 py-2 border text-sm tracking-wide"
        :style="{
          borderColor: `${accent}55`,
          color: accent,
          transitionDelay: `${i * 60}ms`,
        }"
      >
        {{ note }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  notes: string[]
  accent: string
}>()
</script>

<style scoped lang="scss">
@use '../../assets/scss/variables' as *;

.flavor-note {
  transition:
    transform 0.45s $ease-premium,
    background 0.45s $ease-premium,
    color 0.45s $ease-premium;

  &:hover {
    transform: translateY(-3px);
    background: rgba($bone, 0.06);
  }
}
</style>
