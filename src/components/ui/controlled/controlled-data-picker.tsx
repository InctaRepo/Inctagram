import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { DatePicker, DatePickerProps } from '@/src/components/ui/date-picker/date-picker'

export type ControlledDataPickerProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<DatePickerProps, 'ref' | 'startDate' | 'setStartDate'>

export const ControlledDatePick = <T extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  control,
  defaultValue,
  ...rest
}: ControlledDataPickerProps<T>) => {
  const {
    field: { onChange, value, ...restField },
  } = useController({
    name,
    rules,
    shouldUnregister,
    control,
    defaultValue,
  })

  return (
    <div>
      <DatePicker
        errorMessage={rest.errorMessage}
        setStartDate={onChange}
        startDate={value}
        {...restField}
        {...rest}
      />
    </div>
  )
}
