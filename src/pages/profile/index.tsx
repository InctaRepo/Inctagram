import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getProfileLayout } from '@/src/widgets/layout/profileLayout'
import { authIsAuthSelector } from '@/src/features/auth/authService/authSelectors'
import { Profile } from '@/src/features/profile'
import { RouteNames } from '@/src/shared/const/routeNames'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/types'

const ProfilePage: NextPageWithLayout = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return isAuth && <Profile />
}

ProfilePage.getLayout = getProfileLayout
export default ProfilePage
