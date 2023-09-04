import React from 'react'

import s from '@/src/components/auth/terms-privacy/privacy-terms.module.scss'
import { Typography } from '@/src/components/ui/typography'
import { Header } from 'src/components/ui/header'

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
