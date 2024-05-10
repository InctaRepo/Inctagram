import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Recaptcha, RecaptchaProps } from '@/ui/recaptcha'

export type ControlledRecaptchaProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<RecaptchaProps, 'id' | 'onChange' | 'value'>

export const ControlledRecaptcha = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledRecaptchaProps<TFieldValues>) => {
  const {
    field: { ...fieldProps },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return <Recaptcha {...fieldProps} {...rest} error={error?.message} id={name} />
}
