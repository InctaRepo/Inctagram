import dynamic from 'next/dynamic'

export const FavoritesDynamic = dynamic(() => import('./FavoritesCH').then(mod => mod.Favorites))
