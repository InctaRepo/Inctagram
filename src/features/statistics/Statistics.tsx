import React from 'react'

import s from '@/features/statistics/statistics.module.scss'
import { Sidebar } from '@/shared/sidebar'
import { Typography } from '@/ui/typography'

export const Statistics = () => {
  return (
    <div className={s.container}>
      <Sidebar />
      <div className={s.containerInfo}>
        <Typography>Statistics Page</Typography>
      </div>
    </div>
  )
}
