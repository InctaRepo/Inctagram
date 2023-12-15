import React from 'react'

import ImageAva from 'next/image'

import { DataProfile } from '../dataProfile'

import s from './profileInfo.module.scss'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'
import AvatarImage from 'public/icon/avatarIcon.svg'

type Props = {
  userData?: UserInfo
}
export const ProfileInfo = ({ userData }: Props) => {
  return (
    <div className={s.container}>
      {!userData?.avatar && <AvatarImage className={s.ava} />}
      {userData?.avatar && (
        <ImageAva
          width={204}
          height={204}
          src={userData?.avatar + '?nocache=' + Math.random()}
          className={s.avatar}
          alt={'avatar'}
        />
      )}
      <div className={s.dataProfile}>
        <DataProfile userData={userData} />
      </div>
    </div>
  )
}
