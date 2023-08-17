import { z } from 'zod'

export const passwordRecoverySchema = z.object({
  email: z.string().trim().nonempty('Enter email').email('Email must contain A-Z, a-z , @'),
  recaptcha: z.literal(true),
})
