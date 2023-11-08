import { ListImage } from '@/src/components/profile/list-image'
import { MenuContainer } from '@/src/components/profile/menu-container'
import { ProfileInfo } from '@/src/components/profile/profile-info'
import s from '@/src/components/profile/profile.module.scss'
import { UserInfoType } from '@/src/services/profile/profile-api-types'

type DataProfileType = {
  userData?: UserInfoType
}

export const Profile = ({ userData }: DataProfileType) => {
  return (
    <div className={s.container}>
      <MenuContainer />
      <div className={s.containerInfo}>
        <ProfileInfo userData={userData} />
        <ListImage />
      </div>
    </div>
  )
}
