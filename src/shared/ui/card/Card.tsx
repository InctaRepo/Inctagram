import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from '@/src/shared/ui/card/card.module.scss'

type Props = {
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<'div'>

export const Card = ({ children, className }: Props) => {
  const classNames = {
    root: clsx(s.card, className),
  }

  return <div className={classNames.root}>{children}</div>
}
