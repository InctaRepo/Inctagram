import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { RadioButton, RadioButtonProps } from '@/ui/radioButton'

type Props<TFieldValues extends FieldValues> = UseControllerProps<TFieldValues> &
  Omit<RadioButtonProps, 'id' | 'onChange' | 'value'>

export const ControlledRadioButton = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: Props<TFieldValues>) => {
  const {
    field: { onChange, ...field },
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
    <RadioButton {...field} error={error?.message} id={name} onValueChange={onChange} {...rest} />
  )
}
