import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useSupportChatStore } from '~/stores/supportChat'

vi.mock('~/composables/useSupportChat', () => ({
  getChatGuestProfile: vi.fn(() => null),
  getChatSessionId: vi.fn(() => 'session-test'),
  saveChatGuestProfile: vi.fn(),
  useSocketUrl: vi.fn(() => 'http://localhost:3013'),
}))

describe('supportChat store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('setProfile normalizes guest data', () => {
    const store = useSupportChatStore()

    store.setProfile({
      guestName: '  Ivan ',
      guestEmail: ' Test@Mail.com ',
    })

    expect(store.guestName).toBe('Ivan')
    expect(store.guestEmail).toBe('test@mail.com')
    expect(store.profileReady).toBe(true)
  })

  it('toggle opens chat and resets unread count', () => {
    const store = useSupportChatStore()
    store.unreadCount = 3

    store.toggle()

    expect(store.isOpen).toBe(true)
    expect(store.unreadCount).toBe(0)
  })

  it('sendMessage returns false without socket connection', () => {
    const store = useSupportChatStore()

    expect(store.sendMessage('hello')).toBe(false)
  })
})
