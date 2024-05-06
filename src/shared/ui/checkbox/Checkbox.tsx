import React, { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef, memo } from 'react'

import { CheckIcon } from '@/shared/assets/icons/CheckIcon'
import { Typography } from '@/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import clsx from 'clsx'

import s from '@/shared/ui/checkbox/checkbox.module.scss'

export type CheckboxProps = {
  className?: string
  disabled?: boolean
  error?: string
  id?: string
  label?: ReactNode | string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = memo(
  forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
    ({ checked, className, disabled, error, id, label, onChange, required, ...rest }, ref) => {
      const classNames = {
        buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
        checkbox: clsx(s.checkbox, checked && s.checked, disabled && s.disabled),
        container: clsx(s.container, className),
        indicator: clsx(s.indicator, disabled && s.disabled),
        label: clsx(s.label, disabled && s.disabled),
      }

      return (
        <div className={s.wrapper}>
          <LabelRadix.Root asChild>
            <Typography as={'label'} className={classNames.label} variant={'bold14'}>
              <div className={classNames.buttonWrapper}>
                <CheckboxRadix.Root
                  className={classNames.checkbox}
                  // onCheckedChange={onChange}
                  ref={ref}
                  {...rest}
                >
                  {checked && (
                    <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
                      <CheckIcon color={disabled ? '#D5DAE0' : 'black'} />
                    </CheckboxRadix.Indicator>
                  )}
                </CheckboxRadix.Root>
              </div>
              {label}
            </Typography>
          </LabelRadix.Root>
          {error && (
            <Typography className={s.error} color={'error'} variant={'regular14'}>
              {error}
            </Typography>
          )}
        </div>
      )
    }
  )
)
