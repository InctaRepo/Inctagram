import { LocaleType } from '@/public/locales/ru'
import { z } from 'zod'

export function descriptionSchema(t: LocaleType) {
  return z.object({
    description: z.string().max(500, t.profile.descriptionError.error),
  })
}

export type DescriptionForm = {
  description: string
}
