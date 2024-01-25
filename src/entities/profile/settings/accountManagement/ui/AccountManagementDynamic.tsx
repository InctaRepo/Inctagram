import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const AccountManagementDynamic = dynamic(
  () => import('./AccountManagement').then(mod => mod.AccountManagement),
  {
    loading: () => <Loader />,
  }
)
