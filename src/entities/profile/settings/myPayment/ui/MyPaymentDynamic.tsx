import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const MyPaymentDynamic = dynamic(() => import('./MyPayment').then(mod => mod.MyPayment), {
  loading: () => <Loader />,
})
