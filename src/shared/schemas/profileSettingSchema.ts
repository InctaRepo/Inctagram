import { z } from 'zod'

import { LocaleType } from '@/public/locales/en'

export function createProfileSettingSchema(t: LocaleType) {
  return z.object({
    username: z
      .string()
      .trim()
      .nonempty(t.profileSetting.generalInformation.generalInformationErrors.usernameField.nonEmpty)
      .regex(
        /^[A-Za-z0-9-_]+$/,
        t.profileSetting.generalInformation.generalInformationErrors.usernameField.regex
      )
      .min(6, t.profileSetting.generalInformation.generalInformationErrors.usernameField.min)
      .max(30, t.profileSetting.generalInformation.generalInformationErrors.usernameField.max),
    firstName: z
      .string()
      .trim()
      .nonempty(
        t.profileSetting.generalInformation.generalInformationErrors.firstNameField.nonEmpty
      )
      .regex(
        /^[А-Яа-я- 'A-Za-z]+$/,
        t.profileSetting.generalInformation.generalInformationErrors.firstNameField.regex
      )
      .min(1, t.profileSetting.generalInformation.generalInformationErrors.firstNameField.min)
      .max(50, t.profileSetting.generalInformation.generalInformationErrors.firstNameField.max),
    lastName: z
      .string()
      .trim()
      .nonempty(t.profileSetting.generalInformation.generalInformationErrors.lastNameField.nonEmpty)
      .regex(
        /^[А-Яа-я- 'A-Za-z]+$/,
        t.profileSetting.generalInformation.generalInformationErrors.lastNameField.regex
      )
      .min(1, t.profileSetting.generalInformation.generalInformationErrors.lastNameField.min)
      .max(50, t.profileSetting.generalInformation.generalInformationErrors.lastNameField.max),
    dateOfBirthday: z.date().refine(
      data => {
        if (data === null) return true
        if (data) {
          const dateOfB = new Date(data)
          const now = new Date()
          const usersAge = now.getFullYear() - dateOfB.getFullYear()

          return usersAge >= 13
        }
      },
      {
        message: t.profileSetting.generalInformation.generalInformationErrors.refine,
      }
    ),
    country: z.string(),
    city: z.string(),
    aboutMe: z
      .string()
      .trim()
      .max(200, t.profileSetting.generalInformation.generalInformationErrors.aboutMeError)
      /* .regex(
        /^[0-9- _A-Za-zА-Яа-я\s\S]+$/,
        t.settingPhoto.profileSettingsErrors.aboutMeError
      )*/
      .optional(),
  })
}

export type ProfileSettingSchema = {
  username: string
  firstName: string
  lastName: string
  dateOfBirthday: Date
  country: string
  city: string
  aboutMe: string
  avatar: string
}
