import { ListImage } from '@/src/components/profile/list-image'
import { ProfileInfo } from '@/src/components/profile/profile-info'
import s from '@/src/components/profile/profile.module.scss'
import { Sidebar } from '@/src/components/sidebar'
import { useAppSelector } from '@/src/services'
import { authIsAuthSelector } from '@/src/services/auth'

export const Profile = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  return (
    <div className={s.container}>
      {isAuth && <Sidebar />}
      <div className={s.containerInfo}>
        <ProfileInfo />
        <ListImage />
      </div>
    </div>
  )
}
