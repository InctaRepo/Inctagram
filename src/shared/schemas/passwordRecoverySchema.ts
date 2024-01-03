import { z } from 'zod'

import { LocaleType } from '@/public/locales/en'

export const passwordRecoverySchema = (t: LocaleType) => {
  return z.object({
    email: z
      .string()
      .trim()
      .nonempty(t.auth.authErrors.emailField.nonEmpty)
      .email(t.auth.authErrors.emailField.email),
    recaptcha: z.literal(true),
  })
}
