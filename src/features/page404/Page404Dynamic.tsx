import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const Page404Dynamic = dynamic(() => import('./Page404').then(mod => mod.Page404), {
  loading: () => <Loader />,
})
