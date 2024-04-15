import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const TermsDynamic = dynamic(() => import('./Terms').then(mod => mod.Terms), {
  loading: () => <Loader />,
})
