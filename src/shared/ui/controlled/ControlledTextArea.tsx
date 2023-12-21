import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextAreaField, TTextAreaProps } from '@/src/shared/ui/textAreaField'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<TTextAreaProps, 'onChange' | 'value'>

export const ControlledTextArea = <T extends FieldValues>({
  name,
  control,
  variant,
  ...rest
}: Props<T>) => {
  const {
    fieldState: { error },
    field: { ref, onChange, ...fieldProps },
  } = useController({
    name,
    control,
  })

  return (
    <TextAreaField
      variant={variant}
      validationError={error}
      onChange={onChange}
      {...fieldProps}
      {...rest}
    />
  )
}
