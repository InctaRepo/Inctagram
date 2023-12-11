import dynamic from 'next/dynamic'

import { AppLoader } from '@/src/shared/ui/appLoader'

export const Modal = dynamic(() => import('./BaseModal'), {
  loading: () => <AppLoader />,
  ssr: false,
})
