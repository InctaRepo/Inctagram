import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'
import { getIsAuth } from '@/src/features/auth/authService'
import { Profile } from '@/src/features/profile'
import { RouteNames } from '@/src/shared/const/routeNames'
import { getUserId } from '@/src/shared/hoc/model/selectors/getUserId/getUserId'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/types'

const ProfilePage: NextPageWithLayout = () => {
  const isAuth = useAppSelector(getIsAuth)
  const userId = useAppSelector(getUserId)
  // const { data: user } = useGetMeQuery()
  // const id = user?.data?.userId

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return isAuth && <Profile id={userId} />
  // return <Profile id={userId} />
}

ProfilePage.getLayout = getAuthLayout
export default ProfilePage
