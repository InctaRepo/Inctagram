import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './header.module.scss'

import MaskIcon from '@/src/assets/icons/mask-icon'
import { SelectBox } from '@/src/components/ui/selectbox'
import { Typography } from '@/src/components/ui/typography'

export const Header = () => {
  let { locale, push, pathname, query, asPath, locales } = useRouter()
  const router = useRouter()

  const changeLangHandler = (value: string | number) => {
    if (typeof value == 'string') {
      const locale = value

      push({ pathname, query }, asPath, { locale })
    }
  }

  return (
    <div className={s.wrapper}>
      <Typography variant="large" className={s.text}>
        Inсtagram
      </Typography>
      <div className={s.options_container}>
        <Link href="/profile">Profile</Link>
        <MaskIcon />
        <SelectBox options={locales!} onValueChange={changeLangHandler} defaultValue={locale!} />
      </div>
    </div>
  )
}
