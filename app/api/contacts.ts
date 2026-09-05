import type {
  ApiResponse,
  ContactMessage,
  CreateContactMessagePayload,
  FetchOptions,
} from '~/types'

export const apiPostContact = (body: CreateContactMessagePayload, options: FetchOptions = {}) => {
  const { $apiContent } = useNuxtApp()

  return $apiContent<ApiResponse<ContactMessage>>('/contacts', {
    method: 'POST',
    body,
    ...options,
  })
}
