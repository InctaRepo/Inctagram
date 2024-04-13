import { LocaleType } from '@/public/locales/ru'
import { z } from 'zod'

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
