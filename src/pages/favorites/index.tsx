import React from 'react'

import { FavoritesDynamic } from '@/features/favorites'
import { NextPageWithLayout } from '@/shared/service/nextPageWithLayout'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const FavoritesPage: NextPageWithLayout = () => <FavoritesDynamic />

FavoritesPage.getLayout = GetAuthLayout
export default FavoritesPage
