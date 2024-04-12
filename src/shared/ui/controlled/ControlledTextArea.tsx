import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { TTextAreaProps, TextAreaField } from '@/ui/textAreaField'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'defaultValues' | 'rules'> &
  Omit<TTextAreaProps, 'onChange' | 'value'>

export const ControlledTextArea = <T extends FieldValues>({
  control,
  name,
  variant,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, ref, ...fieldProps },
    fieldState: { error },
  } = useController({
    control,
    name,
  })

  return (
    <TextAreaField
      onChange={onChange}
      validationError={error}
      variant={variant}
      {...fieldProps}
      {...rest}
    />
  )
}
