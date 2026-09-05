<template>
  <div
    class="relative min-h-[140px] md:min-h-[160px] aspect-[3/1] overflow-hidden border border-bone/10 bg-ink-mute"
  >
    <iframe
      :src="mapSrc"
      class="absolute inset-0 h-full w-full border-0"
      loading="lazy"
      allowfullscreen
      :title="$t('contacts.mapTitle')"
    />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

const mapSrc = computed(() => {
  const query = encodeURIComponent(t('footer.address'))
  const mapLang = locale.value === 'en' ? 'en_US' : 'ru_RU'
  return `https://yandex.ru/map-widget/v1/?text=${query}&z=17&lang=${mapLang}`
})
</script>
