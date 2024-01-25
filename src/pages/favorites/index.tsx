import React from 'react'

import { FavoritesDynamic } from '@/src/features/favorites'
import { NextPageWithLayout } from '@/src/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/src/widgets/layout/authLayout'

const FavoritesPage: NextPageWithLayout = () => {
  return <FavoritesDynamic />
}

FavoritesPage.getLayout = getAuthLayout
export default FavoritesPage
