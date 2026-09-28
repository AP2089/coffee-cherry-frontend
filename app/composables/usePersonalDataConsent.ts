import { z } from 'zod'

export function personalDataConsentField(message: string) {
  return z.boolean().refine((value) => value === true, {
    message,
  })
}
