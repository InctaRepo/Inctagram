import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Recaptcha, RecaptchaProps } from '@/src/components/ui/recaptcha'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<RecaptchaProps, 'onChange' | 'value'>

export const ControlledRecaptcha = <T extends FieldValues>({
  control,
  name,
  ...props
}: Props<T>) => {
  const {
    fieldState: { error },
    field: { ref, ...fieldProps },
  } = useController({
    name,
    control,
  })

  return <Recaptcha {...fieldProps} errors={error} {...props} />
}
