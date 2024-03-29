import React, { ReactNode } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import clsx from 'clsx'

import { CheckIcon } from '@/shared/assets/icons/CheckIcon'
import s from '@/shared/ui/checkbox/checkbox.module.scss'
import { Typography } from '@/ui/typography'

export type CheckboxProps = {
  error?: string
  checked: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: string | ReactNode
}

export const Checkbox = ({ error, checked, onChange, disabled, label }: CheckboxProps) => {
  const classNames = {
    container: s.container,
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
    checkbox: clsx(s.checkbox, checked && s.checked, disabled && s.disabled),
    indicator: clsx(s.indicator, disabled && s.disabled),
    label: clsx(s.label, disabled && s.disabled),
  }

  return (
    <div className={s.wrapper}>
      <LabelRadix.Root className={classNames.label}>
        <div className={classNames.buttonWrapper}>
          <CheckboxRadix.Root
            className={classNames.checkbox}
            checked={checked!}
            onCheckedChange={onChange!}
            disabled={disabled}
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
        <Typography variant={'regular14'} className={s.error} color={'error'}>
          {error}
        </Typography>
      )}
    </div>
  )
}
