<script setup lang="ts">
import type { Customer } from '~/types'
import { apiPostOrder } from '~/api/orders'

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
    const response = await apiPostOrder({
      customer,
      items: cart.items.map((item) => ({
        slug: item.slug,
        weight: item.weight,
        quantity: item.quantity,
      })),
    })

    cart.clearCart()
    await navigateTo(localePath(`/order-success?id=${response.data._id}`))
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

<template>
  <div class="pt-28 md:pt-32 pb-12">
    <div class="mx-auto max-w-content px-5 md:px-8 lg:px-12">
      <p class="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
        {{ $t('checkout.label') }}
      </p>
      <h1 class="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
        {{ $t('checkout.title') }}
      </h1>

      <div v-if="!cart.items.length" class="mt-20">
        <AppErrorState
          :title="$t('checkout.empty.title')"
          :description="$t('checkout.empty.description')"
          action-to="/#collection"
          :action-label="$t('coffee.to.collection')"
        />
      </div>

      <div v-else class="mt-14 grid lg:grid-cols-12 gap-12">
        <div class="lg:col-span-7">
          <CheckoutForm :loading="loading" @submit="submitOrder" />
          <Alert v-if="errorMessage" variant="destructive" class="mt-6">
            <AlertDescription>{{ errorMessage }}</AlertDescription>
          </Alert>
        </div>
        <div class="lg:col-span-4 lg:col-start-9">
          <Card class="border-border">
            <CardContent class="space-y-5 p-6 md:p-8">
              <p class="text-xs tracking-[0.18em] uppercase text-muted-foreground">
                {{ $t('checkout.order') }}
              </p>
              <CartLineRow
                v-for="item in cart.items"
                :key="`${item.slug}-${item.weight}`"
                :label="
                  $t('checkout.item.line', {
                    name: formatCoffeeName(item.name),
                    weight: item.weight,
                    quantity: item.quantity,
                  })
                "
                :line-total="item.price * item.quantity"
              />
              <Separator />
              <CartTotal :total="cart.getTotal" :label="$t('checkout.total')" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>
