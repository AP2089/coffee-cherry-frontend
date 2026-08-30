import type { ApiResponse, ContactMessage, CreateContactMessagePayload } from '~/types'

export const contactService = {
  async create(payload: CreateContactMessagePayload): Promise<ContactMessage> {
    const base = useApiBase()
    const res = await $fetch<ApiResponse<ContactMessage>>(`${base}/contacts`, {
      method: 'POST',
      body: payload,
    })

    if (!res.success || !res.data) {
      throw new Error(res.message || 'Failed to send message')
    }

    return res.data
  },
}
