import React, { FC } from 'react'

import * as Select from '@radix-ui/react-select'
import clsx from 'clsx'

import styles from './selectbox.module.scss'

import ChevronUp from '@/src/assets/icons/chevron-up'

export type SelectPropsType = {
  def: boolean
  active: boolean
  /*hover: boolean
	focus: boolean*/
  disabled: boolean
  onChange?: (active: boolean) => void
  data?: string[] | number[]
}

export const Selectbox: FC<SelectPropsType> = ({
  def,
  active,
  /* hover,
																																																																																															focus,*/
  disabled,
  onChange,
  data,
}) => {
  const classNames = {
    selecticon: styles.selecticon,
    selectContent: styles.selectContent,
    label: styles.label,
    line: styles.line,
    optionline: styles.optionline,
    selectgroup: styles.selectgroup,

    selectbox: clsx(
      styles.selectbox,
      def && styles.def,
      active && styles.active,
      /*hover && styles.hover,
			focus && styles.focus,*/
      disabled && styles.disabled
    ),
  }

  return (
    <Select.Root>
      <Select.Group>
        <Select.Label className={classNames.label}>Select-box</Select.Label>
      </Select.Group>
      <Select.Trigger className={classNames.selectbox}>
        <Select.Value placeholder="Select-box" />
        <Select.Icon className={classNames.selecticon}>
          {
            def || disabled ? <ChevronUp /> : null
            // TODO
            // <ChevronDown/>
          }
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={classNames.selectContent}>
          <Select.Viewport>
            <Select.Group>
              {data?.map((el, i) => (
                <Select.Item value="select-box" key={i}>
                  <h1 className={classNames.line}>Select-box</h1>
                </Select.Item>
              ))}
              <Select.Item value="select-box" className={classNames.optionline}>
                Select-box
              </Select.Item>
              <Select.Item value="select-box" className={classNames.optionline}>
                Select-box
              </Select.Item>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
