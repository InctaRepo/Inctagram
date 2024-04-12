import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const PasswordRecoveryDynamic = dynamic(
  () => import('./PasswordRecovery').then(mod => mod.PasswordRecovery),
  {
    loading: () => <Loader />,
  }
)
