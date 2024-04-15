import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const SignUpDynamic = dynamic(() => import('./SignUp').then(mod => mod.SignUp), {
  loading: () => <Loader />,
})
