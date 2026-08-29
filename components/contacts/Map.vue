<template>
  <div
    class="relative min-h-[140px] md:min-h-[160px] aspect-[3/1] overflow-hidden border border-bone/10 bg-ink-mute"
  >
    <iframe
      :src="mapSrc"
      class="absolute inset-0 h-full w-full border-0"
      loading="lazy"
      allowfullscreen
      title="Яндекс Карта"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

const mapSrc = computed(() => {
  const query = encodeURIComponent(t('footer.address'))
  return `https://yandex.ru/map-widget/v1/?text=${query}&z=17&lang=ru_RU`
})
</script>
