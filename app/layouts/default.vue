<script setup lang="ts">
const { locale } = useI18n()

useHead(
  computed(() => ({
    htmlAttrs: {
      lang: locale.value === 'en' ? 'en' : 'ru',
    },
  })),
)

const cart = useCartStore()
const { x: glowX, y: glowY } = useMouse({ type: 'client' })
const glowActive = ref(false)

useEventListener(window, 'mousemove', () => {
  glowActive.value = true
})

useEventListener(window, 'mouseleave', () => {
  glowActive.value = false
})

onMounted(() => {
  cart.hydrate()
})
</script>

<template>
  <div class="min-h-screen bg-background text-foreground font-sans relative">
    <div class="grain" aria-hidden="true" />
    <div
      class="cursor-glow"
      :class="{ 'is-active': glowActive }"
      :style="{ left: `${glowX}px`, top: `${glowY}px` }"
      aria-hidden="true"
    />
    <LayoutHeader />
    <main>
      <slot />
    </main>
    <LayoutFooter />
    <AppScrollTop />
    <ClientOnly>
      <AppCookieBanner />
      <SupportChatWidget />
    </ClientOnly>
  </div>
</template>
