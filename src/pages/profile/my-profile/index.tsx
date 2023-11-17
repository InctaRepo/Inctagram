import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getProfileLayout } from 'src/widgets/layout/profileLayout'
import { authIsAuthSelector } from '@/src/features/auth/authService/authSelectors'
import { Profile } from '@/src/features/profile'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/types'
import { RouteNames } from 'src/shared/const/routeNames'

const MyProfilePage: NextPageWithLayout = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return isAuth && <Profile />
}

MyProfilePage.getLayout = getProfileLayout
export default MyProfilePage
