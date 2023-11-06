import { ComponentProps, useState, forwardRef } from 'react'

import { clsx } from 'clsx'
import 'react-datepicker/dist/react-datepicker.min.css'
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns'
// eslint-disable-next-line import/no-duplicates
import { enGB, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import * as RDP from 'react-datepicker'
import { FieldValues } from 'react-hook-form'

import { useTranslate } from '@/src/assets/hooks'
import { CalendarOutline } from '@/src/assets/icons/calendar-outline'
import KeyboardArrowLeft from '@/src/assets/icons/key-board-arrow-left'
import KeyboardArrowRight from '@/src/assets/icons/key-board-arrow-right'
import s from '@/src/components/ui/date-picker/date-picker.module.scss'
import { Label } from '@/src/components/ui/label/label'
import textFieldStyles from '@/src/components/ui/text-field/text-field.module.scss'
import { Typography } from '@/src/components/ui/typography'

export type DatePickerProps = {
  disabled?: boolean
  onChange?: (value: Date | Date[] | null) => void
  endDate?: Date | null
  errorMessage?: string
  label?: string
  placeholder?: string
  setEndDate?: (date: Date | null) => void
  setStartDate: (date: Date | null) => void
  startDate: Date | null
} & ComponentProps<'div'>

const RDPC = (((RDP.default as any).default as any) ||
  (RDP.default as any) ||
  (RDP as any)) as typeof RDP.default

export const DatePicker = forwardRef<FieldValues, DatePickerProps>(
  ({
    className,
    disabled,
    endDate,
    errorMessage,
    label,
    placeholder,
    setEndDate,
    setStartDate,
    startDate,
    ...rest
  }) => {
    const isRange = endDate !== undefined

    const showError = !!errorMessage && errorMessage.length > 0
    const { t } = useTranslate()
    const router = useRouter()

    const classNames = {
      root: clsx(s.root, className),
      inputContainer: s.inputContainer,
      input: clsx(s.input, textFieldStyles.input, showError && s.error, isRange && s.range),
      calendar: s.calendar,
      popper: s.popper,
      errorText: s.errorText,
      day: () => s.day,
    }

    const DatePickerHandler = (dates: [Date | null, Date | null] | Date) => {
      if (Array.isArray(dates)) {
        const [start, end] = dates

        setStartDate(start)
        setEndDate?.(end)
      } else {
        setStartDate(dates)
      }
    }
    const isError =
      errorMessage?.includes('A user under 13 cannot create a profile.') ||
      errorMessage?.includes('Пользователь младше 13 лет не может создать профиль.')

    return (
      <div className={classNames.root} {...rest}>
        <RDPC
          startDate={startDate}
          endDate={endDate}
          onChange={DatePickerHandler}
          selected={startDate}
          selectsRange={isRange}
          formatWeekDay={formatWeekDay}
          placeholderText={placeholder}
          renderCustomHeader={CustomHeaderWrapper(router.locale === 'en' ? enGB : ru)}
          customInput={<CustomInput error={errorMessage} disabled={disabled} label={label} />}
          calendarClassName={classNames.calendar}
          className={classNames.input}
          popperClassName={classNames.popper}
          dayClassName={classNames.day}
          locale={router.locale === 'en' ? enGB : ru}
          dateFormat="dd/MM/yyyy"
          showPopperArrow={false}
          calendarStartDay={1}
          disabled={disabled}
          popperModifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, -11],
              },
            },
          ]}
        />
        <div className={s.errorContainer}>
          {showError && (
            <div style={{ display: 'flex' }}>
              <Typography color="error" variant="small">
                {t.profile.profileSetting.profileSettingsErrors.refine}
              </Typography>
              {isError && (
                <Typography
                  style={{
                    textDecoration: 'underline',
                    marginLeft: '3px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: '#cc1439',
                    cursor: 'pointer',
                  }}
                  color="error"
                  variant="small"
                  as="a"
                  onClick={() => router.replace('/auth/privacy-policy')}
                >
                  {t.auth.privacyAndTermsPages.titleOfPrivacyPolicy}
                </Typography>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)

type CustomInputProps = {
  disabled?: boolean
  label?: string
  error?: string
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ disabled, error, label, ...rest }, ref) => {
    const classNames = {
      icon: clsx(s.icon, disabled && s.disabled),
      inputContainer: clsx(s.inputContainer, error && s.error),
    }

    return (
      <Label className={s.label} label={label}>
        <div className={classNames.inputContainer}>
          <input ref={ref} disabled={disabled} {...rest} />
          <div className={classNames.icon}>
            <CalendarOutline fill={error ? '#cc1439' : '#fff'} />
          </div>
        </div>
      </Label>
    )
  }
)

const CustomHeaderWrapper = (locale: Locale) => {
  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
  }: ReactDatePickerCustomHeaderProps) => {
    const classNames = {
      header: s.header,
      buttonBox: s.buttonBox,
      button: s.button,
    }

    const headerText = capitalizeFirstLetter(format(date, 'LLLL Y', { locale: locale }))

    return (
      <div className={classNames.header}>
        <Typography>{headerText}</Typography>
        <div className={classNames.buttonBox}>
          <button className={classNames.button} type="button" onClick={decreaseMonth}>
            <KeyboardArrowLeft />
          </button>

          <button className={classNames.button} onClick={increaseMonth}>
            <KeyboardArrowRight />
          </button>
        </div>
      </div>
    )
  }

  return CustomHeader
}
const regExp = /о|е|у|я|\$/g
const formatWeekDay = (day: string) =>
  capitalizeFirstLetter(day.replace(regExp, '').substring(0, 2))

const capitalizeFirstLetter = (text: string) => {
  return text[0].toUpperCase() + text.slice(1)
}
