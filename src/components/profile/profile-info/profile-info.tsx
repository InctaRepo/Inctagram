import React from 'react'

import { DataProfile } from '@/src/components/profile/profile-info/data-profile'
import s from '@/src/components/profile/profile-info/profile-info.module.scss'
import { useAppSelector } from '@/src/services'
import { useGetProfileQuery } from '@/src/services/profile/profile-api'

export const ProfileInfo = () => {
  const { userId } = useAppSelector(state => state.auth.user!)

  const { data } = useGetProfileQuery(userId)

  return (
    <div className={s.container}>
      <img src={data?.data?.avatar} className={s.image} />
      <DataProfile userData={data?.data} />
    </div>
  )
}
