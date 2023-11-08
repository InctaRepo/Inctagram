import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { RouteNames } from '@/src/common/constants/route-names'
import { getProfileLayout } from '@/src/components/layout/profile-layout'
import { Search } from '@/src/components/search'
import { NextPageWithLayout } from '@/src/pages/_app'
import { useAppSelector } from '@/src/services'
import { authIsAuthSelector } from '@/src/services/auth'

const SearchPage: NextPageWithLayout = () => {
  const isAuth = useAppSelector(authIsAuthSelector)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return isAuth && <Search />
}

SearchPage.getLayout = getProfileLayout
export default SearchPage
