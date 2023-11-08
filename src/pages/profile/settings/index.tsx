import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { RouteNames } from '@/src/common/constants/route-names'
import { Settings } from '@/src/components/settings'
import { NextPageWithLayout } from '@/src/pages/_app'
import { useAppSelector } from '@/src/services'
import { authIsAuthSelector } from '@/src/services/auth/auth-selectors'
import { getProfileLayout } from 'src/components/layout/profile-layout'

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
