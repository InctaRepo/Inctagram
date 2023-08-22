import React, {FC, ReactNode} from 'react'
import * as Select from '@radix-ui/react-select'
import styles from './selectbox.module.scss'
import ChevronDown from '@/src/assets/icons/chevron-down'
import {Typography} from "@/src/components/ui/typography"

export type SelectProps = {
 label?: string
  placeholder?: ReactNode
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  options: Array<{label: string; value: string }>
  disabled?: boolean
  required?: boolean
}

export const Selectbox: FC<SelectProps> = ({
defaultValue,
    //options,
    value,
    onValueChange,
    disabled,
    required,
    placeholder,
    label,
}) => {

    const options = [{value: 'select-box'}, {value: 'select-box'}, {value: 'select-box'}]

  return (
      <Typography variant={'regular14'}>
          <Typography variant={'regular14'} className={styles.label} >
              Select-box
          </Typography>
    <Select.Root
        defaultValue={defaultValue}
    value={value}
    onValueChange={onValueChange}
    disabled={disabled}
    required={required}>

      <Select.Trigger asChild  className={styles.selectbox} tabIndex={1}>
          <div>
        <Select.Value placeholder={placeholder} />
        <Select.Icon asChild className={styles.selecticon}>
         <ChevronDown/>
        </Select.Icon>
              </div>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content position={'popper'} className={styles.selectContent}>
          <Select.Viewport>
              {options.map(el => (
                <Select.Item value={el.value} key={el.value} className={styles.line}>
                  <Select.ItemText >{el.value}</Select.ItemText>
                </Select.Item>
              ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
      </Typography>
  )
}
