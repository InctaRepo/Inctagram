import React from 'react'

import { Sidebar } from '@/shared/sidebar'
import { Typography } from '@/ui/typography'

import s from '@/features/search/search.module.scss'

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
