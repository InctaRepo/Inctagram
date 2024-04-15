import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const EmailConfirmedDynamic = dynamic(
  () => import('./EmailConfirmed').then(mod => mod.EmailConfirmed),
  {
    loading: () => <Loader />,
  }
)
