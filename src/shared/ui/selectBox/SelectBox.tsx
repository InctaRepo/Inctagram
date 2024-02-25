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
  setFormValues?: any
}

export type Option = {
  id: number
  name: string
  image?: ReactElement
  iso2?: string
}

export const SelectBox = ({
  defaultValue,
  options,
  onValueChange,
  disabled,
  required,
  placeholder,
  label,
  onChange,
  setFormValues,
}: SelectProps) => {
  const [value, setValue] = useState(defaultValue ? defaultValue.toString() : '')

  const onChangeHandler = (newValue: string) => {
    setValue(newValue)
    onValueChange?.(newValue)
    onChange?.(newValue)
    setFormValues('city', '')
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
            {options.map(el => {
              return <React.Fragment key={el.id}>{value === el.name && el.image}</React.Fragment>
            })}
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
                {options?.map(el => (
                  <Select.Item value={el?.name} key={el.id} className={s.line}>
                    {el.image}
                    <Select.ItemText>{el.name}</Select.ItemText>
                  </Select.Item>
                ))}
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
