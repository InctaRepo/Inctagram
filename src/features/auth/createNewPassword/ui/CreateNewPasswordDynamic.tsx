import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const CreateNewPasswordDynamic = dynamic(
  () => import('./CreateNewPassword').then(mod => mod.CreateNewPassword),
  {
    loading: () => <Loader />,
  }
)
