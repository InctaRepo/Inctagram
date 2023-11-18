import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { getProfileLayout } from 'src/widgets/layout/profileLayout'
import { authIsAuthSelector } from 'src/features/auth/authService'
import { Settings } from 'src/features/profile/settings'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/types'
import { RouteNames } from 'src/shared/const/routeNames'

const SettingsPage: NextPageWithLayout = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return isAuth && <Settings />
}

SettingsPage.getLayout = getProfileLayout
export default SettingsPage
