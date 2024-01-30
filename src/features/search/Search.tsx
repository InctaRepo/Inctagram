import React from 'react'

import s from '@/features/search/search.module.scss'
import { Sidebar } from '@/shared/sidebar'
import { Typography } from '@/ui/typography'

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
