<template>
  <div class="pt-28 md:pt-32 pb-12 md:pb-20">
    <section class="mx-auto max-w-content px-5 md:px-8 lg:px-12">
      <p class="text-[10px] tracking-[0.28em] uppercase text-bronze">
        {{ $t('footer.visit') }}
      </p>
      <h1
        class="mt-5 font-display text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[0.95] max-w-4xl"
      >
        {{ $t('contacts.title') }}
      </h1>
      <p class="mt-8 max-w-xl font-serif text-xl md:text-2xl text-bone/65 leading-relaxed">
        {{ $t('contacts.lead') }}
      </p>
    </section>

    <section class="mt-16 md:mt-24 mx-auto max-w-content px-5 md:px-8 lg:px-12">
      <div class="grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div class="lg:col-span-7">
          <ContactsForm />
        </div>

        <div class="lg:col-span-5 flex flex-col gap-12 md:gap-16">
          <div>
            <p class="text-[10px] tracking-[0.24em] uppercase text-bone/40 mb-4">
              {{ $t('contacts.address') }}
            </p>
            <p class="font-serif text-xl md:text-2xl text-bone/85 leading-snug">
              {{ $t('footer.address') }}
            </p>
          </div>

          <div>
            <p class="text-[10px] tracking-[0.24em] uppercase text-bone/40 mb-4">
              {{ $t('contacts.hours') }}
            </p>
            <p class="font-serif text-2xl md:text-3xl text-bone/85">
              {{ $t('contacts.hoursWeekdays') }}
            </p>
            <p class="mt-3 text-bone/50 leading-relaxed">{{ $t('contacts.hoursTime') }}</p>
          </div>
        </div>
      </div>

      <div class="mt-12 md:mt-16">
        <p class="text-[10px] tracking-[0.24em] uppercase text-bone/40 mb-4">
          {{ $t('contacts.map') }}
        </p>
        <ContactsMap />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoPage({
  title: t('contacts.seo.title'),
  description: t('contacts.seo.description'),
  path: '/contacts',
})
</script>
