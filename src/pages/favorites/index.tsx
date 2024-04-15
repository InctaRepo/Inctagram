import React from 'react'

import { FavoritesDynamic } from '@/features/favorites'
import { GetAuthLayout } from '@/widgets/layout/authLayout'

const FavoritesPage = () => <FavoritesDynamic />

FavoritesPage.getLayout = GetAuthLayout
export default FavoritesPage
