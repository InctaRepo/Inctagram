import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import FlagRussiaIcon from '@/src/assets/icons/flag-russia-icon'
import FlagUKIcon from '@/src/assets/icons/flag-UK-icon'
import MaskIcon from '@/src/assets/icons/mask-icon'
// import { Pagination } from '@/src/components/layout/pagination'
import s from '@/src/components/header/header.module.scss'
import { Button } from '@/src/components/ui/button'
import { OptionsType, SelectBox } from '@/src/components/ui/select-box'
import { Typography } from '@/src/components/ui/typography'
type HeaderType = {
  variant?: 'public'
}
export const Header = ({ variant }: HeaderType) => {
  const { push, pathname, query, asPath, locale } = useRouter()
  const languages: OptionsType[] = [
    { value: 'English', image: <FlagUKIcon /> },
    { value: 'Russian', image: <FlagRussiaIcon /> },
  ]
  const changeLangHandler = (value: string | number) => {
    if (typeof value == 'string') {
      const locale = value.slice(0, 2).toLowerCase()

      push({ pathname, query }, asPath, { locale })
    }
  }

  return (
    <div className={s.containerMain}>
      <div className={s.container}>
        <div className={s.content}>
          <Typography variant="large" className={s.text}>
            <Link className={s.incta} href={'/auth/sign-in'} tabIndex={1}>
              Inсtagram
            </Link>
          </Typography>
          <div className={s.options_container}>
            <MaskIcon />
            <div className={s.select}>
              <SelectBox
                options={languages}
                onValueChange={changeLangHandler}
                defaultValue={locale === 'en' ? languages[0].value : languages[1].value}
              />
            </div>
            {variant === 'public' && (
              <div className={s.button_container}>
                <Button variant="text" className={s.button}>
                  Log in
                </Button>
                <Button variant="primary">
                  <Typography variant="h3">Sing up</Typography>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
