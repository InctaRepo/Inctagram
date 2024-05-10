import { ComponentPropsWithoutRef, forwardRef } from 'react'
import * as RDP from 'react-datepicker'
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import { FieldValues } from 'react-hook-form'

import KeyboardArrowLeft from '@/public/icon/chevronLeftIcon.svg'
import KeyboardArrowRight from '@/public/icon/chevronRightIcon.svg'
import { CalendarOutline } from '@/shared/assets/icons/CalendarOutlineIcon'
import { RouteNames } from '@/shared/const'
import { useTranslate } from '@/shared/hooks'
import { Label } from '@/ui/label'
import { Typography } from '@/ui/typography'
import { clsx } from 'clsx'
// eslint-disable-next-line import/no-duplicates
import { format } from 'date-fns'
// eslint-disable-next-line import/no-duplicates
import { enGB, ru } from 'date-fns/locale'
import { useRouter } from 'next/router'

import 'react-datepicker/dist/react-datepicker.min.css'

import s from '@/shared/ui/datePicker/datePicker.module.scss'
import textFieldStyles from '@/ui/textField/textField.module.scss'

export type DatePickerProps = {
  disabled?: boolean
  endDate?: Date | null
  error?: string
  label?: string
  onChange?: (value: Date | Date[] | null) => void
  placeholder?: string
  setEndDate?: (date: Date | null) => void
  setStartDate: (date: Date | null) => void
  startDate: Date | null
} & ComponentPropsWithoutRef<'div'>

const RDPC = (((RDP.default as any).default as any) ||
  (RDP.default as any) ||
  (RDP as any)) as typeof RDP.default

export const DatePicker = forwardRef<FieldValues, DatePickerProps>(
  (
    {
      className,
      disabled,
      endDate,
      error,
      label,
      placeholder,
      setEndDate,
      setStartDate,
      startDate,
      ...rest
    },
    ref
  ) => {
    const isRange = endDate !== undefined

    const showError = !!error && error.length > 0
    const { t } = useTranslate()
    const router = useRouter()

    const classNames = {
      calendar: s.calendar,
      day: () => s.day,
      errorText: s.errorText,
      input: clsx(s.input, textFieldStyles.input, showError && s.error, isRange && s.range),
      inputContainer: s.inputContainer,
      popper: s.popper,
      root: clsx(s.root, className),
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
      error?.includes('A user under 13 cannot create a profile.') ||
      error?.includes('Пользователь младше 13 лет не может создать профиль.')

    return (
      <div className={classNames.root} {...rest}>
        <RDPC
          calendarClassName={classNames.calendar}
          calendarStartDay={1}
          className={classNames.input}
          customInput={<CustomInput disabled={disabled} error={error} label={label} />}
          dateFormat={'dd/MM/yyyy'}
          dayClassName={classNames.day}
          disabled={disabled}
          endDate={endDate}
          formatWeekDay={formatWeekDay}
          locale={router.locale === 'en' ? enGB : ru}
          onChange={DatePickerHandler}
          placeholderText={placeholder}
          popperClassName={classNames.popper}
          popperModifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, -11],
              },
            },
          ]}
          renderCustomHeader={CustomHeaderWrapper(router.locale === 'en' ? enGB : ru)}
          selected={startDate}
          selectsRange={isRange}
          showPopperArrow={false}
          startDate={startDate}
        />
        <div className={s.errorContainer}>
          {showError && (
            <div style={{ display: 'flex' }}>
              <Typography color={'error'} variant={'small'}>
                {t.profileSetting.generalInformation.generalInformationErrors.refine}
              </Typography>
              {isError && (
                <Typography
                  as={'a'}
                  color={'error'}
                  onClick={() => router.replace(RouteNames.PRIVACY_POLICY)}
                  style={{
                    alignItems: 'center',
                    color: '#cc1439',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    marginLeft: '3px',
                    textDecoration: 'underline',
                  }}
                  variant={'small'}
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
  error?: string
  label?: string
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ disabled, error, label, ...rest }, ref) => {
    const classNames = {
      icon: clsx(s.icon, disabled && s.disabled),
      inputContainer: clsx(s.inputContainer, error && s.error),
    }

    return (
      <Label className={s.label} label={label}>
        <span className={s.star}>*</span>
        <div className={classNames.inputContainer}>
          <input disabled={disabled} ref={ref} {...rest} />
          <div className={classNames.icon}>
            <CalendarOutline fill={error ? '#cc1439' : '#fff'} />
          </div>
        </div>
      </Label>
    )
  }
)

// eslint-disable-next-line no-undef
const CustomHeaderWrapper = (locale: Locale) => {
  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
  }: ReactDatePickerCustomHeaderProps) => {
    const classNames = {
      button: s.button,
      buttonBox: s.buttonBox,
      header: s.header,
    }

    const headerText = capitalizeFirstLetter(format(date, 'LLLL y', { locale: locale }))

    return (
      <div className={classNames.header}>
        <Typography>{headerText}</Typography>
        <div className={classNames.buttonBox}>
          <button className={classNames.button} onClick={decreaseMonth} type={'button'}>
            <KeyboardArrowLeft />
          </button>
          <button className={classNames.button} onClick={increaseMonth} type={'button'}>
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
