import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { ForgotForm, Recaptcha, RecaptchaProps } from '../recaptcha'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<RecaptchaProps, 'onChange' | 'value'>

export const ControlledRecaptcha = <T extends FieldValues>({
  control,
  name,
  ...props
}: Props<ForgotForm>) => {
  const {
    field: { ref, ...fieldProps },
  } = useController({
    name,
    control,
  })

  return <Recaptcha {...fieldProps} {...props} />
}
