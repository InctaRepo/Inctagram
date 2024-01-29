import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const EmailConfirmedDynamic = dynamic(
  () => import('./EmailConfirmed').then(mod => mod.EmailConfirmed),
  {
    loading: () => <Loader />,
  }
)
