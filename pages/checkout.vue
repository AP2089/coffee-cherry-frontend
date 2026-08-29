<template>
  <div class="pt-28 md:pt-32 pb-12">
    <div class="mx-auto max-w-content px-5 md:px-8 lg:px-12">
      <p class="text-[10px] tracking-[0.24em] uppercase text-bone/40">{{ $t('checkout.label') }}</p>
      <h1 class="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
        {{ $t('checkout.title') }}
      </h1>

      <div v-if="!cart.items.length" class="mt-20">
        <UiErrorState
          :title="$t('checkout.empty.title')"
          :description="$t('checkout.empty.description')"
          action-to="/#collection"
          :action-label="$t('coffee.to.collection')"
        />
      </div>

      <div v-else class="mt-14 grid lg:grid-cols-12 gap-12">
        <div class="lg:col-span-7">
          <CheckoutForm :loading="loading" @submit="submitOrder" />
          <p v-if="errorMessage" class="mt-6 text-sm text-ember">{{ errorMessage }}</p>
        </div>
        <div class="lg:col-span-4 lg:col-start-9">
          <div class="border border-bone/10 p-6 md:p-8 space-y-5">
            <p class="text-xs tracking-[0.18em] uppercase text-bone/40">
              {{ $t('checkout.order') }}
            </p>
            <div
              v-for="item in cart.items"
              :key="`${item.slug}-${item.weight}`"
              class="flex justify-between gap-4 text-sm"
            >
              <span class="text-bone/70">
                {{
                  $t('checkout.item.line', {
                    name: formatCoffeeName(item.name),
                    weight: item.weight,
                    quantity: item.quantity,
                  })
                }}
              </span>
              <span class="font-serif">{{ formatPrice(item.price * item.quantity) }}</span>
            </div>
            <div class="h-px bg-bone/10" />
            <div class="flex justify-between items-baseline">
              <span class="text-xs tracking-[0.18em] uppercase text-bone/45">{{
                $t('checkout.total')
              }}</span>
              <span class="font-serif text-3xl">{{ formatPrice(cart.getTotal) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Customer } from '~/types'
import { orderService } from '~/services/order.service'

const cart = useCartStore()
const { t } = useI18n()
const localePath = useLocalePath()
const loading = ref(false)
const errorMessage = ref('')

useSeoPage({
  title: t('checkout.seo.title'),
  description: t('checkout.seo.description'),
  path: '/checkout',
})

onMounted(() => cart.hydrate())

async function submitOrder(customer: Customer) {
  loading.value = true
  errorMessage.value = ''

  try {
    const order = await orderService.create({
      customer,
      items: cart.items.map((item) => ({
        slug: item.slug,
        weight: item.weight,
        quantity: item.quantity,
      })),
    })

    cart.clearCart()
    await navigateTo(localePath(`/order-success?id=${order._id}`))
  } catch (err: unknown) {
    const message =
      err && typeof err === 'object' && 'data' in err
        ? String((err as { data?: { message?: string } }).data?.message || '')
        : ''
    errorMessage.value = message || t('checkout.error.fallback')
  } finally {
    loading.value = false
  }
}
</script>
