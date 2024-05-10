import React, { ChangeEvent, ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/ui/typography'
import clsx from 'clsx'

import s from '@/ui/textAreaField/textAreaField.module.scss'

export type TextAreaFieldProps = {
  className?: string
  error?: string
  fullWidth?: boolean
  id?: string
  label?: string
  setValue?: (value: string) => void
  variant?: string
} & ComponentPropsWithoutRef<'textarea'>

export const TextAreaField = forwardRef<ElementRef<'textarea'>, TextAreaFieldProps>(
  ({ className, disabled, error, fullWidth, label, onChange, setValue, variant, ...rest }, ref) => {
    const classNames = {
      label: clsx(s.label, disabled && s.disabled),
      textArea: clsx(s.textarea, error && s.error, fullWidth && s.fullWidth),
      textAreaComment: clsx(className, s.textAreaComment),
      textAreaContainer: clsx(className, s.container),
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setValue?.(e.target.value)
    }

    return (
      <div className={classNames.textAreaContainer}>
        <Typography className={classNames.label} color={'secondary'} variant={'regular14'}>
          {label}
        </Typography>
        <textarea
          className={variant === 'comment' ? classNames.textAreaComment : classNames.textArea}
          onChange={handleChange}
          {...rest}
        />
        <Typography className={s.errorMessage} color={'error'} variant={'regular14'}>
          {error}
        </Typography>
      </div>
    )
  }
)
