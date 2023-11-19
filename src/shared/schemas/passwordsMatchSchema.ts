import { z } from 'zod'
import { LocaleType } from 'public/locales/en'

export function passwordsMatchSchema(t: LocaleType) {
  return z
    .object({
      password: z
        .string()
        .trim()
        .nonempty(t.auth.authErrors.password.nonEmpty)
        .regex(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}〜])[a-zA-Z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}〜]+$/,
          t.auth.authErrors.password.regex
        )
        .min(6, t.auth.authErrors.password.min)
        .max(20, t.auth.authErrors.password.max),
      passwordConfirm: z.string().nonempty(t.auth.authErrors.passwordConfirm),
    })
    .refine(({ password, passwordConfirm }) => password == passwordConfirm, {
      message: t.auth.authErrors.refine,
      path: ['passwordConfirm'],
    })
    .refine(
      ({ password, passwordConfirm }) => {
        if (passwordConfirm) {
          return password == passwordConfirm
        }

        return true
      },
      {
        message: t.auth.authErrors.refine,
        path: ['password'],
      }
    )
}

export type PasswordsMatchForm = {
  password: string
  passwordConfirm: string
}
