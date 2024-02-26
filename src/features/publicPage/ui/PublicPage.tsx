import React from 'react'

import { Alerts } from '@/features/publicPage/ui/alerts'
import s from '@/features/publicPage/ui/publicPage.module.scss'
import { PublicPost } from '@/features/publicPage/ui/publicPost'
import { getIsAuth } from '@/shared/hoc'
import { useAppSelector } from '@/shared/hooks'
import { Sidebar } from '@/shared/sidebar'

export const PublicPage = () => {
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
