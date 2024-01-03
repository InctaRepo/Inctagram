import React from 'react'

import s from '@/src/features/message/message.module.scss'
import { Sidebar } from '@/src/shared/sidebar'
import { Typography } from '@/src/shared/ui/typography'

export const Message = () => {
  return (
    <div className={s.container}>
      <Sidebar />
      <div className={s.containerInfo}>
        <Typography>Messages Page</Typography>
      </div>
    </div>
  )
}
