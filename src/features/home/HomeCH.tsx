import React from 'react'

import { Alerts } from './Alerts/Alerts'
import { PublicPost } from './PublicPost/PublicPost'

import s from '@/src/features/home/home.module.scss'
import { getIsAuth } from '@/src/shared/hoc'
import { useAppSelector } from '@/src/shared/hooks'
import { Sidebar } from '@/src/shared/sidebar'

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
