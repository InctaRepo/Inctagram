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
}

Home.getLayout = getAuthLayout
export default Home
