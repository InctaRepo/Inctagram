import React, { useState } from 'react'

import ImageAva from 'next/image'

import { DataProfile } from '@/src/entities/profile/profileInfo/dataProfile'
import s from '@/src/entities/profile/profileInfo/ui/profileInfo.module.scss'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'
import AvatarImage from 'public/icon/avatarIcon.svg'
import DefaultAva from 'public/images/avatarIcon.jpg'

type Props = {
  userData?: UserInfo
}
export const ProfileInfo = ({ userData }: Props) => {
  const [isAvaBroken, setIsAvaBroken] = useState(false)
  const errorHandler = () => {
    setIsAvaBroken(true)
  }

  return (
    <div className={s.container}>
      {!userData?.avatar && <AvatarImage className={s.ava} />}
      {userData?.avatar && (
        <ImageAva
          width={204}
          height={204}
          src={isAvaBroken ? DefaultAva : userData?.avatar}
          className={s.avatar}
          alt={'avatar'}
          onError={errorHandler}
        />
      )}
      <div className={s.dataProfile}>
        <DataProfile userData={userData} />
      </div>
    </div>
  )
}
