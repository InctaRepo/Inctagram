import { z } from 'zod'

import { LocaleType } from '@/src/locales/en'

export function createProfileSettingSchema(t: LocaleType) {
  return z.object({
    username: z
      .string()
      .trim()
      .nonempty(t.profile.profileSetting.profileSettingsErrors.usernameField.nonEmpty)
      .regex(/^[A-Za-z0-9-_]+$/, t.profile.profileSetting.profileSettingsErrors.usernameField.regex)
      .min(6, t.profile.profileSetting.profileSettingsErrors.usernameField.min)
      .max(30, t.profile.profileSetting.profileSettingsErrors.usernameField.max),
    firstName: z.string(),
    lastName: z.string(),
    dateOfBirthday: z.date(),
    city: z.string(),
    aboutMe: z
      .string()
      .trim()
      .max(200, t.profile.profileSetting.profileSettingsErrors.aboutMeError),
  })
}

export type ProfileSettingFormType = {
  username: string
  firstName: string
  lastName: string
  dateOfBirthday: string
  city: string
  aboutMe: string
}
