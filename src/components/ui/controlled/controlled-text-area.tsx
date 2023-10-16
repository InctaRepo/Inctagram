import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextAreaField, TTextAreaProps } from '@/src/components/ui/text-area/text-area'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<TTextAreaProps, 'onChange' | 'value'>

export const ControlledTextArea = <T extends FieldValues>({ name, control, ...rest }: Props<T>) => {
  const {
    fieldState: { error },
    field: { ref, onChange, ...fieldProps },
  } = useController({
    name,
    control,
  })

  return <TextAreaField validationError={error} {...fieldProps} {...rest} onChange={onChange} />
}
