// eslint-disable-next-line @conarti/feature-sliced/public-api
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'
import { getIsAuth } from '@/src/features/auth/authService/authSelectors'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/types'
import { RouteNames } from 'src/shared/const/routeNames'

const Home: NextPageWithLayout = () => {
  const isAuth = useAppSelector(getIsAuth)
  const router = useRouter()

  useEffect(() => {
    if (isAuth) {
      router.push(RouteNames.PROFILE)
    } else {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return <></>
  // TODO: think how to remove blinking this home page in the case :
  // user is not authenticated , we did initialize=true and then try to refresh access token
  // while trying to refresh , this page is blinking, then redirect to login / profile page
}

Home.getLayout = getAuthLayout

export default Home
