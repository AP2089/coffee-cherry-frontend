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
            <Card
              class="lg:sticky lg:top-28 border-border"
              :style="{ boxShadow: `0 0 80px ${theme.glow}` }"
            >
              <CardContent class="space-y-6 p-6 md:p-8">
                <div>
                  <p class="font-display text-3xl tracking-tight">
                    {{ formatCoffeeName(localizedCoffee.name) }}
                  </p>
                  <p class="mt-2 text-muted-foreground">{{ localizedCoffee.country }}</p>
                  <p class="mt-6 font-serif text-3xl">{{ formatPrice(displayPrice) }}</p>
                </div>

                <div>
                  <p class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-3">
                    {{ $t('coffee.weight') }}
                  </p>
                  <ToggleGroup
                    v-model="weightModel"
                    type="single"
                    class="flex flex-wrap justify-start gap-2"
                  >
                    <ToggleGroupItem
                      v-for="w in localizedCoffee.weights"
                      :key="w"
                      :value="String(w)"
                      variant="weight"
                    >
                      {{ $t('common.grams', { weight: w }) }}
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <div>
                  <p class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-3">
                    {{ $t('coffee.quantity') }}
                  </p>
                  <div class="inline-flex items-center border border-border">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      class="cursor-pointer rounded-none px-4 py-2 text-muted-foreground hover:text-foreground"
                      @click="qty = Math.max(1, qty - 1)"
                    >
                      −
                    </Button>
                    <span class="px-4 min-w-10 text-center">{{ qty }}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      class="cursor-pointer rounded-none px-4 py-2 text-muted-foreground hover:text-foreground"
                      @click="qty += 1"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Alert v-if="localizedCoffee.stock < 1" variant="destructive">
                  <AlertDescription>{{ $t('coffee.out.of.stock') }}</AlertDescription>
                </Alert>
                <Alert v-else-if="qty > localizedCoffee.stock" variant="destructive">
                  <AlertDescription>
                    {{ $t('coffee.stock.limited', { count: localizedCoffee.stock }) }}
                  </AlertDescription>
                </Alert>

                <CoffeeAddToCartButton
                  :disabled="localizedCoffee.stock < 1 || qty > localizedCoffee.stock"
                  @add="addToCart"
                />
              </CardContent>
            </Card>
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
const { t } = useI18n()
const slug = computed(() => String(route.params.slug || ''))

const {
  data: coffee,
  pending,
  error,
} = await useAsyncData(`coffee-${slug.value}`, () => coffeeService.getBySlug(slug.value), {
  watch: [slug],
})

const localizedCoffee = useLocalizedCoffee(coffee)
const theme = computed(() => useCoffeeTheme(slug.value))
const weight = ref<CoffeeWeight>(250)
const qty = ref(1)

const weightModel = computed({
  get: () => String(weight.value),
  set: (value: string) => {
    weight.value = Number(value) as CoffeeWeight
  },
})

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
  title: computed(() => localizedCoffee.value?.name || slug.value),
  description: computed(
    () => localizedCoffee.value?.description || t('coffee.seo.fallbackDescription'),
  ),
  path: computed(() => `/coffee/${slug.value}`),
  image: computed(() => coffee.value?.image),
  imageAlt: computed(() => localizedCoffee.value?.name || 'coffee cherry'),
})

function addToCart() {
  if (!coffee.value) return
  cart.addItem(coffee.value, weight.value, qty.value)
}
</script>
