import { ReactElement } from 'react'

import ImageAva from 'next/image'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/entities/profile/service'
import { Typography } from '@/ui/typography'
import AvatarImage from 'public/icon/avatarIcon.svg'
import style from 'src/features/home/ui/publicPost/profileHeader/profileHeader.module.scss'

export const ProfileHeader = ({ userId }: { userId: string }): ReactElement => {
  const { data: profileData, isLoading, isError } = useGetProfileQuery(userId)

  if (isLoading) {
    return <div>Loading profile...</div>
  }

  if (isError || !profileData?.data) {
    return <div>Error loading profile data</div>
  }

  return (
    <div className={style.box}>
      <div>
        {profileData.data?.avatar !== null ? (
          <ImageAva
            src={profileData.data?.avatar!}
            width={36}
            height={36}
            alt={'ava'}
            className={style.ava}
          />
        ) : (
          <AvatarImage className={style.ava} />
        )}
      </div>
      <Typography color="primary" variant="regular16">
        {profileData.data.username}
      </Typography>
    </div>
  )
}
