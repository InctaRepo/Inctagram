import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const ProfileSettingsDynamic = dynamic(
  () => import('./ProfileSettings').then(mod => mod.ProfileSettings),
  {
    loading: () => <Loader />,
  }
)
