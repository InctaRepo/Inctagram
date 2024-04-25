import React, { memo, useState } from 'react'

import { DataProfile } from '@/entities/profile/profileInfo/dataProfile'
import { UserInfo } from '@/entities/profile/service'
import AvatarImage from '@/public/icon/avatarIcon.svg'
import DefaultAva from '@/public/images/avatarIcon.jpg'
import ImageAva from 'next/image'

import s from '@/entities/profile/profileInfo/ui/profileInfo.module.scss'

type Props = {
  userData?: UserInfo
}
export const ProfileInfo = memo(({ userData }: Props) => {
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const errorHandler = () => {
    setIsAvaBroken(true)
  }

  return (
    <div className={s.container}>
      {!userData?.avatar && <AvatarImage className={s.ava} />}
      {userData?.avatar && (
        <ImageAva
          alt={'avatar'}
          className={s.avatar}
          height={204}
          onError={errorHandler}
          src={isAvaBroken ? DefaultAva : userData?.avatar}
          width={204}
        />
      )}
      <div className={s.dataProfile}>
        <DataProfile userData={userData} />
      </div>
    </div>
  )
})
