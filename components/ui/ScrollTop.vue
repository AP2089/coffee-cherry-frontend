<template>
  <button
    type="button"
    class="scroll-top fixed bottom-6 right-5 md:bottom-8 md:right-8 z-40 flex h-11 w-11 items-center justify-center border border-bone/25 bg-ink/80 text-bone/70 backdrop-blur-md hover:border-bronze hover:text-bronze"
    :class="{ 'is-interactive': progress > 0.85 }"
    :style="buttonStyle"
    :aria-label="$t('common.scrollTop')"
    :tabindex="progress > 0.2 ? 0 : -1"
    @click="scrollToTop"
  >
    <span class="scroll-top__chevron" aria-hidden="true" />
  </button>
</template>

<script setup lang="ts">
const SHOW_START = 280
const SHOW_END = 520

const progress = ref(0)

const buttonStyle = computed(() => {
  const p = progress.value
  const eased = 1 - (1 - p) ** 2
  return {
    opacity: String(eased),
    transform: `translateY(${(1 - eased) * 16}px) scale(${0.92 + eased * 0.08})`,
    pointerEvents: p > 0.2 ? 'auto' : 'none',
  }
})

function onScroll() {
  const y = window.scrollY
  if (y <= SHOW_START) {
    progress.value = 0
    return
  }
  if (y >= SHOW_END) {
    progress.value = 1
    return
  }
  progress.value = (y - SHOW_START) / (SHOW_END - SHOW_START)
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
})
</script>

<style scoped lang="scss">
@use '../../assets/scss/variables' as *;

.scroll-top {
  will-change: opacity, transform;
  transition:
    border-color 0.4s $ease-premium,
    color 0.4s $ease-premium,
    background 0.4s $ease-premium;
}

.scroll-top__chevron {
  display: block;
  width: 8px;
  height: 8px;
  margin-top: 3px;
  border-left: 1.5px solid currentColor;
  border-top: 1.5px solid currentColor;
  transform: rotate(45deg);
}

@media (prefers-reduced-motion: reduce) {
  .scroll-top {
    transition: opacity 0.2s ease;
  }
}
</style>
