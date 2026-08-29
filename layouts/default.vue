<template>
  <div class="min-h-screen bg-ink text-bone font-sans relative">
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
    <UiScrollTop />
  </div>
</template>

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
const glowX = ref(0)
const glowY = ref(0)
const glowActive = ref(false)

onMounted(() => {
  cart.hydrate()

  const onMove = (e: MouseEvent) => {
    glowX.value = e.clientX
    glowY.value = e.clientY
    glowActive.value = true
  }

  const onLeave = () => {
    glowActive.value = false
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseleave', onLeave)

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseleave', onLeave)
  })
})
</script>
