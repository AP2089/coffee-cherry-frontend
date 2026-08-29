<template>
  <header
    class="fixed top-0 inset-x-0 z-30 transition-all duration-500 ease-premium"
    :class="scrolled || menuOpen ? 'bg-ink/80 backdrop-blur-md' : 'bg-transparent'"
  >
    <div
      class="mx-auto max-w-content px-5 md:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between"
    >
      <NuxtLink to="/" class="font-display text-xl md:text-2xl tracking-tight font-bold">
        {{ $t('brand.name.short') }}
        <span class="text-bronze">
          {{ ' ' + $t('brand.lab') }}
        </span>
      </NuxtLink>

      <div class="flex items-center gap-4 md:gap-10">
        <nav
          class="hidden md:flex items-center gap-8 md:gap-10 text-sm tracking-[0.18em] uppercase text-bone/70"
        >
          <a href="/#collection" class="hover:text-bone transition-colors duration-300">
            {{ $t('nav.collection') }}
          </a>
          <NuxtLink to="/story" class="hover:text-bone transition-colors duration-300">
            {{ $t('nav.story') }}
          </NuxtLink>
          <NuxtLink to="/contacts" class="hover:text-bone transition-colors duration-300">
            {{ $t('footer.visit') }}
          </NuxtLink>
        </nav>

        <NuxtLink
          to="/cart"
          class="relative flex items-center gap-2 text-sm tracking-[0.14em] uppercase text-bone/80 hover:text-bone transition-colors"
          :aria-label="$t('nav.open.cart')"
        >
          <span class="hidden sm:inline">{{ $t('nav.cart') }}</span>
          <span
            class="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-bone/25 px-2 text-xs"
          >
            {{ cart.getItemsCount }}
          </span>
        </NuxtLink>

        <button
          type="button"
          class="md:hidden flex h-10 w-10 items-center justify-center text-bone/80 hover:text-bone transition-colors"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          aria-label="Меню"
          @click="toggleMenu"
        >
          <span class="sr-only">Меню</span>
          <svg
            v-if="!menuOpen"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-premium"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-premium"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="menuOpen"
        id="mobile-nav"
        class="md:hidden border-t border-bone/10 bg-ink/95 backdrop-blur-md"
      >
        <div class="mx-auto max-w-content px-5 py-6 flex flex-col gap-1">
          <a
            href="/#collection"
            class="px-2 py-4 text-sm tracking-[0.18em] uppercase text-bone/70 hover:text-bone transition-colors border-b border-bone/10"
            @click="closeMenu"
          >
            {{ $t('nav.collection') }}
          </a>
          <NuxtLink
            to="/story"
            class="px-2 py-4 text-sm tracking-[0.18em] uppercase text-bone/70 hover:text-bone transition-colors border-b border-bone/10"
            @click="closeMenu"
          >
            {{ $t('nav.story') }}
          </NuxtLink>
          <NuxtLink
            to="/contacts"
            class="px-2 py-4 text-sm tracking-[0.18em] uppercase text-bone/70 hover:text-bone transition-colors"
            @click="closeMenu"
          >
            {{ $t('footer.visit') }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const cart = useCartStore()
const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

watch(
  () => route.path,
  () => {
    closeMenu()
  },
)

watch(menuOpen, (open) => {
  if (!import.meta.client) return
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => {
  const onScroll = () => {
    scrolled.value = window.scrollY > 24
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    document.body.style.overflow = ''
  })
})
</script>
