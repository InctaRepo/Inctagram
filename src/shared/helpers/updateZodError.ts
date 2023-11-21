import { LoginFormType } from '../schemas/create-login-schema'
import { PasswordsMatchForm } from '../schemas/passwordsMatchSchema'
import { ProfileSettingForm } from '../schemas/profileSettingSchema'
import { SignUpFormSchema } from '../schemas/signUpSchema'

type FormType = LoginFormType | SignUpFormSchema | ProfileSettingForm | PasswordsMatchForm
// add your form manual type

export type FormFields = keyof FormType

/**
 * reset error messages from zod on touched by user fields (trigger validation)
 * @param touchedFieldNames names from touched fields in react hook form
 * @param trigger trigger func from react hook form
 */
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
