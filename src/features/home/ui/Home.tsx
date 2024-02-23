import React from 'react'

import { Alerts } from '@/features/home/ui/alerts'
import s from '@/features/home/ui/home.module.scss'
import { PublicPost } from '@/features/home/ui/publicPost'
import { getIsAuth } from '@/shared/hoc'
import { useAppSelector } from '@/shared/hooks'
import { Sidebar } from '@/shared/sidebar'

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
