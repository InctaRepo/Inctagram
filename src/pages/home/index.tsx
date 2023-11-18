import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getProfileLayout } from '@/src/widgets/layout/profileLayout'
import { authIsAuthSelector } from '@/src/features/auth/authService'
import { Home } from '@/src/features/home'
import { RouteNames } from '@/src/shared/const/routeNames'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/types'

const HomePage: NextPageWithLayout = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return isAuth && <Home />
}

HomePage.getLayout = getProfileLayout
export default HomePage
