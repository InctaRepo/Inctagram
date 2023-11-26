import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getProfileLayout } from '@/src/widgets/layout/profileLayout'
import { useGetMeQuery } from '@/src/features/auth/authService'
import { getIsAuth } from '@/src/features/auth/authService/authSelectors'
import { Profile } from '@/src/features/profile'
import { RouteNames } from '@/src/shared/const/routeNames'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/types'

const ProfilePage: NextPageWithLayout = () => {
  const isAuth = useAppSelector(getIsAuth)
  const { data: user } = useGetMeQuery()
  const id = user?.data?.userId

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return isAuth && <Profile id={id} />
}

ProfilePage.getLayout = getProfileLayout
export default ProfilePage
