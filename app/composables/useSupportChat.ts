import { useLocalStorage, type RemovableRef } from '@vueuse/core'

const SESSION_KEY = 'coffee-cherry-chat-session'
const PROFILE_KEY = 'coffee-cherry-chat-profile'

export interface ChatGuestProfile {
  guestName: string
  guestEmail: string
}

let sessionIdStorage: RemovableRef<string> | null = null
let profileStorage: RemovableRef<ChatGuestProfile | null> | null = null

function useChatSessionStorage() {
  if (!sessionIdStorage) {
    sessionIdStorage = useLocalStorage(SESSION_KEY, '', { flush: 'sync' })
  }
  return sessionIdStorage
}

function useChatProfileStorage() {
  if (!profileStorage) {
    profileStorage = useLocalStorage<ChatGuestProfile | null>(PROFILE_KEY, null, {
      flush: 'sync',
    })
  }
  return profileStorage
}

export function useSocketUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.socketUrl)
}

export function getChatSessionId(): string {
  const sessionId = useChatSessionStorage()

  if (!sessionId.value) {
    sessionId.value = crypto.randomUUID()
  }

  return sessionId.value
}

export function getChatGuestProfile(): ChatGuestProfile | null {
  const stored = useChatProfileStorage().value
  if (!stored) return null

  const guestName = stored.guestName?.trim() ?? ''
  const guestEmail = stored.guestEmail?.trim().toLowerCase() ?? ''

  if (!guestName || !guestEmail) return null

  return { guestName, guestEmail }
}

export function saveChatGuestProfile(profile: ChatGuestProfile): void {
  useChatProfileStorage().value = {
    guestName: profile.guestName.trim(),
    guestEmail: profile.guestEmail.trim().toLowerCase(),
  }
}
