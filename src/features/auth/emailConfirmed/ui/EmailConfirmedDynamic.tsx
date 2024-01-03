import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const EmailConfirmedDynamic = dynamic(
  () => import('./EmailConfirmed').then(mod => mod.EmailConfirmed),
  {
    loading: () => <Loader />,
  }
)
