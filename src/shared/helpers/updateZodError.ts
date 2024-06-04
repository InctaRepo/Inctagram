import { LoginFormType } from '@/shared/schemas/createLoginSchema'
import { PasswordsMatchSchema } from '@/shared/schemas/passwordsMatchSchema'
import { ProfileSettingSchema } from '@/shared/schemas/profileSettingSchema'
import { SignUpFormSchema } from '@/shared/schemas/signUpSchema'

type FormType = LoginFormType | PasswordsMatchSchema | ProfileSettingSchema | SignUpFormSchema

export type FormFields = keyof FormType

export const triggerZodFieldError = (
  touchedFieldNames: FormFields[],
  trigger: (name?: FormFields | FormFields[]) => Promise<boolean>
) => {
  if (touchedFieldNames.length > 0) {
    touchedFieldNames.forEach(fieldName => {
      trigger(fieldName as FormFields)
    })
  }
}
