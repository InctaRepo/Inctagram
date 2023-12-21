import React, { ComponentProps, ElementType } from 'react'

import clsx from 'clsx'
import { FieldError } from 'react-hook-form'

import s from './textAreaField.module.scss'

import { Typography } from '@/src/shared/ui/typography'

export type TTextAreaProps<T extends ElementType = 'textarea'> = {
  as?: T
  label?: string
  fullWidth?: boolean
  className?: string
  errorMessage?: string | undefined
  validationError?: FieldError | undefined
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  onChange?: (s: string) => void
  setValue?: (value: string) => void
  variant?: string
} & ComponentProps<T>

export const TextAreaField = <T extends ElementType = 'textarea'>(
  props: TTextAreaProps<T> & Omit<ComponentProps<T>, keyof TTextAreaProps<T>>
) => {
  const {
    as: Component = 'textarea',
    variant,
    label,
    fullWidth,
    className,
    errorMessage,
    validationError,
    placeholder,
    disabled,
    maxLength,
    onChange,
    setValue,
    ...rest
  } = props

  const classNames = {
    textAreaContainer: clsx(className, s.container),
    label: clsx(s.label, disabled && s.disabled),
    textArea: clsx(
      s.textarea,
      (errorMessage || validationError) && s.error,
      fullWidth && s.fullWidth
    ),
    textAreaComment: clsx(className, s.textAreaComment),
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e.target.value)
    setValue(e.target.value)
  }

  return (
    <div className={classNames.textAreaContainer}>
      <Typography variant="regular14" color="secondary" className={classNames.label}>
        {label}
      </Typography>
      <textarea
        placeholder={placeholder}
        className={variant === 'comment' ? classNames.textAreaComment : classNames.textArea}
        disabled={disabled}
        onChange={handleChange}
        maxLength={maxLength}
        {...rest}
      />
      <Typography variant="regular14" color="error" className={s.errorMessage}>
        {errorMessage || validationError?.message}
      </Typography>
    </div>
  )
}
