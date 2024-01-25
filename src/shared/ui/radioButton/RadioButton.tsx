import React, { FC, ReactNode } from 'react'

// import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import * as RadioGroup from '@radix-ui/react-radio-group'
import clsx from 'clsx'

import s from '@/src/shared/ui/radioButton/radioButton.module.scss'
import { Typography } from '@/src/shared/ui/typography'

export type RadioButtonPropsType = {
  error?: string
  value?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  label?: string | ReactNode
}

export const RadioButton: FC<RadioButtonPropsType> = ({
  error,
  value,
  onValueChange,
  disabled,
  label,
}) => {
  const classNames = {
    container: s.container,
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
    // checkbox: clsx(s.checkbox, checked && s.checked, disabled && s.disabled),
    indicator: clsx(s.indicator, disabled && s.disabled),
    label: clsx(s.label, disabled && s.disabled),
  }

  return (
    <div className={s.wrapper}>
      {/*<LabelRadix.Root className={classNames.label}>*/}
      <div className={classNames.buttonWrapper}>
        <RadioGroup.Root className={s.radioGroupRoot}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <RadioGroup.Item className={s.radioGroupItem} value={value!}>
              <RadioGroup.Indicator
                // className={s.RadioGroupIndicator}
                color={disabled ? '#D5DAE0' : 'black'}
              />
            </RadioGroup.Item>
            <LabelRadix.Root className={classNames.label}>{label}</LabelRadix.Root>
          </div>
        </RadioGroup.Root>
        {/*  <CheckboxRadix.Root*/}
        {/*    className={classNames.checkbox}*/}
        {/*    checked={checked!}*/}
        {/*    onCheckedChange={onChange!}*/}
        {/*    disabled={disabled}*/}
        {/*  >*/}
        {/*    {checked && (*/}
        {/*      <CheckboxRadix.Indicator className={classNames.indicator}>*/}
        {/*        <CheckIcon color={disabled ? '#D5DAE0' : 'black'} />*/}
        {/*      </CheckboxRadix.Indicator>*/}
        {/*    )}*/}
        {/*  </CheckboxRadix.Root>*/}
      </div>
      {/*{label}*/}
      {/*</LabelRadix.Root>*/}
      {error && (
        <Typography variant={'regular14'} className={s.error} color={'error'}>
          {error}
        </Typography>
      )}
    </div>
  )
}
