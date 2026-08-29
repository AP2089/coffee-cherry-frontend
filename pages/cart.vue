<template>
  <div class="pt-28 md:pt-32 pb-12">
    <div class="mx-auto max-w-content px-5 md:px-8 lg:px-12">
      <p class="text-[10px] tracking-[0.24em] uppercase text-bone/40">{{ $t('cart.label') }}</p>
      <h1 class="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
        {{ $t('cart.title') }}
      </h1>

      <div v-if="!cart.items.length" class="mt-20">
        <UiErrorState
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
          <div class="border border-bone/10 p-6 md:p-8 sticky top-28">
            <div class="flex justify-between items-baseline">
              <span class="text-xs tracking-[0.18em] uppercase text-bone/45">{{
                $t('cart.total')
              }}</span>
              <span class="font-serif text-3xl">{{ formatPrice(cart.getTotal) }}</span>
            </div>
            <p class="mt-3 text-sm text-bone/45">
              {{ $t('cart.items.count', { count: cart.getItemsCount }) }}
            </p>
            <NuxtLink
              to="/checkout"
              class="magnetic-btn magnetic-btn--filled w-full mt-8 px-6 py-4 text-xs inline-flex justify-center"
            >
              {{ $t('cart.checkout') }}
            </NuxtLink>
            <button
              type="button"
              class="mt-4 w-full text-xs tracking-[0.16em] uppercase text-bone/40 hover:text-bone transition-colors"
              @click="cart.clearCart()"
            >
              {{ $t('cart.clear') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const cart = useCartStore()
const { t } = useI18n()

useSeoPage({
  title: t('cart.seo.title'),
  description: t('cart.seo.description'),
  path: '/cart',
})

onMounted(() => cart.hydrate())
</script>
