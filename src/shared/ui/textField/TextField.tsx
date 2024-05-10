import React, { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { InputMain } from '@/ui/textField/inputMain'

import s from '@/ui/textField/textField.module.scss'

export type TextFieldProps = {
  className?: string
  fullWidth?: boolean
  id?: string
} & ComponentPropsWithoutRef<typeof InputMain>
// ComponentProps<'input'>

export const TextField = forwardRef<ElementRef<typeof InputMain>, TextFieldProps>(
  ({ className, fullWidth, value, ...restProps }, ref) => {
    return (
      <div className={`${className} ${fullWidth ? s.fullWidth : ''}`}>
        <InputMain {...restProps} ref={ref} value={value ?? ''} />
      </div>
    )
  }
)
