import React from 'react'

import { useRouter } from 'next/router'

import s from './header.module.scss'

import FlagRussiaIcon from '@/src/assets/icons/flag-russia-icon'
import FlagUKIcon from '@/src/assets/icons/flag-UK-icon'
import MaskIcon from '@/src/assets/icons/mask-icon'
import { OptionsType, SelectBox } from '@/src/components/ui/selectbox'
import { Typography } from '@/src/components/ui/typography'

export const Header = () => {
  let { locale, push, pathname, query, asPath, locales } = useRouter()
  const languages: OptionsType[] = [
    { value: 'English', image: <FlagUKIcon /> },
    { value: 'Russia', image: <FlagRussiaIcon /> },
  ]
  const changeLangHandler = (value: string | number) => {
    if (typeof value == 'string') {
      const locale = value.slice(0, 2).toLowerCase()

      push({ pathname, query }, asPath, { locale })
    }
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <Typography variant="large" className={s.text}>
          Inсtagram
        </Typography>
        <div className={s.options_container}>
          <MaskIcon />
          <div className={s.select}>
            <SelectBox
              options={languages}
              onValueChange={changeLangHandler}
              defaultValue={languages[0]}
            >
              <FlagRussiaIcon />
            </SelectBox>
          </div>
        </div>
      </div>
    </div>
  )
}
