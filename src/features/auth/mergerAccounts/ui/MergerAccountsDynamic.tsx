import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const MergerAccountsDynamic = dynamic(
  () => import('./MergerAccounts').then(mod => mod.MergerAccounts),
  {
    loading: () => <Loader />,
  }
)
