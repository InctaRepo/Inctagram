import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const EmailVerificationDynamic = dynamic(
  () => import('./EmailVerification').then(mod => mod.EmailVerification),
  {
    loading: () => <Loader />,
  }
)
