import dynamic from 'next/dynamic'

export const Modal = dynamic(() => import('./BaseModal').then(mod => mod.BaseModal), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})
