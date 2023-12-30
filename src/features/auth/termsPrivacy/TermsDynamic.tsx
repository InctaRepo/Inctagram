import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const TermsDynamic = dynamic(() => import('./Terms').then(mod => mod.Terms), {
  loading: () => <Loader />,
})
