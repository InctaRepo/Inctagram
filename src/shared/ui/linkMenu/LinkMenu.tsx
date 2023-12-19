import React, { FC, ReactNode } from 'react'

import { clsx } from 'clsx'
import Link from 'next/link'

import s from './linkMenu.module.scss'

import { variantIconLink } from '@/src/shared/const/variantIconLink'
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
        <Typography variant="medium14" className={s.typography} as={'p'}>
          <p className={styles.check}>{children}</p>
          <p className={styles.check}>{nameLink}</p>
        </Typography>
      </Link>
    </div>
  )
}
