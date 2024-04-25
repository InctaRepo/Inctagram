import React, { memo } from 'react'

import { Sidebar } from '@/shared/sidebar'
import { Typography } from '@/ui/typography'

import s from '@/features/favorites/favorites.module.scss'

export const Favorites = memo(() => {
  return (
    <div className={s.container}>
      <Sidebar />
      <div className={s.containerInfo}>
        <Typography>Favorites Page</Typography>
      </div>
    </div>
  )
})
