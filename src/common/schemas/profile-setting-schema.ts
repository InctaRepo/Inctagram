import { z } from 'zod'

export const profileSettingSchema = z.object({
  username: z
    .string()
    .trim()
    .nonempty('Enter username')
    .regex(/^[A-Za-z0-9-_]+$/, 'Username can contain only A-Z, a-z, - or _')
    .min(6, 'Min number of characters 6')
    .max(30, 'Max number of characters 30'),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirthday: z.date(),
  city: z.string(),
  aboutMe: z.string().trim().max(200, 'Max number of characters 200'),
})
