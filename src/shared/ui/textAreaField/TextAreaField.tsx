import React, { ComponentProps, ElementType } from 'react'
import { FieldError } from 'react-hook-form'

import { Typography } from '@/ui/typography'
import clsx from 'clsx'

import s from '@/ui/textAreaField/textAreaField.module.scss'

export type TTextAreaProps<T extends ElementType = 'textarea'> = {
  as?: T
  className?: string
  disabled?: boolean
  errorMessage?: string | undefined
  fullWidth?: boolean
  label?: string
  maxLength?: number
  onChange?: (s: string) => void
  placeholder?: string
  setValue?: (value: string) => void
  validationError?: FieldError | undefined
  variant?: string
} & ComponentProps<T>

export const TextAreaField = <T extends ElementType = 'textarea'>(
  props: TTextAreaProps<T> & Omit<ComponentProps<T>, keyof TTextAreaProps<T>>
) => {
  const {
    as: Component = 'textarea',
    className,
    disabled,
    errorMessage,
    fullWidth,
    label,
    maxLength,
    onChange,
    placeholder,
    setValue,
    validationError,
    variant,
    ...rest
  } = props

  const classNames = {
    label: clsx(s.label, disabled && s.disabled),
    textArea: clsx(
      s.textarea,
      (errorMessage || validationError) && s.error,
      fullWidth && s.fullWidth
    ),
    textAreaComment: clsx(className, s.textAreaComment),
    textAreaContainer: clsx(className, s.container),
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange && onChange(e.target.value)
    setValue && setValue(e.target.value)
  }

  return (
    <div className={classNames.textAreaContainer}>
      <Typography className={classNames.label} color={'secondary'} variant={'regular14'}>
        {label}
      </Typography>
      <textarea
        className={variant === 'comment' ? classNames.textAreaComment : classNames.textArea}
        disabled={disabled}
        maxLength={maxLength}
        onChange={handleChange}
        placeholder={placeholder}
        {...rest}
      />
      <Typography className={s.errorMessage} color={'error'} variant={'regular14'}>
        {errorMessage || validationError?.message}
      </Typography>
    </div>
  )
}
