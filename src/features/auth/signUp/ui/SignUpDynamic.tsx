import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const SignUpDynamic = dynamic(() => import('./SignUp').then(mod => mod.SignUp), {
  loading: () => <Loader />,
})
