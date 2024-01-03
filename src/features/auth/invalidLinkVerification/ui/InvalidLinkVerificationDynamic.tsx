import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const InvalidLinkVerificationDynamic = dynamic(
  () => import('./InvalidLinkVerification').then(mod => mod.InvalidLinkVerification),
  {
    loading: () => <Loader />,
  }
)
