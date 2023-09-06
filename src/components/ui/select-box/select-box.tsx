import React, { FC, ReactElement, ReactNode, useState } from 'react'

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
  options?: OptionsType[]
  disabled?: boolean
  required?: boolean
  defaultImage?: ReactElement
  children?: ReactNode
}

export type OptionsType = {
  value: string
  image?: ReactElement
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
    value: styles.value,
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
          <Typography variant={'regular14'} color="secondary" className={s.value}>
            {options?.map((el, id) => {
              return <React.Fragment key={id}>{value === el.value && el.image}</React.Fragment>
            })}
            {value}
          </Typography>

          <Select.Icon asChild className={s.selectIcon}>
            <ChevronDown />
          </Select.Icon>
        </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content position={'popper'} className={s.selectContent}>
          <Select.Viewport>
            {options?.map((el, idx) => (
              <Select.Item value={el.value.toString()} key={idx} className={s.line}>
                {el.image}
                <Select.ItemText>{el.value}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
