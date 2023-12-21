import React from 'react'

import s from './favorites.module.scss'

import { Sidebar } from '@/src/shared/sidebar'
import { Typography } from '@/src/shared/ui/typography'

export const Favorites = () => {
  return (
    <div className={s.container}>
      <Sidebar />
      <div className={s.containerInfo}>
        <Typography>Favorites Page</Typography>
      </div>
    </div>
  )
}
