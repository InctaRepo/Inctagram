import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const HomeDynamic = dynamic(() => import('./Home').then(mod => mod.Home), {
  loading: () => <Loader />,
})
