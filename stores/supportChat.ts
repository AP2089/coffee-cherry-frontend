import { defineStore } from 'pinia'
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

export const useSupportChatStore = defineStore('supportChat', {
  state: () => ({
    isOpen: false,
    isConnected: false,
    isConnecting: false,
    messages: [] as ChatMessage[],
    messagesHasMore: false,
    loadingMoreMessages: false,
    unreadCount: 0,
    error: null as string | null,
    initialized: false,
    guestName: '',
    guestEmail: '',
    profileReady: false,
  }),

  actions: {
    hydrateProfile() {
      const profile = getChatGuestProfile()

      if (!profile) {
        this.profileReady = false
        return
      }

      this.guestName = profile.guestName
      this.guestEmail = profile.guestEmail
      this.profileReady = true
    },

    setProfile(profile: ChatGuestProfile) {
      this.guestName = profile.guestName.trim()
      this.guestEmail = profile.guestEmail.trim().toLowerCase()
      saveChatGuestProfile({
        guestName: this.guestName,
        guestEmail: this.guestEmail,
      })
      this.profileReady = true
      this.error = null
    },

    toggle() {
      this.isOpen = !this.isOpen

      if (this.isOpen) {
        this.unreadCount = 0
        this.hydrateProfile()
      }
    },

    open() {
      if (!this.isOpen) this.toggle()
    },

    close() {
      this.isOpen = false
    },

    async connect(locale = 'ru') {
      if (!import.meta.client) return

      this.hydrateProfile()

      if (!this.profileReady) return

      const sessionId = getChatSessionId()
      const chatLocale = locale === 'en' ? 'en' : 'ru'
      const joinPayload = {
        sessionId,
        locale: chatLocale,
        guestName: this.guestName,
        guestEmail: this.guestEmail,
      }

      if (socket?.connected) {
        this.isConnected = true
        this.isConnecting = false
        socket.emit('support:join', joinPayload)
        return
      }

      if (this.isConnecting) return

      this.isConnecting = true
      this.error = null
      this.messagesHasMore = false
      this.loadingMoreMessages = false

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
        this.isConnected = true
        this.isConnecting = false
        socket?.emit('support:join', joinPayload)
      })

      socket.on('disconnect', () => {
        this.isConnected = false
      })

      socket.on(
        'support:history',
        (payload: {
          messages?: ChatMessage[]
          hasMore?: boolean
          guestName?: string
          guestEmail?: string
        }) => {
          this.messages = payload.messages ?? []
          this.messagesHasMore = Boolean(payload.hasMore)
          this.loadingMoreMessages = false

          if (payload.guestName) this.guestName = payload.guestName
          if (payload.guestEmail) this.guestEmail = payload.guestEmail

          this.initialized = true
          this.error = null
        },
      )

      socket.on(
        'support:history-page',
        (payload: { messages?: ChatMessage[]; hasMore?: boolean }) => {
          const older = payload.messages ?? []

          if (!older.length) {
            this.messagesHasMore = false
            this.loadingMoreMessages = false
            return
          }

          this.messages = prependOlderMessages(this.messages, older)
          this.messagesHasMore = Boolean(payload.hasMore)
          this.loadingMoreMessages = false
        },
      )

      socket.on('support:message', (payload: { message?: ChatMessage }) => {
        if (!payload.message) return

        const exists = this.messages.some((message) => message.id === payload.message?.id)
        if (exists) return

        this.messages.push(payload.message)

        if (!this.isOpen && payload.message.sender === 'agent') {
          this.unreadCount += 1
        }
      })

      socket.on('support:error', (payload: { message?: string }) => {
        if (!this.loadingMoreMessages) {
          this.error = payload.message ?? 'Chat error'
        }
        this.isConnecting = false
        this.loadingMoreMessages = false
      })

      socket.on('connect_error', () => {
        this.isConnected = false
        this.isConnecting = false
        this.error = 'connection'
        this.loadingMoreMessages = false
      })
    },

    loadOlderMessages() {
      if (
        !import.meta.client ||
        this.loadingMoreMessages ||
        !this.messagesHasMore ||
        !this.messages.length ||
        !socket?.connected
      ) {
        return Promise.resolve()
      }

      this.loadingMoreMessages = true
      socket.emit('support:load-more', { before: this.messages[0]?.id })

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
          this.loadingMoreMessages = false
          finish()
        }, 10_000)

        socket?.once('support:history-page', onPage)
      })
    },

    sendMessage(text: string) {
      const trimmed = text.trim()
      if (!trimmed || !socket?.connected) return false

      socket.emit('support:message', { text: trimmed })
      return true
    },

    disconnect() {
      if (socket) {
        socket.removeAllListeners()
        socket.disconnect()
        socket = null
      }

      this.isConnected = false
      this.isConnecting = false
      this.loadingMoreMessages = false
    },
  },
})
