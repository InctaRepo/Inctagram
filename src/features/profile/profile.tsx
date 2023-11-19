// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { authIsAuthSelector } from '@/src/features/auth/authService'
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

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={s.containerInfo}>
        <ProfileInfo id={id} />
        <ListImage />
      </div>
    </div>
  )
}
