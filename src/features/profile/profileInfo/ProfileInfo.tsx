import Image from 'next/image'
import React from 'react'
import { ImgOutline } from '@/src/assets/icons/image-outline'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices,@conarti/feature-sliced/absolute-relative
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import { DataProfile } from '../profileInfo/dataProfile'
import { useGetProfileQuery } from '../service/profileApi'
import s from './profileInfo.module.scss'

type Props = {
  id: string | string[] | undefined
  userData?: UserInfo
}
export const ProfileInfo = ({ userData, id }: Props) => {
  return (
    <div className={s.container}>
      {userData?.avatar && (
        <Image
          width={204}
          height={204}
          src={userData?.avatar}
          className={s.avatar}
          alt={'avatar'}
        />
      )}
      {userData?.avatar === null && (
        <div className={s.photo}>
          <div className={s.ellipse}></div>
          <div className={s.image}>
            <ImgOutline />
          </div>
        </div>
      )}
      <div className={s.dataProfile}>
        <DataProfile userData={userData} />
      </div>
    </div>
  )
}
