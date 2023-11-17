import React from 'react'
import { Sidebar } from '@/src/shared/sidebar'
import { Typography } from '@/src/shared/ui/typography'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import s from '../profile/profile.module.scss'

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
