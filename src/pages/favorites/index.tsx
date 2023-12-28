import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { Favorites } from '@/src/features/favorites/Favorites'
import { RouteNames } from '@/src/shared/const'
import { getIsAuth } from '@/src/shared/hoc'
import { useAppSelector } from '@/src/shared/hooks'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const FavoritesPage: NextPageWithLayout = () => {
  const isAuth = useAppSelector(getIsAuth)

  const router = useRouter()

  useEffect(() => {
    if (!isAuth) {
      router.push(RouteNames.SIGN_IN)
    }
  }, [isAuth, router])

  return isAuth && <Favorites />
}

FavoritesPage.getLayout = getAuthLayout
export default FavoritesPage
