import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const SignInDynamic = dynamic(() => import('./SignIn').then(mod => mod.SignIn), {
  loading: () => <Loader />,
})
