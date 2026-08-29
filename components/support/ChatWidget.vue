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
      <div
        v-if="chat.isOpen"
        class="support-chat__panel mb-3 flex flex-col overflow-hidden border border-bone/15 bg-ink/95 backdrop-blur-md shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
        role="dialog"
        aria-modal="true"
        :aria-label="$t('support.title')"
      >
        <header
          class="support-chat__header flex items-start gap-3 border-b border-bone/10 px-4 py-3"
        >
          <div class="flex min-w-0 flex-1 items-start gap-2">
            <div class="min-w-0">
              <p class="font-display text-lg tracking-tight">{{ $t('support.title') }}</p>
            </div>
            <span
              v-if="chat.profileReady"
              class="mt-1.5 inline-flex h-2 w-2 shrink-0 rounded-full"
              :class="chat.isConnected ? 'bg-emerald-400/90' : 'bg-ember/80'"
              :title="chat.isConnected ? $t('support.online') : $t('support.offline')"
            />
          </div>
          <button
            type="button"
            class="support-chat__close ml-auto shrink-0 flex h-8 w-8 items-center justify-center text-bone/50 hover:text-bone transition-colors"
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
          </button>
        </header>

        <SupportProfileForm
          v-if="!chat.profileReady"
          ref="profileFormRef"
          @submit="submitProfile"
        />

        <template v-else>
          <div v-if="chat.guestName" class="border-b border-bone/10 px-4 py-2 text-xs text-bone/45">
            {{ chat.guestName }} · {{ chat.guestEmail }}
          </div>

          <div
            ref="messagesEl"
            class="support-chat__messages flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            <p v-if="chat.isConnecting && !chat.messages.length" class="text-sm text-bone/45">
              {{ $t('support.connecting') }}
            </p>

            <p v-else-if="chat.error === 'connection'" class="text-sm text-ember">
              {{ $t('support.connectionError') }}
            </p>

            <article
              v-for="message in chat.messages"
              :key="message.id"
              class="flex"
              :class="message.sender === 'user' ? 'justify-end' : 'justify-start'"
            >
              <div
                class="max-w-[85%] px-3 py-2 text-sm leading-relaxed"
                :class="
                  message.sender === 'user'
                    ? 'bg-bronze/20 text-bone border border-bronze/25'
                    : 'bg-bone/5 text-bone/80 border border-bone/10'
                "
              >
                <p class="whitespace-pre-wrap break-words">{{ message.text }}</p>
                <p class="mt-1 text-[10px] tracking-[0.08em] uppercase text-bone/35">
                  {{ formatTime(message.createdAt) }}
                </p>
              </div>
            </article>
          </div>

          <form class="border-t border-bone/10 p-3" @submit.prevent="submit">
            <div class="flex items-stretch gap-2">
              <textarea
                v-model="draft"
                rows="2"
                class="support-chat__textarea min-h-[44px] max-h-28 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-bone outline-none placeholder:text-bone/35"
                :placeholder="$t('support.placeholder')"
                :disabled="!chat.isConnected"
                @keydown.enter.exact.prevent="submit"
              />
              <button
                type="submit"
                class="support-chat__send magnetic-btn magnetic-btn--filled shrink-0 flex w-11 items-center justify-center"
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
              </button>
            </div>
          </form>
        </template>
      </div>
    </Transition>

    <button
      type="button"
      class="support-chat__toggle relative flex h-12 w-12 items-center justify-center border border-bone/25 bg-ink/85 text-bone/80 backdrop-blur-md hover:border-bronze hover:text-bronze transition-colors"
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

      <span
        v-if="chat.unreadCount > 0"
        class="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-bronze px-1 text-[10px] font-semibold text-ink"
      >
        {{ chat.unreadCount }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
const chat = useSupportChatStore()
const { locale } = useI18n()
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

function scrollToBottom() {
  nextTick(() => {
    if (!messagesEl.value) return
    messagesEl.value.scrollTop = messagesEl.value.scrollHeight
  })
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
  () => chat.messages.length,
  () => {
    if (chat.isOpen && chat.profileReady) scrollToBottom()
  },
)

watch(
  () => chat.isOpen,
  async (open) => {
    if (!open) return

    chat.hydrateProfile()

    if (chat.profileReady) {
      chat.connect(locale.value)
      scrollToBottom()
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
@use '../../assets/scss/variables' as *;

.support-chat__panel {
  width: min(calc(100vw - 2.5rem), 22rem);
  height: min(80dvh, 34rem);
}

.support-chat__close {
  transition:
    border-color 0.3s $ease-premium,
    color 0.3s $ease-premium;
}

.support-chat__start {
  letter-spacing: 0.12em;
}

.support-chat__messages {
  scrollbar-width: thin;
  scrollbar-color: rgba(237, 232, 223, 0.18) transparent;
}

.support-chat__textarea {
  border: 1px solid rgba($bone, 0.12);

  &:focus {
    border-color: rgba($bronze, 0.45);
  }
}

.support-chat__send {
  padding: 0;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
}

.support-chat__toggle,
.support-chat__panel {
  transition:
    border-color 0.4s ease,
    color 0.4s ease,
    background 0.4s ease;
}
</style>
