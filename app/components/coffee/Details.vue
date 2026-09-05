<template>
  <div>
    <dl class="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8 max-w-3xl">
      <div v-for="row in rows" :key="row.label">
        <dt class="text-[10px] tracking-[0.2em] uppercase text-bone/40">{{ row.label }}</dt>
        <dd class="mt-2 font-serif text-lg md:text-xl text-bone/90">{{ row.value }}</dd>
      </div>
    </dl>

    <div class="mt-10 md:mt-12 max-w-3xl">
      <p class="text-[10px] tracking-[0.2em] uppercase text-bone/40 mb-3">
        {{ $t('coffee.story') }}
      </p>
      <p class="font-serif text-lg md:text-xl leading-relaxed text-bone/75">
        {{ capitalizeFirst(coffee.story) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Coffee } from '~/types'

const props = defineProps<{ coffee: Coffee }>()
const { t } = useI18n()

const rows = computed(() => [
  { label: t('coffee.country'), value: props.coffee.country },
  { label: t('coffee.region'), value: props.coffee.region },
  { label: t('coffee.variety'), value: props.coffee.variety },
  { label: t('coffee.process'), value: props.coffee.process },
  { label: t('coffee.altitude'), value: props.coffee.altitude },
  { label: t('coffee.stock.label'), value: t('coffee.stock.bags', { count: props.coffee.stock }) },
])
</script>
