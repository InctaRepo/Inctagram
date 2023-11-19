import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import { TextField, TextFieldProps } from '../textField'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<TextFieldProps, 'onChange' | 'value'>

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  isRequired,
  ...rest
}: Props<T>) => {
  const {
    fieldState: { error },
    field: { ref, ...fieldProps },
  } = useController({
    name,
    control,
  })

  return (
    <TextField {...fieldProps} errorMessage={error?.message} {...rest} isRequired={isRequired} />
  )
}
