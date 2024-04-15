import React from 'react'

import { Sidebar } from '@/shared/sidebar'
import { Typography } from '@/ui/typography'

import s from '@/features/statistics/statistics.module.scss'

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
