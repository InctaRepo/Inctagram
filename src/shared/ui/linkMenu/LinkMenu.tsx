import React, { FC, ReactNode } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'

import { variantIconLink } from '@/src/shared/const'
import s from '@/src/shared/ui/linkMenu/linkMenu.module.scss'
import { Typography } from '@/src/shared/ui/typography'

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
    check: clsx(s.container, link?.startsWith('/' + variantIcon) && s.active),
  }

  return (
    <div className={styles.check} onClick={handleItemClick}>
      <Link href={`${link}`} className={s.link}>
        {children}
        <Typography variant="medium14" className={styles.check}>
          {nameLink}
        </Typography>
      </Link>
    </div>
  )
}
