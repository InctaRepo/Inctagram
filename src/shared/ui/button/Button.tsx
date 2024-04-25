import { ComponentPropsWithoutRef, ElementType, ReactNode, memo } from 'react'

import s from '@/ui/button/button.module.scss'

type Props<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  variant?: 'internation' | 'link' | 'outlined' | 'primary' | 'secondary' | 'text'
} & ComponentPropsWithoutRef<T>

export const Button = memo(
  <T extends ElementType = 'button'>(
    props: Props<T> & Omit<ComponentPropsWithoutRef<T>, keyof Props<T>>
  ) => {
    const {
      as: Component = 'button',
      children,
      className,
      fullWidth,
      variant = 'primary',
      ...rest
    } = props

    return (
      <Component className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`} {...rest}>
        {children}
      </Component>
    )
  }
)
