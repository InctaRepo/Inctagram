import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const GeneralInformationDynamic = dynamic(
  () => import('./GeneralInformation').then(mod => mod.GeneralInformation),
  {
    loading: () => <Loader />,
  }
)
