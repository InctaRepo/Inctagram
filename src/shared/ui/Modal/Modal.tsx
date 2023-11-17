import dynamic from 'next/dynamic'
import { AppLoader } from '../appLoader'

export const Modal = dynamic(() => import('./BaseModal'), {
  loading: () => <AppLoader />,
  ssr: false,
})
