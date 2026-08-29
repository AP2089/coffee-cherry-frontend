<template>
  <button
    type="button"
    class="magnetic-btn magnetic-btn--filled px-8 py-4 text-xs w-full sm:w-auto"
    :disabled="disabled || loading"
    :class="{ 'opacity-50 pointer-events-none': disabled || loading }"
    @click="$emit('add')"
  >
    {{ loading ? $t('coffee.adding') : label || $t('coffee.add.to.cart') }}
  </button>
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
