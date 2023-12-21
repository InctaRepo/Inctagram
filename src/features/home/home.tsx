import React from 'react'

import s from './home.module.scss'

import { getIsAuth } from '@/src/shared/hoc'
import { useAppSelector } from '@/src/shared/hooks'
import { Sidebar } from '@/src/shared/sidebar'
import { Typography } from '@/src/shared/ui/typography'

export const Home = () => {
  const isAuth = useAppSelector(getIsAuth)

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={isAuth ? s.containerInfo : s.containerInfoPublic}>
        <Typography>Home Page hello</Typography>
      </div>
    </div>
  )
}
