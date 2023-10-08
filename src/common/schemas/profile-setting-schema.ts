import { z } from 'zod'

import { LocaleType } from '@/src/locales/en'

export function createProfileSettingSchema(t: LocaleType) {
  return z
    .object({
      username: z
        .string()
        .trim()
        .nonempty(t.profile.profileSetting.profileSettingsErrors.usernameField.nonEmpty)
        .regex(
          /^[A-Za-z0-9-_]+$/,
          t.profile.profileSetting.profileSettingsErrors.usernameField.regex
        )
        .min(6, t.profile.profileSetting.profileSettingsErrors.usernameField.min)
        .max(30, t.profile.profileSetting.profileSettingsErrors.usernameField.max),
      firstName: z
        .string()
        .trim()
        .nonempty(t.profile.profileSetting.profileSettingsErrors.firstNameField.nonEmpty)
        .regex(
          /^[А-Яа-я- _A-Za-z]+$/,
          t.profile.profileSetting.profileSettingsErrors.firstNameField.regex
        )
        .min(1, t.profile.profileSetting.profileSettingsErrors.firstNameField.min)
        .max(50, t.profile.profileSetting.profileSettingsErrors.firstNameField.max),
      lastName: z
        .string()
        .trim()
        .nonempty(t.profile.profileSetting.profileSettingsErrors.lastNameField.nonEmpty)
        .regex(
          /^[А-Яа-я- _A-Za-z]+$/,
          t.profile.profileSetting.profileSettingsErrors.lastNameField.regex
        )
        .min(1, t.profile.profileSetting.profileSettingsErrors.lastNameField.min)
        .max(50, t.profile.profileSetting.profileSettingsErrors.lastNameField.max),
      dateOfBirthday: z.date(),
      city: z.string(),
      aboutMe: z
        .string()
        .trim()
        .max(200, t.profile.profileSetting.profileSettingsErrors.aboutMeError)
        .regex(
          /^[0-9- _A-Za-zА-Яа-я\s\S]+$/,
          t.profile.profileSetting.profileSettingsErrors.aboutMeError
        )
        .optional(),
    })
    .refine(
      obj =>
        typeof obj.dateOfBirthday === 'undefined' ||
        Date.now() - obj.dateOfBirthday.getTime() > 13 * 365 * 24 * 60 * 60 * 1000,
      {
        message: t.profile.profileSetting.profileSettingsErrors.refine,
      }
    )
}

export type ProfileSettingFormType = {
  username: string
  firstName: string
  lastName: string
  dateOfBirthday: string
  country: string
  city: string
  aboutMe: string
  avatar: string
}
