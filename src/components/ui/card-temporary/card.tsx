import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './card.module.scss'

type CardPropsType = {
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<'div'>

export const Card = ({ children, className }: CardPropsType) => {
  const classNames = {
    root: clsx(s.card, className),
  }

  return <div className={classNames.root}>{children}</div>
}
