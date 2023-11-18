import React from 'react'
import { Typography } from '@/src/shared/ui/typography'
import s from './page404.module.scss'

export const Page404 = () => {
  return (
    <div className={s.container}>
      <Typography>404 - Page Not Found</Typography>
    </div>
  )
}