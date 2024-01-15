import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const AccountManagementDynamic = dynamic(
  () => import('./AccountManagement').then(mod => mod.AccountManagement),
  {
    loading: () => <Loader />,
  }
)
