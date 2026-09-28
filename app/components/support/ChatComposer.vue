<script setup lang="ts">
interface IProps {
  canSend: boolean
  disabled: boolean
}

interface IEmits {
  submit: []
}

const draft = defineModel<string>({ required: true })

defineProps<IProps>()
const emit = defineEmits<IEmits>()
</script>

<template>
  <form class="shrink-0 border-t border-border p-3" @submit.prevent="emit('submit')">
    <div class="flex items-stretch gap-2">
      <Textarea
        v-model="draft"
        rows="2"
        class="min-h-[44px] max-h-28 flex-1 resize-none bg-transparent"
        :placeholder="$t('support.placeholder')"
        :disabled="disabled"
        @keydown.enter.exact.prevent="emit('submit')"
      />
      <Button
        type="submit"
        variant="magnetic-filled"
        class="h-auto w-11 shrink-0 self-stretch p-0"
        :disabled="!canSend"
        :aria-label="$t('support.send')"
      >
        <IconsSend class="h-4 w-4" />
      </Button>
    </div>
  </form>
</template>
