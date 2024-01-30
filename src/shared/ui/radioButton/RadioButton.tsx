import * as React from 'react'

import * as RadioGroup from '@radix-ui/react-radio-group'
import { clsx } from 'clsx'

import s from '@/ui/radioButton/radioButton.module.scss'
import { Typography } from '@/ui/typography'

const RadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroup.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroup.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroup.Root className={clsx(s.root, className)} {...props} ref={ref} />
})

RadioGroupRoot.displayName = RadioGroup.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroup.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroup.Item>
>(({ children, className, ...props }, ref) => {
  return (
    <RadioGroup.Item className={clsx(s.option, className)} ref={ref} {...props}>
      <div className={s.icon}></div>
    </RadioGroup.Item>
  )
})

RadioGroupItem.displayName = RadioGroup.Item.displayName

type Option = {
  label: string
  value: string
}
export type RadioButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadioGroup.Root>,
  'children'
> & {
  error?: string
  options: Option[]
}
export const RadioButton = React.forwardRef<
  React.ElementRef<typeof RadioGroup.Root>,
  RadioButtonProps
>((props, ref) => {
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
})
