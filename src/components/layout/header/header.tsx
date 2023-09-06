import React from 'react'

import { useRouter } from 'next/router'

import FlagRussiaIcon from '@/src/assets/icons/flag-russia-icon'
import FlagUKIcon from '@/src/assets/icons/flag-UK-icon'
import MaskIcon from '@/src/assets/icons/mask-icon'
import { Typography } from '@/src/components/ui/typography'
import s from 'src/components/layout/header/header.module.scss'
import { OptionsType, SelectBox } from 'src/components/ui/select-box'

export const Header = () => {
  let { locale, push, pathname, query, asPath, locales } = useRouter()
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
              defaultValue={languages[0].value}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
