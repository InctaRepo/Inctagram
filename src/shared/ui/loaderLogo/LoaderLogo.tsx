import { memo } from 'react'

import Logo from '@/public/icon/logo.svg'
import s from '@/src/shared/ui/loaderLogo/loaderLogo.module.scss'

export const LoaderLogo = memo(() => {
  return (
    <div className={s.LoaderLogo}>
      <Logo fill={'#234e99'} width={80} heidth={80} />
    </div>
  )
})
