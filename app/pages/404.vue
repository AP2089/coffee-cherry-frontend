<template>
  <div class="pt-32 pb-12">
    <AppErrorState
      :title="$t('error.not.found.title')"
      :description="$t('error.not.found.description')"
      action-to="/"
      :action-label="$t('error.home')"
    />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoPage({
  title: t('error.not.found.title'),
  description: t('error.seo.404'),
  path: '/404',
  noIndex: true,
})
</script>
