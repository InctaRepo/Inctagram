import React from 'react'

import s from '@/src/components/profile/profile.module.scss'
import { Sidebar } from '@/src/components/sidebar'
import { Typography } from '@/src/components/ui/typography'

export const Search = () => {
  return (
    <div className={s.container}>
      <Sidebar />
      <div className={s.containerInfo}>
        <Typography>Search Page</Typography>
      </div>
    </div>
  )
}
