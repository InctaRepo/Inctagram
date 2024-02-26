import ImageAva from 'next/image'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetProfileQuery } from '@/entities/profile/service'
import s from '@/features/publicPage/ui/publicPost/profileHeader/profileHeader.module.scss'
import AvatarImage from '@/public/icon/avatarIcon.svg'
import { Loader } from '@/ui/loader'
import { Typography } from '@/ui/typography'

type Props = {
  userId: string
}
export const ProfileHeader = ({ userId }: Props) => {
  const { data: profileData, isLoading, isError } = useGetProfileQuery(userId)

  if (isLoading) {
    return <Loader />
  }

  if (isError || !profileData?.data) {
    return <div>Error loading profile data</div>
  }

  return (
    <div className={s.box}>
      <div>
        {profileData.data?.avatar !== null ? (
          <ImageAva
            src={profileData.data?.avatar!}
            width={36}
            height={36}
            alt={'ava'}
            className={s.ava}
          />
        ) : (
          <AvatarImage className={s.ava} />
        )}
      </div>
      <Typography color="primary" variant="regular16">
        {profileData.data.username}
      </Typography>
    </div>
  )
}
