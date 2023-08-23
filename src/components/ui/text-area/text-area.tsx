import { ComponentPropsWithoutRef, ElementType } from 'react'

import clsx from 'clsx'

import s from './text-area.module.scss'

import { Typography } from '@/src/components/ui/typography'

export type TextAreaProps<T extends ElementType = 'textarea'> = {
  as?: T
  label?: string
  fullWidth?: boolean
  className?: string
  errorMessage?: string
  placeholder?: string
  disabled?: boolean
} & ComponentPropsWithoutRef<T>

export const TextAreaField = <T extends ElementType = 'textarea'>(
  props: TextAreaProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextAreaProps<T>>
) => {
  const {
    as: Component = 'textarea',
    label,
    fullWidth,
    className,
    errorMessage,
    placeholder,
    disabled,
    children,
    ...rest
  } = props

  const classNames = {
    textAreaContainer: clsx(className, s.container),
    label: clsx(s.label, disabled && s.disabled),
    textArea: clsx(s.textarea, errorMessage && s.error, fullWidth && s.fullWidth),
  }

  return (
    <div className={classNames.textAreaContainer}>
      <Typography variant="regular14" color="secondary" className={classNames.label}>
        {label}
      </Typography>
      <textarea
        placeholder={placeholder}
        className={classNames.textArea}
        disabled={disabled}
        {...rest}
      />
      <Typography variant="regular14" color="error" className={s.errorMessage}>
        {errorMessage}
      </Typography>
    </div>
  )
}
