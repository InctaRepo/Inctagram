import { ChangeEvent, useEffect } from 'react'

import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/ui/textField'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<TextFieldProps, 'onChange' | 'value'> & {
    handleAutocompleteOptions?: (value: string) => void
    selectedValue?: string
  }

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  isRequired,
  handleAutocompleteOptions,
  selectedValue,
  ...rest
}: Props<T>) => {
  const {
    fieldState: { error },
    field: { ref, onChange, ...fieldProps },
  } = useController({
    name,
    control,
  })

  useEffect(() => {
    if (selectedValue) {
      onChange(selectedValue)
    }
  }, [selectedValue])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (handleAutocompleteOptions) {
      handleAutocompleteOptions(event.target.value)
    }
    onChange(event)
  }

  return (
    <TextField
      {...fieldProps}
      onChange={handleChange}
      errorMessage={error?.message}
      {...rest}
      isRequired={isRequired}
    />
  )
}
