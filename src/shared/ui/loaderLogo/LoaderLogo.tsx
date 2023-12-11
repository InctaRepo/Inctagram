import { memo } from 'react'

import s from './loaderLogo.module.scss'

import Logo from 'public/icon/logo.svg'

export const LoaderLogo = memo(() => {
  return (
    <div className={s.LoaderLogo}>
      <Logo fill={'var(--light-100)'} width={80} heidth={80} />
    </div>
  )
})
