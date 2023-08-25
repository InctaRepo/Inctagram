import { z } from 'zod'

import { LocaleType } from '@/src/locales/en'

export function createRegisterSchema(t: LocaleType) {
  return z
    .object({
      username: z
        .string()
        .trim()
        .nonempty(t.auth.signUpFormErrors.usernameField.nonEmpty)
        .regex(/^[A-Za-z0-9-_]+$/, t.auth.signUpFormErrors.usernameField.regex)
        .min(6, t.auth.signUpFormErrors.usernameField.min)
        .max(30, t.auth.signUpFormErrors.usernameField.max),
      email: z
        .string()
        .trim()
        .nonempty(t.auth.signUpFormErrors.emailField.nonEmpty)
        .email(t.auth.signUpFormErrors.emailField.email),
      terms: z.boolean().refine(value => value, {
        message: t.auth.signUpFormErrors.terms,
      }),
      password: z
        .string()
        .trim()
        .nonempty(t.auth.signUpFormErrors.password.nonEmpty)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%*+-?^_])[a-zA-Z\d!#$%*+-?^_]+$/,
          t.auth.signUpFormErrors.password.regex
        )
        .min(6, t.auth.signUpFormErrors.password.min)
        .max(20, t.auth.signUpFormErrors.password.max),
      passwordConfirm: z.string().nonempty(t.auth.signUpFormErrors.passwordConfirm),
    })
    .refine(data => data.password == data.passwordConfirm, {
      message: t.auth.signUpFormErrors.refine,
      path: ['passwordConfirm'],
    })
}

export type RegisterFormType = {
  username: string
  email: string
  password: string
  passwordConfirm: string
  terms: boolean
}
