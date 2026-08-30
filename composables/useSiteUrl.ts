export function useSiteUrl() {
  const config = useRuntimeConfig()

  return computed(() => {
    const raw = config.public.siteUrl || 'http://localhost:3000'
    return raw.replace(/\/+$/, '')
  })
}

export function toAbsoluteUrl(path: string, siteUrl: string) {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${normalizedPath}`
}
