import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const MyPaymentDynamic = dynamic(
  () => import('./examples/MyPayment').then(mod => mod.Main),
  {
    loading: () => <Loader />,
  }
)
