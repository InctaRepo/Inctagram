import React from 'react'

import { FavoritesDynamic } from '@/features/favorites'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { getAuthLayout } from '@/widgets/layout/authLayout'

const FavoritesPage: NextPageWithLayout = () => <FavoritesDynamic />

FavoritesPage.getLayout = getAuthLayout
export default FavoritesPage
