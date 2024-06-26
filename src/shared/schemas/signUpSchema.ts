import { LocaleType } from '@/public/locales/ru'
import { z } from 'zod'

export function createSignUpSchema(t: LocaleType) {
  return z
    .object({
      email: z
        .string()
        .trim()
        .nonempty(t.auth.authErrors.emailField.nonEmpty)
        .email(t.auth.authErrors.emailField.email),
      password: z
        .string()
        .trim()
        .nonempty(t.auth.authErrors.password.nonEmpty)
        .regex(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@\\[\]^_`{|}〜])[a-zA-Z\d!"#$%&'()*+,-./:;<=>?@\\[\]^_`{|}〜]+$/,
          t.auth.authErrors.password.regex
        )
        .min(6, t.auth.authErrors.password.min)
        .max(20, t.auth.authErrors.password.max),
      passwordConfirm: z.string().trim().nonempty(t.auth.authErrors.passwordConfirm),
      terms: z.boolean().refine(value => value, {
        message: t.auth.authErrors.terms,
      }),
      username: z
        .string()
        .trim()
        .nonempty(t.auth.authErrors.usernameField.nonEmpty)
        .regex(/^[A-Za-z0-9-_]+$/, t.auth.authErrors.usernameField.regex)
        .min(6, t.auth.authErrors.usernameField.min)
        .max(30, t.auth.authErrors.usernameField.max),
    })
    .refine(data => data.password == data.passwordConfirm, {
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

export type SignUpFormSchema = z.infer<ReturnType<typeof createSignUpSchema>>
