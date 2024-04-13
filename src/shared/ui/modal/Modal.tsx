import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const Modal = dynamic(() => import('./BaseModal').then(mod => mod.BaseModal), {
  loading: () => <Loader />,
  ssr: false,
})
