import { z } from 'zod'

import { LocaleType } from '@/public/locales/ru'

export const createLoginSchema = (t: LocaleType) => {
  return z.object({
    email: z
      .string()
      .trim()
      .nonempty(t.auth.authErrors.emailField.nonEmpty)
      .email(t.auth.authErrors.emailField.email),
    password: z
      .string()
      .trim()
      .nonempty(t.auth.authErrors.password.nonEmpty)
      .min(6, t.auth.authErrors.password.min)
      .max(20, t.auth.authErrors.password.max),
  })
}

export type LoginFormType = {
  email: string
  password: string
}
