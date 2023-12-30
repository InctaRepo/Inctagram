import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const StatisticsDynamic = dynamic(() => import('./Statistics').then(mod => mod.Statistics), {
  loading: () => <Loader />,
})
