import React from 'react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Posts } from '../posts'

import { Alerts } from './Alerts/Alerts'
import s from './home.module.scss'
import { PublicPost } from './PublicPost/PublicPost'

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
        <Alerts />
        <PublicPost />
      </div>
    </div>
  )
}
