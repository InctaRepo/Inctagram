import { PropsWithChildren, useEffect } from 'react'

import { NextPage } from 'next'
import NProgress from 'nprogress'

import s from './progressBar.module.scss'

import { appIsLoadingSelector } from '@/src/shared/app'
import { useAppSelector } from '@/src/shared/hooks'

export const ProgressBar: NextPage<PropsWithChildren> = ({ children }) => {
  const isLoading = useAppSelector(appIsLoadingSelector)

  useEffect(() => {
    if (isLoading) {
      NProgress.start()
    } else {
      NProgress.done()
    }

    return () => {
      NProgress.done()
    }
  }, [isLoading])

  return <div className={s.wrapper}>{children}</div>
}
