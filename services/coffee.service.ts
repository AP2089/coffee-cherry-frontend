import type { ApiResponse, Coffee } from '~/types'

export const coffeeService = {
  async getAll(): Promise<Coffee[]> {
    const base = useApiBase()
    const res = await $fetch<ApiResponse<Coffee[]>>(`${base}/coffees`)
    return res.data
  },

  async getBySlug(slug: string): Promise<Coffee> {
    const base = useApiBase()
    const res = await $fetch<ApiResponse<Coffee>>(`${base}/coffees/${slug}`)
    return res.data
  },
}
