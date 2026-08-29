<template>
  <footer class="border-t border-bone/10 mt-12 md:mt-20">
    <div
      class="mx-auto max-w-content px-5 md:px-8 lg:px-12 py-16 md:py-24 grid gap-12 md:grid-cols-12"
    >
      <div class="md:col-span-5">
        <p class="font-display text-3xl md:text-4xl font-bold tracking-tight">
          {{ $t('brand.name.full') }}
        </p>
        <p class="mt-4 max-w-sm text-bone/55 leading-relaxed">
          Ограниченный ассортимент особой обжарки.
        </p>
      </div>

      <div class="md:col-span-3 md:col-start-7">
        <p class="text-xs tracking-[0.2em] uppercase text-bone/40 mb-4">
          {{ $t('footer.collection') }}
        </p>
        <ul class="space-y-2 text-bone/70">
          <li v-for="slug in slugs" :key="slug">
            <NuxtLink :to="`/coffee/${slug}`" class="hover:text-bone transition-colors capitalize">
              {{ slug }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="md:col-span-3">
        <p class="text-xs tracking-[0.2em] uppercase text-bone/40 mb-4">
          {{ $t('footer.visit') }}
        </p>
        <p class="text-bone/70 leading-relaxed">
          {{ $t('footer.address') }}<br />
          <NuxtLink to="/contacts" class="hover:text-bone transition-colors">
            {{ $t('footer.email') }}
          </NuxtLink>
        </p>
      </div>
    </div>

    <div
      class="mx-auto max-w-content px-5 md:px-8 lg:px-12 py-8 border-t border-bone/10 text-xs tracking-[0.16em] uppercase text-bone/35"
    >
      <span>{{ $t('footer.copyright', { year }) }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
const slugs = ['bloom', 'velvet', 'santos', 'noir', 'ember'] as const
const year = new Date().getFullYear()
</script>
