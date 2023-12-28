import dynamic from 'next/dynamic'

export const Modal = dynamic(() => import('./BaseModal'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
