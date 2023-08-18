import { z } from 'zod'

export const logInSchema = z.object({
  email: z.string().trim().nonempty('Enter email').email('Email must contain A-Z, a-z , @'),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_])[a-zA-Z\d!@#$%^&*_]+$/,
      'Password must contain A-Z, a-z, 0-9, !#$%*+-?^_'
    )
    .nonempty('Enter password')
    .min(6, 'Min number of characters 6')
    .max(20, 'Max number of characters 20'),
})
