import { clsx } from 'clsx'
import Link from 'next/link'
import React, { FC, ReactNode } from 'react'
import { variantIconLink } from '../../const/variantIconLink'
import { Typography } from '../typography'
import s from './linkMenu.module.scss'

type Props = {
  nameLink: string
  link?: string
  children: ReactNode
  variantIcon: variantIconLink
  handleClick: (variant: variantIconLink) => void
}
export const LinkMenu: FC<Props> = ({ children, variantIcon, handleClick, nameLink, link }) => {
  const handleItemClick = () => {
    handleClick(variantIcon)
  }
  const styles = {
    check: clsx(link === '/' + variantIcon && s.active),
  }

  return (
    <div className={s.container} onClick={handleItemClick}>
      <Link href={`${link}`} className={s.link}>
        {children}
        <Typography variant="medium14" className={styles.check}>
          {nameLink}
        </Typography>
      </Link>
    </div>
  )
}
