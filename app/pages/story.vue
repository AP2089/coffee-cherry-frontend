<template>
  <div class="pt-28 md:pt-32 pb-12 md:pb-20">
    <section class="mx-auto max-w-content px-5 md:px-8 lg:px-12">
      <p class="text-[10px] tracking-[0.28em] uppercase text-bronze">
        {{ $t('story.label') }}
      </p>
      <h1
        class="mt-5 font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] max-w-4xl"
      >
        {{ $t('story.title') }}
      </h1>
    </section>

    <section class="mt-14 md:mt-20 relative overflow-hidden">
      <div class="mx-auto max-w-content px-5 md:px-8 lg:px-12">
        <div class="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-ink-mute">
          <img src="/images/hero-banner.jpg" alt="" class="h-full w-full object-cover opacity-90" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent opacity-70"
          />
        </div>
      </div>
    </section>

    <section class="mt-16 md:mt-24 mx-auto max-w-content px-5 md:px-8 lg:px-12">
      <div class="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div class="lg:col-span-4">
          <p class="font-serif text-2xl md:text-3xl text-bone/80 leading-snug">
            {{ $t('story.lead') }}
          </p>
        </div>
        <div
          class="lg:col-span-7 lg:col-start-6 space-y-8 text-bone/65 text-lg md:text-xl leading-relaxed font-serif"
        >
          <p>{{ $t('story.p1') }}</p>
          <p>{{ $t('story.p2') }}</p>
          <p>{{ $t('story.p3') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoPage({
  title: t('story.seo.title'),
  description: t('story.seo.description'),
  path: '/story',
})
</script>
