import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const AvaModalDynamic = dynamic(() => import('./AvaModal').then(mod => mod.AvaModal), {
  loading: () => <Loader />,
})
