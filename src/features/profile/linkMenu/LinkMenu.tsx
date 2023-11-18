import { clsx } from 'clsx'
import Link from 'next/link'
import React, { FC, ReactNode } from 'react'
import { Typography } from '@/src/shared/ui/typography'
import s from './linkMenu.module.scss'

type Props = {
  nameLink: string
  link?: string
  children: ReactNode
  variantIcon?: 'home' | 'search' | 'profile' | 'create' | 'message' | 'logout' | 'favorites'
  handleClick: (
    variant: 'home' | 'search' | 'profile' | 'create' | 'message' | 'logout' | 'favorites' | null
  ) => void
}
export const LinkMenu: FC<Props> = ({ children, variantIcon, handleClick, nameLink, link }) => {
  const handleItemClick = () => {
    handleClick(variantIcon!)
  }
  const styles = {
    // check: clsx(router.pathname == link ? s.active : ''),
    check: clsx(link === variantIcon && s.active),
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
