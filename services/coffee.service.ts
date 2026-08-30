import type { ApiResponse, Coffee } from '~/types'

function getLocaleParam(): string | undefined {
  const { locale } = useI18n()
  return locale.value === 'ru' ? undefined : locale.value
}

export const coffeeService = {
  async getAll(): Promise<Coffee[]> {
    const base = useApiBase()
    const locale = getLocaleParam()
    const query = locale ? `?locale=${locale}` : ''
    const res = await $fetch<ApiResponse<Coffee[]>>(`${base}/coffees${query}`)
    return res.data
  },

  async getBySlug(slug: string): Promise<Coffee> {
    const base = useApiBase()
    const locale = getLocaleParam()
    const query = locale ? `?locale=${locale}` : ''
    const res = await $fetch<ApiResponse<Coffee>>(`${base}/coffees/${slug}${query}`)
    return res.data
  },
}
