import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { getAuthLayout } from '@/src/components/layout/auth-layout/auth-layout'
import { NextPageWithLayout } from '@/src/pages/_app'
import { useAppSelector } from '@/src/services'
import { authIsAuthSelector } from '@/src/services/auth/auth-selectors'
import { RouteNames } from 'src/common/constants/route-names'

const Home: NextPageWithLayout = () => {
  const isAuth = useAppSelector(authIsAuthSelector)
  const router = useRouter()

  useEffect(() => {
    if (isAuth) {
      router.push(RouteNames.MY_PROFILE)
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
