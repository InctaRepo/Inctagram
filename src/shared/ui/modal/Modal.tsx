import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const Modal = dynamic(() => import('./BaseModal').then(mod => mod.BaseModal), {
  loading: () => <Loader />,
  ssr: false,
})
