<template>
  <Transition
    enter-active-class="transition duration-300 ease-premium"
    enter-from-class="opacity-0 translate-y-full"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-premium"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-full"
  >
    <div
      v-if="isVisible"
      class="cookie-banner fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-4 backdrop-blur-md md:px-8"
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании cookie"
    >
      <div
        class="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <p class="text-sm leading-relaxed text-muted-foreground">
          Мы используем файлы cookie для корректной работы сайта, сохранения настроек и улучшения
          пользовательского опыта.
        </p>
        <Button
          type="button"
          variant="magnetic-filled"
          class="shrink-0 px-6 py-3 md:w-auto"
          @click="accept"
        >
          Принять
        </Button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const consent = useCookie('cookie_consent', {
  maxAge: 60 * 60 * 24 * 365,
  sameSite: 'lax',
})

const isVisible = computed(() => consent.value !== 'accepted')

function accept() {
  consent.value = 'accepted'
}
</script>
