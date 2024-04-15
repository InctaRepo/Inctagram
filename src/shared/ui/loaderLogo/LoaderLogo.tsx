import { memo } from 'react'

import Logo from '@/public/icon/logo.svg'

import s from '@/ui/loaderLogo/loaderLogo.module.scss'

export const LoaderLogo = memo(() => {
  return (
    <div className={s.LoaderLogo}>
      <Logo fill={'#234e99'} heidth={80} width={80} />
    </div>
  )
})
