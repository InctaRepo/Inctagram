import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const AvaModalDynamic = dynamic(() => import('./AvaModal').then(mod => mod.AvaModal), {
  loading: () => <Loader />,
})
