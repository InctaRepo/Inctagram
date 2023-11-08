import React from 'react'

import AvatarImage from '@/src/assets/images/avatar-image'
import { DataProfile } from '@/src/components/profile/profile-info/data-profile'
import s from '@/src/components/profile/profile-info/profile-info.module.scss'
import { UserInfoType } from '@/src/services/profile/profile-api-types'

type DataProfileType = {
  userData?: UserInfoType
}

export const ProfileInfo = ({ userData }: DataProfileType) => {
  return (
    <div className={s.container}>
      {userData?.avatar && <img src={userData?.avatar} className={s.image} alt={'avatar'} />}
      {!userData?.avatar && <AvatarImage className={s.image} />}
      <div className={s.dataProfile}>
        <DataProfile userData={userData} />
      </div>
    </div>
  )
}
