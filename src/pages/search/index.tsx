import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { Search } from '@/src/features/search'
import { RouteNames } from '@/src/shared/const/routeNames'
import { getIsAuth } from '@/src/shared/hoc'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const SearchPage: NextPageWithLayout = () => {
  const isAuth = useAppSelector(getIsAuth)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return isAuth && <Search />
}

SearchPage.getLayout = getAuthLayout
export default SearchPage
