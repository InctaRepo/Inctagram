import React from 'react'

import s from './statistics.module.scss'

import { Sidebar } from '@/src/shared/sidebar'
import { Typography } from '@/src/shared/ui/typography'

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
