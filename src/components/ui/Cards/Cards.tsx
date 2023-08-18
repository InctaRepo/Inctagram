import React from 'react'
import s from './style.module.scss'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { clsx } from 'clsx'

type CardPropsType = {
  children: ReactNode
  className?: string
} & ComponentPropsWithoutRef<'div'>

export const Cards = ({ children, className }: CardPropsType) => {
  const classNames = {
    root: clsx(s.card, className),
  }

  return (
    <div className={s.main}>
      <div className={s.card}></div>
    </div>
  )
}
