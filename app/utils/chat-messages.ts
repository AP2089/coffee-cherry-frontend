import type { ChatMessage } from '~/types/chat'

export function prependOlderMessages(current: ChatMessage[], older: ChatMessage[]): ChatMessage[] {
  const existingIds = new Set(current.map((item) => item.id))
  const uniqueOlder = older.filter((item) => !existingIds.has(item.id))

  if (!uniqueOlder.length) return current

  return [...uniqueOlder, ...current]
}
