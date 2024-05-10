import React, { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef, memo } from 'react'

import CheckIcon from '@/public/icon/checkIcon.svg'
import { Typography } from '@/ui/typography'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import clsx from 'clsx'

import s from '@/shared/ui/checkbox/checkbox.module.scss'

export type CheckboxProps = {
  children?: ReactNode
  className?: string
  error?: string
  id?: string
  label?: ReactNode | string
} & ComponentPropsWithoutRef<typeof CheckboxRadix.Root>

export const Checkbox = memo(
  forwardRef<ElementRef<typeof CheckboxRadix.Root>, CheckboxProps>(
    (
      { checked, className, disabled, error, id, label, onCheckedChange, required, ...rest },
      ref
    ) => {
      const classNames = {
        buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
        checkIcon: clsx(s.checkIcon),
        checkbox: clsx(s.checkbox, disabled && s.disabled),
        container: clsx(s.container, className),
        error: clsx(error && s.error),
        indicator: clsx(s.indicator, disabled && s.disabled),
        label: clsx(s.label, disabled && s.disabled),
      }

      return (
        <div className={s.wrapper}>
          <LabelRadix.Root className={s.root}>
            <Typography as={'label'} className={classNames.label} variant={'bold14'}>
              <div className={classNames.buttonWrapper}>
                <CheckboxRadix.Root
                  checked={checked}
                  className={classNames.checkbox}
                  disabled={disabled}
                  onCheckedChange={onCheckedChange}
                  ref={ref}
                  {...rest}
                >
                  <CheckboxRadix.Indicator className={classNames.indicator} forceMount>
                    <CheckIcon className={classNames.checkIcon} />
                  </CheckboxRadix.Indicator>
                </CheckboxRadix.Root>
              </div>
              {label}
            </Typography>
          </LabelRadix.Root>
          {error && (
            <Typography className={classNames.error} variant={'regular14'}>
              {error}
            </Typography>
          )}
        </div>
      )
    }
  )
)
