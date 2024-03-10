import React, { ReactElement, ReactNode, useState } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Select from '@radix-ui/react-select'

import ChevronDown from '@/public/icon/chevronDownIcon.svg'
import s from '@/ui/selectBox/selectBox.module.scss'
import { Typography } from '@/ui/typography'

export type SelectProps = {
  onBlur?: () => void
  label?: string
  value?: string
  placeholder?: string | ReactElement
  onValueChange?: (value: string | number) => void
  defaultValue?: string
  options: Option[]
  disabled?: boolean
  required?: boolean
  defaultImage?: ReactElement
  children?: ReactNode
  onChange?: (e: any) => void
}

export type Option = {
  id?: number | string
  name?: string
  image?: ReactElement
  value?: string
}

export const SelectBox = ({
  defaultValue,
  options,
  onValueChange,
  disabled,
  required,
  label,
  onChange,
}: SelectProps) => {
  const [value, setValue] = useState(defaultValue ? defaultValue.toString() : '')

  const onChangeHandler = (newValue: string) => {
    setValue(newValue)
    onValueChange?.(newValue)
    onChange?.(newValue)
  }

  return (
    <Select.Root
      defaultValue={value}
      value={defaultValue}
      onValueChange={onChangeHandler}
      disabled={disabled}
      required={required}
    >
      {label && (
        <Typography variant={'regular14'} color="secondary" className={s.label}>
          {label}
        </Typography>
      )}
      <Select.Trigger asChild className={s.selectBox} tabIndex={0}>
        <div>
          <Typography variant={'regular16'} color="primary" className={s.value}>
            {value ? value : defaultValue}
          </Typography>

          <Select.Icon asChild className={s.selectIcon}>
            <ChevronDown />
          </Select.Icon>
        </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content position={'popper'} className={s.selectContent}>
          <ScrollArea.Root className={s.scrollAreaRoot} type="auto">
            <Select.Viewport asChild>
              <ScrollArea.Viewport
                className={s.scrollAreaViewport}
                style={{ overflowY: undefined }}
              >
                {options?.map(el => {
                  return (
                    <Select.Item value={el?.value || ''} key={el.id} className={s.line}>
                      {el.image}
                      <Select.ItemText>{el.value}</Select.ItemText>
                    </Select.Item>
                  )
                })}
              </ScrollArea.Viewport>
            </Select.Viewport>
            <ScrollArea.Scrollbar className={s.scrollAreaScrollbar} orientation="vertical">
              <ScrollArea.Thumb className={s.scrollAreaThumb} />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
