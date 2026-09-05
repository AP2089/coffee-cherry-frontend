<template>
  <Button
    type="button"
    variant="magnetic-filled"
    class="w-full sm:w-auto px-8 py-4"
    :disabled="disabled || loading"
    @click="$emit('add')"
  >
    {{ loading ? $t('coffee.adding') : label || $t('coffee.add.to.cart') }}
  </Button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    disabled?: boolean
    loading?: boolean
  }>(),
  {
    label: undefined,
    disabled: false,
    loading: false,
  },
)

defineEmits<{ add: [] }>()
</script>
