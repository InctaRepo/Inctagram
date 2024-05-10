import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { DatePicker, DatePickerProps } from '@/ui/datePicker'

export type ControlledDataPickerProps<TFieldValues extends FieldValues> = Omit<
  DatePickerProps,
  'ref' | 'setStartDate' | 'startDate'
> &
  UseControllerProps<TFieldValues>

export const ControlledDatePicker = <TFieldValues extends FieldValues>({
  control,
  defaultValue,
  disabled,
  name,
  rules,
  shouldUnregister,
  ...rest
}: ControlledDataPickerProps<TFieldValues>) => {
  const {
    field: { onChange, value, ...restField },
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
    <div>
      <DatePicker
        {...restField}
        {...rest}
        error={error?.message}
        id={name}
        setStartDate={onChange}
        startDate={value}
      />
    </div>
  )
}
