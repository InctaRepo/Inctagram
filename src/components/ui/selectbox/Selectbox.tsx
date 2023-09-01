import React, { FC, ReactNode, useState } from 'react'

import * as Select from '@radix-ui/react-select'

import styles from './selectbox.module.scss'

import ChevronDown from '@/src/assets/icons/chevron-down'
import { Typography } from '@/src/components/ui/typography'

export type SelectProps = {
  label?: string
  value?: string | number
  placeholder?: ReactNode
  onValueChange?: (value: string | number) => void
  defaultValue?: string | number
  options: string[] | number[]
  disabled?: boolean
  required?: boolean
}

export const SelectBox: FC<SelectProps> = ({
  defaultValue,
  options,
  onValueChange,
  disabled,
  required,
  placeholder,
  label,
}) => {
  const [value, setValue] = useState(defaultValue ? defaultValue.toString() : '')

  const s = {
    label: styles.label,
    selectBox: styles.selectBox,
    selectIcon: styles.selectIcon,
    selectContent: styles.selectContent,
    line: styles.line,
  }
  const onChangeHandler = (newValue: string) => {
    setValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <Select.Root
      defaultValue={value}
      value={value}
      onValueChange={onChangeHandler}
      disabled={disabled}
      required={required}
    >
      {label ? (
        <Typography variant={'regular14'} color="secondary" className={s.label}>
          {label}
        </Typography>
      ) : (
        ''
      )}
      <Select.Trigger asChild className={s.selectBox} tabIndex={1}>
        <div>
          <Select.Value placeholder={placeholder} aria-label={value}>
            {value}
          </Select.Value>
          <Select.Icon asChild className={s.selectIcon}>
            <ChevronDown />
          </Select.Icon>
        </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content position={'popper'} className={s.selectContent}>
          <Select.Viewport>
            {options?.map((el, idx) => (
              <Select.Item value={el.toString()} key={idx} className={s.line}>
                <Select.ItemText>{el}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
