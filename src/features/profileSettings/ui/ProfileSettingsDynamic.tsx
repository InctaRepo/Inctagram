import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const ProfileSettingsDynamic = dynamic(
  () => import('./ProfileSettings').then(mod => mod.ProfileSettings),
  {
    loading: () => <Loader />,
  }
)
