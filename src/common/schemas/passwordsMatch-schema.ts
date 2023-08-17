import { z } from 'zod'

export const passwordsMatchSchema = z
  .object({
    password: z.string().trim().nonempty('Enter password'),
    passwordConfirmation: z.string().trim(),
  })
  .refine(data => data.password === data.passwordConfirmation, {
    message: 'The passwords must match',
    path: ['passwordConfirmation'],
  })
