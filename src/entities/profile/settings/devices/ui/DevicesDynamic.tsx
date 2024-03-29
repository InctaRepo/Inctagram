import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const DevicesDynamic = dynamic(() => import('./Devices').then(mod => mod.Devices), {
  loading: () => <Loader />,
})
