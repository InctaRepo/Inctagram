import { ComponentProps, useState } from 'react'

import { clsx } from 'clsx'
import DatePicker, { DateObject } from 'react-multi-date-picker'

import { useTranslate } from '@/src/assets/hooks'
import DateIconDefault from '@/src/assets/icons/date-icon-default'
import DateIconFilled from '@/src/assets/icons/date-icon-filled'
import s from '@/src/components/ui/date-picker/date-picker.module.scss'
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css'
import { Typography } from '@/src/components/ui/typography'

/**
 in onChange callback you get DateObject value , you can destruct from object values
 example:
 const { year, month, day, hour, minute } = value
 *
 */

type DatePickPropsType = {
  label?: string
  onChange?: (value: DateObject | DateObject[] | null) => void
  multiple?: boolean
  range?: boolean
  errorMessage?: string
} & ComponentProps<'input'>

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export const DatePick = ({
  errorMessage,
  label,
  multiple,
  onChange,
  range,
  disabled,
  ...rest
}: DatePickPropsType) => {
  const [value, setValue] = useState<DateObject | DateObject[] | null>(
    range
      ? [new DateObject().subtract(4, 'days'), new DateObject().add(4, 'days')]
      : new DateObject()
  )
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const onChangeInput = (value: DateObject | DateObject[] | null) => {
    setValue(value)
    onChange?.(value)
    //TODO validation with react hook form ?
  }

  const isError =
    errorMessage?.includes('A user under 13 cannot create a profile.') ||
    errorMessage?.includes('Пользователь младше 13 лет не может создать профиль.')

  return (
    <>
      <Typography variant={'regular14'} color={'secondary'}>
        {label}
      </Typography>
      <DatePicker
        onOpen={() => setDatePickerOpen(true)}
        onClose={() => setDatePickerOpen(false)}
        hideOnScroll
        className={s.calendar}
        containerClassName={s.container}
        render={
          <DateInput
            datePickerOpen={datePickerOpen}
            range={range}
            errorMessage={errorMessage}
            {...rest}
          />
        }
        weekDays={weekDays}
        weekStartDayIndex={1}
        showOtherDays
        placeholder="00.00.00"
        arrow={false}
        inputClass={s.input}
        range={range}
        rangeHover
        dateSeparator=" - "
        monthYearSeparator=" "
        headerOrder={['MONTH_YEAR', 'LEFT_BUTTON', 'RIGHT_BUTTON']}
        multiple={multiple}
        format={'DD/MM/YYYY'}
        value={value}
        onChange={setValue}
        mapDays={({ date }) => {
          let props = {
            className: '',
          }
          let isWeekend = [6, 0].includes(date.weekDay.index)

          if (isWeekend) props.className = 'weekend'

          return props
        }}
      />
    </>
  )
}

type DateInputPropsType = {
  errorMessage?: string
  range?: boolean
  className?: string
  datePickerOpen: boolean
} & ComponentProps<'input'>
export const DateInput = ({
  onChange,
  disabled,
  range,
  errorMessage,
  className,
  datePickerOpen,
  ...rest
}: DateInputPropsType) => {
  const showError = errorMessage && errorMessage.length > 0
  const classNames = {
    input: clsx(
      s.input,
      className,
      showError && s.error,
      disabled && s.disabled,
      range && s.rangeInput
    ),
  }
  const { t } = useTranslate()
  const isError =
    errorMessage?.includes('A user under 13 cannot create a profile.') ||
    errorMessage?.includes('Пользователь младше 13 лет не может создать профиль.')

  return (
    <>
      <div className={s.inputContainer}>
        <input disabled={disabled} className={classNames.input} onChange={onChange} {...rest} />
        <div className={s.inputIcon}>
          {datePickerOpen ? (
            <DateIconFilled fill={showError ? '#cc1439' : '#fff'} />
          ) : (
            <DateIconDefault fill={showError ? '#cc1439' : '#fff'} />
          )}
        </div>
      </div>
      {showError && (
        <div style={{ display: 'flex' }}>
          <Typography color={'error'} className={s.errorText}>
            {errorMessage}
          </Typography>
          {isError && (
            <Typography
              style={{ textDecoration: 'underline', marginLeft: '3px' }}
              color="error"
              variant="regular16"
              as="a"
              href={`${'https://inctagram.space/api/v1/auth/policy'}?referrer=data-picker`}
            >
              {t.auth.privacyAndTermsPages.titleOfTermsOfService}
            </Typography>
          )}
        </div>
      )}
    </>
  )
}
