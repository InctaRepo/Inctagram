import React from 'react'

import Image from 'next/image'

import { DataProfile } from '../dataProfile'

import s from './profileInfo.module.scss'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'
import ImgOutline from 'public/icon/imgOutlineIcon.svg'

type Props = {
  userData?: UserInfo
}
export const ProfileInfo = ({ userData }: Props) => {
  return (
    <div className={s.container}>
      {!userData?.avatar && (
        <div className={s.photo}>
          <div className={s.ellipse}></div>
          <div className={s.image}>
            <ImgOutline />
          </div>
        </div>
      )}
      {userData?.avatar && (
        <Image
          width={204}
          height={204}
          src={userData?.avatar}
          className={s.avatar}
          alt={'avatar'}
          priority={true}
        />
      )}
      <div className={s.dataProfile}>
        <DataProfile userData={userData} />
      </div>
    </div>
  )
}
