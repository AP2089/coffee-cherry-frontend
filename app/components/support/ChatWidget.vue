<template>
  <div
    class="support-chat fixed bottom-6 right-5 md:bottom-8 md:right-8 z-40 flex flex-col items-end"
  >
    <Transition
      enter-active-class="transition duration-300 ease-premium"
      enter-from-class="opacity-0 translate-y-3 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-premium"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-3 scale-95"
    >
      <Card
        v-if="chat.isOpen"
        class="support-chat__panel mb-3 flex flex-col overflow-hidden border-border bg-background/95 backdrop-blur-md shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        role="dialog"
        aria-modal="true"
        :aria-label="$t('support.title')"
      >
        <CardHeader
          class="shrink-0 flex-row items-start gap-3 space-y-0 border-b border-border px-4 py-3"
        >
          <div class="flex min-w-0 flex-1 items-start gap-2">
            <CardTitle class="font-display text-lg tracking-tight">{{
              $t('support.title')
            }}</CardTitle>
            <span
              v-if="chat.profileReady"
              class="mt-1.5 inline-flex h-2 w-2 shrink-0 rounded-full"
              :class="chat.isConnected ? 'bg-success' : 'bg-destructive/80'"
              :title="chat.isConnected ? $t('support.online') : $t('support.offline')"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            class="ml-auto shrink-0 cursor-pointer text-muted-foreground hover:text-foreground"
            :aria-label="$t('support.close')"
            @click="chat.close()"
          >
            <svg
              viewBox="0 0 24 24"
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            >
              <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </Button>
        </CardHeader>

        <SupportProfileForm
          v-if="!chat.profileReady"
          ref="profileFormRef"
          @submit="submitProfile"
        />

        <template v-else>
          <div class="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div
              v-if="chat.guestName"
              class="shrink-0 border-b border-border px-4 py-2 text-xs text-muted-foreground"
            >
              {{ chat.guestName }} · {{ chat.guestEmail }}
            </div>

            <div
              ref="messagesEl"
              class="support-chat__messages min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
              @scroll="messagesScroll.onScroll"
            >
              <p v-if="chat.loadingMoreMessages" class="text-center text-xs text-muted-foreground">
                …
              </p>

              <p
                v-if="chat.isConnecting && !chat.messages.length"
                class="text-sm text-muted-foreground"
              >
                {{ $t('support.connecting') }}
              </p>

              <Alert v-else-if="chat.error === 'connection'" variant="destructive">
                <AlertDescription>{{ $t('support.connectionError') }}</AlertDescription>
              </Alert>

              <article
                v-for="message in chat.messages"
                :key="message.id"
                class="flex"
                :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
              >
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
                    {{ senderLabel(message.sender) }}
                  </p>
                  <p class="whitespace-pre-wrap break-words">{{ message.text }}</p>
                  <p class="mt-1 text-[10px] tracking-[0.08em] uppercase text-muted-foreground">
                    {{ formatTime(message.createdAt) }}
                  </p>
                </div>
              </article>
            </div>

            <form class="shrink-0 border-t border-border p-3" @submit.prevent="submit">
              <div class="flex items-stretch gap-2">
                <Textarea
                  v-model="draft"
                  rows="2"
                  class="min-h-[44px] max-h-28 flex-1 resize-none bg-transparent"
                  :placeholder="$t('support.placeholder')"
                  :disabled="!chat.isConnected"
                  @keydown.enter.exact.prevent="submit"
                />
                <Button
                  type="submit"
                  variant="magnetic-filled"
                  class="h-auto w-11 shrink-0 self-stretch p-0"
                  :disabled="!canSend"
                  :aria-label="$t('support.send')"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 12l14-7-7 14-2-5-5-2z"
                    />
                  </svg>
                </Button>
              </div>
            </form>
          </div>
        </template>
      </Card>
    </Transition>

    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      class="support-chat__toggle relative cursor-pointer border-border bg-background/85 text-muted-foreground backdrop-blur-md hover:border-primary hover:text-primary"
      :aria-label="chat.isOpen ? $t('support.close') : $t('support.open')"
      @click="chat.toggle()"
    >
      <svg
        v-if="!chat.isOpen"
        viewBox="0 0 24 24"
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8 10h8M8 14h5M6 6.5A3.5 3.5 0 019.5 3h5A3.5 3.5 0 0118 6.5v7A3.5 3.5 0 0114.5 17H11l-3.5 3v-3H6.5A3.5 3.5 0 013 13.5v-7z"
        />
      </svg>
      <svg
        v-else
        viewBox="0 0 24 24"
        class="h-5 w-5"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
      </svg>

      <Badge v-if="chat.unreadCount > 0" variant="unread">
        {{ chat.unreadCount }}
      </Badge>
    </Button>
  </div>
</template>

<script setup lang="ts">
const chat = useSupportChatStore()
const { locale, t } = useI18n()
const draft = ref('')
const messagesEl = ref<HTMLElement | null>(null)
const profileFormRef = ref<{ reset: () => void } | null>(null)

const canSend = computed(() => chat.isConnected && draft.value.trim().length > 0)

function formatTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

function senderLabel(sender: string) {
  if (sender === 'user') {
    return locale.value === 'en' ? 'You' : 'Вы'
  }

  return t('support.label')
}

function scrollToBottom() {
  nextTick(() => {
    if (!messagesEl.value) return
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  })
}

async function loadOlderMessages() {
  const el = messagesEl.value
  if (!el || chat.loadingMoreMessages || !chat.messagesHasMore) return

  const previousHeight = el.scrollHeight
  await chat.loadOlderMessages()

  await nextTick()
  if (!messagesEl.value) return
  messagesEl.value.scrollTop = messagesEl.value.scrollHeight - previousHeight
}

const messagesScroll = useScrollLoad(() => messagesEl.value, loadOlderMessages, {
  canLoadMore: () =>
    chat.messagesHasMore &&
    !chat.isConnecting &&
    !chat.loadingMoreMessages &&
    chat.messages.length > 0 &&
    chat.profileReady,
  isScrollTrigger: isNearScrollTop,
})

const isUnderfilled = (element: HTMLElement) => element.scrollHeight <= element.clientHeight + 1

async function ensureMessagesFilled() {
  if (!chat.messagesHasMore || chat.isConnecting) return
  await messagesScroll.ensureFilled(isUnderfilled)
}

function submitProfile(values: { guestName: string; guestEmail: string }) {
  chat.setProfile(values)
  chat.connect(locale.value)
}

function submit() {
  if (!canSend.value) return

  const text = draft.value
  draft.value = ''

  if (chat.sendMessage(text)) {
    scrollToBottom()
  }
}

watch(
  () => chat.messages.at(-1)?.id,
  () => {
    if (chat.isOpen && chat.profileReady) scrollToBottom()
  },
)

watch(
  () => [chat.initialized, chat.messagesHasMore] as const,
  async ([initialized, hasMore]) => {
    if (!initialized || !chat.isOpen) return
    await nextTick()
    scrollToBottom()
    if (hasMore) await ensureMessagesFilled()
  },
)

watch(
  () => chat.isOpen,
  async (open) => {
    if (!open) return

    chat.hydrateProfile()

    if (chat.profileReady) {
      await chat.connect(locale.value)
      await nextTick()
      scrollToBottom()
      await ensureMessagesFilled()
      return
    }

    await nextTick()
    profileFormRef.value?.reset()
  },
)

onMounted(() => {
  chat.hydrateProfile()
})

onBeforeUnmount(() => {
  chat.disconnect()
})
</script>

<style scoped lang="scss">
.support-chat__panel {
  width: min(calc(100vw - 2.5rem), 22rem);
  height: min(80dvh, 34rem);
}

.support-chat__messages {
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--foreground) 18%, transparent) transparent;
}

.support-chat__toggle,
.support-chat__panel {
  transition:
    border-color 0.4s ease,
    color 0.4s ease,
    background 0.4s ease;
}
</style>
