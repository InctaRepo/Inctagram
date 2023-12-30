import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const FavoritesDynamic = dynamic(() => import('./Favorites').then(mod => mod.Favorites), {
  loading: () => <Loader />,
})
