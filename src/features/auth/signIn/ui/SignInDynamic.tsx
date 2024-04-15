import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const SignInDynamic = dynamic(() => import('./SignIn').then(mod => mod.SignIn), {
  loading: () => <Loader />,
})
