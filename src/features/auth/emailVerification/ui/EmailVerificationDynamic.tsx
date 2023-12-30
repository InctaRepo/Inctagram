import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const EmailVerificationDynamic = dynamic(
  () => import('./EmailVerification').then(mod => mod.EmailVerification),
  {
    loading: () => <Loader />,
  }
)
