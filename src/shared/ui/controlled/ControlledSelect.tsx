import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Select, SelectProps } from '@/ui/select'

export type ControlledSelectProps<TFieldValues extends FieldValues> = Omit<
  SelectProps,
  'id' | 'onChange' | 'value'
> &
  UseControllerProps<TFieldValues>

export const ControlledSelect = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledSelectProps<TFieldValues>) => {
  const {
    field: { onChange, value, ...restField },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return <Select {...restField} {...rest} error={error?.message} id={name} />
}
