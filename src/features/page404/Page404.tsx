import React from 'react'

import s from '@/src/features/page404/page404.module.scss'
import Error404 from 'public/icon/404.svg'

export const Page404 = () => {
  return (
    <div className={s.container}>
      <Error404 alt={'404'} className={s.error404}></Error404>
    </div>
  )
}
