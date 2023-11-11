import React from 'react'

import s from '@/src/components/404/404.module.scss'
import { Typography } from '@/src/components/ui/typography'

export const Page404 = () => {
  return (
    <div className={s.container}>
      <Typography>404 - Page Not Found</Typography>
    </div>
  )
}
