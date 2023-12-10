import { ProfileInfo } from '@/src/entities/profile/profileInfo'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { Posts } from '@/src/features/posts'
import { useGetProfileQuery } from '@/src/features/profile/service'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { UserInfo } from '@/src/features/profileSettings/service'
import { BaseResponse } from '@/src/shared/api'
import { getIsAuth } from '@/src/shared/hoc'
import { useAppSelector } from '@/src/shared/hooks'
import { Sidebar } from '@/src/shared/sidebar'
import s from 'src/features/profile/ui/profile.module.scss'

type Props = {
  id: string | string[] | undefined
  data?: BaseResponse<UserInfo>
}

export const Profile = ({ id }: Props) => {
  const isAuth = useAppSelector(getIsAuth)
  const { data } = useGetProfileQuery(id)

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={isAuth ? s.containerInfo : s.containerInfoPublic}>
        <ProfileInfo userData={data?.data} />
        <Posts userData={data?.data} />
      </div>
    </div>
  )
}
