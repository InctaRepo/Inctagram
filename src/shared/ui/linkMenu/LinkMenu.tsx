import React, { ReactNode, memo, useCallback } from 'react'

import { variantIconLink } from '@/shared/const'
import { Typography } from '@/ui/typography'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from '@/ui/linkMenu/linkMenu.module.scss'

type Props = {
  children: ReactNode
  handleClick: (variant: variantIconLink) => void
  link?: string
  nameLink: string
  variantIcon: variantIconLink
}
export const LinkMenu = memo(function LinkMenu({
  children,
  handleClick,
  link,
  nameLink,
  variantIcon,
}: Props) {
  const handleItemClick = useCallback(() => {
    handleClick(`${link}`.slice(1) as variantIconLink)
  }, [handleClick, link])
  const styles = {
    check: clsx(s.container, link?.startsWith('/' + variantIcon) && s.active),
  }

  return (
    <div className={styles.check} onClick={handleItemClick}>
      <Link className={s.link} href={link!}>
        {children}
        <Typography className={styles.check} variant={'medium14'}>
          {nameLink}
        </Typography>
      </Link>
    </div>
  )
})
