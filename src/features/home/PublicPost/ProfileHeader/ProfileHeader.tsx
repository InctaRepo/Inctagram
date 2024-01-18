import { ReactElement } from 'react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import style from './ProfileHeader.module.scss'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/src/features/profile/service'
import { Typography } from '@/src/shared/ui/typography'
import AvatarImage from 'public/icon/avatarIcon.svg'

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
      <AvatarImage className={style.ava} image={profileData.data.avatar} />
      <Typography color="primary" variant="regular16">
        {profileData.data.username}
      </Typography>
    </div>
  )
}
