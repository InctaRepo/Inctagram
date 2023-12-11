import { LoginFormType } from '@/src/shared/schemas/createLoginSchema'
import { PasswordsMatchForm } from '@/src/shared/schemas/passwordsMatchSchema'
import { ProfileSettingSchema } from '@/src/shared/schemas/profileSettingSchema'
import { SignUpFormSchema } from '@/src/shared/schemas/signUpSchema'

type FormType = LoginFormType | SignUpFormSchema | ProfileSettingSchema | PasswordsMatchForm

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
