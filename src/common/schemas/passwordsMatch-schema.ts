import { z } from 'zod'

import { LocaleType } from '@/src/locales/en'

export const passwordsMatchSchema = (t: LocaleType) => {
  return z
    .object({
      password: z.string().trim().nonempty(t.auth.authErrors.password.nonEmpty),
      passwordConfirmation: z.string().trim(),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: t.auth.authErrors.refine,
      path: ['passwordConfirmation'],
    })
}

export type PasswodsMatchFormType = {
  password: string
  passwordConfirm: string
}
