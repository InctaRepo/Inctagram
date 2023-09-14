import React from 'react'

import AvatarImage from '@/src/assets/images/avatar-image'
import { DataProfile } from '@/src/components/profile/profile-info/data-profile'
import s from '@/src/components/profile/profile-info/profile-info.module.scss'

export const ProfileInfo = () => {
  return (
    <div className={s.container}>
      <AvatarImage className={s.image} />
      <DataProfile />
    </div>
  )
}
