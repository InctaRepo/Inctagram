import React, { ComponentProps } from 'react'

import { InputMain } from '@/src/shared/ui/textField/inputMain'
import s from '@/src/shared/ui/textField/textField.module.scss'

export type TextFieldProps = {
  errorMessage?: string
  label?: string
  fullWidth?: boolean
  className?: string
  value?: string
  onChangeText?: (value: string) => void
  isRequired?: boolean
} & ComponentProps<'input'>

export const TextField = ({
  value,
  errorMessage,
  className,
  fullWidth,
  isRequired,
  ...restProps
}: TextFieldProps) => {
  return (
    <div className={`${className} ${fullWidth ? s.fullWidth : ''}`}>
      <InputMain
        errorMessage={errorMessage}
        {...restProps}
        value={value ?? ''}
        isRequired={isRequired}
      />
    </div>
  )
}
