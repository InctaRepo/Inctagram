import { z } from 'zod'

import { LocaleType } from '@/src/locales/en'

export function passwordsMatchSchema(t: LocaleType) {
  return z
    .object({
      password: z
        .string()
        .trim()
        .nonempty(t.auth.authErrors.password.nonEmpty)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[a-zA-Z\d!@#$%^&*_]+$/,
          t.auth.authErrors.password.regex
        )
        .min(6, t.auth.authErrors.password.min)
        .max(20, t.auth.authErrors.password.max),
      passwordConfirm: z.string().nonempty(t.auth.authErrors.passwordConfirm),
    })
    .refine(data => data.password == data.passwordConfirm, {
      message: t.auth.authErrors.refine,
      path: ['passwordConfirm'],
    })
}

export type PasswodsMatchFormType = {
  password: string
  passwordConfirm: string
}
