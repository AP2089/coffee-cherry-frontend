<template>
  <div class="pt-28 md:pt-32 pb-12">
    <div class="mx-auto max-w-content px-5 md:px-8 lg:px-12">
      <AppSkeletonLoader v-if="pending" />

      <AppErrorState
        v-else-if="error || !order"
        :title="$t('order.success.not.found.title')"
        :description="$t('order.success.not.found.description')"
        action-to="/#collection"
        :action-label="$t('coffee.to.collection')"
      />

      <template v-else>
        <p class="text-[10px] tracking-[0.24em] uppercase text-primary">
          {{ $t('order.success.label') }}
        </p>
        <h1 class="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
          {{ $t('order.success.title') }}
        </h1>
        <p class="mt-4 text-muted-foreground max-w-xl leading-relaxed">
          {{ $t('order.success.lead') }}
        </p>

        <div class="mt-14 grid lg:grid-cols-12 gap-10">
          <Card class="lg:col-span-7 border-border">
            <CardContent class="space-y-5 p-6 md:p-8">
              <div>
                <p class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                  {{ $t('order.success.order.number') }}
                </p>
                <p class="mt-2 font-mono text-sm md:text-base break-all">{{ order._id }}</p>
              </div>
              <Separator />
              <div
                v-for="item in order.items"
                :key="`${item.slug}-${item.weight}`"
                class="flex justify-between gap-4"
              >
                <div>
                  <p class="font-display">{{ formatCoffeeName(item.name) }}</p>
                  <p class="text-sm text-muted-foreground mt-1">
                    {{
                      $t('order.success.item.meta', {
                        weight: item.weight,
                        quantity: item.quantity,
                      })
                    }}
                  </p>
                </div>
                <p class="font-serif text-xl">{{ formatPrice(item.price * item.quantity) }}</p>
              </div>
              <Separator />
              <div class="flex justify-between items-baseline">
                <span class="text-xs tracking-[0.18em] uppercase text-muted-foreground">{{
                  $t('order.success.total')
                }}</span>
                <span class="font-serif text-3xl">{{ formatPrice(order.totalPrice) }}</span>
              </div>
            </CardContent>
          </Card>

          <Card class="lg:col-span-4 lg:col-start-9 border-border">
            <CardContent class="space-y-4 p-6 md:p-8">
              <p class="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                {{ $t('order.success.delivery') }}
              </p>
              <p class="text-foreground/80">{{ order.customer.name }}</p>
              <p class="text-muted-foreground text-sm leading-relaxed">
                {{ order.customer.phone }}<br />
                {{ order.customer.email }}<br />
                {{ order.customer.city }}, {{ order.customer.address }}
              </p>
              <p
                v-if="order.customer.comment"
                class="text-sm text-muted-foreground pt-2 border-t border-border"
              >
                {{ order.customer.comment }}
              </p>
              <p class="text-xs tracking-[0.16em] uppercase text-muted-foreground/70 pt-4">
                {{ $t('order.success.status', { status: statusLabel }) }}
              </p>
            </CardContent>
          </Card>
        </div>

        <Button variant="magnetic" class="mt-12 px-8 py-4" as-child>
          <NuxtLink :to="localePath('/')">
            {{ $t('order.success.back.home') }}
          </NuxtLink>
        </Button>
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
