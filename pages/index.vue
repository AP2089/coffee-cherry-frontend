<template>
  <div>
    <HomeHero />

    <section id="collection" class="pt-24 md:pt-32 pb-12 md:pb-20">
      <div class="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <UiSkeletonLoader v-if="pending" />
        <UiErrorState
          v-else-if="error"
          :title="$t('home.load.error.title')"
          :description="$t('home.load.error.description')"
        />
        <CoffeeGrid v-else-if="coffees?.length" :coffees="coffees" />
        <div v-else class="mx-auto max-w-lg text-center py-16">
          <p class="font-serif text-3xl text-bone/90">{{ $t('home.empty.title') }}</p>
          <p class="mt-4 text-bone/50">
            {{ $t('home.empty.description') }}
            <code class="text-bronze">docker compose exec backend npm run seed</code>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { coffeeService } from '~/services/coffee.service'

const { t } = useI18n()

useSeoPage({
  title: t('home.seo.title'),
  description: t('home.seo.description'),
  path: '/',
})

const {
  data: coffees,
  pending,
  error,
} = await useAsyncData('coffees', () => coffeeService.getAll())
</script>
