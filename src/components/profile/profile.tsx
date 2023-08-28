import { ProfileLayout } from '@/src/components/layout/profile-layout'
import { ListImage } from '@/src/components/profile/list-image'
import { MenuContainer } from '@/src/components/profile/menu-container'
import { ProfileInfo } from '@/src/components/profile/profile-info'
import s from '@/src/components/profile/profile.module.scss'

export const Profile = () => {
  return (
    <ProfileLayout>
      <div className={s.container}>
        <MenuContainer />
        <div className={s.containerInfo}>
          <ProfileInfo />
          <ListImage />
        </div>
      </div>
    </ProfileLayout>
  )
}
