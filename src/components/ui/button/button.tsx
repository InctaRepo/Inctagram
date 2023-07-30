import {ComponentPropsWithoutRef, ElementType, ReactNode} from 'react'

import s from './button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  variant?: 'primary' | 'secondary' | 'outlined' | 'link' | 'internation' | 'text'
  fullWidth?: boolean
  className?: string
  children: ReactNode
} & ComponentPropsWithoutRef<T>


export const Button = <T extends ElementType = 'button'>(
  props: ButtonProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>
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
