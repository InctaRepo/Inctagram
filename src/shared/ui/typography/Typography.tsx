import { ComponentPropsWithoutRef, ElementType } from 'react'

import s from '@/src/shared/ui/typography/typography.module.scss'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T // h1 h2 h3 for semantic
  className?: string
  color?: 'primary' | 'secondary' | 'link' | 'error'
  variant?:
    | 'large'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'regular16'
    | 'bold16'
    | 'regular14'
    | 'bold14'
    | 'medium14'
    | 'small'
    | 'sb_small' // semi-bold small text
    | 'link'
    | 'sm_link' //small link
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(
  props: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>
) => {
  const { variant = 'body1', color = 'primary', className, as: Component = 'p', ...rest } = props

  return <Component className={`${variant && s[variant]} ${s[color]}  ${className}`} {...rest} />
}
