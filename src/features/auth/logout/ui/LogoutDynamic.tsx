import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const LogoutDynamic = dynamic(() => import('./Logout').then(mod => mod.Logout), {
  loading: () => <Loader />,
})
