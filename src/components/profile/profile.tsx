import { ListImage } from '@/src/components/profile/list-image'
import { MenuContainer } from '@/src/components/profile/menu-container'
import { ProfileInfo } from '@/src/components/profile/profile-info'
import s from '@/src/components/profile/profile.module.scss'
import { useAppSelector } from '@/src/services'
import { authIsAuthSelector } from '@/src/services/auth'
import { UserInfoType } from '@/src/services/profile/profile-api-types'

export const Profile = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  return (
    <div className={s.container}>
      {isAuth && <MenuContainer />}
      <div className={s.containerInfo}>
        <ProfileInfo />
        <ListImage />
      </div>
    </div>
  )
}
