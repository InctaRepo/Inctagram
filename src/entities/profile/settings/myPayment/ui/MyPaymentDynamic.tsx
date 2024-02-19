import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const MyPaymentDynamic = dynamic(() => import('./MyPayment').then(mod => mod.MyPayment), {
  loading: () => <Loader />,
})
