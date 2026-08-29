<template>
  <div>
    <UiSkeletonLoader v-if="pending" />

    <UiErrorState
      v-else-if="error || !coffee"
      :title="$t('coffee.not.found.title')"
      :description="$t('coffee.not.found.description')"
      action-to="/#collection"
      :action-label="$t('coffee.to.collection')"
    />

    <template v-else>
      <CoffeeHero :coffee="coffee" />

      <section class="mx-auto max-w-content px-5 md:px-8 lg:px-12 pt-20 md:pt-28 pb-10 md:pb-14">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div class="lg:col-span-7 space-y-12">
            <CoffeeFlavorNotes :notes="coffee.flavorNotes" :accent="theme.accent" />
            <CoffeeDetails :coffee="coffee" />
          </div>

          <div class="lg:col-span-5">
            <div
              class="lg:sticky lg:top-28 border border-bone/10 p-6 md:p-8"
              :style="{ boxShadow: `0 0 80px ${theme.glow}` }"
            >
              <p class="font-display text-3xl tracking-tight">
                {{ formatCoffeeName(coffee.name) }}
              </p>
              <p class="mt-2 text-bone/50">{{ coffee.country }}</p>
              <p class="mt-6 font-serif text-3xl">{{ formatPrice(displayPrice) }}</p>

              <div class="mt-8">
                <p class="text-[10px] tracking-[0.18em] uppercase text-bone/40 mb-3">
                  {{ $t('coffee.weight') }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="w in coffee.weights"
                    :key="w"
                    type="button"
                    class="px-4 py-2 border text-sm transition-all duration-300"
                    :class="
                      weight === w
                        ? 'border-bone text-bone'
                        : 'border-bone/15 text-bone/50 hover:border-bone/40'
                    "
                    @click="weight = w"
                  >
                    {{ $t('common.grams', { weight: w }) }}
                  </button>
                </div>
              </div>

              <div class="mt-6">
                <p class="text-[10px] tracking-[0.18em] uppercase text-bone/40 mb-3">
                  {{ $t('coffee.quantity') }}
                </p>
                <div class="inline-flex items-center border border-bone/15">
                  <button
                    type="button"
                    class="px-4 py-2 text-bone/60 hover:text-bone"
                    @click="qty = Math.max(1, qty - 1)"
                  >
                    −
                  </button>
                  <span class="px-4 min-w-10 text-center">{{ qty }}</span>
                  <button
                    type="button"
                    class="px-4 py-2 text-bone/60 hover:text-bone"
                    @click="qty += 1"
                  >
                    +
                  </button>
                </div>
              </div>

              <p v-if="coffee.stock < 1" class="mt-6 text-sm text-ember">
                {{ $t('coffee.out.of.stock') }}
              </p>
              <p v-else-if="qty > coffee.stock" class="mt-6 text-sm text-ember">
                {{ $t('coffee.stock.limited', { count: coffee.stock }) }}
              </p>

              <div class="mt-8">
                <CoffeeAddToCartButton
                  :disabled="coffee.stock < 1 || qty > coffee.stock"
                  @add="addToCart"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { CoffeeWeight } from '~/types'
import { coffeeService } from '~/services/coffee.service'

const route = useRoute()
const cart = useCartStore()
const slug = computed(() => String(route.params.slug || ''))

const {
  data: coffee,
  pending,
  error,
} = await useAsyncData(`coffee-${slug.value}`, () => coffeeService.getBySlug(slug.value), {
  watch: [slug],
})

const theme = computed(() => useCoffeeTheme(slug.value))
const weight = ref<CoffeeWeight>(250)
const qty = ref(1)

watch(
  coffee,
  (value) => {
    if (value?.weights?.length) weight.value = value.weights[0]
  },
  { immediate: true },
)

const WEIGHT_MULTIPLIER: Record<CoffeeWeight, number> = {
  250: 1,
  500: 1.9,
  1000: 3.6,
}

const displayPrice = computed(() => {
  if (!coffee.value) return 0
  return Math.round(coffee.value.price * WEIGHT_MULTIPLIER[weight.value] * qty.value)
})

useSeoPage({
  title: coffee.value?.name || slug.value,
  description:
    coffee.value?.description || 'Премиальный особенный кофе с ограниченным ассортиментом.',
  path: `/coffee/${slug.value}`,
  image: coffee.value?.image,
})

function addToCart() {
  if (!coffee.value) return
  cart.addItem(coffee.value, weight.value, qty.value)
}
</script>
