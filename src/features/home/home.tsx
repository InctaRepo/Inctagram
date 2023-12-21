import React from 'react'

import s from './home.module.scss'

import { Sidebar } from '@/src/shared/sidebar'
import { Typography } from '@/src/shared/ui/typography'

export const Home = () => {
  return (
    <div className={s.container}>
      <Sidebar />
      <div className={s.containerInfo}>
        <Typography>Home Page hello</Typography>
      </div>
    </div>
  )
}
