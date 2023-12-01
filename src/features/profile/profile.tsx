// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { getIsAuth } from '@/src/features/auth/authService'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { useGetProfileQuery } from '@/src/features/profile/service/profileApi'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { UserInfo } from '@/src/features/profile/service/profileApiTypes'
import { BaseResponse } from '@/src/shared/api'
import { useAppSelector } from '@/src/shared/hooks'
import { Sidebar } from '@/src/shared/sidebar'
import { ListImage } from './listImage'
import s from './profile.module.scss'
import { ProfileInfo } from './profileInfo'

type Props = {
  id: string | string[] | undefined
  data?: BaseResponse<UserInfo>
}

export const Profile = ({ id }: Props) => {
  const isAuth = useAppSelector(getIsAuth)
  const { data } = useGetProfileQuery(id, {
    refetchOnMountOrArgChange: true,
  })

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={isAuth ? s.containerInfo : s.containerInfoPublic}>
        <ProfileInfo userData={data?.data} />
        <ListImage id={id} userData={data?.data} />
      </div>
    </div>
  )
}
