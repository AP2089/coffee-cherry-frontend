<template>
  <div class="block">
    <div class="flex items-start gap-3">
      <input
        :id="inputId"
        v-model="model"
        v-bind="attrs"
        type="checkbox"
        class="mt-0.5 size-4 shrink-0 cursor-pointer rounded border-border bg-background accent-primary"
      />
      <Label
        :for="inputId"
        class="cursor-pointer text-sm font-normal leading-relaxed text-muted-foreground"
      >
        Я согласен(а) на обработку персональных данных
      </Label>
    </div>
    <p v-if="error" class="mt-2 text-xs text-destructive">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

defineProps<{
  error?: string
}>()

const model = defineModel<boolean>({ default: false })
const attrs = useAttrs()
const inputId = useId()
</script>
