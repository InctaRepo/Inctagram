import React from 'react'

import { useRouter } from 'next/router'

import s from './header.module.scss'

import MaskIcon from '@/src/assets/icons/mask-icon'
import { SelectBox } from '@/src/components/ui/selectbox'
import { Typography } from '@/src/components/ui/typography'

export const Header = () => {
  let { locale, push, pathname, query, asPath, locales } = useRouter()
  const languages = ['English', 'Russian']
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
          <SelectBox
            options={languages}
            onValueChange={changeLangHandler}
            defaultValue={languages[0]}
          />
        </div>
      </div>
    </div>
  )
}
