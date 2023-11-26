// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { authIsAuthSelector } from '@/src/features/auth/authService'
// eslint-disable-next-line @conarti/feature-sliced/absolute-relative
import { useGetProfileQuery } from '@/src/features/profile/service/profileApi'
import { useAppSelector } from '@/src/shared/hooks'
import { Sidebar } from '@/src/shared/sidebar'
import { ListImage } from '../profile/listImage'
import { ProfileInfo } from '../profile/profileInfo'
import s from './profile.module.scss'

type Props = {
  id: string | string[] | undefined
}

export const Profile = ({ id }: Props) => {
  const isAuth = useAppSelector(authIsAuthSelector)
  const { data } = useGetProfileQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={isAuth ? s.containerInfo : s.containerInfoPublic}>
        <ProfileInfo id={id} userData={data?.data} />
        <ListImage userData={data?.data} />
      </div>
    </div>
  )
}
