import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const GeneralInformationDynamic = dynamic(
  () => import('./GeneralInformation').then(mod => mod.GeneralInformation),
  {
    loading: () => <Loader />,
  }
)
