import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactNode,
  forwardRef,
  memo,
} from 'react'

import s from '@/ui/button/button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children: ReactNode
  className?: string
  fullWidth?: boolean
  variant?: 'internation' | 'link' | 'outlined' | 'primary' | 'secondary' | 'text'
} & ComponentPropsWithoutRef<T>

export const Button = memo(
  forwardRef(
    <T extends ElementType = 'button'>(
      props: {
        ref?: ForwardedRef<ElementRef<T>>
      } & ButtonProps<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof ButtonProps<T>>,
      ref?: ForwardedRef<ElementRef<T>>
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
        <Component
          className={`${s[variant]} ${fullWidth ? s.fullWidth : ''} ${className}`}
          {...rest}
          ref={ref}
        >
          {children}
        </Component>
      )
    }
  )
)
