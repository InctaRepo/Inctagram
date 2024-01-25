import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import s from '@/ui/button/button.module.scss'

type Props<T extends ElementType = 'button'> = {
  as?: T
  variant?: 'primary' | 'secondary' | 'outlined' | 'link' | 'internation' | 'text'
  fullWidth?: boolean
  className?: string
  children: ReactNode
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(
  props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>
) => {
  const {
    variant = 'primary',
    fullWidth,
    className,
    children,
    as: Component = 'button',
    ...rest
  } = props

  return (
    <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`} {...rest}>
      {children}
    </Component>
  )
}
