import dynamic from 'next/dynamic'

import { Loader } from '@/ui/loader'

export const PasswordRecoveryDynamic = dynamic(
  () => import('./PasswordRecovery').then(mod => mod.PasswordRecoveryFC),
  {
    loading: () => (
      <Loader isLoading={undefined} loadMoreCallback={undefined} isLastPage={undefined} />
    ),
  }
)
