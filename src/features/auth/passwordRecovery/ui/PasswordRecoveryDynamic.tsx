import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const PasswordRecoveryDynamic = dynamic(
  () => import('./PasswordRecovery').then(mod => mod.PasswordRecovery),
  {
    loading: () => <Loader />,
  }
)
