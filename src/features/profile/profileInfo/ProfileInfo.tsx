import Image from 'next/image'
import React from 'react'
import { ImgOutline } from '@/src/assets/icons/image-outline'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { authUserSelector } from '@/src/features/auth/authService'
import { useAppSelector } from '@/src/shared/hooks'
import { DataProfile } from '../profileInfo/dataProfile'
import { useGetProfileQuery } from '../service/profileApi'
import s from './profileInfo.module.scss'

export const ProfileInfo = () => {
  const user = useAppSelector(authUserSelector)
  const { data } = useGetProfileQuery(user?.userId, {
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  return (
    <div className={s.container}>
      {data?.data?.avatar && (
        <Image
          width={204}
          height={204}
          src={data?.data?.avatar}
          className={s.avatar}
          alt={'avatar'}
        />
      )}
      {data?.data?.avatar === null && (
        <div className={s.photo}>
          <div className={s.ellipse}></div>
          <div className={s.image}>
            <ImgOutline />
          </div>
        </div>
      )}
      <div className={s.dataProfile}>
        <DataProfile userData={data?.data} />
      </div>
    </div>
  )
}
