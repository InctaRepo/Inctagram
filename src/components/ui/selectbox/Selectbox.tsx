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
  options: Array<{ label: string; value: string }> | Array<{ label: string; value: number }>
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
  const [value, setValue] = useState('select-box')

  const classNames = {
    label: styles.label,
    selectBox: styles.selectBox,
    selectIcon: styles.selectIcon,
    selectContent: styles.selectContent,
    line: styles.line,
  }

  return (
    <Typography variant={'regular14'}>
      {/*<Typography variant={'regular14'} color="secondary" className={classNames.label}>*/}
      {/*  Select-box*/}
      {/*</Typography>*/}
      <Select.Root
        defaultValue={value}
        value={value}
        onValueChange={setValue}
        disabled={disabled}
        required={required}
      >
        <Select.Trigger asChild className={classNames.selectBox} tabIndex={1}>
          <div>
            <Select.Value placeholder={placeholder} aria-label={value}>
              {value}
            </Select.Value>
            <Select.Icon asChild className={classNames.selectIcon}>
              <ChevronDown />
            </Select.Icon>
          </div>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content position={'popper'} className={classNames.selectContent}>
            <Select.Viewport>
              {options?.map(el => (
                <Select.Item value={el.value} key={el.value} className={classNames.line}>
                  <Select.ItemText>{el.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </Typography>
  )
}
