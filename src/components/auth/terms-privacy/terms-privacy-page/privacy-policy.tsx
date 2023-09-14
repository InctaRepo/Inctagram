import React from 'react'

import { Typography } from '../../../ui/typography'

import s from './style.module.scss'

import { Header } from '@/src/components/layout/header/header'

export const Privacy = () => {
  return (
    <div className={s.main}>
      <Header />

      <Typography>Privacy Policy</Typography>
      <blockquote>
        {' '}
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, aspernatur autem
        cupiditate debitis dignissimos, explicabo fugit ipsum, magnam nesciunt odio optio quidem
        quis rem voluptas voluptatem. Earum quasi recusandae tenetur? Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Aperiam, aspernatur autem cupiditate debitis dignissimos,
        explicabo fugit ipsum, magnam nesciunt odio optio quidem quis rem voluptas voluptatem. Earum
        quasi recusandae tenetur? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam,
        aspernatur autem cupiditate debitis dignissimos, explicabo fugit ipsum, magnam nesciunt odio
        optio quidem quis rem voluptas voluptatem. Earum quasi recusandae tenetur?Lorem ipsum dolor
        sit amet, consectetur adipisicing elit. Aperiam, aspernatur autem cupiditate debitis
        dignissimos, explicabo fugit ipsum, magnam nesciunt odio optio quidem quis rem voluptas
        voluptatem. Earum quasi recusandae tenetur?
      </blockquote>
    </div>
  )
}
