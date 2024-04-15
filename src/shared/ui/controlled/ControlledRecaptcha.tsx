import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { ForgotForm, Recaptcha, RecaptchaProps } from '@/ui/recaptcha'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'defaultValues' | 'rules'> &
  Omit<RecaptchaProps, 'onChange' | 'value'>

export const ControlledRecaptcha = <T extends FieldValues>({
  control,
  name,
  ...props
}: Props<ForgotForm>) => {
  const {
    field: { ref, ...fieldProps },
  } = useController({
    control,
    name,
  })

  return <Recaptcha {...fieldProps} {...props} />
}
