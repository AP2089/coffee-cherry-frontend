<script setup lang="ts">
import type { CoffeeWeight } from '~/types'
import { apiGetCoffee } from '~/api/coffees'

const route = useRoute()
const cart = useCartStore()
const { t, locale } = useI18n()
const slug = computed(() => String(route.params.slug || ''))
const localeQuery = computed(() => (locale.value === 'ru' ? {} : { locale: locale.value }))

const {
  data: coffeeResponse,
  pending,
  error,
} = await apiGetCoffee(slug, {
  watch: [slug, locale],
  query: localeQuery,
})

const coffee = computed(() => coffeeResponse.value?.data)
const localizedCoffee = useLocalizedCoffee(coffee)
const theme = computed(() => useCoffeeTheme(slug.value))

useSeoPage({
  title: computed(() => localizedCoffee.value?.name || slug.value),
  description: computed(
    () => localizedCoffee.value?.description || t('coffee.seo.fallbackDescription'),
  ),
  path: computed(() => `/coffee/${slug.value}`),
  image: computed(() => coffee.value?.image),
  imageAlt: computed(() => localizedCoffee.value?.name || 'coffee cherry'),
})

function addToCart(weight: CoffeeWeight, quantity: number) {
  if (!coffee.value) return
  cart.addItem(coffee.value, weight, quantity)
}
</script>

<template>
  <div>
    <AppSkeletonLoader v-if="pending" />

    <AppErrorState
      v-else-if="error || !localizedCoffee"
      :title="$t('coffee.not.found.title')"
      :description="$t('coffee.not.found.description')"
      action-to="/#collection"
      :action-label="$t('coffee.to.collection')"
    />

    <template v-else>
      <CoffeeHero :coffee="localizedCoffee" />

      <section class="mx-auto max-w-content px-5 md:px-8 lg:px-12 pt-20 md:pt-28 pb-10 md:pb-14">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div class="lg:col-span-7 space-y-12">
            <CoffeeFlavorNotes :notes="localizedCoffee.flavorNotes" :accent="theme.accent" />
            <CoffeeDetails :coffee="localizedCoffee" />
          </div>

          <div class="lg:col-span-5">
            <CoffeeBuyBox :coffee="localizedCoffee" @add="addToCart" />
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
