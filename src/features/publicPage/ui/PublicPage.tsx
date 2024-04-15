import React from 'react'

import { Alerts } from '@/features/publicPage/ui/alerts'
import { PublicPost } from '@/features/publicPage/ui/publicPost'

import s from '@/features/publicPage/ui/publicPage.module.scss'

export const PublicPage = () => {
  return (
    <div className={s.container}>
      <div className={s.containerInfoPublic}>
        <Alerts />
        <PublicPost />
      </div>
    </div>
  )
}
