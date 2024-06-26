import React from 'react'

import { Sidebar } from '@/shared/sidebar'
import { Typography } from '@/ui/typography'

import s from '@/features/message/message.module.scss'

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
