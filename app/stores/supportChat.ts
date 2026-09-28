import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import type { Socket } from 'socket.io-client'
import type { ChatMessage } from '~/types/chat'
import {
  getChatGuestProfile,
  getChatSessionId,
  saveChatGuestProfile,
  useSocketUrl,
  type ChatGuestProfile,
} from '~/composables/useSupportChat'
import { prependOlderMessages } from '~/utils/chat-messages'

let socket: Socket | null = null

export const useSupportChatStore = defineStore('supportChat', () => {
  const isOpen = ref(false)
  const isConnected = ref(false)
  const isConnecting = ref(false)
  const messages = ref<ChatMessage[]>([])
  const messagesHasMore = ref(false)
  const loadingMoreMessages = ref(false)
  const unreadCount = ref(0)
  const error = ref<string | null>(null)
  const initialized = ref(false)
  const guestName = ref('')
  const guestEmail = ref('')
  const profileReady = ref(false)

  function hydrateProfile() {
    const profile = getChatGuestProfile()

    if (!profile) {
      profileReady.value = false
      return
    }

    guestName.value = profile.guestName
    guestEmail.value = profile.guestEmail
    profileReady.value = true
  }

  function setProfile(profile: ChatGuestProfile) {
    guestName.value = profile.guestName.trim()
    guestEmail.value = profile.guestEmail.trim().toLowerCase()
    saveChatGuestProfile({
      guestName: guestName.value,
      guestEmail: guestEmail.value,
    })
    profileReady.value = true
    error.value = null
  }

  function toggle() {
    isOpen.value = !isOpen.value

    if (isOpen.value) {
      unreadCount.value = 0
      hydrateProfile()
    }
  }

  function close() {
    isOpen.value = false
  }

  async function connect(locale = 'ru') {
    if (!import.meta.client) return

    hydrateProfile()

    if (!profileReady.value) return

    const sessionId = getChatSessionId()
    const chatLocale = locale === 'en' ? 'en' : 'ru'
    const joinPayload = {
      sessionId,
      locale: chatLocale,
      guestName: guestName.value,
      guestEmail: guestEmail.value,
    }

    if (socket?.connected) {
      isConnected.value = true
      isConnecting.value = false
      socket.emit('support:join', joinPayload)
      return
    }

    if (isConnecting.value) return

    isConnecting.value = true
    error.value = null
    messagesHasMore.value = false
    loadingMoreMessages.value = false

    const { io } = await import('socket.io-client')

    if (socket) {
      socket.removeAllListeners()
      socket.disconnect()
    }

    socket = io(useSocketUrl(), {
      transports: ['websocket', 'polling'],
      path: '/socket.io',
    })

    socket.on('connect', () => {
      isConnected.value = true
      isConnecting.value = false
      socket?.emit('support:join', joinPayload)
    })

    socket.on('disconnect', () => {
      isConnected.value = false
    })

    socket.on(
      'support:history',
      (payload: {
        messages?: ChatMessage[]
        hasMore?: boolean
        guestName?: string
        guestEmail?: string
      }) => {
        messages.value = payload.messages ?? []
        messagesHasMore.value = Boolean(payload.hasMore)
        loadingMoreMessages.value = false

        if (payload.guestName) guestName.value = payload.guestName
        if (payload.guestEmail) guestEmail.value = payload.guestEmail

        initialized.value = true
        error.value = null
      },
    )

    socket.on(
      'support:history-page',
      (payload: { messages?: ChatMessage[]; hasMore?: boolean }) => {
        const older = payload.messages ?? []

        if (!older.length) {
          messagesHasMore.value = false
          loadingMoreMessages.value = false
          return
        }

        messages.value = prependOlderMessages(messages.value, older)
        messagesHasMore.value = Boolean(payload.hasMore)
        loadingMoreMessages.value = false
      },
    )

    socket.on('support:message', (payload: { message?: ChatMessage }) => {
      if (!payload.message) return

      const exists = messages.value.some((message) => message.id === payload.message?.id)
      if (exists) return

      messages.value.push(payload.message)

      if (!isOpen.value && payload.message.sender === 'agent') {
        unreadCount.value += 1
      }
    })

    socket.on('support:error', (payload: { message?: string }) => {
      if (!loadingMoreMessages.value) {
        error.value = payload.message ?? 'Chat error'
      }
      isConnecting.value = false
      loadingMoreMessages.value = false
    })

    socket.on('connect_error', () => {
      isConnected.value = false
      isConnecting.value = false
      error.value = 'connection'
      loadingMoreMessages.value = false
    })
  }

  function loadOlderMessages() {
    if (
      !import.meta.client ||
      loadingMoreMessages.value ||
      !messagesHasMore.value ||
      !messages.value.length ||
      !socket?.connected
    ) {
      return Promise.resolve()
    }

    loadingMoreMessages.value = true
    socket.emit('support:load-more', { before: messages.value[0]?.id })

    return new Promise<void>((resolve) => {
      let settled = false

      const finish = () => {
        if (settled) return
        settled = true
        clearTimeout(timeoutId)
        socket?.off('support:history-page', onPage)
        resolve()
      }

      const onPage = () => {
        finish()
      }

      const timeoutId = setTimeout(() => {
        loadingMoreMessages.value = false
        finish()
      }, 10_000)

      socket?.once('support:history-page', onPage)
    })
  }

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed || !socket?.connected) return false

    socket.emit('support:message', { text: trimmed })
    return true
  }

  function disconnect() {
    if (socket) {
      socket.removeAllListeners()
      socket.disconnect()
      socket = null
    }

    isConnected.value = false
    isConnecting.value = false
    loadingMoreMessages.value = false
  }

  return {
    isOpen,
    isConnected,
    isConnecting,
    messages,
    messagesHasMore,
    loadingMoreMessages,
    unreadCount,
    error,
    initialized,
    guestName,
    guestEmail,
    profileReady,
    hydrateProfile,
    setProfile,
    toggle,
    close,
    connect,
    loadOlderMessages,
    sendMessage,
    disconnect,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupportChatStore, import.meta.hot))
}
