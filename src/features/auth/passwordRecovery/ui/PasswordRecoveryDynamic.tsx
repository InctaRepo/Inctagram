import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const PasswordRecoveryDynamic = dynamic(
  () => import('./PasswordRecovery').then(mod => mod.PasswordRecovery),
  {
    loading: () => <Loader />,
  }
)
