import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const RegistrationConfirmationDynamic = dynamic(
  () => import('./RegistrationConfirmation').then(mod => mod.RegistrationConfirmation),
  {
    loading: () => <Loader />,
  }
)
