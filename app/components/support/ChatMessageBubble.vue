<script setup lang="ts">
import type { ChatMessage } from '~/types/chat'

interface IProps {
  message: ChatMessage
  senderLabel: string
  timeLabel: string
}

defineProps<IProps>()
</script>

<template>
  <article class="flex" :class="message.sender === 'user' ? 'justify-end' : 'justify-start'">
    <div
      class="max-w-[85%] px-3 py-2 text-sm leading-relaxed border"
      :class="
        message.sender === 'user'
          ? 'bg-primary/20 text-foreground border-primary/25'
          : 'bg-muted text-foreground/80 border-border'
      "
    >
      <p
        class="mb-1 text-[10px] font-medium tracking-[0.08em] uppercase"
        :class="message.sender === 'user' ? 'text-primary/70' : 'text-muted-foreground'"
      >
        {{ senderLabel }}
      </p>
      <p class="whitespace-pre-wrap break-words">{{ message.text }}</p>
      <p class="mt-1 text-[10px] tracking-[0.08em] uppercase text-muted-foreground">
        {{ timeLabel }}
      </p>
    </div>
  </article>
</template>
