const SESSION_KEY = 'coffee-cherry-chat-session'
const PROFILE_KEY = 'coffee-cherry-chat-profile'

export interface ChatGuestProfile {
  guestName: string
  guestEmail: string
}

export function useSocketUrl(): string {
  const config = useRuntimeConfig()
  return String(config.public.socketUrl)
}

export function getChatSessionId(): string {
  if (!import.meta.client) return ''

  let sessionId = localStorage.getItem(SESSION_KEY)

  if (!sessionId) {
    sessionId = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY, sessionId)
  }

  return sessionId
}

export function getChatGuestProfile(): ChatGuestProfile | null {
  if (!import.meta.client) return null

  try {
    const raw = localStorage.getItem(PROFILE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as Partial<ChatGuestProfile>
    const guestName = parsed.guestName?.trim() ?? ''
    const guestEmail = parsed.guestEmail?.trim().toLowerCase() ?? ''

    if (!guestName || !guestEmail) return null

    return { guestName, guestEmail }
  } catch {
    return null
  }
}

export function saveChatGuestProfile(profile: ChatGuestProfile): void {
  if (!import.meta.client) return

  localStorage.setItem(
    PROFILE_KEY,
    JSON.stringify({
      guestName: profile.guestName.trim(),
      guestEmail: profile.guestEmail.trim().toLowerCase(),
    }),
  )
}
