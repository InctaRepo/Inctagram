import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { RadioButton, RadioButtonProps } from '@/ui/radioButton'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<RadioButtonProps, 'id' | 'onChange' | 'value'>

export const ControlledRadioButton = <T extends FieldValues>({
  control,
  name,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, ...field },
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return (
    <RadioButton {...field} error={error?.message} id={name} onValueChange={onChange} {...rest} />
  )
}
