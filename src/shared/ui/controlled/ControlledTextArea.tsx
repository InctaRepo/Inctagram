import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextAreaField, TextAreaFieldProps } from '@/ui/textAreaField'

export type ControlledTextAreaProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<TextAreaFieldProps, 'id' | 'onChange' | 'value'>

export const ControlledTextArea = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  variant,
  ...rest
}: ControlledTextAreaProps<TFieldValues>) => {
  const {
    field: { onChange, ...fieldProps },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <TextAreaField
      {...fieldProps}
      {...rest}
      error={error?.message}
      id={name}
      setValue={onChange}
      variant={variant}
    />
  )
}
