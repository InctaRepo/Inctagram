import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { SelectBox, SelectProps } from '@/ui/selectBox'

export type ControlledSelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<SelectProps, 'onChange' | 'value'>

export const ControlledSelect = <T extends FieldValues>({
  control,
  defaultValue,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledSelectProps<T>) => {
  const {
    field: { onBlur, onChange, ref, value, ...restField },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  })

  return (
    <SelectBox
      defaultValue={value ? value : defaultValue}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      {...restField}
      {...rest}
    />
  )
}
