import React from 'react'

import { MenuContainer } from '@/src/components/profile/menu-container'
import s from '@/src/components/profile/profile.module.scss'
import { Typography } from '@/src/components/ui/typography'

export const Search = () => {
  return (
    <div className={s.container}>
      <MenuContainer />
      <div className={s.containerInfo}>
        <Typography>Search Page</Typography>
      </div>
    </div>
  )
}
