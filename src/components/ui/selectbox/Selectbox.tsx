
import React, { FC } from 'react'
import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'
import styles from './selectbox.module.scss'

export type SelectPropsType = {
  def: boolean
  active: boolean
  hover: boolean
  focus: boolean
  disabled: boolean
  onChange?: (active: boolean) => void
  data?: string[] | number[]
}


export const Selectbox: FC<SelectPropsType> = ({
  def,
  active,
  hover,
  focus,
  disabled,
  onChange,
  data,
}) => {
  const classNames = {
    selectbox: styles.selectbox,
    label: styles.label,
    options: styles.options,
    line: styles.line,
    optionline: styles.optionline,
    selectlabel: clsx(
      styles.selectlabel,
      def && styles.def,
      active && styles.active,
      hover && styles.hover,
      focus && styles.focus,
      disabled && styles.disabled
    ),
  }

  return (
    <Select.Root>
      <Select.Trigger className={classNames.selectbox}>
        <Select.Group>
          <Select.Label className={classNames.label}>Select-box</Select.Label>
        </Select.Group>
        <Select.Group>
          <Select.Label className={classNames.selectlabel}>
            <h1>Select-box</h1>
          </Select.Label>
        </Select.Group>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content>
          <Select.Viewport>
            <Select.Group className={classNames.options}>
              {data?.map((el, i) => (
                <Select.Item value="select-box" key={i} className={classNames.optionline}>
                  <h1 className={classNames.line}>Select-box</h1>{' '}
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
