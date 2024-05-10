import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/ui/checkbox'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> = Omit<
  CheckboxProps,
  'checked' | 'id' | 'onChange'
> &
  UseControllerProps<TFieldValues>

export const ControlledCheckbox = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledCheckboxProps<TFieldValues>) => {
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

  return (
    <Checkbox
      {...rest}
      {...restField}
      checked={value}
      error={error?.message}
      id={name}
      onCheckedChange={onChange}
    />
  )
}
