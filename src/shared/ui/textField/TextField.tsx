import React, { ComponentProps } from 'react'

import { InputMain } from '@/ui/textField/inputMain'

import s from '@/ui/textField/textField.module.scss'

export type TextFieldProps = {
  className?: string
  errorMessage?: string
  fullWidth?: boolean
  isRequired?: boolean
  label?: string
  onChangeText?: (value: string) => void
  value?: string
} & ComponentProps<'input'>

export const TextField = ({
  className,
  errorMessage,
  fullWidth,
  isRequired,
  value,
  ...restProps
}: TextFieldProps) => {
  return (
    <div className={`${className} ${fullWidth ? s.fullWidth : ''}`}>
      <InputMain
        errorMessage={errorMessage}
        {...restProps}
        isRequired={isRequired}
        value={value ?? ''}
      />
    </div>
  )
}
