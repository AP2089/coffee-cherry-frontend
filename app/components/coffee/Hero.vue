<template>
  <section
    class="coffee-atmosphere relative min-h-[100svh] flex items-end overflow-hidden"
    :style="{ '--accent-glow': theme.glow }"
  >
    <div class="absolute inset-0">
      <img
        :src="coffee.image"
        :alt="coffee.name"
        class="coffee-hero__image absolute inset-0 size-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/30" />
      <div
        class="absolute inset-0 mix-blend-soft-light opacity-50"
        :style="{
          background: `radial-gradient(ellipse at 70% 20%, ${theme.accent}, transparent 50%)`,
        }"
      />
    </div>

    <div
      class="relative z-10 w-full mx-auto max-w-content px-5 md:px-8 lg:px-12 pb-16 md:pb-24 pt-32"
    >
      <p class="text-[10px] md:text-xs tracking-[0.28em] uppercase text-bone/55 reveal is-visible">
        {{ coffee.country }} · {{ coffee.region }}
      </p>
      <h1 class="font-display text-[18vw] md:text-[9rem] leading-[0.85] tracking-tight mt-4">
        <span class="text-reveal is-visible"
          ><span>{{ formatCoffeeName(coffee.name) }}</span></span
        >
      </h1>
      <p class="mt-6 max-w-xl text-bone/70 text-lg md:text-xl font-serif leading-relaxed">
        {{ capitalizeFirst(coffee.description) }}
      </p>
      <p class="mt-4 text-xs tracking-[0.2em] uppercase" :style="{ color: theme.accent }">
        {{ mood }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Coffee } from '~/types'

const props = defineProps<{ coffee: Coffee }>()
const { t } = useI18n()
const theme = computed(() => useCoffeeTheme(props.coffee.slug))
const mood = computed(() => t(`moods.${props.coffee.slug}` as 'moods.bloom'))
</script>

<style scoped lang="scss">
.coffee-hero__image {
  max-width: none;
  height: 100%;
  width: 100%;
}
</style>
