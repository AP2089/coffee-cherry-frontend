<template>
  <div class="pt-28 md:pt-32 pb-12">
    <div class="mx-auto max-w-content px-5 md:px-8 lg:px-12">
      <p class="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
        {{ $t('cart.label') }}
      </p>
      <h1 class="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
        {{ $t('cart.title') }}
      </h1>

      <div v-if="!cart.items.length" class="mt-20">
        <AppErrorState
          :title="$t('cart.empty.title')"
          :description="$t('cart.empty.description')"
          action-to="/#collection"
          :action-label="$t('coffee.to.collection')"
        />
      </div>

      <div v-else class="mt-14 grid lg:grid-cols-12 gap-12">
        <div class="lg:col-span-7 space-y-8">
          <CartItem v-for="item in cart.items" :key="`${item.slug}-${item.weight}`" :item="item" />
        </div>
        <div class="lg:col-span-4 lg:col-start-9">
          <Card class="sticky top-28 border-border">
            <CardContent class="space-y-5 p-6 md:p-8">
              <div class="flex justify-between items-baseline">
                <span class="text-xs tracking-[0.18em] uppercase text-muted-foreground">{{
                  $t('cart.total')
                }}</span>
                <span class="font-serif text-3xl">{{ formatPrice(cart.getTotal) }}</span>
              </div>
              <p class="text-sm text-muted-foreground">
                {{ $t('cart.items.count', { count: cart.getItemsCount }) }}
              </p>
              <Button variant="magnetic-filled" class="mt-3 w-full px-6 py-4" as-child>
                <NuxtLink :to="localePath('/checkout')">
                  {{ $t('cart.checkout') }}
                </NuxtLink>
              </Button>
              <Button variant="ghost-text" class="w-full" @click="cart.clearCart()">
                {{ $t('cart.clear') }}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cart = useCartStore()
const { t } = useI18n()
const localePath = useLocalePath()

useSeoPage({
  title: t('cart.seo.title'),
  description: t('cart.seo.description'),
  path: '/cart',
})

onMounted(() => cart.hydrate())
</script>
