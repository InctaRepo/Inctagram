import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const PrivacyDynamic = dynamic(() => import('./Privacy').then(mod => mod.Privacy), {
  loading: () => <Loader />,
})
