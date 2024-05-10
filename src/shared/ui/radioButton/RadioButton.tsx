import * as React from 'react'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Typography } from '@/ui/typography'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from '@/ui/radioButton/radioButton.module.scss'

const RadioGroupRoot = forwardRef<
  ElementRef<typeof RadioGroup.Root>,
  ComponentPropsWithoutRef<typeof RadioGroup.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroup.Root className={clsx(s.root, className)} {...props} ref={ref} />
})

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroup.Item>,
  ComponentPropsWithoutRef<typeof RadioGroup.Item>
>(({ children, className, ...props }, ref) => {
  return (
    <RadioGroup.Item className={clsx(s.option, className)} ref={ref} {...props}>
      <div className={s.icon}></div>
    </RadioGroup.Item>
  )
})

type Option = {
  label: string
  value: string
}
export type RadioButtonProps = {
  error?: string
  options: Option[]
} & Omit<ComponentPropsWithoutRef<typeof RadioGroup.Root>, 'children'>
export const RadioButton = forwardRef<ElementRef<typeof RadioGroup.Root>, RadioButtonProps>(
  (props, ref) => {
    const { error, options, ...restProps } = props

    return (
      <RadioGroupRoot {...restProps} ref={ref}>
        {options.map(option => (
          <div className={s.label} key={option.value}>
            <RadioGroupItem id={option.value} value={option.value} />
            <Typography as={'label'} htmlFor={option.value} variant={'regular14'}>
              {option.label}
            </Typography>
          </div>
        ))}
      </RadioGroupRoot>
    )
  }
)
