import dynamic from 'next/dynamic'

export const FavoritesDynamic = dynamic(() => import('./Favorites').then(mod => mod.Favorites))
