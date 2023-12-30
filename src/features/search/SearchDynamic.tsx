import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const SearchDynamic = dynamic(() => import('./Search').then(mod => mod.Search), {
  loading: () => <Loader />,
})
