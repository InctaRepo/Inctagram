import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getProfileLayout } from '@/src/widgets/layout/profileLayout'
import { getIsAuth } from '@/src/features/auth/authService'
import { Statistics } from '@/src/features/statistics'
import { RouteNames } from '@/src/shared/const/routeNames'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/types'

const StatisticsPage: NextPageWithLayout = () => {
  const isAuth = useAppSelector(getIsAuth)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return isAuth && <Statistics />
}

StatisticsPage.getLayout = getProfileLayout
export default StatisticsPage
