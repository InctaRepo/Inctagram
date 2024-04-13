import { ChangeEvent, useEffect } from 'react'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TextField, TextFieldProps } from '@/ui/textField'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'defaultValues' | 'rules'> &
  Omit<TextFieldProps, 'onChange' | 'value'> & {
    handleAutocompleteOptions?: (value: string) => void
    selectedValue?: string
  }

export const ControlledTextField = <T extends FieldValues>({
  control,
  handleAutocompleteOptions,
  isRequired,
  name,
  selectedValue,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, ref, ...fieldProps },
    fieldState: { error },
  } = useController({
    control,
    name,
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
    <TextField
      {...fieldProps}
      errorMessage={error?.message}
      onChange={handleChange}
      {...rest}
      isRequired={isRequired}
    />
  )
}
