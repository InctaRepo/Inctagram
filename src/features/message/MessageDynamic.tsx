import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const MessageDynamic = dynamic(() => import('./Message').then(mod => mod.Message), {
  loading: () => <Loader />,
})
