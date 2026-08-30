<template>
  <div class="mx-auto max-w-lg text-center py-24 px-6">
    <p class="font-serif text-3xl md:text-4xl text-foreground/90">{{ titleText }}</p>
    <p class="mt-4 text-muted-foreground leading-relaxed">{{ descriptionText }}</p>
    <Button v-if="actionTo" variant="magnetic" class="mt-10 px-6 py-3" as-child>
      <NuxtLink :to="resolvedActionTo">
        {{ actionLabelText }}
      </NuxtLink>
    </Button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    actionTo?: string
    actionLabel?: string
  }>(),
  {
    title: undefined,
    description: undefined,
    actionTo: '/',
    actionLabel: undefined,
  },
)

const { t } = useI18n()
const localePath = useLocalePath()

const titleText = computed(() => props.title ?? t('error.default.title'))
const descriptionText = computed(() => props.description ?? t('error.default.description'))
const actionLabelText = computed(() => props.actionLabel ?? t('error.home'))

const resolvedActionTo = computed(() => {
  if (props.actionTo === '/#collection') {
    return { path: localePath('/'), hash: '#collection' }
  }

  return localePath(props.actionTo)
})
</script>
