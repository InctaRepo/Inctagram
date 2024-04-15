import { useState } from 'react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/entities/profile/service'
import AvatarImage from '@/public/icon/avatarIcon.svg'
import DefaultAva from '@/public/images/avatarIcon.jpg'
import { Loader } from '@/ui/loader'
import { Typography } from '@/ui/typography'
import ImageAva from 'next/image'

import s from '@/features/publicPage/ui/publicPost/profileHeader/profileHeader.module.scss'

type Props = {
  userId: string
}
export const ProfileHeader = ({ userId }: Props) => {
  const { data: profileData, isError, isLoading } = useGetProfileQuery(userId)
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  if (isLoading) {
    return <Loader />
  }

  if (isError || !profileData?.data) {
    return <div>Error loading profile data</div>
  }
  const errorHandler = () => {
    setIsAvaBroken(true)
  }
  const avaWithError = isAvaBroken ? DefaultAva : profileData.data?.avatar!

  return (
    <div className={s.box}>
      <div>
        {profileData.data?.avatar !== null ? (
          <ImageAva
            alt={'ava'}
            className={s.ava}
            height={36}
            onError={errorHandler}
            priority
            src={profileData.data?.avatar! ? profileData.data?.avatar! : avaWithError}
            width={36}
          />
        ) : (
          <AvatarImage className={s.ava} />
        )}
      </div>
      <Typography color={'primary'} variant={'regular16'}>
        {profileData.data.username}
      </Typography>
    </div>
  )
}
