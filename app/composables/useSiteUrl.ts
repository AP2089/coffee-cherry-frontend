export function useSiteUrl() {
  const requestUrl = useRequestURL()

  return computed(() => requestUrl.origin)
}

export function toAbsoluteUrl(path: string, siteUrl: string) {
  if (/^https?:\/\//i.test(path)) {
    return path
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${siteUrl}${normalizedPath}`
}
