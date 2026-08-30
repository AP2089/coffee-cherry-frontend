import { z } from 'zod'

export const PERSONAL_DATA_CONSENT_ERROR = 'Необходимо согласие на обработку персональных данных'

export function personalDataConsentField() {
  return z.boolean().refine((value) => value === true, {
    message: PERSONAL_DATA_CONSENT_ERROR,
  })
}
