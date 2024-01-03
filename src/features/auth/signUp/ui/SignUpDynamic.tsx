import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const SignUpDynamic = dynamic(() => import('./SignUp').then(mod => mod.SignUp), {
  loading: () => <Loader />,
})
