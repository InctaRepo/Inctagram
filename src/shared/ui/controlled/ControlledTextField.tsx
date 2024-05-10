import { ChangeEvent, useEffect } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/ui/textField'

export type ControlledTextFieldProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> &
    Omit<TextFieldProps, 'id' | 'onChange' | 'value'> & {
      handleAutocompleteOptions?: (value: string) => void
      selectedValue?: string
    }

export const ControlledTextField = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  disabled,
  handleAutocompleteOptions,
  isRequired,
  name,
  rules,
  selectedValue,
  shouldUnregister,
  ...rest
}: ControlledTextFieldProps<TFieldValues>) => {
  const {
    field: { onChange, ...restField },
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    disabled,
    name,
    rules,
    shouldUnregister,
  })

  useEffect(() => {
    if (selectedValue) {
      onChange(selectedValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValue])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (handleAutocompleteOptions) {
      handleAutocompleteOptions(event.target.value)
    }
    onChange(event)
  }

  return (
    <TextField {...restField} {...rest} error={error?.message} id={name} onChange={handleChange} />
  )
}
