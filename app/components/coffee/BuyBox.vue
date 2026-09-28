<script setup lang="ts">
import type { Coffee, CoffeeWeight } from '~/types'
import { calcCoffeePrice } from '~/utils/coffee-pricing'

interface IProps {
  coffee: Coffee
}

interface IEmits {
  add: [weight: CoffeeWeight, quantity: number]
}

const props = defineProps<IProps>()
const emit = defineEmits<IEmits>()

const theme = computed(() => useCoffeeTheme(props.coffee.slug))
const weight = ref<CoffeeWeight>(250)
const qty = ref(1)

const weightModel = computed({
  get: () => String(weight.value),
  set: (value: string) => {
    weight.value = Number(value) as CoffeeWeight
  },
})

const displayPrice = computed(() => calcCoffeePrice(props.coffee.price, weight.value, qty.value))

watch(
  () => props.coffee.weights,
  (weights) => {
    if (weights?.length) weight.value = weights[0]
  },
  { immediate: true },
)

function addToCart() {
  emit('add', weight.value, qty.value)
}
</script>

<template>
  <Card class="lg:sticky lg:top-28 border-border" :style="{ boxShadow: `0 0 80px ${theme.glow}` }">
    <CardContent class="space-y-6 p-6 md:p-8">
      <div>
        <p class="font-display text-3xl tracking-tight">
          {{ formatCoffeeName(coffee.name) }}
        </p>
        <p class="mt-2 text-muted-foreground">{{ coffee.country }}</p>
        <p class="mt-6 font-serif text-3xl">{{ formatPrice(displayPrice) }}</p>
      </div>

      <div>
        <p class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground mb-3">
          {{ $t('coffee.weight') }}
        </p>
        <ToggleGroup v-model="weightModel" type="single" class="flex flex-wrap justify-start gap-2">
          <ToggleGroupItem v-for="w in coffee.weights" :key="w" :value="String(w)" variant="weight">
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

      <Alert v-if="coffee.stock < 1" variant="destructive">
        <AlertDescription>{{ $t('coffee.out.of.stock') }}</AlertDescription>
      </Alert>
      <Alert v-else-if="qty > coffee.stock" variant="destructive">
        <AlertDescription>
          {{ $t('coffee.stock.limited', { count: coffee.stock }) }}
        </AlertDescription>
      </Alert>

      <CoffeeAddToCartButton :disabled="coffee.stock < 1 || qty > coffee.stock" @add="addToCart" />
    </CardContent>
  </Card>
</template>
