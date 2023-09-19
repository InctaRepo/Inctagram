import React from 'react'

import Link from 'next/link'

import s from './style.module.scss'

import { Header } from '@/src/components/layout/header/header'
import { Typography } from '@/src/components/ui/typography'

export const Terms = () => {
  return (
    <div className={s.main}>
      <Header />
      <Typography as="h2" variant="h2" color="primary">
        Terms of Service s
      </Typography>

      <Typography variant={'small'} className={s.termsRow}>
        <Link href={'/auth/register-form/register-form'} className={s.termsLink}>
          jhj
        </Link>
      </Typography>

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
