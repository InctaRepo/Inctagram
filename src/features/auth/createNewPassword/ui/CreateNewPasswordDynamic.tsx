import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const CreateNewPasswordDynamic = dynamic(
  () => import('./CreateNewPassword').then(mod => mod.CreateNewPassword),
  {
    loading: () => <Loader />,
  }
)
