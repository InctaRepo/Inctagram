import React, { ReactElement, ReactNode, memo, useState } from 'react'

import ChevronDown from '@/public/icon/chevronDownIcon.svg'
import { Typography } from '@/ui/typography'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as SelectRadix from '@radix-ui/react-select'

import s from '@/ui/select/select.module.scss'

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
  placeholder?: string
  required?: boolean
  value?: string
} & SelectRadix.SelectProps

export type Option = {
  id?: number | string
  image?: ReactElement
  name?: string
  value?: string
}

export const Select = memo(function Select({
  defaultValue,
  disabled,
  label,
  onChange,
  onValueChange,
  options,
  placeholder = options[0].value,
  required,
  ...rest
}: SelectProps) {
  const [value, setValue] = useState(defaultValue ? defaultValue.toString() : '')

  const onChangeHandler = (newValue: string) => {
    setValue(newValue)
    onValueChange?.(newValue)
    onChange?.(newValue)
  }

  return (
    <SelectRadix.Root
      // defaultValue={value}
      disabled={disabled}
      onValueChange={onChangeHandler}
      // value={defaultValue}
      required={required}
    >
      {label && (
        <Typography className={s.label} color={'secondary'} variant={'regular14'}>
          {label}
        </Typography>
      )}
      <SelectRadix.Trigger asChild className={s.selectBox} tabIndex={0}>
        <div>
          <Typography className={s.value} color={'primary'} variant={'regular16'}>
            {value ? value : defaultValue}
          </Typography>

          <SelectRadix.Icon asChild className={s.selectIcon}>
            <ChevronDown />
          </SelectRadix.Icon>
        </div>
      </SelectRadix.Trigger>

      <SelectRadix.Portal>
        <SelectRadix.Content className={s.selectContent} position={'popper'}>
          <ScrollArea.Root className={s.scrollAreaRoot} type={'auto'}>
            <SelectRadix.Viewport asChild>
              <ScrollArea.Viewport
                className={s.scrollAreaViewport}
                style={{ overflowY: undefined }}
              >
                {options?.map(el => {
                  return (
                    <SelectRadix.Item className={s.line} key={el.id} value={el?.value || ''}>
                      {el.image}
                      <SelectRadix.ItemText>{el.value}</SelectRadix.ItemText>
                    </SelectRadix.Item>
                  )
                })}
              </ScrollArea.Viewport>
            </SelectRadix.Viewport>
            <ScrollArea.Scrollbar className={s.scrollAreaScrollbar} orientation={'vertical'}>
              <ScrollArea.Thumb className={s.scrollAreaThumb} />
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </SelectRadix.Content>
      </SelectRadix.Portal>
    </SelectRadix.Root>
  )
})
