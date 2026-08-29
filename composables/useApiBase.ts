export function useApiBase(): string {
  const config = useRuntimeConfig()

  if (import.meta.server) {
    return String(config.apiUrl || config.public.apiUrl)
  }

  return String(config.public.apiUrl)
}
