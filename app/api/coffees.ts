import type { MaybeRefOrGetter } from 'vue'
import type { UseFetchOptions } from 'nuxt/app'
import type { ApiResponse, Coffee } from '~/types'

export const apiGetCoffees = (options: UseFetchOptions<ApiResponse<Coffee[]>> = {}) => {
  return useAPIContent<ApiResponse<Coffee[]>>('/coffees', { ...options })
}

export const apiGetCoffee = (
  slug: MaybeRefOrGetter<string>,
  options: UseFetchOptions<ApiResponse<Coffee>> = {},
) => {
  return useAPIContent<ApiResponse<Coffee>>(() => `/coffees/${toValue(slug)}`, {
    ...options,
  })
}
