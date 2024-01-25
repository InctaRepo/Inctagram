import React, { ReactNode, useState } from 'react'

import * as Tabs from '@radix-ui/react-tabs'
import clsx from 'clsx'

import s from '@/ui/tabsComponent/tabsComponent.module.scss'

type TabProps = {
  label: string
  value: string
  children?: ReactNode
}

type Props = {
  tabs: TabProps[]
  defaultValue?: string
  onChange?: (value: string) => void
  disabled?: boolean
}

export const TabsComponent = ({ defaultValue, disabled, onChange, tabs }: Props) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0].value)

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (onChange) {
      onChange(value)
    }
  }
  const classNames = {
    container: s.container,
    list: s.tabs_list,
    trigger: clsx(s.trigger, disabled && s.disabled),
  }

  return (
    <Tabs.Root
      className={classNames.container}
      defaultValue={activeTab}
      onValueChange={handleTabChange}
    >
      <Tabs.List className={classNames.list}>
        {tabs?.map((el, index) => (
          <Tabs.Trigger
            key={index}
            disabled={disabled}
            value={el.value}
            className={classNames.trigger}
          >
            {el.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {tabs?.map((el, index) => (
        <Tabs.Content key={index} value={el.value}>
          {el.children}
        </Tabs.Content>
      ))}
    </Tabs.Root>
  )
}
