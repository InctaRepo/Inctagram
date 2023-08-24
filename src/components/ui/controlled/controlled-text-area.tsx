import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { TextAreaField, TTextAreaProps } from '@/src/components/ui/text-area/text-area'

type Props<T extends FieldValues> = Omit<UseControllerProps<T>, 'rules' | 'defaultValues'> &
  Omit<TTextAreaProps, 'onChange' | 'value'>

export const ControlledTextArea = <T extends FieldValues>({ control, name, ...rest }: Props<T>) => {
  const {
    fieldState: { error },
    field: { ref, ...fieldProps },
  } = useController({
    name,
    control,
  })

  return <TextAreaField {...fieldProps} errorMessage={error?.message} {...rest} />
}
