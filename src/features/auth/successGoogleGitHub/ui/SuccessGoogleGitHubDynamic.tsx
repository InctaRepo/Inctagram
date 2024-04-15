import { Loader } from '@/ui/loader'
import dynamic from 'next/dynamic'

export const SuccessGoogleGitHubDynamic = dynamic(
  () => import('./SuccessGoogleGitHub').then(mod => mod.SuccessGoogleGitHub),
  {
    loading: () => <Loader />,
  }
)
