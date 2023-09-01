import { LoginFormType } from '@/src/common/schemas/create-login-schema'
import { PasswodsMatchFormType } from '@/src/common/schemas/passwordsMatch-schema'
import { RegisterFormType } from '@/src/common/schemas/register-schema'

type FormType = LoginFormType | RegisterFormType | PasswodsMatchFormType
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
