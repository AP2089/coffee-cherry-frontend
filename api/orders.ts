import type { MaybeRefOrGetter } from 'vue'
import type { UseFetchOptions } from 'nuxt/app'
import type { ApiResponse, CreateOrderPayload, FetchOptions, Order } from '~/types'

export const apiPostOrder = (body: CreateOrderPayload, options: FetchOptions = {}) => {
  const { $apiContent } = useNuxtApp()

  return $apiContent<ApiResponse<Order>>('/orders', {
    method: 'POST',
    body,
    ...options,
  })
}

export const apiGetOrder = (
  id: MaybeRefOrGetter<string>,
  options: UseFetchOptions<ApiResponse<Order>> = {},
) => {
  return useAPIContent<ApiResponse<Order>>(() => `/orders/${toValue(id)}`, {
    ...options,
  })
}
