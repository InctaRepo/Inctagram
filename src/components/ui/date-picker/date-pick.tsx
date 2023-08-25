import { ChangeEvent, ReactNode, useState } from 'react'

import DatePicker, { DateObject } from 'react-multi-date-picker'

import DateIconDefault from '@/src/assets/icons/date-icon-default'
import s from '@/src/components/ui/date-picker/date-picker.module.scss'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import { Typography } from '@/src/components/ui/typography'

type DatePickPropsType = {
  label?: string
  onChange?: (value: DateObject | DateObject[] | null) => void
  multiple?: boolean
  range?: boolean
  disabled?: boolean
  error?: string
}

const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']

export const DatePick = ({
  error,
  label,
  multiple,
  onChange,
  range,
  disabled,
}: DatePickPropsType) => {
  const [value, setValue] = useState<DateObject>(new DateObject())

  const handleChange = (value: DateObject | DateObject[]) => {
    // console.log(value)
    // console.log(value.year, value.month.name, value.day)
    // console.log(value.format())
    // const { year, month, day, hour, minute } = value
    //
    // console.log(year, 'month: ' + month.name, 'day: ' + day, 'hour: ' + hour, 'minute: ' + minute)
    // setValue(value)
    // onChange?.(value)
  }
  const onChangeInput = (value: any) => {
    console.log(value)
    setValue(value)
    onChange?.(value)
  }

  return (
    <>
      <Typography variant={'regular14'} color={'secondary'}>
        {label}
        {'Date select'}
      </Typography>
      <DatePicker
        render={
          <DateInput
            value={value}
            onChange={onChangeInput}
            onFocus={''}
            disabled={disabled!}
            error={!!error}
          />
        }
        weekDays={weekDays}
        showOtherDays
        arrow={false}
        className={s.calendar}
        containerClassName={s.container}
        inputClass={s.input}
        range={range}
        dateSeparator=" - "
        rangeHover
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        multiple={multiple}
        format={'DD/MM/YYYY'}
        value={value}
        onChange={onChangeInput}
      />
    </>
  )
}
type DateInputPropsType = {
  onFocus: any
  value: any
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
  disabled: boolean
  error: boolean
}
export const DateInput = ({ onFocus, value, onChange, disabled, error }: DateInputPropsType) => {
  const [icon, setIcon] = useState<ReactNode>(<DateIconDefault fill={error ? 'red' : 'white'} />)

  return (
    <div className={s.inputContainer}>
      <input
        disabled={disabled}
        className={s.input}
        onFocus={onFocus}
        value={value}
        onChange={e => onChange(e)}
      />
      <div className={s.inputIcon}>{icon}</div>
    </div>
  )
}
