import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { RouteNames } from '@/src/common/constants/route-names'
import { MenuContainer } from '@/src/components/profile/menu-container'
import { ProfileSettings } from '@/src/components/profile/profile-settings/Profile-settings'
import s from '@/src/components/profile/profile.module.scss'
import { useAppSelector } from '@/src/services'
import { authIsAuthSelector } from '@/src/services/auth/auth-selectors'
import { ProfileLayout } from 'src/components/layout/profile-layout'

const Index = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return (
    isAuth && (
      <ProfileLayout>
        <div className={s.container}>
          <MenuContainer />
          <div className={s.containerInfo}>
            <ProfileSettings />
          </div>
        </div>
      </ProfileLayout>
    )
  )
}

export default Index
