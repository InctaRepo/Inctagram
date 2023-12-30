import dynamic from 'next/dynamic'

import { Loader } from '@/src/shared/ui/loader'

export const CreatePostDynamic = dynamic(
  () => import('./CreateNewPost').then(mod => mod.CreateNewPost),
  {
    loading: () => <Loader />,
  }
)
