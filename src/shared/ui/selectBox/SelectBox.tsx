import React, { ReactElement, ReactNode, memo, useState } from 'react'

import ChevronDown from '@/public/icon/chevronDownIcon.svg'
import { Typography } from '@/ui/typography'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as Select from '@radix-ui/react-select'

import s from '@/ui/selectBox/selectBox.module.scss'

export type SelectProps = {
  children?: ReactNode
  defaultImage?: ReactElement
  defaultValue?: string
  disabled?: boolean
  label?: string
  onBlur?: () => void
  onChange?: (e: any) => void
  onValueChange?: (value: number | string) => void
  options: Option[]
  placeholder?: ReactElement | string
  required?: boolean
  value?: string
}

export type Option = {
  id?: number | string
  image?: ReactElement
  name?: string
  value?: string
}

export const SelectBox = memo(function SelectBox({
  defaultValue,
  disabled,
  label,
  onChange,
  onValueChange,
  options,
  required,
}: SelectProps) {
  const [value, setValue] = useState(defaultValue ? defaultValue.toString() : '')

  const onChangeHandler = (newValue: string) => {
    setValue(newValue)
    onValueChange?.(newValue)
    onChange?.(newValue)
  }

  return (
    <Select.Root
      defaultValue={value}
      disabled={disabled}
      onValueChange={onChangeHandler}
      required={required}
      value={defaultValue}
    >
      {label && (
        <Typography className={s.label} color={'secondary'} variant={'regular14'}>
          {label}
        </Typography>
      )}
      <Select.Trigger asChild className={s.selectBox} tabIndex={0}>
        <div>
          <Typography className={s.value} color={'primary'} variant={'regular16'}>
            {value ? value : defaultValue}
          </Typography>

          <Select.Icon asChild className={s.selectIcon}>
            <ChevronDown />
          </Select.Icon>
        </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={s.selectContent} position={'popper'}>
          <ScrollArea.Root className={s.scrollAreaRoot} type={'auto'}>
            <Select.Viewport asChild>
              <ScrollArea.Viewport
                className={s.scrollAreaViewport}
                style={{ overflowY: undefined }}
              >
                {options?.map(el => {
                  return (
                    <Select.Item className={s.line} key={el.id} value={el?.value || ''}>
                      {el.image}
                      <Select.ItemText>{el.value}</Select.ItemText>
                    </Select.Item>
                  )
                })}
              </ScrollArea.Viewport>
            </Select.Viewport>
            <ScrollArea.Scrollbar className={s.scrollAreaScrollbar} orientation={'vertical'}>
              <ScrollArea.Thumb className={s.scrollAreaThumb} />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
})
