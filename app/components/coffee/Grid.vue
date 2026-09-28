<script setup lang="ts">
import type { Coffee } from '~/types'

interface IProps {
  coffees: Coffee[]
}

defineProps<IProps>()

const { t } = useI18n()
const localePath = useLocalePath()
const { observe } = useReveal()

function accentOf(slug: Coffee['slug']) {
  return useCoffeeTheme(slug).accent
}

function moodOf(slug: Coffee['slug']) {
  return t(`moods.${slug}` as 'moods.bloom')
}

function setReveal(el: Element | ComponentPublicInstance | null) {
  if (!el) return
  const node = el instanceof Element ? el : (el.$el as Element)
  observe(node)
}
</script>

<template>
  <div class="grid gap-16 md:gap-20 lg:gap-28">
    <article v-for="(coffee, index) in coffees" :key="coffee._id" class="coffee-grid__item">
      <div
        class="coffee-grid__row grid lg:grid-cols-12 gap-8 lg:gap-12"
        :class="index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''"
      >
        <div
          :ref="(el) => setReveal(el)"
          class="coffee-grid__media relative w-full lg:col-span-7 reveal reveal-media h-[calc(100dvh-4rem)] md:h-[calc(100dvh-5rem)]"
          :class="`reveal-delay-${(index % 4) + 1}`"
        >
          <CoffeeCard :coffee="coffee" />
        </div>

        <div
          :ref="(el) => setReveal(el)"
          class="coffee-grid__copy coffee-grid__copy-sticky lg:col-span-5 lg:px-4 reveal reveal-copy"
          :class="`reveal-delay-${(index % 4) + 1}`"
        >
          <p class="font-serif text-5xl md:text-6xl text-bone/10 leading-none select-none">
            0{{ index + 1 }}
          </p>
          <p class="mt-6 text-[10px] tracking-[0.22em] uppercase text-bone/60">
            {{ coffee.country }}
          </p>
          <h3 class="font-display text-3xl md:text-4xl mt-2 tracking-tight">
            {{ formatCoffeeName(coffee.name) }}
          </h3>
          <p class="mt-6 text-bone/55 leading-relaxed">
            {{ capitalizeFirst(coffee.description) }}
          </p>
          <p
            class="mt-3 text-[10px] tracking-[0.18em] uppercase"
            :style="{ color: accentOf(coffee.slug) }"
          >
            {{ moodOf(coffee.slug) }}
          </p>
          <p class="mt-6 font-serif text-2xl md:text-3xl">{{ formatPrice(coffee.price) }}</p>
          <Button variant="magnetic" class="mt-8 px-6 py-3" as-child>
            <NuxtLink :to="localePath(`/coffee/${coffee.slug}`)">
              {{ $t('coffee.open') }}
            </NuxtLink>
          </Button>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.coffee-grid__row {
  @media (min-width: 1024px) {
    align-items: start;
  }
}

.coffee-grid__copy-sticky {
  @media (min-width: 1024px) {
    position: sticky;
    top: calc(5rem + 1.5rem);
  }
}
</style>
