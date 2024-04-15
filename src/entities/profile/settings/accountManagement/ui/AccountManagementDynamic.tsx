import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const AccountManagementDynamic = dynamic(
  () => import('./AccountManagement').then(mod => mod.AccountManagement),
  {
    loading: () => <Loader />,
  }
)
