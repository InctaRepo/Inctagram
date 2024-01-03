import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const SettingsDynamic = dynamic(() => import('./Settings').then(mod => mod.Settings), {
  loading: () => <Loader />,
})
