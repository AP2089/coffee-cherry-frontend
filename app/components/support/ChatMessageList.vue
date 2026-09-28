<script setup lang="ts">
import type { ChatMessage } from '~/types/chat'

interface IProps {
  messages: ChatMessage[]
  loadingMore: boolean
  isConnecting: boolean
  connectionError: boolean
  senderLabel: (sender: string) => string
  formatTime: (value: string) => string
}

interface IEmits {
  scroll: []
}

defineProps<IProps>()
const emit = defineEmits<IEmits>()

const messagesEl = ref<HTMLElement | null>(null)

function scrollToBottom() {
  nextTick(() => {
    if (!messagesEl.value) return
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  })
}

function restoreScrollAfterPrepend(previousHeight: number) {
  nextTick(() => {
    if (!messagesEl.value) return
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight - previousHeight
  })
}

defineExpose({
  getElement: () => messagesEl.value,
  scrollToBottom,
  restoreScrollAfterPrepend,
})
</script>

<template>
  <div
    ref="messagesEl"
    class="support-chat__messages min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
    @scroll="emit('scroll')"
  >
    <p v-if="loadingMore" class="text-center text-xs text-muted-foreground">…</p>

    <p v-if="isConnecting && !messages.length" class="text-sm text-muted-foreground">
      {{ $t('support.connecting') }}
    </p>

    <Alert v-else-if="connectionError" variant="destructive">
      <AlertDescription>{{ $t('support.connectionError') }}</AlertDescription>
    </Alert>

    <SupportChatMessageBubble
      v-for="message in messages"
      :key="message.id"
      :message="message"
      :sender-label="senderLabel(message.sender)"
      :time-label="formatTime(message.createdAt)"
    />
  </div>
</template>

<style scoped lang="scss">
.support-chat__messages {
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--foreground) 18%, transparent) transparent;
}
</style>
