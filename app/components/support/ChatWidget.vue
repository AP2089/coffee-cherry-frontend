<script setup lang="ts">
const chat = useSupportChatStore()
const { locale, t } = useI18n()
const draft = ref('')
const profileFormRef = ref<{ reset: () => void } | null>(null)
const messageListRef = ref<{
  getElement: () => HTMLElement | null
  scrollToBottom: () => void
  restoreScrollAfterPrepend: (previousHeight: number) => void
} | null>(null)

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
  messageListRef.value?.scrollToBottom()
}

async function loadOlderMessages() {
  const element = messageListRef.value?.getElement()
  if (!element || chat.loadingMoreMessages || !chat.messagesHasMore) return

  const previousHeight = element.scrollHeight
  await chat.loadOlderMessages()
  messageListRef.value?.restoreScrollAfterPrepend(previousHeight)
}

const messagesScroll = useScrollLoad(
  () => messageListRef.value?.getElement() ?? null,
  loadOlderMessages,
  {
    canLoadMore: () =>
      chat.messagesHasMore &&
      !chat.isConnecting &&
      !chat.loadingMoreMessages &&
      chat.messages.length > 0 &&
      chat.profileReady,
    isScrollTrigger: isNearScrollTop,
  },
)

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
        <SupportChatPanelHeader
          :profile-ready="chat.profileReady"
          :is-connected="chat.isConnected"
          @close="chat.close()"
        />

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

            <SupportChatMessageList
              ref="messageListRef"
              :messages="chat.messages"
              :loading-more="chat.loadingMoreMessages"
              :is-connecting="chat.isConnecting"
              :connection-error="chat.error === 'connection'"
              :sender-label="senderLabel"
              :format-time="formatTime"
              @scroll="messagesScroll.onScroll"
            />

            <SupportChatComposer
              v-model="draft"
              :can-send="canSend"
              :disabled="!chat.isConnected"
              @submit="submit"
            />
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
      <IconsChat v-if="!chat.isOpen" class="h-5 w-5" />
      <IconsClose v-else class="h-5 w-5" />

      <Badge v-if="chat.unreadCount > 0" variant="unread">
        {{ chat.unreadCount }}
      </Badge>
    </Button>
  </div>
</template>

<style scoped lang="scss">
.support-chat__panel {
  width: min(calc(100vw - 2.5rem), 22rem);
  height: min(80dvh, 34rem);
}

.support-chat__toggle,
.support-chat__panel {
  transition:
    border-color 0.4s ease,
    color 0.4s ease,
    background 0.4s ease;
}
</style>
