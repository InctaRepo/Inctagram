import React, { FC, ReactNode } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'

import s from '@/src/components/profile/links/link-menu.module.scss'
import { Typography } from '@/src/components/ui/typography'

type LinkMenuType = {
  nameLink: string
  link?: string
  children: ReactNode
  variantIcon?: 'home' | 'search' | 'my-profile' | 'create' | 'message' | 'logout' | 'favorites'
  handleClick: (
    variant: 'home' | 'search' | 'my-profile' | 'create' | 'message' | 'logout' | 'favorites' | null
  ) => void
}
export const LinkMenu: FC<LinkMenuType> = ({
  children,
  variantIcon,
  handleClick,
  nameLink,
  link,
}) => {
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
