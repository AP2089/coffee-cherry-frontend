import type { ApiResponse, CreateOrderPayload, Order } from '~/types'

export const orderService = {
  async create(payload: CreateOrderPayload): Promise<Order> {
    const base = useApiBase()
    const res = await $fetch<ApiResponse<Order>>(`${base}/orders`, {
      method: 'POST',
      body: payload,
    })
    return res.data
  },

  async getById(id: string): Promise<Order> {
    const base = useApiBase()
    const res = await $fetch<ApiResponse<Order>>(`${base}/orders/${id}`)
    return res.data
  },
}
