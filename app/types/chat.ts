export type ChatSender = 'user' | 'agent'

export interface ChatMessage {
  id: string
  sessionId: string
  sender: ChatSender
  text: string
  createdAt: string
}
