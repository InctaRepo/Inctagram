import React from 'react'

import s from '@/features/favorites/favorites.module.scss'
import { Sidebar } from '@/shared/sidebar'
import { Typography } from '@/ui/typography'

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
