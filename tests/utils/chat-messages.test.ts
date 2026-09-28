import { describe, expect, it } from 'vitest'
import { prependOlderMessages } from '~/utils/chat-messages'
import type { ChatMessage } from '~/types/chat'

describe('chat-messages utils', () => {
  it('prepends unique older messages only', () => {
    const current: ChatMessage[] = [
      { id: '2', sessionId: 's1', sender: 'user', text: 'b', createdAt: '' },
    ]
    const older: ChatMessage[] = [
      { id: '1', sessionId: 's1', sender: 'agent', text: 'a', createdAt: '' },
      { id: '2', sessionId: 's1', sender: 'user', text: 'dup', createdAt: '' },
    ]

    const result = prependOlderMessages(current, older)

    expect(result.map((item) => item.id)).toEqual(['1', '2'])
  })
})
