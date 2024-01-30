import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/ui/checkbox'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<CheckboxProps, 'onChange' | 'checked'>

export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  ...rest
}: Props<T>) => {
  const {
    fieldState: { error },
    field: { value, onChange: onChange },
  } = useController({
    name,
    control,
    shouldUnregister,
  })
  const handleChange = onChange as (value: boolean) => void

  return <Checkbox checked={value} onChange={handleChange} error={error?.message} {...rest} />
}
