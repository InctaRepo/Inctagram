import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const PrivacyDynamic = dynamic(() => import('./Privacy').then(mod => mod.Privacy), {
  loading: () => <Loader />,
})
