import React from 'react'

import s from '@/features/message/message.module.scss'
import { Sidebar } from '@/shared/sidebar'
import { Typography } from '@/ui/typography'

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
