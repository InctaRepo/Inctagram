import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/ui/checkbox'

export type ControlledCheckboxProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<CheckboxProps, 'checked' | 'id' | 'onChange'>

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
    field: { value, ...field },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  return <Checkbox {...rest} {...field} checked={value} error={error?.message} id={name} />
}
