import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const GeneralInformationDynamic = dynamic(
  () => import('./GeneralInformation').then(mod => mod.GeneralInformation),
  {
    loading: () => <Loader />,
  }
)
