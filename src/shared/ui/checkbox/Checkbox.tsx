import React, { ReactNode } from 'react'

import { CheckIcon } from '@/shared/assets/icons/CheckIcon'
import { Typography } from '@/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import clsx from 'clsx'

import s from '@/shared/ui/checkbox/checkbox.module.scss'

export type CheckboxProps = {
  checked: boolean
  disabled?: boolean
  error?: string
  label?: ReactNode | string
  onChange?: (checked: boolean) => void
}

export const Checkbox = ({ checked, disabled, error, label, onChange }: CheckboxProps) => {
  const classNames = {
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
    checkbox: clsx(s.checkbox, checked && s.checked, disabled && s.disabled),
    container: s.container,
    indicator: clsx(s.indicator, disabled && s.disabled),
    label: clsx(s.label, disabled && s.disabled),
  }

  return (
    <div className={s.wrapper}>
      <LabelRadix.Root className={classNames.label}>
        <div className={classNames.buttonWrapper}>
          <CheckboxRadix.Root
            checked={checked!}
            className={classNames.checkbox}
            disabled={disabled}
            onCheckedChange={onChange!}
          >
            {checked && (
              <CheckboxRadix.Indicator className={classNames.indicator}>
                <CheckIcon color={disabled ? '#D5DAE0' : 'black'} />
              </CheckboxRadix.Indicator>
            )}
          </CheckboxRadix.Root>
        </div>
        {label}
      </LabelRadix.Root>
      {error && (
        <Typography className={s.error} color={'error'} variant={'regular14'}>
          {error}
        </Typography>
      )}
    </div>
  )
}
