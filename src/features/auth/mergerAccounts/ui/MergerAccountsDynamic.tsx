import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const MergerAccountsDynamic = dynamic(
  () => import('./MergerAccounts').then(mod => mod.MergerAccounts),
  {
    loading: () => <Loader />,
  }
)
