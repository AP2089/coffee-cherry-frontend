<template>
  <section class="hero relative min-h-[100svh] flex items-end overflow-hidden">
    <div class="absolute inset-0">
      <img
        src="/images/hero-banner.jpg"
        alt=""
        class="hero__image absolute inset-0 size-full object-cover object-center"
      />
      <div class="hero__veil absolute inset-0" />
      <div class="hero__glow absolute inset-0 pointer-events-none" aria-hidden="true" />
    </div>

    <div
      class="relative z-10 mx-auto max-w-content w-full px-5 md:px-8 lg:px-12 pb-28 md:pb-32 pt-32"
    >
      <p
        class="hero__tag text-[10px] md:text-xs tracking-[0.38em] uppercase text-bronze"
        :class="{ 'is-in': ready }"
      >
        {{ $t('home.hero.tag') }}
      </p>

      <h1 class="mt-6 md:mt-8 font-display font-bold tracking-[-0.04em] leading-[0.82]">
        <span class="block text-[18vw] md:text-[11rem] lg:text-[12.5rem]">
          {{ $t('brand.name.short') }}
        </span>
        <span class="block text-[18vw] md:text-[11rem] lg:text-[12.5rem] text-bone/85">
          {{ $t('brand.lab') }}
        </span>
      </h1>
    </div>

    <a
      href="#collection"
      class="hero__scroll absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 text-bone/55 hover:text-bone/85 transition-colors"
      :class="{ 'is-in': ready }"
      :aria-label="$t('home.scroll')"
    >
      <span class="hero__scroll-mouse" aria-hidden="true">
        <span class="hero__scroll-wheel" />
      </span>
      <span class="hero__scroll-chevrons" aria-hidden="true">
        <span class="hero__scroll-chevron" />
        <span class="hero__scroll-chevron" />
        <span class="hero__scroll-chevron" />
      </span>
    </a>
  </section>
</template>

<script setup lang="ts">
const ready = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    ready.value = true
  })
})
</script>

<style scoped lang="scss">
@use '../../assets/scss/variables' as *;

.hero__image {
  max-width: none;
  height: 100%;
  width: 100%;
}

.hero__veil {
  background:
    linear-gradient(
      180deg,
      rgba($ink, 0.55) 0%,
      rgba($ink, 0.28) 38%,
      rgba($ink, 0.78) 72%,
      rgba($ink, 0.96) 100%
    ),
    linear-gradient(90deg, rgba($ink, 0.55) 0%, transparent 48%);
}

.hero__glow {
  background:
    radial-gradient(ellipse 55% 45% at 78% 28%, rgba($bronze, 0.22), transparent 70%),
    radial-gradient(ellipse 40% 35% at 18% 70%, rgba(201, 160, 176, 0.12), transparent 65%);
  mix-blend-mode: screen;
}

.hero__tag,
.hero__scroll {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 1.1s $ease-premium,
    transform 1.1s $ease-premium;
}

.hero__scroll {
  transition-delay: 0.4s;
}

.hero__tag.is-in,
.hero__scroll.is-in {
  opacity: 1;
  transform: translateY(0);
}

.hero__scroll-mouse {
  display: block;
  width: 22px;
  height: 34px;
  border: 1.5px solid rgba($bone, 0.45);
  border-radius: 999px;
  position: relative;
}

.hero__scroll-wheel {
  position: absolute;
  top: 7px;
  left: 50%;
  width: 3px;
  height: 7px;
  margin-left: -1.5px;
  border-radius: 999px;
  background: rgba($bone, 0.75);
  animation: scroll-wheel 1.6s $ease-soft infinite;
}

.hero__scroll-chevrons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 22px;
  gap: 3px;
}

.hero__scroll-chevron {
  display: block;
  width: 10px;
  height: 10px;
  border-right: 1.5px solid rgba($bone, 0.55);
  border-bottom: 1.5px solid rgba($bone, 0.55);
  transform: rotate(45deg);
  animation: scroll-chevron 1.6s $ease-soft infinite;
}

.hero__scroll-chevron:nth-child(1) {
  animation-delay: 0s;
}

.hero__scroll-chevron:nth-child(2) {
  animation-delay: 0.15s;
}

.hero__scroll-chevron:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes scroll-wheel {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  70% {
    transform: translateY(10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 0;
  }
}

@keyframes scroll-chevron {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__tag,
  .hero__scroll {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .hero__scroll-wheel,
  .hero__scroll-chevron {
    animation: none;
  }
}
</style>
