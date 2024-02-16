import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const SuccessGoogleGitHubDynamic = dynamic(
  () => import('./SuccessGoogleGitHub').then(mod => mod.SuccessGoogleGitHub),
  {
    loading: () => <Loader />,
  }
)
