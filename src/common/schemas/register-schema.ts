import { z } from 'zod'

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .regex(/^[A-Za-z0-9-_]+$/, 'Username can contain only A-Z, a-z, - or _')
      .nonempty('Enter username')
      .min(6, 'Min number of characters 6')
      .max(30, 'Max number of characters 30'),
    email: z.string().trim().nonempty('Enter email').email('Invalid email address'),
    terms: z.boolean().refine(value => value, {
      message: 'Please, review and agree to the Terms of Service and Privacy Policy to proceed',
    }),
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
    passwordConfirm: z.string().nonempty('Confirm your password'),
  })
  .refine(data => data.password == data.passwordConfirm, {
    message: 'The passwords must match',
    path: ['passwordConfirm'],
  })

// .superRefine((data, ctx) => {
// 	if (data.password !== data.passwordConfirm) {
// 		ctx.addIssue({
// 			message: 'The passwords must match',
// 			code: z.ZodIssueCode.custom,
// 			path: ['passwordConfirm'],
// 		})
// 	}
// 	return data
// })
