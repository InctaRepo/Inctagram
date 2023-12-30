import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const ProfileSettingsDynamic = dynamic(
  () => import('./ProfileSettings').then(mod => mod.ProfileSettings),
  {
    loading: () => <Loader />,
    ssr: false,
  }
)
