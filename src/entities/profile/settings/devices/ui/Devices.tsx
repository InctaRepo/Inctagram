import React from 'react'

import s from '@/src/entities/profile/settings/generalInformation/ui/generalInformation.module.scss'

type Props = {}
export const Devices = ({}: Props) => {
  return (
    <div className={s.profile}>
      <div className={s.content}>Devices</div>
    </div>
  )
}
