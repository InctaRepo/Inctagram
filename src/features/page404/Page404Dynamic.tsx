import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const Page404Dynamic = dynamic(() => import('./Page404').then(mod => mod.Page404), {
  loading: () => <Loader />,
})
