import React from 'react'

import Error404 from '@/public/icon/404.svg'

import s from '@/features/page404/page404.module.scss'

export const Page404 = () => {
  return (
    <div className={s.container}>
      <Error404 alt={'404'} className={s.error404}></Error404>
    </div>
  )
}
