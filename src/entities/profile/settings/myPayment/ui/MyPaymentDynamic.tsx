import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const MyPaymentDynamic = dynamic(() => import('./MyPayment').then(mod => mod.MyPayment), {
  loading: () => <Loader />,
})
