import {
  ComponentPropsWithoutRef,
  ElementRef,
  ElementType,
  ForwardedRef,
  ReactNode,
  forwardRef,
  memo,
} from 'react'

import s from '@/ui/typography/typography.module.scss'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T // h1 h2 h3 for semantic
  children: ReactNode
  className?: string
  color?: 'error' | 'link' | 'primary' | 'secondary'
  variant?:
    | 'bold14'
    | 'bold16'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'large'
    | 'link'
    | 'medium14'
    | 'regular14'
    | 'regular16'
    | 'sb_small' // semi-bold small text
    | 'sm_link' //small link
    | 'small'
} & ComponentPropsWithoutRef<T>

export const Typography = memo(
  forwardRef(
    <T extends ElementType = 'p'>(
      props: TypographyProps<T> &
        Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>> & {
          ref?: ForwardedRef<ElementRef<T>>
        },
      ref?: ForwardedRef<ElementRef<T>>
    ) => {
      const {
        as: Component = 'p',
        children,
        className,
        color = 'primary',
        variant = 'bold14',
        ...rest
      } = props

      return (
        <Component
          className={`${variant && s[variant]} ${s[color]}  ${className}`}
          {...rest}
          ref={ref}
        >
          {children}
        </Component>
      )
    }
  )
)
