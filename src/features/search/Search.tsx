import React from 'react'

import s from './search.module.scss'

import { Sidebar } from '@/src/shared/sidebar'
import { Typography } from '@/src/shared/ui/typography'

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
