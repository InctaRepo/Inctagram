import { LocaleType } from '@/public/locales/ru'
import { z } from 'zod'

export function createProfileSettingSchema(t: LocaleType) {
  return z.object({
    aboutMe: z
      .string()
      .max(200, t.profileSetting.generalInformation.generalInformationErrors.aboutMeError)
      .regex(
        /^[0-9A-Za-zА-Яа-я!"#$%&'()*+,-./:;<=>?@[\]^_`{|}〜\s]+$/,
        'About me should only contain alphanumeric characters in English or Russian'
      )
      .trim()
      .optional(),
    city: z
      .string()
      .min(3, t.profileSetting.generalInformation.generalInformationErrors.minLength)
      .regex(
        /^[а-яА-Яa-zA-Z,]+$/,
        t.profileSetting.generalInformation.generalInformationErrors.incorrectInput
      ),
    dateOfBirthday: z.date().refine(
      data => {
        if (data === null) {
          return true
        }
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
    firstName: z
      .string()
      .trim()
      .nonempty(
        t.profileSetting.generalInformation.generalInformationErrors.firstNameField.nonEmpty
      )
      .regex(
        /^[A-Za-zА-Яа-я]+$/,
        t.profileSetting.generalInformation.generalInformationErrors.firstNameField.regex
      )
      .min(1, t.profileSetting.generalInformation.generalInformationErrors.firstNameField.min)
      .max(50, t.profileSetting.generalInformation.generalInformationErrors.firstNameField.max),
    lastName: z
      .string()
      .trim()
      .nonempty(t.profileSetting.generalInformation.generalInformationErrors.lastNameField.nonEmpty)
      .regex(
        /^[A-Za-zА-Яа-я-]+$/,
        t.profileSetting.generalInformation.generalInformationErrors.lastNameField.regex
      )
      .min(1, t.profileSetting.generalInformation.generalInformationErrors.lastNameField.min)
      .max(50, t.profileSetting.generalInformation.generalInformationErrors.lastNameField.max),
    username: z
      .string()
      .trim()
      .nonempty(t.profileSetting.generalInformation.generalInformationErrors.usernameField.nonEmpty)
      .regex(
        /^[0-9A-Za-z_-]+$/,
        t.profileSetting.generalInformation.generalInformationErrors.usernameField.regex
      )
      .min(6, t.profileSetting.generalInformation.generalInformationErrors.usernameField.min)
      .max(30, t.profileSetting.generalInformation.generalInformationErrors.usernameField.max),
  })
}

export type ProfileSettingSchema = {
  aboutMe: string
  avatar: string
  city: string
  country: string
  dateOfBirthday: Date
  firstName: string
  lastName: string
  username: string
}
