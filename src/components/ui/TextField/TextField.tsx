import React, { ComponentProps } from 'react'

import s from './textField.module.scss'
import { UIInput } from './UIInput/UIInput'

export type TextFieldPropsType = {
  errorMessage?: string
  label?: string
  fullWidth?: boolean
  className?: string
  value?: string
  onChangeText?: (value: string) => void
} & ComponentProps<'input'>

export const TextField: React.FC<TextFieldPropsType> = ({
  value,
  errorMessage,
  className,
  fullWidth,
  ...restProps
}) => {
  return (
    <div className={`${className} ${fullWidth ? s.fullWidth : ''}`}>
      <UIInput errorMessage={errorMessage} {...restProps} value={value ?? ''} />
    </div>
  )
}
