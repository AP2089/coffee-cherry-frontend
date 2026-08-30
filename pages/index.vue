<template>
  <div>
    <HomeHero />

    <section id="collection" class="pt-24 md:pt-32 pb-12 md:pb-20">
      <div class="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <AppSkeletonLoader v-if="pending" />
        <AppErrorState
          v-else-if="error"
          :title="$t('home.load.error.title')"
          :description="$t('home.load.error.description')"
        />
        <CoffeeGrid v-else-if="coffees?.length" :coffees="coffees" />
        <div v-else class="mx-auto max-w-lg text-center py-16">
          <p class="font-serif text-3xl text-foreground/90">{{ $t('home.empty.title') }}</p>
          <p class="mt-4 text-muted-foreground">
            {{ $t('home.empty.description') }}
            <code class="text-primary">docker compose exec backend npm run seed</code>
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

const { locale } = useI18n()

const {
  data: coffees,
  pending,
  error,
} = await useAsyncData('coffees', () => coffeeService.getAll(), {
  watch: [locale],
})
</script>
