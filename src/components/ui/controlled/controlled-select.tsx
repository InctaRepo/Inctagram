import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { SelectBox, SelectProps } from '@/src/components/ui/select-box'

export type ControlledSelectProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<SelectProps, 'onChange' | 'value'>

export const ControlledSelect = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  ...rest
}: ControlledSelectProps<T>) => {
  const {
    field: { value, onBlur, onChange, ...restField },
    fieldState: { error },
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return (
    <SelectBox
      defaultValue={value ? value : defaultValue}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
      {...restField}
      {...rest}
    />
  )
}
