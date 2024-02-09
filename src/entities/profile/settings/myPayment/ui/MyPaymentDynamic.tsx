import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const MyPaymentDynamic = dynamic(() => import('./examples').then(mod => mod.Main), {
  loading: () => <Loader />,
})
