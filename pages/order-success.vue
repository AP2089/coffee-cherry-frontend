<template>
  <div class="pt-28 md:pt-32 pb-12">
    <div class="mx-auto max-w-content px-5 md:px-8 lg:px-12">
      <UiSkeletonLoader v-if="pending" />

      <UiErrorState
        v-else-if="error || !order"
        :title="$t('order.success.not.found.title')"
        :description="$t('order.success.not.found.description')"
        action-to="/#collection"
        :action-label="$t('coffee.to.collection')"
      />

      <template v-else>
        <p class="text-[10px] tracking-[0.24em] uppercase text-bronze">
          {{ $t('order.success.label') }}
        </p>
        <h1 class="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
          {{ $t('order.success.title') }}
        </h1>
        <p class="mt-4 text-bone/55 max-w-xl leading-relaxed">
          {{ $t('order.success.lead') }}
        </p>

        <div class="mt-14 grid lg:grid-cols-12 gap-10">
          <div class="lg:col-span-7 border border-bone/10 p-6 md:p-8 space-y-5">
            <div>
              <p class="text-[10px] tracking-[0.18em] uppercase text-bone/40">
                {{ $t('order.success.order.number') }}
              </p>
              <p class="mt-2 font-mono text-sm md:text-base break-all">{{ order._id }}</p>
            </div>
            <div class="h-px bg-bone/10" />
            <div
              v-for="item in order.items"
              :key="`${item.slug}-${item.weight}`"
              class="flex justify-between gap-4"
            >
              <div>
                <p class="font-display">{{ formatCoffeeName(item.name) }}</p>
                <p class="text-sm text-bone/45 mt-1">
                  {{
                    $t('order.success.item.meta', { weight: item.weight, quantity: item.quantity })
                  }}
                </p>
              </div>
              <p class="font-serif text-xl">{{ formatPrice(item.price * item.quantity) }}</p>
            </div>
            <div class="h-px bg-bone/10" />
            <div class="flex justify-between items-baseline">
              <span class="text-xs tracking-[0.18em] uppercase text-bone/45">{{
                $t('order.success.total')
              }}</span>
              <span class="font-serif text-3xl">{{ formatPrice(order.totalPrice) }}</span>
            </div>
          </div>

          <div class="lg:col-span-4 lg:col-start-9 border border-bone/10 p-6 md:p-8 space-y-4">
            <p class="text-[10px] tracking-[0.18em] uppercase text-bone/40">
              {{ $t('order.success.delivery') }}
            </p>
            <p class="text-bone/80">{{ order.customer.name }}</p>
            <p class="text-bone/55 text-sm leading-relaxed">
              {{ order.customer.phone }}<br />
              {{ order.customer.email }}<br />
              {{ order.customer.city }}, {{ order.customer.address }}
            </p>
            <p
              v-if="order.customer.comment"
              class="text-sm text-bone/45 pt-2 border-t border-bone/10"
            >
              {{ order.customer.comment }}
            </p>
            <p class="text-xs tracking-[0.16em] uppercase text-bone/35 pt-4">
              {{ $t('order.success.status', { status: statusLabel }) }}
            </p>
          </div>
        </div>

        <NuxtLink :to="localePath('/')" class="magnetic-btn inline-flex mt-12 px-8 py-4 text-xs">
          {{ $t('order.success.back.home') }}
        </NuxtLink>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { orderService } from '~/services/order.service'
import type { OrderStatus } from '~/types'

const route = useRoute()
const { t, te } = useI18n()
const localePath = useLocalePath()
const id = computed(() => String(route.query.id || ''))

const {
  data: order,
  pending,
  error,
} = await useAsyncData(`order-${id.value}`, async () => {
  if (!id.value) throw createError({ statusCode: 404, statusMessage: 'Order not found' })
  return orderService.getById(id.value)
})

const statusLabel = computed(() => {
  const status = order.value?.status as OrderStatus | undefined
  if (!status) return ''
  const key = `order.status.${status}`
  return te(key) ? t(key) : status
})

useSeoPage({
  title: t('order.success.seo.title'),
  description: t('order.success.seo.description'),
  path: '/order-success',
})
</script>
