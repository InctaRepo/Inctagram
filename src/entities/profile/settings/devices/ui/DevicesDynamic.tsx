import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const DevicesDynamic = dynamic(() => import('./Devices').then(mod => mod.Devices), {
  loading: () => <Loader />,
})
