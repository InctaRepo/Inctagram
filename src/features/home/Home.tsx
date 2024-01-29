import React from 'react'

import { Alerts } from './Alerts/Alerts'
import { PublicPost } from './PublicPost/PublicPost'

import s from '@/features/home/home.module.scss'
import { getIsAuth } from '@/shared/hoc'
import { useAppSelector } from '@/shared/hooks'
import { Sidebar } from '@/shared/sidebar'
import { Typography } from '@/ui/typography'

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
