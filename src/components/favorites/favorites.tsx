import React from 'react'

import { MenuContainer } from '@/src/components/profile/menu-container'
import s from '@/src/components/profile/profile.module.scss'
import { Typography } from '@/src/components/ui/typography'

export const Favorites = () => {
  return (
    <div className={s.container}>
      <MenuContainer />
      <div className={s.containerInfo}>
        <Typography>
          Lorem Lorem Lorem LoremLorem LoremLorem Lorem LoremLoremLorem LoremLoremLorem Lorem
          LoremLoremLorem LoremLoremLorem LoremLorem Lorem LoremLorem LoremLorem Lorem LoremLorem
          LoremLoremLorem LoremLorem LoremLorem LoremLorem LoremLorem LoremLorem Lorem
        </Typography>
      </div>
    </div>
  )
}
