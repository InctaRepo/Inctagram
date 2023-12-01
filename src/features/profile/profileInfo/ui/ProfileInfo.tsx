import Image from 'next/image'
import React from 'react'
import { ImgOutline } from '@/src/assets/icons/image-outline'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices,@conarti/feature-sliced/absolute-relative
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import { DataProfile } from '../dataProfile'
import s from './profileInfo.module.scss'

type Props = {
  userData?: UserInfo
}
export const ProfileInfo = ({ userData }: Props) => {
  return (
    <div className={s.container}>
      {userData?.avatar.endsWith(
        'https://inctagram-pirates.s3.eu-central-1.amazonaws.com/user-avatars/null'
      ) && (
        <div className={s.photo}>
          <div className={s.ellipse}></div>
          <div className={s.image}>
            <ImgOutline />
          </div>
        </div>
      )}
      {!userData?.avatar && (
        <div className={s.photo}>
          <div className={s.ellipse}></div>
          <div className={s.image}>
            <ImgOutline />
          </div>
        </div>
      )}
      {userData?.avatar === null && (
        <div className={s.photo}>
          <div className={s.ellipse}></div>
          <div className={s.image}>
            <ImgOutline />
          </div>
        </div>
      )}
      {!userData?.avatar.endsWith(
        'https://inctagram-pirates.s3.eu-central-1.amazonaws.com/user-avatars/null'
      ) &&
        userData?.avatar && (
          <Image
            width={204}
            height={204}
            src={userData?.avatar}
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
